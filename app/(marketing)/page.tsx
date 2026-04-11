import Image from "next/image";
import { BeatsPageHero } from "@/components/beats/beats-page-hero";
import { FinalCta } from "@/components/home/final-cta";
import { LicensingTierCards } from "@/components/home/licensing-tier-cards";
import { PlacementsGrid } from "@/components/home/placements-grid";
import { Container } from "@/components/ui/container";
import { getLicenseTiers } from "@/lib/data/license-tiers";
import { mapLicenseTierRow } from "@/lib/mappers/beats";

export default async function HomePage() {
  const tiers = await getLicenseTiers();

  const tierCards = tiers.length ? tiers.map(mapLicenseTierRow) : undefined;

  return (
    <>
      <BeatsPageHero browseHref="/beats#catalog" />
      <LicensingTierCards tiers={tierCards} />
      <PlacementsGrid />
      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <h2 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                The HiveMind sound
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-[#A1A1AA]">
                HiveMind Productions builds records at the edge of melodic trap and
                modern R&B—tight drums, wide mixes, and hooks that stick. This shop
                is built for artists who want clarity: what you hear in the preview
                is what you&apos;re licensing.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/site/sound-story.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
