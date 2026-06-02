import { Locales } from "@/i18n/config";
import { MetadataRoute } from "next";
import { blogs } from "./[locale]/blogs/list";
import { styles } from "./[locale]/styles/list";
import { fontThemes } from "@/lib/font-presets";
import { scenes } from "@/lib/scene-presets";
import { namePresets } from "@/lib/name-presets";
import { holidays } from "@/lib/holiday-presets";
import { industries } from "@/lib/industry-presets";
import { getHost } from "@/lib/utils";

const host = getHost();
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = host;
  const locales = Locales;

  const urls = ["/", "/blogs", "/editor", "/styles", "/fonts", "/logo", "/holiday", "/industry"];
  blogs.forEach((blog) => {
    urls.push(`/blogs/${blog.id}`);
  });
  styles.forEach((style) => {
    urls.push(`/styles/${style.id}`);
  });
  fontThemes.forEach((f) => {
    urls.push(`/fonts/${f.slug}`);
  });
  scenes.forEach((s) => {
    urls.push(`/logo/${s.slug}`);
  });
  namePresets.forEach((n) => {
    urls.push(`/name/${n.name}`);
  });
  holidays.forEach((h) => {
    urls.push(`/holiday/${h.slug}`);
  });
  industries.forEach((i) => {
    urls.push(`/industry/${i.slug}`);
  });

  const multiLocaleUrls = locales
    .map((locale) =>
      urls
        // /name entries are locale-scoped (en names don't show in /zh)
        .filter((url) => {
          if (url.startsWith("/name/")) {
            const slug = url.split("/")[2];
            const preset = namePresets.find((n) => n.name === slug);
            return preset ? preset.locale === locale : false;
          }
          return true;
        })
        .map((url) => ({
          url: `${baseUrl}/${locale}${url}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        }))
    )
    .flat();

  return [
    ...urls.map((url) => ({
      url: `${baseUrl}${url}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    })),
    ...multiLocaleUrls,
  ];
}
