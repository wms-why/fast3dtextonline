import { Locales } from "@/i18n/config";
import { MetadataRoute } from "next";
import { blogs } from "./[locale]/blogs/list";
import { styles } from "./[locale]/styles/list";

const host = process.env.NEXT_PUBLIC_HOST;
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = host!;
  const locales = Locales;

  const urls = ["/", "/blogs", "/editor", "/do-not-write-on-this-page"];
  blogs.forEach((blog) => {
    urls.push(`/blogs/${blog.id}`);
  });
  styles.forEach((style) => {
    urls.push(`/styles/${style.id}`);
  });

  const multiLocaleUrls = locales
    .map((locale) =>
      urls.map((url) => ({
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
