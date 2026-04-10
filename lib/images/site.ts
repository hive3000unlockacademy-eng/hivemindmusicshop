/** Resolve local `public/` image paths and absolute URLs for `next/image`. */
export function siteImageUrl(path: string | null | undefined): string | null {
  if (path == null || String(path).trim() === "") return null;
  const p = String(path).trim();
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  const clean = p.replace(/^\/+/, "");
  return `/${clean}`;
}
