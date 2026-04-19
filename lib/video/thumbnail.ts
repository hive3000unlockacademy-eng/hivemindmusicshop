import { getPublicMediaUrl } from "@/lib/storage";

/** YouTube embed or watch URL → video id for thumbnail (not playlist / videoseries). */
export function youtubeVideoId(url: string): string | null {
  if (/youtube\.com\/embed\/videoseries/i.test(url)) return null;
  const m = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/,
  );
  const id = m?.[1] ?? null;
  if (id === "videoseries") return null;
  return id;
}

export function videoThumbnailUrl(
  embedUrl: string,
  thumbnailPath: string | null | undefined,
): string {
  const fromStorage = getPublicMediaUrl(thumbnailPath ?? null);
  if (fromStorage) return fromStorage;
  const id = youtubeVideoId(embedUrl);
  if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  /** Local asset under `public/` (playlist / non-video embeds have no `img.youtube.com` id). */
  return "/images/site/beats-hero.png";
}
