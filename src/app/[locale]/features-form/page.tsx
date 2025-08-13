import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box, Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export default function Page() {

  return (

    <Flex direction={"column"} gap={"4"}>
      <Header />
      <Box p="4" className="text-center">
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeFbI-Bu-RsuYg1SP3_-L7wo5OOIfp5XR7H4E7jYgullaCm7g/viewform?embedded=true" className="w-full h-full" >Loading…</iframe>
      </Box>
      <Footer />
    </Flex>

  )
}

const host = process.env.NEXT_PUBLIC_HOST;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const name = "features-form";

  const title = "new features wanted";
  const description = title;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${host}/${locale}/${name}`,
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
      canonical: `${host}/${name}`,
      languages: {
        en: `${host}/en/${name}`,
        zh: `${host}/zh/${name}`,
      },
    },
  };
}