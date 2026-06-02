type Locale = "en" | "zh";

export interface FontThemeLocaleContent {
  title: string;
  summary: string;
  description: string;
  useCases: string[];
}

export interface FontThemePreset {
  slug: string;
  category: "display" | "script" | "monospace" | "novelty" | "sans" | "serif";
  badge: string;
  keywords: string[];
  relatedSlugs: string[];
  spotlight: boolean;
  styleSlugs: string[]; // linked style presets that showcase this theme
  primaryFont: string; // Fonts[] entry name
  sampleText: string;
  en: FontThemeLocaleContent;
  zh: FontThemeLocaleContent;
}

/**
 * Font theme landing pages. Each entry targets a long-tail keyword cluster
 * (e.g. "gothic text generator", "bubble text") and reuses an existing
 * StylePreset as the visual anchor in the editor.
 */
export const fontThemes: FontThemePreset[] = [
  {
    slug: "bubble",
    category: "display",
    badge: "Bubble",
    keywords: [
      "bubble text generator",
      "bubble letters",
      "3d bubble font",
      "balloon text",
      "cute bubble text",
      "bubble text png",
    ],
    relatedSlugs: ["comic", "retro", "futuristic"],
    spotlight: true,
    styleSlugs: ["bubble-letters", "candy-pop", "comic-pop"],
    primaryFont: "Optimer",
    sampleText: "POP!",
    en: {
      title: "3D Bubble Text Generator",
      summary:
        "Round, soft, plump 3D letters that look like balloons or candy.",
      description:
        "Generate bubble-style 3D text online. Bubble letters are the go-to look for kids' birthday cards, playful logos, and toy-themed social posts. Type any word, pick a color, and download a high-quality PNG with a transparent background — perfect for layering onto posters, thumbnails, and T-shirt mockups.",
      useCases: [
        "Birthday cards",
        "Kids' logos",
        "Toy product packaging",
        "Cute social covers",
      ],
    },
    zh: {
      title: "3D 泡泡字生成器",
      summary: "圆润、软糯、像气球或糖果一样的 3D 立体字。",
      description:
        "在线生成泡泡风格的 3D 立体字。泡泡字是儿童生日卡、可爱 Logo、玩具主题社媒图的常见选择。输入任意文字，选个颜色，下载带透明背景的高画质 PNG——直接叠到海报、缩略图或 T 恤样机上都很方便。",
      useCases: ["生日卡", "儿童 Logo", "玩具包装", "可爱风社媒图"],
    },
  },
  {
    slug: "gothic",
    category: "serif",
    badge: "Gothic",
    keywords: [
      "gothic text generator",
      "medieval font",
      "blackletter 3d",
      "dark gothic lettering",
      "old english 3d text",
    ],
    relatedSlugs: ["horror", "luxury", "metal"],
    spotlight: true,
    styleSlugs: ["horror-slime", "black-metal", "luxury-serif"],
    primaryFont: "Gentilis",
    sampleText: "GOTHIC",
    en: {
      title: "3D Gothic Text Generator",
      summary:
        "Blackletter-inspired 3D text for horror, metal, and medieval moods.",
      description:
        "Create dark, dramatic gothic 3D text in your browser. This style leans into blackletter-inspired forms with deep shadows — ideal for horror movie posters, metal band logos, Halloween flyers, and fantasy book covers. Open the editor, type your word, and download a transparent PNG you can drop straight into any design.",
      useCases: [
        "Halloween flyers",
        "Metal band logos",
        "Horror movie posters",
        "Fantasy book covers",
      ],
    },
    zh: {
      title: "3D 哥特字生成器",
      summary: "黑色字风格灵感的 3D 立体字，适合恐怖、金属和中世纪氛围。",
      description:
        "在浏览器里生成暗黑、戏剧化的 3D 哥特字。深阴影加上哥特字形，适合万圣节海报、金属乐队 Logo、恐怖电影海报、奇幻书籍封面。打开编辑器输入文字，下载带透明背景的 PNG，可直接贴到任何设计里。",
      useCases: [
        "万圣节海报",
        "金属乐队 Logo",
        "恐怖电影海报",
        "奇幻书籍封面",
      ],
    },
  },
  {
    slug: "retro",
    category: "display",
    badge: "Retro",
    keywords: [
      "retro text generator",
      "80s text effect",
      "pixel 3d text",
      "vintage typography",
      "arcade font",
    ],
    relatedSlugs: ["bubble", "futuristic", "comic"],
    spotlight: true,
    styleSlugs: ["retro-arcade", "neon-night", "glitter-pop"],
    primaryFont: "Helvetiker",
    sampleText: "ARCADE",
    en: {
      title: "3D Retro Text Generator",
      summary:
        "80s arcade, synthwave, and pixel-inspired 3D text for nostalgic designs.",
      description:
        "Make retro 3D text online — arcade neon, synthwave gradients, and pixel-friendly forms. Perfect for Twitch overlays, YouTube channel intros, indie game splash screens, and any project that needs a hit of 80s or 90s nostalgia. One click downloads a transparent PNG so you can drop the text into any editor.",
      useCases: [
        "Twitch overlays",
        "YouTube intros",
        "Indie game splash",
        "Synthwave covers",
      ],
    },
    zh: {
      title: "3D 复古字生成器",
      summary:
        "80 年代街机、合成波和像素风灵感的 3D 立体字，适合怀旧主题设计。",
      description:
        "在线生成复古 3D 立体字——街机霓虹、合成波渐变、像素友好字形。适合 Twitch 直播封面、YouTube 频道片头、独立游戏启动画面，以及任何需要 80/90 年代怀旧感的设计。一键下载带透明背景的 PNG，可以直接拖到任何编辑器里。",
      useCases: [
        "Twitch 直播封面",
        "YouTube 片头",
        "独立游戏启动画面",
        "合成波封面",
      ],
    },
  },
  {
    slug: "futuristic",
    category: "sans",
    badge: "Futuristic",
    keywords: [
      "futuristic text generator",
      "sci-fi font",
      "cyberpunk text",
      "neon future text",
      "tech font 3d",
    ],
    relatedSlugs: ["retro", "metal", "luxury"],
    spotlight: true,
    styleSlugs: ["neon-night", "black-metal", "horror-slime"],
    primaryFont: "Optimer",
    sampleText: "CYBER",
    en: {
      title: "3D Futuristic Text Generator",
      summary:
        "Cyberpunk, neon, and sci-fi 3D text for tech and gaming visuals.",
      description:
        "Type your word and instantly render futuristic 3D text with neon glows, sharp edges, and metal sheen. Great for tech product launches, gaming tournaments, esports logos, and cyberpunk-themed posters. Download a transparent PNG you can drop into any design tool.",
      useCases: [
        "Tech product launches",
        "Esports logos",
        "Cyberpunk posters",
        "Game UI mockups",
      ],
    },
    zh: {
      title: "3D 未来感文字生成器",
      summary: "赛博朋克、霓虹、科幻风格的 3D 立体字，适合科技和游戏视觉。",
      description:
        "输入文字，即刻生成带霓虹光晕、锋利边缘和金属质感的未来感 3D 立体字。适合科技产品发布、游戏赛事、电竞 Logo、赛博朋克风海报。下载带透明背景的 PNG，可直接贴到任何设计工具里。",
      useCases: [
        "科技产品发布",
        "电竞 Logo",
        "赛博朋克海报",
        "游戏 UI 样机",
      ],
    },
  },
  {
    slug: "comic",
    category: "display",
    badge: "Comic",
    keywords: [
      "comic text generator",
      "pow bubble text",
      "manga text effect",
      "cartoon lettering 3d",
      "boom text",
    ],
    relatedSlugs: ["bubble", "retro", "luxury"],
    spotlight: false,
    styleSlugs: ["comic-pop", "bubble-letters", "glitter-pop"],
    primaryFont: "Optimer",
    sampleText: "POW!",
    en: {
      title: "3D Comic Text Generator",
      summary:
        "POW! BOOM! Comic-book inspired 3D lettering for action graphics.",
      description:
        "Recreate the classic comic-book caption feel in 3D. Comic text is loud, chunky, and full of energy — perfect for stickers, fan art, kids' apps, and pop-art prints. Type your caption, swap the colors, and export a transparent PNG ready for any design.",
      useCases: [
        "Comic book captions",
        "Sticker packs",
        "Kids' apps",
        "Pop art prints",
      ],
    },
    zh: {
      title: "3D 漫画字生成器",
      summary: "POW! BOOM! 漫画风灵感的 3D 立体字，适合动作感强的图形。",
      description:
        "在 3D 里复刻经典漫画字幕的感觉。漫画字响亮、敦实、充满能量——适合做贴纸、同人画、儿童 App、波普艺术印刷品。输入字幕、换色、导出带透明背景的 PNG，可直接贴到任何设计里。",
      useCases: ["漫画字幕", "贴纸包", "儿童 App", "波普艺术印刷"],
    },
  },
  {
    slug: "luxury",
    category: "serif",
    badge: "Luxury",
    keywords: [
      "luxury text generator",
      "gold text 3d",
      "elegant font",
      "premium logo text",
      "rose gold typography",
    ],
    relatedSlugs: ["gothic", "futuristic", "comic"],
    spotlight: true,
    styleSlugs: ["luxury-serif", "molten-gold", "rose-gold"],
    primaryFont: "Helvetiker",
    sampleText: "LUXE",
    en: {
      title: "3D Luxury Text Generator",
      summary:
        "Gold, rose gold, and serif-inspired 3D text for premium branding.",
      description:
        "Generate gold and rose-gold 3D text in seconds. The luxury set leans on metallic gradients, deep shadows, and high-contrast serif shapes — perfect for product launches, beauty brand logos, fashion lookbooks, and wedding invitations. Export a transparent PNG that drops cleanly into any layout.",
      useCases: [
        "Beauty brand logos",
        "Wedding invitations",
        "Fashion lookbooks",
        "Product launches",
      ],
    },
    zh: {
      title: "3D 高端字生成器",
      summary: "金色、玫瑰金和衬线风灵感的 3D 立体字，适合品牌定位高端的场景。",
      description:
        "几秒内生成金色和玫瑰金的 3D 立体字。高端系列走金属渐变、深阴影和高对比衬线字形——适合美妆品牌 Logo、婚礼请柬、时尚画册、产品发布会。导出带透明背景的 PNG，可直接嵌入任何版式。",
      useCases: [
        "美妆品牌 Logo",
        "婚礼请柬",
        "时尚画册",
        "产品发布会",
      ],
    },
  },
];

export const featuredFontThemeSlugs = fontThemes
  .filter((theme) => theme.spotlight)
  .map((theme) => theme.slug);

export const fontThemeCategories: {
  id: FontThemePreset["category"];
  accent: string;
  label: { en: string; zh: string };
}[] = [
  {
    id: "display",
    accent: "#ff5d9c",
    label: { en: "Display & Decorative", zh: "展示和装饰字" },
  },
  {
    id: "serif",
    accent: "#a78bfa",
    label: { en: "Serif & Luxury", zh: "衬线和高端字" },
  },
  {
    id: "sans",
    accent: "#22d3ee",
    label: { en: "Sans & Futuristic", zh: "无衬线和未来感" },
  },
];

export function getFontTheme(slug: string): FontThemePreset | undefined {
  return fontThemes.find((theme) => theme.slug === slug);
}

export function getLocalizedFontTheme(
  theme: FontThemePreset,
  locale: Locale,
): FontThemeLocaleContent {
  return locale === "zh" ? theme.zh : theme.en;
}

export function getRelatedFontThemes(theme: FontThemePreset): FontThemePreset[] {
  return theme.relatedSlugs
    .map((slug) => fontThemes.find((t) => t.slug === slug))
    .filter((t): t is FontThemePreset => Boolean(t));
}
