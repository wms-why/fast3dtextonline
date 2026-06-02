# OpenNext Cloudflare 改造设计

**日期**：2026-06-02
**作者**：Claude（brainstorming 流程产出）
**目标**：把当前 Next.js 15 项目改造为 OpenNext 项目，并支持通过 Wrangler 部署到 Cloudflare Workers

---

## 1. 背景与目标

当前项目是 Next.js 15.2.8 + React 19 + TypeScript 的 3D 文字生成 SaaS，包含 5 个 SEO 路由群（styles / fonts / logo / holiday / industry）+ name / blogs 落地页 + 客户端 Three.js 编辑器。业务逻辑、i18n、SEO 基础设施、sitemap / robots / JSON-LD 全部按模板化沉淀。

**目标**：
- 引入 `@opennextjs/cloudflare` adapter，把构建产物转换为 Cloudflare Workers 可执行的 `.open-next/worker.js`
- 新增 `wrangler.jsonc` + Wrangler dev / build / deploy 命令，支持本地开发与一键部署
- 不动业务代码、保留 `NEXT_PUBLIC_HOST`、移除 Vercel-only 监控、禁用 `next/image` 优化
- 不引入任何 Cloudflare 资源 binding（KV / R2 / D1 / DO），保持纯静态部署

**非目标**：
- 不引入 ISR / PPR / 缓存层
- 不重写 Three.js 编辑器
- 不新增任何 binding
- 不改 `src/lib/*`、`src/components/*`、`src/app/**/page.tsx`、`src/middleware.ts`、`dictionary/*` 业务代码

---

## 2. 架构总览

```
┌──────────────────────────────────────────────┐
│  Build: pnpm build                            │
│  opennextjs-cloudflare build                  │
│    ↓ 读 next.config.ts + open-next.config.ts  │
│    ↓ 跑 Next.js build，产物在 .next/          │
│    ↓ OpenNext 把 .next/ 转成 .open-next/      │
│      • .open-next/worker.js  (入口)           │
│      • .open-next/assets/    (静态文件)       │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│  Dev: pnpm dev  (wrangler dev)                │
│  Miniflare (workerd) 本地起 Worker            │
│  静态资源走 Workers static assets binding     │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│  Deploy: pnpm deploy  (wrangler deploy)       │
│  上传 worker.js + assets 到 Cloudflare        │
│  https://<name>.<subdomain>.workers.dev        │
└──────────────────────────────────────────────┘
```

请求路径：用户 → Cloudflare CDN → Worker (OpenNext handler) → 渲染 RSC/SSG → 响应

---

## 3. 文件清单

### 3.1 新增

| 路径 | 用途 |
|------|------|
| `wrangler.jsonc` | Worker 配置：name / main / compatibility_date / flags / assets / vars / observability |
| `open-next.config.ts` | OpenNext Cloudflare adapter 配置（最小，默认即可） |
| `.dev.vars.example` | 本地 env 模板（gitignore 真实 `.dev.vars`） |
| `docs/superpowers/specs/2026-06-02-opennext-cloudflare-design.md` | 本 spec 文件 |

### 3.2 修改

| 路径 | 改动 |
|------|------|
| `package.json` | 新增 devDeps `@opennextjs/cloudflare`、`wrangler`；改 `dev` / `build` / `start` / `deploy` / `preview` / `typegen` 脚本 |
| `next.config.ts` | 加 `images: { unoptimized: true }`，保留 next-intl plugin |
| `src/app/[locale]/layout.tsx` | 移除 `<Analytics />` / `<SpeedInsights />`；加 Cloudflare Web Analytics beacon 脚本（token 来自 `NEXT_PUBLIC_CF_ANALYTICS_TOKEN`） |
| `.gitignore` | 补 `.open-next/`、`.dev.vars`、`worker-configuration.d.ts` |

### 3.3 不修改

- 所有业务代码：`src/app/**/page.tsx`、`src/components/**`、`src/lib/**`、`dictionary/**`
- `src/middleware.ts`（next-intl 中间件，与 OpenNext 兼容）
- `src/app/robots.txt`（保留 index, follow）
- `src/app/sitemap.ts`（仍读 `NEXT_PUBLIC_HOST`）
- `public/*`（静态资源）

---

## 4. 关键配置

### 4.1 `wrangler.jsonc`

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "fast3dtextonline",
  "main": ".open-next/worker.js",
  "compatibility_date": "2026-06-01",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "vars": {
    "NEXT_PUBLIC_HOST": "https://fast3dtextonline.com"
  },
  "observability": { "enabled": true }
}
```

### 4.2 `open-next.config.ts`

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
export default defineCloudflareConfig({});
```

### 4.3 `package.json` 脚本

```json
{
  "dev": "wrangler dev",
  "build": "opennextjs-cloudflare build",
  "start": "wrangler dev",
  "deploy": "wrangler deploy",
  "preview": "wrangler dev --live-reload",
  "typegen": "wrangler types"
}
```

### 4.4 `next.config.ts`

```ts
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

### 4.5 `src/app/[locale]/layout.tsx` 关键改动

- 删除 `import { Analytics } from "@vercel/analytics/react"` 与 `<Analytics />`
- 删除 `import { SpeedInsights } from "@vercel/speed-insights/next"` 与 `<SpeedInsights />`
- 在 `</body>` 前插入 Cloudflare Web Analytics beacon：

```tsx
<script
  defer
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon={JSON.stringify({
    token: process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? "",
  })}
/>
```

`token` 缺失时退化为空字符串，Cloudflare beacon 不会发送数据，不会引发运行时错误。

### 4.6 `.gitignore` 增量

```
.open-next/
.dev.vars
worker-configuration.d.ts
```

### 4.7 `.dev.vars.example`

```
NEXT_PUBLIC_HOST=http://localhost:8787
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=
```

---

## 5. 数据流 & 兼容性

| 资源 | 处理方式 |
|------|---------|
| 静态图片（`/public/*`） | 通过 `assets` binding 走 CF CDN，零开销 |
| `next/image` | 禁用优化，直接原图返回 |
| 客户端 Three.js | 浏览器执行，与 Worker 无关，按现有方式打包 |
| `next-intl` middleware | 走 OpenNext edge middleware |
| `crypto-js` + `lz-string` | 纯 JS，无需 polyfill |
| `process.env.NEXT_PUBLIC_*` | wrangler `vars` 内联进客户端 bundle |
| `process.env.*`（服务端） | 走 Worker env（OpenNext 已桥接） |

---

## 6. 错误处理

| 场景 | 处理 |
|------|------|
| 构建失败 | `opennextjs-cloudflare build` 退出非 0，CI 直接中断 |
| `NEXT_PUBLIC_HOST` 缺失 | 仍可构建；sitemap / layout 用兜底默认值（与现状一致） |
| 部署到 Cloudflare 失败 | `wrangler deploy` 退出非 0，提示 token / 权限问题 |
| 运行时异常 | Cloudflare Workers `tail` 日志可看；`observability.enabled = true` 进 dashboard |
| 404 | 现有 `not-found.tsx` 处理，OpenNext 路由保持一致 |

---

## 7. 验证矩阵

不新增自动化测试套件（项目无现成测试基础设施）。验证矩阵：

| 命令 | 目的 |
|------|------|
| `pnpm lint` | ESLint 不退化 |
| `pnpm build` | `opennextjs-cloudflare build` 成功且无 type / RSC 错误 |
| `pnpm preview` | `wrangler dev` 起本地 Worker，逐条访问：首页 / `/editor` / `/styles/[slug]` / `/fonts/[slug]` / `/holiday/[holiday]` 等；验证透明 PNG 下载、3D 编辑器渲染 |
| `wrangler deploy --dry-run` | 验证 wrangler 配置无语法 / 资源错误 |
| `pnpm deploy` | 真实部署到 Cloudflare，浏览器验证线上 URL |

---

## 8. 不在本次范围

- ❌ 不引入 KV / R2 / D1 / DO / Queues binding
- ❌ 不开启 PPR / ISR
- ❌ 不改任何业务代码（pages / components / lib / dictionary / middleware）
- ❌ 不修改 sitemap 逻辑（依然读 `NEXT_PUBLIC_HOST`）
- ❌ 不重写 `BackgroundSelector` / `Effects` / `ThreeTools` / `PreviewToolbar` 任何客户端逻辑
- ❌ 不动字体加载方式（Google Fonts 走 `<link rel="preconnect">`，与 Worker 无关）

---

## 9. 风险与回滚

**主要风险**：
1. `opennextjs-cloudflare` 与 Next.js 15.2.8 的版本兼容（升级前需对照其支持矩阵）
2. `nodejs_compat` flag 当前被广泛使用，OpenNext 默认要求
3. Cloudflare Workers bundle size 限制（10MB 压缩），本项目 Three.js 走客户端不影响 Worker bundle，但仍需 `pnpm build` 后确认 worker.js < 1MB

**回滚方案**：
- 所有改动都是新增 / 修改配置 / 删 Vercel 组件，不动业务代码
- 回滚 = `git revert` 对应 commit
- 不影响 `public/*` 静态资源

---

## 10. 后续可能增强（v1 后）

- Workers KV 缓存 ISR
- R2 存博客封面图 / 3D 作品集
- Cloudflare Images 替换 `images.unoptimized`
- 多环境（`env.preview` / `env.production`）
