// /blogs/:id — generic blog post page. Renders the cover image, title,
// date, and a locale-specific body (from `app/blogs-content/{id}/`), with
// a back-link to /blogs.
import { createElement } from "react";
import { Box, Heading, Text } from "@radix-ui/themes";
import { LocaleLink } from "@/lib/i18n/navigation";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { getBlogById } from "@/lib/presets/blog-list";
import { getBlogBody } from "@/blogs-content";
import { buildSeoMeta } from "@/lib/seo/meta";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/ogImage";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/blogs-id";

/** Derive keyword tokens from a blog title for SEO. Lowercase the title,
 *  strip punctuation, drop common stopwords, then keep the longest unique
 *  ngrams up to a reasonable cap. */
function deriveBlogKeywords(title: string, locale: Locale): string[] {
  const base =
    locale === "zh"
      ? ["3D 文字教程", "3D 字体 how-to", "透明 PNG", "在线 3D 文字"]
      : ["3d text tutorial", "3d text how-to", "transparent png", "online 3d text"];
  // Add the title itself as a phrase keyword (helps long-tail).
  return [title, ...base];
}

export function meta({ params, location }: Route.MetaArgs) {
  const id = params.id ?? "";
  const blog = getBlogById(id);
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  if (!blog) {
    return [
      { title: locale === "zh" ? "未找到博客文章" : "Blog post not found" },
      { name: "robots", content: "noindex, follow" },
    ];
  }
  const copy = blog[locale];
  return buildSeoMeta({
    title: copy.title,
    description: copy.summary,
    keywords: deriveBlogKeywords(copy.title, locale),
    ogImage: blog.coverImage ?? DEFAULT_OG_IMAGE,
    locale,
    pathname: location.pathname,
    ogType: "article",
  });
}

export default function BlogPostPage({ params }: Route.ComponentProps) {
  const blog = params.id ? getBlogById(params.id) : undefined;
  const locale = useLocale();
  const t = useTranslations("BlogPage");

  if (!blog) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <Heading as="h1" size="6">
          {t("notFound")}
        </Heading>
        <LocaleLink to="/blogs" className="mt-4 inline-block text-violet-600">
          ← {t("backToList")}
        </LocaleLink>
      </div>
    );
  }

  const copy = blog[locale];
  const Body = getBlogBody(blog.id, locale);
  const coverAlt = `${copy.title} — 3D text cover with transparent background PNG`;

  return (
    <div className="flex justify-center">
      <Box className="w-full md:w-2/3">
        <article className="prose dark:prose-invert mx-auto p-6">
          <Heading as="h1" size="7" mb="2" className="text-center">
            {copy.title}
          </Heading>
          <Text color="gray" size="2" className="mb-6 block text-center">
            {blog.date}
          </Text>
          <img
            src={blog.coverImage}
            alt={coverAlt}
            width={1200}
            height={630}
            loading="lazy"
            className="mb-6 h-auto w-full rounded-lg"
          />
          {Body ? (
            createElement(Body)
          ) : (
            <p className="text-sm text-gray-500">{t("contentPlaceholder")}</p>
          )}
          <div className="mt-8 border-t pt-4">
            <LocaleLink to="/blogs" className="text-violet-600 dark:text-violet-400">
              ← {t("backToList")}
            </LocaleLink>
          </div>
        </article>
      </Box>
    </div>
  );
}
