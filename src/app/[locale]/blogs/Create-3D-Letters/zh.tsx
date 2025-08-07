import { Box, Heading, Text, Link, Flex } from '@radix-ui/themes';
import Image from 'next/image';
import img from "./1024_576.png";

export default function Page() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className='text-left'>
      <Heading as="h1" size="7" mb="4" className='text-center'>如何免费在线创建惊艳的3D字母</Heading>



      <Flex justify={"center"}>
        <Image src={img} alt="Barbie Font Sample" width={1024} height={576} />
      </Flex>

      <Text as="p" mb="4">
        如果你想为设计、演示或内容项目生成引人注目的<strong>3D字母</strong>，你来对地方了。以下是使用<Link href="https://fast3dtext.com/editor" target="_blank" rel="noopener noreferrer">Fast3DText.com</Link>的简单分步指南，这是一个免费的在线3D文本生成器，可以轻松设计和导出高质量的3D字母图像。
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">🎯 创建3D字母的步骤</Heading>

      <Heading as="h3" size="4" mt="4" mb="2">1. 打开编辑器</Heading>
      <Text as="p" mb="4">
        前往 👉 <Link href="https://fast3dtext.com/editor" target="_blank">https://fast3dtext.com/editor</Link>
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">2. 输入你的字母</Heading>
      <Text as="p" mb="4">
        输入你想转换为3D的字母或单词。用空格分隔每个字母以控制单个布局。<br />
        示例: <code>F A S T</code>
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">3. 自定义样式</Heading>
      <Text as="p" mb="2">
        选择你喜欢的:
      </Text>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li><strong>字体</strong>: 从流行的3D兼容字体中选择</li>
        <li><strong>背景</strong>: 纯色、渐变或透明</li>
        <li><strong>颜色</strong>: 纯色填充、渐变、金属色调等</li>
      </ul>

      <Heading as="h3" size="4" mt="4" mb="2">4. 调整3D视图</Heading>
      <Text as="p" mb="4">
        拖动并旋转场景以改变3D角度。让你的字母以完美的视角弹出。
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">5. 导出你的图像</Heading>
      <Text as="p" mb="4">
        点击<strong>下载</strong>按钮将你的3D字母保存为高质量图像(<code>.png</code>)。
      </Text>
    </Flex>
  );
}