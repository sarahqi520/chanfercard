import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Locale } from "@/lib/i18n/config";
import SolutionsContent from "./SolutionsContent";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const meta = dict.meta as Record<string, string>;
  const baseUrl = "https://www.gzchanfer.com";
  const title = meta.solutionsTitle ?? "Card Packaging Solutions | CHANFER";
  const description = meta.solutionsDescription ?? "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/${locale}/solutions`,
      images: [
        {
          url: `${baseUrl}/images/og/og-image-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/og/og-image-${locale}.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/solutions`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://www.gzchanfer.com";

  const solutionsTitle = (dict.meta as Record<string, string>).solutionsTitle ?? "Card Packaging Solutions";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: solutionsTitle, item: `${baseUrl}/${locale}/solutions` },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header dict={dict} locale={locale} />
      <SolutionsContent dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
