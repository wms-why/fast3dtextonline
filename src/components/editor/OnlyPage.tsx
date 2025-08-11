import { BackgroundProp } from "@/components/common/BackgroundSelector";
import { TextProp } from "@/components/common/TextSetting";
import Footer from "@/components/Footer";
import FullEditor from "@/components/FullEditor";
import Header from "@/components/Header";
import { Box, Container, Flex, Heading, Text, Card } from "@radix-ui/themes";
import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function OnlyPage({ textProp, backgroundProp }: {
  textProp: TextProp | undefined;
  backgroundProp: BackgroundProp | undefined
}) {
  const t = useTranslations('TextEditor');

  return <Flex direction={"column"} gap={"4"}>
    <Header />
    <Heading as="h1" weight="bold" className="text-center">{t('title')}</Heading>
    <Container p="4">
      <FullEditor
        textProp={textProp}
        backgroundProp={backgroundProp}
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