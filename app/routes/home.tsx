// Home page. The full marketing layout (hero + featured grid + features +
// use cases + CTA + FAQ). EditorSurface is intentionally omitted from the
// SSR path — the editor lives at /editor and is reached via the "Open
// Editor" CTA. Step 9 wires the editor route properly.

import { Badge, Box, Button, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes";
import { motion } from "motion/react";
import { useTranslations } from "@/lib/i18n/use-translations";
import { useLocale } from "@/lib/i18n/use-locale";
import { featuredStyleSlugs, getStylePreset } from "@/lib/presets/style-presets";
import StylePreviewCard from "@/components/styles/StylePreviewCard";
import { LocaleLink } from "@/lib/i18n/navigation";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateFaqJsonLd } from "@/lib/seo/faq";
import { generateWebAppJsonLd } from "@/lib/seo/webApp";
import { buildSeoMeta } from "@/lib/seo/meta";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/ogImage";
import { getHost } from "@/lib/host";
import { FadeUp } from "@/components/animations/FadeUp";
import type { Route } from "./+types/home";
import type { Locale } from "@/lib/i18n/config";

export function meta({ location }: Route.MetaArgs) {
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const title =
    locale === "zh"
      ? "3D 文字生成器 — 免费在线 3D 文字与透明 PNG 导出"
      : "3D Text Generator — Free Online 3D Text with Transparent PNG Export";
  const description =
    locale === "zh"
      ? "免费在线 3D 文字生成器:18+ 模板风格,支持透明背景 PNG 导出,涵盖游戏、电商、社交媒体、节日等场景。"
      : "Free online 3D text generator with 18+ template styles. Export transparent PNG for gaming, ecommerce, social media, holidays, and more.";
  const keywords =
    locale === "zh"
      ? ["3D 文字生成器", "3D 文字在线", "透明 PNG", "立体字生成器", "免费 3D 字体"]
      : [
          "3d text generator",
          "online 3d text",
          "transparent png 3d text",
          "free 3d font generator",
          "3d text maker",
        ];
  return buildSeoMeta({
    title,
    description,
    keywords,
    ogImage: DEFAULT_OG_IMAGE,
    locale,
    pathname: location.pathname,
  });
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
        className="relative w-full"
        py={{ initial: "9", md: "12" }}
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgb(var(--brand-100) / 0.85) 0%, transparent 70%), radial-gradient(40% 50% at 80% 10%, rgb(var(--brand-300) / 0.18) 0%, transparent 60%)",
        }}
      >
        <Flex justify="center" align="center" direction="column" gap="6" px="6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <Badge
              radius="full"
              size="2"
              variant="surface"
              className="border border-border-subtle"
            >
              {t("heroBadge")}
            </Badge>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", maxWidth: 1080 }}
          >
            <Heading
              as="h1"
              align="center"
              className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.025em] leading-[1.05]"
            >
              {t("heroTitle")}
            </Heading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 760 }}
          >
            <Text size="6" align="center" color="gray">
              {t("heroSubtitle")}
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button asChild radius="full" size="4">
              <a href="#templates">{t("getStarted")}</a>
            </Button>
            <Button asChild radius="full" size="4" variant="soft">
              <LocaleLink to="/editor">{t("openEditor")}</LocaleLink>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2"
          >
            <Badge radius="full" variant="soft">
              {t("heroStat1")}
            </Badge>
            <Badge radius="full" variant="soft">
              {t("heroStat2")}
            </Badge>
            <Badge radius="full" variant="soft">
              {t("heroStat3")}
            </Badge>
          </motion.div>
        </Flex>
      </Section>

      {/* Featured templates */}
      <Section className="w-full py-20" id="templates">
        <FadeUp>
          <Flex direction="column" gap="6" px="6" mx="auto" style={{ maxWidth: 1240 }}>
          <Flex direction="column" gap="2" align="center" className="text-center">
            <Heading as="h2" size="8" className="font-display tracking-[-0.02em]">
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
        </FadeUp>
      </Section>

      {/* Features */}
      <Section className="w-full bg-surface-1 py-20">
        <FadeUp>
          <Flex direction="column" justify="center" align="center" gap="6" p="6">
          <Heading
            as="h2"
            size="8"
            className="text-center font-display text-3xl font-bold tracking-[-0.02em] md:text-4xl"
          >
            {t("featuresTitle")}
          </Heading>
          <Grid
            columns={{ initial: "1", md: "3" }}
            gap="5"
            style={{ width: "100%", maxWidth: 1120 }}
          >
            <Box className="rounded-[var(--radius-card)] border border-border-subtle border-l-4 border-l-brand-500 bg-surface-1 p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
              <Heading as="h3" className="mb-3 text-xl font-bold">
                {t("feature1Title")}
              </Heading>
              <Text color="gray">{t("feature1Desc")}</Text>
            </Box>
            <Box className="rounded-[var(--radius-card)] border border-border-subtle border-l-4 border-l-brand-500 bg-surface-1 p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
              <Heading as="h3" className="mb-3 text-xl font-bold">
                {t("feature2Title")}
              </Heading>
              <Text color="gray">{t("feature2Desc")}</Text>
            </Box>
            <Box className="rounded-[var(--radius-card)] border border-border-subtle border-l-4 border-l-brand-500 bg-surface-1 p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
              <Heading as="h3" className="mb-3 text-xl font-bold">
                {t("feature3Title")}
              </Heading>
              <Text color="gray">{t("feature3Desc")}</Text>
            </Box>
          </Grid>
          </Flex>
        </FadeUp>
      </Section>

      {/* Use cases */}
      <Section className="w-full bg-surface-2 py-20">
        <FadeUp>
          <Flex direction="column" justify="center" align="center" gap="6" p="6">
          <Heading
            as="h2"
            size="8"
            className="mb-12 text-center font-display text-3xl font-bold tracking-[-0.02em] md:text-4xl"
          >
            {t("useCasesTitle")}
          </Heading>
          <Grid
            columns={{ initial: "1", md: "3" }}
            gap="5"
            style={{ width: "100%", maxWidth: 1120 }}
          >
            <Box className="rounded-[var(--radius-card)] border border-border-subtle bg-surface-1 p-6 shadow-[var(--shadow-sm)]">
              <Heading as="h3" size="5" mb="2">
                {t("useCase1Title")}
              </Heading>
              <Text color="gray">{t("useCase1Desc")}</Text>
            </Box>
            <Box className="rounded-[var(--radius-card)] border border-border-subtle bg-surface-1 p-6 shadow-[var(--shadow-sm)]">
              <Heading as="h3" size="5" mb="2">
                {t("useCase2Title")}
              </Heading>
              <Text color="gray">{t("useCase2Desc")}</Text>
            </Box>
            <Box className="rounded-[var(--radius-card)] border border-border-subtle bg-surface-1 p-6 shadow-[var(--shadow-sm)]">
              <Heading as="h3" size="5" mb="2">
                {t("useCase3Title")}
              </Heading>
              <Text color="gray">{t("useCase3Desc")}</Text>
            </Box>
          </Grid>
          </Flex>
        </FadeUp>
      </Section>

      {/* CTA — the only place the marketing site is allowed to use a bold color block */}
      <Section
        className="relative w-full overflow-hidden py-20"
        style={{
          background:
            "radial-gradient(60% 80% at 20% 30%, rgb(var(--brand-500) / 0.85) 0%, transparent 60%), radial-gradient(50% 70% at 85% 70%, rgb(94 61 255 / 0.9) 0%, transparent 55%), linear-gradient(135deg, #1A1530 0%, #221A40 100%)",
        }}
      >
        <FadeUp>
          <Flex direction="column" justify="center" align="center" gap="6" p="6" className="relative z-10 text-center text-white">
          <Heading
            as="h2"
            size="8"
            className="mb-6 font-display text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl"
          >
            {t("ctaTitle")}
          </Heading>
          <Text size="5" className="mx-auto max-w-3xl text-center text-white/85">
            {t("ctaSubtitle")}
          </Text>
          <Button asChild radius="full" size="4" variant="solid" color="gray">
            <LocaleLink to="/styles">{t("ctaButton")}</LocaleLink>
          </Button>
          </Flex>
        </FadeUp>
      </Section>

      {/* FAQ */}
      <section className="w-full py-20">
        <FadeUp>
          <Flex direction="column" justify="center" align="center" gap="6" p="6">
          <Heading
            as="h2"
            size="8"
            className="mb-12 text-center font-display text-3xl font-bold tracking-[-0.02em] md:text-4xl"
          >
            {t("faqTitle")}
          </Heading>
          <div className="mx-auto max-w-3xl space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-border-subtle pb-4">
                <Heading as="h3" className="mb-2 text-xl font-bold">
                  {t(`faqQuestion${i}`)}
                </Heading>
                <p className="text-text-2">{t(`faqAnswer${i}`)}</p>
              </div>
            ))}
          </div>
          </Flex>
        </FadeUp>
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
