import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StylePreviewCard from "@/components/styles/StylePreviewCard";
import { styleCategories, stylePresets } from "@/lib/style-presets";
import { Badge, Box, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { useLocale, useTranslations } from "next-intl";
import { Locales } from "@/i18n/config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
const host = process.env.NEXT_PUBLIC_HOST;

export default function StyleListPage() {
  const locale = useLocale() as "zh" | "en";
  const t = useTranslations("StylePage");

  const grouped = styleCategories.map((group) => ({
    ...group,
    items: stylePresets.filter((style) => style.category === group.id),
  }));

  return (
    <Flex direction={"column"} gap={"4"}>
      <Header />
      <Section
        py="8"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255, 121, 178, 0.12), transparent 25%), radial-gradient(circle at top right, rgba(98, 212, 255, 0.12), transparent 25%)",
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
            <Badge radius="full" size="2" color="gray">
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
            <Flex gap="5" wrap="wrap">
              {stylePresets
                .filter((style) => style.spotlight)
                .map((style) => (
                  <Box
                    key={style.slug}
                    style={{ flex: "1 1 280px", minWidth: 280 }}
                  >
                    <StylePreviewCard
                      style={style}
                      locale={locale}
                      mode="feature"
                      openLabel={t("openTemplate")}
                      detailLabel={t("seeDetails")}
                    />
                  </Box>
                ))}
            </Flex>
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
                      {t(`collection_${group.id}`)}
                    </Heading>
                    <Text color="gray">{t(`collection_${group.id}_desc`)}</Text>
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
                <Flex gap="5" wrap="wrap">
                  {group.items.map((style) => (
                    <Box
                      key={style.slug}
                      style={{ flex: "1 1 300px", minWidth: 280 }}
                    >
                      <StylePreviewCard
                        style={style}
                        locale={locale}
                        openLabel={t("openTemplate")}
                        detailLabel={t("seeDetails")}
                      />
                    </Box>
                  ))}
                </Flex>
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
          <Flex direction="column" gap="3" style={{ flex: 1 }}>
            <Text size="3">{t("editorCalloutFeature1")}</Text>
            <Text size="3">{t("editorCalloutFeature2")}</Text>
            <Text size="3">{t("editorCalloutFeature3")}</Text>
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
  const t = await getTranslations({ locale, namespace: "StylePage" });

  const name = "styles";

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      url: `${host}/${locale}/${name}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_HOST}/og-image.png`,
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
      images: [`${process.env.NEXT_PUBLIC_HOST}/og-image.png`],
    },
    alternates: {
      canonical: `${host}/${name}`,
      languages: {
        en: `${host}/en/${name}`,
        zh: `${host}/zh/${name}`,
      },
    },
  };
}
