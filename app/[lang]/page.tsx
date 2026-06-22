import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Package,
  Zap,
  Shield,
  Users,
  Award,
  Factory,
  CheckCircle2,
  Cpu,
  Eye,
  Bot,
  Boxes,
  Cog,
  Layers,
  PlayCircle,
} from "lucide-react";
import { packagingSolutions, companyInfo } from "@/lib/data";
import { getDictionary, t, type Dictionary } from "@/lib/i18n/dictionaries";
import { type Locale } from "@/lib/i18n/config";
import type { PackagingSolution } from "@/lib/data";

const packagingIcons = [
  <Package key="candy" className="w-6 h-6" />,
  <Layers key="self-adhesive" className="w-6 h-6" />,
  <Boxes key="four-sides" className="w-6 h-6" />,
  <Zap key="banding" className="w-6 h-6" />,
  <Shield key="heat-shrink" className="w-6 h-6" />,
  <Factory key="three-dimensional" className="w-6 h-6" />,
];

  // 首页卡片图（建议尺寸：宽:高 = 4:3，如 800×600px）
  const methodImages = [
    "/images/solutions/home/candy-packaging.png",
    "/images/solutions/home/self-adhesive-strip.png",
    "/images/solutions/home/four-sides-sealed.png",
    "/images/solutions/home/banding.png",
    "/images/solutions/home/heat-shrink.png",
    "/images/solutions/home/three-dimensional.png",
  ];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const hero = dict.hero as Record<string, string>;
  const statsDict = dict.stats as Record<string, string>;
  const methodsDict = dict.methods as Record<string, string>;
  const whyUsDict = dict.whyUs as Record<string, unknown>;
  const smartDict = dict.smartSystem as Record<string, unknown>;
  const smartFeatures = smartDict.features as string[];
  const smartComparison = smartDict.comparison as Record<string, unknown>;
  const compLabels = smartComparison.labels as Record<string, string>;
  const compTraditional = smartComparison.traditional as Record<string, string>;
  const compChanfer = smartComparison.chanfer as Record<string, string>;
  const certsDict = dict.certifications as Record<string, string>;
  const timelineDict = dict.timeline as Record<string, string>;

  // Localize packaging solutions for homepage cards
  const solData = (dict.solutions as Record<string, unknown>)?.solutionsData as
    Record<string, { name: string; description: string }> | undefined;
  const localizedSolutions: PackagingSolution[] = packagingSolutions.map((sol) => {
    const t = solData?.[sol.id];
    if (t) return { ...sol, name: t.name, description: t.description };
    return sol;
  });

  const whyUsItems = [
    "equipment", "service", "smart", "ai", "integration", "quality"
  ] as const;
  const whyUsIcons = [
    <Factory key="f" className="w-7 h-7" />,
    <Package key="p" className="w-7 h-7" />,
    <Cpu key="c" className="w-7 h-7" />,
    <Eye key="e" className="w-7 h-7" />,
    <Bot key="b" className="w-7 h-7" />,
    <Shield key="s" className="w-7 h-7" />,
  ];
  const whyUs = whyUsItems.map((key, i) => {
    const item = whyUsDict[key] as Record<string, string>;
    return { icon: whyUsIcons[i], title: item.title, desc: item.desc };
  });

  const stats = [
    { icon: <Users className="w-5 h-5" />, value: companyInfo.clients, label: statsDict.clients },
    { icon: <Award className="w-5 h-5" />, value: companyInfo.patents, label: statsDict.patents },
    { icon: <Factory className="w-5 h-5" />, value: companyInfo.experience + " Yrs", label: statsDict.experience },
    { icon: <Cog className="w-5 h-5" />, value: "100+", label: statsDict.team },
  ];

  const comparisonRows = [
    { label: compLabels.labor, traditional: compTraditional.labor, chanfer: compChanfer.labor },
    { label: compLabels.errorRate, traditional: compTraditional.errorRate, chanfer: compChanfer.errorRate },
    { label: compLabels.batchSize, traditional: compTraditional.batchSize, chanfer: compChanfer.batchSize },
    { label: compLabels.changeover, traditional: compTraditional.changeover, chanfer: compChanfer.changeover },
    { label: compLabels.qualityAssurance, traditional: compTraditional.qualityAssurance, chanfer: compChanfer.qualityAssurance },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header dict={dict} locale={locale} />

      <main className="flex-1">
        {/* Hero Section — Full-screen immersive banner */}
        <section className="relative min-h-[580px] md:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden">
          {/* Background: expo photo (clean version — no expo text) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-banner-clean.jpg"
              alt="CHANFER Smart Card Packaging Line — Automated Packaging Equipment"
              fill
              className="object-cover object-center"
              priority
              unoptimized
            />
            {/* Overlay: dark left-to-right gradient so text is always legible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b3e]/92 via-[#0d1b3e]/65 to-transparent" />
            {/* Bottom fade to page bg */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20 bg-white/10 backdrop-blur-sm text-white/90">
                <Zap size={13} className="text-accent" />
                {hero.badge}
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.08] tracking-tight text-white drop-shadow">
                {hero.title1}{" "}
                <span className="text-accent">{hero.titleHighlight}</span>
                <br />
                <span>{hero.title2}</span>
              </h1>

              {/* Description */}
              <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed max-w-xl">
                {hero.description}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/solutions`}
                  className="group px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-accent/30 hover:shadow-accent/50 flex items-center gap-2 text-sm"
                >
                  {hero.cta1} <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="px-8 py-4 border-2 border-white/25 hover:border-white/50 text-white font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm text-sm"
                >
                  {hero.cta2}
                </Link>
              </div>

              {/* Stats strip */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/8 backdrop-blur-md border border-white/12 hover:bg-white/14 transition-colors"
                  >
                    <div className="shrink-0 text-accent">{stat.icon}</div>
                    <div>
                      <div className="text-lg font-bold text-white leading-tight">{stat.value}</div>
                      <div className="text-[11px] text-white/55 hidden sm:block">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6 Packaging Methods */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                {methodsDict.title}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                {methodsDict.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localizedSolutions.map((sol, i) => (
                <Link
                  key={sol.id}
                  href={`/${locale}/solutions#${sol.id}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden card-hover hover:border-primary"
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={methodImages[i]}
                      alt={sol.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {sol.videoId && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <PlayCircle className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                    )}
                    <span className="absolute bottom-3 right-3 text-xs font-medium px-2.5 py-1 bg-accent/90 text-primary rounded-full backdrop-blur-sm">
                      {sol.speed}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {sol.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {sol.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
                      {methodsDict.viewLine} <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why CHANFER */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                {whyUsDict.title as string}
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                {whyUsDict.description as string}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyUs.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-border bg-card card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Card Dispatching System */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent-dark rounded-full text-sm font-medium mb-4">
                  <Cpu size={14} />
                  {smartDict.badge as string}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  {smartDict.title as string}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {smartDict.description as string}
                </p>
                <ul className="mt-6 space-y-3">
                  {smartFeatures.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="font-bold text-lg mb-6">
                  {smartComparison.title as string}
                </h3>
                <div className="space-y-4">
                  {comparisonRows.map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-3 text-sm">
                      <div className="font-medium text-muted-foreground">
                        {row.label}
                      </div>
                      <div className="text-destructive/80 text-center">
                        {row.traditional}
                      </div>
                      <div className="text-accent-dark font-medium text-center">
                        {row.chanfer}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border text-xs font-bold text-muted-foreground">
                  <div></div>
                  <div className="text-center text-destructive/60">
                    ❌ {smartComparison.traditionalLabel as string}
                  </div>
                  <div className="text-center text-accent">✓ {smartComparison.chanferLabel as string}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications & Trust */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {certsDict.title}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              {certsDict.description}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {companyInfo.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-5 py-2.5 bg-muted rounded-lg text-sm font-medium"
                >
                  <Award size={16} className="text-primary" />
                  {cert}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {companyInfo.partners.map((partner, i) => (
                <div
                  key={i}
                  className="px-5 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                {timelineDict.title}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {timelineDict.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {companyInfo.milestones.slice(0, 10).map((ms, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl p-4 card-hover"
                >
                  <div className="text-2xl font-bold text-primary">
                    {ms.year}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {ms.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
