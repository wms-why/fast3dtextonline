// /industry/:industry — industry detail page.
import { Box, Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { getIndustry, getLocalizedIndustry } from "@/lib/presets/industry-presets";
import { getStylePreset, getLocalizedStyle } from "@/lib/presets/style-presets";
import { getEditorPath } from "@/lib/share-data";
import { LocaleLink } from "@/lib/i18n/navigation";
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateCreativeWorkJsonLd } from "@/lib/seo/product";
import { buildSeoMeta } from "@/lib/seo/meta";
import { getHost } from "@/lib/host";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/industry-id";

export function meta({ params, location }: Route.MetaArgs) {
  const slug = params.industry ?? "";
  const preset = getIndustry(slug);
  if (!preset) return [{ title: "Industry not found" }, { name: "robots", content: "noindex, follow" }];
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const copy = getLocalizedIndustry(preset, locale);
  return buildSeoMeta({
    title: copy.title,
    description: copy.description,
    keywords: preset.keywords,
    ogImage: "/og-image.png",
    locale,
    pathname: location.pathname,
  });
}

export default function IndustryDetailPage({ params }: Route.ComponentProps) {
  const slug = params.industry ?? "";
  const preset = getIndustry(slug);
  const locale = useLocale();
  const t = useTranslations("IndustryPage");
  const host = getHost();

  if (!preset) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <Heading as="h1" size="6">
          {t("notFound")}
        </Heading>
        <LocaleLink to="/industry" className="mt-4 inline-block text-violet-600">
          ← {t("backToList")}
        </LocaleLink>
      </div>
    );
  }

  const copy = getLocalizedIndustry(preset, locale);
  const primary = preset.styleSlugs[0] ? getStylePreset(preset.styleSlugs[0]) : undefined;
  const primaryCopy = primary ? getLocalizedStyle(primary, locale) : null;
  const editorHref = primary
    ? getEditorPath(primary.editorPreset, locale)
    : `/${locale}/editor`;

  return (
    <Flex direction="column">
      <Section className="w-full bg-gradient-to-b from-emerald-50 to-white py-12 dark:from-emerald-950/30 dark:to-gray-950">
        <Box className="mx-auto w-full max-w-[1080px] px-6 text-center">
          <Heading as="h1" size="9" className="mb-4">
            {copy.title}
          </Heading>
          <Text size="6" color="gray" className="mx-auto mb-6 block max-w-[760px]">
            {copy.description}
          </Text>
          <Flex gap="3" justify="center" wrap="wrap">
            <Button asChild radius="full" size="4">
              <a href={editorHref}>{t("openInEditor")}</a>
            </Button>
            <Button asChild radius="full" size="4" variant="soft">
              <LocaleLink to="/industry">{t("backToList")}</LocaleLink>
            </Button>
          </Flex>
        </Box>
      </Section>

      <TemplateEditorSection preset={primary?.editorPreset} />

      <Section className="w-full py-12">
        <Box className="mx-auto w-full max-w-[1080px] px-6">
          <Text color="gray" size="4">
            {copy.summary}
          </Text>
          {primaryCopy && (
            <Text className="mt-4 block text-sm text-gray-500">
              {t("primaryStyleLabel")}: <strong>{primaryCopy.title}</strong>
            </Text>
          )}
        </Box>
      </Section>

      <JsonLd
        data={generateCreativeWorkJsonLd({
          name: copy.title,
          description: copy.description,
          url: `${host}/${locale}/industry/${preset.slug}`,
          keywords: preset.keywords,
          category: "3D Industry Text",
        })}
      />
    </Flex>
  );
}
