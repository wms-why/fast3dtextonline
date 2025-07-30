import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Editor from "@/components/Editor";
import { useTranslations } from "next-intl";
import { Locales } from "@/i18n/config";
import { Metadata } from "next";
import { Box, Flex, Heading, Section, Text } from "@radix-ui/themes";
const host = process.env.NEXT_PUBLIC_HOST;
export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  // Enable static rendering
  setRequestLocale(locale);

  const t = useTranslations("Index");

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <Flex direction={"column"} justify={"center"} align={"center"}>
        {/* Hero Section */}
        <Section className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
          <Flex justify={"center"} align={"center"} direction={"column"}>
            <Heading as="h1" size={"7"} >
              {t("heroTitle")}
            </Heading>
            <Box p={"4"} >
              <Text size={"6"}> {t("heroSubtitle")}</Text>
            </Box>
            <a
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
              href="#designTool"
            >
              <Text size={"5"}> {t("getStarted")}</Text>
            </a>
          </Flex>
        </Section>

        {/* 工具栏 */}
        <Section p="4" className="md:w-2/3 w-full">
          <Flex justify={"between"} align={"center"} direction={"column"} gap={"2"}>
            <Heading as="h2" size={"6"}>
              {t("toolTitle")}
            </Heading>
            <Editor></Editor>
          </Flex>

        </Section>

        {/* Features Section */}
        <Section className="w-full py-16 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("featuresTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
                <h3 className="text-xl font-bold mb-3">{t("feature1Title")}</h3>
                <p className="text-gray-600">{t("feature1Desc")}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-amber-500">
                <h3 className="text-xl font-bold mb-3">{t("feature2Title")}</h3>
                <p className="text-gray-600">{t("feature2Desc")}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold mb-3">{t("feature3Title")}</h3>
                <p className="text-gray-600">{t("feature3Desc")}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Testimonials Section */}
        <Section className="w-full py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("testimonialsTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                <p className="text-gray-600 mb-4">"{t("testimonial1Text")}"</p>
                <p className="font-semibold">- {t("testimonial1Author")}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                <p className="text-gray-600 mb-4">"{t("testimonial2Text")}"</p>
                <p className="font-semibold">- {t("testimonial2Author")}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        <section className="w-full py-16 bg-blue-600 text-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">{t("ctaTitle")}</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">{t("ctaSubtitle")}</p>
            <a
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
              href="#designTool"
            >
              {t("ctaButton")}
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t("faqTitle")}
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold mb-2">{t("faqQuestion1")}</h3>
                <p className="text-gray-600">{t("faqAnswer1")}</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold mb-2">{t("faqQuestion2")}</h3>
                <p className="text-gray-600">{t("faqAnswer2")}</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-xl font-bold mb-2">{t("faqQuestion3")}</h3>
                <p className="text-gray-600">{t("faqAnswer3")}</p>
              </div>
            </div>
          </div>
        </section>
      </Flex>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
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
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    // keywords: t("keywords"),
    // other: {
    //   "google-site-verification": "sVYBYfSJfXdBca3QoqsZtD6lsWVH6sk02RCH4YAbcm8",
    // },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: host,
      siteName: "screen customization",
      images: [
        {
          url: `${host}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${host}/og-image.png`],
      creator: "@s0ver5",
    },
    alternates: {
      canonical: `${host}`,
      languages: {
        en: `${host}/en`,
        zh: `${host}/zh`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
