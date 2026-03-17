import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StylePreviewCard, {
  StylePreview,
} from "@/components/styles/StylePreviewCard";
import { Locales } from "@/i18n/config";
import { getEditorPath } from "@/lib/utils";
import {
  getContrastTextColor,
  getLocalizedStyle,
  getRelatedStyles,
  getStylePreset,
  stylePresets,
} from "@/lib/style-presets";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

const host = process.env.NEXT_PUBLIC_HOST;

export default async function StyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const style = getStylePreset(slug);

  if (!style) {
    notFound();
  }

  const copy = getLocalizedStyle(style, locale as "en" | "zh");
  const related = getRelatedStyles(style);
  const editorHref = getEditorPath(style.editorPreset, locale);
  const t = await getTranslations({ locale, namespace: "StylePage" });
  const solidButtonText = getContrastTextColor(style.visual.foreground);
  const softButtonText = getContrastTextColor(
    style.visual.panelBackground,
    "#111111",
    style.visual.foreground,
  );

  return (
    <Flex direction="column">
      <Header />
      <Section
        py="8"
        style={{
          background: style.visual.background,
          color: style.visual.foreground,
        }}
      >
        <Container px="5" size="4">
          <Grid columns={{ initial: "1", md: "2" }} gap="7" align="center">
            <Flex direction="column" gap="4">
              <Badge
                radius="full"
                size="2"
                style={{
                  width: "fit-content",
                  backgroundColor: style.visual.panelBackground,
                  color: softButtonText,
                  border: `1px solid ${style.visual.panelBorder}`,
                }}
              >
                {style.badge}
              </Badge>
              <Heading as="h1" size="9">
                {copy.title}
              </Heading>
              <Text size="5" style={{ maxWidth: 620 }}>
                {copy.description}
              </Text>
              <Flex gap="3" wrap="wrap">
                <Button
                  asChild
                  radius="full"
                  size="3"
                  style={{
                    backgroundColor: style.visual.foreground,
                    color: solidButtonText,
                  }}
                >
                  <a href={editorHref}>{t("openTemplate")}</a>
                </Button>
                <Button
                  asChild
                  radius="full"
                  size="3"
                  variant="soft"
                  style={{
                    backgroundColor: style.visual.panelBackground,
                    color: softButtonText,
                    border: `1px solid ${style.visual.panelBorder}`,
                  }}
                >
                  <a href={`/${locale}/styles`}>{t("backToTemplates")}</a>
                </Button>
              </Flex>
            </Flex>

            <StylePreview
              style={style}
              locale={locale as "en" | "zh"}
              size="lg"
            />
          </Grid>
        </Container>
      </Section>

      <Container px="5" py="8" size="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="6">
          <Card size="3" style={{ borderRadius: 24 }}>
            <Flex direction="column" gap="4">
              <Heading as="h2" size="6">
                {t("templateSummary")}
              </Heading>
              <Text color="gray">{copy.summary}</Text>
            </Flex>
          </Card>

          <Card size="3" style={{ borderRadius: 24 }}>
            <Flex direction="column" gap="4">
              <Heading as="h2" size="6">
                {t("bestForTitle")}
              </Heading>
              <Flex gap="3" wrap="wrap">
                {copy.useCases.map((item) => (
                  <Badge key={item} radius="full" size="2" variant="soft">
                    {item}
                  </Badge>
                ))}
              </Flex>
              <Separator size="4" />
              <Text size="3" color="gray">
                {t("keywordsLabel")}: {style.keywords.join(", ")}
              </Text>
            </Flex>
          </Card>
        </Grid>

        <Box mt="8">
          <Heading as="h2" size="7" mb="4">
            {t("relatedTemplates")}
          </Heading>
          <Flex gap="5" wrap="wrap">
            {related.map((relatedStyle) => (
              <Box
                key={relatedStyle.slug}
                style={{ flex: "1 1 280px", minWidth: 280 }}
              >
                <StylePreviewCard
                  style={relatedStyle}
                  locale={locale as "en" | "zh"}
                  openLabel={t("openTemplate")}
                  detailLabel={t("seeDetails")}
                />
              </Box>
            ))}
          </Flex>
        </Box>
      </Container>
      <Footer />
    </Flex>
  );
}

export function generateStaticParams() {
  return Locales.flatMap((locale) =>
    stylePresets.map((style) => ({
      locale,
      slug: style.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const style = getStylePreset(slug);

  if (!style) {
    return {};
  }

  const copy = getLocalizedStyle(style, locale as "en" | "zh");

  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${host}/${locale}/styles/${slug}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_HOST}/og-image.png`,
          width: 1200,
          height: 630,
          alt: copy.title,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [`${process.env.NEXT_PUBLIC_HOST}/og-image.png`],
    },
    alternates: {
      canonical: `${host}/styles/${slug}`,
      languages: {
        en: `${host}/en/styles/${slug}`,
        zh: `${host}/zh/styles/${slug}`,
      },
    },
  };
}
