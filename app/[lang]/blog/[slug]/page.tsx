import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, defaultLocale, localeOgLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPostContent from "./BlogPostContent";
import { blogPosts, getPost } from "@/lib/blogData";

const BASE_URL = "https://chanfercard.com";

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
  const title = t(post.title);
  const description = t(post.excerpt);
  // Keep the canonical string exactly as before (Next.js trailingSlash adds the slash).
  const canonical = `${BASE_URL}/${locale}/blog/${slug}`;
  const pageUrl = `${BASE_URL}/${locale}/blog/${slug}/`;
  const ogImage = `${BASE_URL}/images/og/og-image-${locale}.jpg`;

  // Per-post hreflang: same article in every language, matching sitemap.xml
  // <xhtml:link> entries. The page-level alternates object replaces the
  // layout-level one, so languages must be declared here explicitly.
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}/blog/${slug}/`;
  }
  languages["x-default"] = `${BASE_URL}/${defaultLocale}/blog/${slug}/`;

  return {
    title,
    description,
    alternates: { canonical, languages },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      locale: localeOgLocale[locale],
      siteName: "CHANFER",
      url: pageUrl,
      publishedTime: new Date(post.date).toISOString(),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
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
