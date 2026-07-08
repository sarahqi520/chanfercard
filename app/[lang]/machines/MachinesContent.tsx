"use client";

import { useState } from "react";
import { type Dictionary, t } from "@/lib/i18n/dictionaries";
import { machineProducts } from "@/lib/data";
import {
  Cog,
  Package,
  Boxes,
  Bot,
  Eye,
  Search,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  dict: Dictionary;
  locale: string;
}

function formatStr(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

const categories = [
  { id: "all", icon: <Cog className="w-4 h-4" /> },
  { id: "feeding", icon: <Package className="w-4 h-4" /> },
  { id: "packaging", icon: <Package className="w-4 h-4" /> },
  { id: "boxing", icon: <Boxes className="w-4 h-4" /> },
  { id: "palletizing", icon: <Bot className="w-4 h-4" /> },
  { id: "ai", icon: <Eye className="w-4 h-4" /> },
];

const categoryColors: Record<string, string> = {
  feeding: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
  packaging: "border-green-500 bg-green-50 dark:bg-green-900/20",
  boxing: "border-amber-500 bg-amber-50 dark:bg-amber-900/20",
  palletizing: "border-purple-500 bg-purple-50 dark:bg-purple-900/20",
  ai: "border-rose-500 bg-rose-50 dark:bg-rose-900/20",
};

const categoryBadge: Record<string, string> = {
  feeding: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  packaging: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  boxing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  palletizing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  ai: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

export default function MachinesContent({ dict, locale }: Props) {
  const machinesDict = dict.machines as Record<string, unknown>;
  const categoriesDict = machinesDict.categories as Record<string, string>;
  const machinesData = (machinesDict.machinesData as Record<string, Record<string, string>>) ?? {};

  // Helper: get translated machine field
  const tm = (machineId: string, field: string, fallback: string): string => {
    const md = machinesData[machineId];
    return md?.[field] ?? fallback;
  };

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryLabel: Record<string, string> = {
    feeding: categoriesDict.feeding,
    packaging: categoriesDict.packaging,
    boxing: categoriesDict.boxing,
    palletizing: categoriesDict.palletizing,
    ai: categoriesDict.ai,
  };

  const filtered = machineProducts.filter((m) => {
    const matchCategory =
      activeCategory === "all" || m.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="flex-1">
      {/* Page header */}
      <section className="bg-muted hero-pattern">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold">
            {machinesDict.title1 as string}{" "}
            <span className="gradient-text">{machinesDict.title2 as string}</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            {machinesDict.description as string}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    activeCategory === cat.id
                      ? "bg-primary text-white"
                      : "bg-muted hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat.icon}
                  {cat.id === "all"
                    ? categoriesDict.all
                    : categoryLabel[cat.id]}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder={machinesDict.search as string}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-sm text-muted-foreground mb-6">
            {formatStr(machinesDict.showing as string, {
              count: String(filtered.length),
              plural: filtered.length !== 1 ? "s" : "",
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((machine) => (
              <div
                key={machine.id}
                className={`border-l-4 rounded-xl bg-card overflow-hidden card-hover border-border ${categoryColors[machine.category] || ""}`}
              >
                {/* Product Image */}
                <div className="relative w-full h-48 bg-muted/30">
                  <Image
                    src={machine.image}
                    alt={`${machine.name} - ${machine.model}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                </div>

                {/* Card Body */}
                <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${categoryBadge[machine.category] || ""}`}
                    >
                      {categoryLabel[machine.category] || machine.category}
                    </span>
                    <h3 className="font-bold text-lg">{tm(machine.id, "name", machine.name)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {machinesDict.model as string}: {machine.model}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {tm(machine.id, "description", machine.description)}
                </p>

                {/* Specs */}
                <div className="bg-muted/50 rounded-lg p-3 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    {machinesDict.specifications as string}
                  </h4>
                  <div className="space-y-1">
                    {Object.entries(machine.specs)
                      .slice(0, 4)
                      .map(([key, val]) => (
                        <div
                          key={key}
                          className="flex justify-between text-xs"
                        >
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-medium">{val}</span>
                        </div>
                      ))}
                    {Object.keys(machine.specs).length > 4 && (
                      <div className="text-xs text-primary font-medium mt-1">
                        {formatStr(machinesDict.moreSpecs as string, {
                          count: String(Object.keys(machine.specs).length - 4),
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-1.5">
                  {machine.features.slice(0, 3).map((feat, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-1.5 text-xs text-muted-foreground"
                    >
                      <CheckCircle2
                        size={12}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA: View Details + Inquire */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <Link
                    href={`/${locale}/machines/${machine.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    {(machinesDict.viewDetails as string) ?? "View Details"}
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {formatStr(machinesDict.inquire as string, {
                      model: machine.model,
                    })}
                  </Link>
                </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                {machinesDict.noResults as string}
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-primary font-medium hover:text-primary-dark transition-colors"
              >
                {machinesDict.clearFilters as string}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
