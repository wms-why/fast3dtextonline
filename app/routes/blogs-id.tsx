// /blogs/:id — generic blog post page. Renders the title and a back-link
// to /blogs. The full blog content (currently in src/app/[locale]/blogs/{id}/
// as en.tsx + zh.tsx) will be wired in during Step 11 cleanup.
import { Box, Heading, Text } from "@radix-ui/themes";
import { LocaleLink } from "@/lib/i18n/navigation";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { getBlogById } from "@/lib/presets/blog-list";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/blogs-id";

export function meta({ params, location }: Route.MetaArgs) {
  const id = params.id ?? "";
  const blog = getBlogById(id);
  if (!blog) return [{ title: "Blog post not found" }];
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const copy = blog[locale];
  return [
    { title: copy.title },
    { name: "description", content: copy.summary },
  ];
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
          <p>{copy.summary}</p>
          <p className="mt-4 text-sm text-gray-500">
            {/* Full article content (en.tsx / zh.tsx) lands in Step 11 */}
            {t("contentPlaceholder")}
          </p>
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
