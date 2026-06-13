# Embed Interactive Editor in All Detail Pages

**Date:** 2026-06-14
**Status:** Approved — ready for implementation plan
**Branch:** migrate-rr7
**Scope:** Add an interactive `EditorSurface` section below the hero on all 131 detail pages across 6 route groups.

## Motivation

The site is a template-first 3D text generator. The 6 SEO detail-page route groups (`/styles/:slug`, `/fonts/:slug`, `/logo/:scene`, `/holiday/:holiday`, `/industry/:industry`, `/name/:name`) currently show only a static `StylePreview` or a static hero — visitors must click "Open in Editor" and wait for the SPA fallback page (`/editor/:data`) to load Three.js before they can interact.

Embedding the editor directly on the detail page (a) eliminates the round-trip, (b) reduces the gap between "what the user sees on the page" and "what the user gets in the editor", and (c) makes every detail page a hands-on tool instead of a brochure. The CLAUDE.md "Follow-up Priorities" already calls this out as a quality fix: *"继续优化模板 preset，让编辑器默认背景和模板卡片展示更接近"* — embedding the editor is a structural step toward that goal.

The existing `EditorSurface` component is purpose-built for this kind of embedding and is the smallest viable unit of the full editor (preview + tabbed controls, no FAQ/related-styles chrome).

## Goals

1. Embed `EditorSurface` below the hero on every detail page in all 6 route groups, hydrated with the current page's preset.
2. Keep the hero's "Open in Editor" CTA unchanged (still navigates to `/editor/:data` for the full-screen experience).
3. Keep the existing `StylePreview` static card in the `/styles/:slug` hero unchanged.
4. Add no new indexable URLs, no new prerender paths, no sitemap changes.
5. Locale, Theme, and existing i18n/SEO infrastructure are unaffected.

## Non-goals

- No list-page embedding (`/styles`, `/fonts`, `/logo`, `/holiday`, `/industry`) — explicitly excluded by the user in scoping.
- No lazy mount / `IntersectionObserver` / dynamic import — eagerly rendered, matching the current `/editor` page behavior.
- No changes to preset data (no new fields on `stylePresets`, `fontPresets`, etc.).
- No changes to the `EditorSurface` internals.
- No automated tests (per CLAUDE.md, no test suite).

## Affected files

| File | Action |
|---|---|
| `app/components/editor/TemplateEditorSection.tsx` | **New** — wrapper around `EditorSurface` |
| `app/routes/styles-id.tsx` | Modify — render `<TemplateEditorSection>` after hero |
| `app/routes/fonts-id.tsx` | Modify — same |
| `app/routes/logo-id.tsx` | Modify — same |
| `app/routes/holiday-id.tsx` | Modify — same |
| `app/routes/industry-id.tsx` | Modify — same |
| `app/routes/name-id.tsx` | Modify — same, with fallback preset |
| `app/lib/presets/name-presets.ts` | Modify — add `getNamePagePreset(namePreset)` helper |
| `dictionary/en.json` | Modify — add `TemplateEditorSection` namespace |
| `dictionary/zh.json` | Modify — add `TemplateEditorSection` namespace |

Total: **1 new file, 8 modified files, 0 deleted files.**

## Architecture

```
Detail page (e.g. styles-id.tsx)
  └── <Hero>          (unchanged: title, description, badge, CTA, StylePreview)
  └── <Summary>       (unchanged on /styles; on others it's the small summary block)
  └── <TemplateEditorSection preset={...}>
        └── <Section>     (bg-gray-50 / dark variant, id="try-it-in-the-editor")
        │     └── <Container size="4" px="4">
        │           ├── <Heading as="h2" size="7">  "Try it in the editor"
        │           ├── <Text>                    subtitle from i18n
        │           └── <EditorSurface>          (existing component, untouched)
        │                 ├── <PreviewToolbar>   (Three.js + transparent PNG export)
        │                 └── <Tabs>             (Text / Background / Effects)
        └── </Section>
  └── <RelatedStyles>  (unchanged on /styles; not present on others)
  └── <JsonLd>         (unchanged)
```

`TemplateEditorSection` is a thin wrapper. It owns:
- Section/Container layout and dark-mode background
- The i18n-driven title and subtitle
- The `aria-labelledby` association between heading and section
- The `if (!preset) return null` short-circuit

It does **not** own:
- EditorSurface internals (TextSetting, BackgroundSelector, Effects, PreviewToolbar, ThreeTools are untouched)
- CTA navigation (Hero's "Open in Editor" is independent)
- Style/data extraction (each page computes its own preset before passing in)

## Component API

```tsx
// app/components/editor/TemplateEditorSection.tsx
import { Section, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { EditorSurface } from "./EditorSurface";
import { useTranslations } from "@/lib/i18n/use-translations";
import type { ShareObj } from "@/lib/share-data";

type Size = "compact" | "regular";

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

### API decisions

- **`Section` background `bg-gray-50 dark:bg-gray-900`**: matches the existing related-styles section on `/styles/:slug` for visual consistency.
- **`Container size="4"`** (Radix `768px`-ish): the editor preview itself scales via its own layout, so the surrounding container can be moderate width without cramping the controls.
- **`compactLayout`** is plumbed through to `EditorSurface` for future use (e.g. `/name/:name` could opt into a tighter layout). Not enabled in this spec — every page uses `regular` (the default).
- **`sectionId` default + heading id**: allows Hero CTAs to anchor-link to `#try-it-in-the-editor` in a future iteration. Out of scope for this spec; the anchor infrastructure is in place but no caller uses it yet.
- **`if (!preset) return null`**: silent fail. No error UI, no log. Matches the Hero's existing fallback when `getStylePreset` returns undefined.

## Per-route preset extraction

Each detail page computes its `ShareObj` from existing preset data — no new data fields, no new files in `app/lib/presets/*` except the one helper for names.

| Route | Preset expression | Data source |
|---|---|---|
| `/styles/:slug` | `style.editorPreset` | `stylePresets[].editorPreset` (existing) |
| `/fonts/:slug` | `getStylePreset(theme.styleSlugs[0])?.editorPreset` | `fontPresets[].styleSlugs[0]` → `stylePresets[]` |
| `/logo/:scene` | `getStylePreset(scene.styleSlugs[0])?.editorPreset` | `scenePresets[].styleSlugs[0]` → `stylePresets[]` |
| `/holiday/:holiday` | `getStylePreset(preset.styleSlugs[0])?.editorPreset` | `holidayPresets[].styleSlugs[0]` → `stylePresets[]` |
| `/industry/:industry` | `getStylePreset(preset.styleSlugs[0])?.editorPreset` | `industryPresets[].styleSlugs[0]` → `stylePresets[]` |
| `/name/:name` | `getNamePagePreset(namePreset)` | New helper — see below |

### `/name/:name` fallback helper

```ts
// app/lib/presets/name-presets.ts (new export)
import { stylePresets } from "./style-presets";
import type { ShareObj } from "../share-data";

export function getNamePagePreset(namePreset: NamePreset): ShareObj {
  // stylePresets[0] is "chrome" — a neutral, recognizable visual anchor.
  // The name text is overwritten so the editor opens with the user's name.
  const anchor = stylePresets[0];
  return {
    ...anchor.editorPreset,
    text: {
      ...anchor.editorPreset.text,
      text: namePreset.name,
    },
  };
}
```

- Hardcodes `stylePresets[0]` (chrome) as the fallback — no new style data.
- Spreads `editorPreset` so the bg/effect/templateSlug are inherited as-is.
- Only `text.text` is overridden to the name itself.
- If a future name needs a custom style, adding a `styleSlug?: string` field to `NamePreset` is a non-breaking follow-up.

## SSR / hydration safety

- `ssr: false` mode means loader data isn't accessible from `meta()`. The preset is computed synchronously in the component body using pure `getStylePreset`-style helpers — no `useEffect`, no client-only state.
- The detail pages are prerendered at build time. The preset is fixed into the HTML at that point. On client hydration, `useState` in `FullEditor` re-initializes with the same `preset.text` / `preset.bg` / `preset.effect` from props → no hydration mismatch.
- The only client-only path inside `EditorSurface` is the Three.js canvas (`PreviewToolbar` → `ThreeTools.ts`); it already handles SSR via its own initialization.

## i18n

Add to both `dictionary/en.json` and `dictionary/zh.json`:

```json
"TemplateEditorSection": {
  "defaultTitle": "Try it in the editor",
  "defaultSubtitle": "Customize the text, colors, and effects below, then export your design as a transparent PNG."
}
```

```json
"TemplateEditorSection": {
  "defaultTitle": "在编辑器中试试",
  "defaultSubtitle": "在下方调整文字、颜色和效果，然后把设计导出为带透明背景的 PNG。"
}
```

**Key discipline** (per CLAUDE.md): keys must exist in BOTH `en.json` and `zh.json` before the component references them. The fallback `ns?.[key] ?? key` returns the key literal as a string when missing — a missing key would render the words "defaultTitle" on the page. Verify with:

```bash
grep -E '"TemplateEditorSection"' dictionary/en.json dictionary/zh.json
grep -E '"defaultTitle"|"defaultSubtitle"' dictionary/en.json dictionary/zh.json
```

## Error handling

| Failure | Behavior |
|---|---|
| `getStylePreset(theme.styleSlugs[0])` returns `undefined` (data drift) | `TemplateEditorSection` receives `undefined` → returns `null` → section doesn't render. No error UI, no throw. |
| `ShareObj` is malformed | EditorSurface's existing `normalizeEffect` and default-value initialization handle this; no extra guard needed. |
| `dictionary/{en,zh}.json` missing a key | `useTranslations` fallback returns the key literal — visual regression (key shows as text). Mitigated by the grep verification above. |
| `EditorSurface` runtime error (e.g. Three.js failure) | Bubbles to root error boundary — same as today's `/editor` page. Out of scope. |

## Verification

After implementation:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

`pnpm build` will regenerate the 131 prerendered detail-page HTML files. Verify the build doesn't fail and the resulting HTML contains the `TemplateEditorSection` strings (e.g. `Try it in the editor`).

Then `pnpm dev` and manually test:

| URL | Expected |
|---|---|
| `/styles/barbie-pink` | Section below hero shows barbie-pink preset preview, "Open in Editor" button still works |
| `/fonts/bubble` | Section shows bubble-letters style preset (font theme's `styleSlugs[0]`) |
| `/logo/gaming-logo` | Section shows scene's `styleSlugs[0]` style preset |
| `/holiday/christmas` | Section shows holiday's `styleSlugs[0]` style preset |
| `/industry/gaming` | Section shows industry's `styleSlugs[0]` style preset |
| `/name/Aiden` | Section shows chrome-style preset with text "Aiden" |
| `/zh/styles/barbie-pink` | Section title and subtitle in Chinese |
| Theme toggle (light → dark) | `bg-gray-50` → `bg-gray-900` switches correctly |
| Edit a parameter in the embedded editor (e.g. text color) | Updates preview live, persists within the section, resets on page reload |
| Click "Open in Editor" in hero | Navigates to `/editor/:data` (unchanged) |

## Risk and trade-offs

- **Bundle size**: `EditorSurface` pulls in the full editor dependency tree (`TextSetting`, `BackgroundSelector`, `Effects`, `PreviewToolbar`, `ThreeTools.ts` with Three.js). All 131 detail pages will gain this in their client bundle. This is the explicit non-goal of lazy loading — accepted for implementation simplicity. If a future performance audit flags it, the same `TemplateEditorSection` API can host a `React.lazy` / `IntersectionObserver` mount without touching the call sites.
- **Static HTML size**: each prerendered detail page grows by roughly the editor's rendered skeleton. Build output is larger but still well within Cloudflare's static asset limits. No functional impact on `/editor` page (it has its own copy of the same component tree).
- **No anchor links yet**: the `sectionId` infrastructure is in place but no caller scrolls to it. Acceptable — callers can opt in later without API change.

## Out of scope (explicit)

- List pages (`/styles`, `/fonts`, `/logo`, `/holiday`, `/industry`)
- Lazy mount / dynamic import / IntersectionObserver
- Changes to `EditorSurface` internals
- Changes to preset data files (stylePresets, fontPresets, etc.) — except the one new helper export
- Anchor links from Hero "Open in Editor" to the embedded section (infrastructure only)
- New prerender URLs / sitemap entries
- Automated tests
- Changes to the `/editor` SPA routes
- Changes to the Hero "Open in Editor" CTA behavior
