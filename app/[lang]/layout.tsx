import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { locales, defaultLocale, localeOgLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://chanfercard.com";

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
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CHANFER - Card Packaging Solutions",
    url: `${BASE_URL}/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/${locale}/machines?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: locale,
  };
}

// LocalBusiness schema — geographic entity signal for B2B manufacturing queries
function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Guangzhou Chanfer Intelligent Equipment Co., Ltd",
    alternateName: "CHANFER",
    description:
      "Manufacturer of automated card packaging machinery and complete packaging lines for trading cards, game cards and board games. Established 2011.",
    url: BASE_URL,
    telephone: "+86-130-6098-5132",
    email: "sarah@gzchanfer.com",
    foundingDate: "2011",
    priceRange: "$$",
    image: `${BASE_URL}/images/og/og-image-en.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "701, No.5 Yongfeng Road, Shawan Street, Panyu District",
      addressLocality: "Guangzhou",
      addressRegion: "Guangdong",
      postalCode: "511400",
      addressCountry: "CN",
    },
    areaServed: ["Worldwide", "China", "Europe", "North America", "Southeast Asia"],
  };
}

// Service + OfferCatalog — makes each of the 6 packaging methods individually quotable by AI
function buildServiceSchema() {
  const methods = [
    { name: "Candy Packaging (Flow Wrap)", speed: "20-220 bags/min" },
    { name: "Self-Adhesive Strip Packaging", speed: "20-80 packs/min" },
    { name: "Four-Sides Sealed Packaging", speed: "50-150 packs/min" },
    { name: "Banding Packaging", speed: "5-20 packs/min" },
    { name: "Heat Shrink Packaging", speed: "20-100 bags/min" },
    { name: "Three-Dimensional Packaging", speed: "40-80 bags/min" },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Card Packaging Automation",
    provider: {
      "@type": "Organization",
      name: "Guangzhou Chanfer Intelligent Equipment Co., Ltd",
      url: BASE_URL,
    },
    areaServed: ["Worldwide", "China", "Europe", "North America", "Southeast Asia"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Card Packaging Methods",
      itemListElement: methods.map((m) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: m.name,
          description: `Automated ${m.name} line for trading cards, game cards and board game cards. Throughput: ${m.speed}.`,
        },
      })),
    },
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
  const ogImage = `${BASE_URL}/images/og/og-image-${locale}.jpg`;

  // Build hreflang alternates for SEO
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${BASE_URL}/${l}`;
  }
  languages["x-default"] = `${BASE_URL}/${defaultLocale}`;

  return {
    title: meta?.title ?? "CHANFER | Card Packaging Solutions",
    description: meta?.description ?? "",
    keywords: meta?.keywords?.split(", ") ?? [],
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      type: "website",
      locale: localeOgLocale[locale],
      siteName: "CHANFER",
      url: `${BASE_URL}/${locale}`,
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
      canonical: `${BASE_URL}/${locale}`,
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
    "@id": `${BASE_URL}/#organization`,
    name: "Guangzhou Chanfer Intelligent Equipment Co., Ltd",
    alternateName: ["CHANFER", "CUKKE", "广州长发智能装备有限公司", "Guangzhou Chanfer Intelligent Equipment Co., Ltd"],
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/images/og/og-image-en.jpg`,
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
      "https://www.youtube.com/@GoharChanfer",
      "https://www.facebook.com/gzchanfer",
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
        item: `${BASE_URL}/${lang}`,
      },
    ],
  };

  const faqSchema = buildFaqSchema(faqItems);
  const websiteSchema = buildWebsiteSchema(lang);
  const localBusinessSchema = buildLocalBusinessSchema();
  const serviceSchema = buildServiceSchema();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8CX7M0W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N8CX7M0W');`,
          }}
        />

        {/* Structured data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />

        {/* Structured data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* Structured data - Service + OfferCatalog (6 packaging methods) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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

        {children}
      </body>
    </html>
  );
}
