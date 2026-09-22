import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${SITE_URL}/studio`,
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    url: `${SITE_URL}/videos`,
    changeFrequency: "weekly",
    priority: 0.75,
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

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes;
}
