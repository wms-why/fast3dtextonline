
import { BackgroundProp } from "@/components/common/BackgroundSelector";
import { TextProp } from "@/components/common/TextSetting";
import Footer from "@/components/Footer";
import FullEditor from "@/components/FullEditor";
import Header from "@/components/Header";
import { Locales } from "@/i18n/config";
import { Box, Container, Flex, Heading, Text, Card } from "@radix-ui/themes";
import { HelpCircle } from "lucide-react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
const host = process.env.NEXT_PUBLIC_HOST;
export default function Page() {

  return (<OnlyPage textProp={undefined} backgroundProp={undefined}></OnlyPage>)
}

export function OnlyPage({ textProp, backgroundProp }: { textProp: TextProp | undefined, backgroundProp: BackgroundProp | undefined }) {
  const t = useTranslations('TextEditor');

  return <Flex direction={"column"} gap={"4"}>
    <Header />
    <Heading as="h1" weight="bold" className="text-center">{t('title')}</Heading>
    <Container p="4">
      <FullEditor
        textProp={textProp}
        backgroundProp={backgroundProp}
      />
    </Container>
    <Container p="4">
      <Heading as="h2" weight="bold" className="text-center" mb="4">{t('faqTitle')}</Heading>
      <Flex direction="column" gap="3">
        <Card variant="surface">
          <Flex gap="3" align="center">
            <HelpCircle className="text-gray-11" size={16} />
            <Text size="3" weight="bold">{t('faqQuestion1')}</Text>
          </Flex>
          <Box pt="3" pl="6">
            <Text size="2" color="gray">{t('faqAnswer1')}</Text>
          </Box>
        </Card>
      </Flex>
    </Container>
    <Footer />
  </Flex>;
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
