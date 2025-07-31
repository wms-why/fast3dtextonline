"use client";
import { Flex, Box } from "@radix-ui/themes";
import BackgroundSelector, {
  BackgroundProp,
} from "./common/BackgroundSelector";
import PreviewToolbar from "./common/PreviewToolbar";
import TextSetting, { FontNames, FontWeights, TextProp } from "./common/TextSetting";
import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * 全特性工具栏
 * @returns
 */
export default function Page() {


  const t = useTranslations("TextEditor");

  const [background, setBackground] = useState<BackgroundProp>({
    type: "color",
    color: "#c4b1b1",
    image: null,
  });
  const [text, setText] = useState<TextProp>({
    text: t("defaultText"),
    color: "#8e86fe",
    font: FontNames[0],
    weight: FontWeights[0],
  });

  return (
    <Flex gap={"2"}>
      <Flex gap={"2"} direction={"column"} className="w-1/3">
        <BackgroundSelector
          background={background}
          setBackground={setBackground}
        />
        <TextSetting text={text} setText={setText} />
      </Flex>

      <Box className="w-2/3" >
        <PreviewToolbar background={background} text={text} />
      </Box>
    </Flex>
  );
}
