/**
 * Beat lease–style terms (structure aligned with common marketplace non-exclusive /
 * exclusive agreements such as those used on BeatStars). Not legal advice; your
 * attorney should review before relying on these terms in production.
 */

export type LicenseSection = {
  heading: string;
  paragraphs: string[];
};

export type LicenseModalContent = {
  /** Short label shown in modal header */
  shortTitle: string;
  sections: LicenseSection[];
  footnote: string;
};

export const LICENSE_TIER_COPY: Record<string, LicenseModalContent> = {
  basic: {
    shortTitle: "Basic (MP3) — non-exclusive lease",
    sections: [
      {
        heading: "Parties & work",
        paragraphs: [
          "This summary reflects the HiveMindMusic.Shop Basic tier: a non-exclusive license between HiveMind Productions (“Licensor”) and you (“Licensee”) for the instrumental beat identified in your order confirmation.",
        ],
      },
      {
        heading: "Grant of license",
        paragraphs: [
          "Licensor grants Licensee a non-exclusive, non-transferable license to use the licensed instrumental in new original recordings (your vocal / your song), worldwide, for commercial purposes subject to the limits below. Licensor may continue to license the same instrumental to others.",
        ],
      },
      {
        heading: "Deliverables",
        paragraphs: [
          "MP3 format only for this tier (unless otherwise stated on the beat page). No project files or stems are included.",
        ],
      },
      {
        heading: "Distribution & performance (typical caps)",
        paragraphs: [
          "Unless your order or beat page specifies different numbers, permitted use generally includes digital streaming and paid downloads subject to distribution limits described in your checkout receipt and the full license PDF. Exceeding stated limits requires an upgraded license or written approval.",
          "Live performance of your finished track is allowed. Radio and sync (TV, film, games, ads) may require a different license tier—confirm before use.",
        ],
      },
      {
        heading: "Credit",
        paragraphs: [
          "You agree to credit the producer / HiveMind as shown on the beat page (e.g. “Prod. by …”) in metadata and packaging where reasonably possible.",
        ],
      },
      {
        heading: "Ownership & restrictions",
        paragraphs: [
          "Licensor retains all rights to the underlying instrumental. You may not sell, sublicense, or redistribute the standalone beat file, claim ownership of the instrumental, or register Content ID / fingerprinting against Licensor’s instrumental.",
          "You may not re-sell the beat as your own production, or use it in library-music templates for third parties, without prior written consent.",
        ],
      },
      {
        heading: "Term",
        paragraphs: [
          "The license remains effective for the term stated in your purchase documentation (often multi-year for non-exclusive leases). HiveMind may update storefront terms for future sales; your rights for a completed purchase follow the terms in effect at checkout.",
        ],
      },
    ],
    footnote:
      "This popup is a plain-language overview. Your order confirmation and any PDF license provided at purchase control if there is a conflict. Inspired by standard non-exclusive beat lease structures used on marketplaces such as BeatStars.",
  },
  premium: {
    shortTitle: "Premium (MP3 + WAV) — non-exclusive lease",
    sections: [
      {
        heading: "Parties & work",
        paragraphs: [
          "This summary reflects the Premium tier: a non-exclusive license between HiveMind Productions (“Licensor”) and you (“Licensee”) for the instrumental in your order.",
        ],
      },
      {
        heading: "Grant of license",
        paragraphs: [
          "Same non-exclusive foundation as Basic, with higher distribution / performance headroom and broadcast-quality files as described below.",
        ],
      },
      {
        heading: "Deliverables",
        paragraphs: [
          "MP3 and WAV (or other lossless format listed on the beat page). Stems / trackouts are not included—choose Premium + Trackouts if you need separated tracks.",
        ],
      },
      {
        heading: "Distribution & performance",
        paragraphs: [
          "Higher caps than Basic for streams, sales, and similar uses—see your receipt and full license for exact figures.",
          "Music videos (non-major-label budget tiers) are typically allowed when disclosed on the beat page; major-label or sync uses may still need clearance—ask before release.",
        ],
      },
      {
        heading: "Credit & ownership",
        paragraphs: [
          "Producer credit required as on the beat page. Licensor retains master ownership of the instrumental; your rights cover your song that incorporates the beat, not the raw instrumental alone.",
        ],
      },
      {
        heading: "Restrictions",
        paragraphs: [
          "No standalone redistribution of the beat, no ownership claim over the instrumental, no unauthorized Content-ID claims on the underlying track.",
        ],
      },
    ],
    footnote:
      "Overview only; your purchase documents govern. Terms follow common non-exclusive lease patterns seen on BeatStars-style storefronts.",
  },
  "premium-trackouts": {
    shortTitle: "Premium + Trackouts — non-exclusive lease",
    sections: [
      {
        heading: "Parties & work",
        paragraphs: [
          "This summary reflects Premium + Trackouts: a non-exclusive license including stem / trackout delivery for the instrumental in your order.",
        ],
      },
      {
        heading: "Grant of license",
        paragraphs: [
          "Non-exclusive license to use the work in new recordings, with permission to mix and arrange using the provided stems for your licensed project only.",
        ],
      },
      {
        heading: "Deliverables",
        paragraphs: [
          "WAV (or equivalent) plus trackouts / stems as listed on the beat page (e.g. drums, bass, keys, etc.). Exact stem groups vary per production.",
        ],
      },
      {
        heading: "Use of stems",
        paragraphs: [
          "Stems are provided so you can mix your vocal with the beat. You may not repackage or resell individual stems as sample packs, or use them to recreate a competing instrumental for third parties.",
        ],
      },
      {
        heading: "Distribution & caps",
        paragraphs: [
          "Generally higher limits than lower tiers—confirm streams, sales, and video uses against your order and full license.",
        ],
      },
      {
        heading: "Ownership & credit",
        paragraphs: [
          "Licensor retains ownership of the composition and master of the instrumental. Credit as specified on the beat page.",
        ],
      },
    ],
    footnote:
      "Stems are powerful—keep use inside your licensed song. For exclusive or sync-heavy projects, ask about Exclusive or custom terms.",
  },
  exclusive: {
    shortTitle: "Exclusive — rights summary",
    sections: [
      {
        heading: "Parties & intent",
        paragraphs: [
          "Exclusive purchases are negotiated per sale. Typically HiveMind Productions (“Seller”) and you (“Buyer”) execute terms that remove the beat from public sale and grant exclusive use subject to a written agreement.",
        ],
      },
      {
        heading: "What “exclusive” usually includes",
        paragraphs: [
          "Subject to your signed agreement and payment: Seller stops licensing the same instrumental to others, and Buyer receives the exclusive right to use the work for the uses and territory defined in that agreement.",
        ],
      },
      {
        heading: "Deliverables & splits",
        paragraphs: [
          "Files, stems, writer’s share, publisher, and royalty splits (if any) are defined only in the final contract—not in this summary.",
        ],
      },
      {
        heading: "Closing",
        paragraphs: [
          "Exclusive deals often require counter-signing, ID verification, and custom language. Do not rely on this popup for an exclusive purchase—use the contract provided at sale.",
        ],
      },
    ],
    footnote:
      "Exclusive terms vary by transaction. This mirrors how BeatStars-style exclusive sales are typically finalized: custom paperwork, not a one-size PDF. Consult your lawyer.",
  },
};

export function getLicenseCopyForSlug(slug: string): LicenseModalContent | null {
  return LICENSE_TIER_COPY[slug] ?? null;
}
