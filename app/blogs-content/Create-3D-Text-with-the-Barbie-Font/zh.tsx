import { Flex, Heading, Text } from "@radix-ui/themes";

export default function BarbieFontZh() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Text as="p" mb="4">
        想要使用标志性的芭比字体创建时尚的3D文字吗？本教程将教你如何使用免费在线工具生成3D芭比风格文字——无需设计经验。
        我们将向你展示如何下载芭比字体，并直接把原始 TTF 上传到编辑器中生成 3D 文字，不再需要提前手动转换格式。
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">第一步：下载芭比字体(免费)</Heading>
      <Text as="p" mb="2">
        第一步是获取官方芭比字体文件。你可以从以下可靠的字体库下载Barbie Regular TTF：
      </Text>
      <Flex direction="column" gap="2" mb="4">
        <a href="https://fontbolt.com/font/barbie-2023-font/" target="_blank" rel="noopener noreferrer" className="text-brand-500">
          🔗 从FontBolt下载芭比字体
        </a>
        <Text as="p" size="2">文件格式: .ttf (TrueType字体)</Text>
      </Flex>
      <Text as="p" mb="4">
        确保将其保存到本地驱动器，我们将在下一步使用它。
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">第二步：直接把 TTF 上传到编辑器</Heading>
      <Text as="p" mb="2">
        Fast3DText 现在已经支持直接上传 <code>.ttf</code>、<code>.otf</code> 和 <code>.json</code> 字体文件，所以可以跳过以前手动转换 JSON 的步骤。
      </Text>

      <Heading as="h3" size="4" mt="4" mb="2">操作说明:</Heading>
      <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
        <li>打开 Fast3DText 编辑器</li>
        <li>点击"上传字体"</li>
        <li>直接选择第一步下载的 <code>barbie.ttf</code> 文件</li>
      </ul>

      <Heading as="h2" size="5" mt="6" mb="3">第三步：在线渲染3D芭比文字</Heading>
      <Text as="p" mb="2">
        字体上传完成后，就可以使用这个免费的在线编辑器创建你的 3D 芭比文字了：
      </Text>
      <a href="/zh/editor" target="_blank" rel="noopener noreferrer" className="text-brand-500" style={{ marginBottom: "16px", display: "inline-block" }}>
        🔗 打开3D文字编辑器
      </a>

      <Heading as="h3" size="4" mt="4" mb="2">步骤:</Heading>
      <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
        <li>访问上面的编辑器链接</li>
        <li>你刚上传的字体会自动出现在字体列表中</li>
        <li>选择它并输入你的自定义文字(如"芭比梦幻屋")</li>
        <li>继续调整颜色、大小、深度和光照，然后导出结果</li>
      </ul>
      <Text as="p" mb="4">
        搞定！你刚刚用芭比字体创建了3D文字——整个过程只需几分钟，而且只使用免费工具。
      </Text>

      <Heading as="h2" size="5" mt="6" mb="3">总结</Heading>
      <Text as="p" mb="4">
        创建3D芭比风格文字不需要花哨的软件或设计技能。通过几个简单的步骤：下载、上传、调整样式，你就可以为网站、海报或社交媒体生成令人惊叹的3D排版。
      </Text>
      <Text as="p" mb="4">
        你可以在 Fast3DText 编辑器里探索更多字体和样式选项，或了解更多关于为3D渲染转换字体的信息。
      </Text>
    </Flex>
  );
}
