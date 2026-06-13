// /styles — list of all 18 style presets.
import { Grid, Heading, Text } from "@radix-ui/themes";
import { useTranslations } from "@/lib/i18n/use-translations";
import { useLocale } from "@/lib/i18n/use-locale";
import { stylePresets } from "@/lib/presets/style-presets";
import StylePreviewCard from "@/components/styles/StylePreviewCard";
import { buildSeoMeta } from "@/lib/seo/meta";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/ogImage";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/styles-list";

export function meta({ location }: Route.MetaArgs) {
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const title =
    locale === "zh"
      ? "全部 3D 文字模板风格 — 3D 文字生成器"
      : "3D Text Styles — Browse All 18+ Templates";
  const description =
    locale === "zh"
      ? "浏览 18+ 免费 3D 文字风格:Chrome、霓虹、泡泡字、冰冻、金属、芭比粉等。点开任意风格即可在编辑器中打开并导出透明 PNG。"
      : "Browse 18+ free 3D text styles: chrome, neon, bubble letters, ice, metallic, Barbie pink, and more. Click any style to open it in the editor with a transparent PNG export.";
  const keywords =
    locale === "zh"
      ? [
          "3D 文字模板",
          "3D 字体风格",
          "立体字模板",
          "Chrome 3D 文字",
          "霓虹 3D 文字",
        ]
      : [
          "3d text styles",
          "3d text templates",
          "chrome 3d text",
          "neon 3d text",
          "bubble 3d letters",
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

export default function StylesListPage() {
  const t = useTranslations("StylePage");
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
