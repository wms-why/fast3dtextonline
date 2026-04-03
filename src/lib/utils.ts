import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";
import LZString from "lz-string";
import { BackgroundProp } from "@/components/common/BackgroundSelector";
import { EffectProp } from "@/components/common/Effects";
import { TextProp } from "@/components/common/TextSetting";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SECRET_KEY = "fast3dtext-ymk";
function encodeText(text: string) {
  const compressed = LZString.compressToEncodedURIComponent(text);
  const encrypted = CryptoJS.AES.encrypt(compressed, SECRET_KEY).toString();
  return encodeURIComponent(encrypted);
}

function decodeText(encodedText: string) {
  const decoded = decodeURIComponent(encodedText);
  const decrypted = CryptoJS.AES.decrypt(decoded, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
  const decompressed = LZString.decompressFromEncodedURIComponent(decrypted);
  return decompressed;
}

export interface ShareObj {
  bg: BackgroundProp;
  text: TextProp;
  effect?: EffectProp;
  templateSlug?: string;
}
export function encodeShareData(data: ShareObj) {
  return encodeText(JSON.stringify(data));
}

export function getEditorPath(data: ShareObj, locale: string) {
  return `/${locale}/editor/${encodeShareData(data)}`;
}

export function getShareLink(data: ShareObj, locale: string) {
  return `${window.location.origin}${getEditorPath(data, locale)}`;
}
export function decode(data: string) {
  const decoded = decodeText(data);
  return JSON.parse(decoded) as ShareObj;
}
