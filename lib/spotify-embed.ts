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

/** Strip `/intl-xx/` locale prefix Spotify adds to share URLs. */
function normalizeSpotifyPath(pathname: string): string {
  let p = pathname.replace(/\/+$/, "") || "/";
  p = p.replace(/^\/intl-[a-z]{2}(?:-[a-z]{2})?\//i, "/");
  return p;
}

function embedUrlWithParams(path: string): string {
  const u = new URL(path);
  /** Dark UI; avoid extra params that can break legacy embed clients. */
  u.searchParams.set("theme", "0");
  return u.toString();
}

export function toSpotifyEmbedUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed);
    if (u.hostname !== "open.spotify.com") return null;

    const path = normalizeSpotifyPath(u.pathname);
    const embedMatch = path.match(
      /^\/embed\/(track|album|playlist|episode|show)\/([^/]+)/,
    );
    if (embedMatch) {
      return embedUrlWithParams(
        `https://open.spotify.com/embed/${embedMatch[1]}/${embedMatch[2]}`,
      );
    }
    const directMatch = path.match(
      /^\/(track|album|playlist|episode|show)\/([^/]+)/,
    );
    if (!directMatch) return null;
    return embedUrlWithParams(
      `https://open.spotify.com/embed/${directMatch[1]}/${directMatch[2]}`,
    );
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
