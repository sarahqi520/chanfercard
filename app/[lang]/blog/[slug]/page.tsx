import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import BlogPostContent from "./BlogPostContent";
import { getPostBySlug } from "@/lib/blogData";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    [{ slug: "how-to-choose-a-card-packaging-machine" }].map((p) => ({
      lang: locale,
      slug: p.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!locales.includes(lang as Locale)) return {};
  const post = getPostBySlug(slug);
  if (!post) return {};
  const t = post.translations[lang as "en" | "zh"] ?? post.translations.en;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = post.translations[lang as "en" | "zh"] ?? post.translations.en;
  return (
    <BlogPostContent
      dict={dict}
      locale={lang as Locale}
      title={t.title}
      date={post.date}
      author={post.author}
      body={t.body}
    />
  );
}
