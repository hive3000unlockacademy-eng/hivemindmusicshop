import Image from "next/image";
import { FinalCta } from "@/components/home/final-cta";
import { HeroFeaturedBeat } from "@/components/home/hero-featured-beat";
import { LicensingTierCards } from "@/components/home/licensing-tier-cards";
import { PlacementsGrid } from "@/components/home/placements-grid";
import { Container } from "@/components/ui/container";
import { getBeats, getFeaturedBeat } from "@/lib/data/beats";
import { getLicenseTiers } from "@/lib/data/license-tiers";
import { mapLicenseTierRow } from "@/lib/mappers/beats";

export default async function HomePage() {
  const [beats, featured, tiers] = await Promise.all([
    getBeats(),
    getFeaturedBeat(),
    getLicenseTiers(),
  ]);

  const hero = featured ?? beats[0];
  const tierCards = tiers.length ? tiers.map(mapLicenseTierRow) : undefined;

  return (
    <>
      <HeroFeaturedBeat
        artworkSrc="/blackwhite hero image.png"
        featuredSlug={hero?.slug ?? "midnight-run"}
        featuredTitle={hero?.title ?? "Midnight Run"}
        featuredBpm={hero?.bpm ?? 140}
        featuredGenre={hero?.genre ?? "Dark Trap"}
      />
      <LicensingTierCards tiers={tierCards} />
      <PlacementsGrid />
      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white sm:text-3xl">
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
