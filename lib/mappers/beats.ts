import type { PreviewBeat } from "@/components/home/beat-catalog-preview";
import type { BeatRow } from "@/lib/data/beats";
import { formatDuration } from "@/lib/format";
import { siteImageUrl } from "@/lib/images/site";
import { getPublicMediaUrl } from "@/lib/storage";
import type { LicenseTierRow } from "@/lib/data/license-tiers";
import type { Tier } from "@/components/home/licensing-tier-cards";
import { formatUsd } from "@/lib/format";

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

function rightsToFeatures(rights: unknown, fallback: string | null): string[] {
  if (rights && Array.isArray(rights)) {
    return rights.filter((x): x is string => typeof x === "string");
  }
  if (rights && typeof rights === "object" && rights !== null && "bullets" in rights) {
    const b = (rights as { bullets?: unknown }).bullets;
    if (Array.isArray(b)) return b.filter((x): x is string => typeof x === "string");
  }
  if (fallback) return [fallback];
  return ["See license agreement for details"];
}

export function mapLicenseTierRow(row: LicenseTierRow): Tier {
  const features = rightsToFeatures(row.rights_json, row.description);
  return {
    name: row.name,
    price: formatUsd(row.price_cents),
    highlight: row.is_highlighted,
    features,
  };
}
