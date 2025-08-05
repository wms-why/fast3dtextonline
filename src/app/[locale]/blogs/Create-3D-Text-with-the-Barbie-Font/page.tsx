import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box, Flex, } from "@radix-ui/themes";
import { useLocale } from "next-intl";
import En from "./en";
import Zh from "./zh";
import { Locales } from "@/i18n/config";
import { Metadata } from "next";

export default function Page() {

  const locale = useLocale() as "en" | "zh";

  return (
    <Flex direction={"column"} gap={"4"}>
      <Header />
      <Flex justify={"center"} >

        <Box className="md:w-2/3 w-full">
          {locale == "en" && (<En></En>)}
          {locale == "zh" && (<Zh></Zh>)}
        </Box>

      </Flex>
      <Footer />
    </Flex>
  )
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

  const name = "Create-3D-Text-with-the-Barbie-Font";

  const title = "How to Create 3D Text with the Barbie Font (Free & Online Method)";
  const description = " Want to create stylish 3D text using the iconic Barbie font? In this tutorial, you'll learn how to generate 3D Barbie-style text using free online tools — no design experience needed.We'll show you how to download the Barbie font, convert it to a 3D-ready format, and render it with an intuitive online editor."
  return {
    title,
    description,
    keywords: [
      'barbie font 3d online',
      'barbie 3d text maker',
      'how to use barbie font',
      'barbie text generator free',
      'convert ttf to json font',
      'three.js custom font 3d',
      'fast3dtext tutorial'
    ],
    openGraph: {
      title,
      description,
      url: `${host}/${locale}/blogs/${name}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_HOST}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${process.env.NEXT_PUBLIC_HOST}/og-image.png`],
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
