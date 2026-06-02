// /fonts — list of 6 font themes.
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { fontThemes } from "@/lib/presets/font-presets";
import { getLocalizedFontTheme } from "@/lib/presets/font-presets";
import { LocaleLink } from "@/lib/i18n/navigation";
import type { Route } from "./+types/fonts-list";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "3D Text Fonts — Bubble, Gothic, Retro & More" },
    {
      name: "description",
      content:
        "6 free 3D text font themes: bubble, gothic, retro, futuristic, comic, luxury. Each theme opens in the editor with a transparent PNG export.",
    },
  ];
}

export default function FontsListPage() {
  const t = useTranslations("FontPage");
  const locale = useLocale();

  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 py-8">
      <Heading as="h1" size="8" mb="2" className="text-center">
        {t("listTitle")}
      </Heading>
      <Text size="5" color="gray" className="mx-auto mb-8 block max-w-[760px] text-center">
        {t("listSubtitle")}
      </Text>
      <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="5">
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
