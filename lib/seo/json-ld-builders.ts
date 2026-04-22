import type { BeatLicenseOption, BeatRow } from "@/lib/data/types";
import { absoluteBeatOgImage } from "@/lib/seo/beat-og-image";
import { BRAND, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo/site";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function buildOrganizationAndWebsiteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: BRAND,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.png"),
        },
        sameAs: ["https://instagram.com/HiveMind_the_HitMaker"],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Premium beats, licensing, and producer tools from HiveMind Productions.",
        publisher: { "@id": ORG_ID },
        inLanguage: "en-US",
      },
    ],
  };
}

export function buildBeatsItemListJsonLd(
  beats: Pick<BeatRow, "slug" | "title" | "description">[],
) {
  const elements = beats.slice(0, 40).map((b, i) => ({
    "@type": "ListItem" as const,
    position: i + 1,
    item: {
      "@type": "WebPage",
      name: b.title,
      url: absoluteUrl(`/beats/${b.slug}`),
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${BRAND} beat catalog`,
    description: "Licensed trap, melodic, and R&B instrumentals with clear preview and tiers.",
    numberOfItems: elements.length,
    itemListElement: elements,
  };
}

export function buildBeatProductJsonLd(
  beat: BeatRow,
  tiers: BeatLicenseOption[],
) {
  const pageUrl = absoluteUrl(`/beats/${beat.slug}`);
  const image = absoluteBeatOgImage(beat);
  const prices = tiers.map((t) => t.price_cents / 100).filter((n) => n > 0);
  const low = prices.length ? Math.min(...prices) : undefined;
  const high = prices.length ? Math.max(...prices) : undefined;

  const offers =
    low != null && high != null
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: low,
          highPrice: high,
          availability: "https://schema.org/InStock",
          url: pageUrl,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Beats",
            item: absoluteUrl("/beats"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: beat.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Product",
        name: beat.title,
        description:
          beat.description ??
          `${beat.title} — instrumental beat by ${BRAND}. ${beat.genre ? `Genre: ${beat.genre}.` : ""}`,
        image: [image],
        brand: { "@type": "Brand", name: BRAND },
        sku: beat.slug,
        url: pageUrl,
        ...(offers ? { offers } : {}),
      },
    ],
  };
}
