import { BackgroundProp } from "@/components/common/BackgroundSelector";
import { TextProp } from "@/components/common/TextSetting";
import Footer from "@/components/Footer";
import FullEditor from "@/components/FullEditor";
import Header from "@/components/Header";
import { Box, Button, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { HelpCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { EffectProp } from "../common/Effects";

export function OnlyPage({ textProp, backgroundProp, effectProp }: {
  textProp: TextProp | undefined;
  backgroundProp: BackgroundProp | undefined;
  effectProp: EffectProp | undefined;
}) {
  const t = useTranslations('TextEditor');
  const locale = useLocale();

  return <Flex direction={"column"} gap={"4"}>
    <Header />
    <Container px="4" pt="6">
      <Flex
        direction={{ initial: "column", md: "row" }}
        justify="between"
        align={{ initial: "start", md: "center" }}
        gap="4"
      >
        <Flex direction="column" gap="2">
          <Heading as="h1" size="8">
            {t('title')}
          </Heading>
          <Text color="gray">{t("editorIntro")}</Text>
        </Flex>
        <Button asChild radius="full" variant="soft">
          <a href={`/${locale}/styles`}>{t("browseTemplates")}</a>
        </Button>
      </Flex>
    </Container>
    <Container p="4">
      <FullEditor
        textProp={textProp}
        backgroundProp={backgroundProp}
        effectProp={effectProp}
      />
    </Container>
    <Container p="4">
      <Heading as="h2" weight="bold" className="text-center" mb="4">{t('faqTitle')}</Heading>
      <Flex direction="column" gap="3">
        <Card variant="surface">
          <Flex gap="3" align="center">
            <HelpCircle className="text-gray-11" size={16} />
            <Text size="3" weight="bold">{t('faqQuestion1')}</Text>
          </Flex>
          <Box pt="3" pl="6">
            <Text size="2" color="gray">{t('faqAnswer1')}</Text>
          </Box>
        </Card>
      </Flex>
    </Container>
    <Footer />
  </Flex>;
}
