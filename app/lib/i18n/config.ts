export const Locales = ["en", "zh"] as const;
export type Locale = (typeof Locales)[number];
export const DefaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "zh";
}

export function parseLocaleFromPathname(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg === "zh" ? "zh" : "en";
}
