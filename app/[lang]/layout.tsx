import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, defaultLocale, localeOgLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

// Helper: build FAQPage schema from dict.faq.items
function buildFaqSchema(faqItems: Array<{ question: string; answer: string }>) {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// Helper: build WebSite schema with SearchAction
function buildWebsiteSchema(locale: string) {
  const baseUrl = "https://chanfercard.com";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CHANFER - Card Packaging Solutions",
    url: `${baseUrl}/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/machines?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: locale,
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) return {};

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const meta = dict.meta as Record<string, string>;
  const baseUrl = "https://chanfercard.com";
  const ogImage = `${baseUrl}/images/og/og-image-${locale}.jpg`;

  // Build hreflang alternates for SEO
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${baseUrl}/${l}`;
  }
  languages["x-default"] = `${baseUrl}/${defaultLocale}`;

  return {
    title: meta?.title ?? "CHANFER | Card Packaging Solutions",
    description: meta?.description ?? "",
    keywords: meta?.keywords?.split(", ") ?? [],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      type: "website",
      locale: localeOgLocale[locale],
      siteName: "CHANFER",
      url: `${baseUrl}/${locale}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "CHANFER - Card Packaging Automation Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.title,
      description: meta?.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: "FuXRl9gpad4P_QB5l2eViLoxW_4O86psl6n8xYK3z_U",
      yandex: "6adabb4512b1b5bb",
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  // Build FAQ items from faqPage data (expanded) with fallback to old faq data
  const faqPageData = (dict as Record<string, unknown>).faqPage as
    | Record<string, unknown>
    | undefined;
  let faqItems: Array<{ question: string; answer: string }> = [];
  if (faqPageData?.categories) {
    const categories = faqPageData.categories as Array<{
      id: string;
      title: string;
      items: Array<{ question: string; answer: string }>;
    }>;
    for (const cat of categories) {
      faqItems = faqItems.concat(cat.items);
    }
  }
  // Fallback to old faq.items if faqPage is empty
  if (faqItems.length === 0) {
    faqItems = ((dict as Record<string, unknown>).faq as Record<string, unknown>)?.["items"] as Array<{ question: string; answer: string }> ?? [];
  }

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Guangzhou Chanfer Intelligent Equipment Co., Ltd",
    alternateName: ["CHANFER", "CUKKE", "广州长发智能装备有限公司", "Guangzhou Changfa Intelligent Equipment Co., Ltd"],
    url: "https://chanfercard.com",
    logo: "https://chanfercard.com/logo.png",
    image: "https://chanfercard.com/images/og/og-image-en.jpg",
    description: (dict.meta as Record<string, string>)?.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "701, No.5 Yongfeng Road, Shawan Street, Panyu District",
      addressLocality: "Guangzhou",
      addressRegion: "Guangdong",
      postalCode: "511400",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+86-130-6098-5132",
        contactType: "sales",
        email: "sarah@gzchanfer.com",
        availableLanguage: ["English", "Chinese (Simplified)", "Russian", "Italian", "German", "French", "Spanish", "Korean", "Japanese"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+86-20-8482-1674",
        contactType: "customer service",
        email: "sarah@gzchanfer.com",
      },
    ],
    foundingDate: "2011",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 100,
    },
    areaServed: ["Worldwide", "China", "Europe", "North America", "Southeast Asia"],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Card Packaging Automation Solutions",
        description: "Automated card feeding, counting, packaging, cartoning, and palletizing solutions for game cards, trading cards, and board games.",
      },
    },
    sameAs: [
      "https://www.youtube.com/@CHANFER",
      "https://www.facebook.com/CHANFER",
      "https://www.linkedin.com/company/chanfer-card-packaging",
    ],
  };

  // BreadcrumbList schema - built from pathname
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://chanfercard.com/${lang}`,
      },
    ],
  };

  const faqSchema = buildFaqSchema(faqItems);
  const websiteSchema = buildWebsiteSchema(lang);

  return (
    <>
      {/* Structured data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Structured data - WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Structured data - FAQPage */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Structured data - BreadcrumbList (base) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div lang={lang}>{children}</div>
    </>
  );
}
