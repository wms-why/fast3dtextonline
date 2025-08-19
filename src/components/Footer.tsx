import { Box, Flex, Heading, Link } from "@radix-ui/themes";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
export default function Footer() {
  const f = useTranslations("Footer");
  const t = useTranslations("Header");

  const locale = useLocale();

  return (
    <footer className="w-full border-t backdrop-blur-sm bg-background/95 ">
      <Flex justify={"between"} align={"center"} direction={"column"} gap={"2"} p="2">
        <Flex justify={"center"} gap={"8"} className="w-full align-top" >

          <Flex gap={"2"} direction={"column"} >
            <Heading as="h2" size="4">Tools</Heading>
            <Link
              href={`/${locale}/editor`}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {t("editorName")}
            </Link>
            <Link
              href={`/${locale}/styles`}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {t("styleName")}
            </Link>
            <Link
              href={`/${locale}/blogs`}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {t("blogName")}
            </Link>
          </Flex>

          <Flex gap={"2"} direction={"column"} >
            <Heading as="h2" size="4">Resources</Heading>
            <Link
              href="https://gero3.github.io/facetype.js/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Converter: From .ttf To .json
            </Link>
            <Link
              href="/do-not-write-on-this-page"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Do Not Write On This Page
            </Link>
          </Flex>

          <Flex gap={"2"} direction={"column"}>
            <Heading as="h2" size="4">Other Links</Heading>

            <Link
              href="https://uiuxdeck.com/"
              className="text-sm text-muted-foreground hover:text-primary"
              target="_blank"
            >
              UIUXDECK
            </Link>

            <Link
              href="https://twelve.tools"
              className="text-sm text-muted-foreground hover:text-primary"
              target="_blank"
            >
              <Image src="https://twelve.tools/badge0-white.svg" alt="Featured on Twelve Tools" width={100} height={28} />
            </Link>
          </Flex>
        </Flex>


        <Box className="text-sm text-muted-foreground">
          {f("copyright", { year: new Date().getFullYear() })}
        </Box>
      </Flex>
    </footer>
  );
}
