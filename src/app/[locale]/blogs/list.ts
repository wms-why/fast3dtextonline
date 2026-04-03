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
import { Blog as BubbleLettersBlog } from "./How-to-Make-Bubble-Letters-Online/data";
import { Blog as IceTextBlog } from "./How-to-Create-Ice-Text-for-Posters-and-Thumbnails/data";
import { Blog as SportsTeamNameBlog } from "./How-to-Design-a-Sports-Team-Name-in-3D/data";
import { Blog as Create3DTextBlog } from "./Create-3D-Text-with-the-Barbie-Font/data";
import { Blog as Create3DLetterBlog } from "./Create-3D-Letters/data";

export const blogs = [
  SportsTeamNameBlog,
  IceTextBlog,
  BubbleLettersBlog,
  Create3DLetterBlog,
  Create3DTextBlog,
] satisfies BlogItem[];
