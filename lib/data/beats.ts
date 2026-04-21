import { createClient } from "@/lib/supabase/server";
import type { BeatRow } from "@/lib/data/types";

export type { BeatRow };

function mapBeatRow(row: Record<string, unknown>): BeatRow {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    description: row.description == null ? null : String(row.description),
    bpm: typeof row.bpm === "number" ? row.bpm : null,
    musical_key: row.musical_key == null ? null : String(row.musical_key),
    genre: row.genre == null ? null : String(row.genre),
    mood: Array.isArray(row.mood)
      ? row.mood.filter((v): v is string => typeof v === "string")
      : null,
    is_active: Boolean(row.is_active),
    is_featured: Boolean(row.is_featured),
    artwork_path: row.artwork_path == null ? null : String(row.artwork_path),
    source_audio_path:
      row.source_audio_path == null ? null : String(row.source_audio_path),
    preview_path: row.preview_path == null ? null : String(row.preview_path),
    preview_start_seconds:
      typeof row.preview_start_seconds === "number" ? row.preview_start_seconds : 0,
    preview_duration_seconds:
      typeof row.preview_duration_seconds === "number"
        ? row.preview_duration_seconds
        : 30,
    duration_seconds:
      typeof row.duration_seconds === "number" ? row.duration_seconds : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

export async function getBeats(): Promise<BeatRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("beats")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((row) => mapBeatRow(row as Record<string, unknown>));
}

export async function getFeaturedBeat(): Promise<BeatRow | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("beats")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (data) {
    return mapBeatRow(data as Record<string, unknown>);
  }
  const beats = await getBeats();
  return beats[0] ?? null;
}

export async function getBeatBySlug(slug: string): Promise<BeatRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("beats")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error || !data) return null;
  return mapBeatRow(data as Record<string, unknown>);
}
