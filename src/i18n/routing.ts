import { defineRouting } from "next-intl/routing";
import { Locales } from "./config";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Locales,

  // Used when no locale matches
  defaultLocale: "en",
  localeDetection: true,
  //to remove the locale prefix from the url
  localePrefix: "never",
});
