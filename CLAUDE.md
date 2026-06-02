# Repository Guidelines

- 始终使用中文进行提示，使用英文进行代码输出
- 始终使用 @radix-ui/themes 里面的组件，禁止自定义基础组件
- 禁止修改 package.json
- 始终考虑多语言

## Project Structure & Module Organization
This repository is a **React Router v7 + React 19 + TypeScript** app deployed as static prerendered HTML on **Cloudflare Workers assets binding** (no Worker runtime code). Route files live under `app/`, with localized pages under `app/routes/` and the root layout at `app/root.tsx`. The in-house i18n thin layer is at `app/lib/i18n/`. SEO helpers are at `app/lib/seo/`. All preset data (the source of truth for SEO surfaces) is under `app/lib/presets/`. Reusable UI lives in `app/components/`, with editor-specific code split between `app/components/common` (TextSetting, BackgroundSelector, Effects, PreviewToolbar, ThreeTools) and `app/components/editor/` (OnlyPage, EditorSurface, FullEditor). Translation dictionaries are in `dictionary/`. Static assets are in `public/`. **No `src/` directory.**

### Build / deploy
- `pnpm dev` — Vite dev server (RR7 framework mode)
- `pnpm build` — `react-router build` (calls Vite, runs the prerender walk)
- `pnpm deploy` — `wrangler deploy` (uploads `build/client/` to the assets binding)
- `pnpm typecheck` — `react-router typegen && tsc --noEmit`
- `pnpm lint` — `eslint .`

### SEO 路由群
所有 SEO 路由群都使用 `static config + preset 复用` 模式，新增任何一组都遵循同一套结构：

- **数据层**：`app/lib/presets/<group>-presets.ts`，导出 `interface XxxPreset` + `xxxPresets[]` + `getXxx(slug)` / `getLocalizedXxx()` / `getRelatedXxxs()` helpers
- **路由层**：`app/routes/<group>-list.tsx`（列表）+ `app/routes/<group>-id.tsx`（详情）。URL 通过 `app/routes.ts` 用 `route("path", "module")` 显式绑定（config-based routing，非 file-based）
- **prerender**：`app/lib/presets/prerender.ts` 的 `generateAllPrerenderPaths()` 同步枚举 200+ 路径，资源路由 + 静态列表 + 详情页。Sitemap 共用 `getSitemapEntries()`，永不漂移
- **现状**：
  - `app/lib/presets/style-presets.ts`（18 条）→ `/styles/[slug]`（最强资产，唯一有 per-style OG image 和 Product JSON-LD）
  - `app/lib/presets/font-presets.ts`（6 条：bubble/gothic/retro/futuristic/comic/luxury）→ `/fonts/[slug]`
  - `app/lib/presets/scene-presets.ts`（6 条：gaming/youtube/twitch/esports/instagram/tiktok）→ `/logo/[scene]`
  - `app/lib/presets/name-presets.ts`（60 英文 + 30 中文名字白名单，按 `preset.locale` 分流）→ `/name/[name]`
  - `app/lib/presets/holiday-presets.ts`（6 条：christmas/new-year/halloween/valentine/birthday/easter）→ `/holiday/[holiday]`
  - `app/lib/presets/industry-presets.ts`（6 条：gaming/ecommerce/social-media/streaming/sports/music）→ `/industry/[industry]`
  - `app/lib/presets/blog-list.ts`（5 篇博客）→ `/blogs/[id]`（param 路由，一个模块服务 5 个 URL）
- **新增第 7 组**前先看 `stylePresets` 是否已覆盖；能落到现有 style 的不要新开路由群
- **每个 preset 必填字段**：`slug`、`keywords[]`（用于 SEO + 内部锚文本）、`styleSlugs[]`（关联到 `stylePresets`，用于详情页推荐位 + 编辑器跳转）、`en/zh` 双语 `title/summary/description/useCases`

### SEO 基础设施（`app/lib/seo/`）
- `JsonLd.tsx` — 通用 `<script type="application/ld+json">` 渲染器（一个或多个对象）
- `faq.ts` — `generateFaqJsonLd(faqs)`，用于首页 FAQ 区块
- `webApp.ts` — `generateWebAppJsonLd(host)`，用于首页和 niche 页面
- `product.ts` — `generateProductJsonLd(style, locale)` + `generateCreativeWorkJsonLd({...})`（fonts/logo/holiday/industry/name 共用）
- `ogImage.ts` — `getStyleOgImage(slug)`，仅 `/styles/[slug]` 用
- `meta.ts` — `buildSeoMeta({title, description, keywords, ogImage, locale, pathname, noindex?})`，统一返回 `MetaDescriptor[]`（含 canonical + alternates + x-default）

### i18n 薄层（`app/lib/i18n/`）
零运行时 i18n 依赖。`useTranslations(ns)` / `useLocale()` 是 React 上下文；`getTranslations({locale, ns})` / `getLocale(request)` 用于 `loader` / `meta`。所有内链用 `<LocaleLink to="/styles/...">`（自动加 `/zh` 前缀）。`build/`, `app/`, `react-router.config.ts`, `vite.config.ts` 全部使用相对路径导入（jiti/esbuild 不解 TS path alias）；`@/*` 仅在 `app/` 树内的运行时代码里使用。

### Sitemap & robots（`app/routes/sitemap-xml.ts`, `app/routes/robots-txt.ts`）
- `sitemap.xml` 是 RR7 resource route，loader 返回 `Response`。
- 文件命名必须避开 `.` 扩展名歧义（`sitemap-xml.ts` → URL 路径由 `route("sitemap.xml", "routes/sitemap-xml.ts")` 绑定）。
- prerender 列表里的资源路径必须以 `/` 开头（RR7 内部检查 `/sitemap.xml` 而不是 `sitemap.xml`）。

## Build, Test, and Development Commands
- `pnpm install`: install dependencies from `pnpm-lock.yaml`.
- `pnpm dev`: start the Vite dev server (RR7 framework mode).
- `pnpm build`: create a production build and run the prerender walk.
- `pnpm deploy`: `wrangler deploy` — uploads `build/client/` to the assets binding.
- `pnpm typecheck`: `react-router typegen && tsc --noEmit`.
- `pnpm lint`: run ESLint.

Use `pnpm build` before opening a PR when you touch routing, i18n, or the editor.

## Coding Style & Naming Conventions
TypeScript strict mode, `verbatimModuleSyntax: true`（type-only imports 必须用 `import type`）。2-space 缩进,double quotes,JSX 内 `className`（不用 `class`）。路径 alias `@/*` 指向 `app/*`，但 `app/routes.ts` / `react-router.config.ts` / `prerender.ts` 必须用相对路径。组件命名 PascalCase (`StylePreviewCard.tsx`),helpers 命名 camelCase。`app/routes/` 下的路由文件名用 kebab-case（`styles-list.tsx`, `editor-data.tsx`, `sitemap-xml.ts`, `robots-txt.ts`）——不用 `$` 或 `_`（RR7 typegen 不会生成 `+types/` for these）。`interface`/`type` 命名要全拼。

Linting 在 `eslint.config.mjs` 用 flat config（无 `FlatCompat` 桥接）。`react-hooks/immutability` 暂时关闭（预存代码模式问题，跟踪到 follow-up cleanup）。`react-hooks/set-state-in-effect` 在两个有意为之的位置用 inline disable：
  - `app/components/common/PreviewToolbar.tsx` 的 `useEffect(updateSize, [aspectRadio])`
  - `app/routes/editor-data.tsx` 的 client-side share-data decode

## Testing Guidelines
无自动化测试套件。`pnpm typecheck` + `pnpm build` + `pnpm lint` 是必过的验证关。本地 `pnpm dev` 手测两条关键路径：en 中文切换 + Theme 切换跨页面持久化。Cloudflare 部署后 `wrangler deploy` 到 preview 环境复测。

## Commit & Pull Request Guidelines
短 commit messages，imperative，可以用中文（`feat(rr7): ...`、`fix: ...`、`chore: ...`）。一个 commit 一个变更集。PR 包含：变更摘要、影响路由/组件、关联 issue、UI/编辑器变更的截图或录屏。

## Security & Content Notes
不要提交 secret 或环境变量。本地 `dictionary/{en,zh}.json` 翻译保留双语言。`public/` 静态资源除非有意改动不覆盖。

## Product Notes
- 当前产品方向是 `template-first` 的 3D text generator：优先做模板库、模板详情页和可搜索的 style landing pages，再用编辑器承接修改与导出。
- 新增或修改模板时，优先更新 `app/lib/presets/style-presets.ts`，避免回到手写单独 style 页面。
- 模板视觉需要尽量保持 `模板卡片预览` 与 `进入编辑器后的默认效果` 一致，特别是背景、渐变、文字颜色和阴影。
- 背景能力当前支持 `纯色 / 渐变 / 图片 / 透明 PNG` 四种模式（`BackgroundProp.transparent: boolean`）；新增背景特性时，必须同步检查预览、下载导出（文件名 `_transparent` 后缀）、分享链接序列化（`ShareObj.bg.transparent` 已被 `encodeShareData` 一起序列化）、多语言文案。
- 透明 PNG 导出是核心 SEO 卖点：`ThreeTools.ts` 的 `WebGLRenderer` 已开 `preserveDrawingBuffer: true`；`PreviewToolbar.generateImage` 在 `background.transparent === true` 时跳过所有 background fill 并把 WebGL 输出直接落 PNG，alpha 通道保留。任何新背景模式都要在 `generateImage` 加对应分支。
- 当前 SEO 主资产优先级是：
  1. `/[locale]/styles/[slug]` 模板详情页（最强，有 Product JSON-LD + keywords + per-style og-image + transparent CTA）
  2. `/[locale]/styles` 模板聚合页
  3. `/[locale]/fonts/[slug]`、`/logo/[scene]`、`/name/[name]`、`/holiday/[holiday]`、`/industry/[industry]` 5 个补充入口（都已注入 CreativeWork JSON-LD + keywords + x-default）
  4. `/[locale]/blogs/[slug]` supporting content
  5. 首页（FAQPage + WebApplication JSON-LD）
- blog 主要承担 supporting content：优先写能反链到具体 style 页的 how-to。`app/lib/presets/blog-list.ts` 维护 blog registry；新增 blog 时也要考虑能否反链到 fonts/logo/holiday/industry 任一具体落地页。
- 新增模板时，默认同时补齐：`keywords`、`relatedSlugs`、`en/zh` 标题与描述、可直接进编辑器的 `editorPreset`、per-style `og-image` 资源。不要只补视觉，不补搜索语义和站内链接。
- 公开可索引页面必须服务核心主题；像实验页、占位页、特殊用途页（如 `/do-not-write-on-this-page`）用 `buildSeoMeta({ ..., noindex: true })` 显式标 `noindex, follow`。
- hreflang / alternates 由 `buildSeoMeta()` 统一生成，只基于 `src/i18n/config.ts` 里的真实 locale；`x-default` 永远指向 en 前缀 URL。
- `ShareObj`（`app/lib/share-data.ts`）是编辑器 ↔ URL 序列化的唯一合同。新增可序列化字段前先想清楚是否要进 `editorPreset` 工厂。
- 图片 SEO：所有 `<img>` / `StylePreview` 的可访问性 alt 必须含 `transparent background PNG` 关键词，模态风格卡还要带上 `style.name` 和 `style.keywords[0..1]`。

## Sitemap Rules
- `app/lib/presets/prerender.ts` 的 `generateAllPrerenderPaths()` 是 sitemap 单一入口，新增可索引路由群必须同步注册。
- `/name/[name]` 条目按 `preset.locale` 过滤（英文名不出现在 `/zh/sitemap.xml`），写在 `generateAllPrerenderPaths()` 的 per-locale for 循环里。
- 任何显式 `noindex` 的页面（如 `/do-not-write-on-this-page`）依然进 sitemap（让爬虫知道页面存在，但尊重 `robots: noindex`）。
- sitemap 时间戳一律 `new Date()`；后续如果引入 per-resource `lastModified`，必须保留 fallback。
- 资源路由（`/sitemap.xml`, `/robots.txt`）走 RR7 resource route 模式 — loader 返回 `Response`，文件本身不进 HTML 渲染。

## Follow-up Priorities
- 继续优化模板 preset，让编辑器默认背景和模板卡片展示更接近，减少"点击后效果掉一截"的问题。
- 下一批 SEO 扩展优先继续做 evergreen template intent，例如 `bubble / ice / sports / comic / luxury / metal` 这类可长期搜索的风格词，而不是先追热点。fonts/logo/holiday/industry 这 5 个补充入口已经覆盖了大部分"风格词 + 场景词"组合；继续做之前先看是否已能 redirect 到现有 style 页，避免重复造数据。
- 可以继续增强文字质感控制，例如补充阴影模糊、透明度或更细的 preset，而不是先做重型专业编辑器。
- 新增可被索引的页面时，必须同步检查 `app/lib/presets/prerender.ts`，确保页面链接被纳入 sitemap。
- 新增 supporting blog 时，必须至少包含一个明确指向对应 style 页（以及至少一个 fonts/logo/holiday/industry 落地页）的站内链接，避免 blog 成为孤立流量页。
- `transparent PNG` 卖点是 v1 之后的最大 SEO 增长点之一；后续可以：把 `transparentCtaSubtitle` 复制到 fonts/logo/holiday/industry 全部详情页、把"Download PNG (transparent)" CTA 提到 hero 旁边（紧邻 "Open in Editor"）。
- 暂不进入 v1 的范围（避免误启动）：Layer 8 programmatic SEO 50K 页 `/[style]/[word]` 组合页（质量风险高、可能触发 thin content 判罚）；OG image 自动生成（v1 复用现有 `/styles/{slug}/1024_576.png` 资源）；A/B 测试页面；新增 3D 字体（不在 `app/lib/presets/fonts.ts` 改）。

## RR7-specific gotchas
- `react-router.config.ts` 和 `app/routes.ts` 不支持 `@/*` 别名 — 用相对路径。
- `+types/` 不会为带 `$` 或 `_` 的文件名生成 — 用 kebab-case（`blogs-list.tsx`, `editor-data.tsx`, `sitemap-xml.ts`）。
- 资源路由的 URL 路径必须以 `/` 开头出现在 `prerender` 列表中（`/sitemap.xml` 不是 `sitemap.xml`）。
- `ssr: false` 模式下，loader 不在 build 时运行；`/editor/:data` 的密文 decode 在组件里用 `useEffect` 完成。
- `ssr: false` 模式下，`meta()` 不可访问 loader data — 所有 meta 派生逻辑要么从 `params` 拿，要么从 `location.pathname` 解析 locale，要么预计算在 build-time helper 里。
