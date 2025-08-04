import { Box, Heading, Text, Link, Flex } from '@radix-ui/themes';

export default function Page() {
  return (
    <Flex p="4" direction={"column"} justify={"start"} className='text-left'>
      <Heading as="h1" size="7" mb="4">如何使用芭比字体创建3D文字(免费在线方法)</Heading>

      <Text as="p" mb="4">
        想要使用标志性的芭比字体创建时尚的3D文字吗？本教程将教你如何使用免费在线工具生成3D芭比风格文字——无需设计经验。
        我们将向你展示如何下载芭比字体，将其转换为3D格式，并使用直观的在线编辑器进行渲染。
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">第一步：下载芭比字体(免费)</Heading>
      <Text as="p" mb="2">
        第一步是获取官方芭比字体文件。你可以从以下可靠的字体库下载Barbie Regular TTF：
      </Text>
      <Flex direction="column" gap="2" mb="4">
        <Link href="https://fontbolt.com/barbie-font" target="_blank" rel="noopener noreferrer">🔗 从FontBolt下载芭比字体</Link>
        <Text as="p" size="2">文件格式: .ttf (TrueType字体)</Text>
      </Flex>
      <Text as="p" mb="4">
        确保将其保存到本地驱动器，我们将在下一步使用它。
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">第二步：将TTF转换为3D兼容的JSON格式</Heading>
      <Text as="p" mb="2">
        要在网页上渲染3D文字，我们需要将.ttf文件转换为与Three.js或基于网页的3D编辑器兼容的JSON格式。
      </Text>
      <Text as="p" mb="2">使用这个在线转换器:</Text>
      <Link href="https://gero3.github.io/facetype.js/" target="_blank" rel="noopener noreferrer" mb="4">🔗 TTF转JSON字体转换器 - facetype.js</Link>

      <Heading as="h3" size="4" mt="4" mb="2">操作说明:</Heading>
      <ul style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
        <li  >打开facetype.js网站</li>
        <li  >上传barbie.ttf文件</li>
        <li >点击下载获取转换后的.json文件</li>
      </ul>

      <Heading as="h2" size="5" mt="6" mb="3">第三步：在线渲染3D芭比文字</Heading>
      <Text as="p" mb="2">
        现在你有了.json字体文件，是时候使用这个免费的在线编辑器创建你的3D芭比文字了：
      </Text>
      <Link href="https://fast3dtext.com" target="_blank" rel="noopener noreferrer" mb="4">🔗 打开3D文字编辑器 - Fast3DText.com</Link>

      <Heading as="h3" size="4" mt="4" mb="2">步骤:</Heading>
      <ul style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
        <li  >访问上面的编辑器链接</li>
        <li  >点击"上传字体"并选择你刚下载的JSON文件</li>
        <li  >你的字体将出现在字体列表中——只需选择它</li>
        <li >输入你的自定义文字(如"芭比梦幻屋")并自定义颜色、大小、深度和光照</li>
      </ul>
      <Text as="p" mb="4">
        搞定！你刚刚用芭比字体创建了3D文字——整个过程只需几分钟，而且只使用免费工具。
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">总结</Heading>
      <Text as="p" mb="4">
        创建3D芭比风格文字不需要花哨的软件或设计技能。通过几个简单的步骤——下载、转换和上传——你就可以为网站、海报或社交媒体生成令人惊叹的3D排版。
      </Text>
      <Text as="p" mb="4">
        你可以在Fast3DText.com上探索更多字体和样式选项，或了解更多关于为3D渲染转换字体的信息。
      </Text>


    </Flex>
  );
}