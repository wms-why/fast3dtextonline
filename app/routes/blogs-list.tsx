// /blogs list page. Simplified — no cover images for now (Step 11 will
// re-introduce them as plain <img> from public/blogs/{id}/* assets).
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslations } from "@/lib/i18n/use-translations";
import { LocaleLink } from "@/lib/i18n/navigation";
import { blogs } from "@/lib/presets/blog-list";
import type { Route } from "./+types/blogs-list";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Blog — 3D Text Generator" },
    {
      name: "description",
      content:
        "Tutorials and how-tos for creating 3D text, transparent PNGs, and design assets.",
    },
  ];
}

export default function BlogsListPage() {
  const t = useTranslations("BlogPage");

  return (
    <div className="flex flex-col gap-4">
      <Box p="4" className="text-center">
        <Heading as="h1" size="7" mb="4">
          {t("title")}
        </Heading>
        <Flex justify="center" gap="4" wrap="wrap">
          {blogs.map((blog) => (
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
                className="flex flex-col gap-4 text-violet-600 dark:text-violet-400"
              >
                <Flex direction="column" gap="1">
                  <Heading
                    as="h2"
                    size="5"
                    weight="bold"
                    className="text-black dark:text-white"
                  >
                    {blog.en.title /* will be replaced with locale-aware lookup in Step 11 */}
                  </Heading>
                  <Text color="gray">{blog.date}</Text>
                  <Text truncate>
                    {blog.en.summary}
                  </Text>
                </Flex>
              </LocaleLink>
            </Card>
          ))}
        </Flex>
      </Box>
    </div>
  );
}
