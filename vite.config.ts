import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // Static prerender only — no Worker runtime.
  // Cloudflare assets binding serves build/client/ directly.
  build: {
    target: "es2022",
  },
});
