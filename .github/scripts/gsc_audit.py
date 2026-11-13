#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
GitHub Actions 上的 chanfercard.com GSC 体检（自包含，无本地依赖）。

输入：
  env GSC_SA_FILE   服务账号 JSON 路径（由 workflow 从 Secret 解码到 RUNNER_TEMP）
  env INSPECT_LIMIT URL Inspection 抽查条数，默认 20
  public/sitemap.xml 仓库内静态 sitemap（checkout 后直接读）

输出：
  gsc-out/gsc-audit.json  完整原始数据
  gsc-out/gsc-audit.md    中文摘要

注意：仓库为 public，Actions 日志公开可见。
因此本脚本只把「汇总计数」打到 stdout，具体查询词 / 页面明细只写入 artifact。
"""
from __future__ import annotations

import collections
import datetime as dt
import io
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.getcwd()
OUT = os.path.join(ROOT, "gsc-out")
KEY_FILE = os.environ.get("GSC_SA_FILE", "")
INSPECT_LIMIT = int(os.environ.get("INSPECT_LIMIT", "20") or "20")
SITE_HINT = "chanfercard.com"
LOCALES = ["en", "zh", "ru", "it", "de", "fr", "es", "ko", "ja"]
W3 = "https://www.googleapis.com/webmasters/v3"
V1 = "https://searchconsole.googleapis.com/v1"
SCOPES = ["https://www.googleapis.com/auth/webmasters"]
TODAY = dt.date.today().isoformat()

report = {"date": TODAY, "generated_by": "gsc_audit.py", "errors": []}


def q(s: str) -> str:
    return urllib.parse.quote(s, safe="")


def token() -> str:
    from google.oauth2 import service_account
    from google.auth.transport.requests import Request
    if not KEY_FILE or not os.path.isfile(KEY_FILE):
        raise RuntimeError("GSC_SA_FILE 未指向有效密钥文件（Secret 是否配置？）")
    creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
    creds.refresh(Request())
    return creds.token


def call(method, url, body=None, tok=None):
    headers = {"Authorization": "Bearer " + tok, "User-Agent": "chanfer-gsc-audit/1.0"}
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, method=method, data=data, headers=headers)
    with urllib.request.urlopen(req, timeout=90) as r:
        raw = r.read().decode("utf-8", "ignore")
        return json.loads(raw) if raw.strip() else {}


def sitemap_gaps():
    p = os.path.join(ROOT, "public", "sitemap.xml")
    txt = io.open(p, encoding="utf-8").read()
    actual = re.findall(r"<loc>([^<]+)</loc>", txt)
    pairs = set()
    for u in actual:
        m = re.match(r"https://chanfercard\.com/([a-z]{2})/blog/([^/]+)/$", u)
        if m:
            pairs.add(m.groups())
    slugs = sorted({s for _, s in pairs})
    expected = ["https://chanfercard.com/%s/blog/%s/" % (l, s)
                for s in slugs for l in LOCALES]
    missing = [u for u in expected if u not in set(actual)]
    by_slug = collections.defaultdict(list)
    for u in missing:
        m = re.match(r"https://chanfercard\.com/([a-z]{2})/blog/([^/]+)/$", u)
        by_slug[m.group(2)].append(m.group(1))
    return {"total_loc": len(actual), "article_slugs": len(slugs),
            "expected_article_urls": len(expected),
            "missing_count": len(missing), "missing": missing,
            "by_slug": {k: v for k, v in by_slug.items()}}


def main():
    os.makedirs(OUT, exist_ok=True)

    try:
        report["sitemap_gaps"] = sitemap_gaps()
    except Exception as e:
        report["errors"].append("sitemap_gaps: %s" % e)

    try:
        tok = token()
    except Exception as e:
        report["errors"].append("AUTH_FAILED: %s" % e)
        write()
        print("AUTH_FAILED: 无法获取 access token（见 artifact 报告）")
        sys.exit(1)

    try:
        sites = call("GET", W3 + "/sites", tok=tok).get("siteEntry", [])
    except Exception as e:
        report["errors"].append("SITES_FAILED: %s" % e)
        write()
        print("SITES_FAILED: 无法列出属性")
        sys.exit(1)

    report["visible_sites"] = [{"siteUrl": s.get("siteUrl"),
                                "permissionLevel": s.get("permissionLevel")} for s in sites]
    hits = [s for s in sites if SITE_HINT in (s.get("siteUrl") or "")]
    if not hits:
        report["errors"].append(
            "NO_PROPERTY: 服务账号能看到 %d 个属性但没有 chanfercard.com。"
            "请在 GSC → 设置 → 用户和权限，把服务账号邮箱加为该属性用户（权限「完整」）。" % len(sites))
        write()
        print("NO_PROPERTY: 服务账号尚未加入 chanfercard.com 属性（Step 6 未完成）")
        sys.exit(1)

    # GSC 的 sites.list 返回顺序不稳定；固定选主站（非 www 的网址前缀属性），
    # 否则 URL Inspection 会因属性与 URL 不匹配而全部 403。
    def rank(s):
        u = s.get("siteUrl") or ""
        if u == "https://chanfercard.com/":
            return 0
        if u.startswith("sc-domain:chanfercard.com"):
            return 1
        if u.startswith("https://www."):
            return 3
        return 2
    hits.sort(key=rank)
    site = hits[0]["siteUrl"]
    level = hits[0].get("permissionLevel")
    report["siteUrl"] = site
    report["permissionLevel"] = level

    try:
        sm = call("GET", "%s/sites/%s/sitemaps" % (W3, q(site)), tok=tok)
        report["sitemaps"] = sm.get("sitemap", [])
    except Exception as e:
        report["errors"].append("SITEMAPS_FAILED: %s" % e)

    # sitemap 落后时自动重提：纯通知动作，不改仓库文件、URL、canonical 或任何已收录内容。
    # 仅在「GSC 记录的 submitted 数 < 仓库当前 <loc> 数」时触发，避免无意义重复提交。
    try:
        g0 = report.get("sitemap_gaps", {})
        recorded = 0
        for e in report.get("sitemaps", []):
            for c in (e.get("contents") or []):
                try:
                    recorded += int(c.get("submitted") or 0)
                except (TypeError, ValueError):
                    pass
        feed = "https://chanfercard.com/sitemap.xml"
        recent = False
        for e in report.get("sitemaps", []):
            if e.get("path") == feed and e.get("lastSubmitted"):
                try:
                    age = (dt.date.fromisoformat(TODAY)
                           - dt.date.fromisoformat(e["lastSubmitted"][:10])).days
                    # 同一天内不重复提交；此后每周最多一次，直到 Google 重新下载
                    # 并把 contents[].submitted 更新为仓库当前 <loc> 数为止。
                    if age == 0:
                        recent = True
                except ValueError:
                    pass
        if recorded and g0.get("total_loc") and recorded < g0["total_loc"] and not recent:
            call("PUT", "%s/sites/%s/sitemaps/%s" % (W3, q(site), q(feed)), tok=tok)
            report["sitemap_resubmitted"] = {"feed": feed, "previous_submitted": recorded,
                                             "current_loc": g0["total_loc"], "at": TODAY}
            print("SITEMAP RESUBMITTED: %d -> %d loc" % (recorded, g0["total_loc"]))
    except urllib.error.HTTPError as e:
        body = ""
        try:
            body = e.read().decode("utf-8", "ignore")[:300]
        except Exception:
            pass
        report["errors"].append("SITEMAP_RESUBMIT_FAILED: HTTP %d %s" % (e.code, body))
    except Exception as e:
        report["errors"].append("SITEMAP_RESUBMIT_FAILED: %s" % e)

    end = dt.date.today() - dt.timedelta(days=2)
    start = end - dt.timedelta(days=27)
    report["report_range"] = [start.isoformat(), end.isoformat()]
    perf = {}
    for dim, key in [(["page"], "page"), (["query"], "query"),
                     (["country"], "country"), (["date"], "date")]:
        try:
            d = call("POST", "%s/sites/%s/searchAnalytics/query" % (W3, q(site)),
                     body={"startDate": start.isoformat(), "endDate": end.isoformat(),
                           "dimensions": dim, "rowLimit": 25000, "type": "web",
                           "dataState": "final"}, tok=tok)
            perf[key] = d.get("rows", [])
        except Exception as e:
            report["errors"].append("REPORT_%s_FAILED: %s" % (key.upper(), e))
    report["performance"] = perf

    try:
        gaps = report.get("sitemap_gaps", {}).get("missing", [])
        listed = [u for u in re.findall(
            r"<loc>(https://chanfercard\.com/[a-z]{2}/blog/[^<]+)</loc>",
            io.open(os.path.join(ROOT, "public", "sitemap.xml"), encoding="utf-8").read())]
        # 优先检查「不在 sitemap 里」的缺口 URL，再用 sitemap 常规条目补满配额
        urls = list(dict.fromkeys(gaps[:INSPECT_LIMIT] + listed))[:INSPECT_LIMIT]
        insp = []
        for u in urls:
            try:
                d = call("POST", V1 + "/urlInspection/index:inspect",
                         body={"inspectionUrl": u, "siteUrl": site, "languageCode": "en-US"},
                         tok=tok)
                s = d.get("inspectionResult", {}).get("indexStatusResult", {})
                insp.append({"url": u, "verdict": s.get("verdict"),
                             "coverageState": s.get("coverageState"),
                             "googleCanonical": s.get("googleCanonical"),
                             "userCanonical": s.get("userCanonical"),
                             "lastCrawlTime": s.get("lastCrawlTime")})
            except urllib.error.HTTPError as e:
                if e.code == 429:
                    report["errors"].append("INSPECT_QUOTA: 达到每日配额，已检查 %d 条" % len(insp))
                    break
                insp.append({"url": u, "error": "HTTP %d" % e.code})
            except Exception as e:
                insp.append({"url": u, "error": str(e)[:120]})
        report["inspection"] = insp
        report["inspection_summary"] = dict(collections.Counter(
            r.get("coverageState", r.get("error", "UNKNOWN")) for r in insp))
        report["canonical_mismatch"] = [
            r for r in insp if r.get("googleCanonical") and r.get("userCanonical")
            and r["googleCanonical"] != r["userCanonical"]]
    except Exception as e:
        report["errors"].append("INSPECT_FAILED: %s" % e)

    write()
    gaps_n = report.get("sitemap_gaps", {}).get("missing_count", "?")
    indexed = report.get("inspection_summary", {})
    n_indexed = sum(v for k, v in indexed.items()
                    if "indexed" in str(k).lower() and "not " not in str(k).lower())
    print("AUDIT DONE: site=%s level=%s sitemaps=%d perf_rows=%d inspect=%d indexed=%s gaps=%s errors=%d"
          % (site, level, len(report.get("sitemaps", [])),
             sum(len(v) for v in perf.values()),
             len(report.get("inspection", [])),
             n_indexed, gaps_n, len(report["errors"])))
    if report["errors"]:
        print("WARN: %d non-fatal issue(s), see gsc-audit.md" % len(report["errors"]))
    sys.exit(0)


def write():
    with io.open(os.path.join(OUT, "gsc-audit.json"), "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    L = ["# chanfercard.com GSC 体检 · %s" % TODAY, "",
         "- 属性：`%s`（权限 `%s`）" % (report.get("siteUrl", "-"), report.get("permissionLevel", "-")),
         "- 数据区间：%s ~ %s（GSC 数据约延迟 2 天）" % tuple(report.get("report_range", ["-", "-"])), ""]
    if report["errors"]:
        L += ["## 需要处理的问题", ""]
        L += ["- %s" % e for e in report["errors"]] + [""]
    g = report.get("sitemap_gaps", {})
    if g:
        L += ["## sitemap 缺口", "",
              "共 %d 条 `<loc>`，%d 篇博文 × 9 语言应有 %d 条文章 URL，"
              "**缺 %d 条**。" % (g["total_loc"], g["article_slugs"],
                                  g["expected_article_urls"], g["missing_count"]), ""]
        for s, langs in g.get("by_slug", {}).items():
            L.append("- `%s` 缺 %d 语言：%s" % (s, len(langs), ", ".join(langs)))
        L.append("")
    sm = report.get("sitemaps", [])
    if sm:
        L += ["## 已提交 sitemap", "", "| 地址 | 上次提交 | 上次读取 | 类型 |", "|---|---|---|---|"]
        for e in sm:
            L.append("| %s | %s | %s | %s |" % (e.get("path", "-"), e.get("lastSubmitted", "-"),
                                                e.get("lastDownloaded", "-"), e.get("type", "-")))
        L.append("")
        submitted = 0
        for e in sm:
            for c in (e.get("contents") or []):
                try:
                    submitted += int(c.get("submitted") or 0)
                except (TypeError, ValueError):
                    pass
        if submitted and g.get("total_loc"):
            done = report.get("sitemap_resubmitted")
            L += ["- GSC 记录已提交 **%d** 条，当前仓库 sitemap 实际 **%d** 条%s" %
                  (submitted, g["total_loc"],
                   " → **本次运行已自动重提 sitemap**" if done else
                   (" → **建议在 GSC 重提 sitemap**，让 Google 读取新增 URL"
                    if submitted < g["total_loc"] else "")),
                  "- 注：GSC `contents[].indexed` 对网址前缀属性常年显示 0，不代表真实索引量；"
                  "以本报表「URL 索引抽查」的实时结果为准。", ""]
    perf = report.get("performance", {})
    if perf:
        L += ["## 搜索表现（近 28 天）", ""]
        dr = perf.get("date", [])
        if dr:
            c = sum(r["clicks"] for r in dr)
            i = sum(r["impressions"] for r in dr)
            L += ["**合计：%d 次点击 / %d 次展示 / CTR %.2f%%**" %
                  (c, i, (c / i * 100) if i else 0), ""]
        for key, title in [("page", "按页面"), ("query", "按查询词"), ("country", "按国家")]:
            rows = perf.get(key, [])
            if not rows:
                continue
            L += ["### %s（%d 行，前 15）" % (title, len(rows)), "",
                  "| 维度 | 点击 | 展示 | CTR | 平均排名 |", "|---|---:|---:|---:|---:|"]
            for r in rows[:15]:
                L.append("| %s | %d | %d | %.2f%% | %.1f |" %
                         (str(r["keys"][0]).replace("|", "\\|"), r["clicks"],
                          r["impressions"], r["ctr"] * 100, r["position"]))
            L.append("")
    insp = report.get("inspection", [])
    if insp:
        L += ["## URL 索引抽查（%d 条）" % len(insp), "",
              "| 状态 | 数量 |", "|---|---:|"]
        for k, v in sorted(report.get("inspection_summary", {}).items(),
                           key=lambda x: -x[1]):
            L.append("| %s | %d |" % (k, v))
        mm = report.get("canonical_mismatch", [])
        L += ["", "canonical 与 Google 选择不一致：**%d 条**" % len(mm), ""]
        for r in mm[:10]:
            L += ["- `%s` → user=%s / google=%s" %
                  (r["url"], r.get("userCanonical"), r.get("googleCanonical")), ""]
        gap_urls = set(g.get("missing", []))
        gi = [r for r in insp if r.get("url") in gap_urls]
        if gi:
            L += ["### sitemap 缺口 URL 的实际索引状态（%d 条）" % len(gi), "",
                  "| URL | 状态 | 上次抓取 |", "|---|---|---|"]
            for r in gi:
                L.append("| `%s` | %s | %s |" %
                         (r["url"], r.get("coverageState", r.get("error", "-")),
                          r.get("lastCrawlTime", "-")))
            L.append("")
        L.append("")
    L += ["", "---", "", "完整明细见同目录 `gsc-audit.json`；本文件由 GitHub Actions 自动生成。", ""]
    with io.open(os.path.join(OUT, "gsc-audit.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(L))


if __name__ == "__main__":
    main()
