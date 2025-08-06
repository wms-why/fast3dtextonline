import { Box, Text, Flex, Heading, Section, Radio } from "@radix-ui/themes";
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
    <Box className="space-y-4 p-4 border rounded-lg min-w-64">
      <Heading as="h2" size="4" className="font-medium text-lg">{t("title")}</Heading>
      <Flex gap={"2"} p="2">
        <Flex gap={"1"} align={"center"}>
          <Radio name="background-type" value="1" checked={background.type === "color"} onChange={() =>
            setBackground({
              type: "color",
              color: background.color,
              image: background.image,
            })
          } />
          <Text size="2">{t("colorOption")}</Text>
        </Flex>

        <Flex gap={"1"} align={"center"}>
          <Radio name="background-type" value="1" checked={background.type === "image"} onChange={() =>
            setBackground({
              type: "image",
              color: background.color,
              image: background.image,
            })
          } />
          <Text size="2">{t("imageOption")}</Text>
        </Flex>
      </Flex>

      <Box className="w-full">
        {background.type === "color" && (
          <input
            type="color"
            id="color-picker"
            value={background.color}
            onChange={handleColorChange}
            className="w-full h-10 rounded-md cursor-pointer"
          />
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
