import { OnlyPage } from "@/components/editor/OnlyPage";
import { decode } from "@/lib/utils";
import { getRelatedStyles, getStylePreset } from "@/lib/style-presets";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{ data: string }> }) {

  const { data } = await params

  let backgroundProp, textProp, effectProp, currentStyle

  if (data) {
    try {
      const { bg, text, effect, templateSlug } = decode(data);

      backgroundProp = bg;
      textProp = text;
      effectProp = effect;
      currentStyle = templateSlug ? getStylePreset(templateSlug) : undefined;
    } catch (error) {
      console.error("parse data from url error", error)
    }
  }

  return (
    <OnlyPage
      textProp={textProp}
      backgroundProp={backgroundProp}
      effectProp={effectProp}
      currentStyle={currentStyle}
      relatedStyles={currentStyle ? getRelatedStyles(currentStyle) : []}
    />
  )

}

const host = process.env.NEXT_PUBLIC_HOST;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string, data: string }>;
}): Promise<Metadata> {
  const { locale, data } = await params;
  const t = await getTranslations({ locale, namespace: "TextEditor" });

  const name = `editor/${data}`;
  let backgroundProp, textProp

  if (data) {
    try {
      const { bg, text } = decode(data);
      backgroundProp = bg;
      textProp = text;
    } catch (error) {
      console.error("parse data from url error", error)
    }
  }

  const description = t("seoDescription") + `bacground: ${JSON.stringify(backgroundProp)}; text: ${JSON.stringify(textProp)})}`;

  return {
    title: t("seoTitle"),
    description,
    openGraph: {
      title: t("seoTitle"),
      description,
      url: `${host}/${locale}/${name}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_HOST}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("seoTitle"),
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("seoTitle"),
      description,
      images: [`${process.env.NEXT_PUBLIC_HOST}/og-image.png`],
    },
    alternates: {
      canonical: `${host}/${name}`,
      languages: {
        en: `${host}/en/${name}`,
        zh: `${host}/zh/${name}`,
      },
    },
  };
}
