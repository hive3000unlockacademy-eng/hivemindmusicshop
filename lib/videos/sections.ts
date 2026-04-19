/** Section order and headings for `/videos`. Slugs match `VideoRow.section_slug`. */
export const VIDEO_PAGE_SECTIONS = [
  {
    slug: "artist-music-videos",
    title: "Artist Music Videos",
    emptyMessage: "Music videos will appear here.",
  },
  {
    slug: "podcasts",
    title: "Podcasts",
    emptyMessage: "Podcast episodes will appear here.",
  },
  {
    slug: "instrumentals",
    title: "Instrumentals",
    emptyMessage: "Instrumental performances and playthroughs will appear here.",
  },
  {
    slug: "behind-the-scenes",
    title: "Behind The Scenes",
    emptyMessage: "Studio sessions and BTS clips will appear here.",
  },
] as const;

export type VideoPageSectionSlug = (typeof VIDEO_PAGE_SECTIONS)[number]["slug"];
