import { STATIC_VIDEOS } from "@/lib/catalog/static-data";
import type { VideoRow } from "@/lib/data/types";

export type { VideoRow };

export async function getVideos(): Promise<VideoRow[]> {
  return [...STATIC_VIDEOS].sort((a, b) => a.sort_order - b.sort_order);
}
