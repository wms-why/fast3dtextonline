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
