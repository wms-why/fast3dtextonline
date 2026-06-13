// /logo — list of 6 logo scenes.
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { scenes, getLocalizedScene } from "@/lib/presets/scene-presets";
import { LocaleLink } from "@/lib/i18n/navigation";
import { buildSeoMeta } from "@/lib/seo/meta";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/ogImage";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/logo-list";

export function meta({ location }: Route.MetaArgs) {
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const title =
    locale === "zh"
      ? "3D Logo 场景 — 游戏、YouTube、Twitch 等"
      : "3D Logo Scenes — Gaming, YouTube, Twitch & More";
  const description =
    locale === "zh"
      ? "免费 3D Logo 场景模板:游戏、YouTube、Twitch、电竞、Instagram、TikTok 创作者专用。每个场景都能在编辑器中打开并导出透明 PNG。"
      : "Free 3D logo scenes for gaming, YouTube, Twitch, esports, Instagram, TikTok creators. Each scene opens in the editor with transparent PNG export.";
  const keywords =
    locale === "zh"
      ? [
          "3D Logo 生成器",
          "游戏 Logo",
          "YouTube Logo",
          "Twitch Logo",
          "电竞 Logo",
        ]
      : [
          "3d logo maker",
          "gaming logo 3d",
          "youtube logo 3d",
          "twitch logo 3d",
          "esports logo 3d",
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

export default function LogoListPage() {
  const t = useTranslations("ScenePage");
  const locale = useLocale();

  return (
    <div className="mx-auto w-full max-w-310 px-6 py-8">
      <Heading as="h1" size="8" mb="2" className="text-center">
        {t("title")}
      </Heading>
      <Text size="5" color="gray" className="mx-auto mb-8 block text-center">
        {t("heroSubtitle")}
      </Text>
      <Grid
        columns={{ initial: "1", md: "2", lg: "3" }}
        gap="5"
        style={{ width: "100%" }}
      >
        {scenes.map((scene) => {
          const copy = getLocalizedScene(scene, locale);
          return (
            <Card key={scene.slug} size="3" className="h-full">
              <Flex direction="column" gap="3" height="100%">
                <Heading as="h2" size="5">
                  {copy.title}
                </Heading>
                <Text color="gray" size="3" className="flex-1">
                  {copy.summary}
                </Text>
                <LocaleLink
                  to={`/logo/${scene.slug}`}
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
