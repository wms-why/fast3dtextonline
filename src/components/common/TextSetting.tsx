import { Flex, Heading } from "@radix-ui/themes";
import { useTranslations } from "next-intl";

export interface TextProp {
  text: string;
  color: string;
  font: string;
  weight: string;
}

export function getFontPath(fontName: string, fontWeight: String) {
  if (fontName != "noto_sans_zh") {
    return `/fonts/${fontName}_${fontWeight}.typeface.json`;
  } else {
    fontWeight = fontWeight.charAt(0).toUpperCase() + fontWeight.slice(1);
    return `https://fast3dtest.mysoul.fun/Noto_Sans_SC_${fontWeight}.json`;
  }
}

export const FontWeights = ["regular", "bold"];
export const FontNames = ["gentilis", "helvetiker", "optimer", "noto_sans_zh"];

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
        <select
          value={text.font}
          onChange={(e) => setText({ ...text, font: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          {FontNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-muted-foreground">
          {t("fontWeight")}
        </label>
        <select
          value={text.weight}
          onChange={(e) => setText({ ...text, weight: e.target.value })}
          className="w-full p-2 border rounded-md"
        >
          {FontWeights.map((weight) => (
            <option key={weight} value={weight}>
              {weight}
            </option>
          ))}
        </select>
      </div>
    </Flex>
  );
}
