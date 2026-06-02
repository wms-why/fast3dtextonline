// /styles — list of all 18 style presets.
import { Box, Grid, Heading, Text } from "@radix-ui/themes";
import { useTranslations } from "@/lib/i18n/use-translations";
import { useLocale } from "@/lib/i18n/use-locale";
import { stylePresets } from "@/lib/presets/style-presets";
import StylePreviewCard from "@/components/styles/StylePreviewCard";
import type { Route } from "./+types/styles-list";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "3D Text Styles — 3D Text Generator" },
    {
      name: "description",
      content:
        "Browse 18+ free 3D text styles: chrome, neon, bubble letters, ice, metallic, and more. Click any style to open it in the editor with a transparent PNG export.",
    },
  ];
}

export default function StylesListPage() {
  const t = useTranslations("StylePage");
  const locale = useLocale();

  return (
    <div className="mx-auto w-full max-w-[1240px] px-6 py-8">
      <Box className="mb-8 text-center">
        <Heading as="h1" size="8" mb="2">
          {t("listTitle")}
        </Heading>
        <Text size="5" color="gray" className="mx-auto block max-w-[760px]">
          {t("listSubtitle")}
        </Text>
      </Box>
      <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="5">
        {stylePresets.map((style) => (
          <StylePreviewCard
            key={style.slug}
            style={style}
            locale={locale}
            mode="grid"
            openLabel={t("openInEditor")}
            detailLabel={t("seeDetails")}
          />
        ))}
      </Grid>
    </div>
  );
}
