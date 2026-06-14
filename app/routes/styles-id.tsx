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
import { LocaleLink } from "@/lib/i18n/navigation";
import { StylePreview } from "@/components/styles/StylePreviewCard";
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateProductJsonLd } from "@/lib/seo/product";
import { buildSeoMeta } from "@/lib/seo/meta";
import { getStyleOgImage } from "@/lib/seo/ogImage";
import { FadeUp } from "@/components/animations/FadeUp";
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
        <LocaleLink to="/styles" className="mt-4 inline-block text-brand-500">
          ← {t("backToList")}
        </LocaleLink>
      </div>
    );
  }

  const copy = getLocalizedStyle(style, locale);
  const related = getRelatedStyles(style);
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

      <Section className="w-full py-16">
        <FadeUp>
          <Box className="mx-auto w-full max-w-[1080px] px-6">
            <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box className="rounded-[var(--radius-card)] border border-border-subtle bg-surface-1 p-6 shadow-[var(--shadow-sm)]">
              <Heading as="h2" size="5" mb="2">
                {t("summaryHeading")}
              </Heading>
              <Text color="gray">{copy.summary}</Text>
            </Box>
            <Box className="rounded-[var(--radius-card)] border border-border-subtle bg-surface-1 p-6 shadow-[var(--shadow-sm)]">
              <Heading as="h2" size="5" mb="2">
                {t("bestForHeading")}
              </Heading>
              <ul className="list-disc pl-5 text-text-2">
                {copy.useCases.map((uc) => (
                  <li key={uc}>{uc}</li>
                ))}
              </ul>
            </Box>
          </Grid>
          </Box>
        </FadeUp>
      </Section>

      {related.length > 0 && (
        <Section className="w-full bg-surface-1 py-16">
          <FadeUp>
            <Box className="mx-auto w-full max-w-[1240px] px-6">
            <Heading as="h2" size="7" mb="4" className="text-center">
              {t("relatedHeading")}
            </Heading>
            <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="5">
              {related.slice(0, 6).map((r) => {
                const rCopy = getLocalizedStyle(r, locale);
                return (
                  <LocaleLink
                    key={r.slug}
                    to={`/styles/${r.slug}`}
                    className="group block overflow-hidden rounded-[var(--radius-card)] border border-border-subtle bg-surface-1 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[var(--shadow-md)]"
                  >
                    <div className="overflow-hidden">
                      <StylePreview style={r} locale={locale} size="sm" />
                    </div>
                    <div className="space-y-1 p-4">
                      <Text
                        size="3"
                        weight="bold"
                        className="block transition-colors group-hover:text-brand-500"
                      >
                        {rCopy.title}
                      </Text>
                      <Text size="2" color="gray" className="block line-clamp-2">
                        {rCopy.summary}
                      </Text>
                    </div>
                  </LocaleLink>
                );
              })}
            </Grid>
            </Box>
          </FadeUp>
        </Section>
      )}

      <JsonLd data={generateProductJsonLd(style, locale)} />
    </Flex>
  );
}
