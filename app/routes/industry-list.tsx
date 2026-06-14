// /industry — list of 6 industry presets.
import { useMemo, useState } from "react";
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { industries, getLocalizedIndustry } from "@/lib/presets/industry-presets";
import { LocaleLink } from "@/lib/i18n/navigation";
import { buildSeoMeta } from "@/lib/seo/meta";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/ogImage";
import { SearchField } from "@/components/common/SearchField";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/industry-list";

export function meta({ location }: Route.MetaArgs) {
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const title =
    locale === "zh"
      ? "行业 3D 文字 — 游戏、电商、社媒、直播等"
      : "3D Text by Industry — Gaming, Ecommerce, Social Media & More";
  const description =
    locale === "zh"
      ? "面向游戏、电商、社交媒体、直播、运动、音乐行业创作者的免费 3D 文字效果。每个行业模板都能在编辑器中打开并导出透明 PNG。"
      : "Free 3D text effects for gaming, ecommerce, social media, streaming, sports, and music creators. Each opens in the editor with transparent PNG export.";
  const keywords =
    locale === "zh"
      ? ["行业 3D 文字", "游戏 3D 文字", "电商 3D 文字", "社交媒体 3D 文字", "直播 3D 文字"]
      : [
          "industry 3d text",
          "gaming 3d text",
          "ecommerce 3d text",
          "social media 3d text",
          "streaming 3d text",
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

export default function IndustryListPage() {
  const t = useTranslations("IndustryPage");
  const locale = useLocale();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return industries;
    return industries.filter((i) => {
      const copy = getLocalizedIndustry(i, locale);
      return (
        copy.title.toLowerCase().includes(q) ||
        copy.summary.toLowerCase().includes(q) ||
        i.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, locale]);

  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 py-8">
      <Heading as="h1" size="8" mb="2" className="text-center font-display tracking-[-0.02em]">
        {t("title")}
      </Heading>
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <Text size="5" color="gray">
          {t("heroSubtitle")}
        </Text>
      </div>
      <SearchField
        value={query}
        onChange={setQuery}
        placeholder={t("searchPlaceholder")}
        className="mx-auto mb-6 max-w-xl"
      />
      <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="5">
        {filtered.map((i) => {
          const copy = getLocalizedIndustry(i, locale);
          return (
            <Card key={i.slug} size="3" className="h-full">
              <Flex direction="column" gap="3" height="100%">
                <Heading as="h2" size="5">
                  {copy.title}
                </Heading>
                <Text color="gray" size="3" className="flex-1">
                  {copy.summary}
                </Text>
                <LocaleLink
                  to={`/industry/${i.slug}`}
                  className="text-brand-500 hover:underline"
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
