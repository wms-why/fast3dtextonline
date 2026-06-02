// /do-not-write-on-this-page — niche landing page (noindex).
// Mirrors src/app/[locale]/do-not-write-on-this-page/page.tsx with all
// next-intl and next/* imports replaced with the in-house equivalents.
import { Badge, Box, Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useTranslations } from "@/lib/i18n/use-translations";
import { EditorSurface } from "@/components/editor/EditorSurface";
import { TextProp } from "@/components/common/TextSetting";
import { JsonLd } from "@/lib/seo/JsonLd";
import { buildSeoMeta } from "@/lib/seo/meta";
import { generateWebAppJsonLd } from "@/lib/seo/webApp";
import { getHost } from "@/lib/host";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/niche";

export function meta({ location }: Route.MetaArgs) {
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  return [
    ...buildSeoMeta({
      title:
        locale === "zh"
          ? "在此页面上请勿书写"
          : "Do Not Write On This Page",
      description:
        locale === "zh"
          ? "这是一个趣味页面 —— 体验 3D 文字生成器,别真的写。"
          : "A fun page — play with the 3D text generator, but please don't actually write on it.",
      keywords: ["3D text", "do not write", "fun"],
      ogImage: "/og-image-do-not-write-on-this-page.png",
      locale,
      pathname: location.pathname,
      noindex: true,
    }),
  ];
}

export default function NichePage() {
  const t = useTranslations("DoNotWriteOnThisPage");
  const indexT = useTranslations("HomePage");
  const host = getHost();

  // Default text that the editor pre-fills. Same as the original
  // (locale-agnostic — the title of this niche page in English).
  const text = TextProp.default("Do Not Write On This Page");

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <main className="w-full flex-1">
        <Section
          py="8"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        >
          <Box className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <Heading as="h1" size="9" mb="4">
              {t("heroTitle")}
            </Heading>
            <Text size="6" className="mx-auto max-w-3xl">
              {t("heroSubtitle")}
            </Text>
          </Box>
        </Section>

        <Section py="6" id="designTool">
          <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading as="h2" size="8" mb="6" className="text-center">
              {t("toolTitle")}
            </Heading>
            <EditorSurface
              textProp={text}
              backgroundProp={undefined}
              effectProp={undefined}
              compactLayout={false}
            />
          </Box>
        </Section>

        <Section py="8" className="bg-gray-50 dark:bg-gray-900">
          <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading as="h2" size="8" mb="4" className="text-center">
              {indexT("featuresTitle")}
            </Heading>
            <Flex gap="6" direction={{ initial: "column", md: "row" }}>
              <Box className="flex-1 text-center">
                <Heading as="h3" size="5" mb="2">
                  {t("feature1Title")}
                </Heading>
                <Text color="gray">{t("feature1Desc")}</Text>
              </Box>
              <Box className="flex-1 text-center">
                <Heading as="h3" size="5" mb="2">
                  {t("feature2Title")}
                </Heading>
                <Text color="gray">{t("feature2Desc")}</Text>
              </Box>
              <Box className="flex-1 text-center">
                <Heading as="h3" size="5" mb="2">
                  {t("feature3Title")}
                </Heading>
                <Text color="gray">{t("feature3Desc")}</Text>
              </Box>
            </Flex>
          </Box>
        </Section>

        <Section py="8" className="text-center">
          <Heading as="h2" size="8" mb="4">
            {t("ctaTitle")}
          </Heading>
          <Text size="5" mb="4" className="block">
            {t("ctaSubtitle")}
          </Text>
          <Button asChild size="4" radius="full">
            <a
              href="#designTool"
              className="bg-black px-8 py-3 text-lg font-medium text-white"
            >
              {t("ctaButton")}
            </a>
          </Button>
        </Section>
      </main>

      {/* Generous web-app JSON-LD even on noindex pages, so crawlers
          that ignore robots still see the canonical product. */}
      <JsonLd data={generateWebAppJsonLd(host)} />
    </div>
  );
}
