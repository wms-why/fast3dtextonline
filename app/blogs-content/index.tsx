// Barrel for blog post body content. Each blog has a pair of locale
// components under `app/blogs-content/{id}/`. The route module looks up
// the right pair by `BlogItem.id` and renders the locale-specific one.
//
// To add a new blog, drop two new TSX files under a folder named after
// the new `BlogItem.id` and register the import + lookup below.

import type { ComponentType } from "react";
import SportsTeamEn from "./How-to-Design-a-Sports-Team-Name-in-3D/en";
import SportsTeamZh from "./How-to-Design-a-Sports-Team-Name-in-3D/zh";
import IceTextEn from "./How-to-Create-Ice-Text-for-Posters-and-Thumbnails/en";
import IceTextZh from "./How-to-Create-Ice-Text-for-Posters-and-Thumbnails/zh";
import BubbleLettersEn from "./How-to-Make-Bubble-Letters-Online/en";
import BubbleLettersZh from "./How-to-Make-Bubble-Letters-Online/zh";
import Create3DLettersEn from "./Create-3D-Letters/en";
import Create3DLettersZh from "./Create-3D-Letters/zh";
import BarbieFontEn from "./Create-3D-Text-with-the-Barbie-Font/en";
import BarbieFontZh from "./Create-3D-Text-with-the-Barbie-Font/zh";
import type { Locale } from "@/lib/i18n/config";

type Body = Record<Locale, ComponentType>;

const BODIES: Record<string, Body> = {
  "How-to-Design-a-Sports-Team-Name-in-3D": {
    en: SportsTeamEn,
    zh: SportsTeamZh,
  },
  "How-to-Create-Ice-Text-for-Posters-and-Thumbnails": {
    en: IceTextEn,
    zh: IceTextZh,
  },
  "How-to-Make-Bubble-Letters-Online": {
    en: BubbleLettersEn,
    zh: BubbleLettersZh,
  },
  "Create-3D-Letters": {
    en: Create3DLettersEn,
    zh: Create3DLettersZh,
  },
  "Create-3D-Text-with-the-Barbie-Font": {
    en: BarbieFontEn,
    zh: BarbieFontZh,
  },
};

export function getBlogBody(id: string, locale: Locale): ComponentType | undefined {
  return BODIES[id]?.[locale];
}
