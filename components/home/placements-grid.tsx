import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { EnrichedPlacement } from "@/lib/spotify-embed";

export function PlacementsGrid({ items }: { items: EnrichedPlacement[] }) {
  return (
    <section className="border-y border-white/5 bg-[#0A0A0A]/50 py-20">
      <Container>
        <SectionHeading
          title="Discography & placements"
          subtitle="Embedded Spotify previews."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.id}
              className={`flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${p.tint} shadow-lg transition hover:border-[#002400]/35`}
            >
              {p.embedSrc ? (
                <iframe
                  title={`Spotify embed (${p.id})`}
                  src={p.embedSrc}
                  width="100%"
                  height={152}
                  className="w-full shrink-0 border-0 bg-black"
                  style={{ borderRadius: 12 }}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
