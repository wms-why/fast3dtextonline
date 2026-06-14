// /name/:name — name detail page (no list page; per-locale filter in
// the route layer).
import { Box, Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { getNamePreset, getNamePagePreset, namePresets } from "@/lib/presets/name-presets";
import { getStylePreset, getLocalizedStyle } from "@/lib/presets/style-presets";
import { getEditorPath } from "@/lib/share-data";
import { LocaleLink } from "@/lib/i18n/navigation";
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateCreativeWorkJsonLd } from "@/lib/seo/product";
import { buildSeoMeta } from "@/lib/seo/meta";
import { getHost } from "@/lib/host";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/name-id";

export function meta({ params, location }: Route.MetaArgs) {
  const name = params.name ?? "";
  const preset = namePresets.find(
    (n) => n.name.toLowerCase() === name.toLowerCase(),
  );
  if (!preset) return [{ title: "Name not found" }, { name: "robots", content: "noindex, follow" }];
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  return buildSeoMeta({
    title: `${preset.displayText} — 3D Text`,
    description: `Generate a 3D ${preset.displayText} text effect with transparent PNG export.`,
    keywords: preset.keywords,
    ogImage: "/og-image.png",
    locale,
    pathname: location.pathname,
  });
}

export default function NameDetailPage({ params }: Route.ComponentProps) {
  const name = params.name ?? "";
  const locale = useLocale();
  const preset = getNamePreset(name, locale);
  const t = useTranslations("NamePage");
  const host = getHost();

  if (!preset) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <Heading as="h1" size="6">
          {t("notFound")}
        </Heading>
        <LocaleLink to="/" className="mt-4 inline-block text-brand-500">
          ← {t("backToHome")}
        </LocaleLink>
      </div>
    );
  }

  const primary = preset.styleSlugs[0] ? getStylePreset(preset.styleSlugs[0]) : undefined;
  const primaryCopy = primary ? getLocalizedStyle(primary, locale) : null;
  const editorHref = primary
    ? getEditorPath(primary.editorPreset, locale)
    : `/${locale}/editor`;
  const editorSectionPreset = getNamePagePreset(preset);

  return (
    <Flex direction="column">
      <Section className="w-full bg-gradient-to-b from-sky-50 to-white py-12 dark:from-sky-950/30 dark:to-gray-950">
        <Box className="mx-auto w-full max-w-[1080px] px-6 text-center">
          <Heading as="h1" size="9" className="mb-4">
            {preset.displayText}
          </Heading>
          <Text size="6" color="gray" className="mx-auto mb-6 block max-w-[760px]">
            Generate a 3D <strong>{preset.displayText}</strong> text effect with transparent PNG export.
          </Text>
          <Flex gap="3" justify="center" wrap="wrap">
            <Button asChild radius="full" size="4">
              <a href={editorHref}>{t("openInEditor")}</a>
            </Button>
            <Button asChild radius="full" size="4" variant="soft">
              <LocaleLink to="/">{t("backToHome")}</LocaleLink>
            </Button>
          </Flex>
          {primaryCopy && (
            <Text className="mt-6 block text-sm text-gray-500">
              {t("primaryStyleLabel")}: <strong>{primaryCopy.title}</strong>
            </Text>
          )}
        </Box>
      </Section>

      <TemplateEditorSection preset={editorSectionPreset} />

      <JsonLd
        data={generateCreativeWorkJsonLd({
          name: `${preset.displayText} 3D Text`,
          description: `3D text effect for ${preset.displayText}, transparent PNG export.`,
          url: `${host}/${locale}/name/${preset.name}`,
          keywords: preset.keywords,
          category: "3D Name Effect",
        })}
      />
    </Flex>
  );
}
