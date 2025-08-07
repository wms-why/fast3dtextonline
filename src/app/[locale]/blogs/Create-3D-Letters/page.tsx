import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box, Flex, } from "@radix-ui/themes";
import { useLocale } from "next-intl";
import En from "./en";
import Zh from "./zh";
import { Locales } from "@/i18n/config";
import { Metadata } from "next";
import Cover2 from "./512_288.png";

export const Blog = {
  id: "Create-3D-Letters",
  date: "2025-08-07",
  cover: Cover2,
  en: {
    title: "How to Create Stunning 3D Letters Online for Free",
    summary:
      "Learn how to create stunning 3D letters online using Fast3DText — a free 3D text generator. This step-by-step guide walks you through customizing fonts, colors, background, and 3D angles, then exporting high-quality 3D text images. No design skills required.",
  },
  zh: {
    title: "如何快速创建炫酷的 3D 字母图像（免安装）",
    summary:
      "本文教你如何使用 Fast3DText 在线生成个性化的 3D 字母 图像。通过输入文字、调整字体和颜色、操控三维视角，你可以一键导出高清立体文字图片，无需任何设计基础，适用于封面、海报和社交媒体内容。",
  },
};
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

  const name = Blog.id;
  const title = Blog[locale as "en" | "zh"].title;
  const description = Blog[locale as "en" | "zh"].summary;
  return {
    title,
    description,
    keywords: [],
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
