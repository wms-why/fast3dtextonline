/** Generic OG / Twitter image used for pages with no per-resource image. */
export const DEFAULT_OG_IMAGE = "/og-image.png";

/**
 * Returns the OG / Twitter image URL for a style preset.
 * Falls back to the generic /og-image.png if no per-style image is available.
 */
export function getStyleOgImage(slug: string): string {
  return `/styles/${slug}/1024_576.png`;
}
