import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogListContent from "./BlogListContent";

type Props = { params: Promise<{ lang: string }> };

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) return {};
  const locale = lang as Locale;
  const baseUrl = "https://chanfercard.com";
  const title = locale === "zh" ? "博客 | CHANFER 卡牌包装" : "Blog | CHANFER Card Packaging";
  const description =
    locale === "zh"
      ? "卡牌包装自动化选型指南、行业知识与客户案例。"
      : "Buyer's guides, industry knowledge and customer stories on card packaging automation.";
  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/${locale}/blog` },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Header dict={dict} locale={locale} />
      <main className="flex-1">
        <BlogListContent locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
