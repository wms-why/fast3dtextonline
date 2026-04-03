import { Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import img from "../Create-3D-Letters/1024_576.png";

export default function Page() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Heading as="h1" size="7" mb="4" className="text-center">
        如何为海报和缩略图制作冰霜字
      </Heading>

      <Flex justify={"center"}>
        <Image src={img} alt="冰霜字教程预览" width={1024} height={576} />
      </Flex>

      <Text as="p">
        冰霜字最容易成立的前提是背景足够浅、文字高光足够亮、文案尽量短。这样才能让字看起来像结冰，而不是普通浅蓝渐变。
      </Text>

      <Card size="3">
        <Flex direction={"column"} gap={"3"}>
          <Heading as="h2" size="5">
            推荐做法
          </Heading>
          <Text as="p">
            先从 <Link href="/zh/styles/ice-frost">冰霜字 3D 文字生成器</Link> 开始，背景、渐变和阴影会更统一。
          </Text>
          <Text as="p">文案尽量控制在 1 到 3 个词内，冰感会更清晰。</Text>
          <Text as="p">颜色优先白色、青蓝和浅蓝，不要混入太多暖色。</Text>
          <Text as="p">如果要上海报，导出时尽量选择更大的尺寸。</Text>
        </Flex>
      </Card>

      <Heading as="h2" size="5">
        适合哪些页面
      </Heading>
      <Text as="p">
        这个风格适合冬季活动海报、游戏缩略图、圣诞主题宣传图，以及所有需要冷感和冰雪氛围的社媒封面。
      </Text>

      <Text as="p">
        如果你想直接开始编辑，可以打开
        <Link href="/zh/styles/ice-frost"> 冰霜字模板页 </Link>
        然后继续修改。
      </Text>
    </Flex>
  );
}
