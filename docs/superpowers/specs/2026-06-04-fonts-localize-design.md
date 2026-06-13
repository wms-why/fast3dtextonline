# 字体资源本地化设计

**日期**：2026-06-04
**作者**：Claude（brainstorming 流程产出）
**目标**：消除 `app/lib/presets/fonts.ts` 中 `getFontPath()` 对 `https://fast3dtest.mysoul.fun/...` 的依赖，改为完全本地化的 typeface.json 资源

---

## 1. 背景与目标

`app/lib/presets/fonts.ts:57` 的 `getFontPath()` 在查不到本地路径时，会 silent fallback 到外域：

```ts
return `https://fast3dtest.mysoul.fun/${fontName}_${w}.json`;
```

该外域是产品上一个临时字体托管服务，不稳定、不归本仓库管、SEO 与隐私上也不该有外域请求。本地化后，编辑器字体加载完全收敛到 `public/fonts/`，构建产物可独立 deploy。

**目标**：

- 把 8 个字体（Regular/Bold 共 14 个 .json）从 `https://fast3dtest.mysoul.fun/${fontName}_${w}.json` 下载到 `public/fonts/`
- `getFontPath()` 永远返回本地路径，找不到本地路径时**直接 throw**，不再 silent fallback
- `app/` 内 `fast3dtest.mysoul.fun` / `mysoul` 字面引用归零
- 调用方零改动（`TextSetting.tsx`、`style-presets.ts`、`ThreeTools.ts` 等签名不变）
- `pnpm typecheck` + `pnpm build` 通过

**非目标**：

- 不动 `TTFLoader` 路径 / 现有 `public/fonts/*.ttf` / `style-preview-fonts.json` manifest
- 不动 `Fonts[]` 数组、不重排 preset slug
- 不优化字体大小（不裁剪、gzip 预处理）—— 后续 follow-up
- 不动 SEO / prerender / sitemap（字体资源不在 prerender 列表里）
- 不引入 CDN / 远程字体回源策略

---

## 2. 当前结构

### 2.1 字体加载两条独立路径

`TextSetting.tsx` / `ThreeTools.ts` 里 font 资源走两条**完全独立**的 loader：

| 路径 | 文件格式 | Three.js loader | 用途 |
|---|---|---|---|
| `getFontPath()` 返回值 | Three.js **typeface.json**（pre-triangulated mesh） | `FontLoader` | preset 里的内置字体 |
| 用户上传 TTF | `.ttf` | `TTFLoader` | 用户自选字体 |

两条路径并存：`public/fonts/*.ttf` 给 `TTFLoader` 用；外域 `*.json` 给 `FontLoader` 用。互不冲突。

### 2.2 当前 `LocalFontPathMap`（fonts.ts:34-50）

已为 4 个字体提供本地 `.ttf` 路径（走 TTFLoader 路径），其余 8 个字体**仍在用外域 .json**（走 FontLoader 路径）：

| 已本地化的 4 个（TTFLoader 路径） | 仍用外域的 8 个（FontLoader 路径） |
|---|---|
| Public Sans, Archivo, Anton, Merriweather | Gentilis, Helvetiker, Optimer, Alibaba_PuHuiTi_3.0, Noto_Sans_SC, Barbie_Doll, Barbie_Princess, Bartex |

注意区分：
- 已本地化的 4 个：`.ttf` 文件给 `TTFLoader`，但它们**对应的 typeface.json 也走外域**（这本身是 bug，本次不修）
- 仍用外域的 8 个：本次目标

---

## 3. 资源下载

### 3.1 目标位置

`public/fonts/<fontName>_<weight>.json`（保留原大小写、下划线命名，与外域 URL 风格一致）

### 3.2 14 个文件清单

| 字体 (fontName) | Regular | Bold | 备注 |
|---|---|---|---|
| Gentilis | `Gentilis_Regular.json` | `Gentilis_Bold.json` | |
| Helvetiker | `Helvetiker_Regular.json` | `Helvetiker_Bold.json` | |
| Optimer | `Optimer_Regular.json` | `Optimer_Bold.json` | |
| Alibaba_PuHuiTi_3.0 | `Alibaba_PuHuiTi_3.0_Regular.json` | `Alibaba_PuHuiTi_3.0_Bold.json` | 中文 |
| Noto_Sans_SC | `Noto_Sans_SC_Regular.json` | `Noto_Sans_SC_Bold.json` | 中文 |
| Barbie_Doll | `Barbie_Doll_Regular.json` | — | 仅 Regular |
| Barbie_Princess | `Barbie_Princess_Regular.json` | — | 仅 Regular |
| Bartex | `Bartex_Regular.json` | — | 仅 Regular |

### 3.3 下载流程

1. 并行 `curl -fsSL -o public/fonts/<name>.json <url>` 14 个文件
2. 每个文件下载后立即用 `node -e "JSON.parse(require('fs').readFileSync(f,'utf8'))"` 校验合法 JSON（拦截 HTML 错误页 / 403 跳转）
3. 任何文件下载失败或 JSON 非法 → 立即 abort、报告缺失 URL / 损坏文件，**不**做半成品迁移
4. 用 `wc -c` 输出每个文件大小作为日志（典型 typeface.json 是 50–500 KB；中文 WebFont 解析后更大，可到 1–2 MB）

### 3.4 失败处理

- DNS / 连接失败 → 提示用户检查网络或外域可用性，重试整批
- HTTP 200 但非 JSON → 报告具体文件 URL + 响应头
- 任何缺漏 → abort、**不修改** `fonts.ts`，让用户决定是换源还是暂缓

---

## 4. 代码改动

只动一个文件：`app/lib/presets/fonts.ts`

### 4.1 扩展 `LocalFontPathMap`

```ts
const LocalFontPathMap: Partial<Record<string, Partial<Record<FontWeight, string>>>> = {
  // 现有 4 个（TTFLoader 路径，.ttf）
  "Public Sans":  { [FontWeight.Regular]: "/fonts/public-sans-400.ttf",  [FontWeight.Bold]: "/fonts/public-sans-900.ttf" },
  "Archivo":      { [FontWeight.Regular]: "/fonts/archivo-400.ttf",      [FontWeight.Bold]: "/fonts/archivo-900.ttf" },
  "Anton":        { [FontWeight.Regular]: "/fonts/anton-400.ttf" },
  "Merriweather": { [FontWeight.Regular]: "/fonts/merriweather-400.ttf", [FontWeight.Bold]: "/fonts/merriweather-900.ttf" },

  // 新增 8 个（FontLoader 路径，typeface.json）
  "Gentilis":           { [FontWeight.Regular]: "/fonts/Gentilis_Regular.json",          [FontWeight.Bold]: "/fonts/Gentilis_Bold.json" },
  "Helvetiker":         { [FontWeight.Regular]: "/fonts/Helvetiker_Regular.json",        [FontWeight.Bold]: "/fonts/Helvetiker_Bold.json" },
  "Optimer":            { [FontWeight.Regular]: "/fonts/Optimer_Regular.json",           [FontWeight.Bold]: "/fonts/Optimer_Bold.json" },
  "Alibaba_PuHuiTi_3.0":{ [FontWeight.Regular]: "/fonts/Alibaba_PuHuiTi_3.0_Regular.json",[FontWeight.Bold]: "/fonts/Alibaba_PuHuiTi_3.0_Bold.json" },
  "Noto_Sans_SC":       { [FontWeight.Regular]: "/fonts/Noto_Sans_SC_Regular.json",      [FontWeight.Bold]: "/fonts/Noto_Sans_SC_Bold.json" },
  "Barbie_Doll":        { [FontWeight.Regular]: "/fonts/Barbie_Doll_Regular.json" },
  "Barbie_Princess":    { [FontWeight.Regular]: "/fonts/Barbie_Princess_Regular.json" },
  "Bartex":             { [FontWeight.Regular]: "/fonts/Bartex_Regular.json" },
};
```

### 4.2 收紧 `getFontPath()`

```ts
export function getFontPath(fontName: string, w: FontWeight) {
  const localFontPath = LocalFontPathMap[fontName]?.[w];
  if (!localFontPath) {
    throw new Error(`No local font path for ${fontName} / ${w}`);
  }
  return localFontPath;
}
```

外域 URL 模板字符串**整行删除**。找不到本地路径时 throw 而非 silent fallback —— 因为：
- 任何 call site 传错字体名都应该立即爆错，而不是悄悄走外域
- 一旦 throw + 全量 8 个字体本地化兜底，运行期不会再触发

### 4.3 调用方影响

- `TextSetting.tsx` (3 处)、`style-presets.ts` (1 处)、`ThreeTools.ts` 调用 `getFontPath()`：签名不变、返回类型不变 → 零改动
- `Fonts[]` 数组：不动
- `FontLoader.parse(json)` / `FontLoader.loadAsync(url)`：不变（已用本地 URL）

---

## 5. 验证

按以下顺序跑通：

```bash
# 5a. 外域引用清零
grep -rn "fast3dtest.mysoul.fun" app/   # 期望：空输出
grep -rn "mysoul" app/                  # 期望：空输出

# 5b. 14 个文件全部到位
ls public/fonts/ | grep -E "_Regular\.json$|_Bold\.json$" | wc -l   # 期望：14

# 5c. 14 个文件都是合法 JSON
for f in public/fonts/*_Regular.json public/fonts/*_Bold.json; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" || echo "BAD: $f"
done   # 期望：无 BAD 输出

# 5d. 类型检查 + 构建
pnpm typecheck
pnpm build
```

`pnpm build` 不会去取字体（fonts 是 client-side 运行时加载），但会触发 typecheck + 路由 prerender；只要 `getFontPath()` 静态类型过、调用方无 stale import，build 就过。

不做的验证：
- 浏览器内 font 实际渲染（字体是否能正确出 3D mesh）：留作手测 / 部署后 Cloudflare preview 验
- 文件大小 sanity（除 JSON 合法性外不强制）：典型 typeface.json 是 50–500 KB；如果某个文件 < 5 KB 或 > 10 MB 在日志里标黄即可，不阻断

---

## 6. 风险与回滚

| 风险 | 缓解 |
|---|---|
| 外域不可达 | 步骤 3.3 一次性下载，不行就 abort 整个迁移，不做半成品 |
| 文件名大小写与未来 .ttf 冲突 | 现有 `.ttf` 用 `family-weight` 全小写，新 `.json` 用 `Family_Weight` PascalCase，不冲突；后续如加 `Helvetiker.ttf` 应另选短横线风格而非 PascalCase |
| `throw` 在 preset 渲染时炸出白屏 | `LocalFontPathMap` 全量覆盖 8 个字体 + Fonts[] 列出的全部 weight（已交叉对照）；理论上零 throw。build 时 typecheck + preset 静态求值路径过这一关 |
| 中文字体 typeface.json 解析后太大 | 不做处理；如果部署后体积告警，由后续 "压缩 / subset / 替换为更小的 preset" follow-up 解决 |

回滚：把 `getFontPath()` 改回原版 + 从 git 撤掉新增的 `.json` 文件 + 还原 `LocalFontPathMap`。

---

## 7. 范围外（明确不做）

- 不动 `style-preview-fonts.json`（TTF manifest）
- 不动 `TTFLoader` 路径、不动 `.ttf` 文件
- 不重构 `LocalFontPathMap`（不拆 manifest、不分文件）
- 不优化字体大小（subset / woff2 / 分页加载）
- 不动 `Fonts[]` 数组 / 不重排 preset
- 不动 SEO / prerender / sitemap
- 不在 `getFontPath()` 加远程回源 / 离线检测 / Service Worker cache
- 不给 LocalFontPathMap 加类型 schema 校验
