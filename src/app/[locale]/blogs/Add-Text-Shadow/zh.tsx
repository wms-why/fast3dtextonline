import { Box, Heading, Text, Link, Flex } from '@radix-ui/themes';
import Image from 'next/image';
import img from "./1024_576.png";

export default function Page() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className='text-left'>
      <Heading as="h1" size="7" mb="4" className='text-center'>如何为3D文字添加惊艳的阴影效果（在线工具）</Heading>

      <Flex justify={"center"}>
        <Image src={img} alt="3D文字阴影效果示例" width={1024} height={576} />
      </Flex>

      <Text as="p" mb="4">
        想要让你的<strong>3D文字设计</strong>通过专业的阴影效果脱颖而出吗？本完整指南将教你如何使用<Link href="https://fast3dtext.com/editor" target="_blank" rel="noopener noreferrer">Fast3DText.com</Link>轻松为3D文字添加<strong>阴影效果</strong> - 这是最好的免费在线3D文字生成器，具备阴影功能。
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">🎯 为什么要添加文字阴影效果？</Heading>
      <Text as="p" mb="4">
        文字阴影能为你的3D设计增添深度、立体感和专业感。它们创建视觉层次，提高可读性，并让你的文字在任何背景下都更加突出。非常适合社交媒体图形、演示文稿、Logo设计和营销材料。
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">🚀 添加文字阴影的分步指南</Heading>

      <Heading as="h3" size="4" mt="4" mb="2">1. 打开3D文字编辑器</Heading>
      <Text as="p" mb="4">
        首先访问 👉 <Link href="https://fast3dtext.com/editor" target="_blank">https://fast3dtext.com/editor</Link>
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">2. 输入你的文字内容</Heading>
      <Text as="p" mb="4">
        输入你想要转换为带阴影效果的3D文字。可以输入单个单词、短语或用空格分隔的多个单词以获得单独控制。
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">3. 自定义基本设置</Heading>
      <Text as="p" mb="2">
        设置基础配置：
      </Text>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li><strong>背景</strong>: 选择纯色、渐变或透明背景</li>
        <li><strong>字体</strong>: 从各种3D兼容字体中选择</li>
        <li><strong>文字颜色</strong>: 选择主要文字颜色</li>
      </ul>

      <Heading as="h3" size="4" mt="4" mb="2">4. 启用阴影效果</Heading>
      <Text as="p" mb="4">
        这是关键步骤！导航到<strong>效果面板</strong>并打开<strong>阴影开关</strong>。这将激活3D文字的阴影功能。
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">5. 选择阴影颜色</Heading>
      <Text as="p" mb="4">
        选择与你的文字完美搭配的阴影颜色。你可以选择：
      </Text>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li><strong>匹配颜色</strong>获得微妙效果</li>
        <li><strong>对比颜色</strong>获得戏剧性效果</li>
        <li><strong>深色阴影</strong>获得传统深度效果</li>
        <li><strong>彩色阴影</strong>获得创意设计</li>
      </ul>

      <Heading as="h3" size="4" mt="4" mb="2">6. 调整3D视角</Heading>
      <Text as="p" mb="4">
        拖动并旋转3D场景，找到展示阴影效果的最佳角度。阴影会根据你的3D视角动态调整。
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">7. 下载你的创作</Heading>
      <Text as="p" mb="4">
        点击<strong>下载按钮</strong>将带阴影效果的3D文字保存为高质量的PNG图像。随时可用于你的项目！
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">💡 最佳效果的专业技巧</Heading>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <li>使用较深的阴影颜色获得更明显的效果</li>
        <li>尝试不同的阴影强度</li>
        <li>选择阴影颜色时考虑背景颜色</li>
        <li>尝试多个角度找到最合适的阴影展示</li>
      </ul>

      <Heading as="h2" size="5" mt="6" mb="3">🎨 创意应用场景</Heading>
      <Text as="p" mb="4">
        文字阴影效果非常适合：Logo设计、社交媒体图形、YouTube缩略图、演示文稿幻灯片、网站标题、营销材料和个人项目。
      </Text>

      <Text as="p" mt="6" style={{ fontWeight: 'bold' }}>
        立即开始在 <Link href="https://fast3dtext.com/editor" target="_blank" rel="noopener noreferrer">Fast3DText.com</Link> 创建带有专业阴影效果的惊艳3D文字！
      </Text>
    </Flex>
  );
}