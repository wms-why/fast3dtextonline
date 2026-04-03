'use client'
import { Box, Flex, Heading, Select, Tabs, Text, TextField } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useState } from "react";

export type GradientDirection = "leftToRight" | "topToBottom" | "topLeftToBottomRight" | "bottomLeftToTopRight";
export type BackgroundType = "color" | "gradient" | "image";

export interface BackgroundGradient {
  direction: GradientDirection;
  startColor: string;
  endColor: string;
}

export interface BackgroundProp {
  color: string | null;
  gradient: BackgroundGradient | null;
  image: string | null;
}

export const defaultBackgroundGradient = (): BackgroundGradient => ({
  direction: "leftToRight",
  startColor: "#7c3aed",
  endColor: "#22d3ee",
});

export default function BackgroundSelector({
  background,
  setBackground,
  showTitle = true,
  chrome = true,
}: {
  background: BackgroundProp;
  setBackground: (bg: BackgroundProp) => void;
  showTitle?: boolean;
  chrome?: boolean;
}) {
  const t = useTranslations("BackgoundSetting");
  const initialBackgroundType: BackgroundType = background.gradient
    ? "gradient"
    : background.image
      ? "image"
      : "color";
  const [backgroundType, setBackgroundType] = useState<BackgroundType>(initialBackgroundType);
  const [color, setColor] = useState<string | null>(background.color);
  const [gradient, setGradient] = useState<BackgroundGradient>(
    background.gradient ?? defaultBackgroundGradient()
  );
  const [image, setImage] = useState<string | null>(background.image);

  const handleBackgroundTypeChange = (value: string) => {
    const nextType = value as BackgroundType;
    setBackgroundType(nextType);

    setBackground({
      color: nextType === "color" ? (color ?? "#000000") : null,
      gradient: nextType === "gradient" ? gradient : null,
      image: nextType === "image" ? image : null,
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    if (backgroundType === "color") {
      setBackground({
        ...background,
        color: e.target.value,
        gradient: null,
        image: null,
      });
    }
  };

  const updateGradient = (nextGradient: BackgroundGradient) => {
    setGradient(nextGradient);
    if (backgroundType === "gradient") {
      setBackground({
        color: null,
        gradient: nextGradient,
        image: null,
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
        if (backgroundType === "image") {
          setBackground({
            color: null,
            gradient: null,
            image: result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className={chrome ? "p-4 border rounded-lg min-w-64 shadow" : "min-w-64"}>
      {showTitle && <Heading as="h2" size="4" className="font-medium text-lg">{t("title")}</Heading>}
      <Tabs.Root value={backgroundType} onValueChange={handleBackgroundTypeChange}>
        <Tabs.List mt={showTitle ? "3" : "0"}>
          <Tabs.Trigger value="color">{t("colorOption")}</Tabs.Trigger>
          <Tabs.Trigger value="gradient">{t("gradientOption")}</Tabs.Trigger>
          <Tabs.Trigger value="image">{t("imageOption")}</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="color">
            <Flex gap="3" direction="column">
              <Flex gap="3" align="center">
                <input
                  type="color"
                  id="color-picker"
                  value={color || "#000000"}
                  onChange={handleColorChange}
                  className="h-10 w-16 rounded-md cursor-pointer"
                />
                <TextField.Root
                  value={color || ""}
                  onChange={handleColorChange}
                  placeholder="#000000"
                />
              </Flex>
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="gradient">
            <Flex gap="3" direction="column">
              <Box>
                <Text as="label" size="2" weight="medium">
                  {t("gradientDirection")}
                </Text>
                <Select.Root
                  value={gradient.direction}
                  onValueChange={(value) =>
                    updateGradient({ ...gradient, direction: value as GradientDirection })
                  }
                >
                  <Select.Trigger mt="2" />
                  <Select.Content>
                    <Select.Item value="leftToRight">{t("gradientLeftToRight")}</Select.Item>
                    <Select.Item value="topToBottom">{t("gradientTopToBottom")}</Select.Item>
                    <Select.Item value="topLeftToBottomRight">{t("gradientTopLeftToBottomRight")}</Select.Item>
                    <Select.Item value="bottomLeftToTopRight">{t("gradientBottomLeftToTopRight")}</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Box>

              <Box>
                <Text as="label" size="2" weight="medium">
                  {t("gradientStartColor")}
                </Text>
                <Flex gap="3" align="center" mt="2">
                  <input
                    type="color"
                    value={gradient.startColor}
                    onChange={(e) =>
                      updateGradient({ ...gradient, startColor: e.target.value })
                    }
                    className="h-10 w-16 rounded-md cursor-pointer"
                  />
                  <TextField.Root
                    value={gradient.startColor}
                    onChange={(e) =>
                      updateGradient({ ...gradient, startColor: e.target.value })
                    }
                    placeholder="#7c3aed"
                  />
                </Flex>
              </Box>

              <Box>
                <Text as="label" size="2" weight="medium">
                  {t("gradientEndColor")}
                </Text>
                <Flex gap="3" align="center" mt="2">
                  <input
                    type="color"
                    value={gradient.endColor}
                    onChange={(e) =>
                      updateGradient({ ...gradient, endColor: e.target.value })
                    }
                    className="h-10 w-16 rounded-md cursor-pointer"
                  />
                  <TextField.Root
                    value={gradient.endColor}
                    onChange={(e) =>
                      updateGradient({ ...gradient, endColor: e.target.value })
                    }
                    placeholder="#22d3ee"
                  />
                </Flex>
              </Box>
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="image">
            <Flex gap="3" direction="column">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-muted-foreground
                  file:mr-4 file:py-1 file:px-2
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90"
              />
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
}
