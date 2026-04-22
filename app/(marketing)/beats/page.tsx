import { BeatCatalogPreview } from "@/components/home/beat-catalog-preview";
import { HeroFeaturedBeat } from "@/components/home/hero-featured-beat";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { getBeats, getFeaturedBeat } from "@/lib/data/beats";
import { mapBeatToPreview } from "@/lib/mappers/beats";
import { buildBeatsItemListJsonLd } from "@/lib/seo/json-ld-builders";
import { marketingMetadata } from "@/lib/seo/marketing-metadata";

export const metadata = marketingMetadata({
  title: "Beats",
  description:
    "Premium beats for artists who move fast. License trap, melodic, and R&B instrumentals with clear tiers—preview every track before you buy.",
  path: "/beats",
  keywords: [
    "buy beats online",
    "trap beats",
    "drill beats",
    "melodic beats",
    "beat licensing",
    "HiveMind Productions",
    "instrumentals",
  ],
});

export default async function BeatsPage() {
  const [beats, featured] = await Promise.all([getBeats(), getFeaturedBeat()]);
  const rows = beats.length ? beats.map(mapBeatToPreview) : undefined;
  const hero = featured ?? beats[0];

  return (
    <>
      {beats.length ? <JsonLd data={buildBeatsItemListJsonLd(beats)} /> : null}
      <div className="pb-16 pt-0">
      <HeroFeaturedBeat
        artworkSrc="/blackwhite hero image.png"
        featuredSlug={hero?.slug ?? "midnight-run"}
        featuredTitle={hero?.title ?? "Midnight Run"}
        featuredBpm={hero?.bpm ?? 140}
        featuredGenre={hero?.genre ?? "Dark Trap"}
      />
      {!beats.length ? (
        <Container>
          <p className="py-4 text-center text-sm text-amber-400/90">
            Connect Supabase and run the seed script to load beats into the
            catalog.
          </p>
        </Container>
      ) : null}
      <BeatCatalogPreview beats={rows} hideIntro />
    </div>
    </>
  );
}
