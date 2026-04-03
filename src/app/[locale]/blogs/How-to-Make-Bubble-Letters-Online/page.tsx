import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box, Flex } from "@radix-ui/themes";
import { useLocale } from "next-intl";
import { Locales } from "@/i18n/config";
import { Metadata } from "next";
import { Blog } from "./data";
import En from "./en";
import Zh from "./zh";

export default function Page() {
  const locale = useLocale() as "en" | "zh";

  return (
    <Flex direction={"column"} gap={"4"}>
      <Header />
      <Flex justify={"center"}>
        <Box className="md:w-2/3 w-full">
          {locale === "en" && <En />}
          {locale === "zh" && <Zh />}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
}

const host = process.env.NEXT_PUBLIC_HOST;
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
  const name = Blog.id;
  const title = Blog[locale as "en" | "zh"].title;
  const description = Blog[locale as "en" | "zh"].summary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${host}/${locale}/blogs/${name}`,
      images: [
        {
          url: `${host}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${host}/og-image.png`],
    },
    alternates: {
      canonical: `${host}/blogs/${name}`,
      languages: {
        en: `${host}/en/blogs/${name}`,
        zh: `${host}/zh/blogs/${name}`,
      },
    },
  };
}
