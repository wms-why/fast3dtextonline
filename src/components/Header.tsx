import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { ModeToggle } from "./ModeToggle";
import { Box, Flex, Link, Strong, Text } from "@radix-ui/themes";

export default function Header() {
  const t = useTranslations("Index");
  return (
    <header className="w-full py-2 border-b-1 ">
      <Flex justify="center" gap="9" align="center">
        <Box className="w-1/4 text-center" >
          <a href="/" >
            <Text size="6" color="iris"><Strong>{t("appName")}</Strong></Text>
          </a>
        </Box >

        <Flex gap={"4"} justify={"center"} align={"center"} className="w-1/2">
          <Link
            href="/editor"
          >
            Editor
          </Link>
        </Flex>

        <Flex align="center" gap="4" className="w-1/4">
          <LanguageSwitcher />
          <ModeToggle />
        </Flex>
      </Flex>
    </header>
  );
}
