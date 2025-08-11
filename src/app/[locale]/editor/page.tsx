
import { BackgroundProp } from "@/components/common/BackgroundSelector";
import { TextProp } from "@/components/common/TextSetting";
import { OnlyPage } from "@/components/editor/OnlyPage";
import { Locales } from "@/i18n/config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
const host = process.env.NEXT_PUBLIC_HOST;
export default function Page() {
  return (<OnlyPage textProp={undefined} backgroundProp={undefined}></OnlyPage>)
}

const locales = Locales;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TextEditor" });

  const name = "editor";

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
      url: `${host}/${locale}/${name}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_HOST}/og-image-${name}.png`,
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
      description: t("seoDescription"),
      images: [`${process.env.NEXT_PUBLIC_HOST}/og-image-${name}.png`],
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
