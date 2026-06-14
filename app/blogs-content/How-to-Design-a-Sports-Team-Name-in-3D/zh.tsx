import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { LocaleLink } from "@/lib/i18n/navigation";

export default function SportsTeamZh() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Text as="p">
        运动风字效最重要的是短、硬朗、有竞争感。最常见的问题是文案太长，导致看起来像普通标题而不是队名。深背景配合暖色高光通常更稳。
      </Text>

      <Card size="3">
        <Flex direction={"column"} gap={"3"}>
          <Heading as="h2" size="5">
            实用做法
          </Heading>
          <Text as="p">
            先用{" "}
            <LocaleLink to="/styles/sports-flame" className="text-brand-500">
              运动火焰风 3D 文字生成器
            </LocaleLink>
            作为起点。
          </Text>
          <Text as="p">尽量只保留队名或 mascot 单词，不要塞太长的副标题。</Text>
          <Text as="p">颜色优先橙、红、金，能更快建立热血和竞技感。</Text>
          <Text as="p">导出的 PNG 适合电竞横幅、比赛海报和校队宣传图。</Text>
        </Flex>
      </Card>

      <Heading as="h2" size="5">
        适合哪些场景
      </Heading>
      <Text as="p">
        这个方向适合电竞队伍、比赛宣传、幻想体育封面、校园赛事和各种需要强冲击标题的竞技内容。
      </Text>

      <Text as="p">
        如果不想从头调参数，可以直接打开
        <LocaleLink to="/styles/sports-flame" className="text-brand-500">
          运动火焰风模板页
        </LocaleLink>
        再修改文案。
      </Text>
    </Flex>
  );
}
