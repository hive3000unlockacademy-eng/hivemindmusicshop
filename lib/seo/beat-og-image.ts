import type { BeatRow } from "@/lib/data/types";
import { siteImageUrl } from "@/lib/images/site";
import { getPublicMediaUrl } from "@/lib/storage";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/site";

/**
 * Absolute image URL for OG/Twitter — mirrors storefront cover resolution.
 */
export function absoluteBeatOgImage(beat: BeatRow): string {
  const local = siteImageUrl(beat.artwork_path);
  if (local) {
    return local.startsWith("http") ? local : `${SITE_URL}${local}`;
  }
  const storage = getPublicMediaUrl(beat.artwork_path);
  if (storage) return storage;
  return DEFAULT_OG_IMAGE;
}
