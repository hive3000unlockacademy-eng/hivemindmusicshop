import { getPublicMediaUrl } from "@/lib/storage";

/** YouTube embed or watch URL → video id for thumbnail */
export function youtubeVideoId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/,
  );
  return m?.[1] ?? null;
}

export function videoThumbnailUrl(
  embedUrl: string,
  thumbnailPath: string | null | undefined,
): string {
  const fromStorage = getPublicMediaUrl(thumbnailPath ?? null);
  if (fromStorage) return fromStorage;
  const id = youtubeVideoId(embedUrl);
  if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  return "/images/hero/studio.svg";
}
