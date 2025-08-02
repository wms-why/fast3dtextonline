import { getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Editor from "@/components/SimpleEditor";
import { useTranslations } from "next-intl";
import { Locales } from "@/i18n/config";
import { Metadata } from "next";
import { Box, Flex, Heading, Section, Text } from "@radix-ui/themes";
const host = process.env.NEXT_PUBLIC_HOST;
export default function HomePage() {

  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <Flex direction={"column"} justify={"center"} align={"center"}>
        {/* Hero Section */}
        <Section className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
          <Flex justify={"center"} align={"center"} direction={"column"}>
            <Heading as="h1" size={"9"} >
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
          <Flex justify={"between"} align={"center"} direction={"column"} gap={"6"} p={"6"} id="designTool">
            <Heading as="h2" size={"8"}>
              {t("toolTitle")}
            </Heading>
            <Editor></Editor>
          </Flex>

        </Section>

        {/* Features Section */}
        <Section className="w-full py-16 bg-accent-3">
          <Flex direction={"column"} justify={"center"} align={"center"} gap={"6"} p={"6"}>
            <Heading as="h2" size={"8"} className="text-3xl font-bold text-center">
              {t("featuresTitle")}
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className=" p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
                <Heading as="h3" className="text-xl font-bold mb-3">{t("feature1Title")}</Heading>
                <p >{t("feature1Desc")}</p>
              </div>
              <div className="p-6 rounded-lg shadow-sm border-l-4 border-amber-500">
                <Heading as="h3" className="text-xl font-bold mb-3">{t("feature2Title")}</Heading>
                <p >{t("feature2Desc")}</p>
              </div>
              <div className=" p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                <Heading as="h3" className="text-xl font-bold mb-3">{t("feature3Title")}</Heading>
                <p >{t("feature3Desc")}</p>
              </div>
            </div>
          </Flex>
        </Section>

        {/* Testimonials Section */}
        <Section className="w-full py-16 bg-gray-2">
          <Flex direction={"column"} justify={"center"} align={"center"} gap={"6"} p={"6"}>
            <Heading as="h2" size={"8"} className="text-3xl font-bold text-center mb-12">
              {t("testimonialsTitle")}
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className=" p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                <p className=" mb-4">"{t("testimonial1Text")}"</p>
                <p className="font-semibold">- {t("testimonial1Author")}</p>
              </div>
              <div className=" p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                <p className=" mb-4">"{t("testimonial2Text")}"</p>
                <p className="font-semibold">- {t("testimonial2Author")}</p>
              </div>
            </div>
          </Flex>
        </Section>

        {/* CTA Section */}
        <Section className="w-full py-16 bg-blue-9 ">
          <Flex direction={"column"} justify={"center"} align={"center"} gap={"6"} p={"6"}>
            <Heading as="h2" size={"8"} className="text-3xl font-bold mb-6">{t("ctaTitle")}</Heading>
            <p className="text-xl mb-8 max-w-3xl mx-auto">{t("ctaSubtitle")}</p>
            <a
              className="  px-8 py-3 rounded-full font-bold text-lg bg-blue-300 hover:bg-blue-500 transition-colors dark:bg-gray-800 dark:hover:bg-gray-600"
              href="#designTool"
            >
              {t("ctaButton")}
            </a>
          </Flex>
        </Section>

        {/* FAQ Section */}
        <section className="w-full py-16 bg-panel">
          <Flex direction={"column"} justify={"center"} align={"center"} gap={"6"} p={"6"}>
            <Heading as="h2" size={"8"} className="text-3xl font-bold text-center mb-12">
              {t("faqTitle")}
            </Heading>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="border-b pb-4">
                <Heading as="h3" className="text-xl font-bold mb-2">{t("faqQuestion1")}</Heading>
                <p >{t("faqAnswer1")}</p>
              </div>
              <div className="border-b pb-4">
                <Heading as="h3" className="text-xl font-bold mb-2">{t("faqQuestion2")}</Heading>
                <p>{t("faqAnswer2")}</p>
              </div>
              <div className="border-b pb-4">
                <Heading as="h3" className="text-xl font-bold mb-2">{t("faqQuestion3")}</Heading>
                <p >{t("faqAnswer3")}</p>
              </div>
            </div>
          </Flex>
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
      creator: "Yaomker",
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
