import { StaticImageData } from "next/image";
import { styleContent as barbieStyle } from "./barbie-pink/page";
export interface StyleItem {
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

export const styles: StyleItem[] = [barbieStyle];
