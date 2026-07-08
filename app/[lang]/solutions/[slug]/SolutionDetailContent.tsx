"use client";

import Link from "next/link";
import Image from "next/image";
import { type Dictionary } from "@/lib/i18n/dictionaries";
import { packagingSolutions, machineProducts, type PackagingSolution } from "@/lib/data";
import {
  Package,
  Layers,
  Boxes,
  Zap,
  Shield,
  Factory,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  PlayCircle,
  ChevronDown,
  Settings,
  TrendingUp,
  Clock,
  Wrench,
} from "lucide-react";
import { useState } from "react";

interface Props {
  dict: Dictionary;
  locale: string;
  solutionId: string;
}

const packagingIcons: Record<string, React.ReactNode> = {
  candy: <Package className="w-6 h-6" />,
  "self-adhesive": <Layers className="w-6 h-6" />,
  "four-sides": <Boxes className="w-6 h-6" />,
  banding: <Zap className="w-6 h-6" />,
  "heat-shrink": <Shield className="w-6 h-6" />,
  "three-dimensional": <Factory className="w-6 h-6" />,
};

const methodImages: Record<string, string> = {
  candy: "/images/solutions/detail/candy-packaging.png",
  "self-adhesive": "/images/solutions/detail/self-adhesive-strip.png",
  "four-sides": "/images/solutions/detail/four-sides-sealed.png",
  banding: "/images/solutions/detail/banding.png",
  "heat-shrink": "/images/solutions/detail/heat-shrink.png",
  "three-dimensional": "/images/solutions/detail/three-dimensional.png",
};

const lineImages: Record<string, string> = {
  candy: "/images/lines/candy-line.png",
  "self-adhesive": "/images/lines/self-adhesive-line.png",
  "four-sides": "/images/lines/four-sides-line.png",
  banding: "/images/lines/banding-line.png",
  "heat-shrink": "/images/lines/heat-shrink-line.png",
  "three-dimensional": "/images/lines/three-dimensional-line.png",
};

const typeColors: Record<string, string> = {
  feeding: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  packaging: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  boxing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  palletizing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

const categoryIcons: Record<string, React.ReactNode> = {
  feeding: <Package className="w-4 h-4" />,
  packaging: <Settings className="w-4 h-4" />,
  boxing: <Boxes className="w-4 h-4" />,
  palletizing: <Factory className="w-4 h-4" />,
  ai: <TrendingUp className="w-4 h-4" />,
};

export default function SolutionDetailContent({ dict, locale, solutionId }: Props) {
  const solution = packagingSolutions.find((s) => s.id === solutionId);
  if (!solution) return null;

  const solutionsDict = (dict.solutions as Record<string, unknown>) ?? {};
  const specsDict = (solutionsDict.specs as Record<string, string>) ?? {};
  const solutionDetail = (dict.solutionDetail as Record<string, Record<string, unknown>>) ?? {};
  const sd = solutionDetail[solutionId] ?? {};
  const machinesDict = (dict.machines as Record<string, unknown>) ?? {};
  const categoriesDict = (machinesDict.categories as Record<string, string>) ?? {};

  // Get translated solution data
  const solutionsData = (solutionsDict.solutionsData as Record<string, Record<string, unknown>>) ?? {};
  const solTrans = solutionsData[solutionId] ?? {};

  const name = (solTrans.name as string) ?? solution.name;
  const subtitle = (solTrans.subtitle as string) ?? solution.subtitle;
  const description = (solTrans.description as string) ?? solution.description;
  const features = (solTrans.features as string[]) ?? solution.features;
  const idealFor = (solTrans.idealFor as string[]) ?? solution.idealFor;
  const processStepsTrans = (solTrans.processSteps as Record<string, string>) ?? {};
  const lineComponentsTrans = (solTrans.lineComponents as Record<string, string>) ?? {};

  // SEO content
  const longDescription = (sd.longDescription as string[]) ?? [];
  const benefits = (sd.benefits as string[]) ?? [];
  const faqs = (sd.faqs as Array<{ question: string; answer: string }>) ?? [];
  const relatedMachineIds = (sd.relatedMachineIds as string[]) ?? [];
  const relatedMachines = machineProducts.filter((m) => relatedMachineIds.includes(m.id));

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const heroImage = methodImages[solutionId] ?? methodImages.candy;
  const lineImage = lineImages[solutionId] ?? lineImages.candy;
  const icon = packagingIcons[solutionId] ?? <Package className="w-6 h-6" />;

  // Other solutions for navigation
  const otherSolutions = packagingSolutions.filter((s) => s.id !== solutionId);

  return (
    <main className="flex-1">
      {/* Hero section */}
      <section className="relative bg-muted hero-pattern">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href={`/${locale}`} className="hover:text-primary transition-colors">
              {(dict.nav as Record<string, string>).home}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/solutions`} className="hover:text-primary transition-colors">
              {(dict.nav as Record<string, string>).solutions}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{name}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/90 text-primary flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">
                {name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main image */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="relative w-full aspect-[2.5/1] rounded-2xl overflow-hidden border border-border bg-muted">
            <Image
              src={heroImage}
              alt={`${name} - CHANFER card packaging solution`}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        </div>
      </section>

      {/* Long description */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              {description}
            </p>
            {longDescription.map((para, i) => (
              <p key={i} className="mt-4 text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Specs table */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">
            {((solutionsDict.specs as Record<string, unknown>).title as string) ??
              "Technical Specifications"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: specsDict.speed ?? "Speed", value: solution.speed },
              { label: specsDict.filmDia ?? "Film Roll Dia.", value: solution.filmDiameter },
              { label: specsDict.filmWidth ?? "Film Width", value: solution.filmWidth },
              { label: specsDict.innerDia ?? "Inner Dia.", value: solution.filmInnerDiameter },
              { label: specsDict.voltage ?? "Voltage", value: solution.voltage },
            ].map((spec, j) => (
              <div key={j} className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {spec.label}
                </div>
                <div className="text-sm font-bold mt-1">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features + Benefits */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12">
          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {(solutionsDict.keyFeatures as string) ?? "Key Features"}
            </h2>
            <ul className="space-y-3">
              {features.map((feat, j) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          {benefits.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-accent" />
                {(sd.benefitsTitle as string) ?? "Key Benefits"}
              </h2>
              <ul className="space-y-3">
                {benefits.map((benefit, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Ideal for */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-xl font-bold mb-4">
            {(solutionsDict.idealFor as string) ?? "Ideal For"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {idealFor.map((item, j) => (
              <span
                key={j}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-primary/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      {solution.videoId && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">
              {(solutionsDict.watchInAction as string) ?? "Watch in Action"}
            </h2>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${solution.videoId}?rel=0`}
                title={`${name} - Video Demonstration`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* Production line */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">
            {(solutionsDict.completeLine as string) ?? "Complete Production Line"}
          </h2>
          <div className="rounded-2xl overflow-hidden border border-border bg-white mb-8">
            <Image
              src={lineImage}
              alt={`${name} - Full Production Line`}
              width={1200}
              height={400}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          {/* Line components */}
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
            {(solutionsDict.lineComponents as string) ?? "Production Line Components"}
          </h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {solution.lineComponents.map((comp) => (
              <span
                key={comp.id}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${typeColors[comp.type] || "bg-muted text-muted-foreground"}`}
              >
                {comp.id}. {lineComponentsTrans[comp.name] ?? comp.name}
              </span>
            ))}
          </div>

          {/* Process flow */}
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
            {(solutionsDict.process as string) ?? "Packaging Process"}
          </h3>
          <div className="flex flex-wrap gap-2 items-center">
            {solution.processSteps.map((step, j) => (
              <div key={j} className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                    {step.step}
                  </span>
                  <span>{processStepsTrans[step.step] ?? step.label}</span>
                </div>
                {j < solution.processSteps.length - 1 && (
                  <ArrowRight size={14} className="text-muted-foreground hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related machines */}
      {relatedMachines.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">
              {(sd.relatedMachinesTitle as string) ?? "Recommended Machines for This Solution"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedMachines.map((machine) => (
                <Link
                  key={machine.id}
                  href={`/${locale}/machines/${machine.id}`}
                  className="group border border-border rounded-xl bg-card overflow-hidden card-hover"
                >
                  <div className="relative w-full h-40 bg-muted/30">
                    <Image
                      src={machine.image}
                      alt={`${machine.name} - ${machine.model}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                      {categoriesDict[machine.category] ?? machine.category}
                    </span>
                    <h3 className="font-bold mt-2 text-sm">{machine.name}</h3>
                    <p className="text-xs text-muted-foreground">{machine.model}</p>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {machine.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      {(sd.viewMachineDetails as string) ?? "View Details"}
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {(sd.faqTitle as string) ?? "Frequently Asked Questions"}
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-sm pr-4">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-muted-foreground transition-transform ${
                        expandedFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            {(sd.ctaTitle as string) ?? `Ready to Automate Your ${name}?`}
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            {(sd.ctaDescription as string) ??
              "Our engineers will design a custom packaging line tailored to your card specifications and production volume."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-accent hover:text-white transition-colors"
            >
              {(dict.contact as Record<string, string>).title1
                ? `${(dict.contact as Record<string, string>).title1} ${(dict.contact as Record<string, string>).title2}`
                : "Get a Quote"}
            </Link>
            <Link
              href={`/${locale}/solutions`}
              className="px-8 py-3.5 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              {(solutionsDict.title1 as string) ?? "All Solutions"}
            </Link>
          </div>
        </div>
      </section>

      {/* Other solutions navigation */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
            {(sd.otherSolutionsTitle as string) ?? "Other Packaging Methods"}
          </h3>
          <div className="flex flex-wrap gap-3">
            {otherSolutions.map((s) => {
              const sTrans = solutionsData[s.id] ?? {};
              return (
                <Link
                  key={s.id}
                  href={`/${locale}/solutions/${s.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {packagingIcons[s.id]}
                  {(sTrans.name as string) ?? s.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
