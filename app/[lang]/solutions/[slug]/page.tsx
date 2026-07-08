import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Locale, locales } from "@/lib/i18n/config";
import { packagingSolutions } from "@/lib/data";
import SolutionDetailContent from "./SolutionDetailContent";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = packagingSolutions.map((s) => s.id);
  return locales.flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://chanfercard.com";

  const solution = packagingSolutions.find((s) => s.id === slug);
  if (!solution) return {};

  const solutionDetail = (dict.solutionDetail as Record<string, Record<string, unknown>>) ?? {};
  const sd = solutionDetail[slug];
  const meta = dict.meta as Record<string, string>;

  const seoTitle = (sd?.seoTitle as string) ?? `${solution.name} | CHANFER`;
  const seoDescription = (sd?.seoDescription as string) ?? solution.description;

  const path = `/${locale}/solutions/${slug}`;

  const alternates: Record<string, string> = {};
  for (const l of locales) {
    alternates[l] = `${baseUrl}/${l}/solutions/${slug}`;
  }
  alternates["x-default"] = `${baseUrl}/en/solutions/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: (sd?.keywords as string) ?? meta.keywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      url: `${baseUrl}${path}`,
      images: [
        {
          url: `${baseUrl}/images/og/og-image-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: seoTitle,
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

export default async function SolutionDetailPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://chanfercard.com";

  const solution = packagingSolutions.find((s) => s.id === slug);
  if (!solution) notFound();

  const solutionDetail = (dict.solutionDetail as Record<string, Record<string, unknown>>) ?? {};
  const sd = solutionDetail[slug] ?? {};
  const seoTitle = (sd.seoTitle as string) ?? solution.name;

  const solutionsTitle = (dict.meta as Record<string, string>).solutionsTitle ?? "Solutions";

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: solutionsTitle, item: `${baseUrl}/${locale}/solutions` },
      { "@type": "ListItem", position: 3, name: solution.name, item: `${baseUrl}/${locale}/solutions/${slug}` },
    ],
  };

  // FAQ schema
  const faqItems = (sd.faqs as Array<{ question: string; answer: string }>) ?? [];
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: (sd.seoDescription as string) ?? solution.description,
    provider: {
      "@type": "Organization",
      name: "Guangzhou Chanfer Intelligent Equipment Co., Ltd.",
      url: baseUrl,
    },
    areaServed: "Worldwide",
    serviceType: "Card Packaging",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header dict={dict} locale={locale} />
      <SolutionDetailContent dict={dict} locale={locale} solutionId={slug} />
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
