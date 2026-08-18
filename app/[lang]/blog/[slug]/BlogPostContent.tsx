import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { BlogPost } from "@/lib/blogData";

export default function BlogPostContent({
  post,
  locale,
}: {
  post: BlogPost;
  locale: Locale;
}) {
  const t = (r: Record<string, string>) => r[locale] || r.en;
  const home = locale === "zh" ? "首页" : "Home";
  const navBlog = locale === "zh" ? "博客" : "Blog";
  const relatedTitle = locale === "zh" ? "相关阅读" : "Related";
  const publishedOn = locale === "zh" ? "发布于" : "Published";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(post.title),
    description: t(post.excerpt),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "CHANFER" },
    publisher: { "@type": "Organization", name: "CHANFER" },
    mainEntityOfPage: `https://chanfercard.com/${locale}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href={`/${locale}`} className="hover:text-primary">
              {home}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-primary">
              {navBlog}
            </Link>
            <span>/</span>
            <span className="text-foreground/70">{t(post.title)}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 bg-accent/10 text-accent-dark rounded-full">
              {t(post.category)}
            </span>
            <span className="text-xs text-muted-foreground">
              {publishedOn} {post.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary leading-tight">
            {t(post.title)}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {t(post.excerpt)}
          </p>

          <div className="mt-8 space-y-5">
            {post.body.map((block, i) => {
              if (block.type === "h2")
                return (
                  <h2 key={i} className="text-2xl font-bold text-primary mt-10 mb-4">
                    {t(block.text)}
                  </h2>
                );
              if (block.type === "h3")
                return (
                  <h3 key={i} className="text-xl font-bold mt-8 mb-3">
                    {t(block.text)}
                  </h3>
                );
              if (block.type === "p")
                return (
                  <p key={i} className="text-base leading-7 text-foreground/85">
                    {t(block.text)}
                  </p>
                );
              if (block.type === "li")
                return (
                  <div key={i} className="flex items-start gap-3 text-base text-foreground/85">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span>{t(block.text)}</span>
                  </div>
                );
              if (block.type === "cta")
                return (
                  <Link
                    key={i}
                    href={`/${locale}${block.href}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-accent/30 mt-6"
                  >
                    {t(block.text)} <ArrowRight size={16} />
                  </Link>
                );
              if (block.type === "table")
                return (
                  <div key={i} className="overflow-x-auto my-6">
                    <table className="w-full border border-border rounded-xl overflow-hidden text-sm">
                      <thead>
                        <tr className="bg-primary text-white">
                          {block.head.map((h, hi) => (
                            <th key={hi} className="px-4 py-3 text-left font-semibold">
                              {t(h)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, ri) => (
                          <tr key={ri} className={ri % 2 ? "bg-muted/50" : "bg-card"}>
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                className="px-4 py-3 border-t border-border text-foreground/85"
                              >
                                {t(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              return null;
            })}
          </div>
        </div>

        {/* Related */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-16">
          <h2 className="text-2xl font-bold mb-6">{relatedTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {post.relatedLinks.map((link, i) => (
              <Link
                key={i}
                href={`/${locale}${link.href}`}
                className="group bg-card border border-border rounded-xl p-5 card-hover hover:border-primary"
              >
                <h3 className="font-bold group-hover:text-primary transition-colors">
                  {t(link.label)}
                </h3>
                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
                  {navBlog} <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
