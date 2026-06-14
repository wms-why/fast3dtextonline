// /blogs list page. Each card shows the cover image (with a `transparent
// background PNG` keyword in the alt text for SEO), the locale-aware
// title, the date, and the summary. Cover images live in
// public/blogs/{id}/cover.svg and are registered on each BlogItem.
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { LocaleLink } from "@/lib/i18n/navigation";
import { blogs } from "@/lib/presets/blog-list";
import { buildSeoMeta } from "@/lib/seo/meta";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/ogImage";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/blogs-list";

export function meta({ location }: Route.MetaArgs) {
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const title =
    locale === "zh"
      ? "博客 — 3D 文字与透明 PNG 教程"
      : "Blog — 3D Text & Transparent PNG Tutorials";
  const description =
    locale === "zh"
      ? "3D 文字、透明 PNG 和设计资源的教程与 how-to。"
      : "Tutorials and how-tos for creating 3D text, transparent PNGs, and design assets.";
  const keywords =
    locale === "zh"
      ? ["3D 文字教程", "透明 PNG 教程", "3D 字体 how-to", "3D 设计博客"]
      : [
          "3d text tutorial",
          "transparent png tutorial",
          "3d font how-to",
          "3d design blog",
        ];
  return buildSeoMeta({
    title,
    description,
    keywords,
    ogImage: DEFAULT_OG_IMAGE,
    locale,
    pathname: location.pathname,
  });
}

export default function BlogsListPage() {
  const t = useTranslations("BlogPage");
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-4">
      <Box p="4" className="text-center">
        <Heading as="h1" size="7" mb="4">
          {t("title")}
        </Heading>
        <Flex justify="center" gap="4" wrap="wrap">
          {blogs.map((blog) => {
            const copy = blog[locale];
            const coverAlt = `${copy.title} — 3D text cover with transparent background PNG`;
            return (
              <Card
                key={blog.id}
                size="2"
                mx="4"
                my="4"
                style={{
                  maxWidth: 300,
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
              >
                <LocaleLink
                  to={`/blogs/${blog.id}`}
                  className="flex flex-col gap-4 text-brand-500"
                >
                  <img
                    src={blog.coverImage}
                    alt={coverAlt}
                    width={1200}
                    height={630}
                    loading="lazy"
                    className="h-40 w-full rounded-t-[var(--radius-3)] object-cover"
                  />
                  <Flex direction="column" gap="1" px="3" pb="3">
                    <Heading
                      as="h2"
                      size="5"
                      weight="bold"
                      className="text-black dark:text-white"
                    >
                      {copy.title}
                    </Heading>
                    <Text color="gray">{blog.date}</Text>
                    <Text truncate>
                      {copy.summary}
                    </Text>
                  </Flex>
                </LocaleLink>
              </Card>
            );
          })}
        </Flex>
      </Box>
    </div>
  );
}
