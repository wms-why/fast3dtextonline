"use client";
import { Flex, Box, Link } from "@radix-ui/themes";
import BackgroundSelector, {
  BackgroundProp,
} from "./common/BackgroundSelector";
import PreviewToolbar from "./common/PreviewToolbar";
import { useState } from "react";
import { useTranslations } from "next-intl";
import TextSetting, { TextProp } from "./common/TextSetting";
import { useSearchParams } from "next/navigation";
import { decodeText } from "@/lib/utils";

/**
 * 全特性工具栏
 * @returns
 */
export default function Page({ textProp, backgroundProp }: { textProp: TextProp | undefined, backgroundProp: BackgroundProp | undefined }) {

  const t = useTranslations("TextEditor");

  backgroundProp = backgroundProp || {
    type: "color",
    color: "#c4b1b1",
    image: null,
  } satisfies BackgroundProp;

  textProp = textProp || TextProp.default(t("defaultText"));

  const [background, setBackground] = useState<BackgroundProp>(backgroundProp!);
  const [text, setText] = useState<TextProp>(textProp!);

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
