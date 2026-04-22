/** Canonical public site origin — keep in sync with `app/layout.tsx` metadataBase. */
export const SITE_URL = "https://hivemindmusic.shop";
export const SITE_NAME = "HiveMindMusic.Shop";
export const BRAND = "HiveMind Productions";

/** Default share image (absolute URL for OG/Twitter). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
