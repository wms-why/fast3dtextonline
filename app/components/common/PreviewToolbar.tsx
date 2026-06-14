"use client";
import { useState, useRef, useEffect, } from "react";
import { useLocale } from "@/lib/i18n/use-locale";
import { useTranslations } from "@/lib/i18n/use-translations";
import { Check, Download, Eye, Share, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { BackgroundProp, GradientDirection } from "./BackgroundSelector";
import { Flex, Button, Select, AlertDialog, Code, AspectRatio } from "@radix-ui/themes";
import { getPicture, resize, init as threeInit, updateBackground, updateEffectProp, updateTextProp } from "./ThreeTools";
import type { TextProp } from "./TextSetting";
import { getShareLink } from "@/lib/share-data";
import { getHost } from "@/lib/host";
import type { EffectProp } from "./Effects";

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

const getGradientCoordinates = (
  direction: GradientDirection,
  width: number,
  height: number
) => {
  switch (direction) {
    case "topToBottom":
      return [0, 0, 0, height] as const;
    case "topLeftToBottomRight":
      return [0, 0, width, height] as const;
    case "bottomLeftToTopRight":
      return [0, height, width, 0] as const;
    case "leftToRight":
    default:
      return [0, 0, width, 0] as const;
  }
};

const getGradientBackgroundCss = (background: BackgroundProp) => {
  if (!background.gradient) {
    return background.image ? `url(${background.image})` : "none";
  }

  switch (background.gradient.direction) {
    case "topToBottom":
      return `linear-gradient(to bottom, ${background.gradient.startColor}, ${background.gradient.endColor})`;
    case "topLeftToBottomRight":
      return `linear-gradient(to bottom right, ${background.gradient.startColor}, ${background.gradient.endColor})`;
    case "bottomLeftToTopRight":
      return `linear-gradient(to top right, ${background.gradient.startColor}, ${background.gradient.endColor})`;
    case "leftToRight":
    default:
      return `linear-gradient(to right, ${background.gradient.startColor}, ${background.gradient.endColor})`;
  }
};
export default function PreviewToolbar({
  background,
  text,
  effect,
  templateSlug,
}: {
  background: BackgroundProp;
  text: TextProp;
  effect: EffectProp;
  templateSlug?: string;
}) {
  // Download filename prefix is just the host without the URL scheme.
  // Use the SEO host helper (it guards `process` for the browser).
  const host = getHost().replace(/^https?:\/\//, "");
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
  const [copied, setCopied] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(updateSize, [aspectRadio]); // eslint-disable-line react-hooks/set-state-in-effect

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
      const isTransparent = background.transparent;

      function drawThreeImage() {
        const image = new Image();
        image.onload = () => {
          if (!isTransparent) {
            ctx.drawImage(image, 0, 0, size.width, size.height);
          } else {
            // For transparent PNGs we want only the WebGL pixels (alpha preserved).
            ctx.clearRect(0, 0, size.width, size.height);
            ctx.drawImage(image, 0, 0, size.width, size.height);
          }
          resolve(canvas.toDataURL("image/png"));
        };
        image.src = threeimage;
      }
      if (!isTransparent) {
        if (background.gradient) {
          const [x0, y0, x1, y1] = getGradientCoordinates(
            background.gradient.direction,
            size.width,
            size.height
          );
          const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
          gradient.addColorStop(0, background.gradient.startColor);
          gradient.addColorStop(1, background.gradient.endColor);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, size.width, size.height);
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
      } else {
        // Transparent mode: skip all background fills, just composite the WebGL output.
        drawThreeImage();
      }

    });
  }

  const handleDownload = async () => {

    // 创建下载链接
    const link = document.createElement("a");
    const suffix = background.transparent ? "_transparent" : "";
    link.download = `${host}_${Sizes[aspectRadio]}${suffix}.png`;
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
      const imgDom = fullscreenElement.current!;

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

    const link = getShareLink({ bg, text, effect, templateSlug }, locale);

    setShareLink(link);

  }

  const copyLink = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }).catch(err => {
      console.error("copy error:", err);
      setShareError(t("copyFailed"));
    });
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
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      p={{ initial: "3", md: "4" }}
      className="shadow rounded-lg border w-full"
      gap={"4"}
    >

      {/* Transparent PNG hint bar (P3-1). Click jumps focus to the
          Background panel's transparent switch. */}
      <button
        type="button"
        onClick={() => {
          const sw = document.getElementById("transparent-bg-switch");
          if (sw) {
            sw.scrollIntoView({ behavior: "smooth", block: "center" });
            (sw as HTMLElement).focus();
          }
        }}
        className="group flex w-full items-center justify-center gap-2 rounded-full border border-border-subtle bg-surface-0/80 px-3 py-1.5 text-xs text-text-2 backdrop-blur transition-colors hover:border-brand-300 hover:text-brand-500"
        aria-label={background.transparent ? t("transparentActive") : t("transparentHint")}
      >
        <AnimatePresence mode="wait" initial={false}>
          {background.transparent ? (
            <motion.span
              key="active"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              <Check className="h-3.5 w-3.5 text-success-500" />
              <span>{t("transparentActive")}</span>
            </motion.span>
          ) : (
            <motion.span
              key="hint"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-500" />
              <span>{t("transparentHint")}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AspectRatio
        ratio={AspectRatios[aspectRadio]}
        className="w-full"
        style={{
          background:
            "repeating-conic-gradient(rgb(var(--surface-2)) 0% 25%, rgb(var(--surface-1)) 0% 50%)",
          backgroundSize: "40px 40px",
          maxWidth: "100%",
        }}
      >
        <canvas ref={container} className="w-full border border-border-subtle" style={{
          backgroundColor: background.color ? `${background.color}` : "rgba(0,0,0,0)",
          backgroundImage: getGradientBackgroundCss(background),
          backgroundRepeat: "no-repeat",
          backgroundSize: background.image ? "contain" : "cover",
          backgroundPosition: "center",
          maxWidth: size.width, maxHeight: size.height
        }} />
      </AspectRatio>

      {/* Fullscreen preview with motion fade + scale (P3-3) */}
      <AnimatePresence>
        {picture && (
          <motion.img
            ref={fullscreenElement}
            key="fullscreen-preview"
            src={picture}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="w-screen h-screen"
          />
        )}
      </AnimatePresence>

      <Flex gap={"4"} wrap="wrap" justify="center" align="center" className="w-full">

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
                <Button
                  variant="soft"
                  color={copied ? "green" : "blue"}
                  onClick={() => copyLink()}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Check className="h-3.5 w-3.5" />
                        {t("copied")}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        {t("shareDialogCopyLink")}
                      </motion.span>
                    )}
                  </AnimatePresence>
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


        <div className="flex flex-wrap items-center justify-center gap-4">
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
