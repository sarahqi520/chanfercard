import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blogData";
import type { Locale } from "@/lib/i18n/config";

export default function BlogListContent({ locale }: { locale: Locale }) {
  const t = (r: Record<string, string>) => r[locale] || r.en;
  const ui =
    locale === "zh"
      ? {
          heroBadge: "资源中心",
          heroTitle: "博客",
          heroSub: "卡牌包装自动化选型指南、行业知识与客户案例。",
          readMore: "阅读全文",
        }
      : {
          heroBadge: "Resources",
          heroTitle: "Blog",
          heroSub: "Buyer's guides, industry knowledge and customer stories on card packaging automation.",
          readMore: "Read more",
        };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border border-white/20 bg-white/10 text-white/90">
            {ui.heroBadge}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {ui.heroTitle}
          </h1>
          <p className="mt-4 text-white/75 max-w-2xl text-base md:text-lg leading-relaxed">
            {ui.heroSub}
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group bg-card border border-border rounded-xl overflow-hidden card-hover hover:border-primary flex flex-col"
              >
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 bg-accent/10 text-accent-dark rounded-full">
                      {t(post.category)}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug">
                    {t(post.title)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {t(post.excerpt)}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                    {ui.readMore} <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
