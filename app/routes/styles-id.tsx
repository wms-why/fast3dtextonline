// /styles/:slug — style detail page (hero + preview + related + JsonLd).
import { Badge, Box, Button, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import {
  getContrastTextColor,
  getLocalizedStyle,
  getRelatedStyles,
  getStylePreset,
} from "@/lib/presets/style-presets";
import { getEditorPath } from "@/lib/share-data";
import { LocaleLink } from "@/lib/i18n/navigation";
import { StylePreview } from "@/components/styles/StylePreviewCard";
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateProductJsonLd } from "@/lib/seo/product";
import { buildSeoMeta } from "@/lib/seo/meta";
import { getStyleOgImage } from "@/lib/seo/ogImage";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/styles-id";

export function meta({ params, location }: Route.MetaArgs) {
  const slug = params.slug ?? "";
  const style = getStylePreset(slug);
  if (!style) return [{ title: "Style not found" }, { name: "robots", content: "noindex, follow" }];
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const copy = getLocalizedStyle(style, locale);
  return buildSeoMeta({
    title: copy.title,
    description: copy.description,
    keywords: style.keywords,
    ogImage: getStyleOgImage(style.slug),
    locale,
    pathname: location.pathname,
  });
}

export default function StyleDetailPage({ params }: Route.ComponentProps) {
  const slug = params.slug ?? "";
  const style = getStylePreset(slug);
  const locale = useLocale();
  const t = useTranslations("StylePage");

  if (!style) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <Heading as="h1" size="6">
          {t("notFound")}
        </Heading>
        <LocaleLink to="/styles" className="mt-4 inline-block text-violet-600">
          ← {t("backToList")}
        </LocaleLink>
      </div>
    );
  }

  const copy = getLocalizedStyle(style, locale);
  const related = getRelatedStyles(style);
  const editorHref = getEditorPath(style.editorPreset, locale);
  const solidButtonText = getContrastTextColor(style.visual.foreground);
  const softButtonText = getContrastTextColor(
    style.visual.panelBackground,
    "#111111",
    style.visual.foreground,
  );

  return (
    <Flex direction="column">
      <Section
        py="8"
        style={{ background: style.visual.background, color: style.visual.foreground }}
      >
        <Box px="5" className="mx-auto w-full max-w-[1080px]">
          <Grid columns={{ initial: "1", md: "2" }} gap="7" align="center">
            <Flex direction="column" gap="4">
              <Badge
                radius="full"
                size="2"
                style={{
                  width: "fit-content",
                  backgroundColor: style.visual.panelBackground,
                  color: softButtonText,
                  border: `1px solid ${style.visual.panelBorder}`,
                }}
              >
                {style.badge}
              </Badge>
              <Heading as="h1" size="9">
                {copy.title}
              </Heading>
              <Text size="5" style={{ maxWidth: 620 }}>
                {copy.description}
              </Text>
              <Flex gap="3" wrap="wrap">
                <Button
                  asChild
                  radius="full"
                  size="3"
                  style={{
                    backgroundColor: style.visual.foreground,
                    color: solidButtonText,
                  }}
                >
                  <a href={editorHref}>{t("openInEditor")}</a>
                </Button>
                <Button asChild radius="full" size="3" variant="soft">
                  <LocaleLink to="/styles">{t("backToList")}</LocaleLink>
                </Button>
              </Flex>
              <Flex gap="2" wrap="wrap">
                {style.keywords.slice(0, 6).map((kw) => (
                  <Badge key={kw} radius="full" variant="soft">
                    {kw}
                  </Badge>
                ))}
              </Flex>
            </Flex>
            <Box>
              <StylePreview style={style} locale={locale} size="lg" />
            </Box>
          </Grid>
        </Box>
      </Section>

      <TemplateEditorSection preset={style.editorPreset} />

      <Section className="w-full py-12">
        <Box className="mx-auto w-full max-w-[1080px] px-6">
          <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <Heading as="h2" size="5" mb="2">
                {t("summaryHeading")}
              </Heading>
              <Text color="gray">{copy.summary}</Text>
            </Box>
            <Box className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
              <Heading as="h2" size="5" mb="2">
                {t("bestForHeading")}
              </Heading>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                {copy.useCases.map((uc) => (
                  <li key={uc}>{uc}</li>
                ))}
              </ul>
            </Box>
          </Grid>
        </Box>
      </Section>

      {related.length > 0 && (
        <Section className="w-full bg-gray-50 py-12 dark:bg-gray-900">
          <Box className="mx-auto w-full max-w-[1240px] px-6">
            <Heading as="h2" size="7" mb="4" className="text-center">
              {t("relatedHeading")}
            </Heading>
            <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="4">
              {related.slice(0, 6).map((r) => {
                const rCopy = getLocalizedStyle(r, locale);
                return (
                  <LocaleLink
                    key={r.slug}
                    to={`/styles/${r.slug}`}
                    className="block rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
                  >
                    <Text size="4" weight="bold">
                      {rCopy.title}
                    </Text>
                    <Text size="2" color="gray" className="block">
                      {rCopy.summary}
                    </Text>
                  </LocaleLink>
                );
              })}
            </Grid>
          </Box>
        </Section>
      )}

      <JsonLd data={generateProductJsonLd(style, locale)} />
    </Flex>
  );
}
