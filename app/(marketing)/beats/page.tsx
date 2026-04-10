import type { Metadata } from "next";
import { BeatCatalogPreview } from "@/components/home/beat-catalog-preview";
import { Container } from "@/components/ui/container";
import { getBeats } from "@/lib/data/beats";
import { mapBeatToPreview } from "@/lib/mappers/beats";

export const metadata: Metadata = {
  title: "Beats",
  description: "Browse HiveMind beats — preview, filter, and license.",
};

export default async function BeatsPage() {
  const beats = await getBeats();
  const rows = beats.length ? beats.map(mapBeatToPreview) : undefined;

  return (
    <div className="py-16">
      <Container>
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
            Beats
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#A1A1AA]">
            {beats.length
              ? "Preview and license directly from the catalog."
              : "Connect Supabase and run the seed script to load beats."}
          </p>
        </div>
      </Container>
      <BeatCatalogPreview beats={rows} />
    </div>
  );
}
