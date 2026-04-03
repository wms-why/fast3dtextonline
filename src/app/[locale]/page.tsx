import { getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLocale, useTranslations } from "next-intl";
import { Locales } from "@/i18n/config";
import { Metadata } from "next";
import { featuredStyleSlugs, getStylePreset } from "@/lib/style-presets";
import StylePreviewCard from "@/components/styles/StylePreviewCard";
import { Badge, Box, Button, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes";
import { EditorSurface } from "@/components/editor/EditorSurface";
const host = process.env.NEXT_PUBLIC_HOST;
export default function HomePage() {

  const t = useTranslations("HomePage");
  const locale = useLocale() as "en" | "zh";
  const featuredStyles = featuredStyleSlugs
    .map((slug) => getStylePreset(slug))
    .filter((style): style is NonNullable<ReturnType<typeof getStylePreset>> => Boolean(style));

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <Flex direction={"column"} justify={"center"} align={"center"}>
        <Section
          className="w-full"
          style={{
            background:
              "radial-gradient(circle at 10% 12%, rgba(255, 118, 181, 0.16), transparent 22%), radial-gradient(circle at 88% 14%, rgba(87, 220, 255, 0.16), transparent 24%), linear-gradient(180deg, rgba(250,250,252,1) 0%, rgba(246,247,251,1) 100%)",
          }}
        >
          <Flex justify={"center"} align={"center"} direction={"column"} gap="6" px="6" py="8">
            <Badge radius="full" size="2" color="gray">
              {t("heroBadge")}
            </Badge>
            <Heading as="h1" size={"9"} align="center" style={{ maxWidth: 980 }}>
              {t("heroTitle")}
            </Heading>
            <Box style={{ maxWidth: 760 }}>
              <Text size={"6"} align="center"> {t("heroSubtitle")}</Text>
            </Box>
            <Flex gap="3" wrap="wrap" justify="center">
              <Button asChild radius="full" size="4">
                <a href="#templates">{t("getStarted")}</a>
              </Button>
              <Button asChild radius="full" size="4" variant="soft">
                <a href="#designTool">{t("openEditor")}</a>
              </Button>
            </Flex>
            <Flex gap="3" wrap="wrap" justify="center">
              <Badge radius="full" variant="soft">{t("heroStat1")}</Badge>
              <Badge radius="full" variant="soft">{t("heroStat2")}</Badge>
              <Badge radius="full" variant="soft">{t("heroStat3")}</Badge>
            </Flex>
          </Flex>
        </Section>

        <Section p="4" className="w-full" id="designTool">
          <Box p={{ initial: "4", md: "6" }}>
            <EditorSurface
              title={t("toolTitle")}
              subtitle={t("toolSubtitle")}
            />
          </Box>
        </Section>

        <Section className="w-full" id="templates" py="8">
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
                <a href={`/${locale}/styles`}>{t("browseLibrary")}</a>
              </Button>
            </Flex>
          </Flex>
        </Section>

        <Section className="w-full py-16 bg-accent-3">
          <Flex direction={"column"} justify={"center"} align={"center"} gap={"6"} p={"6"}>
            <Heading as="h2" size={"8"} className="text-3xl font-bold text-center">
              {t("featuresTitle")}
            </Heading>
            <Grid columns={{ initial: "1", md: "3" }} gap="5" style={{ width: "100%", maxWidth: 1120 }}>
              <Box className="p-6 rounded-3xl shadow-sm border-l-4 border-orange-500 bg-background">
                <Heading as="h3" className="text-xl font-bold mb-3">{t("feature1Title")}</Heading>
                <Text>{t("feature1Desc")}</Text>
              </Box>
              <Box className="p-6 rounded-3xl shadow-sm border-l-4 border-amber-500 bg-background">
                <Heading as="h3" className="text-xl font-bold mb-3">{t("feature2Title")}</Heading>
                <Text>{t("feature2Desc")}</Text>
              </Box>
              <Box className="p-6 rounded-3xl shadow-sm border-l-4 border-yellow-500 bg-background">
                <Heading as="h3" className="text-xl font-bold mb-3">{t("feature3Title")}</Heading>
                <Text>{t("feature3Desc")}</Text>
              </Box>
            </Grid>
          </Flex>
        </Section>

        <Section className="w-full py-16 bg-gray-2">
          <Flex direction={"column"} justify={"center"} align={"center"} gap={"6"} p={"6"}>
            <Heading as="h2" size={"8"} className="text-3xl font-bold text-center mb-12">
              {t("useCasesTitle")}
            </Heading>
            <Grid columns={{ initial: "1", md: "3" }} gap="5" style={{ width: "100%", maxWidth: 1120 }}>
              <Box className="p-6 rounded-3xl shadow-sm border border-gray-4 bg-background">
                <Heading as="h3" size="5" mb="2">{t("useCase1Title")}</Heading>
                <Text color="gray">{t("useCase1Desc")}</Text>
              </Box>
              <Box className="p-6 rounded-3xl shadow-sm border border-gray-4 bg-background">
                <Heading as="h3" size="5" mb="2">{t("useCase2Title")}</Heading>
                <Text color="gray">{t("useCase2Desc")}</Text>
              </Box>
              <Box className="p-6 rounded-3xl shadow-sm border border-gray-4 bg-background">
                <Heading as="h3" size="5" mb="2">{t("useCase3Title")}</Heading>
                <Text color="gray">{t("useCase3Desc")}</Text>
              </Box>
            </Grid>
          </Flex>
        </Section>

        <Section className="w-full py-16 bg-blue-9 ">
          <Flex direction={"column"} justify={"center"} align={"center"} gap={"6"} p={"6"}>
            <Heading as="h2" size={"8"} className="text-3xl font-bold mb-6">{t("ctaTitle")}</Heading>
            <Text size="5" className="max-w-3xl mx-auto">{t("ctaSubtitle")}</Text>
            <Button asChild radius="full" size="4" variant="solid" color="gray">
              <a href={`/${locale}/styles`}>
                {t("ctaButton")}
              </a>
            </Button>
          </Flex>
        </Section>

        <section className="w-full py-16 bg-panel">
          <Flex direction={"column"} justify={"center"} align={"center"} gap={"6"} p={"6"}>
            <Heading as="h2" size={"8"} className="text-3xl font-bold text-center mb-12">
              {t("faqTitle")}
            </Heading>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="border-b pb-4">
                <Heading as="h3" className="text-xl font-bold mb-2">{t("faqQuestion1")}</Heading>
                <p >{t("faqAnswer1")}</p>
              </div>
              <div className="border-b pb-4">
                <Heading as="h3" className="text-xl font-bold mb-2">{t("faqQuestion2")}</Heading>
                <p>{t("faqAnswer2")}</p>
              </div>
              <div className="border-b pb-4">
                <Heading as="h3" className="text-xl font-bold mb-2">{t("faqQuestion3")}</Heading>
                <p >{t("faqAnswer3")}</p>
              </div>
            </div>
          </Flex>
        </section>
      </Flex>

      <Footer></Footer>
    </div>
  );
}

const locales = Locales;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const localizedHomeUrl = `${host}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(",").map((item) => item.trim()),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localizedHomeUrl,
      siteName: "screen customization",
      images: [
        {
          url: `${host}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${host}/og-image.png`],
      creator: "Yaomker",
    },
    alternates: {
      canonical: localizedHomeUrl,
      languages: {
        en: `${host}/en`,
        zh: `${host}/zh`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
