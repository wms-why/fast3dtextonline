import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Card, Flex, Text, Heading, Box, Link } from '@radix-ui/themes'
import { blogs } from './list'
import { useLocale, useTranslations } from 'next-intl';
import { Locales } from '@/i18n/config';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default function BlogListPage() {
  const locale = useLocale() as "zh" | "en";
  const t = useTranslations("BlogPage");


  return (
    <Flex direction={"column"} gap={"4"}>
      <Header />
      <Box p="4" className="text-center">
        <Heading as='h1' size="7" mb="4">{t("title")}</Heading>
        <Flex justify={"center"} gap={"4"} wrap={"wrap"}>
          {blogs.map(blog => (
            <Card key={blog.id} size="2" style={{ maxWidth: 300, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} mx="4" my="4">
              <Link href={`/${locale}/blogs/${blog.id}`} color='iris'>
                <Flex direction="column" gap="4">
                  <Box style={{ overflow: 'hidden' }}>
                    <Image src={blog.cover} alt={blog[locale].title} width={512} height={288} />
                  </Box>
                  <Flex direction={"column"} gap={"1"}>
                    <Heading as='h2' size="5" weight="bold" className='text-black dark:text-white'>{blog[locale].title}</Heading>
                    <Text color="gray" >{blog.date}</Text>
                    <Text truncate={true} >{blog[locale].summary}</Text>
                  </Flex>
                </Flex>
              </Link>
            </Card>
          ))}
        </Flex>
      </Box>
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
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  const name = "blogs";

  return {
    title: t("seoTitle"),
    description: t("seoDescription"),
    openGraph: {
      title: t("seoTitle"),
      description: t("seoDescription"),
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
      description: t("seoDescription"),
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
