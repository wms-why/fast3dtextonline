export interface BlogItem {
  id: string;
  date: string;
  cover: string;
  en: {
    title: string;
    summary: string;
  };
  zh: {
    title: string;
    summary: string;
  };
}
export const blogs = [
  {
    id: "Create-3D-Text-with-the-Barbie-Font",
    date: "2024-01-01",
    cover: "/next.svg",
    en: {
      title: "How to Create 3D Text with the Barbie Font",
      summary: "这是第一篇博客的内容摘要...",
    },
    zh: {
      title: "如何使用Barbie字体创建3D文本",
      summary: "这是第一篇博客的内容摘要...",
    },
  },
] satisfies BlogItem[];
