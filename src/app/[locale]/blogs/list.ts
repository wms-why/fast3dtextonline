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
      summary:
        "Learn how to create 3D text with the Barbie font using free online tools. Step-by-step guide to download, convert, and render Barbie-style 3D text — no coding required!",
    },
    zh: {
      title: "如何使用Barbie字体创建3D文本",
      summary:
        "学习如何使用免费在线工具，以芭比字体创建 3D 文本。下载、转换和渲染芭比风格 3D 文本的分步指南 —— 无需编码！",
    },
  },
] satisfies BlogItem[];
