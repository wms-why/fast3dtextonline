import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

// Resource routes (sitemap, robots) live outside the locale layout.
const resourceRoutes = [
  route("sitemap.xml", "routes/sitemap-xml.ts"),
  route("robots.txt", "routes/robots-txt.ts"),
];

// The locale layout wraps every page route.
const pageRoutes = [
  index("routes/home.tsx"),
  // Styles
  route("styles", "routes/styles-list.tsx"),
  route("styles/:slug", "routes/styles-id.tsx"),
  // Fonts
  route("fonts", "routes/fonts-list.tsx"),
  route("fonts/:slug", "routes/fonts-id.tsx"),
  // Logo scenes
  route("logo", "routes/logo-list.tsx"),
  route("logo/:scene", "routes/logo-id.tsx"),
  // Names (no list page — per-locale filter in route layer)
  route("name/:name", "routes/name-id.tsx"),
  // Holidays
  route("holiday", "routes/holiday-list.tsx"),
  route("holiday/:holiday", "routes/holiday-id.tsx"),
  // Industries
  route("industry", "routes/industry-list.tsx"),
  route("industry/:industry", "routes/industry-id.tsx"),
  // Niche landing page (noindex, follow)
  route("do-not-write-on-this-page", "routes/niche.tsx"),
  // Editor + blogs
  route("editor", "routes/editor-index.tsx"),
  route("editor/:data", "routes/editor-data.tsx"),
  route("blogs", "routes/blogs-list.tsx"),
  route("blogs/:id", "routes/blogs-id.tsx"),
  // Catch-all
  route(":rest/*", "routes/not-found.tsx"),
];

export default [
  ...resourceRoutes,
  layout("layouts/locale.tsx", pageRoutes),
] satisfies RouteConfig;
