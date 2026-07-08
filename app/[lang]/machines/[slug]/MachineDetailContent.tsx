"use client";

import Link from "next/link";
import Image from "next/image";
import { type Dictionary } from "@/lib/i18n/dictionaries";
import { machineProducts, packagingSolutions } from "@/lib/data";
import {
  Package,
  Settings,
  Boxes,
  Factory,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Wrench,
  Cpu,
  Gauge,
} from "lucide-react";

interface Props {
  dict: Dictionary;
  locale: string;
  machineId: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  feeding: <Package className="w-5 h-5" />,
  packaging: <Settings className="w-5 h-5" />,
  boxing: <Boxes className="w-5 h-5" />,
  palletizing: <Factory className="w-5 h-5" />,
  ai: <TrendingUp className="w-5 h-5" />,
};

const categoryBadgeColors: Record<string, string> = {
  feeding: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  packaging: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  boxing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  palletizing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  ai: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

export default function MachineDetailContent({ dict, locale, machineId }: Props) {
  const machine = machineProducts.find((m) => m.id === machineId);
  if (!machine) return null;

  const machinesDict = (dict.machines as Record<string, unknown>) ?? {};
  const categoriesDict = (machinesDict.categories as Record<string, string>) ?? {};
  const machineDetail = (dict.machineDetail as Record<string, Record<string, unknown>>) ?? {};
  const md = machineDetail[machineId] ?? {};

  // Translated machine data
  const machinesData = (machinesDict.machinesData as Record<string, Record<string, unknown>>) ?? {};
  const mTrans = machinesData[machineId] ?? {};
  const machineName = (mTrans.name as string) ?? machine.name;
  const machineDesc = (mTrans.description as string) ?? machine.description;
  const machineFeatures = (mTrans.features as string[]) ?? machine.features;
  const machineApplications = (mTrans.applications as string[]) ?? machine.applications;

  // SEO content
  const longDescription = (md.longDescription as string[]) ?? [];
  const relatedMachineIds = (md.relatedMachineIds as string[]) ?? [];
  const relatedSolutionIds = (md.relatedSolutionIds as string[]) ?? [];
  const relatedMachines = machineProducts.filter(
    (m) => relatedMachineIds.includes(m.id) && m.id !== machineId
  );
  const relatedSolutions = packagingSolutions.filter((s) =>
    relatedSolutionIds.includes(s.id)
  );

  const categoryLabel = categoriesDict[machine.category] ?? machine.category;
  const solutionsData = ((dict.solutions as Record<string, unknown>).solutionsData as Record<string, Record<string, unknown>>) ?? {};

  // Other machines in same category
  const sameCategoryMachines = machineProducts
    .filter((m) => m.category === machine.category && m.id !== machineId)
    .slice(0, 3);

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
            <Link href={`/${locale}/machines`} className="hover:text-primary transition-colors">
              {(dict.nav as Record<string, string>).machines}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{machine.model}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Image */}
            <div className="w-full md:w-2/5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-card">
              <Image
                src={machine.image}
                alt={`${machine.name} - ${machine.model} | CHANFER`}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryBadgeColors[machine.category] ?? ""}`}
              >
                {categoryIcons[machine.category]}
                {categoryLabel}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold">
                {machine.model}
              </h1>
              <p className="mt-1 text-xl text-muted-foreground">{machineName}</p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {machineDesc}
              </p>

              {/* Quick specs */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {Object.entries(machine.specs).slice(0, 4).map(([key, val]) => (
                  <div key={key} className="bg-card border border-border rounded-lg p-3">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Gauge size={12} />
                      {key}
                    </div>
                    <div className="text-sm font-bold mt-1">{val}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/${locale}/contact`}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-sm"
              >
                {(machinesDict.inquire as string)
                  ? (machinesDict.inquire as string).replace("{model}", machine.model)
                  : `Inquire About ${machine.model}`}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Long description */}
      {longDescription.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {longDescription.map((para, i) => (
                <p key={i} className="mt-4 text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full specs table */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-accent" />
            {(machinesDict.specifications as string) ?? "Specifications"}
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(machine.specs).map(([key, val], i) => (
                  <tr
                    key={key}
                    className={i % 2 === 0 ? "bg-muted/30" : ""}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-muted-foreground w-1/2">
                      {key}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features + Applications */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12">
          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {(machinesDict.featuresTitle as string) ?? "Key Features"}
            </h2>
            <ul className="space-y-3">
              {machineFeatures.map((feat, j) => (
                <li key={j} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Wrench className="w-6 h-6 text-accent" />
              {(machinesDict.applicationsTitle as string) ?? "Applications"}
            </h2>
            <div className="space-y-2">
              {machineApplications.map((app, j) => (
                <div
                  key={j}
                  className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <span className="text-sm">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related solutions */}
      {relatedSolutions.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">
              {(md.relatedSolutionsTitle as string) ?? "Used in These Packaging Solutions"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedSolutions.map((sol) => {
                const sTrans = solutionsData[sol.id] ?? {};
                return (
                  <Link
                    key={sol.id}
                    href={`/${locale}/solutions/${sol.id}`}
                    className="group flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      {categoryIcons[sol.id] ?? <Package className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate">
                        {(sTrans.name as string) ?? sol.name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {(sTrans.subtitle as string) ?? sol.subtitle}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related machines */}
      {(relatedMachines.length > 0 || sameCategoryMachines.length > 0) && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">
              {(md.relatedMachinesTitle as string) ?? "Related Machines"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(relatedMachines.length > 0 ? relatedMachines : sameCategoryMachines).map((m) => {
                const mTrans2 = machinesData[m.id] ?? {};
                return (
                  <Link
                    key={m.id}
                    href={`/${locale}/machines/${m.id}`}
                    className="group border border-border rounded-xl bg-card overflow-hidden card-hover"
                  >
                    <div className="relative w-full h-36 bg-muted/30">
                      <Image
                        src={m.image}
                        alt={`${m.name} - ${m.model}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                        {categoriesDict[m.category] ?? m.category}
                      </span>
                      <h3 className="font-bold mt-2 text-sm">
                        {(mTrans2.name as string) ?? m.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{m.model}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            {(md.ctaTitle as string) ?? `Interested in the ${machine.model}?`}
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            {(md.ctaDescription as string) ??
              "Get a detailed quote, technical datasheet, and custom line configuration from our engineering team."}
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
              href={`/${locale}/machines`}
              className="px-8 py-3.5 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              {(machinesDict.title1 as string) ?? "All Machines"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
