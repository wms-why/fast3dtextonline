// Resource route: /sitemap.xml. Returns a sitemap_index-free XML sitemap
// listing every prerendered path in both locales, with xhtml:link
// alternates for hreflang. Backed by `getSitemapEntries()` so it stays in
// sync with `prerender.ts` automatically.
//
// Filename is `sitemap-xml.ts` (not `sitemap.xml.ts`) because the config-
// based route declaration in `app/routes.ts` is what binds this module to
// the URL path "sitemap.xml". The dots in URLs only need escaping when
// using the file-system routing convention.

import { getHost } from "@/lib/host";
import { Locales } from "@/lib/i18n/config";
import { getSitemapEntries } from "@/lib/presets/prerender";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function localizedUrl(locale: "en" | "zh", path: string): string {
  if (locale === "en") return path === "/" ? "/" : path;
  return path === "/" ? "/zh" : `/zh${path}`;
}

function buildSitemapXml(): string {
  const host = getHost();
  const entries = getSitemapEntries();
  const now = new Date().toISOString();

  const pageUrls = entries
    .map(({ locale, logicalPath }) => {
      const loc = `${host}${localizedUrl(locale, logicalPath)}`;
      const xhtmlLinks = Locales.map((alt) => {
        const altLoc = `${host}${localizedUrl(alt, logicalPath)}`;
        return `    <xhtml:link rel="alternate" hreflang="${alt}" href="${escapeXml(altLoc)}"/>`;
      }).join("\n");
      // x-default always points at the en variant.
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${host}${localizedUrl("en", logicalPath)}`)}"/>`;
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
${xhtmlLinks}
${xDefault}
  </url>`;
    })
    .join("\n");

  // Also list the resource routes themselves so Google can find them.
  const resourceUrls = [`${host}/sitemap.xml`, `${host}/robots.txt`]
    .map(
      (loc) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pageUrls}
${resourceUrls}
</urlset>
`;
}

export async function loader() {
  return new Response(buildSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
