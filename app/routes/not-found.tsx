// In `ssr: false` static mode, the 404 catch-all cannot use `loader` to throw a
// Response (no server runtime to throw against). Instead the page itself
// renders a 404-styled view; RR7's catch-all will route any unmatched URL here.
// We add `<meta name="robots" content="noindex">` so search engines don't
// index the catch-all. Real implementation with i18n copy comes in Step 10.

import { Link } from "react-router";
import type { Route } from "./+types/not-found";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Page not found — 3D Text Generator" },
    { name: "robots", content: "noindex, follow" },
  ];
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-gray-500">404</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="max-w-md text-base text-gray-500">
        The page you're looking for doesn't exist. It may have been moved or the link is broken.
      </p>
      <Link
        to="/"
        className="mt-2 rounded bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
      >
        Back to home
      </Link>
    </main>
  );
}
