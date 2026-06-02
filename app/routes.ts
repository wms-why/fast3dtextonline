import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

// Resource routes (sitemap, robots) live outside the locale layout — they
// don't take part in locale-prefixing.
const resourceRoutes = [
  route("sitemap.xml", "routes/sitemap-xml.ts"),
  route("robots.txt", "routes/robots-txt.ts"),
];

// The locale layout wraps every page route. The full SEO surface
// (styles/fonts/logo/name/holiday/industry/editor + blogs) is built up in
// Steps 7–9.
const pageRoutes = [
  index("routes/home.tsx"),
  route(":rest/*", "routes/not-found.tsx"),
];

export default [
  ...resourceRoutes,
  layout("layouts/locale.tsx", pageRoutes),
] satisfies RouteConfig;
