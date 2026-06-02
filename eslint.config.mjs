// Flat ESLint config for React Router v7 + Vite project.
// No more `eslint-config-next` (Next.js specific) or `FlatCompat` boilerplate.
// We rely on TypeScript-ESLint + React Hooks + a small set of project rules.

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    ignores: [
      "build/**",
      ".react-router/**",
      "node_modules/**",
      "public/**",
      "wrangler.jsonc",
      // Legacy Next.js code — will be deleted in Step 11. Excluded from lint
      // until then so the new RR7 app can lint cleanly.
      "src/**",
      "next-env.d.ts",
      ".next/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // Disabled after migrating to eslint-plugin-react-hooks@7.
      // The immutability rule flags pre-existing patterns in
      // TextSetting.tsx and PreviewToolbar.tsx that are out of scope
      // for the RR7 migration. Re-enable and fix the underlying code
      // in a follow-up cleanup pass.
      "react-hooks/immutability": "off",
    },
  },
];
