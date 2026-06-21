import type { Locale } from "./config";

export type Dictionary = Record<string, unknown>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  zh: () => import("@/messages/zh.json").then((m) => m.default),
  ru: () => import("@/messages/ru.json").then((m) => m.default),
  it: () => import("@/messages/it.json").then((m) => m.default),
  de: () => import("@/messages/de.json").then((m) => m.default),
  fr: () => import("@/messages/fr.json").then((m) => m.default),
  es: () => import("@/messages/es.json").then((m) => m.default),
  ko: () => import("@/messages/ko.json").then((m) => m.default),
  ja: () => import("@/messages/ja.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale];
  if (!loader) {
    return dictionaries.en();
  }
  return loader();
}

/** Type-safe nested key access: t("nav.home") → "Home" */
export function t(dict: Dictionary, key: string): string {
  const keys = key.split(".");
  let result: unknown = dict;
  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key; // Fallback to key path
    }
  }
  return typeof result === "string" ? result : key;
}
