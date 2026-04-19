/**
 * Spotify share URLs → embed iframe src (no network calls).
 */

export type PlacementInput = {
  id: string;
  /** Canonical Spotify URL, e.g. https://open.spotify.com/track/... */
  spotifyUrl: string;
  tint: string;
};

export type EnrichedPlacement = {
  id: string;
  tint: string;
  embedSrc: string;
};

export function toSpotifyEmbedUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    if (u.hostname !== "open.spotify.com") return null;

    const path = u.pathname.replace(/\/+$/, "") || "/";
    const embedMatch = path.match(
      /^\/embed\/(track|album|playlist|episode|show)\/([^/]+)/,
    );
    if (embedMatch) {
      return `https://open.spotify.com/embed/${embedMatch[1]}/${embedMatch[2]}`;
    }
    const directMatch = path.match(
      /^\/(track|album|playlist|episode|show)\/([^/]+)/,
    );
    if (!directMatch) return null;
    return `https://open.spotify.com/embed/${directMatch[1]}/${directMatch[2]}`;
  } catch {
    return null;
  }
}

export function resolvePlacements(rows: PlacementInput[]): EnrichedPlacement[] {
  return rows.map((row) => ({
    id: row.id,
    tint: row.tint,
    embedSrc: toSpotifyEmbedUrl(row.spotifyUrl) ?? "",
  }));
}
