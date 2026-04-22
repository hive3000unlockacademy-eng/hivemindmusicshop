import type { Metadata } from "next";
import type { BeatLicenseOption, BeatRow } from "@/lib/data/types";
import { absoluteBeatOgImage } from "@/lib/seo/beat-og-image";
import {
  BRAND,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo/site";

export type MarketingMetadataInput = {
  /** Short title (root layout template adds ` · HiveMindMusic.Shop`). */
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Absolute image URL for Open Graph / Twitter. */
  ogImage?: string | null;
  ogType?: "website" | "article";
  /** When true, search engines should not index (rare for marketing). */
  noindex?: boolean;
};

/**
 * Full metadata for public storefront pages: canonical URL, robots, Open Graph,
 * Twitter card, and optional keywords (SEO + answer-engine style signals).
 */
export function marketingMetadata(input: MarketingMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const imageUrl = input.ogImage?.trim() || DEFAULT_OG_IMAGE;
  const shareTitle = `${input.title} · ${SITE_NAME}`;

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    applicationName: SITE_NAME,
    authors: [{ name: BRAND, url: SITE_URL }],
    creator: BRAND,
    publisher: BRAND,
    alternates: {
      canonical: url,
    },
    robots: input.noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
    openGraph: {
      type: input.ogType ?? "website",
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      title: shareTitle,
      description: input.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${BRAND} — ${input.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: input.description,
      images: [imageUrl],
    },
  };
}

export function beatDetailMetadata(
  beat: BeatRow,
  tiers: BeatLicenseOption[],
): Metadata {
  const desc =
    beat.description?.trim() ||
    `${beat.title} — ${beat.genre ?? "Instrumental"} beat by ${BRAND}. License on ${SITE_NAME} with clear tiers and previews.`;
  const keywords = [
    beat.title,
    beat.genre,
    "beat",
    "instrumental",
    "license",
    BRAND,
    "trap beats",
    "drill beats",
    ...tiers.map((t) => t.name),
  ].filter(Boolean) as string[];

  return marketingMetadata({
    title: beat.title,
    description: desc,
    path: `/beats/${beat.slug}`,
    keywords,
    ogImage: absoluteBeatOgImage(beat),
    ogType: "article",
  });
}
