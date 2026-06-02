// Helper that returns a `meta()`-compatible descriptor array. Used by every
// detail-page route module to keep SEO meta uniform: title, description,
// keywords, OG image, Twitter card, canonical, and `x-default` alternates.
//
// Usage in a route module:
//   export const meta: Route.MetaFunction = ({ data, location }) =>
//     buildSeoMeta({
//       title: data.copy.title,
//       description: data.copy.description,
//       keywords: data.style.keywords,
//       ogImage: getStyleOgImage(data.style.slug),
//       locale: data.locale,
//       pathname: location.pathname,
//     });

import type { MetaDescriptor } from "react-router";
import { getHost } from "@/lib/host";
import { Locales, DefaultLocale, type Locale } from "@/lib/i18n/config";

export interface BuildSeoMetaInput {
  title: string;
  description: string;
  /** Page-specific keywords. */
  keywords: string[];
  /** Absolute or root-relative path to the OG image. */
  ogImage: string;
  /** Active locale. Drives the alternates set. */
  locale: Locale;
  /** The current pathname (e.g. `/styles/bubble` or `/zh/styles/bubble`). */
  pathname: string;
  /** Page type for `og:type`. Defaults to "website". */
  ogType?: "website" | "article";
  /** Robots directive override. Defaults to `index, follow`. */
  robots?: string;
  /** When true, emit a `noindex, follow` robots directive (used by niche pages). */
  noindex?: boolean;
}

/** Strip the leading `/zh` segment so we can re-prefix with each locale. */
function logicalPath(pathname: string): string {
  const stripped = pathname.replace(/^\/zh(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

function localizedPath(locale: Locale, logical: string): string {
  if (locale === DefaultLocale) return logical === "/" ? "/" : logical;
  return logical === "/" ? "/zh" : `/zh${logical}`;
}

export function buildSeoMeta(input: BuildSeoMetaInput): MetaDescriptor[] {
  const host = getHost();
  const logical = logicalPath(input.pathname);
  const canonical = `${host}${localizedPath(input.locale, logical)}`;

  // Build alternates: every locale + an x-default pointing at the en variant.
  const languages: Record<string, string> = {};
  for (const l of Locales) {
    languages[l] = `${host}${localizedPath(l, logical)}`;
  }
  // Per project rules: x-default always points at the en-prefixed URL.
  languages["x-default"] = languages[DefaultLocale];

  const ogImageAbs = input.ogImage.startsWith("http")
    ? input.ogImage
    : `${host}${input.ogImage}`;

  const robotsDirective = input.noindex
    ? "noindex, follow"
    : (input.robots ?? "index, follow");

  return [
    { title: input.title },
    { name: "description", content: input.description },
    { name: "keywords", content: input.keywords.join(", ") },
    { name: "robots", content: robotsDirective },

    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImageAbs },
    { property: "og:type", content: input.ogType ?? "website" },
    { property: "og:site_name", content: "3D Text Generator" },
    { property: "og:locale", content: input.locale === "zh" ? "zh_CN" : "en_US" },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: ogImageAbs },

    { tagName: "link", rel: "canonical", href: canonical },
    ...Object.entries(languages).map(([lang, href]) => ({
      tagName: "link" as const,
      rel: "alternate",
      hrefLang: lang,
      href,
    })),
  ];
}
