"use client";

import { useState } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  title: string;
  items: FAQItem[];
};

export default function FAQContent({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const faqPage = dict.faqPage as Record<string, unknown>;
  const hero = faqPage.hero as Record<string, string>;
  const categories = faqPage.categories as FAQCategory[];
  const cta = faqPage.cta as Record<string, string>;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  // Flatten all items for search
  const allCategories = categories || [];
  const filteredCategories =
    activeCategory === "all"
      ? allCategories
      : allCategories.filter((cat) => cat.id === activeCategory);

  const searchedCategories = searchQuery
    ? filteredCategories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : filteredCategories;

  const totalCount = allCategories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20 bg-white/10 backdrop-blur-sm">
            <HelpCircle size={14} className="text-accent" />
            {hero.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {hero.title}
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            {hero.description}
          </p>
          <div className="mt-4 text-sm text-white/50">
            {totalCount} {hero.questionsLabel}
          </div>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          {/* Search */}
          <div className="relative mb-3">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={hero.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-muted/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-sm transition-all"
            />
          </div>
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {hero.allCategories}
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 md:py-16 flex-1">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {searchedCategories.length === 0 ? (
            <div className="text-center py-20">
              <Search
                size={48}
                className="mx-auto text-muted-foreground/40 mb-4"
              />
              <p className="text-muted-foreground">{hero.noResults}</p>
            </div>
          ) : (
            <div className="space-y-10">
              {searchedCategories.map((category) => (
                <div key={category.id}>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-accent rounded-full" />
                    {category.title}
                  </h2>
                  <div className="space-y-2">
                    {category.items.map((item, idx) => {
                      const itemId = `${category.id}-${idx}`;
                      const isOpen = openId === itemId;
                      return (
                        <div
                          key={itemId}
                          className={`border rounded-xl overflow-hidden transition-all ${
                            isOpen
                              ? "border-accent/40 shadow-sm"
                              : "border-border"
                          }`}
                        >
                          <button
                            onClick={() =>
                              setOpenId(isOpen ? null : itemId)
                            }
                            className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-muted/40 transition-colors"
                            aria-expanded={isOpen}
                          >
                            <span className="font-medium text-sm md:text-base">
                              {item.question}
                            </span>
                            <ChevronDown
                              size={18}
                              className={`shrink-0 text-muted-foreground transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">{cta.title}</h2>
          <p className="mt-3 text-muted-foreground">{cta.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-3.5 bg-accent text-primary font-bold rounded-xl hover:bg-accent-dark transition-colors text-sm"
            >
              {cta.button1}
            </Link>
            <Link
              href={`/${locale}/solutions`}
              className="px-8 py-3.5 border-2 border-border font-bold rounded-xl hover:border-primary hover:text-primary transition-colors text-sm"
            >
              {cta.button2}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
