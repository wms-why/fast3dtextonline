// /fonts/:slug — font theme detail page.
import { Box, Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { fontThemes, getFontTheme, getLocalizedFontTheme } from "@/lib/presets/font-presets";
import { getStylePreset, getLocalizedStyle } from "@/lib/presets/style-presets";
import { getEditorPath } from "@/lib/share-data";
import { LocaleLink } from "@/lib/i18n/navigation";
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateCreativeWorkJsonLd } from "@/lib/seo/product";
import { buildSeoMeta } from "@/lib/seo/meta";
import { getHost } from "@/lib/host";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/fonts-id";

export function meta({ params, location }: Route.MetaArgs) {
  const slug = params.slug ?? "";
  const theme = getFontTheme(slug);
  if (!theme) return [{ title: "Font theme not found" }, { name: "robots", content: "noindex, follow" }];
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const copy = getLocalizedFontTheme(theme, locale);
  return buildSeoMeta({
    title: copy.title,
    description: copy.description,
    keywords: theme.keywords,
    ogImage: "/og-image.png",
    locale,
    pathname: location.pathname,
  });
}

export default function FontThemeDetailPage({ params }: Route.ComponentProps) {
  const slug = params.slug ?? "";
  const theme = getFontTheme(slug);
  const locale = useLocale();
  const t = useTranslations("FontPage");
  const host = getHost();

  if (!theme) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <Heading as="h1" size="6">
          {t("notFound")}
        </Heading>
        <LocaleLink to="/fonts" className="mt-4 inline-block text-brand-500">
          ← {t("backToList")}
        </LocaleLink>
      </div>
    );
  }

  const copy = getLocalizedFontTheme(theme, locale);
  const primary = theme.styleSlugs[0] ? getStylePreset(theme.styleSlugs[0]) : undefined;
  const editorHref = primary
    ? getEditorPath(primary.editorPreset, locale)
    : `/${locale}/editor`;

  return (
    <Flex direction="column">
      <Section className="w-full bg-gradient-to-b from-brand-50 to-surface-0 py-12">
        <Box className="mx-auto w-full max-w-[1080px] px-6">
          <Heading
            as="h1"
            size="9"
            className="mb-4 text-center"
            style={{ fontFamily: theme.primaryFont }}
          >
            {copy.title}
          </Heading>
          <Text size="6" color="gray" className="mx-auto mb-6 block max-w-[760px] text-center">
            {copy.description}
          </Text>
          <Flex gap="3" justify="center" wrap="wrap">
            <Button asChild radius="full" size="4">
              <a href={editorHref}>{t("openInEditor")}</a>
            </Button>
            <Button asChild radius="full" size="4" variant="soft">
              <LocaleLink to="/fonts">{t("backToList")}</LocaleLink>
            </Button>
          </Flex>
        </Box>
      </Section>

      <TemplateEditorSection preset={primary?.editorPreset} />

      <Section className="w-full py-12">
        <Box className="mx-auto w-full max-w-[1080px] px-6">
          <Heading as="h2" size="7" mb="4">
            {t("summaryHeading")}
          </Heading>
          <Text color="gray" size="4">
            {copy.summary}
          </Text>
        </Box>
      </Section>

      <JsonLd
        data={generateCreativeWorkJsonLd({
          name: copy.title,
          description: copy.description,
          url: `${host}/${locale}/fonts/${theme.slug}`,
          keywords: theme.keywords,
          category: "3D Font Theme",
        })}
      />
    </Flex>
  );
}
