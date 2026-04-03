import { Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import img from "../Create-3D-Text-with-the-Barbie-Font/1024_576.png";

export default function Page() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Heading as="h1" size="7" mb="4" className="text-center">
        How to Design a Sports Team Name in 3D
      </Heading>

      <Flex justify={"center"}>
        <Image src={img} alt="Sports team name tutorial preview" width={1024} height={576} />
      </Flex>

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
            Start from the <Link href="/en/styles/sports-flame">Sports Logo 3D Text Generator</Link>.
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
        <Link href="/en/styles/sports-flame">sports-flame template</Link> and edit the wording.
      </Text>
    </Flex>
  );
}
