import type { PreviewBeat } from "@/components/home/beat-catalog-preview";
import type { BeatRow } from "@/lib/data/beats";
import { formatDuration } from "@/lib/format";
import { siteImageUrl } from "@/lib/images/site";
import { getPublicMediaUrl } from "@/lib/storage";

export function mapBeatToPreview(b: BeatRow): PreviewBeat {
  return {
    slug: b.slug,
    title: b.title,
    genre: b.genre ?? "—",
    duration: formatDuration(b.duration_seconds),
    bpm: b.bpm ?? 0,
    tags: b.mood?.length ? b.mood : ["instrumental"],
    previewUrl: getPublicMediaUrl(b.preview_path),
    coverUrl: siteImageUrl(b.artwork_path),
  };
}
