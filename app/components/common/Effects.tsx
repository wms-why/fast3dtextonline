'use client'
import { Box, Checkbox, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useTranslations } from "@/lib/i18n/use-translations";
import type { BackgroundProp } from "./BackgroundSelector";
export interface EffectProp {
  enableShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  shadowOpacity: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  strokeColor: string;
  strokeWidth: number;
}

export function createDefaultEffect(): EffectProp {
  return {
    enableShadow: true,
    shadowColor: "#000000",
    shadowBlur: 6,
    shadowOpacity: 0.3,
    shadowOffsetX: 0,
    shadowOffsetY: -6,
    strokeColor: "#ffffff",
    strokeWidth: 0,
  };
}

export function normalizeEffect(effect?: Partial<EffectProp>): EffectProp {
  return {
    ...createDefaultEffect(),
    ...effect,
  };
}

export default function EffectsPage({
  effect,
  setEffect,
  background,
  showTitle = true,
  chrome = true,
}: {
  effect: EffectProp;
  setEffect: (e: EffectProp) => void;
  background: BackgroundProp;
  showTitle?: boolean;
  chrome?: boolean;
}) {
  const t = useTranslations("Effects");

  return (
    <Box className={chrome ? "p-4 border rounded-lg min-w-64 shadow" : "min-w-64"}>
      {showTitle && <Heading as="h2" size="4" className="font-medium text-lg">{t("title")}</Heading>}
      <Flex gap={"2"} p={showTitle ? "2" : "0"} direction={"column"}>
        <Flex gap="2" align={"center"}>
          <Checkbox
            checked={effect.enableShadow}
            onClick={() => setEffect({ ...effect, enableShadow: !effect.enableShadow })}
          />
          <Text size="3" weight="medium">{t("shadowOption")}</Text>
        </Flex>
        <Flex gap="3" direction="column">
          <Box>
            <Text as="label" size="2" weight="medium">{t("shadowColor")}</Text>
            <Flex gap="3" align="center" mt="2">
              <input
                type="color"
                value={effect.shadowColor}
                onChange={e => setEffect({ ...effect, shadowColor: e.target.value })}
                className="h-10 w-16 rounded-md cursor-pointer"
              />
              <TextField.Root
                value={effect.shadowColor}
                onChange={e => setEffect({ ...effect, shadowColor: e.target.value })}
              />
            </Flex>
          </Box>
          <Box>
            <Text as="label" size="2" weight="medium">{t("shadowBlur")}</Text>
            <Flex gap="3" align="center" mt="2">
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={effect.shadowBlur}
                onChange={e => setEffect({ ...effect, shadowBlur: Number(e.target.value) })}
                className="w-full"
              />
              <Text size="2" style={{ minWidth: 32 }}>{effect.shadowBlur}</Text>
            </Flex>
          </Box>
          <Box>
            <Text as="label" size="2" weight="medium">{t("shadowOpacity")}</Text>
            <Flex gap="3" align="center" mt="2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={effect.shadowOpacity}
                onChange={e => setEffect({ ...effect, shadowOpacity: Number(e.target.value) })}
                className="w-full"
              />
              <Text size="2" style={{ minWidth: 32 }}>{effect.shadowOpacity.toFixed(2)}</Text>
            </Flex>
          </Box>
          <Flex gap="3" direction={{ initial: "column", sm: "row" }}>
            <Box style={{ flex: 1 }}>
              <Text as="label" size="2" weight="medium">{t("shadowOffsetX")}</Text>
              <TextField.Root
                mt="2"
                type="number"
                value={effect.shadowOffsetX}
                onChange={e => setEffect({ ...effect, shadowOffsetX: Number(e.target.value) })}
              />
            </Box>
            <Box style={{ flex: 1 }}>
              <Text as="label" size="2" weight="medium">{t("shadowOffsetY")}</Text>
              <TextField.Root
                mt="2"
                type="number"
                value={effect.shadowOffsetY}
                onChange={e => setEffect({ ...effect, shadowOffsetY: Number(e.target.value) })}
              />
            </Box>
          </Flex>
          <Box>
            <Text as="label" size="2" weight="medium">{t("strokeColor")}</Text>
            <Flex gap="3" align="center" mt="2">
              <input
                type="color"
                value={effect.strokeColor}
                onChange={e => setEffect({ ...effect, strokeColor: e.target.value })}
                className="h-10 w-16 rounded-md cursor-pointer"
              />
              <TextField.Root
                value={effect.strokeColor}
                onChange={e => setEffect({ ...effect, strokeColor: e.target.value })}
              />
            </Flex>
          </Box>
          <Box>
            <Text as="label" size="2" weight="medium">{t("strokeWidth")}</Text>
            <Flex gap="3" align="center" mt="2">
              <input
                type="range"
                min="0"
                max="8"
                step="0.5"
                value={effect.strokeWidth}
                onChange={e => setEffect({ ...effect, strokeWidth: Number(e.target.value) })}
                className="w-full"
              />
              <Text size="2" style={{ minWidth: 32 }}>{effect.strokeWidth.toFixed(1)}</Text>
            </Flex>
          </Box>
          {background.image && (
            <Text size="2" color="gray">
              {t("shadowOptionHelp")}
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
