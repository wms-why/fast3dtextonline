import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { useLocale, useTranslations } from "next-intl";
import { Locales } from "@/i18n/config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  fontThemes,
  fontThemeCategories,
  getFontTheme,
} from "@/lib/font-presets";
import { getEditorPath, getHost } from "@/lib/utils";
import { getStylePreset } from "@/lib/style-presets";
import { JsonLd } from "@/lib/seo/JsonLd";

const host = getHost();

export default function FontsListPage() {
  const locale = useLocale() as "zh" | "en";
  const t = useTranslations("FontPage");
  const tStyle = useTranslations("StylePage");

  const grouped = fontThemeCategories.map((cat) => ({
    ...cat,
    items: fontThemes.filter((theme) => theme.category === cat.id),
  }));

  return (
    <Flex direction={"column"} gap={"4"}>
      <Header />
      <Section
        py="8"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(99,102,241,0.16), transparent 25%), radial-gradient(circle at top right, rgba(236,72,153,0.12), transparent 25%)",
        }}
      >
        <Flex
          direction="column"
          gap="8"
          px="6"
          mx="auto"
          style={{ maxWidth: 1240 }}
        >
          <Flex
            direction="column"
            gap="4"
            align="center"
            className="text-center"
          >
            <Badge radius="full" size="2" color="iris">
              {t("heroBadge")}
            </Badge>
            <Heading as="h1" size="9" style={{ maxWidth: 980 }}>
              {t("heroTitle")}
            </Heading>
            <Text size="5" color="gray" style={{ maxWidth: 780 }}>
              {t("heroSubtitle")}
            </Text>
          </Flex>

          <Box>
            <Heading as="h2" size="7" mb="4">
              {t("featuredTitle")}
            </Heading>
            <Grid columns={{ initial: "1", md: "2" }} gap="5">
              {fontThemes
                .filter((theme) => theme.spotlight)
                .map((theme) => {
                  const primary = getStylePreset(theme.styleSlugs[0]);
                  const editorHref = primary
                    ? getEditorPath(primary.editorPreset, locale)
                    : `/${locale}/editor`;
                  return (
                    <Card
                      key={theme.slug}
                      size="3"
                      style={{
                        borderRadius: 24,
                        backgroundColor: "var(--gray-1)",
                      }}
                    >
                      <Flex direction="column" gap="4">
                        <Flex justify="between" align="center" wrap="wrap" gap="2">
                          <Badge radius="full" color="iris" size="2">
                            {theme.badge}
                          </Badge>
                          <Text size="1" color="gray">
                            {t("primaryFontLabel")}: {theme.primaryFont}
                          </Text>
                        </Flex>
                        <Heading as="h3" size="6">
                          <a
                            href={`/${locale}/fonts/${theme.slug}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {locale === "zh" ? theme.zh.title : theme.en.title}
                          </a>
                        </Heading>
                        <Text color="gray" size="3">
                          {locale === "zh"
                            ? theme.zh.summary
                            : theme.en.summary}
                        </Text>
                        <Flex gap="2" wrap="wrap">
                          {theme.keywords.slice(0, 3).map((kw) => (
                            <Badge
                              key={kw}
                              radius="full"
                              size="1"
                              variant="soft"
                            >
                              {kw}
                            </Badge>
                          ))}
                        </Flex>
                        <Flex gap="3" mt="auto" wrap="wrap">
                          <Button asChild radius="full" size="2" color="iris">
                            <a href={editorHref}>{t("openTemplate")}</a>
                          </Button>
                          <Button asChild radius="full" size="2" variant="soft">
                            <a href={`/${locale}/fonts/${theme.slug}`}>
                              {t("seeDetails")}
                            </a>
                          </Button>
                        </Flex>
                      </Flex>
                    </Card>
                  );
                })}
            </Grid>
          </Box>

          <Flex direction="column" gap="6">
            <Heading as="h2" size="7">
              {t("collectionsTitle")}
            </Heading>
            {grouped.map((group) => (
              <Box key={group.id}>
                <Flex
                  justify="between"
                  align="center"
                  gap="4"
                  wrap="wrap"
                  mb="4"
                >
                  <Flex direction="column" gap="1">
                    <Heading as="h3" size="6">
                      {group.label[locale]}
                    </Heading>
                  </Flex>
                  <Badge
                    radius="full"
                    variant="soft"
                    style={{
                      backgroundColor: `${group.accent}18`,
                      color: group.accent,
                    }}
                  >
                    {group.items.length} {t("templatesCount")}
                  </Badge>
                </Flex>
                <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="4">
                  {group.items.map((theme) => {
                    const primary = getStylePreset(theme.styleSlugs[0]);
                    const editorHref = primary
                      ? getEditorPath(primary.editorPreset, locale)
                      : `/${locale}/editor`;
                    return (
                      <Card
                        key={theme.slug}
                        size="2"
                        style={{
                          borderRadius: 18,
                          backgroundColor: "var(--gray-1)",
                        }}
                      >
                        <Flex direction="column" gap="3">
                          <Heading as="h4" size="4">
                            <a
                              href={`/${locale}/fonts/${theme.slug}`}
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
                            >
                              {locale === "zh"
                                ? theme.zh.title
                                : theme.en.title}
                            </a>
                          </Heading>
                          <Text color="gray" size="2">
                            {locale === "zh"
                              ? theme.zh.summary
                              : theme.en.summary}
                          </Text>
                          <Button asChild radius="full" size="1" variant="soft">
                            <a href={editorHref}>{t("openTemplate")}</a>
                          </Button>
                        </Flex>
                      </Card>
                    );
                  })}
                </Grid>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Section>
      <Box px="6" pb="8" mx="auto" style={{ maxWidth: 1240 }}>
        <Flex
          direction={{ initial: "column", md: "row" }}
          gap="6"
          style={{
            padding: "1.5rem",
            borderRadius: 28,
            background:
              "linear-gradient(135deg, rgba(12, 18, 38, 0.96) 0%, rgba(17, 28, 52, 0.96) 100%)",
            color: "white",
          }}
        >
          <Flex direction="column" gap="3" style={{ flex: 1 }}>
            <Badge
              radius="full"
              style={{
                width: "fit-content",
                backgroundColor: "rgba(255,255,255,0.12)",
              }}
            >
              {t("editorCalloutBadge")}
            </Badge>
            <Heading as="h2" size="7">
              {t("editorCalloutTitle")}
            </Heading>
            <Text size="4" style={{ color: "rgba(255,255,255,0.76)" }}>
              {t("editorCalloutSubtitle")}
            </Text>
          </Flex>
          <Flex align="center">
            <Button asChild radius="full" size="3" color="iris">
              <a href={`/${locale}/styles`}>{t("editorCalloutButton")}</a>
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </Flex>
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
  const t = await getTranslations({ locale, namespace: "FontPage" });
  const name = "fonts";

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      url: `${host}/${locale}/${name}`,
      siteName: "3D Text Generator",
      images: [
        {
          url: `${host}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("seoTitle"),
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("seoTitle"),
      description: t("seoDescription"),
      images: [`${host}/og-image.png`],
    },
    alternates: {
      canonical: `${host}/${locale}/${name}`,
      languages: {
        en: `${host}/en/${name}`,
        "zh": `${host}/zh/${name}`,
        "x-default": `${host}/en/${name}`,
      },
    },
  };
}
