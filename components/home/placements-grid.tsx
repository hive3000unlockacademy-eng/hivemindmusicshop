import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

type Placement = {
  title: string;
  artist: string;
  role: string;
  tint: string;
  imageSrc: string;
};

const sample: Placement[] = [
  {
    title: "Night Shift",
    artist: "Artist One",
    role: "Producer, songwriter",
    tint: "from-[#1a2a28] to-[#0d1514]",
    imageSrc: "/images/placements/placement-1.jpg",
  },
  {
    title: "Signal",
    artist: "Artist Two",
    role: "Musician, producer",
    tint: "from-[#2a1f28] to-[#140f18]",
    imageSrc: "/images/placements/placement-2.jpg",
  },
  {
    title: "Chrome",
    artist: "Artist Three",
    role: "Producer",
    tint: "from-[#1f2430] to-[#0f1118]",
    imageSrc: "/images/placements/placement-3.jpg",
  },
  {
    title: "Low Beam",
    artist: "Artist Four",
    role: "Producer, mixer",
    tint: "from-[#1a2520] to-[#0c1210]",
    imageSrc: "/images/placements/placement-1.jpg",
  },
  {
    title: "Vault Keys",
    artist: "Artist Five",
    role: "Songwriter, producer",
    tint: "from-[#25201a] to-[#15120c]",
    imageSrc: "/images/placements/placement-2.jpg",
  },
  {
    title: "East End",
    artist: "Artist Six",
    role: "Producer, engineer",
    tint: "from-[#1a1f2a] to-[#0d1016]",
    imageSrc: "/images/placements/placement-3.jpg",
  },
];

export function PlacementsGrid({ items = sample }: { items?: Placement[] }) {
  return (
    <section className="border-y border-white/5 bg-[#0A0A0A]/50 py-20">
      <Container>
        <SectionHeading
          title="Discography & placements"
          subtitle="Selected credits and releases. Real roles, real records."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.title + p.artist}
              className={`rounded-2xl border border-white/10 bg-gradient-to-br ${p.tint} p-4 shadow-lg transition hover:border-[#002400]/35`}
            >
              <div className="flex gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10">
                  <Image
                    src={p.imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-white">{p.title}</h3>
                  <p className="truncate text-sm text-[#A1A1AA]">{p.artist}</p>
                  <div className="mt-3 flex gap-2 text-xs">
                    <span className="rounded border border-white/15 px-2 py-1 text-[#A1A1AA]">
                      Preview
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#A1A1AA]">
                Role: {p.role}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
