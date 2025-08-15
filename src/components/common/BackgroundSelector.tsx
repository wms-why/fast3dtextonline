'use client'
import { Box, Checkbox, Flex, Heading } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useState } from "react";
export type BackgroundType = "color" | "image";
export interface BackgroundProp {
  color: string | null;
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
  const types: BackgroundType[] = [];

  if (background.color) {
    types.push("color");
  }

  if (background.image) {
    types.push("image");
  }

  const [backgroundType, setBackgroundType] = useState<BackgroundType[]>(types);
  const [color, setColor] = useState<string | null>(background.color);
  const [image, setImage] = useState<string | null>(background.image);

  const handleBackgroundTypeChange = (value: BackgroundType) => {
    let newTypes: BackgroundType[];
    if (backgroundType.includes(value)) {
      backgroundType.splice(backgroundType.indexOf(value), 1);
      newTypes = backgroundType;
    } else {
      newTypes = [...backgroundType, value];
    }

    setBackgroundType(newTypes);

    if (newTypes.includes("color")) {
      background.color = color;
    } else {
      background.color = null;
    }
    if (newTypes.includes("image")) {
      background.image = image;
    } else {
      background.image = null;
    }

    setBackground({ ...background });
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    if (backgroundType.includes("color")) {
      setBackground({
        ...background,
        color: e.target.value,
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
        if (backgroundType.includes("image")) {
          setBackground({
            ...background,
            image: result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className="p-4 border rounded-lg min-w-64">
      <Heading as="h2" size="4" className="font-medium text-lg">{t("title")}</Heading>
      <Flex gap={"2"} p="2" direction={"column"}>
        <Flex gap="2" align={"center"}>
          <Checkbox checked={backgroundType.includes("color")} onClick={(e) => handleBackgroundTypeChange("color")} className="cursor-pointer" />
          <Heading as="h3" size={"3"}>{t("colorOption")}</Heading>
          <Flex gap={"4"} >
            <input
              type="color"
              id="color-picker"
              value={color || "black"}
              onChange={handleColorChange}
              className="w-1/3 h-10 rounded-md cursor-pointer"
            />

            {color && (<input
              type="text"
              value={color}
              onChange={handleColorChange}
              className="w-1/2 h-10 rounded-md cursor-pointer pl-4"
            />)}
          </Flex>
        </Flex>

        <Flex gap="2" align={"center"}>
          <Checkbox checked={backgroundType.includes("image")} onClick={(e) => handleBackgroundTypeChange("image")} className="cursor-pointer" />
          <Heading as="h3" size={"3"}>{t("imageOption")}</Heading>
          <Flex gap={"4"} >
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
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
