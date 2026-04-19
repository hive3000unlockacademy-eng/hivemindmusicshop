import { STATIC_VIDEOS } from "@/lib/catalog/static-data";
import type { VideoRow } from "@/lib/data/types";
import { VIDEO_PAGE_SECTIONS } from "@/lib/videos/sections";

export type { VideoRow };

export async function getVideos(): Promise<VideoRow[]> {
  return [...STATIC_VIDEOS].sort((a, b) => a.sort_order - b.sort_order);
}

/** Groups catalog videos by `/videos` section; sorts by `sort_order` within each section. */
export function groupVideosBySection(videos: VideoRow[]): Map<string, VideoRow[]> {
  const known = new Set<string>(VIDEO_PAGE_SECTIONS.map((s) => s.slug));
  const map = new Map<string, VideoRow[]>();
  for (const slug of known) {
    map.set(slug, []);
  }
  for (const v of videos) {
    if (!known.has(v.section_slug)) continue;
    map.get(v.section_slug)!.push(v);
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.sort_order - b.sort_order);
  }
  return map;
}
