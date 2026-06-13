// Single source of truth for the prerender walk.
// Returns the full list of paths `react-router build` should pre-render at
// build time. The same list backs the dynamic `sitemap.xml` resource route
// (after filtering to per-locale subsets) so the prerender walk and the
// sitemap never drift.

import { Locales, DefaultLocale, type Locale } from "../i18n/config";
import { stylePresets } from "./style-presets";
import { fontThemes } from "./font-presets";
import { scenes } from "./scene-presets";
import { namePresets } from "./name-presets";
import { holidays } from "./holiday-presets";
import { industries } from "./industry-presets";

// Resource routes (no locale prefix; emitted once). Leading slash matches
// the `request.url` form that RR7's prerender walker checks.
export const RESOURCE_PATHS = ["/sitemap.xml", "/robots.txt"] as const;

// Top-level list pages that exist for both locales. `/editor` is
// intentionally NOT in the prerender list — it's a Three.js client
// island with no useful server-rendered shell, and falls through
// to the SPA fallback (index.html) for client hydration.
const STATIC_PREFIXES = [
  "/",
  "/styles",
  "/fonts",
  "/logo",
  "/holiday",
  "/industry",
  "/blogs",
  "/do-not-write-on-this-page",
] as const;

// Blog post slugs (the 5 concrete folders under src/app/[locale]/blogs/).
// Step 11 will keep these as a registry under app/lib/presets/blog-list.ts.
const BLOG_IDS = [
  "How-to-Design-a-Sports-Team-Name-in-3D",
  "How-to-Create-Ice-Text-for-Posters-and-Thumbnails",
  "How-to-Make-Bubble-Letters-Online",
  "Create-3D-Letters",
  "Create-3D-Text-with-the-Barbie-Font",
] as const;

function localePrefix(locale: Locale): string {
  return locale === DefaultLocale ? "" : `/${locale}`;
}

function localizedPath(locale: Locale, suffix: string): string {
  const prefix = localePrefix(locale);
  return `${prefix}${suffix}`;
}

/**
 * All paths that should be pre-rendered. Includes:
 *  - 8 static prefixes × 2 locales = 16
 *  - 18 styles × 2 locales = 36
 *  - 6 font themes × 2 locales = 12
 *  - 6 scenes × 2 locales = 12
 *  - 6 holidays × 2 locales = 12
 *  - 6 industries × 2 locales = 12
 *  - 89 names (59 en + 30 zh, per-locale) = 89
 *  - 5 blog posts × 2 locales = 10
 *  - 2 resource routes (sitemap.xml, robots.txt) = 2
 *  Total: 199
 */
export function generateAllPrerenderPaths(): string[] {
  const paths: string[] = [];

  // Resource routes first — they have no locale prefix.
  paths.push(...RESOURCE_PATHS);

  for (const locale of Locales) {
    for (const prefix of STATIC_PREFIXES) {
      paths.push(localizedPath(locale, prefix));
    }

    for (const s of stylePresets) {
      paths.push(localizedPath(locale, `/styles/${s.slug}`));
    }

    for (const f of fontThemes) {
      paths.push(localizedPath(locale, `/fonts/${f.slug}`));
    }

    for (const s of scenes) {
      paths.push(localizedPath(locale, `/logo/${s.slug}`));
    }

    for (const h of holidays) {
      paths.push(localizedPath(locale, `/holiday/${h.slug}`));
    }

    for (const i of industries) {
      paths.push(localizedPath(locale, `/industry/${i.slug}`));
    }

    for (const n of namePresets) {
      // /name/[name] is filtered by preset.locale, mirroring the original
      // /zh/name/<en-only> and /en/name/<zh-only> returning 404.
      if (n.locale === locale) {
        paths.push(localizedPath(locale, `/name/${n.name}`));
      }
    }

    for (const id of BLOG_IDS) {
      paths.push(localizedPath(locale, `/blogs/${id}`));
    }
  }

  return paths;
}

/**
 * Returns the per-locale path set used by the `sitemap.xml` resource route.
 * Strips the `/zh` prefix off and re-prefixes for the alternate locale, so
 * the sitemap can declare `hreflang` alternates without doing per-locale
 * rewrites of the URL.
 */
export function getSitemapEntries(): { locale: Locale; logicalPath: string }[] {
  const entries: { locale: Locale; logicalPath: string }[] = [];
  const seen = new Set<string>();

  for (const locale of Locales) {
    for (const prefix of STATIC_PREFIXES) {
      const key = `${locale}|${prefix}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ locale, logicalPath: prefix });
    }

    for (const s of stylePresets) {
      const key = `${locale}|/styles/${s.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ locale, logicalPath: `/styles/${s.slug}` });
    }

    for (const f of fontThemes) {
      const key = `${locale}|/fonts/${f.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ locale, logicalPath: `/fonts/${f.slug}` });
    }

    for (const s of scenes) {
      const key = `${locale}|/logo/${s.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ locale, logicalPath: `/logo/${s.slug}` });
    }

    for (const h of holidays) {
      const key = `${locale}|/holiday/${h.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ locale, logicalPath: `/holiday/${h.slug}` });
    }

    for (const i of industries) {
      const key = `${locale}|/industry/${i.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ locale, logicalPath: `/industry/${i.slug}` });
    }

    for (const n of namePresets) {
      if (n.locale !== locale) continue;
      const key = `${locale}|/name/${n.name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ locale, logicalPath: `/name/${n.name}` });
    }

    for (const id of BLOG_IDS) {
      const key = `${locale}|/blogs/${id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ locale, logicalPath: `/blogs/${id}` });
    }
  }

  return entries;
}
