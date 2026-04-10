import { STATIC_BEATS } from "@/lib/catalog/static-data";
import type { BeatRow } from "@/lib/data/types";

export type { BeatRow };

export async function getBeats(): Promise<BeatRow[]> {
  return STATIC_BEATS.filter((b) => b.is_active).sort(
    (a, b) => (b.created_at > a.created_at ? 1 : -1),
  );
}

export async function getFeaturedBeat(): Promise<BeatRow | null> {
  return (
    STATIC_BEATS.find((b) => b.is_active && b.is_featured) ?? STATIC_BEATS[0] ?? null
  );
}

export async function getBeatBySlug(slug: string): Promise<BeatRow | null> {
  return STATIC_BEATS.find((b) => b.slug === slug && b.is_active) ?? null;
}
