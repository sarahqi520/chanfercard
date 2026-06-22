import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Locale, localeOgLocale } from "@/lib/i18n/config";
import ContactContent from "./ContactContent";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const meta = dict.meta as Record<string, string>;
  const baseUrl = "https://chanfercard.com";
  const title = meta.contactTitle ?? "Contact CHANFER | Get a Free Packaging Consultation";
  const description = meta.contactDescription ?? "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: localeOgLocale[locale],
      url: `${baseUrl}/${locale}/contact`,
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
      canonical: `${baseUrl}/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://chanfercard.com";
  const contactTitle = (dict.meta as Record<string, string>).contactTitle ?? "Contact CHANFER";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: contactTitle, item: `${baseUrl}/${locale}/contact` },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactContent dict={dict} locale={locale} />
    </div>
  );
}
