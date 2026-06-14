import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { LocaleLink } from "@/lib/i18n/navigation";

export default function IceTextZh() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Text as="p">
        冰霜字最容易成立的前提是背景足够浅、文字高光足够亮、文案尽量短。这样才能让字看起来像结冰，而不是普通浅蓝渐变。
      </Text>

      <Card size="3">
        <Flex direction={"column"} gap={"3"}>
          <Heading as="h2" size="5">
            推荐做法
          </Heading>
          <Text as="p">
            先从{" "}
            <LocaleLink to="/styles/ice-frost" className="text-brand-500">
              冰霜字 3D 文字生成器
            </LocaleLink>{" "}
            开始，背景、渐变和阴影会更统一。
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
        <LocaleLink to="/styles/ice-frost" className="text-brand-500">
          冰霜字模板页
        </LocaleLink>
        然后继续修改。
      </Text>
    </Flex>
  );
}
