# Repository Guidelines

- 始终使用中文进行提示，使用英文进行代码输出
- 始终使用 @radix-ui/themes 里面的组件，禁止自定义基础组件
- 禁止修改 package.json
- 始终考虑多语言

## Project Structure & Module Organization
This repository is a Next.js 15 + React 19 + TypeScript app. Route files live under `src/app`, with localized pages in `src/app/[locale]` and shared styles in `src/app/globals.css`. Reusable UI lives in `src/components`, with editor-specific code split between `src/components/common` and `src/components/editor`. Shared utilities and fonts are in `src/lib`, i18n config is in `src/i18n`, translation dictionaries are in `dictionary/`, and static assets are in `public/`.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies from `pnpm-lock.yaml`.
- `pnpm dev`: start the local dev server with Turbopack.
- `pnpm build`: create a production build and catch type/runtime integration issues.
- `pnpm start`: serve the production build locally.
- `pnpm lint`: run Next.js ESLint rules.

Use `pnpm build` before opening a PR when you touch routing, i18n, or Three.js/editor flows.

## Coding Style & Naming Conventions
Use TypeScript with strict mode enabled. Follow the existing style: 2-space indentation, double quotes, semicolons omitted unless the file already uses them differently, and path aliases via `@/*`. Name React components in `PascalCase` (`FullEditor.tsx`), helpers in `camelCase`, and route folders in lowercase or bracketed Next.js segment form such as `[locale]` or `[data]`. Keep feature code near its route unless it is clearly reusable.

Linting is configured in `eslint.config.mjs` with the Next.js preset. Run `pnpm lint` after changes.

## Testing Guidelines
There is no dedicated automated test suite yet. For now, treat `pnpm lint` and `pnpm build` as required validation. Manually verify edited pages in both locales when relevant, especially `/[locale]/editor`, blog pages, and export-related UI. If you add tests later, place them beside the feature or under a `__tests__` directory and use `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit messages, often in Chinese, for example `解决编译错误` or `处理小bug`. Keep commits focused and descriptive; one change set per commit is preferred. PRs should include a brief summary, affected routes/components, linked issues when applicable, and screenshots or recordings for UI/editor changes.

## Security & Content Notes
Do not commit secrets or environment-specific credentials. Preserve localized content in both `dictionary/en.json` and `dictionary/zh.json` when changing user-facing copy. Avoid overwriting image assets in `public/` unless the change is intentional.
