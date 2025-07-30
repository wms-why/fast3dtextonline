import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useTranslations } from "next-intl";
import DoNotWriteOnThisPage from "@/components/screen/DoNotWriteOnThisPage";
import { Metadata } from "next";

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations("DoNotWriteOnThisPage");
  const indexT = useTranslations("Index");

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className=" text-white py-20 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">{t("heroTitle")}</h1>
            <p className="text-xl mb-8">{t("heroSubtitle")}</p>
          </div>
        </section>

        {/* Tool Section */}
        <section
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6"
          id="designTool"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("toolTitle")}
          </h2>
          <DoNotWriteOnThisPage></DoNotWriteOnThisPage>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {indexT("featuresTitle")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{t("feature1Title")}</h3>
                <p>{t("feature1Desc")}</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{t("feature2Title")}</h3>
                <p>{t("feature2Desc")}</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{t("feature3Title")}</h3>
                <p>{t("feature3Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("ctaTitle")}</h2>
          <p className="text-xl mb-8">{t("ctaSubtitle")}</p>
          <a
            className="bg-black text-white px-8 py-3 rounded-lg text-lg font-medium"
            href="#designTool"
          >
            {t("ctaButton")}
          </a>
        </section>
      </main>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale: locale,
    namespace: "DoNotWriteOnThisPage",
  });

  const host = process.env.NEXT_PUBLIC_HOST;

  const name = "do-not-write-on-this-page";

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
        ar: `${host}/ar/${name}`,
        zh: `${host}/zh/${name}`,
        es: `${host}/es/${name}`,
        ja: `${host}/jp/${name}`,
      },
    },
  };
}
