"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Locales } from "@/i18n/config";
import { Button, DropdownMenu } from "@radix-ui/themes";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="))
        ?.split("=")[1] || "en";
    setCurrentLanguage(savedLanguage);

    const urlLanguage = pathname.split("/")[1];
    if (Locales.includes(urlLanguage)) {
      setCurrentLanguage(urlLanguage);
    }
  }, [pathname]);

  const changeLanguage = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
    document.cookie = `NEXT_LOCALE=${newLanguage}; path=/;`;

    const segments = pathname.split("/");
    if (Locales.includes(segments[1])) {
      segments[1] = newLanguage;
    } else {
      segments.splice(1, 0, newLanguage);
    }

    router.push(segments.join("/"));
    router.refresh();
  };

  const languageLabels = {
    en: "English",
    zh: "中文",
    // ar: "العربية",
    // es: "Español",
    // jp: "日本語",
  };

  const labels = [];
  for (let l in languageLabels) {
    const key = l as keyof typeof languageLabels;
    labels.push(
      <DropdownMenu.Item key={l} onClick={() => changeLanguage(l)}>
        {languageLabels[key]}
      </DropdownMenu.Item>
    );
  }

  return (
    <DropdownMenu.Root dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
      <DropdownMenu.Trigger >
        <Button variant="outline" size={"2"}>
          {languageLabels[currentLanguage as keyof typeof languageLabels]}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {labels}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default LanguageSwitcher;
