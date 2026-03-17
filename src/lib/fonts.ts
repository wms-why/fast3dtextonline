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
};

export function getFontPath(fontName: string, w: FontWeight) {
  const localFontPath = LocalFontPathMap[fontName]?.[w];
  if (localFontPath) {
    return localFontPath;
  }
  return `https://fast3dtest.mysoul.fun/${fontName}_${w}.json`;
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
