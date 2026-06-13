// /editor — bare editor entry. Renders the editor with no preset state.
//
// In ssr: false mode this path is NOT prerendered; Cloudflare's SPA fallback
// (`__spa-fallback.html`) serves the shell and the client router mounts this
// module. The matching `/editor/:data` route uses a separate module
// (`editor-data.tsx`) that decodes ciphertext on the client.
import { OnlyPage } from "@/components/editor/OnlyPage";
import { buildSeoMeta } from "@/lib/seo/meta";
import { DEFAULT_OG_IMAGE } from "@/lib/seo/ogImage";
import type { Locale } from "@/lib/i18n/config";
import type { Route } from "./+types/editor-index";

export function meta({ location }: Route.MetaArgs) {
  const locale = (location.pathname.startsWith("/zh") ? "zh" : "en") as Locale;
  const title =
    locale === "zh"
      ? "3D 文字编辑器 — 免费在线 3D 文字生成器"
      : "3D Text Editor — Free Online 3D Text Generator";
  const description =
    locale === "zh"
      ? "在浏览器中实时编辑 3D 文字：字体、颜色、背景、阴影、特效，一键导出透明 PNG。"
      : "Edit 3D text in your browser in real time: font, color, background, shadow, effects. Export transparent PNG with one click.";
  const keywords =
    locale === "zh"
      ? ["3D 文字编辑器", "3D 文字生成器", "在线 3D 字体", "透明 PNG 导出"]
      : [
          "3d text editor",
          "3d text generator",
          "online 3d font editor",
          "transparent png export",
        ];
  return buildSeoMeta({
    title,
    description,
    keywords,
    ogImage: DEFAULT_OG_IMAGE,
    locale,
    pathname: location.pathname,
  });
}

export default function EditorIndexPage() {
  return (
    <OnlyPage
      textProp={undefined}
      backgroundProp={undefined}
      effectProp={undefined}
      currentStyle={undefined}
      relatedStyles={[]}
    />
  );
}
