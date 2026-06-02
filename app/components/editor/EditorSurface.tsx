"use client";

import type { BackgroundProp } from "../common/BackgroundSelector";
import type { EffectProp } from "../common/Effects";
import type { TextProp } from "../common/TextSetting";
import FullEditor from "./FullEditor";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";

export function EditorSurface({
  textProp,
  backgroundProp,
  effectProp,
  templateSlug,
  title,
  subtitle,
  compactLayout = true,
}: {
  textProp?: TextProp;
  backgroundProp?: BackgroundProp;
  effectProp?: EffectProp;
  templateSlug?: string;
  title?: string;
  subtitle?: string;
  compactLayout?: boolean;
}) {
  return (
    <Flex
      justify="between"
      align="center"
      direction="column"
      gap="6"
      className="mx-auto w-full"
      style={{ maxWidth: 1280 }}
    >
      {(title || subtitle) && (
        <Flex direction="column" align="center" gap="2" className="text-center">
          {title && (
            <Heading as="h2" size="8">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Text size="5" color="gray" style={{ maxWidth: 760 }}>
              {subtitle}
            </Text>
          )}
        </Flex>
      )}
      <Box className="w-full">
        <FullEditor
          textProp={textProp}
          backgroundProp={backgroundProp}
          effectProp={effectProp}
          templateSlug={templateSlug}
          compactLayout={compactLayout}
        />
      </Box>
    </Flex>
  );
}
