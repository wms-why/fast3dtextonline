import { Box, Container, Flex, Link, Section } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

export default function Footer() {
  const f = useTranslations("Footer");

  return (
    <footer className="w-full border-t backdrop-blur-sm bg-background/95 ">
      <Flex justify={"between"} align={"center"} direction={"column"} gap={"2"} p="2">
        <Flex justify={"center"} gap={"4"}>
          <Link
            href="/black-screen"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Black Screen
          </Link>
          <Link
            href="/white-screen"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            White Screen
          </Link>
          <Link
            href="/do-not-write-on-this-page"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Do Not Write On This Page
          </Link>
        </Flex>
        <Box className="text-sm text-muted-foreground">
          {f("copyright", { year: new Date().getFullYear() })}
        </Box>
      </Flex>
    </footer>
  );
}
