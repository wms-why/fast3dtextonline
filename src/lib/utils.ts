import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";
import LZString from "lz-string";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SECRET_KEY = "fast3dtext-ymk";
export function encodeText(text: string) {
  const compressed = LZString.compressToEncodedURIComponent(text);
  const encrypted = CryptoJS.AES.encrypt(compressed, SECRET_KEY).toString();
  return encodeURIComponent(encrypted);
}

export function decodeText(encodedText: string) {
  const decoded = decodeURIComponent(encodedText);
  const decrypted = CryptoJS.AES.decrypt(decoded, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
  const decompressed = LZString.decompressFromEncodedURIComponent(decrypted);
  return decompressed;
}

export function getShareLink(data: string, locale: string) {
  return `${window.location.origin}/${locale}/editor/${data}`;
}
