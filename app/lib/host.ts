/**
 * Returns the canonical host for the deployed site.
 * Used by SEO helpers (sitemap, JSON-LD, OG image absolute URLs) and any
 * other place that needs the origin. Reads from `process.env.HOST` at build
 * time (set in `wrangler.jsonc` under `vars.HOST`).
 *
 * In the browser `process` is not defined — we guard with `typeof` so the
 * call returns the production fallback during client-side hydration without
 * throwing a ReferenceError. Vite does not substitute `process.env.HOST`
 * (only `process.env.NODE_ENV`), so the guard is required.
 */
export function getHost(): string {
  if (typeof process !== "undefined" && process.env?.HOST) {
    return process.env.HOST;
  }
  return "https://fast3dtextonline.com";
}
