export function generateWebAppJsonLd(host: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "3D Text Generator",
    alternateName: "Fast3DText",
    url: host,
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "18+ 3D text styles",
      "Transparent PNG export",
      "Real-time 3D preview",
      "Custom fonts (TTF / OTF / JSON upload)",
      "Shareable editor links",
      "English and Chinese",
    ],
    inLanguage: ["en", "zh"],
  };
}
