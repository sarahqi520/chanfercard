import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TeamContent from "./TeamContent";

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
  const teamPage = dict.teamPage as Record<string, unknown>;
  const hero = teamPage.hero as Record<string, string>;
  const baseUrl = "https://chanfercard.com";

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${baseUrl}/${l}/about/team`;
  }
  languages["x-default"] = `${baseUrl}/en/about/team`;

  return {
    title: hero.metaTitle || "Our Team | CHANFER",
    description: hero.metaDescription || "Meet the people behind CHANFER.",
    alternates: {
      canonical: `${baseUrl}/${locale}/about/team`,
      languages,
    },
    robots: { index: true, follow: true },
  };
}

export default async function TeamPage({
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
  const teamPage = dict.teamPage as Record<string, unknown>;
  const hero = teamPage.hero as Record<string, string>;
  const baseUrl = "https://chanfercard.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: "About Us", item: `${baseUrl}/${locale}/about` },
      { "@type": "ListItem", position: 3, name: hero.title, item: `${baseUrl}/${locale}/about/team` },
    ],
  };

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: hero.title,
    description: hero.metaDescription,
    url: `${baseUrl}/${locale}/about/team`,
    numberOfImages: 19,
    isPartOf: { "@type": "WebPage", name: "CHANFER" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      <Header dict={dict} locale={locale} />
      <TeamContent dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </>
  );
}
