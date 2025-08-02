"use client";
import { useState, useRef, useEffect, } from "react";
import { useTranslations } from "next-intl";
import { Eye, Download } from "lucide-react";
import { BackgroundProp } from "./BackgroundSelector";
import { Text, Flex } from "@radix-ui/themes";
import { getPicture, resize, init as threeInit, updateBackground, updateTextProps } from "./ThreeTools";
import { TextProp } from "./TextSetting";

const Sizes = [
  "1920x1080",
  "1024x768",
  "800x600",
]

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

const AspectRatio = Sizes.map(o => {
  const [w, h] = o.split("x").map(Number);
  const a = gcd(w, h);
  return `${w / a}/${h / a}`;
})
export default function PreviewToolbar({
  background,
  text,
}: {
  background: BackgroundProp;
  text: TextProp;
}) {
  let host = process.env.NEXT_PUBLIC_HOST?.substring("https://".length);
  const t = useTranslations("PreviewBar");
  const [aspectRadio, setAspectRadio] = useState<number>(0);
  const container = useRef<HTMLCanvasElement>(null);
  const fullscreenElement = useRef<HTMLImageElement>(null);
  const [picture, setPicture] = useState<string | null>(null);

  const updateSize = () => {
    const split = Sizes[aspectRadio].split("x").map(Number);
    resize(split[0], split[1], container.current!.clientWidth, container.current!.clientHeight);
  }
  useEffect(() => {
    function init() {
      if (!container.current) {
        setTimeout(init, 100);
      } else {
        const box = container.current;
        const split = Sizes[aspectRadio].split("x").map(Number);
        const initSuccess = threeInit(box, split[0], split[1]);
        console.log("three init ", initSuccess);
      }
    }

    init();

  }, []);

  useEffect(updateSize, [aspectRadio]);

  useEffect(() => {

    const timeoutId = setTimeout(() => {
      updateBackground(background);

      console.log("background change", background);
    }, 200);

    return () => clearTimeout(timeoutId);

  }, [background]);

  useEffect(() => {

    const timeoutId = setTimeout(() => {
      updateTextProps(text);

      console.log("text change", text);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [text]);

  const handleDownload = () => {

    // 创建下载链接
    const link = document.createElement("a");
    link.download = `${host}_${Sizes[aspectRadio]}.png`;
    link.href = getPicture(0, 0);
    link.click();

  };


  const handleFullScreen = () => {

    const width = window.screen.width;
    const height = window.screen.height;

    const img = getPicture(width, height);
    setPicture(img);

    setTimeout(() => {

      let imgDom = fullscreenElement.current!;

      if (imgDom.requestFullscreen) {
        imgDom.requestFullscreen();
      } else if ((imgDom as any).webkitRequestFullscreen) {
        (imgDom as any).webkitRequestFullscreen();
      } else if ((imgDom as any).msRequestFullscreen) {
        (imgDom as any).msRequestFullscreen();
      }

      // 退出全屏时隐藏canvas
      const onFullscreenChange = () => {
        if (!document.fullscreenElement) {
          setPicture(null);
          document.removeEventListener("fullscreenchange", onFullscreenChange);
        }
      };
      document.addEventListener("fullscreenchange", onFullscreenChange);
    }, 0);

  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F11") {
        e.preventDefault();
        handleFullScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleFullScreen]);

  return (
    <Flex direction={"column"} justify={"center"} align={"center"} p="2" className="rounded-lg border w-full" gap={"2"}>
      <Flex gap={"4"} >
        {t("tipsTitle")}:
        <Text>{t("mouseLeft")}</Text>
        <Text>{t("mouseMiddle")}</Text>
        <Text>{t("mouseRight")}</Text>
      </Flex>
      <canvas ref={container} className="w-full border border-gray-300" style={{
        aspectRatio: AspectRatio[aspectRadio],
        // backgroundColor: background.type === "color" ? background.color : "none",
        backgroundImage: (background.type === "image" && background.image) ? `url(${background.image})` : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }} />

      {picture && (
        <img ref={fullscreenElement} src={picture} className="w-screen h-screen" />
      )}

      <Flex gap={"9"} className="justify-around">
        <button
          onClick={() => handleFullScreen()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Eye className="w-4 h-4" />
          {t("previewFullscreen")} (F11)
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t("downloadSize")}
            </label>
            <select
              value={`${aspectRadio}`}
              onChange={(e) => setAspectRadio(parseInt(e.target.value))}
              className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {AspectRatio.map((_, i) => <option key={i} value={i}>{Sizes[i]}</option>)}
            </select>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="w-4 h-4" />
            {t("downloadBackground")}
          </button>
        </div>
      </Flex>

    </Flex>
  );
}
