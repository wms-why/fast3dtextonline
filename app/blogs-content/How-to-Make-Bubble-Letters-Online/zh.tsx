import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { LocaleLink } from "@/lib/i18n/navigation";

export default function BubbleLettersZh() {
  return (
    <Flex gap={"4"} direction={"column"} justify={"start"} className="text-left">
      <Text as="p">
        泡泡字最大的优势是圆润、亲和、很容易被注意到。它特别适合生日卡片、儿童海报、贴纸文案和可爱风
        logo 标题。更高效的做法不是从空白开始，而是直接用现成模板再改字。
      </Text>

      <Card size="3">
        <Flex direction={"column"} gap={"3"}>
          <Heading as="h2" size="5">
            快速做法
          </Heading>
          <Text as="p">
            1. 打开{" "}
            <LocaleLink to="/styles/bubble-letters" className="text-violet-600 dark:text-violet-400">
              泡泡字 3D 文字生成器
            </LocaleLink>
            。
          </Text>
          <Text as="p">2. 把示例文案换成你的标题。</Text>
          <Text as="p">3. 保留圆润渐变，或者继续调整背景和阴影。</Text>
          <Text as="p">4. 导出 PNG，用在海报、缩略图或社媒图片里。</Text>
        </Flex>
      </Card>

      <Heading as="h2" size="5">
        泡泡字为什么容易出效果
      </Heading>
      <Text as="p">
        圆形结构配合亮色填充和柔和阴影，阅读性会比较稳定。尽量避免太细的字体，文案也不要太长，短词在手机端封面里更醒目。
      </Text>

      <Heading as="h2" size="5">
        适合哪些场景
      </Heading>
      <Text as="p">
        比较常见的是生日邀请图、儿童课堂海报、轻松风 YouTube 封面，以及针对青少年受众的产品宣传图。
      </Text>

      <Text as="p">
        如果你想直接拿到可编辑的起点，可以直接打开
        <LocaleLink to="/styles/bubble-letters" className="text-violet-600 dark:text-violet-400">
          泡泡字模板页
        </LocaleLink>
        再继续修改。
      </Text>
    </Flex>
  );
}
