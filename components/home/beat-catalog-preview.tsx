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

const placeholder: PreviewBeat[] = [];

export function BeatCatalogPreview({
  beats,
  /** When true, omit the “Browse beats” intro (e.g. full hero already on `/beats`). */
  hideIntro = false,
}: {
  beats?: PreviewBeat[];
  hideIntro?: boolean;
}) {
  const list = beats ?? placeholder;
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
                className="inline-flex items-center justify-center rounded-md bg-[#016b28] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(1,107,40,0.28)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(1,107,40,0.55),0_0_72px_rgba(1,107,40,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016b28]"
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
