// /industry — list of 6 industry presets.
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { industries, getLocalizedIndustry } from "@/lib/presets/industry-presets";
import { LocaleLink } from "@/lib/i18n/navigation";
import type { Route } from "./+types/industry-list";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "3D Text by Industry — Gaming, Ecommerce, Social Media & More" },
    {
      name: "description",
      content:
        "Free 3D text effects for gaming, ecommerce, social media, streaming, sports, and music creators. Each opens in the editor with transparent PNG export.",
    },
  ];
}

export default function IndustryListPage() {
  const t = useTranslations("IndustryPage");
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
        {industries.map((i) => {
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
