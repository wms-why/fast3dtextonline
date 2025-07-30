import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { ModeToggle } from "./ModeToggle";
import { Box, Flex, Link, Strong, Text } from "@radix-ui/themes";

export default function Header() {
  const t = useTranslations("Index");
  return (
    <header className="w-full py-2">
      <Flex justify="center" gap="9" align="center">
        <Box >
          <a href="/" >
            <Text size="6" color="iris"><Strong>{t("appName")}</Strong></Text>
          </a>
        </Box >

        <Flex gap={"4"} justify={"between"} align={"center"}>
          <Link
            href="/black-screen"
          >
            Black Screen
          </Link>
          <Link
            href="/white-screen"
          >
            White Screen
          </Link>
          <Link
            href="/do-not-write-on-this-page"
          >
            Do Not Write On This Page
          </Link>
        </Flex>

        <Flex align="center" gap="4">
          <LanguageSwitcher />
          <ModeToggle />
        </Flex>
      </Flex>
    </header>
  );
}
