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

## Product Notes
- 当前产品方向是 `template-first` 的 3D text generator：优先做模板库、模板详情页和可搜索的 style landing pages，再用编辑器承接修改与导出。
- 新增或修改模板时，优先更新 `src/lib/style-presets.ts`，避免回到手写单独 style 页面。
- 模板视觉需要尽量保持 `模板卡片预览` 与 `进入编辑器后的默认效果` 一致，特别是背景、渐变、文字颜色和阴影。
- 背景能力当前支持 `纯色 / 渐变 / 图片` 三种单选模式；新增背景特性时，必须同步检查预览、下载导出、分享链接序列化和多语言文案。
- 当前 SEO 主资产优先级是：`/[locale]/styles/[slug]` 模板详情页 > `/[locale]/styles` 模板聚合页 > `/[locale]/blogs/[slug]` supporting content > 首页。新增 SEO 内容时，优先先想能否落到 `stylePresets`。
- blog 目前主要承担 supporting content 角色：优先写能反链到具体 style 页的 how-to，而不是写脱离模板入口的泛教程。
- 新增模板时，默认同时补齐：`keywords`、`relatedSlugs`、`en/zh` 标题与描述、可直接进编辑器的 `editorPreset`。不要只补视觉，不补搜索语义和站内链接。
- 公开可索引页面必须服务核心主题；像实验页、占位页、特殊用途页默认不要进 sitemap，必要时显式 `noindex, follow`。
- hreflang / alternates 只能基于 `src/i18n/config.ts` 里的真实 locale 生成，禁止手写当前未启用的语言版本。

## Follow-up Priorities
- 优先继续优化模板 preset，让编辑器默认背景和模板卡片展示更接近，减少“点击后效果掉一截”的问题。
- 下一批 SEO 扩展优先继续做 evergreen template intent，例如 `bubble / ice / sports / comic / luxury / metal` 这类可长期搜索的风格词，而不是先追热点。
- 可以继续增强文字质感控制，例如补充阴影模糊、透明度或更细的 preset，而不是先做重型专业编辑器。
- 新增可被索引的页面时，必须同步检查 `src/app/sitemap.ts`，确保页面链接被纳入 sitemap。
- 新增 supporting blog 时，必须至少包含一个明确指向对应 style 页的站内链接，避免 blog 成为孤立流量页。

@RTK.md
