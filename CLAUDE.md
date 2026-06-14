# Repository Guidelines

- 始终使用中文进行提示，使用英文进行代码输出
- 始终使用 @radix-ui/themes 里面的组件，禁止自定义基础组件
- 禁止修改 package.json
- 始终考虑多语言

## Project Structure & Module Organization
This repository is a **React Router v7 + React 19 + TypeScript** app deployed as static prerendered HTML on **Cloudflare Workers assets binding** (no Worker runtime code). Route files live under `app/`, with localized pages under `app/routes/` and the root layout at `app/root.tsx`. The in-house i18n thin layer is at `app/lib/i18n/`. SEO helpers are at `app/lib/seo/`. All preset data (the source of truth for SEO surfaces) is under `app/lib/presets/`. Reusable UI lives in `app/components/`, with editor-specific code split between `app/components/common` (TextSetting, BackgroundSelector, Effects, PreviewToolbar, ThreeTools) and `app/components/editor/` (OnlyPage, EditorSurface, FullEditor). **Blog post body content** lives at `app/blogs-content/{id}/{en,zh}.tsx` and is looked up via `getBlogBody(id, locale)` from `app/blogs-content/index.tsx`. Translation dictionaries are in `dictionary/`. Static assets are in `public/`. **No `src/` directory.**

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
  - `app/lib/presets/scene-presets.ts`（6 条，slug 带 `-logo` 后缀：gaming-logo/youtube-logo/twitch-logo/esports-logo/instagram-logo/tiktok-logo）→ `/logo/[scene]`
  - `app/lib/presets/name-presets.ts`（59 英文 + 30 中文名字白名单，按 `preset.locale` 分流）→ `/name/[name]`
  - `app/lib/presets/holiday-presets.ts`（6 条：christmas/new-year/halloween/valentine/birthday/easter）→ `/holiday/[holiday]`
  - `app/lib/presets/industry-presets.ts`（6 条：gaming/ecommerce/social-media/streaming/sports/music）→ `/industry/[industry]`
  - `app/lib/presets/blog-list.ts`（5 篇博客）→ `/blogs/[id]`（param 路由，一个模块服务 5 个 URL；body 内容见下方「Blog content structure」）
- **新增第 7 组**前先看 `stylePresets` 是否已覆盖；能落到现有 style 的不要新开路由群
- **每个 preset 必填字段**：`slug`、`keywords[]`（用于 SEO + 内部锚文本）、`styleSlugs[]`（关联到 `stylePresets`，用于详情页推荐位 + 编辑器跳转）、`en/zh` 双语 `title/summary/description/useCases`

### Blog content structure
博客的 4 个分层（区别于 style/font/logo/holiday/industry 这种纯 preset 路由群）：

- **Registry**：`app/lib/presets/blog-list.ts` 导出 `BlogItem[]`，每条带 `id` / `date` / `coverImage` / `en` / `zh`。`en`/`zh` 至少含 `title` + `summary`。
- **Cover image**：`public/blogs/{id}/cover.svg`（与 id 严格同名目录）。`coverImage` 字段填 `/blogs/{id}/cover.svg`。详情页和列表卡片都渲染它，alt 文本必须含 `transparent background PNG` 关键词。`meta()` 的 `ogImage` 优先用 `blog.coverImage`。
- **Body**：`app/blogs-content/{id}/{en,zh}.tsx` 各导出 default React 组件（用 Radix Themes 组件 + `LocaleLink` 做内部跳转）。`app/blogs-content/index.tsx` 是 barrel，用 `getBlogBody(id, locale)` 按 id 查表返回对应 locale 组件。`blogs-id.tsx` 拿到组件后用 `createElement(Body)` 渲染（不能用 JSX `<Body />`，见 RR7 gotchas）。
- **Prerender**：`BLOG_IDS` 数组在 `app/lib/presets/prerender.ts` 写死，5 个 id 与博客 registry 一一对应。新增博客必须三处同步：registry 加条目 + `public/blogs/{id}/cover.svg` + `prerender.ts` 的 `BLOG_IDS`。
- **新增博客时**：必填 link 到至少 1 个 `/styles/...` 页（和 1 个 fonts/logo/holiday/industry 落地页），保持 blog 作为 supporting content 的反链价值。

### SEO 基础设施（`app/lib/seo/`）
- `JsonLd.tsx` — 通用 `<script type="application/ld+json">` 渲染器（一个或多个对象）
- `faq.ts` — `generateFaqJsonLd(faqs)`，用于首页 FAQ 区块
- `webApp.ts` — `generateWebAppJsonLd(host)`，用于首页和 niche 页面
- `product.ts` — `generateProductJsonLd(style, locale)` + `generateCreativeWorkJsonLd({...})`（fonts/logo/holiday/industry/name 共用）
- `ogImage.ts` — `getStyleOgImage(slug)`（仅 `/styles/[slug]` 用） + `DEFAULT_OG_IMAGE` 常量（其他页面共用 `/og-image.png`）
- `meta.ts` — `buildSeoMeta({title, description, keywords, ogImage, locale, pathname, noindex?})`，统一返回 `MetaDescriptor[]`（含 canonical + alternates + x-default）

### i18n 薄层（`app/lib/i18n/`）
零运行时 i18n 依赖。`useTranslations(ns)` / `useLocale()` 是 React 上下文；`getTranslations({locale, ns})` / `getLocale(request)` 用于 `loader` / `meta`。所有内链用 `<LocaleLink to="/styles/...">`（自动加 `/zh` 前缀）。`build/`, `app/`, `react-router.config.ts`, `vite.config.ts` 全部使用相对路径导入（jiti/esbuild 不解 TS path alias）；`@/*` 仅在 `app/` 树内的运行时代码里使用。

#### 翻译键纪律
- `useTranslations`（`app/lib/i18n/use-translations.ts`）的 fallback 是 `ns?.[key] ?? key` — **找不到 key 时直接返回 key 字面字符串**，不会返回空串或抛错。
- 这意味着 `t("listSubtitle")` 这种引用了不存在键的代码，页面上会显示字面 "listSubtitle" 文本而不是被吞掉。5 个列表页（styles / fonts / logo / holiday / industry）历史上都踩过这个坑，统一改用 `t("heroSubtitle")`（每个 namespace 都已有该键）才修复。
- 新增翻译键前必须先在 `dictionary/{en,zh}.json` 写完整；引用前用 `grep -E "\"[^\"]+\":" dictionary/en.json` 之类的命令确认键存在。
- 5 个列表页副标题统一用 `t("heroSubtitle")`；不要新建 `listSubtitle` 之类的别名键。

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
`react-hooks/static-components` 是 lint error："Cannot create components during render"。当从 map/barrel 里查表得到组件再渲染时，**不能用 JSX `<Body />`，必须用 `createElement(Body)`**（`blogs-id.tsx` 是当前唯一示例）。同样适用于 `StylePreview` 之类的「按 id 查组件再渲染」场景。

## UI/UX Design System

The product is **template-first 3D text generator**. Visual language is "Modern Creator Tool" (Linear / Vercel 风): marketing 页面保持单色 + 留白 + 强排版；模板详情页才让 preset 视觉（霓虹 / 金属 / 糖果）接管 hero。

### Design tokens — 单一来源：`app/styles/tailwind.css`
所有颜色、间距、圆角、阴影**必须通过 CSS 变量 / Tailwind v4 `@theme` token 引用**。禁止内联硬编码 `rgba(15,23,42,0.x)`、`bg-blue-600`、`text-violet-600`、`bg-white`、`bg-gray-50/100/900`、`border-gray-200/300`、`dark:` 前缀。**全部收敛到 token**。

- **品牌色 `brand-*`**：仅主色用 `brand-500`（#7B5BFF iris，light/dark 对比度均 AA+）
  - `bg-brand-500` / `text-brand-500` / `border-brand-300`
- **Surface 层级**：`bg-surface-0` (page) → `surface-1` (card) → `surface-2` (alt section bg) → `surface-3` (hover)
- **Text 层级**：`text-text-1` (主文) / `text-2` (次文) / `text-3` (meta)
- **Border**：`border-border-subtle` / `border-border-strong`
- **阴影**：`shadow-xs` / `sm` / `md` / `lg` / `xl`（与 `--radius-card: 28px` 配合）
- **圆角**：胶囊按钮 `radius="full"`、大区块 `var(--radius-card)` 28px / `var(--radius-card-sm)` 20px、控件 12px

### 字体（root.tsx 已加载）
- **Display** `font-display` = Space Grotesk：Hero H1、H2 标题、`tracking-[-0.025em]`
- **Body** `font-sans` = Inter：正文、按钮、卡片标题
- **Mono** `font-mono` = JetBrains Mono：`<Code>`、share link 短码

### 4 个 utility（`@utility`，在 tailwind.css）
- `glass-panel`：玻璃感底色（`bg-surface-1/78` + `backdrop-blur` + `border-border-subtle`）
- `card-elevated`：标准卡片（surface-1 + shadow-md + 28px 圆角）
- `text-gradient-brand`：品牌色渐变文字
- `checker-bg`：透明 PNG 棋盘格（自动适配暗色）

### 动效（基于 `motion` 12，已在 package.json）
- **FadeUp** `app/components/animations/FadeUp.tsx`：基于 IntersectionObserver 的滚动入场，respect `prefers-reduced-motion`
- **Editor Tab** 用 `AnimatePresence mode="wait"` 做 180ms cross-fade
- **ModeToggle** 用 `motion.span` + spring `{ stiffness: 380, damping: 30 }` 接管 Sun/Moon 旋转
- **按钮 hover**：transition-colors 200ms；**不要在 Canvas 容器上做 CSS transition**（卡顿）
- **入场**：`cubic-bezier(0.22, 1, 0.36, 1)`、duration 360–600ms
- 媒体查询已在 tailwind.css 中加 `prefers-reduced-motion: reduce` 全局收敛

### 配色边界（不要混用）
- marketing / list 页面：`bg-surface-0/1/2` 单色 + 留白
- 模板详情页 hero：`style.visual.background/foreground`（preset 自带）
- **唯一允许的"大色块"位置**：首页 CTA section（已用 iris 渐变）
- 模板详情页 Hero、StylePreviewCard 内部允许 preset 视觉接管

### 模板视觉硬约束
- `StylePreviewCard` 内 `boxShadow` / `borderRadius` 必须用 `var(--shadow-*)` / `var(--radius-card)` token
- `EditorSurface` canvas 棋盘格用 `rgb(var(--surface-2))` / `rgb(var(--surface-1))` 而非硬编码灰白
- 模板详情页 Hero CTA 按钮颜色由 `style.visual.foreground/panelBackground` 决定（已在 styles-id.tsx 用 `getContrastTextColor`）
- 模板详情页 Related 卡片必须带 `StylePreview` 缩略图（不只是文字链接）

### 透明 PNG 卖点
- 透明切换在 `BackgroundSelector`（带 `#transparent-bg-switch` id，是 P3-1 浮动条的 scroll target）
- `PreviewToolbar` 顶部有"💎 Transparent PNG mode"浮动提示条（AnimatePresence 切换 hint/active 两态）
- 下载文件名后缀 `_transparent`（已在 `handleDownload` 中实现）
- 复制反馈：share link 复制成功后按钮 1.2s 内变 "Copied! ✓"，color 切 green

### 列表页（styles / fonts / logo / holiday / industry）
- H1 + 副标题后接 `SearchField`（实时过滤 title/summary/keywords）
- 5 个 list 页面已统一接入 `app/components/common/SearchField.tsx`
- 网格在 `lg` 用 3 列、`md` 用 2 列、`initial` 1 列
- 卡片 padding `var(--radius-card-sm)` 或 `var(--radius-card)`，hover `-translate-y-0.5` + `shadow-md`

### Radix Theme props（`app/root.tsx`）
```tsx
<Theme accentColor="iris" grayColor="slate" radius="large" scaling="100%" panelBackground="translucent">
```
- 所有 Radix Button 一律 `radius="full"`（胶囊）
- `ThemeProvider` `defaultTheme="system"` + `enableSystem`
- ModeToggle 已用 `motion.span` + spring 接管 Sun/Moon 旋转 + 缩放 + `whileTap={{ scale: 0.9 }}`

### 多语言 i18n 视觉注意
- 中文 H1 `line-height: 1.4`（中文字符需更松的行距）
- 胶囊按钮 padding 在中文下略宽（`px-7` 而非 `px-6`）
- 翻译键在 `dictionary/{en,zh}.json`，**新增键前先确认字典里存在**（参考 `use-translations.ts` 的 `ns?.[key] ?? key` fallback 行为——找不到键时页面上会显示字面字符串）

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
- **根 layout (`app/root.tsx`) 已经全局渲染了 `<Header />` 和 `<Footer />`**。任何被 `<Outlet />` 渲染的子组件（包括 `OnlyPage`、所有 route module）都不要再渲染 Header/Footer，否则会叠出两份。`OnlyPage` 历史上就重复渲染过，Step 12 后已删除。
- 动态查找组件再渲染时（barrel + 查表 + 渲染），用 `createElement(Body)` 而非 JSX `<Body />`（见 Linting 章节 `react-hooks/static-components`）。
