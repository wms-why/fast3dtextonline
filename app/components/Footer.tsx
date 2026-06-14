import { Heading, Link as RadixLink } from "@radix-ui/themes";
import { useTranslations } from "@/lib/i18n/use-translations";
import { LocaleLink } from "@/lib/i18n/navigation";

export default function Footer() {
  const f = useTranslations("Footer");
  const t = useTranslations("Header");

  return (
    <footer className="w-full border-t border-border-subtle bg-surface-1/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full flex-col items-center gap-4 p-6">
        <div className="flex w-full flex-wrap justify-center gap-12 align-top">
          {/* Tools */}
          <div className="flex flex-col gap-2">
            <Heading as="h2" size="4" className="text-base font-semibold">
              Tools
            </Heading>
            <LocaleLink
              to="/editor"
              className="text-sm text-text-2 transition-colors hover:text-brand-500"
            >
              {t("editorName")}
            </LocaleLink>
            <LocaleLink
              to="/styles"
              className="text-sm text-text-2 transition-colors hover:text-brand-500"
            >
              {t("styleName")}
            </LocaleLink>
            <LocaleLink
              to="/blogs"
              className="text-sm text-text-2 transition-colors hover:text-brand-500"
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
              className="text-sm text-text-2 transition-colors hover:text-brand-500"
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
              className="text-sm text-text-2 transition-colors hover:text-brand-500"
            >
              UIUXDECK
            </RadixLink>
            <RadixLink
              href="https://twelve.tools"
              target="_blank"
              className="text-sm text-text-2 transition-colors hover:text-brand-500"
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

        <div className="text-sm text-text-3">
          {f("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
