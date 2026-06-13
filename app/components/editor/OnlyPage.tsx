import type { BackgroundProp } from "../common/BackgroundSelector";
import type { TextProp } from "../common/TextSetting";
import { StylePreview } from "../styles/StylePreviewCard";
import { getEditorPath } from "@/lib/share-data";
import { getLocalizedStyle } from "@/lib/presets/style-presets";
import type { StylePreset } from "@/lib/presets/style-presets";
import { Badge, Box, Button, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { HelpCircle } from "lucide-react";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import type { EffectProp } from "../common/Effects";
import { EditorSurface } from "./EditorSurface";

export function OnlyPage({ textProp, backgroundProp, effectProp, currentStyle, relatedStyles }: {
  textProp: TextProp | undefined;
  backgroundProp: BackgroundProp | undefined;
  effectProp: EffectProp | undefined;
  currentStyle?: StylePreset;
  relatedStyles: StylePreset[];
}) {
  const t = useTranslations('TextEditor');
  const locale = useLocale();
  const styleCopy = currentStyle ? getLocalizedStyle(currentStyle, locale as "en" | "zh") : undefined;

  return <Flex direction={"column"} gap={"4"}>
    <Container px="4" pt="6">
      <Flex
        direction={{ initial: "column", md: "row" }}
        justify="between"
        align={{ initial: "start", md: "center" }}
        gap="4"
      >
        <Flex direction="column" gap="2">
          <Flex align="center" gap="3" wrap="wrap">
            <Heading as="h1" size="8">
              {t('title')}
            </Heading>
            {currentStyle && (
              <Badge radius="full" size="2">
                {t("fromTemplateBadge")}
              </Badge>
            )}
          </Flex>
          <Text color="gray">{t("editorIntro")}</Text>
        </Flex>
        <Flex gap="3" wrap="wrap">
          {currentStyle && (
            <Button asChild radius="full">
              <a href={`/${locale}/styles/${currentStyle.slug}`}>{t("viewTemplateDetail")}</a>
            </Button>
          )}
          <Button asChild radius="full" variant="soft">
            <a href={`/${locale}/styles`}>{t("browseTemplates")}</a>
          </Button>
        </Flex>
      </Flex>
    </Container>
    {currentStyle && styleCopy && (
      <Container px="4">
        <Card size="3" style={{ borderRadius: 28 }}>
          <Flex direction={{ initial: "column", md: "row" }} gap="5" align="stretch">
            <Box style={{ flex: "0 0 320px" }}>
              <StylePreview style={currentStyle} locale={locale as "en" | "zh"} size="md" />
            </Box>
            <Flex direction="column" gap="3" style={{ flex: 1 }}>
              <Flex gap="3" align="center" wrap="wrap">
                <Badge radius="full" variant="soft">{currentStyle.badge}</Badge>
                <Text size="2" color="gray">{currentStyle.keywords[0]}</Text>
              </Flex>
              <Heading as="h2" size="6">{styleCopy.title}</Heading>
              <Text color="gray">{styleCopy.summary}</Text>
              <Flex gap="2" wrap="wrap">
                {styleCopy.useCases.map((item) => (
                  <Badge key={item} radius="full" color="gray">{item}</Badge>
                ))}
              </Flex>
              {relatedStyles.length > 0 && (
                <Flex direction="column" gap="2" pt="2">
                  <Text size="2" weight="medium">{t("switchTemplateTitle")}</Text>
                  <Flex gap="2" wrap="wrap">
                    {relatedStyles.map((style) => (
                      <Button key={style.slug} asChild radius="full" variant="soft" size="2">
                        <a href={getEditorPath(style.editorPreset, locale)}>
                          {getLocalizedStyle(style, locale as "en" | "zh").title}
                        </a>
                      </Button>
                    ))}
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Card>
      </Container>
    )}
    <Container p="4">
      <EditorSurface
        textProp={textProp}
        backgroundProp={backgroundProp}
        effectProp={effectProp}
        templateSlug={currentStyle?.slug}
      />
    </Container>
    <Container p="4">
      <Heading as="h2" weight="bold" className="text-center" mb="4">{t('faqTitle')}</Heading>
      <Flex direction="column" gap="3">
        <Card variant="surface">
          <Flex gap="3" align="center">
            <HelpCircle className="text-gray-11" size={16} />
            <Text size="3" weight="bold">{t('faqQuestion1')}</Text>
          </Flex>
          <Box pt="3" pl="6">
            <Text size="2" color="gray">{t('faqAnswer1')}</Text>
          </Box>
        </Card>
      </Flex>
    </Container>
  </Flex>;
}
