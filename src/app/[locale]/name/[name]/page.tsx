import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StylePreviewCard from "@/components/styles/StylePreviewCard";
import { Locales } from "@/i18n/config";
import { getEditorPath, getHost } from "@/lib/utils";
import { getStylePreset } from "@/lib/style-presets";
import { namePresets, getNamePreset } from "@/lib/name-presets";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateCreativeWorkJsonLd } from "@/lib/seo/product";

const host = getHost();

export default async function NamePage({
  params,
}: {
  params: Promise<{ name: string; locale: string }>;
}) {
  const { name, locale } = await params;
  const t = await getTranslations({ locale, namespace: "NamePage" });
  const localeTyped = locale as "en" | "zh";
  const preset = getNamePreset(name, localeTyped);
  if (!preset) {
    notFound();
  }
  const recommendedStyles = preset.styleSlugs
    .map((slug) => getStylePreset(slug))
    .filter((s): s is NonNullable<ReturnType<typeof getStylePreset>> => Boolean(s));
  const primary = recommendedStyles[0];
  const editorHref = primary
    ? getEditorPath(primary.editorPreset, locale)
    : `/${locale}/editor`;

  return (
    <Flex direction="column">
      <Header />
      <Section
        py="8"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.16), transparent 35%), radial-gradient(circle at 80% 30%, rgba(236,72,153,0.12), transparent 35%), linear-gradient(180deg, rgba(250,250,252,1) 0%, rgba(244,246,251,1) 100%)",
        }}
      >
        <Container px="5" size="3">
          <Flex direction="column" gap="5" align="center" className="text-center">
            <Badge radius="full" size="2" color="iris">
              {t("heroBadge")}
            </Badge>
            <Heading as="h1" size="9">
              {t("heroTitle", { name: preset.displayText })}
            </Heading>
            <Text size="5" color="gray" style={{ maxWidth: 760 }}>
              {t("heroSubtitle", { name: preset.displayText })}
            </Text>
            <Flex gap="3" wrap="wrap" justify="center">
              <Button asChild radius="full" size="4" color="iris">
                <a href={editorHref}>{t("openTemplate")}</a>
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Section>

      <Container px="5" py="8" size="4">
        <Heading as="h2" size="7" mb="4">
          {t("recommendedTitle", { name: preset.displayText })}
        </Heading>
        <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="5">
          {recommendedStyles.map((style) => (
            <StylePreviewCard
              key={style.slug}
              style={style}
              locale={localeTyped}
              openLabel={t("openTemplate")}
              detailLabel="Details"
            />
          ))}
        </Grid>

        <Box mt="8">
          <Text size="2" color="gray">
            Keywords: {preset.keywords.join(", ")}
          </Text>
        </Box>
      </Container>
      <Footer />
      <JsonLd
        data={generateCreativeWorkJsonLd({
          name: `${preset.displayText} in 3D Text`,
          description: t("heroSubtitle", { name: preset.displayText }),
          url: `${host}/${locale}/name/${name}`,
          keywords: preset.keywords,
          category: "3D Name Generator",
        })}
      />
    </Flex>
  );
}

export function generateStaticParams() {
  return Locales.flatMap((locale) =>
    namePresets
      .filter((p) => p.locale === locale)
      .map((p) => ({
        locale,
        name: p.name,
      })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; name: string }>;
}): Promise<Metadata> {
  const { locale, name } = await params;
  const localeTyped = locale as "en" | "zh";
  const preset = getNamePreset(name, localeTyped);
  if (!preset) return {};

  const t = await getTranslations({ locale, namespace: "NamePage" });
  const title = t("seoTitle", { name: preset.displayText });
  const description = t("seoDescription", { name: preset.displayText });

  return {
    title,
    description,
    keywords: preset.keywords,
    openGraph: {
      title,
      description,
      url: `${host}/${locale}/name/${name}`,
      siteName: "3D Text Generator",
      images: [
        {
          url: `${host}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${host}/og-image.png`],
    },
    alternates: {
      canonical: `${host}/${locale}/name/${name}`,
      languages: {
        en: `${host}/en/name/${name}`,
        "zh": `${host}/zh/name/${name}`,
        "x-default": `${host}/en/name/${name}`,
      },
    },
  };
}
