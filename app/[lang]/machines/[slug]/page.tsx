import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Locale, locales } from "@/lib/i18n/config";
import { machineProducts } from "@/lib/data";
import MachineDetailContent from "./MachineDetailContent";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = machineProducts.map((m) => m.id);
  return locales.flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://chanfercard.com";

  const machine = machineProducts.find((m) => m.id === slug);
  if (!machine) return {};

  const machineDetail = (dict.machineDetail as Record<string, Record<string, unknown>>) ?? {};
  const md = machineDetail[slug] ?? {};
  const meta = dict.meta as Record<string, string>;

  const seoTitle = (md.seoTitle as string) ?? `${machine.model} ${machine.name} | CHANFER`;
  const seoDescription = (md.seoDescription as string) ?? machine.description;

  const path = `/${locale}/machines/${slug}`;

  const alternates: Record<string, string> = {};
  for (const l of locales) {
    alternates[l] = `${baseUrl}/${l}/machines/${slug}`;
  }
  alternates["x-default"] = `${baseUrl}/en/machines/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: (md.keywords as string) ?? meta.keywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      url: `${baseUrl}${path}`,
      images: [
        {
          url: `${baseUrl}${machine.image}`,
          width: 800,
          height: 600,
          alt: `${machine.model} ${machine.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: alternates,
    },
  };
}

export default async function MachineDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://chanfercard.com";

  const machine = machineProducts.find((m) => m.id === slug);
  if (!machine) notFound();

  const machineDetail = (dict.machineDetail as Record<string, Record<string, unknown>>) ?? {};
  const md = machineDetail[slug] ?? {};

  const machinesTitle = (dict.meta as Record<string, string>).machinesTitle ?? "Machine Catalog";

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: machinesTitle, item: `${baseUrl}/${locale}/machines` },
      { "@type": "ListItem", position: 3, name: `${machine.model} ${machine.name}`, item: `${baseUrl}/${locale}/machines/${slug}` },
    ],
  };

  // Product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${machine.model} ${machine.name}`,
    description: (md.seoDescription as string) ?? machine.description,
    image: `${baseUrl}${machine.image}`,
    category: machine.category,
    brand: { "@type": "Brand", name: "CHANFER" },
    manufacturer: {
      "@type": "Organization",
      name: "Guangzhou Chanfer Intelligent Equipment Co., Ltd.",
      url: baseUrl,
    },
    additionalProperty: Object.entries(machine.specs).map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Header dict={dict} locale={locale} />
      <MachineDetailContent dict={dict} locale={locale} machineId={slug} />
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
