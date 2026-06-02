import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

// Resource routes (sitemap, robots) live outside the locale layout.
const resourceRoutes = [
  route("sitemap.xml", "routes/sitemap-xml.ts"),
  route("robots.txt", "routes/robots-txt.ts"),
];

// The locale layout wraps every page route. The full SEO surface
// (styles/fonts/logo/name/holiday/industry + 6 detail templates) is
// built up in Step 8.
const pageRoutes = [
  index("routes/home.tsx"),
  route("blogs", "routes/blogs-list.tsx"),
  // Single param route covers all 5 concrete blog slugs; the module
  // resolves the id against `blogs` and renders a not-found stub for
  // unknown ids.
  route("blogs/:id", "routes/blogs-id.tsx"),
  route(":rest/*", "routes/not-found.tsx"),
];

export default [
  ...resourceRoutes,
  layout("layouts/locale.tsx", pageRoutes),
] satisfies RouteConfig;
