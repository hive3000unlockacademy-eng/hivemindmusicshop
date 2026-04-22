import type { MetadataRoute } from "next";
import { getBeats } from "@/lib/data/beats";
import { SITE_URL } from "@/lib/seo/site";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${SITE_URL}/beats`,
    changeFrequency: "daily",
    priority: 0.95,
  },
  {
    url: `${SITE_URL}/videos`,
    changeFrequency: "weekly",
    priority: 0.75,
  },
  {
    url: `${SITE_URL}/contact`,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/cart`,
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: `${SITE_URL}/checkout`,
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: `${SITE_URL}/privacy`,
    changeFrequency: "yearly",
    priority: 0.35,
  },
  {
    url: `${SITE_URL}/terms`,
    changeFrequency: "yearly",
    priority: 0.35,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const beats = await getBeats();
  const beatEntries: MetadataRoute.Sitemap = beats.map((b) => ({
    url: `${SITE_URL}/beats/${b.slug}`,
    lastModified: new Date(b.updated_at),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...beatEntries];
}
