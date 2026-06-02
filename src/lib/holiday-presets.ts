type Locale = "en" | "zh";

export interface HolidayLocaleContent {
  title: string;
  summary: string;
  description: string;
  useCases: string[];
}

export interface HolidayPreset {
  slug: string;
  displayName: string;
  sampleText: string;
  keywords: string[];
  relatedSlugs: string[];
  styleSlugs: string[];
  en: HolidayLocaleContent;
  zh: HolidayLocaleContent;
}

export const holidays: HolidayPreset[] = [
  {
    slug: "christmas",
    displayName: "Christmas",
    sampleText: "MERRY XMAS",
    keywords: [
      "christmas text generator",
      "merry christmas 3d text",
      "xmas text png",
      "holiday lettering",
    ],
    relatedSlugs: ["new-year", "valentine", "birthday"],
    styleSlugs: ["molten-gold", "luxury-serif", "rose-gold"],
    en: {
      title: "3D Christmas Text Generator",
      summary: "Festive 3D Christmas text with gold, red, and snow-ready looks.",
      description:
        "Generate Christmas-themed 3D text in seconds. Pick gold, luxe, or rose-gold styles, type your greeting, and download a transparent PNG — perfect for cards, party invites, and social covers.",
      useCases: ["Christmas cards", "Party invites", "Social covers", "Gift tags"],
    },
    zh: {
      title: "3D 圣诞字生成器",
      summary: "节日感 3D 圣诞字，可配金、红、白雪主题。",
      description:
        "几秒内生成圣诞主题 3D 立体字。选金色、高端或玫瑰金风格，输入你的祝福，下载带透明背景的 PNG——适合圣诞卡、派对邀请、社媒封面。",
      useCases: ["圣诞卡", "派对邀请", "社媒封面", "礼物标签"],
    },
  },
  {
    slug: "new-year",
    displayName: "New Year",
    sampleText: "HAPPY 2026",
    keywords: [
      "new year text generator",
      "happy new year 3d text",
      "new year text png",
      "new year lettering",
    ],
    relatedSlugs: ["christmas", "valentine", "birthday"],
    styleSlugs: ["glitter-pop", "fireburst", "molten-gold"],
    en: {
      title: "3D New Year Text Generator",
      summary: "Fireworks-worthy 3D text for New Year cards and party covers.",
      description:
        "Make New Year greetings that pop. Choose glitter or fire styles, type 2026 or your own message, and download a transparent PNG for cards, party invites, and Instagram stories.",
      useCases: ["New Year cards", "Party invites", "Instagram stories", "Countdown graphics"],
    },
    zh: {
      title: "3D 新年字生成器",
      summary: "适合新年卡和派对封面的烟花级 3D 文字。",
      description:
        "让新年祝福更有冲击力。选闪粉或火焰风格，输入 2026 或自定义祝福，下载带透明背景的 PNG——适合卡片、派对邀请、Instagram 故事。",
      useCases: ["新年卡", "派对邀请", "Instagram 故事", "倒计时图"],
    },
  },
  {
    slug: "halloween",
    displayName: "Halloween",
    sampleText: "BOO!",
    keywords: [
      "halloween text generator",
      "halloween 3d text",
      "spooky lettering",
      "halloween text png",
    ],
    relatedSlugs: ["birthday", "christmas", "new-year"],
    styleSlugs: ["horror-slime", "black-metal", "graffiti-splash"],
    en: {
      title: "3D Halloween Text Generator",
      summary: "Spooky, drippy 3D text for Halloween posters and party flyers.",
      description:
        "Generate creepy 3D text in seconds. Pick horror-slime or black-metal, type your spooky greeting, and download a transparent PNG for posters, party flyers, and pumpkin-carving templates.",
      useCases: ["Halloween posters", "Party flyers", "Pumpkin templates", "Costume party covers"],
    },
    zh: {
      title: "3D 万圣节字生成器",
      summary: "诡异、滴液风格的 3D 文字，适合万圣节海报和派对传单。",
      description:
        "几秒内生成恐怖 3D 立体字。选 horror-slime 或 black-metal 风格，输入你的诡异祝福，下载带透明背景的 PNG——适合海报、派对传单、南瓜雕模板。",
      useCases: ["万圣节海报", "派对传单", "南瓜模板", "化装舞会封面"],
    },
  },
  {
    slug: "valentine",
    displayName: "Valentine's Day",
    sampleText: "BE MINE",
    keywords: [
      "valentine text generator",
      "love 3d text",
      "valentine 3d text",
      "romantic text png",
    ],
    relatedSlugs: ["birthday", "new-year", "christmas"],
    styleSlugs: ["rose-gold", "barbie-pink", "molten-gold"],
    en: {
      title: "3D Valentine Text Generator",
      summary: "Romantic rose-gold 3D text for Valentine's Day and anniversaries.",
      description:
        "Make romantic 3D text in seconds. Pick rose-gold, pink, or gold styles, type your love note, and download a transparent PNG — perfect for cards, social covers, and gift tags.",
      useCases: ["Valentine cards", "Anniversary gifts", "Social covers", "Gift tags"],
    },
    zh: {
      title: "3D 情人节字生成器",
      summary: "浪漫玫瑰金 3D 文字，适合情人节和纪念日。",
      description:
        "几秒内生成浪漫 3D 立体字。选玫瑰金、粉或金风格，输入你的情话，下载带透明背景的 PNG——适合卡片、社媒封面、礼物标签。",
      useCases: ["情人节卡片", "纪念日礼物", "社媒封面", "礼物标签"],
    },
  },
  {
    slug: "birthday",
    displayName: "Birthday",
    sampleText: "HAPPY BDAY",
    keywords: [
      "birthday text generator",
      "birthday 3d text",
      "happy birthday png",
      "birthday lettering",
    ],
    relatedSlugs: ["valentine", "new-year", "christmas"],
    styleSlugs: ["bubble-letters", "candy-pop", "glitter-pop", "comic-pop"],
    en: {
      title: "3D Birthday Text Generator",
      summary: "Bubble, candy, and glitter 3D text for birthday cards and party covers.",
      description:
        "Make birthdays brighter with 3D text. Pick bubble, candy, or glitter styles, type your message, and download a transparent PNG — perfect for cards, party invites, and social covers.",
      useCases: ["Birthday cards", "Party invites", "Social covers", "Cake toppers"],
    },
    zh: {
      title: "3D 生日字生成器",
      summary: "泡泡、糖果、闪粉 3D 文字，适合生日卡和派对封面。",
      description:
        "用 3D 文字让生日更出彩。选泡泡、糖果或闪粉风格，输入你的祝福，下载带透明背景的 PNG——适合卡片、派对邀请、社媒封面。",
      useCases: ["生日卡", "派对邀请", "社媒封面", "蛋糕装饰"],
    },
  },
  {
    slug: "easter",
    displayName: "Easter",
    sampleText: "HAPPY EASTER",
    keywords: [
      "easter text generator",
      "easter 3d text",
      "spring lettering",
      "easter text png",
    ],
    relatedSlugs: ["birthday", "valentine", "new-year"],
    styleSlugs: ["candy-pop", "barbie-pink", "glitter-pop"],
    en: {
      title: "3D Easter Text Generator",
      summary: "Candy-colored 3D text for Easter cards and spring party covers.",
      description:
        "Make Easter greetings feel festive. Pick candy, pink, or glitter styles, type your message, and download a transparent PNG for cards, party invites, and social covers.",
      useCases: ["Easter cards", "Party invites", "Social covers", "Spring flyers"],
    },
    zh: {
      title: "3D 复活节字生成器",
      summary: "糖果色 3D 文字，适合复活节卡和春季派对封面。",
      description:
        "让复活节祝福更有节日感。选糖果、粉或闪粉风格，输入你的祝福，下载带透明背景的 PNG——适合卡片、派对邀请、社媒封面。",
      useCases: ["复活节卡", "派对邀请", "社媒封面", "春季传单"],
    },
  },
];

export function getHoliday(slug: string): HolidayPreset | undefined {
  return holidays.find((h) => h.slug === slug);
}

export function getLocalizedHoliday(holiday: HolidayPreset, locale: Locale): HolidayLocaleContent {
  return locale === "zh" ? holiday.zh : holiday.en;
}

export function getRelatedHolidays(holiday: HolidayPreset): HolidayPreset[] {
  return holiday.relatedSlugs
    .map((slug) => holidays.find((h) => h.slug === slug))
    .filter((h): h is HolidayPreset => Boolean(h));
}
