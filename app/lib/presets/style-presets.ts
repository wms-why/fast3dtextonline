import { FontWeight, getFontPath } from "./fonts";
import type { ShareObj } from "../share-data";

type Locale = "en" | "zh";

export interface StyleLocaleContent {
  title: string;
  summary: string;
  description: string;
  useCases: string[];
}

export interface StyleVisualSpec {
  background: string;
  foreground: string;
  mutedForeground: string;
  panelBackground: string;
  panelBorder: string;
  accent: string;
  textGradient: string;
  textShadow: string;
  textStroke?: string;
  fontFamily: string;
  rotation?: string;
}

export interface StylePreset {
  slug: string;
  category: "playful" | "metallic" | "night" | "event";
  badge: string;
  previewText: string;
  keywords: string[];
  relatedSlugs: string[];
  spotlight: boolean;
  visual: StyleVisualSpec;
  editorPreset: ShareObj;
  en: StyleLocaleContent;
  zh: StyleLocaleContent;
}

type PresetInput = {
  text: string;
  font: string;
  weight: FontWeight;
  textColor: string | [string, string];
  backgroundColor?: string;
  backgroundGradient?: {
    direction: "leftToRight" | "topToBottom" | "topLeftToBottomRight" | "bottomLeftToTopRight";
    startColor: string;
    endColor: string;
  };
  shadowColor: string;
};

function createEditorPreset({
  text,
  font,
  weight,
  textColor,
  backgroundColor,
  backgroundGradient,
  shadowColor,
}: PresetInput): ShareObj {
  return {
    bg: {
      color: backgroundGradient ? null : (backgroundColor ?? "#111111"),
      gradient: backgroundGradient ?? null,
      image: null,
      transparent: false,
    },
    text: {
      text,
      color: textColor,
      colorGradientDir: "t2b",
      font,
      fontFrom: 0,
      fontUrl: getFontPath(font, weight),
      weight,
    },
    effect: {
      enableShadow: true,
      shadowColor,
      shadowBlur: 6,
      shadowOpacity: 0.3,
      shadowOffsetX: 0,
      shadowOffsetY: -6,
      strokeColor: "#ffffff",
      strokeWidth: 0,
    },
  };
}

const rawStylePresets: StylePreset[] = [
  {
    slug: "barbie-pink",
    category: "playful",
    badge: "Playful",
    previewText: "Dream Pop",
    keywords: ["barbie text", "pink 3d text", "cute logo text"],
    relatedSlugs: ["candy-pop", "retro-arcade", "ocean-glass"],
    spotlight: true,
    visual: {
      background:
        "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.78), transparent 18%), linear-gradient(135deg, #ffe5f2 0%, #ffc6df 42%, #ff8bbb 100%)",
      foreground: "#3d1230",
      mutedForeground: "rgba(61, 18, 48, 0.78)",
      panelBackground: "rgba(255, 250, 253, 0.72)",
      panelBorder: "rgba(255, 95, 156, 0.32)",
      accent: "#ff5d9c",
      textGradient: "linear-gradient(180deg, #ff74c5 0%, #ff4aa4 46%, #ffdfef 100%)",
      textShadow: "0 12px 28px rgba(204, 25, 117, 0.28)",
      textStroke: "1px rgba(255,255,255,0.65)",
      fontFamily: "\"Public Sans\", \"Trebuchet MS\", \"Avenir Next\", sans-serif",
      rotation: "rotate(-3deg)",
    },
    editorPreset: createEditorPreset({
      text: "Dream Pop",
      font: "Bartex",
      weight: FontWeight.Regular,
      textColor: ["#ff5ac7", "#ff94da"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#ffe9f4",
        endColor: "#ff9bc5",
      },
      shadowColor: "#c74186",
    }),
    en: {
      title: "Barbie Pink 3D Text Generator",
      summary: "Pastel, playful, instantly usable for cute logos and social posts.",
      description:
        "A soft-pink 3D text preset for playful branding, birthday graphics, and trend-driven social visuals.",
      useCases: ["Birthday invites", "Cute logo mockups", "TikTok cover text"],
    },
    zh: {
      title: "芭比粉 3D 文字生成器",
      summary: "偏可爱和玩具感，适合社媒标题、生日海报和轻品牌视觉。",
      description:
        "一个即开即用的粉色 3D 文字模板，适合做可爱风 logo、生日图文和社媒封面。",
      useCases: ["生日邀请图", "可爱风 logo", "短视频封面标题"],
    },
  },
  {
    slug: "chrome-sheen",
    category: "metallic",
    badge: "Metallic",
    previewText: "Chrome",
    keywords: ["chrome text", "silver 3d text", "metal logo text"],
    relatedSlugs: ["molten-gold", "ocean-glass", "retro-arcade"],
    spotlight: true,
    visual: {
      background:
        "radial-gradient(circle at top, rgba(130, 150, 196, 0.2), transparent 35%), linear-gradient(140deg, #08131f 0%, #16283a 45%, #06090d 100%)",
      foreground: "#f4f8ff",
      mutedForeground: "rgba(244, 248, 255, 0.78)",
      panelBackground: "rgba(7, 14, 24, 0.68)",
      panelBorder: "rgba(160, 189, 233, 0.3)",
      accent: "#a9d1ff",
      textGradient: "linear-gradient(180deg, #f8fbff 0%, #b0becf 40%, #ffffff 58%, #68798c 100%)",
      textShadow: "0 18px 34px rgba(4, 8, 14, 0.58)",
      textStroke: "1px rgba(210, 225, 255, 0.45)",
      fontFamily: "\"Archivo\", \"Public Sans\", \"Arial Black\", \"Trebuchet MS\", sans-serif",
      rotation: "rotate(-2deg)",
    },
    editorPreset: createEditorPreset({
      text: "Chrome",
      font: "Helvetiker",
      weight: FontWeight.Bold,
      textColor: ["#f5f7fa", "#8e9baa"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#0d1b2b",
        endColor: "#06090d",
      },
      shadowColor: "#020406",
    }),
    en: {
      title: "Chrome 3D Text Generator",
      summary: "Clean metallic lettering for gaming titles, emblems, and hard-surface branding.",
      description:
        "A silver chrome text preset designed for logo concepts, futuristic posters, and high-contrast hero titles.",
      useCases: ["Gaming header", "Futuristic logo", "Poster headline"],
    },
    zh: {
      title: "银铬质感 3D 文字生成器",
      summary: "偏金属工业感，适合游戏标题、海报主标题和科技感 logo。",
      description:
        "这个模板主打银铬高光和深色背景，适合做未来感标题、金属字效和硬朗品牌视觉。",
      useCases: ["游戏标题", "科技海报", "金属风 logo"],
    },
  },
  {
    slug: "neon-night",
    category: "night",
    badge: "Night",
    previewText: "Neon Rush",
    keywords: ["neon text", "glow text", "cyberpunk text"],
    relatedSlugs: ["retro-arcade", "chrome-sheen", "horror-slime"],
    spotlight: true,
    visual: {
      background:
        "radial-gradient(circle at 30% 20%, rgba(255, 87, 185, 0.18), transparent 22%), radial-gradient(circle at 70% 10%, rgba(66, 228, 255, 0.18), transparent 18%), linear-gradient(145deg, #070b1f 0%, #0f1430 50%, #04060f 100%)",
      foreground: "#f5fbff",
      mutedForeground: "rgba(245, 251, 255, 0.78)",
      panelBackground: "rgba(6, 10, 28, 0.72)",
      panelBorder: "rgba(88, 236, 255, 0.28)",
      accent: "#58ecff",
      textGradient: "linear-gradient(180deg, #8af7ff 0%, #62d8ff 30%, #ff79d3 100%)",
      textShadow: "0 0 24px rgba(88, 236, 255, 0.38), 0 18px 30px rgba(0, 0, 0, 0.52)",
      textStroke: "1px rgba(255,255,255,0.12)",
      fontFamily: "\"Archivo\", \"Anton\", \"Arial Black\", \"Impact\", sans-serif",
      rotation: "rotate(-4deg)",
    },
    editorPreset: createEditorPreset({
      text: "Neon Rush",
      font: "Optimer",
      weight: FontWeight.Bold,
      textColor: ["#73f5ff", "#ff5fb7"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#0f1430",
        endColor: "#04060f",
      },
      shadowColor: "#00ccff",
    }),
    en: {
      title: "Neon 3D Text Generator",
      summary: "Fast cyber glow for streaming covers, club posters, and synth-heavy visuals.",
      description:
        "A neon-ready preset with blue-pink glow, designed for social covers, cyberpunk headers, and nightlife graphics.",
      useCases: ["YouTube thumbnail", "Club flyer", "Cyber banner"],
    },
    zh: {
      title: "霓虹夜景 3D 文字生成器",
      summary: "蓝粉发光风格，适合直播封面、夜店海报和赛博感标题。",
      description:
        "这个模板强调霓虹渐变和暗背景反差，适合做发光字、夜景海报和赛博主题封面。",
      useCases: ["直播封面", "夜店海报", "赛博横幅"],
    },
  },
  {
    slug: "molten-gold",
    category: "metallic",
    badge: "Luxury",
    previewText: "Golden Hour",
    keywords: ["gold text", "luxury logo text", "3d gold letters"],
    relatedSlugs: ["chrome-sheen", "fireburst", "ocean-glass"],
    spotlight: true,
    visual: {
      background:
        "radial-gradient(circle at 50% 0%, rgba(255, 212, 122, 0.16), transparent 28%), linear-gradient(135deg, #1d1202 0%, #2f1803 36%, #130b01 100%)",
      foreground: "#fff5dd",
      mutedForeground: "rgba(255, 245, 221, 0.78)",
      panelBackground: "rgba(27, 17, 2, 0.68)",
      panelBorder: "rgba(255, 188, 74, 0.34)",
      accent: "#f7be5b",
      textGradient: "linear-gradient(180deg, #fff0a5 0%, #e8b546 45%, #8d5a0c 100%)",
      textShadow: "0 16px 30px rgba(0, 0, 0, 0.48)",
      textStroke: "1px rgba(255, 230, 164, 0.24)",
      fontFamily: "\"Merriweather\", \"Georgia\", \"Palatino Linotype\", serif",
      rotation: "rotate(-2deg)",
    },
    editorPreset: createEditorPreset({
      text: "Golden Hour",
      font: "Helvetiker",
      weight: FontWeight.Bold,
      textColor: ["#ffd86b", "#996315"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#352007",
        endColor: "#130b01",
      },
      shadowColor: "#2b1900",
    }),
    en: {
      title: "Gold 3D Text Generator",
      summary: "Warm luxury lettering for premium launches, badges, and celebratory titles.",
      description:
        "A polished gold text preset tuned for high-contrast hero words, luxury product mockups, and festive title art.",
      useCases: ["Luxury brand title", "Award badge", "Event cover"],
    },
    zh: {
      title: "熔金质感 3D 文字生成器",
      summary: "偏高级和庆典感，适合高端封面、奖章字效和活动主标题。",
      description:
        "这个模板用深底配金色高光，适合做奢华感标题、年会视觉和高端品牌字效。",
      useCases: ["高端品牌标题", "奖项视觉", "活动封面"],
    },
  },
  {
    slug: "fireburst",
    category: "event",
    badge: "Hot",
    previewText: "Fire Up",
    keywords: ["fire text", "flame letters", "hot text effect"],
    relatedSlugs: ["molten-gold", "horror-slime", "chrome-sheen"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 50% 0%, rgba(255, 116, 42, 0.25), transparent 25%), linear-gradient(135deg, #180706 0%, #33140f 38%, #0d0505 100%)",
      foreground: "#fff2e8",
      mutedForeground: "rgba(255, 242, 232, 0.78)",
      panelBackground: "rgba(24, 7, 6, 0.72)",
      panelBorder: "rgba(255, 130, 42, 0.3)",
      accent: "#ff8c34",
      textGradient: "linear-gradient(180deg, #fff49d 0%, #ffb02e 42%, #ff5d21 100%)",
      textShadow: "0 14px 24px rgba(0, 0, 0, 0.52)",
      textStroke: "1px rgba(255, 197, 129, 0.22)",
      fontFamily: "\"Anton\", \"Archivo\", \"Impact\", \"Arial Black\", sans-serif",
      rotation: "rotate(-4deg)",
    },
    editorPreset: createEditorPreset({
      text: "Fire Up",
      font: "Gentilis",
      weight: FontWeight.Bold,
      textColor: ["#ffd953", "#ff5b22"],
      backgroundGradient: {
        direction: "topToBottom",
        startColor: "#39130e",
        endColor: "#0d0505",
      },
      shadowColor: "#431200",
    }),
    en: {
      title: "Fire 3D Text Generator",
      summary: "Hot, urgent, and made for promos, sports edits, and explosive thumbnails.",
      description:
        "A bold fire text preset for energetic launch graphics, competitive gaming art, and dramatic promo words.",
      useCases: ["Promo poster", "Sports edit", "Gaming thumbnail"],
    },
    zh: {
      title: "火焰爆发 3D 文字生成器",
      summary: "高冲击力风格，适合促销图、运动海报和爆炸感封面。",
      description:
        "这个模板强调高热度和冲击感，适合做火焰字、热血海报和紧迫感标题。",
      useCases: ["促销海报", "运动剪辑", "游戏缩略图"],
    },
  },
  {
    slug: "candy-pop",
    category: "playful",
    badge: "Sweet",
    previewText: "Candy Pop",
    keywords: ["bubble text", "cute text generator", "sweet text effect"],
    relatedSlugs: ["barbie-pink", "retro-arcade", "ocean-glass"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 80% 18%, rgba(255, 255, 255, 0.75), transparent 16%), linear-gradient(135deg, #fff0b6 0%, #ffd6df 44%, #ffc6eb 100%)",
      foreground: "#4b243f",
      mutedForeground: "rgba(75, 36, 63, 0.78)",
      panelBackground: "rgba(255, 250, 240, 0.72)",
      panelBorder: "rgba(255, 123, 182, 0.28)",
      accent: "#ff6eb7",
      textGradient: "linear-gradient(180deg, #fff8ff 0%, #ff9fd7 45%, #ff6eb7 100%)",
      textShadow: "0 14px 26px rgba(236, 85, 163, 0.24)",
      textStroke: "1px rgba(255,255,255,0.62)",
      fontFamily: "\"Public Sans\", \"Verdana\", \"Trebuchet MS\", sans-serif",
      rotation: "rotate(-2deg)",
    },
    editorPreset: createEditorPreset({
      text: "Candy Pop",
      font: "Barbie_Doll",
      weight: FontWeight.Regular,
      textColor: ["#ff8ec5", "#ff6bb4"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#fff6c8",
        endColor: "#ffc9ea",
      },
      shadowColor: "#d8649d",
    }),
    en: {
      title: "Candy 3D Text Generator",
      summary: "Rounded and bright for kids graphics, cheerful promos, and playful labels.",
      description:
        "A candy-colored 3D text preset tuned for cute promos, children-facing visuals, and fun digital stickers.",
      useCases: ["Kids poster", "Cute campaign", "Sticker title"],
    },
    zh: {
      title: "糖果泡泡 3D 文字生成器",
      summary: "轻松、甜感、明快，适合儿童海报、促销小图和趣味标签。",
      description:
        "这个模板偏泡泡糖和糖果色，适合做儿童视觉、甜品海报和轻娱乐内容标题。",
      useCases: ["儿童海报", "甜品宣传", "贴纸标题"],
    },
  },
  {
    slug: "ocean-glass",
    category: "metallic",
    badge: "Glass",
    previewText: "Aqua Glass",
    keywords: ["glass text", "ice text effect", "aqua logo text"],
    relatedSlugs: ["chrome-sheen", "molten-gold", "barbie-pink"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 50% 0%, rgba(183, 244, 255, 0.18), transparent 24%), linear-gradient(140deg, #022737 0%, #0c4e63 48%, #021821 100%)",
      foreground: "#f2fcff",
      mutedForeground: "rgba(242, 252, 255, 0.78)",
      panelBackground: "rgba(2, 34, 47, 0.7)",
      panelBorder: "rgba(135, 226, 255, 0.28)",
      accent: "#7ce6ff",
      textGradient: "linear-gradient(180deg, #f4ffff 0%, #acecff 45%, #5bcde8 100%)",
      textShadow: "0 16px 28px rgba(0, 0, 0, 0.42)",
      textStroke: "1px rgba(255,255,255,0.24)",
      fontFamily: "\"Public Sans\", \"Gill Sans\", \"Trebuchet MS\", sans-serif",
      rotation: "rotate(-2deg)",
    },
    editorPreset: createEditorPreset({
      text: "Aqua Glass",
      font: "Optimer",
      weight: FontWeight.Regular,
      textColor: ["#ecffff", "#7ce2ff"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#0b5369",
        endColor: "#021821",
      },
      shadowColor: "#01151d",
    }),
    en: {
      title: "Glass 3D Text Generator",
      summary: "Cool transparent energy for beauty campaigns, water themes, and ice-like branding.",
      description:
        "A glossy aqua preset for watery identities, clean product banners, and chilled seasonal title cards.",
      useCases: ["Skincare hero text", "Water event banner", "Ice title art"],
    },
    zh: {
      title: "海洋玻璃 3D 文字生成器",
      summary: "清透、冷感、偏水光，适合美妆横幅、海洋主题和冰感字效。",
      description:
        "这个模板强调玻璃感和海蓝渐变，适合做清爽型品牌视觉、水感封面和冰透标题。",
      useCases: ["美妆主视觉", "海洋主题横幅", "冰感标题"],
    },
  },
  {
    slug: "retro-arcade",
    category: "night",
    badge: "Retro",
    previewText: "Pixel Party",
    keywords: ["retro text", "arcade text", "80s text effect"],
    relatedSlugs: ["neon-night", "barbie-pink", "candy-pop"],
    spotlight: false,
    visual: {
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 100%), linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 100%), linear-gradient(135deg, #180632 0%, #35155c 45%, #090417 100%)",
      foreground: "#fbf5ff",
      mutedForeground: "rgba(251, 245, 255, 0.78)",
      panelBackground: "rgba(19, 7, 41, 0.72)",
      panelBorder: "rgba(119, 103, 255, 0.3)",
      accent: "#8a75ff",
      textGradient: "linear-gradient(180deg, #ffd968 0%, #ff79bc 50%, #8e8dff 100%)",
      textShadow: "0 16px 26px rgba(0, 0, 0, 0.44)",
      textStroke: "1px rgba(255,255,255,0.18)",
      fontFamily: "\"Archivo\", \"Public Sans\", \"Arial Black\", \"Tahoma\", sans-serif",
      rotation: "rotate(-4deg)",
    },
    editorPreset: createEditorPreset({
      text: "Pixel Party",
      font: "Helvetiker",
      weight: FontWeight.Bold,
      textColor: ["#ffd65b", "#ff68bd"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#35155c",
        endColor: "#090417",
      },
      shadowColor: "#14031b",
    }),
    en: {
      title: "Retro Arcade 3D Text Generator",
      summary: "Bold neon nostalgia for 80s posters, gaming streams, and party cards.",
      description:
        "A retro-futuristic 3D text preset for arcade covers, synthwave artwork, and playful digital posters.",
      useCases: ["Arcade poster", "Party invite", "Gaming stream art"],
    },
    zh: {
      title: "复古街机 3D 文字生成器",
      summary: "霓虹复古风格，适合 80s 海报、游戏直播封面和派对邀请图。",
      description:
        "这个模板偏街机和合成波氛围，适合做怀旧标题、派对主视觉和游戏频道封面。",
      useCases: ["复古海报", "派对邀请图", "游戏直播封面"],
    },
  },
  {
    slug: "horror-slime",
    category: "event",
    badge: "Spooky",
    previewText: "Toxic Night",
    keywords: ["halloween text", "slime text", "horror title"],
    relatedSlugs: ["fireburst", "neon-night", "retro-arcade"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 50% 8%, rgba(103, 255, 77, 0.14), transparent 20%), linear-gradient(140deg, #120f14 0%, #231928 40%, #09070a 100%)",
      foreground: "#f4ffe9",
      mutedForeground: "rgba(244, 255, 233, 0.78)",
      panelBackground: "rgba(18, 15, 20, 0.72)",
      panelBorder: "rgba(132, 255, 93, 0.22)",
      accent: "#84ff5d",
      textGradient: "linear-gradient(180deg, #d6ff73 0%, #87df39 55%, #386d0f 100%)",
      textShadow: "0 16px 28px rgba(0, 0, 0, 0.5)",
      textStroke: "1px rgba(234, 255, 190, 0.18)",
      fontFamily: "\"Anton\", \"Archivo\", \"Impact\", \"Arial Black\", sans-serif",
      rotation: "rotate(-3deg)",
    },
    editorPreset: createEditorPreset({
      text: "Toxic Night",
      font: "Gentilis",
      weight: FontWeight.Bold,
      textColor: ["#b6ff57", "#4f8f1e"],
      backgroundGradient: {
        direction: "topToBottom",
        startColor: "#231928",
        endColor: "#09070a",
      },
      shadowColor: "#0a0a0a",
    }),
    en: {
      title: "Horror Slime 3D Text Generator",
      summary: "Perfect for Halloween graphics, spooky thumbnails, and eerie campaign art.",
      description:
        "A toxic green horror preset for Halloween promos, haunted event covers, and creepy title screens.",
      useCases: ["Halloween flyer", "Spooky thumbnail", "Haunted event title"],
    },
    zh: {
      title: "恐怖史莱姆 3D 文字生成器",
      summary: "适合万圣节、恐怖海报、惊悚视频封面等偏暗黑主题。",
      description:
        "这个模板是带毒性绿色的恐怖风字效，适合做万圣节活动图、惊悚封面和怪诞标题。",
      useCases: ["万圣节海报", "惊悚缩略图", "鬼屋活动标题"],
    },
  },
  {
    slug: "graffiti-splash",
    category: "playful",
    badge: "Street",
    previewText: "Street Hit",
    keywords: ["graffiti text", "street logo text", "spray paint letters"],
    relatedSlugs: ["fireburst", "candy-pop", "retro-arcade"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 16% 18%, rgba(255, 117, 80, 0.18), transparent 16%), radial-gradient(circle at 86% 26%, rgba(80, 154, 255, 0.18), transparent 18%), linear-gradient(135deg, #f1f5fb 0%, #dce7f7 45%, #edf2fb 100%)",
      foreground: "#1d2f4d",
      mutedForeground: "rgba(29, 47, 77, 0.78)",
      panelBackground: "rgba(255, 255, 255, 0.72)",
      panelBorder: "rgba(59, 94, 146, 0.14)",
      accent: "#ff6c4d",
      textGradient: "linear-gradient(180deg, #ff8c5f 0%, #ff5d51 48%, #fbd55b 100%)",
      textShadow: "0 14px 24px rgba(54, 72, 108, 0.18)",
      textStroke: "1px rgba(255,255,255,0.72)",
      fontFamily: "\"Archivo\", \"Public Sans\", \"Arial Black\", \"Verdana\", sans-serif",
      rotation: "rotate(-5deg)",
    },
    editorPreset: createEditorPreset({
      text: "Street Hit",
      font: "Optimer",
      weight: FontWeight.Bold,
      textColor: ["#ff8656", "#ffcd50"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#f4f7fc",
        endColor: "#dce7f7",
      },
      shadowColor: "#8095c2",
    }),
    en: {
      title: "Graffiti 3D Text Generator",
      summary: "Street-ready lettering for youth posters, challenge videos, and loud social visuals.",
      description:
        "A punchy graffiti preset made for poster headlines, challenge thumbnails, and energetic brand drops.",
      useCases: ["Streetwear drop", "Challenge cover", "Poster header"],
    },
    zh: {
      title: "街头涂鸦 3D 文字生成器",
      summary: "偏街头、偏年轻，适合潮流海报、挑战视频封面和社媒宣传图。",
      description:
        "这个模板适合做街头品牌标题、潮流视觉和高情绪感的社媒大字。",
      useCases: ["潮流上新海报", "挑战视频封面", "街头活动标题"],
    },
  },
  {
    slug: "bubble-letters",
    category: "playful",
    badge: "Bubble",
    previewText: "Bubble Fun",
    keywords: ["bubble letters generator", "bubble text generator", "3d bubble letters"],
    relatedSlugs: ["candy-pop", "barbie-pink", "comic-pop"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8), transparent 18%), radial-gradient(circle at 85% 24%, rgba(255, 214, 98, 0.2), transparent 18%), linear-gradient(135deg, #c7f0ff 0%, #b7d8ff 46%, #ffd5e8 100%)",
      foreground: "#243154",
      mutedForeground: "rgba(36, 49, 84, 0.76)",
      panelBackground: "rgba(255, 255, 255, 0.74)",
      panelBorder: "rgba(115, 154, 255, 0.24)",
      accent: "#5f91ff",
      textGradient: "linear-gradient(180deg, #fff8a8 0%, #ff8fc9 48%, #8ed1ff 100%)",
      textShadow: "0 16px 28px rgba(76, 109, 173, 0.2)",
      textStroke: "1px rgba(255,255,255,0.72)",
      fontFamily: "\"Baloo 2\", \"Public Sans\", \"Trebuchet MS\", sans-serif",
      rotation: "rotate(-4deg)",
    },
    editorPreset: createEditorPreset({
      text: "Bubble Fun",
      font: "Optimer",
      weight: FontWeight.Bold,
      textColor: ["#ffd95a", "#ff89c4"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#d7f4ff",
        endColor: "#ffd8eb",
      },
      shadowColor: "#7ba0e6",
    }),
    en: {
      title: "Bubble Letters 3D Text Generator",
      summary: "Rounded bubble lettering for kids graphics, cute logos, and playful social covers.",
      description:
        "Create soft, inflated bubble letters online for birthday cards, classroom posters, and colorful brand graphics without installing design software.",
      useCases: ["Birthday card title", "Kids poster text", "Cute logo mockup"],
    },
    zh: {
      title: "泡泡字 3D 文字生成器",
      summary: "圆润膨胀感很强，适合儿童海报、可爱 logo 和轻松社媒封面。",
      description:
        "在线生成柔软、膨胀感明显的泡泡字，适合生日卡片、课堂海报和偏可爱的品牌标题，无需安装软件。",
      useCases: ["生日卡标题", "儿童海报大字", "可爱 logo 草图"],
    },
  },
  {
    slug: "ice-frost",
    category: "metallic",
    badge: "Frozen",
    previewText: "Ice Frost",
    keywords: ["ice text generator", "frozen text effect", "3d ice letters"],
    relatedSlugs: ["ocean-glass", "chrome-sheen", "neon-night"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.65), transparent 15%), radial-gradient(circle at 82% 18%, rgba(188, 232, 255, 0.28), transparent 20%), linear-gradient(145deg, #e6f6ff 0%, #cdeaff 46%, #a9d2ef 100%)",
      foreground: "#12324f",
      mutedForeground: "rgba(18, 50, 79, 0.76)",
      panelBackground: "rgba(255, 255, 255, 0.66)",
      panelBorder: "rgba(95, 157, 204, 0.26)",
      accent: "#49a9df",
      textGradient: "linear-gradient(180deg, #ffffff 0%, #d8f5ff 28%, #9cd7ff 62%, #5ea7d2 100%)",
      textShadow: "0 16px 30px rgba(82, 144, 186, 0.24)",
      textStroke: "1px rgba(255,255,255,0.84)",
      fontFamily: "\"Merriweather Sans\", \"Public Sans\", \"Trebuchet MS\", sans-serif",
      rotation: "rotate(-2deg)",
    },
    editorPreset: createEditorPreset({
      text: "Ice Frost",
      font: "Helvetiker",
      weight: FontWeight.Bold,
      textColor: ["#f7fdff", "#8fd8ff"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#edf9ff",
        endColor: "#b5dff2",
      },
      shadowColor: "#69a9ca",
    }),
    en: {
      title: "Ice Text 3D Generator",
      summary: "Cold blue lettering for winter promos, frozen-style posters, and crisp thumbnails.",
      description:
        "Generate frozen 3D text online with icy highlights and pale blue depth, ideal for winter banners, frosty posters, and cold-themed social graphics.",
      useCases: ["Winter event poster", "Frozen-style title", "Cold-theme thumbnail"],
    },
    zh: {
      title: "冰霜字 3D 文字生成器",
      summary: "偏冷调和冰透感，适合冬季活动、冰雪海报和清冷风封面。",
      description:
        "在线生成带冰霜高光和蓝白层次的 3D 冰字，适合冬季横幅、冰雪主题海报和冷色社媒视觉。",
      useCases: ["冬季活动海报", "冰雪主题标题", "冷色缩略图"],
    },
  },
  {
    slug: "black-metal",
    category: "night",
    badge: "Heavy",
    previewText: "Night Riff",
    keywords: ["metal band logo text", "black metal font generator", "heavy metal text"],
    relatedSlugs: ["chrome-sheen", "horror-slime", "sports-flame"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 50% 0%, rgba(176, 176, 176, 0.12), transparent 20%), linear-gradient(145deg, #0a0a0c 0%, #17181d 48%, #050507 100%)",
      foreground: "#f4f4f4",
      mutedForeground: "rgba(244, 244, 244, 0.74)",
      panelBackground: "rgba(19, 20, 24, 0.78)",
      panelBorder: "rgba(214, 214, 214, 0.16)",
      accent: "#d8d8d8",
      textGradient: "linear-gradient(180deg, #ffffff 0%, #bbbbbb 36%, #5f5f63 100%)",
      textShadow: "0 18px 32px rgba(0, 0, 0, 0.62)",
      textStroke: "1px rgba(255,255,255,0.16)",
      fontFamily: "\"Archivo\", \"Impact\", \"Arial Black\", sans-serif",
      rotation: "rotate(-3deg)",
    },
    editorPreset: createEditorPreset({
      text: "Night Riff",
      font: "Helvetiker",
      weight: FontWeight.Bold,
      textColor: ["#fcfcfc", "#6c6c72"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#18191f",
        endColor: "#050507",
      },
      shadowColor: "#000000",
    }),
    en: {
      title: "Black Metal 3D Text Generator",
      summary: "Dark, sharp lettering for metal band names, gig posters, and intense promo art.",
      description:
        "Build heavy metal style text online with silver-black contrast, dramatic depth, and a stage-ready mood for band logos and dark posters.",
      useCases: ["Band name mockup", "Gig poster title", "Dark promo header"],
    },
    zh: {
      title: "黑金属风 3D 文字生成器",
      summary: "偏硬朗和暗黑，适合乐队名、演出海报和重型风格宣传图。",
      description:
        "在线制作银黑对比强烈的重金属字效，适合乐队 logo、演出主标题和偏暗黑的宣传视觉。",
      useCases: ["乐队名草图", "演出海报标题", "暗黑宣传横幅"],
    },
  },
  {
    slug: "comic-pop",
    category: "playful",
    badge: "Comic",
    previewText: "Pow Pop",
    keywords: ["comic text generator", "cartoon text effect", "pop art text"],
    relatedSlugs: ["bubble-letters", "graffiti-splash", "candy-pop"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 20% 22%, rgba(255,255,255,0.7), transparent 14%), linear-gradient(135deg, #fff173 0%, #ffb341 48%, #ff6f61 100%)",
      foreground: "#35162b",
      mutedForeground: "rgba(53, 22, 43, 0.76)",
      panelBackground: "rgba(255, 248, 225, 0.7)",
      panelBorder: "rgba(147, 63, 69, 0.2)",
      accent: "#ff5e57",
      textGradient: "linear-gradient(180deg, #fffa92 0%, #ff8a54 44%, #ff4f8b 100%)",
      textShadow: "0 16px 24px rgba(123, 50, 68, 0.22)",
      textStroke: "1px rgba(255,255,255,0.64)",
      fontFamily: "\"Bangers\", \"Archivo\", \"Arial Black\", sans-serif",
      rotation: "rotate(-4deg)",
    },
    editorPreset: createEditorPreset({
      text: "Pow Pop",
      font: "Optimer",
      weight: FontWeight.Bold,
      textColor: ["#fff36c", "#ff5f85"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#fff47e",
        endColor: "#ff8260",
      },
      shadowColor: "#bf4d47",
    }),
    en: {
      title: "Comic Text 3D Generator",
      summary: "Bright comic lettering for cartoon covers, sale bursts, and pop-art thumbnails.",
      description:
        "Make comic-style 3D text online with loud gradients and poster-ready contrast for cartoon titles, promo stickers, and pop-art layouts.",
      useCases: ["Cartoon cover", "Promo burst text", "Pop-art headline"],
    },
    zh: {
      title: "漫画风 3D 文字生成器",
      summary: "高饱和、夸张、带漫画感，适合卡通封面、促销贴片和波普海报。",
      description:
        "在线生成漫画风 3D 文字，适合做卡通标题、促销爆炸贴和高情绪的波普视觉。",
      useCases: ["卡通封面标题", "促销爆炸字", "波普海报文案"],
    },
  },
  {
    slug: "sports-flame",
    category: "event",
    badge: "Sports",
    previewText: "Game On",
    keywords: ["sports logo text", "team name generator", "flame text effect"],
    relatedSlugs: ["fireburst", "black-metal", "chrome-sheen"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 50% 12%, rgba(255, 195, 86, 0.18), transparent 18%), linear-gradient(145deg, #0f1625 0%, #1d2438 42%, #090c12 100%)",
      foreground: "#fff4dc",
      mutedForeground: "rgba(255, 244, 220, 0.78)",
      panelBackground: "rgba(18, 24, 38, 0.72)",
      panelBorder: "rgba(255, 132, 44, 0.28)",
      accent: "#ff7c2f",
      textGradient: "linear-gradient(180deg, #ffe87e 0%, #ff8a38 46%, #cf2f19 100%)",
      textShadow: "0 18px 32px rgba(0, 0, 0, 0.48)",
      textStroke: "1px rgba(255,235,184,0.28)",
      fontFamily: "\"Archivo\", \"Anton\", \"Arial Black\", sans-serif",
      rotation: "rotate(-3deg)",
    },
    editorPreset: createEditorPreset({
      text: "Game On",
      font: "Helvetiker",
      weight: FontWeight.Bold,
      textColor: ["#ffd968", "#e34822"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#1a2338",
        endColor: "#090c12",
      },
      shadowColor: "#05070d",
    }),
    en: {
      title: "Sports Logo 3D Text Generator",
      summary: "Bold flame-ready text for team names, esports banners, and competitive poster titles.",
      description:
        "Generate sports-style 3D text online with orange heat, dark contrast, and hard-edged lettering for team logos, esports covers, and game-day graphics.",
      useCases: ["Team name concept", "Esports banner", "Game-day poster"],
    },
    zh: {
      title: "运动火焰风 3D 文字生成器",
      summary: "适合队名、电竞横幅和比赛海报，整体更偏竞技和热血感。",
      description:
        "在线生成带火焰渐变和深色反差的运动风 3D 文字，适合队名 logo、电竞封面和比赛日宣传图。",
      useCases: ["队名概念图", "电竞横幅", "比赛海报标题"],
    },
  },
  {
    slug: "luxury-serif",
    category: "metallic",
    badge: "Premium",
    previewText: "Maison",
    keywords: ["luxury logo text", "elegant gold text", "premium brand text"],
    relatedSlugs: ["molten-gold", "chrome-sheen", "barbie-pink"],
    spotlight: false,
    visual: {
      background:
        "radial-gradient(circle at 18% 16%, rgba(255, 240, 210, 0.22), transparent 18%), linear-gradient(135deg, #f7efe3 0%, #eadcc8 46%, #d9c2a0 100%)",
      foreground: "#402714",
      mutedForeground: "rgba(64, 39, 20, 0.76)",
      panelBackground: "rgba(255, 251, 243, 0.72)",
      panelBorder: "rgba(140, 96, 42, 0.18)",
      accent: "#b98547",
      textGradient: "linear-gradient(180deg, #fff3cf 0%, #d9b273 44%, #8b5f2d 100%)",
      textShadow: "0 16px 28px rgba(123, 84, 40, 0.2)",
      textStroke: "1px rgba(255,255,255,0.6)",
      fontFamily: "\"Merriweather\", \"Georgia\", serif",
      rotation: "rotate(-2deg)",
    },
    editorPreset: createEditorPreset({
      text: "Maison",
      font: "Optimer",
      weight: FontWeight.Bold,
      textColor: ["#f8e2b5", "#9f6a31"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#fbf2e5",
        endColor: "#dcc3a2",
      },
      shadowColor: "#b08b5d",
    }),
    en: {
      title: "Luxury Serif 3D Text Generator",
      summary: "Elegant gold serif lettering for premium brands, invitations, and fashion titles.",
      description:
        "Create refined luxury text online with warm gold highlights and serif depth for boutique logos, premium packaging mockups, and upscale campaign graphics.",
      useCases: ["Boutique logo text", "Luxury invitation", "Premium campaign title"],
    },
    zh: {
      title: "高级衬线 3D 文字生成器",
      summary: "偏高级、偏轻奢，适合精品品牌、邀请函和时尚类标题。",
      description:
        "在线生成带金色高光和衬线结构的高级感 3D 文字，适合精品 logo、轻奢包装和品牌活动主标题。",
      useCases: ["精品 logo 标题", "轻奢邀请函", "品牌活动主视觉"],
    },
  },
  {
    slug: "rose-gold",
    category: "metallic",
    badge: "Rose Gold",
    previewText: "Rose Luxe",
    keywords: ["rose gold text", "rose gold logo", "elegant pink gold text"],
    relatedSlugs: ["luxury-serif", "molten-gold", "barbie-pink"],
    spotlight: true,
    visual: {
      background:
        "radial-gradient(circle at 18% 16%, rgba(255,255,255,0.74), transparent 16%), linear-gradient(135deg, #fff1ee 0%, #f3d7d2 42%, #d9b0a8 100%)",
      foreground: "#4f2f2e",
      mutedForeground: "rgba(79, 47, 46, 0.76)",
      panelBackground: "rgba(255, 251, 249, 0.76)",
      panelBorder: "rgba(183, 122, 112, 0.22)",
      accent: "#c97970",
      textGradient: "linear-gradient(180deg, #fff5f1 0%, #f1c5bc 40%, #c47a6f 100%)",
      textShadow: "0 16px 28px rgba(137, 92, 84, 0.22)",
      textStroke: "1px rgba(255,255,255,0.7)",
      fontFamily: "\"Merriweather\", \"Georgia\", serif",
      rotation: "rotate(-2deg)",
    },
    editorPreset: createEditorPreset({
      text: "Rose Luxe",
      font: "Optimer",
      weight: FontWeight.Bold,
      textColor: ["#fde7df", "#c77769"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#fff4ef",
        endColor: "#ddb1a7",
      },
      shadowColor: "#9b655e",
    }),
    en: {
      title: "Rose Gold 3D Text Generator",
      summary: "Soft metallic lettering for beauty brands, feminine packaging, and polished invitations.",
      description:
        "Create rose gold text online with warm pink-metal highlights for boutique logos, beauty launches, elegant invites, and premium social graphics.",
      useCases: ["Beauty brand logo", "Elegant invitation", "Premium social headline"],
    },
    zh: {
      title: "玫瑰金 3D 文字生成器",
      summary: "偏柔和金属和精致感，适合美妆品牌、邀请函和轻奢宣传图。",
      description:
        "在线生成带粉金高光的玫瑰金 3D 文字，适合精品 logo、美妆上新、优雅邀请函和高质感社媒标题。",
      useCases: ["美妆品牌标题", "优雅邀请函", "轻奢社媒主标题"],
    },
  },
  {
    slug: "glitter-pop",
    category: "playful",
    badge: "Glitter",
    previewText: "Spark Joy",
    keywords: ["glitter text generator", "sparkle text effect", "glitter letters"],
    relatedSlugs: ["barbie-pink", "bubble-letters", "rose-gold"],
    spotlight: true,
    visual: {
      background:
        "radial-gradient(circle at 20% 18%, rgba(255,255,255,0.8), transparent 14%), radial-gradient(circle at 82% 20%, rgba(255, 239, 156, 0.34), transparent 18%), linear-gradient(135deg, #fff7d5 0%, #ffd7f0 46%, #ffc48f 100%)",
      foreground: "#5a2b4d",
      mutedForeground: "rgba(90, 43, 77, 0.76)",
      panelBackground: "rgba(255, 252, 244, 0.76)",
      panelBorder: "rgba(214, 137, 170, 0.22)",
      accent: "#ff84bb",
      textGradient: "linear-gradient(180deg, #fff7ba 0%, #ff97cb 44%, #ffbd63 100%)",
      textShadow: "0 16px 26px rgba(177, 108, 145, 0.24)",
      textStroke: "1px rgba(255,255,255,0.76)",
      fontFamily: "\"Baloo 2\", \"Public Sans\", \"Trebuchet MS\", sans-serif",
      rotation: "rotate(-4deg)",
    },
    editorPreset: createEditorPreset({
      text: "Spark Joy",
      font: "Optimer",
      weight: FontWeight.Bold,
      textColor: ["#fff28d", "#ff8ec8"],
      backgroundGradient: {
        direction: "topLeftToBottomRight",
        startColor: "#fff8df",
        endColor: "#ffc6a3",
      },
      shadowColor: "#c6839f",
    }),
    en: {
      title: "Glitter Text 3D Generator",
      summary: "Sparkly pastel text for birthday graphics, cute promos, and party-ready covers.",
      description:
        "Make glitter text online with bright sparkle-inspired gradients for party invites, cute headers, celebratory thumbnails, and playful brand art.",
      useCases: ["Birthday graphic", "Party invite title", "Cute promo cover"],
    },
    zh: {
      title: "闪粉字 3D 文字生成器",
      summary: "偏闪亮、偏庆祝，适合生日图、派对邀请和可爱促销封面。",
      description:
        "在线生成带闪粉感渐变的 3D 文字，适合派对标题、生日海报、庆祝活动封面和轻松可爱的品牌视觉。",
      useCases: ["生日图标题", "派对邀请封面", "可爱促销主标题"],
    },
  },
];

export const stylePresets: StylePreset[] = rawStylePresets.map((style) => ({
  ...style,
  editorPreset: {
    ...style.editorPreset,
    templateSlug: style.slug,
  },
}));

export const featuredStyleSlugs = stylePresets
  .filter((style) => style.spotlight)
  .map((style) => style.slug);

export const styleCategories = [
  {
    id: "playful",
    accent: "#ff6ea8",
  },
  {
    id: "metallic",
    accent: "#8fc6ff",
  },
  {
    id: "night",
    accent: "#61dcff",
  },
  {
    id: "event",
    accent: "#ff9b46",
  },
] as const;

export function getStylePreset(slug: string) {
  return stylePresets.find((style) => style.slug === slug);
}

export function getLocalizedStyle(
  style: StylePreset,
  locale: Locale
): StylePreset["en"] | StylePreset["zh"] {
  return style[locale];
}

export function getRelatedStyles(style: StylePreset) {
  return style.relatedSlugs
    .map((slug) => getStylePreset(slug))
    .filter((item): item is StylePreset => Boolean(item));
}

export function getContrastTextColor(
  color: string,
  dark = "#111111",
  light = "#ffffff"
) {
  const normalized = color.trim();
  const hex = normalized.startsWith("#") ? normalized.slice(1) : normalized;

  if (![3, 6].includes(hex.length)) {
    return light;
  }

  const fullHex =
    hex.length === 3
      ? hex
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : hex;

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? dark : light;
}
