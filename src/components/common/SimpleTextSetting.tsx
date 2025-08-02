import { Flex, Heading, Select } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { FontNames, FontWeights, TextProp } from "./TextSetting";

export default function TextSetting({
  text,
  setText,
}: {
  text: TextProp;
  setText: (text: TextProp) => void;
}) {
  const t = useTranslations("TextEditor");

  return (
    <Flex className="p-4 border rounded-lg " gap={"3"} wrap={"wrap"}>
      <Heading size={"3"} className="font-medium text-lg" >{t("title")}</Heading>
      <textarea
        value={text.text}
        onChange={e => setText({ ...text, text: e.target.value })}
        className="w-full p-3 border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        rows={4}
      />
      <div className="space-y-1 w-full">
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
      <div className="space-y-1 w-1/3">
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
      <div className="space-y-2 w-1/3">
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
