import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQContent from "./FAQContent";

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) return {};

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const faqPage = dict.faqPage as Record<string, unknown>;
  const hero = faqPage.hero as Record<string, string>;
  const meta = dict.meta as Record<string, string>;
  const baseUrl = "https://chanfercard.com";

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${baseUrl}/${l}/faq`;
  }
  languages["x-default"] = `${baseUrl}/en/faq`;

  return {
    title: hero.metaTitle || "FAQ | CHANFER Card Packaging",
    description:
      hero.metaDescription ||
      meta?.description ||
      "Frequently asked questions about card packaging",
    alternates: {
      canonical: `${baseUrl}/${locale}/faq`,
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <FAQContent dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </>
  );
}
