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
import { holidays } from "@/lib/holiday-presets";
import { getStylePreset } from "@/lib/style-presets";
import { getEditorPath, getHost } from "@/lib/utils";

const host = getHost();

export default function HolidayListPage() {
  const locale = useLocale() as "zh" | "en";
  const t = useTranslations("HolidayPage");
  return (
    <Flex direction={"column"} gap={"4"}>
      <Header />
      <Section
        py="8"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,121,178,0.14), transparent 25%), radial-gradient(circle at top right, rgba(98,212,255,0.14), transparent 25%)",
        }}
      >
        <Flex direction="column" gap="8" px="6" mx="auto" style={{ maxWidth: 1240 }}>
          <Flex direction="column" gap="4" align="center" className="text-center">
            <Badge radius="full" size="2" color="iris">{t("heroBadge")}</Badge>
            <Heading as="h1" size="9" style={{ maxWidth: 980 }}>{t("heroTitle")}</Heading>
            <Text size="5" color="gray" style={{ maxWidth: 780 }}>{t("heroSubtitle")}</Text>
          </Flex>
          <Box>
            <Heading as="h2" size="7" mb="4">{t("featuredTitle")}</Heading>
            <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="5">
              {holidays.map((h) => {
                const primary = getStylePreset(h.styleSlugs[0]);
                const editorHref = primary ? getEditorPath(primary.editorPreset, locale) : `/${locale}/editor`;
                return (
                  <Card key={h.slug} size="3" style={{ borderRadius: 24 }}>
                    <Flex direction="column" gap="3">
                      <Flex justify="between" align="center" wrap="wrap">
                        <Badge radius="full" color="iris" size="2">{h.displayName}</Badge>
                        <Text size="1" color="gray">{t("sampleTextLabel")}: <strong>{h.sampleText}</strong></Text>
                      </Flex>
                      <Heading as="h3" size="5">
                        <a href={`/${locale}/holiday/${h.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                          {locale === "zh" ? h.zh.title : h.en.title}
                        </a>
                      </Heading>
                      <Text color="gray" size="2">{locale === "zh" ? h.zh.summary : h.en.summary}</Text>
                      <Flex gap="2" wrap="wrap">
                        {h.keywords.slice(0, 3).map((kw) => (
                          <Badge key={kw} radius="full" size="1" variant="soft">{kw}</Badge>
                        ))}
                      </Flex>
                      <Flex gap="2" mt="auto" wrap="wrap">
                        <Button asChild radius="full" size="2" color="iris"><a href={editorHref}>{t("openTemplate")}</a></Button>
                        <Button asChild radius="full" size="2" variant="soft"><a href={`/${locale}/holiday/${h.slug}`}>{t("seeDetails")}</a></Button>
                      </Flex>
                    </Flex>
                  </Card>
                );
              })}
            </Grid>
          </Box>
        </Flex>
      </Section>
      <Footer />
    </Flex>
  );
}

const locales = Locales;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HolidayPage" });
  const name = "holiday";
  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    openGraph: { title: t("seoTitle"), description: t("seoDescription"), url: `${host}/${locale}/${name}`, siteName: "3D Text Generator", images: [{ url: `${host}/og-image.png`, width: 1200, height: 630, alt: t("seoTitle") }], locale, type: "website" },
    twitter: { card: "summary_large_image", title: t("seoTitle"), description: t("seoDescription"), images: [`${host}/og-image.png`] },
    alternates: { canonical: `${host}/${locale}/${name}`, languages: { en: `${host}/en/${name}`, zh: `${host}/zh/${name}`, "x-default": `${host}/en/${name}` } },
  };
}
