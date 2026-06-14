// Style preview card. Ported from src/components/styles/StylePreviewCard.tsx
// with all `next/*` imports dropped and the `getEditorPath` import moved
// to the in-house `share-data` module. The two exports are:
//   - StylePreview: pure visual preview, no links (used by detail pages)
//   - StylePreviewCard (default): preview + title + 2 CTAs (used by lists)

import { Badge, Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { getEditorPath } from "@/lib/share-data";
import { getLocalizedStyle, type StylePreset } from "@/lib/presets/style-presets";
import { LocaleLink } from "@/lib/i18n/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";

type Size = "sm" | "md" | "lg";

export function StylePreview({
  style,
  locale,
  size = "md",
}: {
  style: StylePreset;
  locale: Locale;
  size?: Size;
}) {
  const textSize =
    size === "lg"
      ? "clamp(2.8rem, 5vw, 4.8rem)"
      : size === "sm"
        ? "1.8rem"
        : "2.3rem";
  const content = getLocalizedStyle(style, locale);
  const ariaLabel = `${content.title} 3D text example — ${style.keywords.slice(0, 2).join(", ")}, transparent background PNG`;

  return (
    <Flex
      direction="column"
      justify="between"
      role="img"
      aria-label={ariaLabel}
      className="relative overflow-hidden"
      style={{
        minHeight: size === "lg" ? 320 : size === "sm" ? 180 : 220,
        borderRadius: "var(--radius-card-sm)",
        background: style.visual.background,
        border: `1px solid ${style.visual.panelBorder}`,
        boxShadow: "var(--shadow-xl)",
      }}
    >
      <Box
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 28%, rgba(0,0,0,0.08) 100%)",
        }}
      />
      <Flex
        justify="between"
        align="start"
        p="4"
        className="relative"
      >
        <Badge
          radius="full"
          size="2"
          style={{
            color: style.visual.accent,
            backgroundColor: "rgba(255,255,255,0.78)",
            border: `1px solid ${style.visual.panelBorder}`,
          }}
        >
          {style.badge}
        </Badge>
        <Text
          size="1"
          style={{
            padding: "0.3rem 0.55rem",
            borderRadius: 999,
            backgroundColor: style.visual.panelBackground,
            color: "rgba(255,255,255,0.82)",
            border: `1px solid ${style.visual.panelBorder}`,
          }}
        >
          {style.keywords[0]}
        </Text>
      </Flex>
      <Flex
        align="center"
        justify="center"
        px="4"
        pb="5"
        className="relative flex-1"
      >
        <Text
          align="center"
          style={{
            fontFamily: style.visual.fontFamily,
            fontSize: textSize,
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            backgroundImage: style.visual.textGradient,
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: style.visual.textShadow,
            WebkitTextStroke: style.visual.textStroke ?? "transparent",
            transform: style.visual.rotation ?? "none",
          }}
        >
          {style.previewText}
        </Text>
      </Flex>
    </Flex>
  );
}

export default function StylePreviewCard({
  style,
  locale,
  mode = "grid",
  openLabel,
  detailLabel,
}: {
  style: StylePreset;
  locale: Locale;
  mode?: "grid" | "feature";
  openLabel?: string;
  detailLabel: string;
}) {
  const content = getLocalizedStyle(style, locale);
  const editorHref = openLabel ? getEditorPath(style.editorPreset, locale) : null;
  const detailHref = `/styles/${style.slug}`; // LocaleLink will prefix /zh
  const altText = `${content.title} — ${style.keywords.slice(0, 2).join(", ")} 3D text generator, transparent background PNG`;

  return (
    <Card
      size="3"
      className={cn("h-full")}
      style={{
        borderRadius: "var(--radius-card)",
        backgroundColor: "var(--gray-1)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <Flex direction="column" gap="4" height="100%">
        <StylePreview style={style} locale={locale} size={mode === "feature" ? "lg" : "md"} />
        <Flex direction="column" gap="2" px="1">
          <Flex justify="between" align="center" gap="3" wrap="wrap">
            <Heading as="h3" size={mode === "feature" ? "6" : "5"}>
              {content.title}
            </Heading>
            <Badge radius="full" color="gray">
              {content.useCases[0]}
            </Badge>
          </Flex>
          <Text color="gray" size="3">
            {content.summary}
          </Text>
        </Flex>
        <Flex gap="3" mt="auto" wrap="wrap">
          {editorHref && openLabel ? (
            <Button asChild radius="full" size="3">
              <a href={editorHref} aria-label={`${openLabel} — ${altText}`}>
                {openLabel}
              </a>
            </Button>
          ) : null}
          <Button asChild radius="full" size="3" variant="soft">
            <LocaleLink to={detailHref} aria-label={`${detailLabel} — ${altText}`}>
              {detailLabel}
            </LocaleLink>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
