export type Locale = "en" | "ja" | "zh-cn";

export interface LocaleInfo {
  code: Locale;
  htmlLang: string;
  ogLocale: string;
  path: string;
  shortLabel: string;
  fullName: string;
}

export const LOCALES: LocaleInfo[] = [
  { code: "en", htmlLang: "en", ogLocale: "en_US", path: "/", shortLabel: "EN", fullName: "English" },
  { code: "ja", htmlLang: "ja", ogLocale: "ja_JP", path: "/ja/", shortLabel: "日本語", fullName: "日本語" },
  { code: "zh-cn", htmlLang: "zh-CN", ogLocale: "zh_CN", path: "/zh-cn/", shortLabel: "中文", fullName: "简体中文" },
];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_STORAGE_KEY = "locale";

export const DISPLAY_NAMES: Record<Locale, string> = {
  en: "Makie",
  ja: "まきのん",
  "zh-cn": "牧野",
};

export function getLocaleInfo(locale: Locale): LocaleInfo {
  const found = LOCALES.find((entry) => entry.code === locale);
  if (!found) {
    throw new Error(`Unknown locale: ${locale}`);
  }
  return found;
}

export function getLocalePath(locale: Locale): string {
  return getLocaleInfo(locale).path;
}
