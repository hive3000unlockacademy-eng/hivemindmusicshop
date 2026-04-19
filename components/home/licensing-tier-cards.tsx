"use client";

import { useState } from "react";
import Link from "next/link";
import { LicenseTierModal } from "@/components/home/license-tier-modal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export type Tier = {
  /** Matches `license_tiers.slug` / keys in `LICENSE_TIER_COPY` */
  slug: string;
  name: string;
  price: string;
  highlight?: boolean;
  features: string[];
};

const defaultTiers: Tier[] = [
  {
    slug: "basic",
    name: "Basic",
    price: "$59.99",
    features: [
      "MP3",
      "Streaming & distribution limits per license",
      "Producer retains master ownership",
    ],
  },
  {
    slug: "premium",
    name: "Premium",
    price: "$99.99",
    highlight: true,
    features: ["MP3 + WAV", "Higher distribution & stream caps", "Tag in intro"],
  },
  {
    slug: "premium-trackouts",
    name: "Premium + Trackouts",
    price: "$179.99",
    features: ["Full trackouts / stems", "Expanded limits", "WAV + stems package"],
  },
  {
    slug: "exclusive",
    name: "Exclusive",
    price: "$2,000+",
    features: [
      "Master ownership transfer (per agreement)",
      "Removed from store after sale",
      "Unlimited commercial use (per terms)",
    ],
  },
];

export function LicensingTierCards({
  tiers = defaultTiers,
  showSectionHeading = true,
}: {
  tiers?: Tier[];
  showSectionHeading?: boolean;
}) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const active = openSlug
    ? tiers.find((t) => t.slug === openSlug) ?? null
    : null;

  return (
    <section id="licensing" className="scroll-mt-24 py-20">
      <Container>
        {showSectionHeading ? (
          <SectionHeading
            title="Licensing"
            subtitle="Four tiers. One clear path from first release to exclusive ownership."
            action={
              <Link
                href="/beats"
                className="inline-flex rounded-md border border-[#016b28]/40 bg-[#016b28]/10 px-4 py-2 text-sm font-semibold text-[#016b28] transition hover:bg-[#016b28]/20"
              >
                Browse all tracks
              </Link>
            }
          />
        ) : null}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <Card
              key={tier.slug}
              glow={tier.highlight}
              className={`flex flex-col ${tier.highlight ? "scale-[1.02] border-[#016b28]/40 lg:-mt-2" : ""}`}
            >
              {tier.highlight ? (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Popular
                </p>
              ) : null}
              <h3 className="font-[family-name:var(--font-beats-hero)] text-lg font-semibold tracking-tight text-white">
                {tier.name}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-beats-hero)] text-3xl font-semibold tracking-tight text-white">
                {tier.price}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-[#A1A1AA]">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#016b28]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setOpenSlug(tier.slug)}
                className="mt-6 inline-flex justify-center rounded-md bg-[#016b28] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_0_20px_rgba(1,107,40,0.28)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(1,107,40,0.55),0_0_72px_rgba(1,107,40,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016b28]"
              >
                Read license
              </button>
            </Card>
          ))}
        </div>
      </Container>

      <LicenseTierModal
        open={active !== null}
        onClose={() => setOpenSlug(null)}
        tierName={active?.name ?? ""}
        licenseSlug={active?.slug ?? ""}
      />
    </section>
  );
}
