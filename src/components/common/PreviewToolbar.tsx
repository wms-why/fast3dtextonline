"use client";
import { useState, useRef, useEffect, } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Eye, Download, Share } from "lucide-react";
import { BackgroundProp } from "./BackgroundSelector";
import { Text, Flex, Button, Select, AlertDialog, Code, Blockquote, Box } from "@radix-ui/themes";
import { getPicture, resize, init as threeInit, updateBackground, updateTextProps } from "./ThreeTools";
import { TextProp } from "./TextSetting";
import { encodeText, getShareLink } from "@/lib/utils";

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
  const [shareError, setShareError] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const locale = useLocale();

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
    }, 200);

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

  const handleShare = () => {
    setShareError(null);
    setShareLink(null);
    if (background.type == "image" && background.image) {
      setShareError(t("shareErrorNotSupportDesc"));
      return;
    }

    const bg = { ...background, image: null };
    let txt = JSON.stringify({ bg, text });
    txt = encodeText(txt);


    const link = getShareLink(txt, locale);

    setShareLink(link);

  }

  const copyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink).catch(err => {
        console.error("copy error:", err);
        alert("copy error");
      });
    }

  }

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

        {/* 全屏预览按钮 */}
        <Button
          onClick={() => handleFullScreen()}
        >
          <Eye className="w-4 h-4" />
          {t("previewFullscreen")} (F11)
        </Button>

        {/* 分享按钮 */}
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button
              onClick={() => handleShare()}
            >
              <Share className="w-4 h-4" />
              {t("share")}
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>{t("share")}</AlertDialog.Title>
            {!shareError ? (<AlertDialog.Description size="2">

              {t("shareSuccessDesc")} !
              <br />
              <Code className="mt-2">
                {shareLink}
              </Code>
            </AlertDialog.Description>) :
              (<AlertDialog.Description size="2" className="text-red-500">
                {shareError}
              </AlertDialog.Description>)}

            <Flex gap="3" mt="4" justify="end">
              {!shareError && <AlertDialog.Action>
                <Button variant="soft" color="blue" onClick={() => copyLink()}>
                  {t("shareDialogCopyLink")}
                </Button>
              </AlertDialog.Action>
              }

              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  {t("shareDialogClose")}
                </Button>
              </AlertDialog.Cancel>

            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>


        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t("downloadSize")}
            </label>
            <Select.Root defaultValue={`${aspectRadio}`} onValueChange={(e) => setAspectRadio(parseInt(e))}>
              <Select.Trigger />
              <Select.Content>
                {AspectRatio.map((_, i) => <Select.Item key={i} value={i + ""}>{Sizes[i]}</Select.Item>)}
              </Select.Content>
            </Select.Root>
          </div>
          <Button
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
            {t("downloadBackground")}
          </Button>
        </div>
      </Flex>

    </Flex>
  );
}
