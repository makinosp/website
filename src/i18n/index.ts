import type { Dictionary } from "./dictionary.ts";
import { en } from "./en.ts";
import { ja } from "./ja.ts";
import { zhCn } from "./zh-cn.ts";
import type { Locale } from "./locales.ts";

export type { Dictionary };

const DICTIONARIES: Record<Locale, Dictionary> = {
  en,
  ja,
  "zh-cn": zhCn,
};

export const getDictionary = (locale: Locale): Dictionary => {
  return DICTIONARIES[locale];
}

export const formatTemplate = (template: string, values: Record<string, string | number>): string => {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}
