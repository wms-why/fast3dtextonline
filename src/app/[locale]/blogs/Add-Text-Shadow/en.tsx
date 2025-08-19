import { Box, Heading, Text, Link, Flex } from '@radix-ui/themes';
import Image from 'next/image';
import img from "./1024_576.png";

export default function Page() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className='text-left'>
      <Heading as="h1" size="7" mb="4" className='text-center'>How to Add Stunning Text Shadow Effects to 3D Text Online</Heading>

      <Flex justify={"center"}>
        <Image src={img} alt="3D Text with Shadow Effect Example" width={1024} height={576} />
      </Flex>

      <Text as="p" mb="4">
        Want to make your <strong>3D text designs</strong> stand out with professional shadow effects? This comprehensive guide shows you how to easily add <strong>text shadow effects</strong> to your 3D text using <Link href="https://fast3dtext.com/editor" target="_blank" rel="noopener noreferrer">Fast3DText.com</Link> - the best free online 3D text generator with shadow capabilities.
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">🎯 Why Add Text Shadow Effects?</Heading>
      <Text as="p" mb="4">
        Text shadows add depth, dimension, and professionalism to your 3D designs. They create visual hierarchy, improve readability, and make your text pop against any background. Perfect for social media graphics, presentations, logos, and marketing materials.
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">🚀 Step-by-Step Guide to Adding Text Shadows</Heading>

      <Heading as="h3" size="4" mt="4" mb="2">1. Open the 3D Text Editor</Heading>
      <Text as="p" mb="4">
        Start by visiting 👉 <Link href="https://fast3dtext.com/editor" target="_blank" rel="noopener noreferrer">https://fast3dtext.com/editor</Link>
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">2. Enter Your Text Content</Heading>
      <Text as="p" mb="4">
        Type the text you want to transform into 3D with shadow effects. You can enter single words, phrases, or multiple words separated by spaces for individual control.
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">3. Customize Basic Settings</Heading>
      <Text as="p" mb="2">
        Set up your foundation:
      </Text>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li><strong>Background</strong>: Choose solid colors, gradients, or transparent background</li>
        <li><strong>Font</strong>: Select from various 3D-compatible fonts</li>
        <li><strong>Text Color</strong>: Pick your main text color</li>
      </ul>

      <Heading as="h3" size="4" mt="4" mb="2">4. Enable Shadow Effects</Heading>
      <Text as="p" mb="4">
        This is the key step! Navigate to the <strong>Effect panel</strong> and toggle on the <strong>Shadow switch</strong>. This activates the shadow functionality for your 3D text.
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">5. Choose Your Shadow Color</Heading>
      <Text as="p" mb="4">
        Select the perfect shadow color that complements your text. You can choose:
      </Text>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li><strong>Matching colors</strong> for subtle effects</li>
        <li><strong>Contrasting colors</strong> for dramatic impact</li>
        <li><strong>Dark shadows</strong> for traditional depth effects</li>
        <li><strong>Colored shadows</strong> for creative designs</li>
      </ul>

      <Heading as="h3" size="4" mt="4" mb="2">6. Adjust 3D Perspective</Heading>
      <Text as="p" mb="4">
        Drag and rotate the 3D scene to find the perfect angle that showcases your shadow effect. The shadow will dynamically adjust based on your 3D viewpoint.
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">7. Download Your Creation</Heading>
      <Text as="p" mb="4">
        Click the <strong>Download button</strong> to save your 3D text with shadow effects as a high-quality PNG image. Ready to use in your projects!
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">💡 Pro Tips for Best Results</Heading>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>Use darker shadow colors for more pronounced effects</li>
        <li>Experiment with different shadow intensities</li>
        <li>Consider your background color when choosing shadow colors</li>
        <li>Try multiple angles to find the most flattering shadow presentation</li>
      </ul>

      <Heading as="h2" size="5" mt="6" mb="3">🎨 Creative Applications</Heading>
      <Text as="p" mb="4">
        Text shadow effects are perfect for: logo design, social media graphics, YouTube thumbnails, presentation slides, website headers, marketing materials, and personal projects.
      </Text>

      <Text as="p" mt="6" style={{ fontWeight: 'bold' }}>
        Start creating stunning 3D text with professional shadow effects today at <Link href="https://fast3dtext.com/editor" target="_blank" rel="noopener noreferrer">Fast3DText.com</Link>!
      </Text>
    </Flex>
  );
}