// Static imports keep the bundles small (~25KB per locale) and avoid the
// dynamic-import dance that `next-intl/request.ts` needed for Next.js's
// per-request locale detection.
import en from "../../../dictionary/en.json";
import zh from "../../../dictionary/zh.json";
import type { Locale } from "./config";

export type Dictionary = typeof en;

export const dictionaries = { en, zh } as const;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
