import { Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import img from "../../styles/barbie-pink/1024_576.png";

export default function Page() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Heading as="h1" size="7" mb="4" className="text-center">
        How to Make Bubble Letters Online
      </Heading>

      <Flex justify={"center"}>
        <Image src={img} alt="Bubble letters style preview" width={1024} height={576} />
      </Flex>

      <Text as="p">
        Bubble letters work because they feel soft, friendly, and easy to notice. If you need a
        title for a birthday card, kids poster, sticker pack, or cute logo mockup, the fastest
        route is to start with a ready-made bubble style and then edit the words.
      </Text>

      <Card size="3">
        <Flex direction={"column"} gap={"3"}>
          <Heading as="h2" size="5">
            Fast workflow
          </Heading>
          <Text as="p">
            1. Open the{" "}
            <Link href="/en/styles/bubble-letters">Bubble Letters 3D Text Generator</Link>.
          </Text>
          <Text as="p">2. Replace the sample words with your own title.</Text>
          <Text as="p">
            3. Keep the rounded gradient, or tweak the background and shadow in the editor.
          </Text>
          <Text as="p">4. Export PNG for your poster, thumbnail, or social graphic.</Text>
        </Flex>
      </Card>

      <Heading as="h2" size="5">
        What makes bubble letters read well
      </Heading>
      <Text as="p">
        Rounded letter shapes are easiest to scan when the fill is bright and the shadow stays
        soft. Avoid narrow fonts. Short words usually look stronger than long phrases, especially
        on mobile thumbnails.
      </Text>

      <Heading as="h2" size="5">
        Good use cases
      </Heading>
      <Text as="p">
        Bubble text works especially well for birthday invitations, classroom displays, playful
        YouTube covers, and product graphics aimed at kids or teens.
      </Text>

      <Text as="p">
        If you want a faster starting point, open the{" "}
        <Link href="/en/styles/bubble-letters">bubble letters template</Link> and customize from
        there instead of building the style manually.
      </Text>
    </Flex>
  );
}
