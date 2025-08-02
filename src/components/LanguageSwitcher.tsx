'use client';
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const locale = useLocale();


  const languageLabels = {
    en: "English",
    zh: "中文",
    // ar: "العربية",
    // es: "Español",
    // jp: "日本語",
  };

  const router = useRouter();
  const labels = [];
  for (let l in languageLabels) {
    const key = l as keyof typeof languageLabels;
    labels.push(
      <DropdownMenu.Item key={l} onClick={() => {
        if (l !== locale) {
          router.push(pathname, { locale: l });
        }
      }}>
        {languageLabels[key]}
      </DropdownMenu.Item>
    );
  }

  return (
    <DropdownMenu.Root dir={locale === "ar" ? "rtl" : "ltr"}>
      <DropdownMenu.Trigger >
        <Button variant="outline" size={"2"}>
          {languageLabels[locale as keyof typeof languageLabels]}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {labels}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default LanguageSwitcher;
