/**
 * Returns the canonical host for the deployed site.
 * Used by SEO helpers (sitemap, JSON-LD, OG image absolute URLs) and any
 * other place that needs the origin. Reads from `process.env.HOST` at build
 * time (set in `wrangler.jsonc` under `vars.HOST`).
 */
export function getHost(): string {
  return process.env.HOST ?? "https://fast3dtextonline.com";
}
