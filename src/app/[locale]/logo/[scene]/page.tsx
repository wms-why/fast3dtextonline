import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StylePreviewCard, {
  StylePreview,
} from "@/components/styles/StylePreviewCard";
import { Locales } from "@/i18n/config";
import { getEditorPath, getHost } from "@/lib/utils";
import { getStylePreset } from "@/lib/style-presets";
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
import {
  scenes,
  getScene,
  getLocalizedScene,
  getRelatedScenes,
} from "@/lib/scene-presets";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateCreativeWorkJsonLd } from "@/lib/seo/product";

const host = getHost();

export default async function SceneDetailPage({
  params,
}: {
  params: Promise<{ scene: string; locale: string }>;
}) {
  const { scene: sceneSlug, locale } = await params;
  const scene = getScene(sceneSlug);
  if (!scene) notFound();
  const copy = getLocalizedScene(scene, locale as "en" | "zh");
  const t = await getTranslations({ locale, namespace: "ScenePage" });

  const related = getRelatedScenes(scene);
  const primary = getStylePreset(scene.styleSlugs[0]);
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
            "radial-gradient(circle at 20% 20%, rgba(236,72,153,0.16), transparent 35%), radial-gradient(circle at 80% 30%, rgba(99,102,241,0.12), transparent 35%)",
        }}
      >
        <Container px="5" size="4">
          <Grid columns={{ initial: "1", md: "2" }} gap="7" align="center">
            <Flex direction="column" gap="4">
              <Badge radius="full" size="2" color="iris" style={{ width: "fit-content" }}>
                {scene.name}
              </Badge>
              <Heading as="h1" size="9">
                {copy.title}
              </Heading>
              <Text size="5" style={{ maxWidth: 620 }}>
                {copy.description}
              </Text>
              <Text size="3" color="gray">
                {t("sampleTextLabel")}: <strong>{scene.sampleText}</strong>
              </Text>
              <Flex gap="3" wrap="wrap">
                <Button asChild radius="full" size="3" color="iris">
                  <a href={editorHref}>{t("openTemplate")}</a>
                </Button>
                <Button asChild radius="full" size="3" variant="soft">
                  <a href={`/${locale}/logo`}>{t("backToScenes")}</a>
                </Button>
              </Flex>
            </Flex>

            {primary && (
              <StylePreview
                style={primary}
                locale={locale as "en" | "zh"}
                size="lg"
              />
            )}
          </Grid>
        </Container>
      </Section>

      <Container px="5" py="8" size="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="6">
          <Card size="3" style={{ borderRadius: 24 }}>
            <Flex direction="column" gap="4">
              <Heading as="h2" size="6">
                {t("summary")}
              </Heading>
              <Text color="gray">{copy.summary}</Text>
            </Flex>
          </Card>
          <Card size="3" style={{ borderRadius: 24 }}>
            <Flex direction="column" gap="4">
              <Heading as="h2" size="6">
                {t("bestForTitle")}
              </Heading>
              <Flex gap="2" wrap="wrap">
                {copy.useCases.map((item) => (
                  <Badge key={item} radius="full" size="2" variant="soft">
                    {item}
                  </Badge>
                ))}
              </Flex>
              <Separator size="4" />
              <Text size="3" color="gray">
                {t("keywordsLabel")}: {scene.keywords.join(", ")}
              </Text>
            </Flex>
          </Card>
        </Grid>

        <Box mt="8">
          <Heading as="h2" size="7" mb="4">
            {t("relatedScenes")}
          </Heading>
          <Flex gap="5" wrap="wrap">
            {related.map((rel) => {
              const linkedStyle = getStylePreset(rel.styleSlugs[0]);
              if (!linkedStyle) return null;
              return (
                <Box
                  key={rel.slug}
                  style={{ flex: "1 1 280px", minWidth: 280 }}
                >
                  <StylePreviewCard
                    style={linkedStyle}
                    locale={locale as "en" | "zh"}
                    openLabel={t("openTemplate")}
                    detailLabel={t("seeDetails")}
                  />
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Container>
      <Footer />
      <JsonLd
        data={generateCreativeWorkJsonLd({
          name: copy.title,
          description: copy.description,
          url: `${host}/${locale}/logo/${sceneSlug}`,
          keywords: scene.keywords,
          category: `${scene.name} Logo Text`,
        })}
      />
    </Flex>
  );
}

export function generateStaticParams() {
  return Locales.flatMap((locale) =>
    scenes.map((scene) => ({
      locale,
      scene: scene.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; scene: string }>;
}): Promise<Metadata> {
  const { locale, scene: sceneSlug } = await params;
  const scene = getScene(sceneSlug);
  if (!scene) return {};
  const copy = getLocalizedScene(scene, locale as "en" | "zh");

  return {
    title: copy.title,
    description: copy.description,
    keywords: scene.keywords,
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${host}/${locale}/logo/${sceneSlug}`,
      siteName: "3D Text Generator",
      images: [
        {
          url: `${host}/og-image.png`,
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
      images: [`${host}/og-image.png`],
    },
    alternates: {
      canonical: `${host}/${locale}/logo/${sceneSlug}`,
      languages: {
        en: `${host}/en/logo/${sceneSlug}`,
        "zh": `${host}/zh/logo/${sceneSlug}`,
        "x-default": `${host}/en/logo/${sceneSlug}`,
      },
    },
  };
}
