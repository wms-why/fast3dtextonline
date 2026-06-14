import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import tailwindHref from "./styles/tailwind.css?url";
import "@radix-ui/themes/styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { parseLocaleFromPathname } from "./lib/i18n/config";
import { I18nProvider } from "./lib/i18n/provider";

const BEACON_TOKEN =
  (typeof process !== "undefined" && process.env?.CF_BEACON_TOKEN) || "";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: tailwindHref },
  { rel: "stylesheet", href: "@radix-ui/themes/styles.css" },
  { rel: "icon", href: "/favicon.ico" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
  },
];

export const meta: Route.MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "theme-color", content: "#000000" },
  { name: "robots", content: "index, follow" },
  { name: "author", content: "ymk" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const locale = parseLocaleFromPathname(pathname);
  // dir is `"rtl"` only when an RTL locale is active. The active `Locales`
  // set is `["en", "zh"]` (all LTR); the "ar" / "es" / "jp" entries in
  // `i18n/config.ts` are commented out as a future option. We check the
  // literal `"ar"` here so re-enabling it later doesn't require editing
  // the layout again.
  const dir: "ltr" | "rtl" = locale === ("ar" as typeof locale) ? "rtl" : "ltr";

  // WebSite JSON-LD (lifts from the original [locale]/layout.tsx).
  // The `host` is read at build time via process.env.
  const host =
    (typeof process !== "undefined" && process.env?.HOST) ||
    "https://fast3dtext.com";
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "3D Text Generator",
    description: "Free online 3D text generator with transparent PNG export.",
    url: host,
    inLanguage: locale,
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {BEACON_TOKEN ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: BEACON_TOKEN })}
          />
        ) : null}
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Theme
            accentColor="iris"
            grayColor="slate"
            radius="large"
            scaling="100%"
            panelBackground="translucent"
          >
            <I18nProvider locale={locale}>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </I18nProvider>
          </Theme>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const isRouteError = isRouteErrorResponse(error);
  const status = isRouteError ? error.status : 500;
  const title = isRouteError
    ? `${error.status} ${error.statusText}`
    : "Unexpected error";
  const message = isRouteError
    ? error.data
    : error instanceof Error
      ? error.message
      : "Unknown error";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-2 text-base text-gray-500">{String(message)}</p>
      <a
        href="/"
        className="mt-6 rounded bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
      >
        Back to home
      </a>
    </main>
  );
}
