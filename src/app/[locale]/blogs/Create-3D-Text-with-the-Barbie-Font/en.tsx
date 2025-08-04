import { Box, Heading, Text, Link, Flex } from '@radix-ui/themes';

export default function Page() {
  return (
    <Flex p="4" direction={"column"} justify={"start"} className='text-left'>
      <Heading as="h1" size="7" mb="4">How to Create 3D Text with the Barbie Font (Free & Online Method)</Heading>

      <Text as="p" mb="4">
        Want to create stylish 3D text using the iconic Barbie font? In this tutorial, you'll learn how to generate 3D Barbie-style text using free online tools — no design experience needed.
        We'll show you how to download the Barbie font, convert it to a 3D-ready format, and render it with an intuitive online editor.
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">Step 1: Download the Barbie Font (Free)</Heading>
      <Text as="p" mb="2">
        The first step is to get the official Barbie font file. You can download the Barbie Regular TTF from the reliable font repository below:
      </Text>
      <Flex direction="column" gap="2" mb="4">
        <Link href="https://fontbolt.com/barbie-font" target="_blank" rel="noopener noreferrer">🔗 Download Barbie Font from FontBolt</Link>
        <Text as="p" size="2">File format: .ttf (TrueType Font)</Text>
      </Flex>
      <Text as="p" mb="4">
        Make sure to save it to your local drive, as we'll use it in the next step.
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">Step 2: Convert the TTF to 3D-Ready JSON Format</Heading>
      <Text as="p" mb="2">
        To render 3D text on the web, we need to convert the .ttf file into a JSON format compatible with Three.js or web-based 3D editors.
      </Text>
      <Text as="p" mb="2">Use this online converter:</Text>
      <Link href="https://gero3.github.io/facetype.js/" target="_blank" rel="noopener noreferrer" mb="4">🔗 TTF to JSON Font Converter – facetype.js</Link>

      <Heading as="h3" size="4" mt="4" mb="2">Instructions:</Heading>
      <ul style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
        <li  >Open the facetype.js website.</li>
        <li  >Upload the barbie.ttf file.</li>
        <li >Click Download to get the converted .json file.</li>
      </ul>

      <Heading as="h2" size="5" mt="6" mb="3">Step 3: Render the 3D Barbie Text Online</Heading>
      <Text as="p" mb="2">
        Now that you have the .json font file, it's time to create your 3D Barbie text using this free online editor:
      </Text>
      <Link href="https://fast3dtext.com" target="_blank" rel="noopener noreferrer" mb="4">🔗 Open the 3D Text Editor – Fast3DText.com</Link>

      <Heading as="h3" size="4" mt="4" mb="2">Steps:</Heading>
      <ul style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
        <li  >Go to the editor link above.</li>
        <li  >Click "Upload Font" and select the JSON file you just downloaded.</li>
        <li  >Your font will appear in the font list — just select it.</li>
        <li >Enter your custom text (e.g., "Barbie Dreamhouse") and customize color, size, depth, and lighting.</li>
      </ul>
      <Text as="p" mb="4">
        Boom! You've just created 3D text with the Barbie font — all within minutes, using only free tools.
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">Conclusion</Heading>
      <Text as="p" mb="4">
        Creating 3D Barbie-style text doesn't require fancy software or design skills. With a few simple steps — download, convert, and upload — you can generate stunning 3D typography for websites, posters, or social media.
      </Text>
      <Text as="p" mb="4">
        Feel free to explore more fonts and styling options at Fast3DText.com, or learn more about converting fonts for 3D rendering.
      </Text>


    </Flex>
  );
}