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
  {
    slug: "chrome-rain",
    title: "Chrome Rain",
    genre: "Drill",
    duration: "02:48",
    bpm: 144,
    tags: ["melodic", "bounce"],
    coverUrl: "/images/beats/midnight-run.jpg",
  },
  {
    slug: "void-walk",
    title: "Void Walk",
    genre: "Dark Trap",
    duration: "03:15",
    bpm: 132,
    tags: ["cinematic", "wide"],
    coverUrl: "/images/beats/neon-drift.jpg",
  },
  {
    slug: "glass-ceiling",
    title: "Glass Ceiling",
    genre: "Trap",
    duration: "03:01",
    bpm: 150,
    tags: ["airy", "crisp"],
    coverUrl: "/images/beats/signal-lost.jpg",
  },
  {
    slug: "redline-hush",
    title: "Redline Hush",
    genre: "Drill",
    duration: "02:34",
    bpm: 160,
    tags: ["uptempo", "shuffle"],
    coverUrl: "/images/beats/midnight-run.jpg",
  },
  {
    slug: "after-midnight",
    title: "After Midnight",
    genre: "R&B",
    duration: "03:24",
    bpm: 82,
    tags: ["late", "smooth"],
    coverUrl: "/images/beats/neon-drift.jpg",
  },
  {
    slug: "low-tide",
    title: "Low Tide",
    genre: "Melodic",
    duration: "02:56",
    bpm: 94,
    tags: ["laid-back", "coastal"],
    coverUrl: "/images/beats/signal-lost.jpg",
  },
  {
    slug: "ice-palace",
    title: "Ice Palace",
    genre: "Trap",
    duration: "03:09",
    bpm: 138,
    tags: ["cold", "sliding"],
    coverUrl: "/images/beats/midnight-run.jpg",
  },
  {
    slug: "north-star",
    title: "North Star",
    genre: "Hip-Hop",
    duration: "03:18",
    bpm: 128,
    tags: ["anthem", "hook"],
    coverUrl: "/images/beats/neon-drift.jpg",
  },
  {
    slug: "heavy-air",
    title: "Heavy Air",
    genre: "Boom Bap",
    duration: "03:43",
    bpm: 70,
    tags: ["dense", "slow"],
    coverUrl: "/images/beats/signal-lost.jpg",
  },
];

export function BeatCatalogPreview({
  beats,
  /** When true, omit the “Browse beats” intro (e.g. full hero already on `/beats`). */
  hideIntro = false,
}: {
  beats?: PreviewBeat[];
  hideIntro?: boolean;
}) {
  const list = beats?.length ? beats : placeholder;
  return (
    <section
      id="catalog"
      className="scroll-mt-24 border-y border-white/5 bg-[#050505] py-20"
    >
      <Container>
        {hideIntro ? null : (
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
        )}
        <BeatCatalogPreviewClient beats={list} />
      </Container>
    </section>
  );
}
