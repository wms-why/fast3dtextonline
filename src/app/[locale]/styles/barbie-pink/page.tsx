import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { StyleItem } from '../list';
import { Locales } from '@/i18n/config';
import { Metadata } from 'next';
import { Box, Flex, Container, Heading, Text, Button, Strong } from '@radix-ui/themes';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import highCover from "./1024_576.png";
import cover from "./512_288.png";
const host = process.env.NEXT_PUBLIC_HOST;

export const styleContent = {
  id: "barbie-pink",
  cover: cover,
  date: "2025-08-07",
  en: {
    title: "Barbie-Pink 3D Text",
    summary: "Use our online 3D text editor to craft eye-catching Barbie-inspired designs.",
  },
  zh: {
    title: "芭比粉3D文本",
    summary: "使用我们的在线3D文本编辑器，为项目创建引人注目的芭比粉3D文本。",
  },
} satisfies StyleItem;

export default function BarbiePinkLandingPage() {
  const t = useTranslations('StyleBarbie');
  const common = useTranslations('StylePage');
  const locale = useLocale();

  return (
    <Flex direction={"column"} >
      <Header />
      <Flex justify={"center"} width={"full"} p={"4"} style={{ backgroundColor: 'var(--pink-3)' }}>
        <Flex className="min-h-screen" direction={"column"} gap={"3"}>
          <Flex justify="center" p="4">
            <Image
              src={highCover}
              alt="3D Barbie Text Example"
              width={300}
              height={169}
              style={{ borderRadius: 'var(--radius-3)', boxShadow: 'var(--shadow-4)' }}
            />
          </Flex>
          <Container>
            <Flex direction="column" align="center" gap="4">
              <Heading as='h1' size="8" align="center">{t('title')}</Heading>
              <Text size="5" align="center">{t('description')}</Text>
            </Flex>
          </Container>

          <Container className='text-center'>
            <Heading as='h2' size="5" mb="4" >{t('templateTitle')}</Heading>
            <Flex gap={"2"} direction={"column"} >
              <Flex gap={"2"} justify={"center"}>
                <Text className='font-bold'>{common("templateFontLabel")}:</Text>
                <Text size="3">{t('templateFont')}</Text>
              </Flex>
              <Flex gap={"2"} justify={"center"}>
                <Text className='font-bold'>{common("templateBgColorLabel")}:</Text>
                <Text size="3">{t('templateBgColor')}</Text>
              </Flex>
              <Flex gap={"2"} justify={"center"}>
                <Text className='font-bold'>{common("templateTextGradientColorLabel")}:</Text>
                <Text size="3">{t('templateTextGradient')}</Text>
              </Flex>
            </Flex>
          </Container>

          <Container className='text-center'>
            <Heading as='h2' size="6" mb="4">{t('tipsTitle')}</Heading>
            <Text as="p" mb="4">{t('content1')}</Text>
            <Text as="p" mb="4">{t('content2')}</Text>
          </Container>

          <Flex direction={"column"} gap={"2"} justify={"center"} align={"center"}>

            <Button size="3" asChild >
              <a href={`/${locale}/editor/U2FsdGVkX19rP8xCyBPFUL%2FO0fDre3wZBjUP%2FxsyN60rkJvZFHgAhV1OIq3LX7XhLRacG0NzByrl7Xt1t9tAt2PO8UkFCRk7fABsu7HlfxSyIYeE%2Bp6ikdiqfIO%2BNEzNxx3GzasHxdw1FxEaOtZcspT8hIWpxb59WXsJ%2BvheZpiZV8N%2FqYZTUMSWD0GYX1AOi6bWV%2BmTHp8hRJzko1SfrWWX5%2F9NxCrxYeAhFpXxH%2FFKtt3EAlg4XDrvjsqIvX%2FDbESOv7reY3HYydZnBFKbGdALPqNiIuHxcMpChrIqxSebNhKbBVDOy24yAR7aYBNuZYN1BHZCV9tpa3tfzy2B6dVaW80zNBSBpypi7foPYVQDJ8K9QggnWHXqED4V65LSApKoCcm56W1A%2BP%2BMWKmMJw%3D%3D`}>{t('cta')}</a>
            </Button>

            <Button size="3" variant="soft" asChild>
              <a href={`/${locale}/editor/U2FsdGVkX1%2BitOSouauvY7pzI7LQf%2BxXMLoslpg1yqvA1SCE53KtvcsLe5lHk9HUQ7TDbae9MMFc%2F%2FiNYT7sUyftCN2UgjelVSqfUYI9gk%2FlFCnTkuzd4iPPWqaOR5fwoxHkebMnqBTOfi%2F6vJBc2i0ujKQDgGB%2Byny1ygk60%2F0P65eR6wTMPWCU5mTVa7ZDGYKl7uFUMipmu3c2nirDn%2BWzHQBQoGH9xvxWNhqlbM0oZLY8fMSJT%2FpZ1RjVZ785pAUP5wFMUc5yJhvBLs6C8uLYaGjilqTfJn5NflecZZ3vgG%2FZv0TWgrRoScM1OmvQhIDiAnXCGjFQ3Ek2s6otpXf%2FG0OPTPMqx964F4iqgvfrOuZGY5q4DwWr48tVKjrORmgOPqC846MvaQxWCvpnVQ%3D%3D`}>you can also try <Strong>Barbie_Doll</Strong></a>
            </Button>

            <Button size="3" variant="soft" asChild>
              <a href={`/${locale}/editor/U2FsdGVkX1%2FIkxznkprehHz%2FtkJbwnqS3IzlVZhN9HOq%2Fv2IB9gBj2ZPWnR1879R1bYzi5iy77X%2B9tGWnZO0p%2BxtjCwQcYLij%2BFc8VcJafJLvErwByaUlZCKqEjnZ1rKqxO1EsiJdBKJFjRE0PsgUqk5E2kM6LaO03jpXk7D1zey3pYfWsj5%2FjZxLdtD5w146bmMwI7ygRik9wFxlizZV%2BrYlzCoB7lqSDb9%2FkvH2ZqAV72TFCwSLqLGm%2B%2FnGs7VlOro%2FPU99jgxVKnNQpZz7lIaCt30qgZC3i6UCftQt00TrxzlGwSIA0iG8w2GnV2%2BAzrjje1JOgp%2Bg8onEuuMzMIxpxjzjrdhDSHzxyErt3Ag2Sk2jKvkFy0R%2FDT2H5GHitpPSTBWJVFi0lc5zAdoaDfeIKX%2BULZUXYzErDuOB3U%3D`}>you can also try <Strong>Barbie_Princess</Strong></a>
            </Button>

          </Flex>
        </Flex>

      </Flex>
      <Footer />
    </Flex>

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
  const name = styleContent.id;
  const title = styleContent[locale as "en" | "zh"].title;
  const description = styleContent[locale as "en" | "zh"].summary;
  return {
    title,
    description,
    keywords: [],
    openGraph: {
      title,
      description,
      url: `${host}/${locale}/styles/${name}`,
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
      canonical: `${host}/styles/${name}`,
      languages: {
        en: `${host}/en/styles/${name}`,
        zh: `${host}/zh/styles/${name}`,
      },
    },
  };
}
