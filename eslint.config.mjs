import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      // Disabled after migrating to eslint-plugin-react-hooks@7 (via
      // eslint-config-next 15.5.19). The immutability rule flags
      // pre-existing patterns in TextSetting.tsx and PreviewToolbar.tsx
      // that are out of scope for the OpenNext migration. Re-enable
      // and fix the underlying code in a follow-up cleanup pass.
      'react-hooks/immutability': 'off',
    },
  }),
]

export default eslintConfig;
