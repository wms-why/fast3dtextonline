import { useI18nContext } from "./provider";
import type { Locale } from "./config";

/** Returns the active locale in the current React tree. */
export function useLocale(): Locale {
  return useI18nContext().locale;
}
