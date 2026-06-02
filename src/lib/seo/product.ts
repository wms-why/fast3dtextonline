import { getHost } from "@/lib/utils";
import type { StylePreset } from "@/lib/style-presets";
import { getLocalizedStyle } from "@/lib/style-presets";

export function generateProductJsonLd(
  style: StylePreset,
  locale: "en" | "zh",
) {
  const copy = getLocalizedStyle(style, locale);
  const host = getHost();
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: copy.title,
    description: copy.description,
    image: `${host}/styles/${style.slug}/1024_576.png`,
    brand: { "@type": "Brand", name: "3D Text Generator" },
    category: "3D Typography",
    keywords: style.keywords.join(", "),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${host}/${locale}/styles/${style.slug}`,
  };
}

/**
 * Generic CreativeWork JSON-LD for non-product landing pages (font themes, scenes,
 * names, holidays, industries). `name`/`description` are localized.
 */
export function generateCreativeWorkJsonLd(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  keywords: string[];
  category: string;
}) {
  const host = getHost();
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image ?? `${host}/og-image.png`,
    keywords: input.keywords.join(", "),
    about: input.category,
    creator: { "@type": "Organization", name: "3D Text Generator" },
    publisher: { "@type": "Organization", name: "3D Text Generator" },
  };
}
