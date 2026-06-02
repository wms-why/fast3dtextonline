"use client";

import { Button, DropdownMenu } from "@radix-ui/themes";
import { useLocaleNavigate, useLocalePathname } from "@/lib/i18n/navigation";
import { useLocale } from "@/lib/i18n/use-locale";
import { Locales, type Locale } from "@/lib/i18n/config";

const LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const navigate = useLocaleNavigate();
  // `useLocalePathname` returns the "logical" pathname (locale prefix stripped).
  // We use the active locale as the destination, so we don't pass `locale` opt.
  const pathname = useLocalePathname();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" size="2">
          {LABELS[locale]}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {Locales.map((l) => (
          <DropdownMenu.Item
            key={l}
            disabled={l === locale}
            onClick={() => navigate(pathname, { locale: l })}
          >
            {LABELS[l]}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
