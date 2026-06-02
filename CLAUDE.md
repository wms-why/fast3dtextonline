# Repository Guidelines

- 始终使用中文进行提示，使用英文进行代码输出
- 始终使用 @radix-ui/themes 里面的组件，禁止自定义基础组件
- 禁止修改 package.json
- 始终考虑多语言

## Project Structure & Module Organization
This repository is a Next.js 15 + React 19 + TypeScript app. Route files live under `src/app`, with localized pages in `src/app/[locale]` and shared styles in `src/app/globals.css`. Reusable UI lives in `src/components`, with editor-specific code split between `src/components/common` and `src/components/editor`. Shared utilities and fonts are in `src/lib`, i18n config is in `src/i18n`, translation dictionaries are in `dictionary/`, and static assets are in `public/`.

### SEO 路由群（template-first 之后的 5 个补充入口）
所有 SEO 路由群都使用 `static config + preset 复用` 模式，新增任何一组都遵循同一套结构：

- **数据层**：`src/lib/<group>-presets.ts`，导出 `interface XxxPreset` + `xxxPresets[]` + `getXxx(slug)` / `getLocalizedXxx()` / `getRelatedXxxs()` helpers
- **路由层**：`src/app/[locale]/<group>/page.tsx`（列表）+ `src/app/[locale]/<group>/[slug]/page.tsx`（详情）
- **现状**：
  - `src/lib/style-presets.ts`（18 条）→ `/styles/[slug]`（最强资产）
  - `src/lib/font-presets.ts`（6 条：bubble/gothic/retro/futuristic/comic/luxury）→ `/fonts/[slug]`
  - `src/lib/scene-presets.ts`（6 条：gaming/youtube/twitch/esports/instagram/tiktok）→ `/logo/[scene]`
  - `src/lib/name-presets.ts`（60 英文 + 30 中文名字白名单）→ `/name/[name]`
  - `src/lib/holiday-presets.ts`（6 条：christmas/new-year/halloween/valentine/birthday/easter）→ `/holiday/[holiday]`
  - `src/lib/industry-presets.ts`（6 条：gaming/ecommerce/social-media/streaming/sports/music）→ `/industry/[industry]`
- **新增第 7 组**前先看 `stylePresets` 是否已覆盖；能落到现有 style 的不要新开路由群
- **每个 preset 必填字段**：`slug`、`keywords[]`（用于 SEO + 内部锚文本）、`styleSlugs[]`（关联到 `stylePresets`，用于详情页推荐位 + 编辑器跳转）、`en/zh` 双语 `title/summary/description/useCases`

### SEO 基础设施（`src/lib/seo/`）
- `JsonLd.tsx` — 通用 `<script type="application/ld+json">` 渲染器
- `faq.ts` — `generateFaqJsonLd(faqs)`，用于首页 FAQ 区块
- `webApp.ts` — `generateWebAppJsonLd(host)`，用于首页
- `product.ts` — `generateProductJsonLd(style, locale)` + `generateCreativeWorkJsonLd({...})`（fonts/logo/holiday/industry/name 共用）
- `ogImage.ts` — `getStyleOgImage(slug)`，MVP 阶段 fallback 到 `/styles/{slug}/1024_576.png` 或 `/og-image.png`
- **新增 SEO 路由时必须**：注入对应 JSON-LD + `keywords` meta + `x-default` alternates
- 禁止手写不同结构的 JSON-LD helper；新场景优先扩展 `generateCreativeWorkJsonLd` 或 `generateProductJsonLd`，不要分叉出第二套 schema 生成器

## Build, Test, and Development Commands
- `pnpm install`: install dependencies from `pnpm-lock.yaml`.
- `pnpm dev`: start the local dev server with Turbopack.
- `pnpm build`: create a production build and catch type/runtime integration issues.
- `pnpm start`: serve the production build locally.
- `pnpm lint`: run Next.js ESLint rules.

Use `pnpm build` before opening a PR when you touch routing, i18n, or Three.js/editor flows.

## Coding Style & Naming Conventions
Use TypeScript with strict mode enabled. Follow the existing style: 2-space indentation, double quotes, semicolons omitted unless the file already uses them differently, and path aliases via `@/*`. Name React components in `PascalCase` (`FullEditor.tsx`), helpers in `camelCase`, and route folders in lowercase or bracketed Next.js segment form such as `[locale]` or `[data]`. Keep feature data in `src/lib/<group>-presets.ts` near its consumer route; only hoist to shared modules when truly reusable.

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
- 背景能力当前支持 `纯色 / 渐变 / 图片 / 透明 PNG` 四种模式（`BackgroundProp.transparent: boolean`）；新增背景特性时，必须同步检查预览、下载导出（文件名 `_transparent` 后缀）、分享链接序列化（`ShareObj.bg.transparent` 已被 `encodeShareData` 一起序列化）、多语言文案。
- 透明 PNG 导出是核心 SEO 卖点：`ThreeTools.ts` 的 `WebGLRenderer` 已开 `preserveDrawingBuffer: true`；`PreviewToolbar.generateImage` 在 `background.transparent === true` 时跳过所有 background fill 并把 WebGL 输出直接落 PNG，alpha 通道保留。任何新背景模式都要在 `generateImage` 加对应分支。
- 当前 SEO 主资产优先级是：
  1. `/[locale]/styles/[slug]` 模板详情页（最强，已有 Product JSON-LD + keywords + per-style og-image + transparent CTA）
  2. `/[locale]/styles` 模板聚合页
  3. `/[locale]/fonts/[slug]`、`/logo/[scene]`、`/name/[name]`、`/holiday/[holiday]`、`/industry/[industry]` 5 个补充入口（都已注入 CreativeWork JSON-LD + keywords + x-default）
  4. `/[locale]/blogs/[slug]` supporting content
  5. 首页（FAQPage + WebApplication JSON-LD）
- blog 目前主要承担 supporting content 角色：优先写能反链到具体 style 页的 how-to，而不是写脱离模板入口的泛教程。新建 blog 时也要考虑能否反链到 fonts/logo/holiday/industry 任一具体落地页。
- 新增模板时，默认同时补齐：`keywords`、`relatedSlugs`、`en/zh` 标题与描述、可直接进编辑器的 `editorPreset`、per-style `og-image` 资源。不要只补视觉，不补搜索语义和站内链接。
- 公开可索引页面必须服务核心主题；像实验页、占位页、特殊用途页默认不要进 sitemap，必要时显式 `noindex, follow`。
- hreflang / alternates 只能基于 `src/i18n/config.ts` 里的真实 locale 生成；所有 `generateMetadata` 必须包含 `["x-default"]: ${host}/<en-prefixed path>`，禁止手写当前未启用的语言版本。
- `ShareObj`（`src/lib/utils.ts`）是编辑器 ↔ URL 序列化的唯一合同。`BackgroundProp.transparent` 已加入；新增可序列化字段前先想清楚是否要进 `editorPreset` 工厂和 sitemap/JSON-LD。
- 图片 SEO：所有 `<img>` / `<Image>` / `StylePreview` 的可访问性 alt 必须含 `transparent background PNG` 关键词，模态风格卡还要带上 `style.name` 和 `style.keywords[0..1]`。

## Sitemap Rules
- `src/app/sitemap.ts` 是 sitemap 单一入口，新增可索引路由群必须同步注册（`urls.push(...)`）
- `/name/[name]` 条目按 locale 过滤（英文名不出现在 `/zh/sitemap.xml`），写 `urls.push` 时记得包在 locale map 内
- 任何显式 `robots: { index: false }` 的页面（如 `/do-not-write-on-this-page`）不要进 sitemap
- sitemap 时间戳一律 `new Date()`；后续如果引入 per-resource `lastModified`，必须保留 fallback

## Follow-up Priorities
- 优先继续优化模板 preset，让编辑器默认背景和模板卡片展示更接近，减少"点击后效果掉一截"的问题。
- 下一批 SEO 扩展优先继续做 evergreen template intent，例如 `bubble / ice / sports / comic / luxury / metal` 这类可长期搜索的风格词，而不是先追热点。fonts/logo/holiday/industry 这 5 个补充入口已经覆盖了大部分"风格词 + 场景词"组合；继续做之前先看是否已能 redirect 到现有 style 页，避免重复造数据。
- 可以继续增强文字质感控制，例如补充阴影模糊、透明度或更细的 preset，而不是先做重型专业编辑器。
- 新增可被索引的页面时，必须同步检查 `src/app/sitemap.ts`，确保页面链接被纳入 sitemap。
- 新增 supporting blog 时，必须至少包含一个明确指向对应 style 页（以及至少一个 fonts/logo/holiday/industry 落地页）的站内链接，避免 blog 成为孤立流量页。
- `transparent PNG` 卖点是 v1 之后的最大 SEO 增长点之一；后续可以：把 `transparentCtaSubtitle` 复制到 fonts/logo/holiday/industry 全部详情页、把"Download PNG (transparent)" CTA 提到 hero 旁边（紧邻 "Open in Editor"）。
- 暂不进入 v1 的范围（避免误启动）：Layer 8 programmatic SEO 50K 页 `/[style]/[word]` 组合页（质量风险高、可能触发 thin content 判罚）；OG image 自动生成（v1 复用现有 `/styles/{slug}/1024_576.png` 资源）；A/B 测试页面；新增 3D 字体（不在 `src/lib/fonts.ts` 改）。

@RTK.md
