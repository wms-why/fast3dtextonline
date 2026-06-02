import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StylePreviewCard, { StylePreview } from "@/components/styles/StylePreviewCard";
import { Locales } from "@/i18n/config";
import { getEditorPath, getHost } from "@/lib/utils";
import { getStylePreset } from "@/lib/style-presets";
import { industries, getIndustry, getLocalizedIndustry, getRelatedIndustries } from "@/lib/industry-presets";
import { Badge, Box, Button, Card, Container, Flex, Grid, Heading, Section, Separator, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateCreativeWorkJsonLd } from "@/lib/seo/product";

const host = getHost();

export default async function IndustryDetailPage({ params }: { params: Promise<{ industry: string; locale: string }> }) {
  const { industry: industrySlug, locale } = await params;
  const industry = getIndustry(industrySlug);
  if (!industry) notFound();
  const copy = getLocalizedIndustry(industry, locale as "en" | "zh");
  const t = await getTranslations({ locale, namespace: "IndustryPage" });
  const primary = getStylePreset(industry.styleSlugs[0]);
  const editorHref = primary ? getEditorPath(primary.editorPreset, locale) : `/${locale}/editor`;
  const related = getRelatedIndustries(industry);
  return (
    <Flex direction="column">
      <Header />
      <Section py="8" style={{ background: "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.16), transparent 35%), radial-gradient(circle at 80% 30%, rgba(236,72,153,0.12), transparent 35%)" }}>
        <Container px="5" size="4">
          <Grid columns={{ initial: "1", md: "2" }} gap="7" align="center">
            <Flex direction="column" gap="4">
              <Badge radius="full" size="2" color="iris" style={{ width: "fit-content" }}>{industry.displayName}</Badge>
              <Heading as="h1" size="9">{copy.title}</Heading>
              <Text size="5" style={{ maxWidth: 620 }}>{copy.description}</Text>
              <Text size="3" color="gray">{t("sampleTextLabel")}: <strong>{industry.sampleText}</strong></Text>
              <Flex gap="3" wrap="wrap">
                <Button asChild radius="full" size="3" color="iris"><a href={editorHref}>{t("openTemplate")}</a></Button>
                <Button asChild radius="full" size="3" variant="soft"><a href={`/${locale}/industry`}>{t("backToIndustries")}</a></Button>
              </Flex>
            </Flex>
            {primary && <StylePreview style={primary} locale={locale as "en" | "zh"} size="lg" />}
          </Grid>
        </Container>
      </Section>
      <Container px="5" py="8" size="4">
        <Grid columns={{ initial: "1", md: "2" }} gap="6">
          <Card size="3" style={{ borderRadius: 24 }}><Flex direction="column" gap="4"><Heading as="h2" size="6">{t("summary")}</Heading><Text color="gray">{copy.summary}</Text></Flex></Card>
          <Card size="3" style={{ borderRadius: 24 }}>
            <Flex direction="column" gap="4">
              <Heading as="h2" size="6">{t("bestForTitle")}</Heading>
              <Flex gap="2" wrap="wrap">{copy.useCases.map((u) => <Badge key={u} radius="full" size="2" variant="soft">{u}</Badge>)}</Flex>
              <Separator size="4" />
              <Text size="3" color="gray">{t("keywordsLabel")}: {industry.keywords.join(", ")}</Text>
            </Flex>
          </Card>
        </Grid>
        <Box mt="8">
          <Heading as="h2" size="7" mb="4">{t("relatedIndustries")}</Heading>
          <Flex gap="5" wrap="wrap">
            {related.map((rel) => {
              const linkedStyle = getStylePreset(rel.styleSlugs[0]);
              if (!linkedStyle) return null;
              return (
                <Box key={rel.slug} style={{ flex: "1 1 280px", minWidth: 280 }}>
                  <StylePreviewCard style={linkedStyle} locale={locale as "en" | "zh"} openLabel={t("openTemplate")} detailLabel={t("seeDetails")} />
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Container>
      <Footer />
      <JsonLd data={generateCreativeWorkJsonLd({ name: copy.title, description: copy.description, url: `${host}/${locale}/industry/${industrySlug}`, keywords: industry.keywords, category: `${industry.displayName} Text` })} />
    </Flex>
  );
}

export function generateStaticParams() {
  return Locales.flatMap((locale) => industries.map((i) => ({ locale, industry: i.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; industry: string }> }): Promise<Metadata> {
  const { locale, industry: industrySlug } = await params;
  const industry = getIndustry(industrySlug);
  if (!industry) return {};
  const copy = getLocalizedIndustry(industry, locale as "en" | "zh");
  return {
    title: copy.title,
    description: copy.description,
    keywords: industry.keywords,
    openGraph: { title: copy.title, description: copy.description, url: `${host}/${locale}/industry/${industrySlug}`, siteName: "3D Text Generator", images: [{ url: `${host}/og-image.png`, width: 1200, height: 630, alt: copy.title }], locale, type: "website" },
    twitter: { card: "summary_large_image", title: copy.title, description: copy.description, images: [`${host}/og-image.png`] },
    alternates: { canonical: `${host}/${locale}/industry/${industrySlug}`, languages: { en: `${host}/en/industry/${industrySlug}`, zh: `${host}/zh/industry/${industrySlug}`, "x-default": `${host}/en/industry/${industrySlug}` } },
  };
}
