import type { Metadata } from "next";
import MachinesContent from "./MachinesContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { machineProducts } from "@/lib/data";
import { type Locale } from "@/lib/i18n/config";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const meta = dict.meta as Record<string, string>;
  const baseUrl = "https://chanfercard.com";
  const title = meta.machinesTitle ?? "Machine Catalog | CHANFER";
  const description = meta.machinesDescription ?? "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/${locale}/machines`,
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
      canonical: `${baseUrl}/${locale}/machines`,
    },
  };
}

export default async function MachinesPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://chanfercard.com";
  const machinesTitle = (dict.meta as Record<string, string>).machinesTitle ?? "Machine Catalog";

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: machinesTitle, item: `${baseUrl}/${locale}/machines` },
    ],
  };

  // ItemList schema — helps AI/SEO understand the machine catalog
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: machineProducts.length,
    itemListElement: machineProducts.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.model,
      description: m.description,
      url: `${baseUrl}/${locale}/machines#${m.id}`,
      image: `${baseUrl}${m.image}`,
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* ItemList structured data — machine catalog for AI/SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Header dict={dict} locale={locale} />
      <MachinesContent dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
