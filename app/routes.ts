import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

// Step 1 scaffold: just the root + a placeholder index + a 404 catch-all.
// The full route table (with 132 SEO detail pages) is built up in Steps 6–9.

export default [
  layout("layouts/locale.tsx", [
    index("routes/home.tsx"),
    route(":rest/*", "routes/not-found.tsx"),
  ]),
  // Resource routes will be added in Step 6.
] satisfies RouteConfig;
