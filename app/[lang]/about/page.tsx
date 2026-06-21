import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertCarousel from "@/components/CertCarousel";
import { companyInfo } from "@/lib/data";
import {
  Award,
  Users,
  Factory,
  Cog,
  Building2,
  Globe,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Locale } from "@/lib/i18n/config";
import fs from "fs";
import path from "path";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const meta = dict.meta as Record<string, string>;
  const baseUrl = "https://www.gzchanfer.com";
  const title = meta.aboutTitle ?? "About CHANFER | 25+ Years of Packaging Innovation";
  const description = meta.aboutDescription ?? "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/${locale}/about`,
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
      canonical: `${baseUrl}/${locale}/about`,
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const about = dict.about as Record<string, string>;
  const overview = about.overview as unknown as Record<string, string>;
  const overviewEquipment = overview.equipment as unknown as Record<string, string>;
  const overviewContract = overview.contract as unknown as Record<string, string>;
  const stats = about.stats as unknown as Record<string, string>;
  const milestones = about.milestones as unknown as Record<string, string>;
  const certs = about.certifications as unknown as Record<string, unknown>;
  const highTech = certs.highTech as unknown as Record<string, string>;
  const srdi = certs.srdi as unknown as Record<string, string>;
  const iso = certs.iso as unknown as Record<string, string>;
  const ce = certs.ce as unknown as Record<string, string>;
  const sinceTemplate = certs.since as string;
  const facilities = about.facilities as unknown as Record<string, string>;
  const guangzhou = facilities.guangzhou as unknown as Record<string, string>;
  const dongguan = facilities.dongguan as unknown as Record<string, string>;

  const statsList = [
    {
      icon: <Award className="w-6 h-6" />,
      value: companyInfo.patents,
      label: stats.patents,
      sub: stats.patentsSub,
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: companyInfo.clients,
      label: stats.clients,
      sub: stats.clientsSub,
    },
    {
      icon: <Factory className="w-6 h-6" />,
      value: companyInfo.experience + " Yrs",
      label: stats.experience,
      sub: stats.experienceSub,
    },
    {
      icon: <Cog className="w-6 h-6" />,
      value: "100+",
      label: stats.team,
      sub: stats.teamSub,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      value: "3",
      label: stats.branches,
      sub: stats.branchesSub,
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      value: "4",
      label: stats.certs,
      sub: stats.certsSub,
    },
  ];

  const certList = [
    { title: highTech.title, year: "2018", desc: highTech.desc },
    { title: srdi.title, year: "2023", desc: srdi.desc },
    { title: iso.title, year: "2022", desc: iso.desc },
    { title: ce.title, year: "2020", desc: ce.desc },
  ];

  // Load individual cert images from public/images/company/certs/
  const certsDir = path.join(process.cwd(), "public/images/company/certs");
  let certImages: { src: string; alt: string }[] = [];
  try {
    const files = fs.readdirSync(certsDir);
    certImages = files
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .sort()
      .map((f) => ({
        src: `/images/company/certs/${f}`,
        alt: f.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      }));
  } catch {
    // directory empty or not found — fall back to single overview image
  }

  // If no individual images, use the overview image as single slide
  if (certImages.length === 0) {
    certImages = [
      {
        src: "/images/company/certifications.png",
        alt: "CHANFER Certifications",
      },
    ];
  }

  const baseUrl = "https://www.gzchanfer.com";
  const aboutTitle = (dict.meta as Record<string, string>).aboutTitle ?? "About CHANFER";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}` },
      { "@type": "ListItem", position: 2, name: aboutTitle, item: `${baseUrl}/${locale}/about` },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header dict={dict} locale={locale} />

      <main className="flex-1">
        {/* Page header */}
        <section className="bg-muted hero-pattern">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
            <h1 className="text-3xl md:text-5xl font-bold">
              {about.title1}{" "}
              <span className="gradient-text">{about.title2}</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
              {about.description}
            </p>
          </div>
        </section>

        {/* Company overview */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {overview.title}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p dangerouslySetInnerHTML={{ __html: overview.intro1 }} />
                  <p>{overview.intro2}</p>
                </div>

                {/* Two divisions */}
                <div className="mt-6 mb-8 grid gap-4">
                  <div className="p-5 rounded-xl border border-border bg-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Factory size={20} />
                      </div>
                      <h3 className="font-bold text-lg">
                        {overviewEquipment.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {overviewEquipment.desc}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-border bg-card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent-dark flex items-center justify-center">
                        <Building2 size={20} />
                      </div>
                      <h3 className="font-bold text-lg">
                        {overviewContract.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {overviewContract.desc}
                    </p>
                  </div>
                </div>

                {/* Stats — moved up next to company intro */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {statsList.map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 md:p-5 rounded-xl border border-border bg-card card-hover"
                    >
                      <div className="text-primary mb-1.5">{stat.icon}</div>
                      <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs md:text-sm font-medium">{stat.label}</div>
                      <div className="text-[11px] md:text-xs text-muted-foreground mt-0.5">
                        {stat.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Factory photo */}
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-border bg-muted">
                  <Image
                    src="/images/company/factory-showcase.png"
                    alt="CHANFER Factory - Manufacturing Facility and Office Building"
                    width={1050}
                    height={850}
                    className="w-full h-auto object-cover"
                    unoptimized
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-border bg-muted">
                  <Image
                    src="/images/company/intro-area.png"
                    alt="CHANFER Company Introduction - Equipment & Service Overview"
                    width={2200}
                    height={1420}
                    className="w-full h-auto object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 md:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {milestones.title}
            </h2>
            <div className="rounded-xl overflow-hidden border border-border shadow-sm">
              <Image
                src="/images/company/timeline.jpg"
                alt="CHANFER Development Milestones - From 2011 to 2025"
                width={1920}
                height={860}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {certs.title as string}
            </h2>

            {/* Certifications carousel */}
            <div className="mb-10">
              <CertCarousel images={certImages} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {certList.map((cert, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-border bg-card text-center card-hover"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <Award size={24} />
                  </div>
                  <h3 className="font-bold text-sm">{cert.title}</h3>
                  <p className="text-xs text-primary font-medium mt-1">
                    {sinceTemplate.replace("{year}", cert.year)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {cert.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two locations */}
        <section className="py-12 md:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {facilities.title as string}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Guangzhou */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{guangzhou.title as string}</h3>
                    <p className="text-xs text-muted-foreground">
                      {guangzhou.subtitle as string}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>{facilities.address}:</strong> {companyInfo.address.street},{" "}
                    {companyInfo.address.district}, {companyInfo.address.city},{" "}
                    {companyInfo.address.province}, {companyInfo.address.country}
                  </p>
                  <p>
                    <strong>{facilities.phone}:</strong> {companyInfo.contact.phone}
                  </p>
                  <p>
                    <strong>{facilities.mobile}:</strong> {companyInfo.contact.mobile}
                  </p>
                  <p>
                    <strong>{facilities.email}:</strong> {companyInfo.contact.email}
                  </p>
                </div>
              </div>

              {/* Dongguan */}
              <div className="p-6 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent-dark flex items-center justify-center">
                    <Factory size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{dongguan.title as string}</h3>
                    <p className="text-xs text-muted-foreground">
                      {dongguan.subtitle as string}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>{facilities.address}:</strong>{" "}
                    {companyInfo.dongguanAddress.street},{" "}
                    {companyInfo.dongguanAddress.district},{" "}
                    {companyInfo.dongguanAddress.city},{" "}
                    {companyInfo.dongguanAddress.province},{" "}
                    {companyInfo.dongguanAddress.country}
                  </p>
                  <p>
                    <strong>{facilities.phone}:</strong> {companyInfo.contact.dongguanPhone}
                  </p>
                  <p>
                    <strong>{facilities.facility}:</strong> 12,000m² production area with
                    5,000m² cleanroom
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
