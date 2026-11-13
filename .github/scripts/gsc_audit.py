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

    site = hits[0]["siteUrl"]
    level = hits[0].get("permissionLevel")
    report["siteUrl"] = site
    report["permissionLevel"] = level

    try:
        sm = call("GET", "%s/sites/%s/sitemaps" % (W3, q(site)), tok=tok)
        report["sitemaps"] = sm.get("sitemap", [])
    except Exception as e:
        report["errors"].append("SITEMAPS_FAILED: %s" % e)

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
        urls = [u for u in re.findall(
            r"<loc>(https://chanfercard\.com/[a-z]{2}/blog/[^<]+)</loc>",
            io.open(os.path.join(ROOT, "public", "sitemap.xml"), encoding="utf-8").read())]
        urls += gaps[:max(0, INSPECT_LIMIT - len(urls))]
        urls = urls[:INSPECT_LIMIT]
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
    print("AUDIT DONE: site=%s level=%s sitemaps=%d perf_rows=%d inspect=%d indexed=%s gaps=%s errors=%d"
          % (site, level, len(report.get("sitemaps", [])),
             sum(len(v) for v in perf.values()),
             len(report.get("inspection", [])),
             indexed.get("SUBMITTED_AND_INDEXED", 0), gaps_n, len(report["errors"])))
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
    perf = report.get("performance", {})
    if perf:
        L += ["## 搜索表现（近 28 天）", ""]
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
    L += ["", "---", "", "完整明细见同目录 `gsc-audit.json`；本文件由 GitHub Actions 自动生成。", ""]
    with io.open(os.path.join(OUT, "gsc-audit.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(L))


if __name__ == "__main__":
    main()
