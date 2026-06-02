# OpenNext Cloudflare 改造实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把当前 Next.js 15 项目改造为 OpenNext Cloudflare Workers 项目，并支持 `pnpm dev` / `pnpm build` / `pnpm deploy` 三个 wrangler 命令的完整开发-部署工作流。

**Architecture:** 用 `@opennextjs/cloudflare` adapter 把 Next.js 构建产物转成 `.open-next/worker.js` + `.open-next/assets/`，然后由 `wrangler dev` / `wrangler deploy` 拉起本地与生产 Worker。Cloudflare 静态资源 binding 替代 Vercel Image Optimization；`images.unoptimized = true` 关闭 `next/image` 优化。删除 `@vercel/analytics` 与 `@vercel/speed-insights`，改用 Cloudflare Web Analytics beacon。

**Tech Stack:** Next.js 15.2.8, React 19, TypeScript, @opennextjs/cloudflare, wrangler 4.x, next-intl 4.x, Cloudflare Workers (workerd), Cloudflare Web Analytics

---

## File Structure

| 文件 | 状态 | 职责 |
|------|------|------|
| `wrangler.jsonc` | Create | Worker 配置：name / main / compatibility_date / flags / assets / vars / observability |
| `open-next.config.ts` | Create | OpenNext Cloudflare adapter 配置（最小默认） |
| `.dev.vars.example` | Create | 本地 env 模板（真实 `.dev.vars` 由 gitignore 排除） |
| `package.json` | Modify | 新增 devDeps；替换 dev/build/start 脚本为 wrangler 命令 |
| `next.config.ts` | Modify | 加 `images: { unoptimized: true }` |
| `src/app/[locale]/layout.tsx` | Modify | 删 Vercel Analytics / SpeedInsights；加 Cloudflare Web Analytics beacon |
| `.gitignore` | Modify | 补 `.open-next/`、`.dev.vars`、`worker-configuration.d.ts` |
| `docs/superpowers/specs/2026-06-02-opennext-cloudflare-design.md` | Reference | 本改造的设计 spec（不修改） |
| `src/**` 业务代码 | 不动 | pages / components / lib / middleware / dictionary / public |
| `pnpm-lock.yaml` | Auto-update | pnpm install 后自动更新 |

---

## Task 1: Add OpenNext + Wrangler devDependencies

**Files:**
- Modify: `package.json` (devDependencies)
- Modify: `pnpm-lock.yaml` (auto-updated)

- [ ] **Step 1: 安装 devDependencies**

```bash
cd /home/ymk/fast3dtextonline
pnpm add -D @opennextjs/cloudflare wrangler
```

- [ ] **Step 2: 验证 package.json 出现新依赖**

```bash
grep -A 1 '"@opennextjs/cloudflare"' /home/ymk/fast3dtextonline/package.json
grep -A 1 '"wrangler"' /home/ymk/fast3dtextonline/package.json
```

Expected: 两个依赖都出现在 `devDependencies` 段。

- [ ] **Step 3: 验证 wrangler 可执行**

```bash
cd /home/ymk/fast3dtextonline
pnpm wrangler --version
```

Expected: 打印 wrangler 4.x 版本号。

- [ ] **Step 4: 验证 opennextjs-cloudflare 可执行**

```bash
cd /home/ymk/fast3dtextonline
pnpm opennextjs-cloudflare --help
```

Expected: 打印 `build` / `preview` 子命令帮助。

- [ ] **Step 5: Commit**

```bash
cd /home/ymk/fast3dtextonline
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): add @opennextjs/cloudflare and wrangler as devDependencies"
```

---

## Task 2: Create `wrangler.jsonc`

**Files:**
- Create: `wrangler.jsonc`

- [ ] **Step 1: 写 wrangler.jsonc**

```bash
cat > /home/ymk/fast3dtextonline/wrangler.jsonc <<'JSON'
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
JSON
```

- [ ] **Step 2: 验证 wrangler 能解析配置**

```bash
cd /home/ymk/fast3dtextonline
pnpm wrangler deploy --dry-run 2>&1 | head -20
```

Expected: 报错 "Could not find .open-next/worker.js" 或 "wrangler.toml" 之类，因为还没 build，但 JSON 解析本身应通过。如果 wrangler 直接报 JSON 语法错，回到 Step 1 检查。

- [ ] **Step 3: Commit**

```bash
cd /home/ymk/fast3dtextonline
git add wrangler.jsonc
git commit -m "chore(wrangler): add wrangler.jsonc for OpenNext Cloudflare worker"
```

---

## Task 3: Create `open-next.config.ts`

**Files:**
- Create: `open-next.config.ts`

- [ ] **Step 1: 写 open-next.config.ts**

```bash
cat > /home/ymk/fast3dtextonline/open-next.config.ts <<'TS'
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
TS
```

- [ ] **Step 2: Commit**

```bash
cd /home/ymk/fast3dtextonline
git add open-next.config.ts
git commit -m "chore(opennext): add open-next.config.ts with default Cloudflare config"
```

---

## Task 4: Update `next.config.ts`

**Files:**
- Modify: `next.config.ts` (替换整个文件)

- [ ] **Step 1: 替换 next.config.ts 内容**

```bash
cat > /home/ymk/fast3dtextonline/next.config.ts <<'TS'
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
TS
```

- [ ] **Step 2: 验证 TypeScript 编译通过**

```bash
cd /home/ymk/fast3dtextonline
pnpm exec tsc --noEmit -p tsconfig.json
```

Expected: 无错误（exit 0）。

- [ ] **Step 3: Commit**

```bash
cd /home/ymk/fast3dtextonline
git add next.config.ts
git commit -m "chore(next): disable next/image optimization for Cloudflare Workers"
```

---

## Task 5: Update `package.json` scripts

**Files:**
- Modify: `package.json` (scripts 段)

- [ ] **Step 1: 用 Edit 替换 scripts 段**

打开 `/home/ymk/fast3dtextonline/package.json`，把 `scripts` 段从：

```json
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```

替换成：

```json
  "scripts": {
    "dev": "wrangler dev",
    "build": "opennextjs-cloudflare build",
    "deploy": "wrangler deploy",
    "preview": "wrangler dev --live-reload",
    "typegen": "wrangler types",
    "lint": "next lint"
  },
```

- [ ] **Step 2: 验证 package.json 是合法 JSON**

```bash
cd /home/ymk/fast3dtextonline
node -e "console.log(JSON.parse(require('fs').readFileSync('package.json', 'utf8')).scripts)"
```

Expected: 输出 6 个脚本名，与上面一致。

- [ ] **Step 3: 验证 start 已被删除**

```bash
cd /home/ymk/fast3dtextonline
node -e "const s = require('./package.json').scripts; if (s.start) { console.error('start still present'); process.exit(1); } else { console.log('OK: start removed'); }"
```

Expected: `OK: start removed`

- [ ] **Step 4: Commit**

```bash
cd /home/ymk/fast3dtextonline
git add package.json
git commit -m "chore(scripts): replace dev/build/start with wrangler + opennextjs-cloudflare commands"
```

---

## Task 6: Update `.gitignore`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: 读取现有 .gitignore**

```bash
cat /home/ymk/fast3dtextonline/.gitignore
```

Expected: 打印现有 ignore 列表。

- [ ] **Step 2: 在文件末尾追加 3 行**

```bash
cat >> /home/ymk/fast3dtextonline/.gitignore <<'EOF'

# OpenNext Cloudflare build/dev artifacts
.open-next/
.dev.vars
worker-configuration.d.ts
EOF
```

- [ ] **Step 3: 验证内容**

```bash
tail -10 /home/ymk/fast3dtextonline/.gitignore
```

Expected: 末尾出现 `.open-next/`、`.dev.vars`、`worker-configuration.d.ts` 三行。

- [ ] **Step 4: Commit**

```bash
cd /home/ymk/fast3dtextonline
git add .gitignore
git commit -m "chore(gitignore): exclude .open-next, .dev.vars, worker-configuration.d.ts"
```

---

## Task 7: Create `.dev.vars.example`

**Files:**
- Create: `.dev.vars.example`

- [ ] **Step 1: 写 .dev.vars.example**

```bash
cat > /home/ymk/fast3dtextonline/.dev.vars.example <<'EOF'
NEXT_PUBLIC_HOST=http://localhost:8787
NEXT_PUBLIC_CF_ANALYTICS_TOKEN=
EOF
```

- [ ] **Step 2: 验证文件内容**

```bash
cat /home/ymk/fast3dtextonline/.dev.vars.example
```

Expected: 两行 env。

- [ ] **Step 3: Commit**

```bash
cd /home/ymk/fast3dtextonline
git add .dev.vars.example
git commit -m "chore(env): add .dev.vars.example template for local dev"
```

---

## Task 8: Update `src/app/[locale]/layout.tsx` (Vercel → Cloudflare Web Analytics)

**Files:**
- Modify: `src/app/[locale]/layout.tsx` (5 处改动)

- [ ] **Step 1: 删除 Analytics 导入**

用 Edit 工具把：

```tsx
import { Analytics } from "@vercel/analytics/react";
```

替换成空（删除这一整行）。

- [ ] **Step 2: 删除 SpeedInsights 导入**

用 Edit 工具把：

```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";
```

替换成空（删除这一整行）。

- [ ] **Step 3: 删除 `<Analytics />` 调用**

在 `<NextIntlClientProvider>{children}</NextIntlClientProvider>` 闭合后删除独立的 `<Analytics />` 行。

- [ ] **Step 4: 删除 `<SpeedInsights />` 调用**

在 `<Analytics />` 之后删除独立的 `<SpeedInsights />` 行。

- [ ] **Step 5: 在 `</body>` 前插入 Cloudflare Web Analytics beacon**

找到 `</body>` 紧邻处（前面是 `</NextIntlClientProvider>` 等闭合标签），用 Edit 工具把 `</body>` 替换成：

```tsx
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN ?? ""}"}`}
        />
      </body>
```

(注意缩进保持 8 空格，与 layout 内部其他节点一致)

- [ ] **Step 6: 验证文件不再引用 vercel 包**

```bash
grep -n "vercel" /home/ymk/fast3dtextonline/src/app/\[locale\]/layout.tsx || echo "OK: no vercel references"
```

Expected: `OK: no vercel references`

- [ ] **Step 7: 验证 Cloudflare beacon 注入**

```bash
grep -n "cloudflareinsights" /home/ymk/fast3dtextonline/src/app/\[locale\]/layout.tsx
```

Expected: 打印一行含 `https://static.cloudflareinsights.com/beacon.min.js`。

- [ ] **Step 8: TypeScript 编译验证**

```bash
cd /home/ymk/fast3dtextonline
pnpm exec tsc --noEmit -p tsconfig.json
```

Expected: 无错误（exit 0）。

- [ ] **Step 9: Commit**

```bash
cd /home/ymk/fast3dtextonline
git add src/app/\[locale\]/layout.tsx
git commit -m "refactor(layout): replace Vercel Analytics/SpeedInsights with Cloudflare Web Analytics beacon"
```

---

## Task 9: Run `pnpm lint`

**Files:** (none — verification only)

- [ ] **Step 1: 跑 lint**

```bash
cd /home/ymk/fast3dtextonline
pnpm lint
```

Expected: 无 ESLint error。如果有 warning，可继续；error 必须修。

---

## Task 10: Run `pnpm build`

**Files:** (none — verification only; 会生成 `.open-next/`，已 gitignore)

- [ ] **Step 1: 跑 build**

```bash
cd /home/ymk/fast3dtextonline
pnpm build
```

Expected: `opennextjs-cloudflare build` 跑通，输出 `.open-next/worker.js` 与 `.open-next/assets/` 目录，进程 exit 0。

- [ ] **Step 2: 验证 build 产物存在**

```bash
ls -la /home/ymk/fast3dtextonline/.open-next/worker.js
ls -la /home/ymk/fast3dtextonline/.open-next/assets/ | head -10
```

Expected: `worker.js` 文件存在；`assets/` 目录包含 `chunks/`、`_next/` 之类子目录。

- [ ] **Step 3: 检查 worker.js bundle size**

```bash
du -sh /home/ymk/fast3dtextonline/.open-next/worker.js
```

Expected: < 1MB（本项目主要逻辑都走客户端，worker.js 应当较小）。如果 > 5MB，需要在 spec 里追加风险说明并查因。

---

## Task 11: Run `pnpm preview` and verify dev server

**Files:** (none — verification only)

- [ ] **Step 1: 启动本地 dev server（后台）**

```bash
cd /home/ymk/fast3dtextonline
pnpm preview > /tmp/wrangler-dev.log 2>&1 &
echo $! > /tmp/wrangler-dev.pid
sleep 8
```

- [ ] **Step 2: 验证本地 server 启动成功**

```bash
curl -sS -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8787/
```

Expected: `HTTP 200` 或 `HTTP 307`（locale redirect），非 5xx。

- [ ] **Step 3: 验证英文首页可访问**

```bash
curl -sS -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8787/en
```

Expected: `HTTP 200`。

- [ ] **Step 4: 验证中文首页可访问**

```bash
curl -sS -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8787/zh
```

Expected: `HTTP 200`。

- [ ] **Step 5: 验证编辑器页面**

```bash
curl -sS -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8787/en/editor
```

Expected: `HTTP 200`。

- [ ] **Step 6: 验证 styles 列表**

```bash
curl -sS -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8787/en/styles
```

Expected: `HTTP 200`。

- [ ] **Step 7: 验证字体 detail 页面（取一个 slug）**

```bash
SLUG=$(ls /home/ymk/fast3dtextonline/src/lib/font-presets.ts >/dev/null && grep -oE "slug: \"[a-z-]+\"" /home/ymk/fast3dtextonline/src/lib/font-presets.ts | head -1 | cut -d'"' -f2)
curl -sS -o /dev/null -w "HTTP %{http_code}\n" "http://localhost:8787/en/fonts/$SLUG"
```

Expected: `HTTP 200`。

- [ ] **Step 8: 验证 sitemap 渲染**

```bash
curl -sS http://localhost:8787/sitemap.xml | head -5
```

Expected: 输出 `<?xml ...` 起始，含 `<urlset`。

- [ ] **Step 9: 验证 robots.txt**

```bash
curl -sS http://localhost:8787/robots.txt
```

Expected: 至少含 `User-Agent: *` 与 `Allow` / `Sitemap`。

- [ ] **Step 10: 关闭本地 server**

```bash
kill $(cat /tmp/wrangler-dev.pid) 2>/dev/null
rm -f /tmp/wrangler-dev.pid /tmp/wrangler-dev.log
```

---

## Task 12: Run `wrangler deploy --dry-run`

**Files:** (none — verification only)

- [ ] **Step 1: 跑 dry-run**

```bash
cd /home/ymk/fast3dtextonline
pnpm wrangler deploy --dry-run --outdir=/tmp/wrangler-dryrun 2>&1 | tail -30
```

Expected: 无 error，输出 `Total Upload` 与 `worker.js` / `assets` 大小摘要。

- [ ] **Step 2: 验证 dry-run 产物**

```bash
ls -la /tmp/wrangler-dryrun/ 2>/dev/null | head -10
```

Expected: 含 `worker.js` 与 `static` 之类目录。

- [ ] **Step 3: 清理 dry-run 产物**

```bash
rm -rf /tmp/wrangler-dryrun
```

---

## Task 13: Final commit & summary

**Files:** (none — only docs/summary)

- [ ] **Step 1: 检查 git log**

```bash
cd /home/ymk/fast3dtextonline
git log --oneline -15
```

Expected: 看到本计划的 8 个 feat/chore 提交 + 1 个 docs spec 提交。

- [ ] **Step 2: 确认无未提交改动**

```bash
cd /home/ymk/fast3dtextonline
git status
```

Expected: `nothing to commit, working tree clean`（`.open-next/` 等应被 .gitignore 排除）。

- [ ] **Step 3: 总结报告**

向用户报告：
- 已新增：`wrangler.jsonc`、`open-next.config.ts`、`.dev.vars.example`
- 已修改：`package.json`（devDeps + 5 个 wrangler 脚本）、`next.config.ts`（`images.unoptimized`）、`src/app/[locale]/layout.tsx`（删除 Vercel 组件、加 Cloudflare Web Analytics beacon）、`.gitignore`（+3 行）
- 验证通过：`pnpm lint` / `pnpm build` / `pnpm preview`（6 路径 HTTP 200）/ `wrangler deploy --dry-run`
- 部署命令：`pnpm deploy`（首次需要 `pnpm wrangler login`）
