// Single source of truth for the prerender walk.
// Returns the full list of paths `react-router build` should pre-render at build time.
// The same list backs the dynamic `sitemap.xml` resource route.
//
// Step 6 will expand this with the full SEO route catalogue. For Step 1 we
// return only `/` so the build can run end-to-end without 404s on unwired
// paths.

export function generateAllPrerenderPaths(): string[] {
  return ["/"];
}
