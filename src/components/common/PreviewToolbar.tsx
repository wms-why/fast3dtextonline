"use client";
import { useState, useRef, useEffect, } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Eye, Download, Share } from "lucide-react";
import { BackgroundProp } from "./BackgroundSelector";
import { Text, Flex, Button, Select, AlertDialog, Code, AspectRatio } from "@radix-ui/themes";
import { getPicture, resize, init as threeInit, updateBackground, updateEffectProp, updateTextProp } from "./ThreeTools";
import { TextProp } from "./TextSetting";
import { getShareLink } from "@/lib/utils";
import { EffectProp } from "./Effects";

const Sizes = [
  "1920x1080",
  "1024x576",
  "1024x768",
  "800x600",
]
interface Size {
  width: number;
  height: number;
}

const AspectRatios = Sizes.map(o => {
  const [w, h] = o.split("x").map(Number);
  // const a = gcd(w, h);
  return w / h;
})
export default function PreviewToolbar({
  background,
  text,
  effect
}: {
  background: BackgroundProp;
  text: TextProp;
  effect: EffectProp
}) {
  let host = process.env.NEXT_PUBLIC_HOST?.substring("https://".length);
  const t = useTranslations("PreviewBar");
  const initAspectRadio = 0;
  const [aspectRadio, setAspectRadio] = useState<number>(initAspectRadio);
  const split = Sizes[initAspectRadio].split("x").map(Number);
  const [size, setSize] = useState<Size>({ width: split[0], height: split[1] });
  const container = useRef<HTMLCanvasElement>(null);
  const fullscreenElement = useRef<HTMLImageElement>(null);
  const [picture, setPicture] = useState<string | null>(null);
  const [shareError, setShareError] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const locale = useLocale();

  const updateSize = () => {
    const split = Sizes[aspectRadio].split("x").map(Number);

    setSize({ width: split[0], height: split[1] });
    resize(split[0], split[1], container.current!.clientWidth, container.current!.clientHeight);
  }
  useEffect(() => {
    if (container.current) {
      const box = container.current!;
      const split = Sizes[aspectRadio].split("x").map(Number);
      threeInit(box, split[0], split[1]);
      console.log("init three");
    }
  }, []);

  useEffect(updateSize, [aspectRadio]);

  useEffect(() => {

    updateBackground(background);
    console.log("background change", background);

  }, [background]);

  useEffect(() => {

    updateTextProp(text);

    console.log("text change", text);

  }, [text]);

  useEffect(() => {
    updateEffectProp(effect);
    console.log("effect change", effect);
  }, [effect]);

  const generateImage = async (w: number, h: number): Promise<string> => {

    return new Promise((resolve, reject) => {
      const threeimage = getPicture(w, h);
      const canvas = document.createElement("canvas");

      canvas.width = size.width;
      canvas.height = size.height;
      const ctx = canvas.getContext("2d")!;

      function drawThreeImage() {
        const image = new Image();
        image.onload = () => {
          ctx.drawImage(image, 0, 0, size.width, size.height);
          resolve(canvas.toDataURL("image/png"));
        };
        image.src = threeimage;
      }
      if (background.color) {
        ctx.fillStyle = background.color;
        ctx.fillRect(0, 0, size.width, size.height);
      }
      if (background.image) {
        const image = new Image();
        image.onload = () => {

          const cw = canvas.width;
          const ch = canvas.height;
          const iw = image.width;
          const ih = image.height;

          // 计算缩放比例（取最大值，保证能覆盖整个canvas）
          const scale = Math.min(cw / iw, ch / ih);

          const sw = iw * scale;
          const sh = ih * scale;

          // 居中偏移
          const dx = (cw - sw) / 2;
          const dy = (ch - sh) / 2;

          ctx.drawImage(image, dx, dy, sw, sh);
          drawThreeImage();
        };
        image.src = background.image;
      } else {
        drawThreeImage();
      }

    });
  }

  const handleDownload = async () => {

    // 创建下载链接
    const link = document.createElement("a");
    link.download = `${host}_${Sizes[aspectRadio]}.png`;
    link.href = await generateImage(0, 0);
    link.click();
  };


  const handleFullScreen = async () => {

    const width = window.screen.width;
    const height = window.screen.height;

    const img = await generateImage(width, height);
    setPicture(img);


    const fullScreen = () => {
      if (!fullscreenElement.current) {
        setTimeout(() => {
          fullScreen();
        }, 100);
        return;
      }
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
    }
    setTimeout(() => {

      fullScreen();

    }, 100);

  };

  const handleShare = () => {
    setShareError(null);
    setShareLink(null);
    if (background.image) {
      setShareError(t("shareErrorNotSupportDesc"));
      return;
    }

    const bg = { ...background, image: null };

    const link = getShareLink({ bg, text }, locale);

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
    <Flex direction={"column"} justify={"center"} align={"center"} p="2" className="shadow rounded-lg border w-full border-t-2 border-t-purple-500" gap={"2"}>
      <Flex gap={"4"} >
        {t("tipsTitle")}:
        <Text>{t("mouseLeft")}</Text>
        <Text>{t("mouseMiddle")}</Text>
        <Text>{t("mouseRight")}</Text>
      </Flex>

      <AspectRatio ratio={AspectRatios[aspectRadio]} style={{
        background: "repeating-conic-gradient(#ccc 0% 25%, white 0% 50%)",
        backgroundSize: "40px 40px"
      }}>
        <canvas ref={container} className="w-full border border-gray-300" style={{
          backgroundColor: background.color ? `${background.color}` : "rgba(0,0,0,0)",
          backgroundImage: (background.image) ? `url(${background.image})` : "none",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          maxWidth: size.width, maxHeight: size.height
        }} />
      </AspectRatio>

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
                {AspectRatios.map((_, i) => <Select.Item key={i} value={i + ""}>{Sizes[i]}</Select.Item>)}
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
