// Home page. The full marketing layout (hero + featured grid + features +
// use cases + CTA + FAQ). EditorSurface is intentionally omitted from the
// SSR path — the editor lives at /editor and is reached via the "Open
// Editor" CTA. Step 9 wires the editor route properly.

import { Badge, Box, Button, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes";
import { useTranslations } from "@/lib/i18n/use-translations";
import { useLocale } from "@/lib/i18n/use-locale";
import { featuredStyleSlugs, getStylePreset } from "@/lib/presets/style-presets";
import StylePreviewCard from "@/components/styles/StylePreviewCard";
import { LocaleLink } from "@/lib/i18n/navigation";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateFaqJsonLd } from "@/lib/seo/faq";
import { generateWebAppJsonLd } from "@/lib/seo/webApp";
import { getHost } from "@/lib/host";
import type { Route } from "./+types/home";
import type { Locale } from "@/lib/i18n/config";

export function meta({ location }: Route.MetaArgs) {
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  return [
    { title: locale === "zh" ? "3D 文字生成器" : "3D Text Generator" },
    {
      name: "description",
      content:
        locale === "zh"
          ? "免费在线 3D 文字生成器,支持透明 PNG 导出。"
          : "Free online 3D text generator with transparent PNG export.",
    },
  ];
}

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const host = getHost();
  const featuredStyles = featuredStyleSlugs
    .map((slug) => getStylePreset(slug))
    .filter((style): style is NonNullable<ReturnType<typeof getStylePreset>> => Boolean(style));

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* Hero */}
      <Section
        className="w-full"
        style={{
          background:
            "radial-gradient(circle at 10% 12%, rgba(255, 118, 181, 0.16), transparent 22%), radial-gradient(circle at 88% 14%, rgba(87, 220, 255, 0.16), transparent 24%), linear-gradient(180deg, rgba(250,250,252,1) 0%, rgba(246,247,251,1) 100%)",
        }}
      >
        <Flex justify="center" align="center" direction="column" gap="6" px="6" py="8">
          <Badge radius="full" size="2" color="gray">
            {t("heroBadge")}
          </Badge>
          <Heading as="h1" size="9" align="center" style={{ maxWidth: 980 }}>
            {t("heroTitle")}
          </Heading>
          <Box style={{ maxWidth: 760 }}>
            <Text size="6" align="center">
              {t("heroSubtitle")}
            </Text>
          </Box>
          <Flex gap="3" wrap="wrap" justify="center">
            <Button asChild radius="full" size="4">
              <a href="#templates">{t("getStarted")}</a>
            </Button>
            <Button asChild radius="full" size="4" variant="soft">
              <LocaleLink to="/editor">{t("openEditor")}</LocaleLink>
            </Button>
          </Flex>
          <Flex gap="3" wrap="wrap" justify="center">
            <Badge radius="full" variant="soft">
              {t("heroStat1")}
            </Badge>
            <Badge radius="full" variant="soft">
              {t("heroStat2")}
            </Badge>
            <Badge radius="full" variant="soft">
              {t("heroStat3")}
            </Badge>
          </Flex>
        </Flex>
      </Section>

      {/* Featured templates */}
      <Section className="w-full py-8" id="templates">
        <Flex direction="column" gap="6" px="6" mx="auto" style={{ maxWidth: 1240 }}>
          <Flex direction="column" gap="2" align="center" className="text-center">
            <Heading as="h2" size="8">
              {t("featuredTemplatesTitle")}
            </Heading>
            <Text size="5" color="gray" style={{ maxWidth: 760 }}>
              {t("featuredTemplatesSubtitle")}
            </Text>
          </Flex>
          <Grid columns={{ initial: "1", md: "2" }} gap="5">
            {featuredStyles.map((style) => (
              <StylePreviewCard
                key={style.slug}
                style={style}
                locale={locale}
                mode="feature"
                openLabel={t("openTemplate")}
                detailLabel={t("seeDetails")}
              />
            ))}
          </Grid>
          <Flex justify="center">
            <Button asChild radius="full" variant="soft" size="3">
              <LocaleLink to="/styles">{t("browseLibrary")}</LocaleLink>
            </Button>
          </Flex>
        </Flex>
      </Section>

      {/* Features */}
      <Section className="w-full bg-violet-50 py-16 dark:bg-violet-950/30">
        <Flex direction="column" justify="center" align="center" gap="6" p="6">
          <Heading as="h2" size="8" className="text-center text-3xl font-bold">
            {t("featuresTitle")}
          </Heading>
          <Grid
            columns={{ initial: "1", md: "3" }}
            gap="5"
            style={{ width: "100%", maxWidth: 1120 }}
          >
            <Box className="rounded-3xl border-l-4 border-orange-500 bg-white p-6 shadow-sm dark:bg-gray-950">
              <Heading as="h3" className="mb-3 text-xl font-bold">
                {t("feature1Title")}
              </Heading>
              <Text>{t("feature1Desc")}</Text>
            </Box>
            <Box className="rounded-3xl border-l-4 border-amber-500 bg-white p-6 shadow-sm dark:bg-gray-950">
              <Heading as="h3" className="mb-3 text-xl font-bold">
                {t("feature2Title")}
              </Heading>
              <Text>{t("feature2Desc")}</Text>
            </Box>
            <Box className="rounded-3xl border-l-4 border-yellow-500 bg-white p-6 shadow-sm dark:bg-gray-950">
              <Heading as="h3" className="mb-3 text-xl font-bold">
                {t("feature3Title")}
              </Heading>
              <Text>{t("feature3Desc")}</Text>
            </Box>
          </Grid>
        </Flex>
      </Section>

      {/* Use cases */}
      <Section className="w-full bg-gray-100 py-16 dark:bg-gray-900">
        <Flex direction="column" justify="center" align="center" gap="6" p="6">
          <Heading as="h2" size="8" className="mb-12 text-center text-3xl font-bold">
            {t("useCasesTitle")}
          </Heading>
          <Grid
            columns={{ initial: "1", md: "3" }}
            gap="5"
            style={{ width: "100%", maxWidth: 1120 }}
          >
            <Box className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <Heading as="h3" size="5" mb="2">
                {t("useCase1Title")}
              </Heading>
              <Text color="gray">{t("useCase1Desc")}</Text>
            </Box>
            <Box className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <Heading as="h3" size="5" mb="2">
                {t("useCase2Title")}
              </Heading>
              <Text color="gray">{t("useCase2Desc")}</Text>
            </Box>
            <Box className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <Heading as="h3" size="5" mb="2">
                {t("useCase3Title")}
              </Heading>
              <Text color="gray">{t("useCase3Desc")}</Text>
            </Box>
          </Grid>
        </Flex>
      </Section>

      {/* CTA */}
      <Section className="w-full bg-blue-600 py-16 text-white dark:bg-blue-700">
        <Flex direction="column" justify="center" align="center" gap="6" p="6">
          <Heading as="h2" size="8" className="mb-6 text-3xl font-bold">
            {t("ctaTitle")}
          </Heading>
          <Text size="5" className="mx-auto max-w-3xl text-center">
            {t("ctaSubtitle")}
          </Text>
          <Button asChild radius="full" size="4" variant="solid" color="gray">
            <LocaleLink to="/styles">{t("ctaButton")}</LocaleLink>
          </Button>
        </Flex>
      </Section>

      {/* FAQ */}
      <section className="w-full py-16">
        <Flex direction="column" justify="center" align="center" gap="6" p="6">
          <Heading as="h2" size="8" className="mb-12 text-center text-3xl font-bold">
            {t("faqTitle")}
          </Heading>
          <div className="mx-auto max-w-3xl space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b pb-4">
                <Heading as="h3" className="mb-2 text-xl font-bold">
                  {t(`faqQuestion${i}`)}
                </Heading>
                <p>{t(`faqAnswer${i}`)}</p>
              </div>
            ))}
          </div>
        </Flex>
      </section>

      {/* JSON-LD: FAQ + WebApplication */}
      <JsonLd
        data={generateFaqJsonLd([
          { q: t("faqQuestion1"), a: t("faqAnswer1") },
          { q: t("faqQuestion2"), a: t("faqAnswer2") },
          { q: t("faqQuestion3"), a: t("faqAnswer3") },
        ])}
      />
      <JsonLd data={generateWebAppJsonLd(host)} />
    </div>
  );
}
