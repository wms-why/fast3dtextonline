import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { StyleItem } from '../list';
import { Locales } from '@/i18n/config';
import { Metadata } from 'next';
import { Flex, Container, Heading, Text, Button, Strong, Grid, Card, AspectRatio, Link } from '@radix-ui/themes';
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

import barbieDollCover from "./doll_1024_576.png";
import barbiePrincessCover from "./princess_1024_576.png";

export default function BarbiePinkLandingPage() {
  const t = useTranslations('StyleBarbie');
  const common = useTranslations('StylePage');
  const locale = useLocale();

  const bartexUrl = `/${locale}/editor/U2FsdGVkX19rP8xCyBPFUL%2FO0fDre3wZBjUP%2FxsyN60rkJvZFHgAhV1OIq3LX7XhLRacG0NzByrl7Xt1t9tAt2PO8UkFCRk7fABsu7HlfxSyIYeE%2Bp6ikdiqfIO%2BNEzNxx3GzasHxdw1FxEaOtZcspT8hIWpxb59WXsJ%2BvheZpiZV8N%2FqYZTUMSWD0GYX1AOi6bWV%2BmTHp8hRJzko1SfrWWX5%2F9NxCrxYeAhFpXxH%2FFKtt3EAlg4XDrvjsqIvX%2FDbESOv7reY3HYydZnBFKbGdALPqNiIuHxcMpChrIqxSebNhKbBVDOy24yAR7aYBNuZYN1BHZCV9tpa3tfzy2B6dVaW80zNBSBpypi7foPYVQDJ8K9QggnWHXqED4V65LSApKoCcm56W1A%2BP%2BMWKmMJw%3D%3D`;

  const barbieDollUrl = `/${locale}/editor/U2FsdGVkX1%2BitOSouauvY7pzI7LQf%2BxXMLoslpg1yqvA1SCE53KtvcsLe5lHk9HUQ7TDbae9MMFc%2F%2FiNYT7sUyftCN2UgjelVSqfUYI9gk%2FlFCnTkuzd4iPPWqaOR5fwoxHkebMnqBTOfi%2F6vJBc2i0ujKQDgGB%2Byny1ygk60%2F0P65eR6wTMPWCU5mTVa7ZDGYKl7uFUMipmu3c2nirDn%2BWzHQBQoGH9xvxWNhqlbM0oZLY8fMSJT%2FpZ1RjVZ785pAUP5wFMUc5yJhvBLs6C8uLYaGjilqTfJn5NflecZZ3vgG%2FZv0TWgrRoScM1OmvQhIDiAnXCGjFQ3Ek2s6otpXf%2FG0OPTPMqx964F4iqgvfrOuZGY5q4DwWr48tVKjrORmgOPqC846MvaQxWCvpnVQ%3D%3D`;

  const barbiePrincessUrl = `/${locale}/editor/U2FsdGVkX18YLm8uhiMJ2gEHylVb6HTJf5PG%2FWZDgrDNcqwEWtbe8DUOw0f4p%2B7D5cavKO38McL8yEcS0VxT%2BPOZCDppFZlq876suw1AcfjmnY%2FWX4jnqRgLvdloOePU6gKKgbacfOmB9OJRoWkGIYBLkVhKXqm%2BrYAF4BaF9C3sbxxmD6KUZ2iMO9Tl4ar8%2BkFvdvWpBEJtytJ0Zh163PH7vAbB5Lv0KTR6RMD%2FmQYI56Og4T48jqt%2FJOmOcpcl%2B6h0nQAFLFG31uubMfLdnS9wPb2n7SDfJztW42r6ImQypNmKs6WP1%2FPh5KdsBl56Hvtyc29YHrCoNX80Ua6swOOQCcpGD2K5YbJUbn2MWnfgjxwXITdiE7kDl9hhkHnO15iUhkxKHRw2HEMfGVMw7QJ%2BWOzC45V4lyw6Y%2FtKjmo%3D`;

  return (
    <Flex direction={"column"} >
      <Header />
      <Flex justify={"center"} width={"full"} p={"4"} style={{ backgroundColor: 'var(--pink-3)' }}>
        <Flex className="min-h-screen" direction={"column"} gap={"3"} width="100%" maxWidth="1200px">
          <Container>
            <Flex direction="column" align="center" gap="4">
              <Heading as='h1' size="8" align="center">{t('title')}</Heading>
              <Text size="5" align="center">{t('description')}</Text>
            </Flex>
          </Container>

          {/* 新增示例展示区 */}
          <Container>
            <Heading as='h2' size="6" mb="4" align="center">{t('examplesTitle')}</Heading>
            <Grid columns="3" gap="4">
              <Card variant="classic">
                <Flex direction={"column"} justify={"center"} gap={"2"}>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={highCover}
                      alt={`Bartex Example`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </AspectRatio>

                  <Link href={bartexUrl} className='text-center'>  <Text size="3" >Bartex</Text></Link>
                </Flex>

              </Card>

              <Card variant="classic">
                <Flex direction={"column"} justify={"center"} gap={"2"}>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={barbieDollCover}
                      alt={`Barbie Doll Example`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </AspectRatio>

                  <Link href={barbieDollUrl} className='text-center'>  <Text size="3" >Barbie Doll</Text></Link>
                </Flex>

              </Card>

              <Card variant="classic">
                <Flex direction={"column"} justify={"center"} gap={"2"}>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={barbiePrincessCover}
                      alt={`Barbie Princess Example`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </AspectRatio>
                  <Link href={barbiePrincessUrl} className='text-center'>  <Text size="3" >Barbie Princess</Text></Link>
                </Flex>

              </Card>
            </Grid>
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

          <Flex direction={"column"} gap={"4"} justify={"center"} align={"center"} p="4">

            <Button size="3" asChild >
              <a href={bartexUrl}>{t('cta')}</a>
            </Button>

            <Button size="3" variant="soft" asChild>
              <a href={barbieDollUrl}>you can also try <Strong>Barbie_Doll</Strong></a>
            </Button>

            <Button size="3" variant="soft" asChild>
              <a href={barbiePrincessUrl}>you can also try <Strong>Barbie_Princess</Strong></a>
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
