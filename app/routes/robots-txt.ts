// Resource route: /robots.txt. The Sitemap URL points at the production host
// (the only one the indexer should ever crawl).
//
// Filename is `robots-txt.ts` (not `robots.txt.ts`) for the same reason as
// sitemap-xml.ts — the URL is bound in `app/routes.ts`.

export async function loader() {
  const body =
    "User-agent: *\nAllow: /\nDisallow: /editor/\n\nSitemap: https://fast3dtextonline.com/sitemap.xml\n";
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
