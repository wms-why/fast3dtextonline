import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";
import tailwindHref from "./styles/tailwind.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: tailwindHref },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap",
  },
];

export const meta: Route.MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
        {/* Cloudflare Web Analytics beacon (injected once at the root). */}
        {typeof process !== "undefined" && process.env?.CF_BEACON_TOKEN ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: process.env.CF_BEACON_TOKEN })}
          />
        ) : null}
      </head>
      <body>
        {children}
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
