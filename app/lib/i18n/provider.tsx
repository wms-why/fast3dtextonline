// Client-side React context for the active locale + dictionary.
// The provider is mounted by `app/layouts/locale.tsx` and reads the locale
// from the URL prefix at hydration time.
import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { getDictionary, type Dictionary } from "./dictionaries";
import type { Locale } from "./config";

export interface I18nContextValue {
  locale: Locale;
  dictionary: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo<I18nContextValue>(
    () => ({ locale, dictionary: getDictionary(locale) }),
    [locale],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18nContext(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18nContext must be used inside <I18nProvider>");
  }
  return ctx;
}
