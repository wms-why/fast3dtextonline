import { Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import img from "../Create-3D-Letters/1024_576.png";

export default function Page() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Heading as="h1" size="7" mb="4" className="text-center">
        How to Create Ice Text for Posters and Thumbnails
      </Heading>

      <Flex justify={"center"}>
        <Image src={img} alt="Ice text tutorial preview" width={1024} height={576} />
      </Flex>

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
            Start with the <Link href="/en/styles/ice-frost">Ice Text 3D Generator</Link> so the
            gradient, shadow, and background already match.
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
        <Link href="/en/styles/ice-frost">ice-frost style page</Link> and edit from there.
      </Text>
    </Flex>
  );
}
