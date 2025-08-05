import { Locales } from "@/i18n/config";
import { MetadataRoute } from "next";

const host = process.env.NEXT_PUBLIC_HOST;
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = host!;
  const locales = Locales;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: baseUrl + "/editor",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/editor`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: baseUrl + "/do-not-write-on-this-page",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/do-not-write-on-this-page`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    {
      url: baseUrl + "/blogs",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blogs`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    {
      url: baseUrl + "/blogs/Create-3D-Text-with-the-Barbie-Font",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blogs/Create-3D-Text-with-the-Barbie-Font`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
