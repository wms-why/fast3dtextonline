export enum FontWeight {
  Regular = "Regular",
  Bold = "Bold",
}

export enum FontLang {
  EN = "en",
  ZH = "zh",
}

export function getFontWeight(s: string) {
  switch (s) {
    case "Regular":
      return FontWeight.Regular;
    case "Bold":
      return FontWeight.Bold;
    default:
      return FontWeight.Regular;
  }
}

export class FontDefine {
  name: string;
  weight: FontWeight[];
  lang: FontLang[];

  constructor(name: string, weight: FontWeight[], lang: FontLang[]) {
    this.name = name;
    this.weight = weight;
    this.lang = lang;
  }
}

const LocalFontPathMap: Partial<Record<string, Partial<Record<FontWeight, string>>>> = {
  "Public Sans": {
    [FontWeight.Regular]: "/fonts/public-sans-400.ttf",
    [FontWeight.Bold]: "/fonts/public-sans-900.ttf",
  },
  Archivo: {
    [FontWeight.Regular]: "/fonts/archivo-400.ttf",
    [FontWeight.Bold]: "/fonts/archivo-900.ttf",
  },
  Anton: {
    [FontWeight.Regular]: "/fonts/anton-400.ttf",
  },
  Merriweather: {
    [FontWeight.Regular]: "/fonts/merriweather-400.ttf",
    [FontWeight.Bold]: "/fonts/merriweather-900.ttf",
  },
  Gentilis: {
    [FontWeight.Regular]: "/fonts/Gentilis_Regular.json",
    [FontWeight.Bold]: "/fonts/Gentilis_Bold.json",
  },
  Helvetiker: {
    [FontWeight.Regular]: "/fonts/Helvetiker_Regular.json",
    [FontWeight.Bold]: "/fonts/Helvetiker_Bold.json",
  },
  Optimer: {
    [FontWeight.Regular]: "/fonts/Optimer_Regular.json",
    [FontWeight.Bold]: "/fonts/Optimer_Bold.json",
  },
  "Alibaba_PuHuiTi_3.0": {
    [FontWeight.Regular]: "/fonts/Alibaba_PuHuiTi_3.0_Regular.json",
    [FontWeight.Bold]: "/fonts/Alibaba_PuHuiTi_3.0_Bold.json",
  },
  Noto_Sans_SC: {
    [FontWeight.Regular]: "/fonts/Noto_Sans_SC_Regular.json",
    [FontWeight.Bold]: "/fonts/Noto_Sans_SC_Bold.json",
  },
  Barbie_Doll: {
    [FontWeight.Regular]: "/fonts/Barbie_Doll_Regular.json",
  },
  Barbie_Princess: {
    [FontWeight.Regular]: "/fonts/Barbie_Princess_Regular.json",
  },
  Bartex: {
    [FontWeight.Regular]: "/fonts/Bartex_Regular.json",
  },
};

export function getFontPath(fontName: string, w: FontWeight) {
  const localFontPath = LocalFontPathMap[fontName]?.[w];
  if (!localFontPath) {
    throw new Error(`No local font path for ${fontName} / ${w}`);
  }
  return localFontPath;
}

export function containsChinese(str: string) {
  return /[\u4e00-\u9fa5]/.test(str);
}

export const DefaultFontChinese: string = "Alibaba_PuHuiTi_3.0";

export const Fonts: FontDefine[] = [
  {
    name: "Public Sans",
    weight: [FontWeight.Regular, FontWeight.Bold],
    lang: [FontLang.EN],
  },
  {
    name: "Archivo",
    weight: [FontWeight.Regular, FontWeight.Bold],
    lang: [FontLang.EN],
  },
  {
    name: "Anton",
    weight: [FontWeight.Regular],
    lang: [FontLang.EN],
  },
  {
    name: "Merriweather",
    weight: [FontWeight.Regular, FontWeight.Bold],
    lang: [FontLang.EN],
  },
  {
    name: "Gentilis",
    weight: [FontWeight.Regular, FontWeight.Bold],
    lang: [FontLang.EN],
  },
  {
    name: "Helvetiker",
    weight: [FontWeight.Regular, FontWeight.Bold],
    lang: [FontLang.EN],
  },
  {
    name: "Optimer",
    weight: [FontWeight.Regular, FontWeight.Bold],
    lang: [FontLang.EN],
  },
  {
    name: "Alibaba_PuHuiTi_3.0",
    weight: [FontWeight.Regular, FontWeight.Bold],
    lang: [FontLang.EN, FontLang.ZH],
  },
  {
    name: "Noto_Sans_SC",
    weight: [FontWeight.Regular, FontWeight.Bold],
    lang: [FontLang.EN, FontLang.ZH],
  },
  {
    name: "Barbie_Doll",
    weight: [FontWeight.Regular],
    lang: [FontLang.EN],
  },
  {
    name: "Barbie_Princess",
    weight: [FontWeight.Regular],
    lang: [FontLang.EN],
  },
  {
    name: "Bartex",
    weight: [FontWeight.Regular],
    lang: [FontLang.EN],
  },
];
