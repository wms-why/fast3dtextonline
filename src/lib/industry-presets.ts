type Locale = "en" | "zh";

export interface IndustryLocaleContent {
  title: string;
  summary: string;
  description: string;
  useCases: string[];
}

export interface IndustryPreset {
  slug: string;
  displayName: string;
  sampleText: string;
  keywords: string[];
  relatedSlugs: string[];
  styleSlugs: string[];
  en: IndustryLocaleContent;
  zh: IndustryLocaleContent;
}

export const industries: IndustryPreset[] = [
  {
    slug: "gaming",
    displayName: "Gaming",
    sampleText: "GAMING",
    keywords: [
      "gaming text generator",
      "gaming logo text",
      "game title text 3d",
      "gaming brand text",
    ],
    relatedSlugs: ["streaming", "sports", "music"],
    styleSlugs: ["sports-flame", "neon-night", "fireburst", "black-metal"],
    en: {
      title: "3D Gaming Text Generator",
      summary: "Gamer-ready 3D text for game titles, clans, and esports.",
      description:
        "Generate gaming-themed 3D text. Pick flame, neon, or metal styles, type your game name, and download a transparent PNG — perfect for game covers, Twitch overlays, and clan logos.",
      useCases: ["Game covers", "Esports team logos", "Twitch overlays", "Steam banners"],
    },
    zh: {
      title: "3D 游戏文字生成器",
      summary: "适合游戏名、战队名和电竞的 3D 文字。",
      description:
        "生成游戏主题 3D 立体字。选火焰、霓虹或金属风格，输入你的游戏名，下载带透明背景的 PNG——适合游戏封面、Twitch 直播封面、战队 Logo。",
      useCases: ["游戏封面", "电竞战队 Logo", "Twitch 直播封面", "Steam 横幅"],
    },
  },
  {
    slug: "ecommerce",
    displayName: "E-commerce",
    sampleText: "SHOP NOW",
    keywords: [
      "ecommerce logo text",
      "product logo 3d",
      "shop text generator",
      "promo text 3d",
    ],
    relatedSlugs: ["social-media", "music", "sports"],
    styleSlugs: ["luxury-serif", "molten-gold", "rose-gold"],
    en: {
      title: "3D E-commerce Text Generator",
      summary: "Premium 3D text for product launches, sale banners, and shop logos.",
      description:
        "Generate on-brand 3D text for your e-commerce visuals. Pick luxe, gold, or rose-gold styles, type your message, and download a transparent PNG — perfect for product covers, sale banners, and shop logos.",
      useCases: ["Product covers", "Sale banners", "Shop logos", "Promo headers"],
    },
    zh: {
      title: "3D 电商文字生成器",
      summary: "适合产品发布、促销 banner 和店铺 Logo 的高端 3D 文字。",
      description:
        "为电商视觉生成有品牌感的 3D 立体字。选奢华、金或玫瑰金风格，输入你的文案，下载带透明背景的 PNG——适合产品封面、促销 banner、店铺 Logo。",
      useCases: ["产品封面", "促销 banner", "店铺 Logo", "活动头图"],
    },
  },
  {
    slug: "social-media",
    displayName: "Social Media",
    sampleText: "POST",
    keywords: [
      "social media text 3d",
      "instagram text generator",
      "tiktok text effect",
      "twitter header 3d",
    ],
    relatedSlugs: ["streaming", "ecommerce", "music"],
    styleSlugs: ["glitter-pop", "barbie-pink", "neon-night"],
    en: {
      title: "3D Social Media Text Generator",
      summary: "Scroll-stopping 3D text for Instagram, TikTok, and Twitter covers.",
      description:
        "Generate scroll-stopping 3D text for your social posts. Pick glitter, pink, or neon styles, type your message, and download a transparent PNG — perfect for covers, stories, and post headers.",
      useCases: ["Instagram covers", "TikTok headers", "Twitter banners", "Facebook posts"],
    },
    zh: {
      title: "3D 社媒文字生成器",
      summary: "抓人眼球的 3D 文字，适合 Instagram、TikTok 和 Twitter 封面。",
      description:
        "为你的社媒内容生成抓人眼球的 3D 立体字。选闪粉、粉或霓虹风格，输入你的文案，下载带透明背景的 PNG——适合封面、故事、帖子头图。",
      useCases: ["Instagram 封面", "TikTok 头图", "Twitter 横幅", "Facebook 帖子"],
    },
  },
  {
    slug: "streaming",
    displayName: "Streaming",
    sampleText: "LIVE",
    keywords: [
      "streaming text 3d",
      "twitch text generator",
      "youtube live 3d",
      "stream overlay text",
    ],
    relatedSlugs: ["gaming", "music", "sports"],
    styleSlugs: ["neon-night", "glitter-pop", "horror-slime"],
    en: {
      title: "3D Streaming Text Generator",
      summary: "Glowy 3D text for Twitch, YouTube Live, and stream overlays.",
      description:
        "Generate 3D text that pops on dark stream overlays. Pick neon, glitter, or horror styles, type your stream name, and download a transparent PNG — perfect for overlays, starting screens, and panels.",
      useCases: ["Twitch overlays", "YouTube Live banners", "Starting screens", "Stream panels"],
    },
    zh: {
      title: "3D 直播文字生成器",
      summary: "在暗背景上很亮的 3D 文字，适合 Twitch、YouTube 直播和直播封面。",
      description:
        "生成在暗色直播封面上更出彩的 3D 立体字。选霓虹、闪粉或恐怖风格，输入你的直播间名，下载带透明背景的 PNG——适合直播封面、开播画面、信息面板。",
      useCases: ["Twitch 直播封面", "YouTube 直播横幅", "开播画面", "直播信息面板"],
    },
  },
  {
    slug: "sports",
    displayName: "Sports",
    sampleText: "CHAMPION",
    keywords: [
      "sports text generator",
      "team name 3d",
      "sports logo text",
      "tournament text 3d",
    ],
    relatedSlugs: ["gaming", "streaming", "music"],
    styleSlugs: ["sports-flame", "fireburst", "chrome-sheen"],
    en: {
      title: "3D Sports Text Generator",
      summary: "Team-ready 3D text for sports logos, jerseys, and tournament posters.",
      description:
        "Generate team-ready 3D text. Pick flame, fire, or chrome styles, type your team name, and download a transparent PNG — perfect for team logos, jersey mockups, and tournament posters.",
      useCases: ["Team logos", "Jersey mockups", "Tournament posters", "Sports banners"],
    },
    zh: {
      title: "3D 运动文字生成器",
      summary: "适合战队 Logo、球衣和赛事海报的 3D 文字。",
      description:
        "生成战队级 3D 立体字。选火焰、火或铬风格，输入你的战队名，下载带透明背景的 PNG——适合战队 Logo、球衣样机、赛事海报。",
      useCases: ["战队 Logo", "球衣样机", "赛事海报", "运动横幅"],
    },
  },
  {
    slug: "music",
    displayName: "Music",
    sampleText: "BEATS",
    keywords: [
      "music text generator",
      "album cover 3d",
      "song title 3d text",
      "musician logo 3d",
    ],
    relatedSlugs: ["streaming", "gaming", "social-media"],
    styleSlugs: ["horror-slime", "black-metal", "neon-night", "luxury-serif"],
    en: {
      title: "3D Music Text Generator",
      summary: "Album-cover-ready 3D text for musicians, bands, and producers.",
      description:
        "Generate album-cover-worthy 3D text. Pick horror, metal, or neon styles, type your artist name, and download a transparent PNG — perfect for album covers, Spotify canvases, and social posts.",
      useCases: ["Album covers", "Spotify canvases", "Music videos", "Social posts"],
    },
    zh: {
      title: "3D 音乐文字生成器",
      summary: "适合专辑封面的 3D 文字，面向音乐人、乐队和制作人。",
      description:
        "生成专辑封面级 3D 立体字。选恐怖、金属或霓虹风格，输入你的艺人名，下载带透明背景的 PNG——适合专辑封面、Spotify 画布、音乐视频。",
      useCases: ["专辑封面", "Spotify 画布", "音乐视频", "社媒帖"],
    },
  },
];

export function getIndustry(slug: string): IndustryPreset | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getLocalizedIndustry(industry: IndustryPreset, locale: Locale): IndustryLocaleContent {
  return locale === "zh" ? industry.zh : industry.en;
}

export function getRelatedIndustries(industry: IndustryPreset): IndustryPreset[] {
  return industry.relatedSlugs
    .map((slug) => industries.find((i) => i.slug === slug))
    .filter((i): i is IndustryPreset => Boolean(i));
}
