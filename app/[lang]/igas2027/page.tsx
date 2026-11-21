import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Locale, localeOgLocale } from "@/lib/i18n/config";
import { IGAS_BOOTH, IGAS_EVENT } from "@/lib/igas2027";
import IGAS2027Content from "./IGAS2027Content";

type Props = {
  params: Promise<{ lang: string }>;
};

const BASE_URL = "https://chanfercard.com";
const PATH = "igas2027";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const igas = (dict.igas2027 ?? {}) as Record<string, string>;
  const title = igas.metaTitle ?? "Meet CHANFER at IGAS 2027 | Book Your Visit";
  const description =
    igas.metaDescription ??
    "Reserve your visit to CHANFER's booth at IGAS 2027, August 5-9, Tokyo Big Sight. Register now to receive your free exhibition invitation pass.";

  // Build hreflang alternates for this page
  const languages: Record<string, string> = {};
  for (const l of ["en", "zh", "ru", "it", "de", "fr", "es", "ko", "ja"] as Locale[]) {
    languages[l] = `${BASE_URL}/${l}/${PATH}`;
  }
  languages["x-default"] = `${BASE_URL}/en/${PATH}`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${locale}/${PATH}`, languages },
    openGraph: {
      title,
      description,
      type: "website",
      locale: localeOgLocale[locale],
      url: `${BASE_URL}/${locale}/${PATH}`,
      images: [
        {
          url: `${BASE_URL}/images/og/og-image-${locale}.jpg`,
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
      images: [`${BASE_URL}/images/og/og-image-${locale}.jpg`],
    },
  };
}

export default async function IGAS2027Page({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "IGAS 2027 - International Graphic Arts Show",
    startDate: "2027-08-05T11:00:00+09:00",
    endDate: "2027-08-09T17:00:00+09:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Tokyo Big Sight, East Exhibition Halls",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3-11-1 Ariake, Koto-ku",
        addressLocality: "Tokyo",
        postalCode: "135-0063",
        addressCountry: "JP",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Japan Printing Machinery Association / Prepress & Digital Printing Equipment Association",
    },
    performer: {
      "@type": "Organization",
      name: "CHANFER",
      url: BASE_URL,
      description: `Visit CHANFER at ${IGAS_BOOTH}`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/${locale}/${PATH}`,
      description: "Free invitation pass via advance registration",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      {
        "@type": "ListItem",
        position: 2,
        name: "IGAS 2027",
        item: `${BASE_URL}/${locale}/${PATH}`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <IGAS2027Content dict={dict} locale={locale} />
    </div>
  );
}
