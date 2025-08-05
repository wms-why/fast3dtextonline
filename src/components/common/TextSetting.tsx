'use client'
import { Flex, Heading, Select, Tooltip, IconButton, Link } from "@radix-ui/themes";
import { PlusIcon, MessageCircleQuestionIcon, CircleQuestionMark, CircleQuestionMarkIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const FontWeights = ["Regular", "Bold"];
export const FontNames = ["Gentilis", "Helvetiker", "Optimer", "Noto_Sans_SC_zh", "Alibaba_PuHuiTi_3.0_zh"];

type FontFrom = "online" | "upload";
export class TextProp {
  text: string
  color: string
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


export default function TextSetting({
  text,
  setText,
}: {
  text: TextProp;
  setText: (text: TextProp) => void;
}) {
  const locale = useLocale();

  let inited = false;
  const t = useTranslations("TextEditor");

  const [uploadFonts, setUploadFonts] = useState<UploadFont[]>([]);

  useEffect(() => {
    if (uploadFonts.length > 0) {
      handleSelectFont(uploadFonts[uploadFonts.length - 1].name)
    } else {

      if (inited) {
        handleSelectFont(FontNames[0])
      }
    }

    inited = true;
  }, [uploadFonts]);

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
      <Heading size={"3"} className="font-medium text-lg" >{t("title")}</Heading>
      <textarea
        value={text.text}
        onChange={e => setText({ ...text, text: e.target.value })}
        className="w-full p-3 border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        rows={4}
      />
      <div className="space-y-1">
        <label className="block text-sm text-muted-foreground">
          {t("textColor")}
        </label>
        <input
          type="color"
          value={text.color}
          onChange={e => setText({ ...text, color: e.target.value })}
          className="w-full h-10 rounded-md cursor-pointer"
        />
      </div>
      <div className="space-y-1">

        <Flex gap={"2"}>
          <label className="block text-sm text-muted-foreground">
            {t("fontFamily")}
          </label>
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
        <label className="block text-sm text-muted-foreground">
          {t("fontWeight")}
        </label>

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
