import { Heading, Link as RadixLink } from "@radix-ui/themes";
import { useTranslations } from "@/lib/i18n/use-translations";
import { LocaleLink } from "@/lib/i18n/navigation";

export default function Footer() {
  const f = useTranslations("Footer");
  const t = useTranslations("Header");

  return (
    <footer className="w-full border-t border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/95">
      <div className="mx-auto flex w-full flex-col items-center gap-2 p-2">
        <div className="flex w-full flex-wrap justify-center gap-8 align-top">
          {/* Tools */}
          <div className="flex flex-col gap-2">
            <Heading as="h2" size="4" className="text-base font-semibold">
              Tools
            </Heading>
            <LocaleLink
              to="/editor"
              className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400"
            >
              {t("editorName")}
            </LocaleLink>
            <LocaleLink
              to="/styles"
              className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400"
            >
              {t("styleName")}
            </LocaleLink>
            <LocaleLink
              to="/blogs"
              className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400"
            >
              {t("blogName")}
            </LocaleLink>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-2">
            <Heading as="h2" size="4" className="text-base font-semibold">
              Resources
            </Heading>
            <LocaleLink
              to="/do-not-write-on-this-page"
              className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400"
            >
              {f("specialGenerator")}
            </LocaleLink>
          </div>

          {/* Other links */}
          <div className="flex flex-col gap-2">
            <Heading as="h2" size="4" className="text-base font-semibold">
              Other Links
            </Heading>
            <RadixLink
              href="https://uiuxdeck.com/"
              target="_blank"
              className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400"
            >
              UIUXDECK
            </RadixLink>
            <RadixLink
              href="https://twelve.tools"
              target="_blank"
              className="text-sm text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400"
            >
              {/* next/image dropped — plain <img> since unoptimized was set anyway */}
              <img
                src="https://twelve.tools/badge0-white.svg"
                alt="Featured on Twelve Tools"
                width={100}
                height={28}
              />
            </RadixLink>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {f("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
