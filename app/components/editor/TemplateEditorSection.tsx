import { Container, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { EditorSurface } from "./EditorSurface";
import { useTranslations } from "@/lib/i18n/use-translations";
import type { ShareObj } from "@/lib/share-data";

/**
 * Shared wrapper around EditorSurface used by every SEO detail page.
 * Owns the section layout, i18n heading/subtitle, and the silent
 * `if (!preset) return null` short-circuit. Does not touch
 * EditorSurface internals.
 *
 * Always renders the tabs-based control panel that matches `/editor` —
 * `compactLayout` defaults to `true` in `EditorSurface`, so each of
 * Text / Background / Effects lives behind a tab instead of stacking
 * vertically next to the preview canvas.
 */
export function TemplateEditorSection({
  preset,
  title,
  sectionId,
}: {
  preset: ShareObj | undefined;
  title?: string;
  sectionId?: string;
}) {
  const t = useTranslations("TemplateEditorSection");

  if (!preset) return null;

  const heading = title ?? t("defaultTitle");
  const subtitle = t("defaultSubtitle");
  const id = sectionId ?? "try-it-in-the-editor";

  return (
    <Section
      id={id}
      className="w-full bg-surface-1 py-12"
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
          />
        </Flex>
      </Container>
    </Section>
  );
}
