import { Flex, Heading, Select } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

export const FontWeights = ["regular", "bold"];
export const FontNames = ["gentilis", "helvetiker", "optimer", "Noto_Sans_SC_zh", "Alibaba_PuHuiTi_3.0_zh"];

type FontFrom = "local" | "upload";
export class TextProp {
  text: string
  color: string
  fontFrom: FontFrom
  font: string
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
      weight: FontWeights[0],
      fontFrom: "local",
    }
  }
}

function containsChinese(str: string) {
  return /[\u4e00-\u9fa5]/.test(str);
}

export function getFontPath(fontName: string, fontWeight: String) {
  if (!fontName.endsWith("zh")) {
    return `/fonts/${fontName}_${fontWeight}.typeface.json`;
  } else {
    fontWeight = fontWeight.charAt(0).toUpperCase() + fontWeight.slice(1);
    let font = fontName.slice(0, -3);
    return `https://fast3dtest.mysoul.fun/${font}_${fontWeight}.json`;
  }
}



export default function TextSetting({
  text,
  setText,
}: {
  text: TextProp;
  setText: (text: TextProp) => void;
}) {
  const t = useTranslations("TextEditor");

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
        <label className="block text-sm text-muted-foreground">
          {t("fontFamily")}
        </label>
        <Select.Root defaultValue={`${text.font}`} onValueChange={(e) => setText({ ...text, font: e })}>
          <Select.Trigger />
          <Select.Content>
            {FontNames.map((name) => <Select.Item key={name} value={name}>{name}</Select.Item>)}
          </Select.Content>
        </Select.Root>
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-muted-foreground">
          {t("fontWeight")}
        </label>

        <Select.Root defaultValue={`${text.weight}`} onValueChange={(e) => setText({ ...text, weight: e })}>
          <Select.Trigger />
          <Select.Content>
            {FontWeights.map((name) => <Select.Item key={name} value={name}>{name}</Select.Item>)}
          </Select.Content>
        </Select.Root>

      </div>
    </Flex>
  );
}
