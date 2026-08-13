import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import BlogListContent from "./BlogListContent";
import { blogPosts } from "@/lib/blogData";

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) return {};
  const dict = await getDictionary(lang as Locale);
  const blog = (dict as any).blog || {};
  return {
    title: blog.listTitle || "Card Packaging Blog | CHANFER",
    description:
      blog.listDescription ||
      "Guides and insights on card packaging machines and production lines.",
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const dict = await getDictionary(lang as Locale);
  const posts = blogPosts.map((p) => ({
    slug: p.slug,
    date: p.date,
    title: p.translations[lang as "en" | "zh"]?.title ?? p.translations.en.title,
    excerpt:
      p.translations[lang as "en" | "zh"]?.excerpt ?? p.translations.en.excerpt,
  }));
  return <BlogListContent dict={dict} locale={lang as Locale} posts={posts} />;
}
