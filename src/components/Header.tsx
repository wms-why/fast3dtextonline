import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { ModeToggle } from "./ModeToggle";
import { Box, Flex, Link, Strong, Text } from "@radix-ui/themes";

export default function Header() {

  const t = useTranslations("Header");
  const locale = useLocale();

  return (
    <header className="w-full py-2 border-b-1 ">
      <Flex justify="center" gap="9" align="center">
        <Box className="w-1/4 text-center" >
          <a href={`/${locale}`} >
            <Text size="6" color="iris"><Strong>{t("appName")}</Strong></Text>
          </a>
        </Box >
        <Flex gap={"4"} justify={"center"} align={"center"} className="w-1/2">
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

        <Flex align="center" gap="4" className="w-1/4">
          <LanguageSwitcher />
          <ModeToggle />
        </Flex>
      </Flex>
    </header>
  );
}
