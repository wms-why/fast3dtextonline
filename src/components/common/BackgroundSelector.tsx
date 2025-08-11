import { Box, Text, Flex, Heading, Section, Radio, RadioGroup } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
export type BackgroundType = "color" | "image";
export interface BackgroundProp {
  type: BackgroundType;
  color: string;
  image: string | null;
}
export default function BackgroundSelector({
  background,
  setBackground,
}: {
  background: BackgroundProp;
  setBackground: (bg: BackgroundProp) => void;
}) {
  const t = useTranslations("BackgoundSetting");

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackground({
      type: "color",
      color: e.target.value,
      image: background.image,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setBackground({
          type: "image",
          image: result,
          color: background.color,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className="p-4 border rounded-lg min-w-64">
      <Heading as="h2" size="4" className="font-medium text-lg">{t("title")}</Heading>
      <Flex gap={"2"} p="2">

        <RadioGroup.Root value={background.type} name="backgroundType" orientation="horizontal" onValueChange={(value) => setBackground({ ...background, type: value as BackgroundType })}>
          <RadioGroup.Item value="color">{t("colorOption")}</RadioGroup.Item>
          <RadioGroup.Item value="image">{t("imageOption")}</RadioGroup.Item>
        </RadioGroup.Root>

      </Flex>

      <Box className="w-full">
        {background.type === "color" && (
          <Flex gap={"6"} p="2">
            <input
              type="color"
              id="color-picker"
              value={background.color}
              onChange={handleColorChange}
              className="w-1/3 h-10 rounded-md cursor-pointer"
            />

            <input
              type="text"
              value={background.color}
              onChange={handleColorChange}
              className="w-1/3 h-10 rounded-md cursor-pointer pl-4"
            />

          </Flex>

        )}

        {background.type === "image" && (
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90"
          />
        )}
      </Box>
    </Box>
  );
}
