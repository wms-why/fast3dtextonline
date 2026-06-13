import { type RouteConfig, route, index, prefix } from "@react-router/dev/routes";

// Resource routes (sitemap, robots) live outside any locale tree.
const resourceRoutes = [
  route("sitemap.xml", "routes/sitemap-xml.ts"),
  route("robots.txt", "routes/robots-txt.ts"),
];

// Single page surface, with per-locale IDs so the same module file
// can be mounted under both /styles/... and /zh/styles/... without
// RR7 complaining about duplicate route ids.
//
// The I18nProvider is mounted in app/root.tsx (which reads the active
// locale from useLocation), so no per-locale layout wrapper is needed.
function pageTree(prefixTag: "en" | "zh") {
  const r = (path: string, file: string) => route(path, file, { id: `${prefixTag}-${path}` });
  const home = (file: string) => route("", file, { id: `${prefixTag}-home`, index: true });
  return [
    home("routes/home.tsx"),
    r("styles", "routes/styles-list.tsx"),
    r("styles/:slug", "routes/styles-id.tsx"),
    r("fonts", "routes/fonts-list.tsx"),
    r("fonts/:slug", "routes/fonts-id.tsx"),
    r("logo", "routes/logo-list.tsx"),
    r("logo/:scene", "routes/logo-id.tsx"),
    r("name/:name", "routes/name-id.tsx"),
    r("holiday", "routes/holiday-list.tsx"),
    r("holiday/:holiday", "routes/holiday-id.tsx"),
    r("industry", "routes/industry-list.tsx"),
    r("industry/:industry", "routes/industry-id.tsx"),
    r("do-not-write-on-this-page", "routes/niche.tsx"),
    r("editor", "routes/editor-index.tsx"),
    r("editor/:data", "routes/editor-data.tsx"),
    r("blogs", "routes/blogs-list.tsx"),
    r("blogs/:id", "routes/blogs-id.tsx"),
    r(":rest/*", "routes/not-found.tsx"),
  ];
}

export default [
  ...resourceRoutes,
  ...pageTree("en"),
  ...prefix("zh", pageTree("zh")),
] satisfies RouteConfig;
