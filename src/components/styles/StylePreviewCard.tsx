import { Box, Button, Card, Flex, Heading, Badge, Text } from "@radix-ui/themes";
import { getEditorPath } from "@/lib/utils";
import { getLocalizedStyle, type StylePreset } from "@/lib/style-presets";

type Locale = "en" | "zh";

export function StylePreview({
  style,
  locale,
  size = "md",
}: {
  style: StylePreset;
  locale: Locale;
  size?: "sm" | "md" | "lg";
}) {
  const textSize = size === "lg" ? "clamp(2.8rem, 5vw, 4.8rem)" : size === "sm" ? "1.8rem" : "2.3rem";

  return (
    <Flex
      direction="column"
      justify="between"
      style={{
        minHeight: size === "lg" ? 320 : size === "sm" ? 180 : 220,
        borderRadius: 24,
        background: style.visual.background,
        border: `1px solid ${style.visual.panelBorder}`,
        boxShadow: "0 28px 56px rgba(15, 23, 42, 0.16)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 28%, rgba(0,0,0,0.08) 100%)",
          pointerEvents: "none",
        }}
      />
      <Flex justify="between" align="start" p="4" style={{ position: "relative" }}>
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
        style={{
          position: "relative",
          flex: 1,
        }}
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
  openLabel: string;
  detailLabel: string;
}) {
  const content = getLocalizedStyle(style, locale);
  const editorHref = getEditorPath(style.editorPreset, locale);
  const detailHref = `/${locale}/styles/${style.slug}`;

  return (
    <Card
      size="3"
      style={{
        height: "100%",
        borderRadius: 28,
        backgroundColor: "var(--gray-1)",
        boxShadow: "0 22px 48px rgba(15, 23, 42, 0.08)",
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
          <Button asChild radius="full" size="3">
            <a href={editorHref}>{openLabel}</a>
          </Button>
          <Button asChild radius="full" size="3" variant="soft">
            <a href={detailHref}>{detailLabel}</a>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
