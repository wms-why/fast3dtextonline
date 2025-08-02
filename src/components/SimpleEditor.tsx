"use client";
import { Flex, Box, Link } from "@radix-ui/themes";
import BackgroundSelector, {
  BackgroundProp,
} from "./common/BackgroundSelector";
import PreviewToolbar from "./common/PreviewToolbar";
import SimpleTextSetting from "./common/SimpleTextSetting";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { TextProp } from "./common/TextSetting";
import { useRouter } from "@/i18n/navigation";

/**
 * 简易工具
 * @returns
 */
export default function SimpleEditor({ textProp, backgroundProp }: { textProp: TextProp | undefined, backgroundProp: BackgroundProp | undefined }) {

  const t = useTranslations("TextEditor");
  const tIndex = useTranslations("HomePage");

  const router = useRouter();

  backgroundProp = {
    type: "color",
    color: "#c4b1b1",
    image: null,
  } satisfies BackgroundProp;

  textProp = textProp || TextProp.default(t("defaultText"));

  const [background, setBackground] = useState<BackgroundProp>(backgroundProp);

  const [text, setText] = useState<TextProp>(textProp);

  // useEffect(() => {
  //   let bg = sessionStorage.getItem("background");

  //   if (bg) {
  //     console.log("初始化设置 bg", bg);

  //     setBackground(JSON.parse(bg));
  //   }

  //   let txt = sessionStorage.getItem("text");

  //   if (txt) {
  //     console.log("初始化设置 txt", txt);

  //     setText(JSON.parse(txt));
  //   }

  // }, []);

  useEffect(() => {
    sessionStorage.setItem("background", JSON.stringify(background));
  }, [background]);

  useEffect(() => {
    sessionStorage.setItem("text", JSON.stringify(text));

  }, [text]);

  return (
    <Flex gap={"2"}>
      <Flex gap={"2"} direction={"column"} className="w-1/3">
        <BackgroundSelector
          background={background}
          setBackground={setBackground}
        />
        <SimpleTextSetting text={text} setText={setText} />
        <Box className="text-center"> <Link className="cursor-pointer" underline="always" onClick={() => { router.push("/editor") }}>{tIndex("toolMore")} ?</Link> </Box>
      </Flex>

      <Flex className="w-2/3" direction={"column"} justify={"between"}>
        <PreviewToolbar background={background} text={text} />
      </Flex>
    </Flex>
  );
}
