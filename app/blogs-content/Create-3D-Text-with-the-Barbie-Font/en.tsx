import { Flex, Heading, Text } from "@radix-ui/themes";

export default function BarbieFontEn() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Text as="p" mb="4">
        Want to create stylish 3D text using the iconic Barbie font? In this tutorial, you'll learn how to generate 3D Barbie-style text using free online tools — no design experience needed.
        We'll show you how to download the Barbie font and upload the original TTF directly into the editor without converting it first.
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">Step 1: Download the Barbie Font (Free)</Heading>
      <Text as="p" mb="2">
        The first step is to get the official Barbie font file. You can download the Barbie Regular TTF from the reliable font repository below:
      </Text>
      <Flex direction="column" gap="2" mb="4">
        <a href="https://fontbolt.com/barbie-font" target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400">
          🔗 Download Barbie Font from FontBolt
        </a>
        <Text as="p" size="2">File format: .ttf (TrueType Font)</Text>
      </Flex>
      <Text as="p" mb="4">
        Make sure to save it to your local drive, as we'll use it in the next step.
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">Step 2: Upload the TTF Directly to the Editor</Heading>
      <Text as="p" mb="2">
        Fast3DText supports direct uploads for <code>.ttf</code>, <code>.otf</code>, and <code>.json</code> font files, so you can skip the old conversion step entirely.
      </Text>
      <Heading as="h3" size="4" mt="4" mb="2">Instructions:</Heading>
      <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
        <li>Open the editor on Fast3DText.</li>
        <li>Click "Upload Font".</li>
        <li>Select the <code>barbie.ttf</code> file you downloaded in Step 1.</li>
      </ul>

      <Heading as="h2" size="5" mt="6" mb="3">Step 3: Render the 3D Barbie Text Online</Heading>
      <Text as="p" mb="2">
        Once the font is uploaded, it's time to create your 3D Barbie text using this free online editor:
      </Text>
      <a href="/editor" target="_blank" rel="noopener noreferrer" className="text-violet-600 dark:text-violet-400" style={{ marginBottom: "16px", display: "inline-block" }}>
        🔗 Open the 3D Text Editor
      </a>

      <Heading as="h3" size="4" mt="4" mb="2">Steps:</Heading>
      <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
        <li>Go to the editor link above.</li>
        <li>Your uploaded font will appear in the font list automatically.</li>
        <li>Select it and enter your custom text (for example, "Barbie Dreamhouse").</li>
        <li>Customize color, size, depth, and lighting, then export your result.</li>
      </ul>
      <Text as="p" mb="4">
        Boom! You've just created 3D text with the Barbie font — all within minutes, using only free tools.
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">Conclusion</Heading>
      <Text as="p" mb="4">
        Creating 3D Barbie-style text doesn't require fancy software or design skills. With a few simple steps — download, upload, and customize — you can generate stunning 3D typography for websites, posters, or social media.
      </Text>
      <Text as="p" mb="4">
        Feel free to explore more fonts and styling options in the editor, or learn more about converting fonts for 3D rendering.
      </Text>
    </Flex>
  );
}
