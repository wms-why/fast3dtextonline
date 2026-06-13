# Embed Editor in Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Embed the interactive `EditorSurface` below the hero on all 131 detail pages across 6 route groups (`/styles/:slug`, `/fonts/:slug`, `/logo/:scene`, `/holiday/:holiday`, `/industry/:industry`, `/name/:name`), hydrated with the current page's preset.

**Architecture:** A new thin wrapper component `TemplateEditorSection` sits between the detail page and the existing `EditorSurface`. Each detail page computes its `ShareObj` from existing preset data (own `editorPreset` for styles; `styleSlugs[0]` for fonts/logo/holiday/industry; curated `styleSlugs[0]` for names with `stylePresets[0]` as a fallback) and passes it down. The wrapper owns section layout, i18n, and the `if (!preset) return null` short-circuit. The wrapper does not modify `EditorSurface` internals.

**Tech Stack:** React Router v7, React 19, TypeScript, Radix Themes, the existing `EditorSurface` / `FullEditor` / `ThreeTools.ts` Three.js pipeline, in-house `ShareObj` from `app/lib/share-data.ts`.

**Spec:** `docs/superpowers/specs/2026-06-14-embed-editor-in-detail-pages-design.md`

**No automated test suite** (per CLAUDE.md). Verification at each task = `pnpm typecheck && pnpm build`. The final task adds `pnpm lint`.

---

## File Structure

### New files
- `app/components/editor/TemplateEditorSection.tsx` — wrapper component, single responsibility: pass `ShareObj` props into `EditorSurface` with a consistent section/heading/i18n layout.

### Modified files
- `app/routes/styles-id.tsx` — render `<TemplateEditorSection preset={style.editorPreset} />` after the hero `Section`, before the summary `Section`.
- `app/routes/fonts-id.tsx` — same, with `preset` = `getStylePreset(theme.styleSlugs[0])?.editorPreset`.
- `app/routes/logo-id.tsx` — same, with `preset` = `getStylePreset(scene.styleSlugs[0])?.editorPreset`.
- `app/routes/holiday-id.tsx` — same, with `preset` = `getStylePreset(preset.styleSlugs[0])?.editorPreset`.
- `app/routes/industry-id.tsx` — same, with `preset` = `getStylePreset(preset.styleSlugs[0])?.editorPreset`.
- `app/routes/name-id.tsx` — same, with `preset` = `getNamePagePreset(namePreset)`.
- `app/lib/presets/name-presets.ts` — add `getNamePagePreset(namePreset: NamePreset): ShareObj` export.
- `dictionary/en.json` — add `TemplateEditorSection` namespace with `defaultTitle` + `defaultSubtitle`.
- `dictionary/zh.json` — same.

### Untouched
- `app/components/editor/EditorSurface.tsx` — no changes.
- `app/components/editor/FullEditor.tsx` — no changes.
- `app/lib/presets/style-presets.ts` — no changes (the per-style `editorPreset` already exists).
- `app/lib/presets/prerender.ts` — no changes (no new URLs).
- `app/routes/editor-index.tsx` and `app/routes/editor-data.tsx` — no changes (SPA route unaffected).
- Hero "Open in Editor" CTA in all 6 detail pages — no changes.

---

## Task 1: Add i18n keys to `dictionary/en.json`

**Files:**
- Modify: `dictionary/en.json`

- [ ] **Step 1: Open `dictionary/en.json` and find a good insertion point**

Read the file. Pick any existing top-level namespace (e.g. `StylePage`, `FontPage`) as a reference for indentation (the file uses 2-space indentation).

- [ ] **Step 2: Add the `TemplateEditorSection` namespace**

Insert (alongside the other top-level keys, sorted alphabetically for readability — between `TemplateEditorSection` and `TextEditor` if those exist, otherwise near the end of the file):

```json
  "TemplateEditorSection": {
    "defaultTitle": "Try it in the editor",
    "defaultSubtitle": "Customize the text, colors, and effects below, then export your design as a transparent PNG."
  },
```

Make sure the trailing comma does not break the JSON structure. The new key must NOT be the last entry of the top-level object — every other entry should keep its trailing comma.

- [ ] **Step 3: Verify the JSON is still valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('dictionary/en.json', 'utf8')); console.log('ok')"`
Expected: `ok`

If it errors, fix the syntax (most likely a missing or extra comma) and re-run.

- [ ] **Step 4: Verify the keys exist**

Run: `grep -E '"defaultTitle"|"defaultSubtitle"' dictionary/en.json`
Expected: at least one line containing `"defaultTitle"` and one containing `"defaultSubtitle"`.

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: exits 0, no errors. (The new keys aren't referenced yet, but a malformed JSON file would surface in tsx/esbuild loaders, so this is a sanity check.)

- [ ] **Step 6: Commit**

```bash
git add dictionary/en.json
git commit -m "feat(i18n): add TemplateEditorSection namespace to en.json"
```

---

## Task 2: Add i18n keys to `dictionary/zh.json`

**Files:**
- Modify: `dictionary/zh.json`

- [ ] **Step 1: Open `dictionary/zh.json` and find a good insertion point**

Read the file. The 2-space indentation matches `en.json`. The Chinese values are direct translations of the English keys.

- [ ] **Step 2: Add the `TemplateEditorSection` namespace**

Insert (matching alphabetical position):

```json
  "TemplateEditorSection": {
    "defaultTitle": "在编辑器中试试",
    "defaultSubtitle": "在下方调整文字、颜色和效果，然后把设计导出为带透明背景的 PNG。"
  },
```

Same trailing-comma discipline as Task 1.

- [ ] **Step 3: Verify the JSON is still valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('dictionary/zh.json', 'utf8')); console.log('ok')"`
Expected: `ok`

- [ ] **Step 4: Verify the keys exist**

Run: `grep -E '"defaultTitle"|"defaultSubtitle"' dictionary/zh.json`
Expected: at least one match for each.

- [ ] **Step 5: Run typecheck**

Run: `pnpm typecheck`
Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add dictionary/zh.json
git commit -m "feat(i18n): add TemplateEditorSection namespace to zh.json"
```

---

## Task 3: Add `getNamePagePreset` helper to `name-presets.ts`

**Files:**
- Modify: `app/lib/presets/name-presets.ts`

- [ ] **Step 1: Read the top and bottom of `app/lib/presets/name-presets.ts`**

The file currently exports `NamePreset` interface, `namePresets` array, and (per CLAUDE.md) likely `getName` / `getLocalizedName` helpers too. Find a stable insertion point at the bottom of the file (after the last `export`).

- [ ] **Step 2: Add the import for `stylePresets` and `getStylePreset`**

Near the top of the file, add (or merge with existing imports — check what's already there first):

```ts
import { stylePresets, getStylePreset } from "./style-presets";
import type { ShareObj } from "../share-data";
```

If `getStylePreset` is not exported from `style-presets.ts`, look at the file. Based on the spec, `getStylePreset(slug: string)` is what `fonts-id.tsx`, `logo-id.tsx`, `holiday-id.tsx`, `industry-id.tsx` already import — so it must exist. If the export name is different (e.g. `getStyleBySlug`), use that name consistently. (Quick check: `grep -E "^export (function|const) getStyle" app/lib/presets/style-presets.ts`.)

- [ ] **Step 3: Add the helper function at the bottom of the file**

```ts
// First entry of stylePresets is "barbie-pink" — used only as a last-resort
// fallback if a name's curated styleSlugs[0] no longer resolves in stylePresets.
const NAME_FALLBACK_PRESET = stylePresets[0];

/**
 * Build a ShareObj for the /name/:name detail page. Uses the curated
 * styleSlugs[0] from NamePreset (e.g. "neon-night" for "john"), with
 * displayText ("JOHN") as the visible text. Falls back to
 * stylePresets[0] (barbie-pink) if the curated slug is missing or stale.
 */
export function getNamePagePreset(namePreset: NamePreset): ShareObj {
  const curated = getStylePreset(namePreset.styleSlugs[0] ?? "");
  const anchor = curated ?? NAME_FALLBACK_PRESET;
  return {
    ...anchor.editorPreset,
    text: {
      ...anchor.editorPreset.text,
      text: namePreset.displayText,
    },
  };
}
```

- [ ] **Step 4: Run typecheck to verify the helper compiles**

Run: `pnpm typecheck`
Expected: exits 0. If it complains about `getStylePreset` not being exported, fix the import to use the actual export name from `style-presets.ts`.

- [ ] **Step 5: Commit**

```bash
git add app/lib/presets/name-presets.ts
git commit -m "feat(presets): add getNamePagePreset helper for /name/:name editor"
```

---

## Task 4: Create `TemplateEditorSection` wrapper component

**Files:**
- Create: `app/components/editor/TemplateEditorSection.tsx`

- [ ] **Step 1: Create the file with the full component**

Write the following content to `app/components/editor/TemplateEditorSection.tsx`:

```tsx
import { Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { EditorSurface } from "./EditorSurface";
import { useTranslations } from "@/lib/i18n/use-translations";
import type { ShareObj } from "@/lib/share-data";

type Size = "compact" | "regular";

/**
 * Shared wrapper around EditorSurface used by every SEO detail page.
 * Owns the section layout, i18n heading/subtitle, and the silent
 * `if (!preset) return null` short-circuit. Does not touch
 * EditorSurface internals.
 */
export function TemplateEditorSection({
  preset,
  title,
  sectionId,
  size = "regular",
}: {
  preset: ShareObj;
  title?: string;
  sectionId?: string;
  size?: Size;
}) {
  if (!preset) return null;

  const t = useTranslations("TemplateEditorSection");
  const heading = title ?? t("defaultTitle");
  const subtitle = t("defaultSubtitle");
  const id = sectionId ?? "try-it-in-the-editor";

  return (
    <Section
      id={id}
      className="w-full bg-gray-50 py-12 dark:bg-gray-900"
      aria-labelledby={`${id}-heading`}
    >
      <Container px="4" size="4">
        <Flex direction="column" gap="5">
          <Flex direction="column" align="center" gap="2" className="text-center">
            <Heading as="h2" id={`${id}-heading`} size="7">
              {heading}
            </Heading>
            <Text size="4" color="gray" style={{ maxWidth: 720 }}>
              {subtitle}
            </Text>
          </Flex>
          <EditorSurface
            textProp={preset.text}
            backgroundProp={preset.bg}
            effectProp={preset.effect}
            templateSlug={preset.templateSlug}
            compactLayout={size === "compact"}
          />
        </Flex>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Run typecheck to verify the new file compiles**

Run: `pnpm typecheck`
Expected: exits 0. If the typecheck fails on the `useTranslations("TemplateEditorSection")` call, it means the i18n types are statically generated from the dictionary and need to be regenerated. Run `pnpm typecheck` (which already does `react-router typegen` first) — that should pick up the new keys. If it still fails, check `app/lib/i18n/use-translations.ts` to see how the namespace type is derived; if it's a strict `keyof typeof ns` lookup, the typegen or build may need a full rerun: `pnpm typecheck && pnpm build`.

- [ ] **Step 3: Commit**

```bash
git add app/components/editor/TemplateEditorSection.tsx
git commit -m "feat(editor): add TemplateEditorSection wrapper component"
```

---

## Task 5: Embed `TemplateEditorSection` in `/styles/:slug`

**Files:**
- Modify: `app/routes/styles-id.tsx`

- [ ] **Step 1: Add the import**

Add (next to the other imports at the top of the file):

```ts
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
```

- [ ] **Step 2: Compute the preset**

In the component body, after `const copy = getLocalizedStyle(style, locale);` and before the `return`, add:

```ts
  const editorSectionPreset = style.editorPreset;
```

(The `style.editorPreset` is already used by the `editorHref` line; we can re-use the same field directly without computing anything new.)

- [ ] **Step 3: Insert the section**

In the `return` JSX, insert the `TemplateEditorSection` between the existing Hero `</Section>` and the next `<Section className="w-full py-12">` (the Summary section). The exact insertion point is the line that currently has `</Section>` ending the hero followed by `<Section className="w-full py-12">` starting the summary:

```tsx
      </Section>

      <TemplateEditorSection preset={style.editorPreset} />

      <Section className="w-full py-12">
```

The full context for clarity — the hero `Section` is the one with `style={{ background: style.visual.background, color: style.visual.foreground }}` and contains the `Grid` with badge/heading/description/buttons/preview. The next `Section` is the one with `className="w-full py-12"` that contains the two summary cards. The new `<TemplateEditorSection>` goes strictly between them.

- [ ] **Step 4: Run typecheck**

Run: `pnpm typecheck`
Expected: exits 0.

- [ ] **Step 5: Run build to confirm the prerender of `/styles/:slug` works**

Run: `pnpm build 2>&1 | tail -30`
Expected: build succeeds; look for `/styles/barbie-pink` (or any other style slug) in the build output. The build is SSG so it'll re-prerender all 131 detail pages. If the build fails, check the error — most likely a missing import or typo in the JSX.

- [ ] **Step 6: Commit**

```bash
git add app/routes/styles-id.tsx
git commit -m "feat(routes): embed TemplateEditorSection in /styles/:slug"
```

---

## Task 6: Embed in `/fonts/:slug`

**Files:**
- Modify: `app/routes/fonts-id.tsx`

- [ ] **Step 1: Add the import**

Add:

```ts
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
```

- [ ] **Step 2: Compute the preset**

After `const primary = theme.styleSlugs[0] ? getStylePreset(theme.styleSlugs[0]) : undefined;`, the variable `primary.editorPreset` is the value we need. No new computation — just reference it.

- [ ] **Step 3: Insert the section**

Insert the section between the Hero `</Section>` (the one with `className="w-full bg-gradient-to-b from-violet-50..."`) and the next `<Section className="w-full py-12">` (the Summary). The result is:

```tsx
      </Section>

      <TemplateEditorSection preset={primary?.editorPreset} />

      <Section className="w-full py-12">
```

Note the optional chaining: `primary` is already typed `StylePreset | undefined` — `primary?.editorPreset` is `ShareObj | undefined`, and `TemplateEditorSection` handles `undefined` by returning `null` (silent fail).

- [ ] **Step 4: Run typecheck + build**

```bash
pnpm typecheck
pnpm build 2>&1 | tail -30
```

Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add app/routes/fonts-id.tsx
git commit -m "feat(routes): embed TemplateEditorSection in /fonts/:slug"
```

---

## Task 7: Embed in `/logo/:scene`

**Files:**
- Modify: `app/routes/logo-id.tsx`

- [ ] **Step 1: Add the import**

```ts
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
```

- [ ] **Step 2: Compute the preset**

The `primary` variable is already computed: `const primary = scene.styleSlugs[0] ? getStylePreset(scene.styleSlugs[0]) : undefined;`. Reuse `primary?.editorPreset`.

- [ ] **Step 3: Insert the section**

Insert between the Hero `</Section>` (the one with `className="w-full bg-gradient-to-b from-pink-50..."`) and the next `<Section className="w-full py-12">` (the Summary). The full edit:

```tsx
      </Section>

      <TemplateEditorSection preset={primary?.editorPreset} />

      <Section className="w-full py-12">
```

- [ ] **Step 4: Run typecheck + build**

```bash
pnpm typecheck
pnpm build 2>&1 | tail -30
```

Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add app/routes/logo-id.tsx
git commit -m "feat(routes): embed TemplateEditorSection in /logo/:scene"
```

---

## Task 8: Embed in `/holiday/:holiday`

**Files:**
- Modify: `app/routes/holiday-id.tsx`

- [ ] **Step 1: Add the import**

```ts
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
```

- [ ] **Step 2: Compute the preset**

The `primary` variable is already computed: `const primary = preset.styleSlugs[0] ? getStylePreset(preset.styleSlugs[0]) : undefined;`. Reuse `primary?.editorPreset`.

- [ ] **Step 3: Insert the section**

Insert between the Hero `</Section>` (the one with `className="w-full bg-gradient-to-b from-red-50..."`) and the next `<Section className="w-full py-12">` (the Summary). The full edit:

```tsx
      </Section>

      <TemplateEditorSection preset={primary?.editorPreset} />

      <Section className="w-full py-12">
```

- [ ] **Step 4: Run typecheck + build**

```bash
pnpm typecheck
pnpm build 2>&1 | tail -30
```

Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add app/routes/holiday-id.tsx
git commit -m "feat(routes): embed TemplateEditorSection in /holiday/:holiday"
```

---

## Task 9: Embed in `/industry/:industry`

**Files:**
- Modify: `app/routes/industry-id.tsx`

- [ ] **Step 1: Add the import**

```ts
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
```

- [ ] **Step 2: Compute the preset**

The `primary` variable is already computed: `const primary = preset.styleSlugs[0] ? getStylePreset(preset.styleSlugs[0]) : undefined;`. Reuse `primary?.editorPreset`.

- [ ] **Step 3: Insert the section**

Insert between the Hero `</Section>` (the one with `className="w-full bg-gradient-to-b from-emerald-50..."`) and the next `<Section className="w-full py-12">` (the Summary). The full edit:

```tsx
      </Section>

      <TemplateEditorSection preset={primary?.editorPreset} />

      <Section className="w-full py-12">
```

- [ ] **Step 4: Run typecheck + build**

```bash
pnpm typecheck
pnpm build 2>&1 | tail -30
```

Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add app/routes/industry-id.tsx
git commit -m "feat(routes): embed TemplateEditorSection in /industry/:industry"
```

---

## Task 10: Embed in `/name/:name`

**Files:**
- Modify: `app/routes/name-id.tsx`

- [ ] **Step 1: Read the current `name-id.tsx`**

Note that this file is structurally similar to `fonts-id.tsx` and may or may not have a `primary` variable already. The implementation should:
1. Add the `TemplateEditorSection` import.
2. Add the `getNamePagePreset` import from `@/lib/presets/name-presets`.
3. Compute the preset using `getNamePagePreset(namePreset)`.
4. Insert the section between Hero and Summary.

- [ ] **Step 2: Add the imports**

```ts
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
import { getNamePagePreset } from "@/lib/presets/name-presets";
```

(Check that `getNamePagePreset` is already exported from Task 3. If you skipped Task 3 or it failed, do that first.)

- [ ] **Step 3: Compute the preset**

Locate the spot in the component body where `namePreset` (the result of `getName(name)` or similar) is in scope. The actual variable name depends on the existing code — read the file first. Add:

```ts
  const editorSectionPreset = getNamePagePreset(namePreset);
```

If the existing variable is named differently (e.g. `preset`, `name`), use the actual name. The `getNamePagePreset` function always returns a valid `ShareObj` (uses the fallback), so the result is never `undefined`.

- [ ] **Step 4: Insert the section**

Insert between the Hero `</Section>` (the one with the name-title hero) and the next `<Section className="w-full py-12">` (the Summary):

```tsx
      </Section>

      <TemplateEditorSection preset={editorSectionPreset} />

      <Section className="w-full py-12">
```

If the existing variable was named `preset` (shadowing the outer scope `preset`), rename to `editorSectionPreset` (or another non-conflicting name) before passing it in.

- [ ] **Step 5: Run typecheck + build**

```bash
pnpm typecheck
pnpm build 2>&1 | tail -30
```

Expected: both succeed. The build re-prerenders all 89 `/name/:name` pages, so this is the most expensive single-task build in the plan. If it fails, look for typos in the import or the variable name.

- [ ] **Step 6: Commit**

```bash
git add app/routes/name-id.tsx
git commit -m "feat(routes): embed TemplateEditorSection in /name/:name"
```

---

## Task 11: Lint + final verification

**Files:** none modified in this task — verification only.

- [ ] **Step 1: Run lint**

Run: `pnpm lint`
Expected: exits 0. If the linter complains about unused imports (e.g. an existing `getStylePreset` import in `fonts-id.tsx`/`logo-id.tsx`/`holiday-id.tsx`/`industry-id.tsx` that was already unused, or a new unused import), fix the import list to remove the unused symbol. Do not silence with `// eslint-disable` unless absolutely necessary.

- [ ] **Step 2: Run final build**

Run: `pnpm build 2>&1 | tail -50`
Expected: build succeeds. Look at the output's prerender summary — should list all 131 detail pages plus the other pages (home, lists, resources, blog list, blog ids). No errors.

- [ ] **Step 3: Spot-check one of each route group in the build output**

The build writes prerendered HTML to `build/client/`. Verify the editor section is in the rendered HTML for at least one page from each group:

```bash
grep -l "Try it in the editor" build/client/styles/barbie-pink/index.html
grep -l "Try it in the editor" build/client/fonts/bubble/index.html
grep -l "Try it in the editor" build/client/logo/gaming-logo/index.html
grep -l "Try it in the editor" build/client/holiday/christmas/index.html
grep -l "Try it in the editor" build/client/industry/gaming/index.html
grep -l "Try it in the editor" build/client/name/emma/index.html
```

Expected: each command prints the matching file path (no error). For `/zh` pages, search for `在编辑器中试试` instead.

- [ ] **Step 4: Verify a name page rendered the right `displayText`**

```bash
grep -o '"text":"EMMA"' build/client/name/emma/index.html | head -1
```

Expected: one match. The exact format depends on how `textProp` is serialized into the static HTML, so if the JSON is embedded differently (e.g. `JSON.stringify({...})`), adapt the grep pattern — the goal is to confirm the editor's initial text is "EMMA" (uppercase) and not "emma" (lowercase URL slug). If you don't find it, search for `Emma` or `EMMA` near the `templateSlug` and `text` markers.

- [ ] **Step 5: Manual smoke test (optional but recommended)**

Run `pnpm dev` and visit:
- `http://localhost:5173/en/styles/barbie-pink` — verify the editor section appears below the hero.
- `http://localhost:5173/zh/styles/barbie-pink` — verify Chinese title/subtitle.
- `http://localhost:5173/en/name/emma` — verify the editor opens with "EMMA" text in a barbie-pink style.
- Toggle Theme in the header — verify `bg-gray-50` switches to `bg-gray-900`.

- [ ] **Step 6: Final commit if any cleanup was needed**

If Steps 1–4 surfaced lint errors or build fixes, commit them as a follow-up commit:

```bash
git add -A
git commit -m "chore: lint and build fixes from embed-editor rollout"
```

If no changes were needed, skip this step — there is nothing to commit.

---

## Self-Review

### Spec coverage
- ✅ Goal 1 (embed on 131 detail pages) — Tasks 5, 6, 7, 8, 9, 10 each handle one route group.
- ✅ Goal 2 (keep "Open in Editor" CTA unchanged) — explicitly listed as untouched in File Structure.
- ✅ Goal 3 (keep `StylePreview` static card unchanged) — explicitly listed as untouched.
- ✅ Goal 4 (no new indexable URLs / no prerender changes) — `prerender.ts` not modified.
- ✅ Goal 5 (locale/Theme/i18n/SEO unaffected) — `useTranslations` reuses the i18n layer; no SEO meta changes.
- ✅ Component API `{ preset, title?, sectionId?, size? }` — Task 4 implements it exactly.
- ✅ i18n keys (`defaultTitle` / `defaultSubtitle`) — Tasks 1, 2 add them to both locales.
- ✅ `getNamePagePreset` helper — Task 3 implements it.
- ✅ Verification (`pnpm typecheck` + `pnpm build` per task + `pnpm lint` final) — Task 11.

### Placeholder scan
- No "TBD", "TODO", "implement later", "fill in details" anywhere.
- No "add appropriate error handling" or "handle edge cases" — the spec's silent-fail behavior is captured explicitly in Task 4 (`if (!preset) return null`).
- No "Similar to Task N" — each task spells out its full file content and edits.
- Code blocks are present for every code change.

### Type consistency
- `preset: ShareObj` is used in `TemplateEditorSection`'s prop (Task 4) and in all 6 route callsites (Tasks 5–10) — consistent.
- `getNamePagePreset(namePreset: NamePreset): ShareObj` returns `ShareObj` (not `ShareObj | undefined`) — Task 3 and Task 10's callsite match.
- `primary?.editorPreset` is `ShareObj | undefined` — passes through `TemplateEditorSection`'s `if (!preset) return null` short-circuit.
- `templateSlug` passed to `EditorSurface` comes from `preset.templateSlug` (optional) — matches `EditorSurface`'s prop type.
- `compactLayout={size === "compact"}` is `boolean` — matches `EditorSurface`'s prop type.
- `sectionId` defaults to `"try-it-in-the-editor"`; `aria-labelledby` derives from it consistently.
- Import names verified against the spec: `TemplateEditorSection`, `EditorSurface`, `useTranslations`, `ShareObj`, `getStylePreset`, `stylePresets`, `getNamePagePreset`, `NamePreset`. No name drift between tasks.
