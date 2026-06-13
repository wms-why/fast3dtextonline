// /fonts — list of 6 font themes.
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { fontThemes } from "@/lib/presets/font-presets";
import { getLocalizedFontTheme } from "@/lib/presets/font-presets";
import { LocaleLink } from "@/lib/i18n/navigation";
import { buildSeoMeta } from "@/lib/seo/meta";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/ogImage";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/fonts-list";

export function meta({ location }: Route.MetaArgs) {
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const title =
    locale === "zh"
      ? "3D 字体主题 — 泡泡字、哥特、复古、未来风等"
      : "3D Text Fonts — Bubble, Gothic, Retro, Futuristic & More";
  const description =
    locale === "zh"
      ? "6 个免费 3D 字体主题:泡泡字、哥特、复古、未来风、漫画、奢华。每个主题都能在编辑器中打开并导出透明 PNG。"
      : "6 free 3D text font themes: bubble, gothic, retro, futuristic, comic, luxury. Each theme opens in the editor with a transparent PNG export.";
  const keywords =
    locale === "zh"
      ? ["3D 字体", "泡泡字体", "哥特字体", "复古字体", "未来风字体"]
      : [
          "3d fonts",
          "bubble 3d font",
          "gothic 3d font",
          "retro 3d font",
          "futuristic 3d font",
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

export default function FontsListPage() {
  const t = useTranslations("FontPage");
  const locale = useLocale();

  return (
    <div className="mx-auto w-full max-w-310 px-6 py-8">
      <Heading as="h1" size="8" mb="2" className="text-center">
        {t("title")}
      </Heading>
      <Text size="5" color="gray" className="mx-auto mb-8 block  text-center">
        {t("heroSubtitle")}
      </Text>
      <Grid
        columns={{ initial: "1", md: "2", lg: "3" }}
        gap="5"
        style={{ width: "100%" }}
      >
        {fontThemes.map((theme) => {
          const copy = getLocalizedFontTheme(theme, locale);
          return (
            <Card key={theme.slug} size="3" className="h-full">
              <Flex direction="column" gap="3" height="100%">
                <Text
                  size="8"
                  weight="bold"
                  className="block"
                  style={{ fontFamily: theme.primaryFont, minHeight: 100 }}
                  align="center"
                >
                  {theme.sampleText}
                </Text>
                <Heading as="h2" size="5">
                  {copy.title}
                </Heading>
                <Text color="gray" size="3" className="flex-1">
                  {copy.summary}
                </Text>
                <LocaleLink
                  to={`/fonts/${theme.slug}`}
                  className="text-violet-600 hover:underline dark:text-violet-400"
                >
                  {t("seeDetails")} →
                </LocaleLink>
              </Flex>
            </Card>
          );
        })}
      </Grid>
    </div>
  );
}
