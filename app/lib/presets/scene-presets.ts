type Locale = "en" | "zh";

export interface SceneLocaleContent {
  title: string;
  summary: string;
  description: string;
  useCases: string[];
}

export interface ScenePreset {
  slug: string;
  name: string;
  sampleText: string;
  keywords: string[];
  relatedSlugs: string[];
  styleSlugs: string[]; // linked style presets
  en: SceneLocaleContent;
  zh: SceneLocaleContent;
}

export const scenes: ScenePreset[] = [
  {
    slug: "gaming-logo",
    name: "Gaming",
    sampleText: "GAMER",
    keywords: [
      "gaming logo text",
      "gaming text generator",
      "gamer tag maker",
      "esports logo",
      "gaming clan logo",
    ],
    relatedSlugs: ["esports-logo", "twitch-logo", "youtube-logo"],
    styleSlugs: ["sports-flame", "fireburst", "neon-night", "black-metal"],
    en: {
      title: "3D Gaming Logo Text Generator",
      summary: "Bold, aggressive 3D logo text for gaming clans, esports teams, and streaming.",
      description:
        "Generate gaming-style 3D logo text online. Type your tag, choose between flame, neon, or chrome effects, and download a high-quality PNG with a transparent background — perfect for Twitch overlays, Steam banners, and team logos.",
      useCases: ["Gaming clans", "Esports team logos", "Twitch overlays", "Steam banners"],
    },
    zh: {
      title: "3D 游戏 Logo 文字生成器",
      summary: "张扬、攻击性强的 3D Logo 文字，适合游戏战队、电竞团队和直播。",
      description:
        "在线生成游戏风格的 3D Logo 文字。输入你的战队名，选择火焰、霓虹或铬金属效果，下载带透明背景的高画质 PNG——适合 Twitch 直播封面、Steam 横幅和战队 Logo。",
      useCases: ["游戏战队", "电竞团队 Logo", "Twitch 直播封面", "Steam 横幅"],
    },
  },
  {
    slug: "youtube-logo",
    name: "YouTube",
    sampleText: "SUBSCRIBE",
    keywords: [
      "youtube logo text",
      "youtube intro text",
      "youtube channel text",
      "youtube banner text 3d",
    ],
    relatedSlugs: ["twitch-logo", "gaming-logo", "tiktok-logo"],
    styleSlugs: ["glitter-pop", "neon-night", "fireburst"],
    en: {
      title: "3D YouTube Logo Text Generator",
      summary: "Loud, attention-grabbing 3D text for YouTube intros and channel art.",
      description:
        "Create YouTube-ready 3D text in seconds. Make subscribe buttons pop, intro titles look pro, and channel art stand out — all in a transparent PNG that drops into any video editor or thumbnail tool.",
      useCases: ["YouTube intros", "Channel banners", "Subscribe buttons", "Video titles"],
    },
    zh: {
      title: "3D YouTube Logo 文字生成器",
      summary: "高辨识度的 3D 文字，适合 YouTube 片头和频道封面。",
      description:
        "几秒内生成 YouTube 风格的 3D 文字。让订阅按钮更醒目、片头更专业、频道封面更出彩——全部是带透明背景的 PNG，可直接放进任何视频编辑器或缩略图工具。",
      useCases: ["YouTube 片头", "频道封面", "订阅按钮", "视频标题"],
    },
  },
  {
    slug: "twitch-logo",
    name: "Twitch",
    sampleText: "STREAM",
    keywords: [
      "twitch logo text",
      "twitch overlay text",
      "streamer text 3d",
      "twitch panel text",
    ],
    relatedSlugs: ["gaming-logo", "youtube-logo", "esports-logo"],
    styleSlugs: ["neon-night", "horror-slime", "glitter-pop"],
    en: {
      title: "3D Twitch Logo Text Generator",
      summary: "Glowy, neon 3D text for Twitch overlays, panels, and stream graphics.",
      description:
        "Type your stream name and instantly get neon-glow 3D text that reads well on a dark background. Ideal for Twitch overlays, panels, and starting/ending screens — export a transparent PNG for OBS, Streamlabs, or any streaming tool.",
      useCases: ["Twitch overlays", "Stream panels", "Starting screens", "Emote captions"],
    },
    zh: {
      title: "3D Twitch Logo 文字生成器",
      summary: "带霓虹光晕的 3D 文字，适合 Twitch 直播封面、信息面板和直播图。",
      description:
        "输入你的直播间名，立刻得到在暗背景上可读性极高的霓虹 3D 文字。适合 Twitch 直播封面、信息面板、开播/下播画面——导出带透明背景的 PNG，可直接用于 OBS、Streamlabs 或任何直播工具。",
      useCases: ["Twitch 直播封面", "直播信息面板", "开播画面", "表情包字幕"],
    },
  },
  {
    slug: "esports-logo",
    name: "Esports",
    sampleText: "VICTORY",
    keywords: [
      "esports logo text",
      "esports team logo",
      "tournament logo",
      "competitive gaming text",
    ],
    relatedSlugs: ["gaming-logo", "twitch-logo", "youtube-logo"],
    styleSlugs: ["black-metal", "fireburst", "neon-night", "sports-flame"],
    en: {
      title: "3D Esports Logo Text Generator",
      summary: "Tournament-grade 3D text for esports teams and competitive gaming.",
      description:
        "Build esports-ready 3D logo text with metallic edges, fire, or neon glow. Drop the PNG into team banners, jersey mockups, or tournament posters and instantly look pro.",
      useCases: ["Team logos", "Tournament posters", "Jersey mockups", "Sponsor decks"],
    },
    zh: {
      title: "3D 电竞 Logo 文字生成器",
      summary: "赛事级 3D 文字，适合电竞战队和竞技游戏场景。",
      description:
        "用金属边缘、火焰或霓虹光晕打造赛事级 3D Logo 文字。把 PNG 放进战队横幅、球衣样机或赛事海报，立刻就有专业感。",
      useCases: ["战队 Logo", "赛事海报", "球衣样机", "赞助商简报"],
    },
  },
  {
    slug: "instagram-logo",
    name: "Instagram",
    sampleText: "STORY",
    keywords: [
      "instagram logo text",
      "instagram story text",
      "igtv cover text",
      "instagram post text 3d",
    ],
    relatedSlugs: ["tiktok-logo", "youtube-logo", "gaming-logo"],
    styleSlugs: ["luxury-serif", "rose-gold", "barbie-pink"],
    en: {
      title: "3D Instagram Logo Text Generator",
      summary: "Luxe, on-brand 3D text for Instagram stories, reels, and posts.",
      description:
        "Stand out in the feed with 3D logo text that looks custom-made. Great for Instagram stories, Reels covers, IGTV thumbnails, and product launch posts. Export a transparent PNG that drops into Canva, Photoshop, or any photo app.",
      useCases: ["Instagram stories", "Reels covers", "IGTV thumbnails", "Product launch posts"],
    },
    zh: {
      title: "3D Instagram Logo 文字生成器",
      summary: "高级、有品牌感的 3D 文字，适合 Instagram 故事、Reels 和帖子。",
      description:
        "用看起来像定制的 3D Logo 文字在信息流里脱颖而出。适合 Instagram 故事、Reels 封面、IGTV 缩略图、产品发布帖。导出带透明背景的 PNG，可直接放进 Canva、Photoshop 或任何修图 App。",
      useCases: ["Instagram 故事", "Reels 封面", "IGTV 缩略图", "产品发布帖"],
    },
  },
  {
    slug: "tiktok-logo",
    name: "TikTok",
    sampleText: "VIRAL",
    keywords: [
      "tiktok logo text",
      "tiktok text effect",
      "tiktok username 3d",
      "tiktok cover text",
    ],
    relatedSlugs: ["instagram-logo", "youtube-logo", "gaming-logo"],
    styleSlugs: ["glitter-pop", "barbie-pink", "neon-night"],
    en: {
      title: "3D TikTok Logo Text Generator",
      summary: "Trendy, scroll-stopping 3D text for TikTok covers and usernames.",
      description:
        "Make your TikTok content pop with 3D text that feels on-trend. Perfect for video covers, profile headers, and username graphics — all delivered as transparent PNGs ready to drop into CapCut, Picsart, or the TikTok editor itself.",
      useCases: ["TikTok covers", "Profile headers", "CapCut intros", "Username graphics"],
    },
    zh: {
      title: "3D TikTok Logo 文字生成器",
      summary: "时髦、抓人眼球的 3D 文字，适合 TikTok 封面和用户名。",
      description:
        "用时髦的 3D 文字让你的 TikTok 内容更出彩。适合视频封面、个人页头图、用户名图形——全部是带透明背景的 PNG，可直接放进 CapCut、Picsart 或 TikTok 自己的编辑器。",
      useCases: ["TikTok 封面", "个人页头图", "CapCut 片头", "用户名图形"],
    },
  },
];

export function getScene(slug: string): ScenePreset | undefined {
  return scenes.find((scene) => scene.slug === slug);
}

export function getLocalizedScene(scene: ScenePreset, locale: Locale): SceneLocaleContent {
  return locale === "zh" ? scene.zh : scene.en;
}

export function getRelatedScenes(scene: ScenePreset): ScenePreset[] {
  return scene.relatedSlugs
    .map((slug) => scenes.find((s) => s.slug === slug))
    .filter((s): s is ScenePreset => Boolean(s));
}
