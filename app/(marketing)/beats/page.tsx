import type { Metadata } from "next";
import { BeatsPageHero } from "@/components/beats/beats-page-hero";
import { BeatCatalogPreview } from "@/components/home/beat-catalog-preview";
import { Container } from "@/components/ui/container";
import { getBeats } from "@/lib/data/beats";
import { mapBeatToPreview } from "@/lib/mappers/beats";

export const metadata: Metadata = {
  title: "Beats",
  description:
    "Not from here. Neither is your sound. Unlock beats that stand out from the rest.",
};

export default async function BeatsPage() {
  const beats = await getBeats();
  const rows = beats.length ? beats.map(mapBeatToPreview) : undefined;

  return (
    <div className="pb-16 pt-0">
      <BeatsPageHero />
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
  );
}
