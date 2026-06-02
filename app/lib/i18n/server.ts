// Build-time helpers for `loader` / `meta` exports.
// In `ssr: false` mode these run during the prerender walk, not at request time.
// The same helpers are safe to call from a client module too — they have no
// server-only imports.

import { parseLocaleFromPathname, type Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

/**
 * Derive the locale from a request URL.
 * Accepts the `Request` object that RR7 passes to `loader` / `meta`,
 * or a bare pathname string.
 */
export function getLocale(input: Request | string): Locale {
  if (typeof input === "string") return parseLocaleFromPathname(input);
  return parseLocaleFromPathname(new URL(input.url).pathname);
}

/**
 * Build-time equivalent of `useTranslations`. Pass a pathname (from
 * `new URL(request.url).pathname`) or a Request — the returned function
 * looks up keys in the locale's dictionary.
 */
export function getTranslations({
  locale,
  namespace,
}: {
  locale: Locale;
  namespace: keyof Dictionary;
}) {
  const dict = getDictionary(locale);
  const ns = (dict[namespace] ?? {}) as Record<string, string>;

  return function translate(
    key: string,
    vars?: Record<string, string | number>,
  ): string {
    const raw = ns[key] ?? key;
    if (!vars) return raw;
    return raw.replace(/\{(\w+)\}/g, (_, name) => {
      const v = vars[name];
      return v === undefined ? `{${name}}` : String(v);
    });
  };
}
