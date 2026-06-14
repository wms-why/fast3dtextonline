import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { LocaleLink } from "@/lib/i18n/navigation";

export default function SportsTeamEn() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Text as="p">
        Sports text needs to feel compact, bold, and competitive. The easiest mistake is adding too
        many words. Team names usually look strongest when they stay short and sit on a dark
        background with warm highlights.
      </Text>

      <Card size="3">
        <Flex direction={"column"} gap={"3"}>
          <Heading as="h2" size="5">
            Practical setup
          </Heading>
          <Text as="p">
            Start from the{" "}
            <LocaleLink to="/styles/sports-flame" className="text-brand-500">
              Sports Logo 3D Text Generator
            </LocaleLink>
            .
          </Text>
          <Text as="p">Use a short team name or mascot word.</Text>
          <Text as="p">Keep orange, red, and gold gradients for energy.</Text>
          <Text as="p">Use the exported PNG on esports banners, match posters, or school team art.</Text>
        </Flex>
      </Card>

      <Heading as="h2" size="5">
        Where this style fits
      </Heading>
      <Text as="p">
        Sports-style 3D text is useful for esports teams, tournament graphics, fantasy league
        covers, school events, and competition promo images.
      </Text>

      <Text as="p">
        If you want to skip manual setup, open the{" "}
        <LocaleLink to="/styles/sports-flame" className="text-brand-500">
          sports-flame template
        </LocaleLink>{" "}
        and edit the wording.
      </Text>
    </Flex>
  );
}
