import { Box, Container, Flex, Heading, Link, Section } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

export default function Footer() {
  const f = useTranslations("Footer");

  return (
    <footer className="w-full border-t backdrop-blur-sm bg-background/95 ">
      <Flex justify={"between"} align={"center"} direction={"column"} gap={"2"} p="2">
        <Flex justify={"center"} gap={"8"} className="w-full">

          <Flex gap={"2"} direction={"column"}>
            <Heading as="h2" size="4">Tools</Heading>
            <Link
              href="/editor"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Editor
            </Link>
          </Flex>

          <Flex gap={"2"} direction={"column"}>
            <Heading as="h2" size="4">Resources</Heading>
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
          </Flex>
        </Flex>


        <Box className="text-sm text-muted-foreground">
          {f("copyright", { year: new Date().getFullYear() })}
        </Box>
      </Flex>
    </footer>
  );
}
