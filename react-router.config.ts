import type { Config } from "@react-router/dev/config";
// Relative import (not `@/lib/...`) because the config file is loaded by
// jiti/esbuild at build time without TS path-alias resolution.
import { generateAllPrerenderPaths } from "./app/lib/presets/prerender";

export default {
  // Static-only deploy: no server build, no Worker runtime at request time.
  // Cloudflare assets binding serves build/client/ (prerendered HTML + .data + assets).
  // Non-prerendered paths (editor URLs, 404) fall back to index.html (SPA mode).
  ssr: false,
  prerender: async () => generateAllPrerenderPaths(),
} satisfies Config;
