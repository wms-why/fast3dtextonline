"use client";
import { Flex } from "@radix-ui/themes";
import BackgroundSelector, {
  BackgroundProp,
} from "./common/BackgroundSelector";
import PreviewToolbar from "./common/PreviewToolbar";
import { useState } from "react";
import { useTranslations } from "next-intl";
import TextSetting, { TextProp } from "./common/TextSetting";
import Effects, { EffectProp } from "./common/Effects";

/**
 * 全特性工具栏
 * @returns
 */
export default function Page({ textProp, backgroundProp, effectProp }: { textProp: TextProp | undefined, backgroundProp: BackgroundProp | undefined, effectProp: EffectProp | undefined }) {

  const t = useTranslations("TextEditor");

  backgroundProp = backgroundProp || {
    color: "#a49494",
    image: null,
  } satisfies BackgroundProp;

  textProp = textProp || TextProp.default(t("defaultText"));
  effectProp = effectProp || { enableShadow: true, shadowColor: "#000000" } satisfies EffectProp;

  const [background, setBackground] = useState<BackgroundProp>(backgroundProp!);
  const [text, setText] = useState<TextProp>(textProp!);
  const [effect, setEffect] = useState<EffectProp>(effectProp);

  return (
    <Flex gap={"2"}>
      <Flex gap={"2"} direction={"column"} className="w-1/3">
        <BackgroundSelector
          background={background}
          setBackground={setBackground}
        />
        <TextSetting text={text} setText={setText} />

        <Effects effect={effect} setEffect={setEffect} background={background} />
      </Flex>

      <Flex className="w-2/3" direction={"column"} justify={"between"}>
        <PreviewToolbar background={background} text={text} effect={effect} />
      </Flex>
    </Flex>
  );
}
