import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostContent from "./BlogPostContent";
import { blogPosts, getPost } from "@/lib/blogData";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const p of blogPosts) out.push({ lang, slug: p.slug });
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!locales.includes(lang as Locale)) return {};
  const post = getPost(slug);
  if (!post) return {};
  const locale = lang as Locale;
  const t = (r: Record<string, string>) => r[locale] || r.en;
  const baseUrl = "https://chanfercard.com";
  return {
    title: t(post.title),
    description: t(post.excerpt),
    alternates: { canonical: `${baseUrl}/${locale}/blog/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;
  const post = getPost(slug);
  if (!post) notFound();
  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Header dict={dict} locale={locale} />
      <main className="flex-1">
        <BlogPostContent post={post} locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
