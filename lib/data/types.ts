/** Local row shapes (formerly Supabase-generated). */

export type BeatRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  bpm: number | null;
  musical_key: string | null;
  genre: string | null;
  mood: string[] | null;
  is_active: boolean;
  is_featured: boolean;
  artwork_path: string | null;
  preview_path: string | null;
  duration_seconds: number | null;
  created_at: string;
  updated_at: string;
};

export type LicenseTierRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price_cents: number;
  rights_json: unknown;
  sort_order: number;
  is_highlighted: boolean;
  created_at: string;
  updated_at: string;
};

export type VideoRow = {
  id: string;
  title: string;
  artist: string | null;
  thumbnail_path: string | null;
  embed_url: string;
  /** Page section on `/videos` (see `VIDEO_PAGE_SECTIONS`). */
  section_slug: string;
  category: string | null;
  tags: string[] | null;
  is_featured: boolean;
  linked_beat_id: string | null;
  sort_order: number;
  created_at: string;
};
