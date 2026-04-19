import Image from "next/image";
import { BeatsPageHero } from "@/components/beats/beats-page-hero";
import { FinalCta } from "@/components/home/final-cta";
import { LicensingTierCards } from "@/components/home/licensing-tier-cards";
import { PlacementsGrid } from "@/components/home/placements-grid";
import { Container } from "@/components/ui/container";
import { PLACEMENTS } from "@/lib/data/placements";
import { getLicenseTiers } from "@/lib/data/license-tiers";
import { mapLicenseTierRow } from "@/lib/mappers/beats";
import { resolvePlacements } from "@/lib/spotify-embed";

/** `public/hero image.png` — “The HiveMind sound” section only. */
const HIVE_MIND_SOUND_IMAGE = "/hero%20image.png";

export default async function HomePage() {
  const tiers = await getLicenseTiers();
  const placements = resolvePlacements(PLACEMENTS);

  const tierCards = tiers.length ? tiers.map(mapLicenseTierRow) : undefined;

  return (
    <>
      <BeatsPageHero browseHref="/beats#catalog" />
      <PlacementsGrid items={placements} />
      <LicensingTierCards tiers={tierCards} />
      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <h2 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                The HiveMind sound
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-[#A1A1AA]">
                HiveMind Productions builds records at the edge of melodic trap/drill
                and modern Hip Hop/R&B—tight drums, wide mixes, powerful 808&apos;s,
                and hooks that stick.
                This shop
                is built for artists who want clarity: what you hear in the preview
                is what you&apos;re licensing.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={HIVE_MIND_SOUND_IMAGE}
                alt=""
                fill
                className="object-cover object-right object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] rounded-2xl bg-black/10"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 z-[2] rounded-2xl bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]"
                aria-hidden
              />
            </div>
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
