// /logo/:scene — logo scene detail page.
import { Box, Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { getScene, getLocalizedScene } from "@/lib/presets/scene-presets";
import { getStylePreset, getLocalizedStyle } from "@/lib/presets/style-presets";
import { getEditorPath } from "@/lib/share-data";
import { LocaleLink } from "@/lib/i18n/navigation";
import { TemplateEditorSection } from "@/components/editor/TemplateEditorSection";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateCreativeWorkJsonLd } from "@/lib/seo/product";
import { buildSeoMeta } from "@/lib/seo/meta";
import { getHost } from "@/lib/host";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/logo-id";

export function meta({ params, location }: Route.MetaArgs) {
  const slug = params.scene ?? "";
  const scene = getScene(slug);
  if (!scene) return [{ title: "Scene not found" }, { name: "robots", content: "noindex, follow" }];
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const copy = getLocalizedScene(scene, locale);
  return buildSeoMeta({
    title: copy.title,
    description: copy.description,
    keywords: scene.keywords,
    ogImage: "/og-image.png",
    locale,
    pathname: location.pathname,
  });
}

export default function LogoSceneDetailPage({ params }: Route.ComponentProps) {
  const slug = params.scene ?? "";
  const scene = getScene(slug);
  const locale = useLocale();
  const t = useTranslations("ScenePage");
  const host = getHost();

  if (!scene) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <Heading as="h1" size="6">
          {t("notFound")}
        </Heading>
        <LocaleLink to="/logo" className="mt-4 inline-block text-brand-500">
          ← {t("backToList")}
        </LocaleLink>
      </div>
    );
  }

  const copy = getLocalizedScene(scene, locale);
  const primary = scene.styleSlugs[0] ? getStylePreset(scene.styleSlugs[0]) : undefined;
  const primaryCopy = primary ? getLocalizedStyle(primary, locale) : null;
  const editorHref = primary
    ? getEditorPath(primary.editorPreset, locale)
    : `/${locale}/editor`;

  return (
    <Flex direction="column">
      <Section className="w-full bg-gradient-to-b from-pink-50 to-white py-12 dark:from-pink-950/30 dark:to-gray-950">
        <Box className="mx-auto w-full max-w-[1080px] px-6">
          <Heading as="h1" size="9" className="mb-4 text-center">
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
              <LocaleLink to="/logo">{t("backToList")}</LocaleLink>
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
          url: `${host}/${locale}/logo/${scene.slug}`,
          keywords: scene.keywords,
          category: "3D Logo Scene",
        })}
      />
    </Flex>
  );
}
