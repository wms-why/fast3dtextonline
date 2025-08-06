'use client'
import { Flex, Heading, Select, Tooltip, IconButton, Link, Box, Tabs, RadioGroup } from "@radix-ui/themes";
import { PlusIcon, CircleQuestionMarkIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export const FontWeights = ["Regular", "Bold"];
export const FontNames = ["Gentilis", "Helvetiker", "Optimer", "Noto_Sans_SC_zh", "Alibaba_PuHuiTi_3.0_zh"];

export type ColorGradientDir = "l2r" | "t2b";
export type FontFrom = "online" | "upload";
export class TextProp {
  text: string
  color: string | string[]
  colorGradientDir: ColorGradientDir
  fontFrom: FontFrom
  font: string
  fontUrl: string
  weight: string
  constructor(
    text: string,
    color: string,
    fontFrom: FontFrom,
    font: string,
    weight: string) {

    this.text = text;
    this.color = color;
    this.colorGradientDir = "l2r";
    this.fontFrom = fontFrom;
    this.font = font;
    this.fontUrl = getOnlineFontPath(font, weight);
    this.weight = weight;
  }

  static default(text: string): TextProp {

    let font = FontNames[0];

    if (containsChinese(text)) {
      font = "Alibaba_PuHuiTi_3.0_zh";
    }
    return {
      text,
      color: "#8e86fe",
      colorGradientDir: "l2r",
      font,
      fontUrl: getOnlineFontPath(font, FontWeights[0]),
      weight: FontWeights[0],
      fontFrom: "online",
    }
  }
}
function getOnlineFontPath(fontName: string, fontWeight: String) {

  let font = fontName;
  if (fontName.endsWith("zh")) {
    font = fontName.slice(0, -3);
  }
  return `https://fast3dtest.mysoul.fun/${font}_${fontWeight}.json`;

}

function containsChinese(str: string) {
  return /[\u4e00-\u9fa5]/.test(str);
}

export interface UploadFont {
  name: string;
  url: string;
}

type TextMode = "color" | "gradient";

export default function TextSetting({
  text,
  setText,
}: {
  text: TextProp;
  setText: (text: TextProp) => void;
}) {
  const locale = useLocale();

  const t = useTranslations("TextEditor");

  const [uploadFonts, setUploadFonts] = useState<UploadFont[]>([]);
  const isPureColor = !Array.isArray(text.color);
  const [textColorMode, setTextColorMode] = useState<TextMode>(isPureColor ? "color" : "gradient");
  const [textColor, setTextColor] = useState<string>(isPureColor ? text.color as string : "#000000");
  const [textGradientColor, setTextGradientColor] = useState<string[]>(!isPureColor ? text.color as string[] : ["#ce6464", "#63635a"]);
  const [colorGradientDir, setColorGradientDir] = useState<ColorGradientDir>(text.colorGradientDir as ColorGradientDir);


  let inited = useRef(false);
  useEffect(() => {

    if (!inited.current) {
      inited.current = true;
      return;
    }

    if (uploadFonts.length > 0) {
      handleSelectFont(uploadFonts[uploadFonts.length - 1].name)
    } else {
      handleSelectFont(FontNames[0])
    }
  }, [uploadFonts]);

  let initTextColorMode = useRef(false);
  useEffect(() => {

    if (!initTextColorMode.current) {
      initTextColorMode.current = true;
      return;
    }

    if (textColorMode === "gradient") {
      setText({ ...text, color: textGradientColor })
    } else {
      setText({ ...text, color: textColor })
    }
  }, [textColorMode]);

  let initTextColor = useRef(false);
  useEffect(() => {
    if (!initTextColor.current) {
      initTextColor.current = true;
      return;
    }

    setText({ ...text, color: textColor })
  }, [textColor]);

  let initTextGradientColor = useRef(false);
  useEffect(() => {
    if (!initTextGradientColor.current) {
      initTextGradientColor.current = true;
      return;
    }
    setText({ ...text, color: textGradientColor })
  }, [textGradientColor]);

  let initTextGradientColorDir = useRef(false);
  useEffect(() => {
    if (!initTextGradientColorDir.current) {
      initTextGradientColorDir.current = true;
      return;
    }
    setText({ ...text, colorGradientDir: colorGradientDir })
  }, [colorGradientDir]);

  const handleSelectFont = (font: string) => {
    if (FontNames.indexOf(font) !== -1) {
      setText({ ...text, font: font, fontFrom: "online", fontUrl: getOnlineFontPath(font, text.weight) });
    } else {
      let f = uploadFonts.find((item) => item.name === font)!;
      setText({ ...text, font: font, fontFrom: "upload", fontUrl: f.url });
    }
  };

  return (
    <Flex className="p-4 border rounded-lg " gap={"3"} direction={"column"}>
      <Heading as="h2" size="4" className="font-medium text-lg" >{t("title")}</Heading>
      <textarea
        value={text.text}
        onChange={e => setText({ ...text, text: e.target.value })}
        className="w-full p-3 border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        rows={4}
      />
      <div className="space-y-1">
        <Heading as="h3" size={"3"} >{t("textColor")}</Heading>
        <Tabs.Root value={textColorMode} onValueChange={(e) => setTextColorMode(e as "color" | "gradient")}>
          <Tabs.List>
            <Tabs.Trigger value="color">{t("color")}</Tabs.Trigger>
            <Tabs.Trigger value="gradient">{t("textGradientColor")}</Tabs.Trigger>
          </Tabs.List>
          <Box >
            <Tabs.Content value="color">
              <Flex gap={"6"} p="2">
                <input
                  type="color"
                  value={textColor}
                  onChange={e => setTextColor(e.target.value)}
                  className="w-1/3 h-10 rounded-md cursor-pointer"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={e => setTextColor(e.target.value)}
                  className="w-1/3 h-10 rounded-md cursor-pointer pl-4"
                />
              </Flex>

            </Tabs.Content>

            <Tabs.Content value="gradient">
              <Flex gap={"2"} p="2" direction="column">
                <Box>
                  <RadioGroup.Root value={text.colorGradientDir} orientation={"vertical"} name="colorGradientDir" onValueChange={(value) =>
                    setColorGradientDir(value as ColorGradientDir)
                  }>
                    <RadioGroup.Item value="l2r">{t("l2r")}</RadioGroup.Item>
                    <RadioGroup.Item value="t2b">{t("t2b")}</RadioGroup.Item>
                  </RadioGroup.Root>
                </Box>
                <Box>
                  <Flex gap={"4"}>
                    <input
                      type="color"
                      value={textGradientColor[0]}
                      onChange={e => setTextGradientColor([e.target.value, text.color[1]])}
                      className="w-1/2 h-10 rounded-md cursor-pointer"
                    />
                    <input
                      type="text"
                      value={textGradientColor[0]}
                      onChange={e => setTextGradientColor([e.target.value, text.color[1]])}
                      className="w-1/2 h-10 rounded-md cursor-pointer pl-4"
                    />
                  </Flex>
                  <Flex gap={"4"}>
                    <input
                      type="color"
                      value={textGradientColor[1]}
                      onChange={e => setTextGradientColor([text.color[0], e.target.value])}

                      className="w-1/2 h-10 rounded-md cursor-pointer"
                    />
                    <input
                      type="text"
                      value={textGradientColor[1]}
                      onChange={e => setTextGradientColor([text.color[0], e.target.value])}
                      className="w-1/2 h-10 rounded-md cursor-pointer pl-4"
                    />
                  </Flex>
                </Box>

              </Flex>
            </Tabs.Content>

          </Box>
        </Tabs.Root>

      </div>
      <div className="space-y-1">
        <Flex gap={"2"}>
          <Heading as="h3" size={"3"} >
            {t("fontFamily")}
          </Heading>
          <Tooltip content={t("how2UploadFont")} >
            <Link href={`/${locale}/blogs/Create-3D-Text-with-the-Barbie-Font`}>
              <IconButton radius="full" variant="ghost" >
                <CircleQuestionMarkIcon width="18" height="18" />
              </IconButton>
            </Link>
          </Tooltip>
        </Flex>

        <Select.Root value={text.font} onValueChange={(e) => handleSelectFont(e)}>
          <Select.Trigger />
          <Select.Content>
            {uploadFonts.length > 0 && (
              <>
                <Select.Group>
                  <Select.Label>Upload</Select.Label>
                  {uploadFonts.map((f) => <Select.Item key={f.name} value={f.name}>{f.name}</Select.Item>)}
                </Select.Group>
                <Select.Separator />
              </>
            )}

            <Select.Group>
              <Select.Label>Online</Select.Label>
              {FontNames.map((name) => <Select.Item key={name} value={name}>{name}</Select.Item>)}
            </Select.Group>

          </Select.Content>
        </Select.Root>

        <Tooltip content={t("uploadFontButton")} >
          <IconButton asChild radius="full" className="ml-4">
            <label className="cursor-pointer" htmlFor="fontUpload">
              <input
                id="fontUpload"
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = () => {
                    const fontName = file.name.replace('.json', '');
                    const newFont = {
                      name: fontName,
                      url: URL.createObjectURL(file)
                    };
                    setUploadFonts([...uploadFonts.filter(font => font.name !== fontName), newFont]);
                  };
                  reader.readAsText(file);
                }}
              />
              <PlusIcon />
            </label>
          </IconButton>
        </Tooltip>
      </div>
      <div className="space-y-2">
        <Heading as="h3" size={"3"} >
          {t("fontWeight")}
        </Heading>

        <Select.Root defaultValue={`${text.weight}`} onValueChange={(e) => setText({ ...text, weight: e })}>
          <Select.Trigger />
          <Select.Content>
            {FontWeights.map((name) => <Select.Item disabled={text.fontFrom == "upload"} key={name} value={name}>{name}</Select.Item>)}
          </Select.Content>
        </Select.Root>

      </div>
    </Flex>
  );
}
