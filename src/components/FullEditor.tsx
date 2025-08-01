"use client";
import { Flex, Box, Link } from "@radix-ui/themes";
import BackgroundSelector, {
  BackgroundProp,
} from "./common/BackgroundSelector";
import PreviewToolbar from "./common/PreviewToolbar";
import { useState } from "react";
import { useTranslations } from "next-intl";
import TextSetting, { TextProp } from "./common/TextSetting";

/**
 * 全特性工具栏
 * @returns
 */
export default function Page({ textProp, backgroundProp }: { textProp: TextProp | undefined, backgroundProp: BackgroundProp | undefined }) {

  const t = useTranslations("TextEditor");

  const [background, setBackground] = useState<BackgroundProp>({
    type: "color",
    color: "#c4b1b1",
    image: null,
  });
  const [text, setText] = useState<TextProp>(TextProp.default(t("defaultText")));

  return (
    <Flex gap={"2"}>
      <Flex gap={"2"} direction={"column"} className="w-1/3">
        <BackgroundSelector
          background={background}
          setBackground={setBackground}
        />
        <TextSetting text={text} setText={setText} />
      </Flex>

      <Flex className="w-2/3" direction={"column"} justify={"between"}>
        <PreviewToolbar background={background} text={text} />
      </Flex>
    </Flex>
  );
}
