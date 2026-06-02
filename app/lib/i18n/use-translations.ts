import { useI18nContext } from "./provider";
import type { Dictionary } from "./dictionaries";

type Namespace = keyof Dictionary;

/**
 * Returns a translator function bound to a single namespace.
 *
 * Mirrors the `next-intl` surface used in this project:
 *   const t = useTranslations("HomePage");
 *   t("hero.title");                       // plain key lookup
 *   t("hero.cta", { name: "World" });      // {name} interpolation
 *
 * Falls back to the key itself if a translation is missing so missing
 * keys are visible in the rendered output rather than silently swallowed.
 */
export function useTranslations<T extends Namespace>(namespace: T) {
  const { dictionary } = useI18nContext();
  const ns = dictionary[namespace] as Record<string, string>;

  return function translate(
    key: string,
    vars?: Record<string, string | number>,
  ): string {
    const raw = ns?.[key] ?? key;
    if (!vars) return raw;
    return raw.replace(/\{(\w+)\}/g, (_, name) => {
      const v = vars[name];
      return v === undefined ? `{${name}}` : String(v);
    });
  };
}
