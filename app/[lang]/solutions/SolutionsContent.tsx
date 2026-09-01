"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Dictionary } from "@/lib/i18n/dictionaries";
import { packagingSolutions, type PackagingSolution } from "@/lib/data";
import {
  Package,
  Layers,
  Boxes,
  Zap,
  Shield,
  Factory,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  PlayCircle,
} from "lucide-react";

interface Props {
  dict: Dictionary;
  locale: string;
}

const packagingIcons = [
  <Package key="candy" className="w-7 h-7" />,
  <Layers key="self-adhesive" className="w-7 h-7" />,
  <Boxes key="four-sides" className="w-7 h-7" />,
  <Zap key="banding" className="w-7 h-7" />,
  <Shield key="heat-shrink" className="w-7 h-7" />,
  <Factory key="three-dimensional" className="w-7 h-7" />,
];

// Solutions 页面头图（建议尺寸：宽幅横图，如 1200×500px 左右，16:9 或更宽）
const methodImages = [
  "/images/solutions/detail/candy-packaging.png",
  "/images/solutions/detail/self-adhesive-strip.png",
  "/images/solutions/detail/four-sides-sealed.png",
  "/images/solutions/detail/banding.png",
  "/images/solutions/detail/heat-shrink.png",
  "/images/solutions/detail/three-dimensional.png",
];

const lineImages = [
  "/images/lines/candy-line.png",
  "/images/lines/self-adhesive-line.png",
  "/images/lines/four-sides-line.png",
  "/images/lines/banding-line.png",
  "/images/lines/heat-shrink-line.png",
  "/images/lines/three-dimensional-line.png",
];

const typeColors: Record<string, string> = {
  feeding: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  packaging: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  boxing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  palletizing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function SolutionsContent({ dict, locale }: Props) {
  const solutionsDict = (dict.solutions as Record<string, unknown>) ?? {};
  const specsDict = (solutionsDict.specs as Record<string, string>) ?? {};
  const ctaDict = (solutionsDict.cta as Record<string, string>) ?? {};
  // Get translated solution data
  const solutionsData = (solutionsDict.solutionsData as Record<string, Record<string, unknown>>) ?? {};

  // Helper: get localized text for a solution field
  const t = (solId: string, field: string): string | undefined => {
    const sd = solutionsData[solId];
    if (!sd) return undefined;
    const val = sd[field];
    return typeof val === 'string' ? val : undefined;
  };

  // Helper: get localized array for a solution field
  const ta = (solId: string, field: string): string[] | undefined => {
    const sd = solutionsData[solId];
    if (!sd) return undefined;
    const val = sd[field];
    if (Array.isArray(val)) return val as string[];
    return undefined;
  };

  // Helper: get localized process steps
  const tp = (solId: string): Record<string, string> | undefined => {
    const sd = solutionsData[solId];
    if (!sd) return undefined;
    const val = sd['processSteps'];
    if (val && typeof val === 'object' && !Array.isArray(val)) return val as Record<string, string>;
    return undefined;
  };

  // Helper: translate line component names
  const tlcMap = (solId: string): Record<string, string> | undefined => {
    const sd = solutionsData[solId];
    if (!sd) return undefined;
    const val = sd['lineComponents'];
    if (val && typeof val === 'object' && !Array.isArray(val)) return val as Record<string, string>;
    return undefined;
  };

  // Localize a single packaging solution
  const localizeSol = (sol: PackagingSolution) => {
    const solId = sol.id;
    const lcMap = tlcMap(solId);
    const ps = tp(solId);
    return {
      ...sol,
      name: t(solId, 'name') ?? sol.name,
      subtitle: t(solId, 'subtitle') ?? sol.subtitle,
      description: t(solId, 'description') ?? sol.description,
      features: ta(solId, 'features') ?? sol.features,
      processSteps: sol.processSteps.map((step) => ({
        ...step,
        label: (ps?.[step.step] as string) ?? step.label,
      })),
      lineComponents: sol.lineComponents.map((comp) => ({
        ...comp,
        name: (lcMap?.[comp.name] as string) ?? comp.name,
      })),
      idealFor: ta(solId, 'idealFor') ?? sol.idealFor,
    };
  };

  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedSolution(expandedSolution === id ? null : id);
  };

  return (
    <main className="flex-1">
      {/* Page header */}
      <section className="bg-muted hero-pattern">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold">
            {(solutionsDict.title1 as string) ?? "Card Packaging"}{" "}
            <span className="gradient-text">
              {(solutionsDict.title2 as string) ?? "Solutions"}
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            {(solutionsDict.description as string) ?? ""}
          </p>

          {/* Quick nav */}
          <div className="mt-8 flex flex-wrap gap-2">
            {packagingSolutions.map(localizeSol).map((sol, i) => (
              <a
                key={sol.id}
                href={`#${sol.id}`}
                className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors flex items-center gap-2"
              >
                {packagingIcons[i]}
                {sol.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions detail */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-16">
          {packagingSolutions.map(localizeSol).map((sol, i) => {
            const isExpanded = expandedSolution === sol.id;
            return (
              <div
                key={sol.id}
                id={sol.id}
                className="scroll-mt-24 border border-border rounded-2xl overflow-hidden bg-card"
              >
                {/* Solution header with image */}
                <div className="relative h-48 md:h-64 overflow-hidden bg-muted">
                  <Image
                    src={methodImages[i]}
                    alt={`${sol.name} - Production Line from CHANFER Catalog`}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  {/* Overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/90 text-primary flex items-center justify-center shrink-0 backdrop-blur-sm">
                          {packagingIcons[i]}
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {sol.name}
                          </h2>
                          <p className="text-sm text-white/80 mt-1">
                            {sol.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="px-4 py-1.5 bg-accent text-primary rounded-full text-sm font-bold shrink-0 backdrop-blur-sm">
                        {sol.speed}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {sol.description}
                  </p>

                  {/* Specs table */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      {
                        label: specsDict.speed ?? "Speed",
                        value: sol.speed,
                      },
                      {
                        label: specsDict.filmDia ?? "Film Roll Dia.",
                        value: sol.filmDiameter,
                      },
                      {
                        label: specsDict.filmWidth ?? "Film Width",
                        value: sol.filmWidth,
                      },
                      {
                        label: specsDict.innerDia ?? "Inner Dia.",
                        value: sol.filmInnerDiameter,
                      },
                      {
                        label: specsDict.voltage ?? "Voltage",
                        value: sol.voltage,
                      },
                    ].map((spec, j) => (
                      <div
                        key={j}
                        className="bg-muted/50 rounded-lg p-3 text-center"
                      >
                        <div className="text-xs text-muted-foreground">
                          {spec.label}
                        </div>
                        <div className="text-sm font-bold mt-0.5">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mt-6">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                      {(solutionsDict.keyFeatures as string) ?? "Key Features"}
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {sol.features.map((feat, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2
                            size={15}
                            className="mt-0.5 shrink-0 text-accent"
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal for */}
                  <div className="mt-6">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                      {(solutionsDict.idealFor as string) ?? "Ideal For"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sol.idealFor.map((item, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-primary/5 text-primary/80 rounded-full text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Video showcase */}
                  <div className="mt-6">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                      {(solutionsDict.watchInAction as string) ?? "Watch in Action"}
                    </h3>
                    {sol.videoId ? (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${sol.videoId}?rel=0`}
                          title={`${sol.name} - Video Demonstration`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted group cursor-default">
                        <Image
                          src={methodImages[i]}
                          alt={`${sol.name} - Video Placeholder`}
                          fill
                          className="object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                          unoptimized
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <PlayCircle className="w-10 h-10 text-white" />
                          </div>
                          <span className="text-sm font-medium text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                            {(solutionsDict.videoComingSoon as string) ??
                              "Video Coming Soon"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Detail page link + Expand button */}
                  <div className="mt-6 flex items-center gap-4">
                    <Link
                      href={`/${locale}/solutions/${sol.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      {(solutionsDict.viewDetails as string) ?? "View Details"}
                      <ArrowRight size={14} />
                    </Link>
                    <button
                      onClick={() => toggleExpand(sol.id)}
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      {(isExpanded
                        ? (solutionsDict.hideLine as string)
                        : (solutionsDict.showLine as string)) ??
                        (isExpanded
                          ? "Hide Production Line & Process"
                          : "Show Production Line & Process")}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Expanded: Production line & process */}
                {isExpanded && (
                  <div className="border-t border-border bg-muted/30 p-6 md:p-8 animate-fade-in space-y-8">
                    {/* Production line photo */}
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                        {(solutionsDict.completeLine as string) ??
                          "Complete Production Line"}
                      </h3>
                      <div className="rounded-xl overflow-hidden border border-border bg-white">
                        <Image
                          src={lineImages[i]}
                          alt={`${sol.name} - Full Production Line from CHANFER Catalog`}
                          width={1200}
                          height={400}
                          className="w-full h-auto"
                          unoptimized
                        />
                      </div>
                    </div>

                    {/* Line components */}
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                      {(solutionsDict.lineComponents as string) ??
                        "Production Line Components"}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {sol.lineComponents.map((comp) => (
                        <span
                          key={comp.id}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium ${typeColors[comp.type] || "bg-muted text-muted-foreground"}`}
                        >
                          {comp.id}. {comp.name}
                        </span>
                      ))}
                    </div>

                    {/* Process flow */}
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                      {(solutionsDict.process as string) ?? "Packaging Process"}
                    </h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      {sol.processSteps.map((step, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm">
                            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                              {step.step}
                            </span>
                            <span>{step.label}</span>
                          </div>
                          {j < sol.processSteps.length - 1 && (
                            <ArrowRight
                              size={14}
                              className="text-muted-foreground hidden sm:block"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={`/${locale}/contact`}
                        className="px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        {(solutionsDict.requestLine as string) ??
                          "Request This Line"}
                      </Link>
                      <Link
                        href={`/${locale}/machines`}
                        className="px-6 py-2.5 border border-border text-sm font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors"
                      >
                        {(solutionsDict.viewMachines as string) ??
                          "View Individual Machines"}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            {ctaDict.title ?? "Not Sure Which Packaging Method Fits?"}
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            {ctaDict.description ??
              "Our engineers will analyze your card product specifications and recommend the optimal packaging method and line configuration."}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-flex px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-accent hover:text-white transition-colors"
          >
            {ctaDict.button ?? "Get Free Consultation"}
          </Link>
        </div>
      </section>
    </main>
  );
}
