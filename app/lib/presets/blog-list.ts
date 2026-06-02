// Blog registry. Ported from src/app/[locale]/blogs/list.ts with
// StaticImageData covers dropped (next/image is gone). When Step 11 finishes
// the cleanup, the cover images can be re-added as plain <img src="…">
// references to the existing public/blogs/{id}/* assets.

export interface BlogItem {
  id: string;
  date: string;
  en: { title: string; summary: string };
  zh: { title: string; summary: string };
}

export const blogs: BlogItem[] = [
  {
    id: "How-to-Design-a-Sports-Team-Name-in-3D",
    date: "2025-08-07",
    en: {
      title: "How to Design a Sports Team Name in 3D",
      summary: "A quick walkthrough on rendering bold, energetic 3D team names for posters, jerseys, and social.",
    },
    zh: {
      title: "如何用 3D 设计球队名字",
      summary: "快速教程:为海报、球衣和社交媒体制作高能 3D 球队名。",
    },
  },
  {
    id: "How-to-Create-Ice-Text-for-Posters-and-Thumbnails",
    date: "2025-08-07",
    en: {
      title: "How to Create Ice Text for Posters and Thumbnails",
      summary: "Frosted-glass text styles for cold, premium-looking thumbnails and event posters.",
    },
    zh: {
      title: "如何制作冰冻文字用于海报和缩略图",
      summary: "用冰冻玻璃风格做冷感、高级感的缩略图和活动海报。",
    },
  },
  {
    id: "How-to-Make-Bubble-Letters-Online",
    date: "2025-08-07",
    en: {
      title: "How to Make Bubble Letters Online",
      summary: "Step-by-step: chubby, rounded 3D bubble letters for kids' content and playful branding.",
    },
    zh: {
      title: "如何在线制作泡泡字",
      summary: "分步指南:圆润、Q 弹的 3D 泡泡字,适合儿童内容和趣味品牌。",
    },
  },
  {
    id: "Create-3D-Letters",
    date: "2025-08-07",
    en: {
      title: "How to Create Stunning 3D Letters Online for Free",
      summary: "A simple, free workflow for designing eye-catching 3D letter images in your browser.",
    },
    zh: {
      title: "如何免费在线创建惊艳的 3D 字母",
      summary: "一个简单的免费流程,帮你在浏览器里做出吸睛的 3D 字母图。",
    },
  },
  {
    id: "Create-3D-Text-with-the-Barbie-Font",
    date: "2025-08-07",
    en: {
      title: "Create 3D Text with the Barbie Font",
      summary: "Pink, glossy, and unmistakably Barbie — a fun 3D text style for fan art and party invites.",
    },
    zh: {
      title: "用芭比字体做 3D 文字",
      summary: "粉色、亮面、芭比味十足 —— 适合同人创作和派对邀请的 3D 文字风格。",
    },
  },
];

export const blogIds = blogs.map((b) => b.id);

export function getBlogById(id: string): BlogItem | undefined {
  return blogs.find((b) => b.id === id);
}
