export interface BlogItem {
  id: string;
  date: string;
  cover: StaticImageData;
  en: {
    title: string;
    summary: string;
  };
  zh: {
    title: string;
    summary: string;
  };
}

import { StaticImageData } from "next/image";
import { Blog as Create3DTextBlog } from "./Create-3D-Text-with-the-Barbie-Font/data";
import { Blog as Create3DLetterBlog } from "./Create-3D-Letters/data";

export const blogs = [
  Create3DLetterBlog,
  Create3DTextBlog,
] satisfies BlogItem[];
