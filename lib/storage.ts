/** Public Supabase Storage URL for objects in `public-media` bucket. */
export function getPublicMediaUrl(path: string | null | undefined): string | null {
  if (!path?.trim()) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  const clean = path.replace(/^\/+/, "");
  return `${base}/storage/v1/object/public/public-media/${clean}`;
}
