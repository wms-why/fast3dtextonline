import { Flex, Heading, Link, Text } from "@radix-ui/themes";

export default function Create3DLettersEn() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Text as="p" mb="4">
        If you're looking to generate eye-catching <strong>3D letters</strong> for your design, presentation, or content project, you're in the right place. Here's a simple step-by-step guide using{" "}
        <a href="/editor" target="_blank" rel="noopener noreferrer" className="text-brand-500">
          Fast3DText
        </a>
        , a free online 3D text generator that lets you design and export high-quality 3D letter images with ease.
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">🎯 Steps to Create 3D Letters</Heading>

      <Heading as="h3" size="4" mt="4" mb="2">1. Open the Editor</Heading>
      <Text as="p" mb="4">
        Go to 👉 <a href="/editor" target="_blank" rel="noopener noreferrer" className="text-brand-500">/editor</a>
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">2. Enter Your Letters</Heading>
      <Text as="p" mb="4">
        Type the letters or words you want to turn into 3D. Separate each letter with a space to control individual layout.<br />
        Example: <code>F A S T</code>
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">3. Customize the Style</Heading>
      <Text as="p" mb="2">
        Choose your favorite:
      </Text>
      <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
        <li><strong>Font</strong>: Select from popular 3D-compatible fonts</li>
        <li><strong>Background</strong>: Solid, gradient, or transparent</li>
        <li><strong>Color</strong>: Solid fill, gradients, metallic tones, etc.</li>
      </ul>

      <Heading as="h3" size="4" mt="4" mb="2">4. Adjust the 3D View</Heading>
      <Text as="p" mb="4">
        Drag and rotate the scene to change the 3D angle. Make your letters pop with the perfect perspective.
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">5. Export Your Image</Heading>
      <Text as="p" mb="4">
        Click the <strong>Download</strong> button to save your 3D letters as a high-quality image (<code>.png</code>) with a transparent background.
      </Text>
    </Flex>
  );
}
