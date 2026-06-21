export const locales = ["en", "zh", "ru", "it", "de", "fr", "es", "ko", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, { native: string; english: string }> = {
  en: { native: "English", english: "English" },
  zh: { native: "简体中文", english: "Chinese (Simplified)" },
  ru: { native: "Русский", english: "Russian" },
  it: { native: "Italiano", english: "Italian" },
  de: { native: "Deutsch", english: "German" },
  fr: { native: "Français", english: "French" },
  es: { native: "Español", english: "Spanish" },
  ko: { native: "한국어", english: "Korean" },
  ja: { native: "日本語", english: "Japanese" },
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  zh: "🇨🇳",
  ru: "🇷🇺",
  it: "🇮🇹",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  ko: "🇰🇷",
  ja: "🇯🇵",
};

/** HTML lang attribute mapping */
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
  ru: "ru",
  it: "it",
  de: "de",
  fr: "fr",
  es: "es",
  ko: "ko",
  ja: "ja",
};

/** OG locale mapping for Open Graph */
export const localeOgLocale: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
  ru: "ru_RU",
  it: "it_IT",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  ko: "ko_KR",
  ja: "ja_JP",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
