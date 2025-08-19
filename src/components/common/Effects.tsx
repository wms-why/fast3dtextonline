'use client'
import { Box, Checkbox, Flex, Heading, IconButton, Tooltip } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BackgroundProp } from "./BackgroundSelector";
import { CircleQuestionMarkIcon } from "lucide-react";
export interface EffectProp {
  enableShadow: boolean;
  shadowColor: string;
}
export default function EffectsPage({
  effect,
  setEffect,
  background
}: {
  effect: EffectProp;
  setEffect: (e: EffectProp) => void;
  background: BackgroundProp
}) {
  const t = useTranslations("Effects");

  // const [shadowValid, setShadowValid] = useState(true);
  // useEffect(() => {
  //   setShadowValid(!background.image);
  // }, [background])

  return (
    <Box className="p-4 border rounded-lg min-w-64 border-t-2 border-t-purple-500 shadow">
      <Heading as="h2" size="4" className="font-medium text-lg">{t("title")}</Heading>
      <Flex gap={"2"} p="2" direction={"column"}>

        <Flex gap="2" align={"center"}>
          <Checkbox checked={effect.enableShadow} onClick={(e) => setEffect({ ...effect, enableShadow: !effect.enableShadow })} />
          {t("shadowOption")}
          <input
            type="color"
            id="color-picker"
            value={effect.shadowColor}
            onChange={e => setEffect({ ...effect, shadowColor: e.target.value })}
            className="w-1/3 h-8 rounded-md cursor-pointer"
          />

          <input
            type="text"
            value={effect.shadowColor}
            onChange={e => setEffect({ ...effect, shadowColor: e.target.value })}
            className="w-1/3 h-8 rounded-md cursor-pointer pl-4"
          />
        </Flex>

        {/* <Flex gap="2" align={"center"}>
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
        </Flex> */}
      </Flex>
    </Box>
  );
}
