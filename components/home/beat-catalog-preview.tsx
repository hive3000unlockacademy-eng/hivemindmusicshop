import Link from "next/link";
import { BeatCatalogPreviewClient } from "@/components/home/beat-catalog-preview-client";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export type PreviewBeat = {
  slug: string;
  title: string;
  genre: string;
  duration: string;
  bpm: number;
  tags: string[];
  /** Public preview URL (Supabase public-media or absolute). */
  previewUrl?: string | null;
  /** Local `/images/...` or absolute artwork URL. */
  coverUrl?: string | null;
};

const placeholder: PreviewBeat[] = [
  {
    slug: "midnight-run",
    title: "Midnight Run",
    genre: "Dark Trap",
    duration: "02:38",
    bpm: 140,
    tags: ["drill", "cinematic"],
    coverUrl: "/images/beats/midnight-run.jpg",
  },
  {
    slug: "neon-drift",
    title: "Neon Drift",
    genre: "Melodic",
    duration: "03:05",
    bpm: 97,
    tags: ["westcoast", "bouncy"],
    coverUrl: "/images/beats/neon-drift.jpg",
  },
  {
    slug: "signal-lost",
    title: "Signal Lost",
    genre: "R&B",
    duration: "02:52",
    bpm: 88,
    tags: ["smooth", "vibes"],
    coverUrl: "/images/beats/signal-lost.jpg",
  },
];

export function BeatCatalogPreview({ beats }: { beats?: PreviewBeat[] }) {
  const list = beats?.length ? beats : placeholder;
  return (
    <section className="border-y border-white/5 bg-[#050505] py-20">
      <Container>
        <SectionHeading
          title="Browse beats"
          subtitle="Search, filter, and preview before you buy. Full catalog on the Beats page."
          action={
            <Link
              href="/beats"
              className="inline-flex items-center justify-center rounded-md bg-[#016b28] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f9d55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016b28]"
            >
              View all beats
            </Link>
          }
        />
        <BeatCatalogPreviewClient beats={list} />
      </Container>
    </section>
  );
}
