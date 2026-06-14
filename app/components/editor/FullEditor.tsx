"use client";
import { Card, Flex, Tabs } from "@radix-ui/themes";
import { AnimatePresence, motion } from "motion/react";
import BackgroundSelector from "../common/BackgroundSelector";
import type { BackgroundProp } from "../common/BackgroundSelector";
import PreviewToolbar from "../common/PreviewToolbar";
import { useState } from "react";
import { useTranslations } from "@/lib/i18n/use-translations";
import TextSetting, { TextProp } from "../common/TextSetting";
import Effects from "../common/Effects";
import { normalizeEffect } from "../common/Effects";
import type { EffectProp } from "../common/Effects";

/**
 * 全特性工具栏
 * @returns
 */
export default function Page({
  textProp,
  backgroundProp,
  effectProp,
  templateSlug,
  compactLayout = false,
}: {
  textProp: TextProp | undefined,
  backgroundProp: BackgroundProp | undefined,
  effectProp: EffectProp | undefined,
  templateSlug?: string,
  compactLayout?: boolean,
}) {

  const t = useTranslations("TextEditor");

  backgroundProp = backgroundProp || {
    color: "#c4b1b1",
    gradient: null,
    image: null,
    transparent: false,
  } satisfies BackgroundProp;

  textProp = textProp || TextProp.default(t("defaultText"));
  effectProp = normalizeEffect(effectProp);

  const [background, setBackground] = useState<BackgroundProp>(backgroundProp!);
  const [text, setText] = useState<TextProp>(textProp!);
  const [effect, setEffect] = useState<EffectProp>(effectProp);
  const [compactPanel, setCompactPanel] = useState("text");

  const controls = compactLayout ? (
    <Card size="3" className="w-full lg:max-w-[360px]" style={{ borderRadius: "var(--radius-card)" }}>
      <Tabs.Root value={compactPanel} onValueChange={setCompactPanel}>
        <Tabs.List size="2">
          <Tabs.Trigger value="text">Text</Tabs.Trigger>
          <Tabs.Trigger value="background">Background</Tabs.Trigger>
          <Tabs.Trigger value="effects">Effects</Tabs.Trigger>
        </Tabs.List>
        <div className="pt-4">
          <AnimatePresence mode="wait" initial={false}>
            {compactPanel === "text" && (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <TextSetting text={text} setText={setText} showTitle={false} chrome={false} />
              </motion.div>
            )}
            {compactPanel === "background" && (
              <motion.div
                key="background"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <BackgroundSelector
                  background={background}
                  setBackground={setBackground}
                  showTitle={false}
                  chrome={false}
                />
              </motion.div>
            )}
            {compactPanel === "effects" && (
              <motion.div
                key="effects"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <Effects
                  effect={effect}
                  setEffect={setEffect}
                  background={background}
                  showTitle={false}
                  chrome={false}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tabs.Root>
    </Card>
  ) : (
    <Flex
      gap={"2"}
      direction={"column"}
      style={{ flex: "0 0 340px" }}
      className="w-full lg:max-w-[340px]"
    >
      <BackgroundSelector
        background={background}
        setBackground={setBackground}
      />
      <TextSetting text={text} setText={setText} />
      <Effects effect={effect} setEffect={setEffect} background={background} />
    </Flex>
  );

  return (
    <Flex
      gap={{ initial: "4", lg: compactLayout ? "6" : "4" }}
      direction={{ initial: "column", lg: compactLayout ? "row" : "row" }}
      align="stretch"
      className="w-full"
    >
      <Flex
        className="w-full"
        direction={"column"}
        justify={"start"}
        align="stretch"
        style={{ flex: 1, minWidth: 0 }}
      >
        <PreviewToolbar background={background} text={text} effect={effect} templateSlug={templateSlug} />
      </Flex>
      {controls}
    </Flex>
  );
}
