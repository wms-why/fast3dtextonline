// /holiday — list of 6 holiday presets.
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { holidays, getLocalizedHoliday } from "@/lib/presets/holiday-presets";
import { LocaleLink } from "@/lib/i18n/navigation";
import { buildSeoMeta } from "@/lib/seo/meta";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/ogImage";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/holiday-list";

export function meta({ location }: Route.MetaArgs) {
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const title =
    locale === "zh"
      ? "节日 3D 文字 — 圣诞、新年、万圣节、情人节等"
      : "3D Holiday Text — Christmas, New Year, Halloween & More";
  const description =
    locale === "zh"
      ? "免费节日 3D 文字效果:圣诞、新年、万圣节、情人节、生日、复活节。每个节日都能在编辑器中打开并导出透明 PNG。"
      : "Free 3D holiday text effects: Christmas, New Year, Halloween, Valentine, Birthday, Easter. Each opens in the editor with transparent PNG export.";
  const keywords =
    locale === "zh"
      ? ["节日 3D 文字", "圣诞 3D 文字", "新年 3D 文字", "万圣节 3D 文字", "情人节 3D 文字"]
      : [
          "holiday 3d text",
          "christmas 3d text",
          "new year 3d text",
          "halloween 3d text",
          "valentine 3d text",
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

export default function HolidayListPage() {
  const t = useTranslations("HolidayPage");
  const locale = useLocale();

  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 py-8">
      <Heading as="h1" size="8" mb="2" className="text-center">
        {t("title")}
      </Heading>
      <Text size="5" color="gray" className="mx-auto mb-8 block max-w-[760px] text-center">
        {t("heroSubtitle")}
      </Text>
      <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="5">
        {holidays.map((h) => {
          const copy = getLocalizedHoliday(h, locale);
          return (
            <Card key={h.slug} size="3" className="h-full">
              <Flex direction="column" gap="3" height="100%">
                <Heading as="h2" size="5">
                  {copy.title}
                </Heading>
                <Text color="gray" size="3" className="flex-1">
                  {copy.summary}
                </Text>
                <LocaleLink
                  to={`/holiday/${h.slug}`}
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
