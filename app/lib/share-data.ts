// Encodes / decodes the editor's `ShareObj` to / from the URL-safe
// ciphertext segment used by `editor/:data`.
//
// The types below are minimal structural mirrors of the more detailed
// `BackgroundProp` / `EffectProp` / `TextProp` defined in
// `src/components/common/*` (which is excluded from RR7 typecheck until
// Step 11 deletes it). encodeShareData / decode() only care about JSON
// shape — the strict types are kept in the components for UI defaults.

import CryptoJS from "crypto-js";
import LZString from "lz-string";
import { FontWeight } from "./presets/fonts";

export interface BackgroundGradient {
  direction:
    | "leftToRight"
    | "topToBottom"
    | "topLeftToBottomRight"
    | "bottomLeftToTopRight";
  startColor: string;
  endColor: string;
}

export interface BackgroundProp {
  color: string | null;
  gradient: BackgroundGradient | null;
  image: string | null;
  transparent: boolean;
}

export interface EffectProp {
  enableShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  shadowOpacity: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  strokeColor: string;
  strokeWidth: number;
}

export interface TextProp {
  text: string;
  color: string | string[];
  colorGradientDir: "l2r" | "t2b";
  fontFrom: number;
  font: string;
  fontUrl: string;
  weight: FontWeight;
}

export interface ShareObj {
  bg: BackgroundProp;
  text: TextProp;
  effect?: EffectProp;
  templateSlug?: string;
}

const SECRET_KEY = "fast3dtext-ymk";

function encodeText(text: string): string {
  const compressed = LZString.compressToEncodedURIComponent(text);
  const encrypted = CryptoJS.AES.encrypt(compressed, SECRET_KEY).toString();
  return encodeURIComponent(encrypted);
}

function decodeText(encodedText: string): string | null {
  try {
    const decoded = decodeURIComponent(encodedText);
    const decrypted = CryptoJS.AES.decrypt(decoded, SECRET_KEY).toString(
      CryptoJS.enc.Utf8,
    );
    return LZString.decompressFromEncodedURIComponent(decrypted);
  } catch {
    return null;
  }
}

export function encodeShareData(data: ShareObj): string {
  return encodeText(JSON.stringify(data));
}

export function getEditorPath(data: ShareObj, locale: string): string {
  if (locale == "en") {
    return `/editor/${encodeShareData(data)}`;
  }
  return `/${locale}/editor/${encodeShareData(data)}`;
}

export function getShareLink(data: ShareObj, locale: string): string {
  if (typeof window === "undefined") return getEditorPath(data, locale);
  return `${window.location.origin}${getEditorPath(data, locale)}`;
}

/** Decodes a URL `data` segment to a `ShareObj`. Throws on bad input. */
export function decode(data: string): ShareObj {
  const decoded = decodeText(data);
  if (decoded == null) {
    throw new Error("Failed to decode share data");
  }
  return JSON.parse(decoded) as ShareObj;
}
