'use client'
import { containsChinese, DefaultFontChinese, FontLang, Fonts, FontWeight, getFontWeight, getOnlineFontPath } from "@/lib/fonts";
import { Flex, Heading, Select, Tooltip, IconButton, Link, Box, Tabs, RadioGroup } from "@radix-ui/themes";
import { PlusIcon, CircleQuestionMarkIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export type ColorGradientDir = "l2r" | "t2b";
export enum FontFrom {
  online,
  upload,
}
export class TextProp {
  text: string
  color: string | string[]
  colorGradientDir: ColorGradientDir
  fontFrom: FontFrom
  font: string
  fontUrl: string
  weight: FontWeight
  constructor(
    text: string,
    color: string,
    fontFrom: FontFrom,
    font: string,
    weight: FontWeight) {

    this.text = text;
    this.color = color;
    this.colorGradientDir = "l2r";
    this.fontFrom = fontFrom;
    this.font = font;
    this.fontUrl = getOnlineFontPath(font, weight);
    this.weight = weight;
  }

  static default(text: string): TextProp {

    let font = Fonts[0].name;

    if (containsChinese(text)) {
      font = DefaultFontChinese;
    }
    return {
      text,
      color: "#8e86fe",
      colorGradientDir: "l2r",
      font,
      fontUrl: getOnlineFontPath(font, FontWeight.Regular),
      weight: FontWeight.Regular,
      fontFrom: FontFrom.online,
    }
  }
}

export interface UploadFont {
  name: string;
  url: string;
}

type TextMode = "color" | "gradient";

const getFontWeightEnabled = (font: string) => {

  let f = Fonts.find(item => item.name == font);

  const map = new Map<string, boolean>()

  if (f) {
    f.weight.forEach(w => map.set(w, true))
  }
  return map;
};
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
  const [fontWeightEnbled, setFontWeightEnabled] = useState<Map<string, boolean>>(getFontWeightEnabled(text.font));

  let inited = useRef(false);
  useEffect(() => {

    if (!inited.current) {
      inited.current = true;
      return;
    }

    if (uploadFonts.length > 0) {
      handleSelectFont(uploadFonts[uploadFonts.length - 1].name)
    } else {
      handleSelectFont(Fonts[0].name);
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
    const f = Fonts.find(item => item.name == font);
    if (f) {
      if (f.weight.includes(text.weight)) {
        setText({ ...text, font: font, fontFrom: FontFrom.online, fontUrl: getOnlineFontPath(font, text.weight) });
      } else {
        const w = f.weight[0];
        setText({ ...text, font: font, fontFrom: FontFrom.online, fontUrl: getOnlineFontPath(font, w), weight: w });
      }
    } else {
      let f = uploadFonts.find((item) => item.name === font)!;
      setText({ ...text, font: font, fontFrom: FontFrom.upload, fontUrl: f.url });
    }

    const map = getFontWeightEnabled(font);
    setFontWeightEnabled(map);
  };

  return (
    <Flex className="p-4 border rounded-lg border-t-2 border-t-purple-500 shadow" gap={"3"} direction={"column"}>
      <Heading as="h2" size="4" className="font-medium text-lg" >{t("title")}</Heading>
      <textarea
        value={text.text}
        onChange={e => setText({ ...text, text: e.target.value })}
        className="w-full p-3 border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        rows={2}
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
                      className="w-1/2 h-8 rounded-md cursor-pointer"
                    />
                    <input
                      type="text"
                      value={textGradientColor[0]}
                      onChange={e => setTextGradientColor([e.target.value, text.color[1]])}
                      className="w-1/2 h-8 rounded-md cursor-pointer pl-4"
                    />
                  </Flex>
                  <Flex gap={"4"}>
                    <input
                      type="color"
                      value={textGradientColor[1]}
                      onChange={e => setTextGradientColor([text.color[0], e.target.value])}

                      className="w-1/2 h-8 rounded-md cursor-pointer"
                    />
                    <input
                      type="text"
                      value={textGradientColor[1]}
                      onChange={e => setTextGradientColor([text.color[0], e.target.value])}
                      className="w-1/2 h-8 rounded-md cursor-pointer pl-4"
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
              {Fonts.map(({ name }) => <Select.Item key={name} value={name}>{name}</Select.Item>)}
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

        <Select.Root value={text.weight} onValueChange={(e) => setText({ ...text, weight: getFontWeight(e) })}>
          <Select.Trigger />
          <Select.Content>
            {Object.entries(FontWeight).map(([name, value]) =>
              <Select.Item disabled={!fontWeightEnbled.get(name)} key={name} value={name}>{value}</Select.Item>)}
          </Select.Content>
        </Select.Root>
      </div>
    </Flex>
  );
}
