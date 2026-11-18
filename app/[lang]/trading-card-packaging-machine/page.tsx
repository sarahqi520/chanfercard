import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Locale, locales } from "@/lib/i18n/config";
import TradingCardPackagingMachineContent, {
  VERIFIED_FACTS,
  getLandingCopy,
} from "./TradingCardPackagingMachineContent";

const BASE_URL = "https://chanfercard.com";
const PATH = "trading-card-packaging-machine";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) return {};

  const locale = lang as Locale;
  const c = getLandingCopy(locale);
  const pageUrl = `${BASE_URL}/${locale}/${PATH}`;

  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${BASE_URL}/${l}/${PATH}`;
  languages["x-default"] = `${BASE_URL}/en/${PATH}`;

  return {
    title: c.seoTitle,
    description: c.seoDescription,
    keywords:
      "trading card packaging machine, TCG card packaging machine, card packaging machine, game card packaging line, automatic card packing machine, collectible card packaging machine, trading card wrapping machine, CHANFER",
    alternates: { canonical: pageUrl, languages },
    openGraph: {
      title: c.seoTitle,
      description: c.seoDescription,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: `${BASE_URL}/images/og/og-image-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: c.h1,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: c.seoTitle,
      description: c.seoDescription,
      images: [`${BASE_URL}/images/og/og-image-${locale}.jpg`],
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) return null;

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const c = getLandingCopy(locale);
  const pageUrl = `${BASE_URL}/${locale}/${PATH}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: c.h1, item: pageUrl },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Trading Card Packaging Machine",
    description: c.seoDescription,
    category: "Packaging Machinery",
    brand: { "@type": "Brand", name: "CHANFER" },
    manufacturer: {
      "@type": "Organization",
      name: "Guangzhou Chanfer Intelligent Equipment Co., Ltd.",
      url: BASE_URL,
    },
    url: pageUrl,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header dict={dict} locale={locale} />
      <TradingCardPackagingMachineContent locale={locale} />
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
