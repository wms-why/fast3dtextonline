import { stylePresets } from "@/lib/style-presets";

export const styles = stylePresets.map((style) => ({
  id: style.slug,
  date: "2026-03-17",
  en: {
    title: style.en.title,
    summary: style.en.summary,
  },
  zh: {
    title: style.zh.title,
    summary: style.zh.summary,
  },
}));
