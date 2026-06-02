// Step 1 scaffold: minimal placeholder home route.
// Real home page is built in Step 7 (and tied to the i18n thin layer from Step 2).

import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "3D Text Generator" },
    { name: "description", content: "Scaffold — replaced in Step 7." },
  ];
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-semibold">3D Text Generator</h1>
      <p className="mt-3 text-base text-gray-500">
        Step 1 scaffold — real home page is built in Step 7.
      </p>
    </main>
  );
}
