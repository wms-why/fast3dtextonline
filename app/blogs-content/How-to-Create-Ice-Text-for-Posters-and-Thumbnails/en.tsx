import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { LocaleLink } from "@/lib/i18n/navigation";

export default function IceTextEn() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Text as="p">
        Ice text usually works best when the background is pale, the highlights stay bright, and
        the wording is short. That gives the letters enough contrast to feel cold instead of flat.
      </Text>

      <Card size="3">
        <Flex direction={"column"} gap={"3"}>
          <Heading as="h2" size="5">
            Recommended setup
          </Heading>
          <Text as="p">
            Start with the{" "}
            <LocaleLink to="/styles/ice-frost" className="text-violet-600 dark:text-violet-400">
              Ice Text 3D Generator
            </LocaleLink>{" "}
            so the gradient, shadow, and background already match.
          </Text>
          <Text as="p">Use one to three words for the cleanest frozen effect.</Text>
          <Text as="p">Keep the palette in white, cyan, and light blue.</Text>
          <Text as="p">Export at a larger size if you plan to place the text on posters.</Text>
        </Flex>
      </Card>

      <Heading as="h2" size="5">
        Where ice text performs well
      </Heading>
      <Text as="p">
        This style fits winter event posters, gaming thumbnails, Christmas promos, and cold-themed
        social posts. It is also useful for seasonal product launches that need a clean frozen look.
      </Text>

      <Text as="p">
        For the fastest starting point, open the{" "}
        <LocaleLink to="/styles/ice-frost" className="text-violet-600 dark:text-violet-400">
          ice-frost style page
        </LocaleLink>{" "}
        and edit from there.
      </Text>
    </Flex>
  );
}
