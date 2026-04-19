import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

type Props = {
  artworkSrc?: string;
  /** Featured beat for secondary line + deep link */
  featuredSlug: string;
  featuredTitle: string;
  featuredBpm: number;
  featuredGenre: string;
};

const btnPrimary =
  "inline-flex items-center justify-center rounded-md bg-[#016b28] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(1,107,40,0.28)] transition hover:bg-[#1f9d55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016b28]";
const btnSecondary =
  "inline-flex items-center justify-center rounded-md border border-white/20 bg-black/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#002400]/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002400]";

/**
 * Full-bleed hero with marketing headline and CTAs on the image.
 */
export function HeroFeaturedBeat({
  artworkSrc = "/blackwhite hero image.png",
  featuredSlug,
  featuredTitle,
  featuredBpm,
  featuredGenre,
}: Props) {
  return (
    <section className="relative min-h-[min(72vh,720px)] overflow-hidden sm:min-h-[min(78vh,800px)]">
      <Image
        src={artworkSrc}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Top half: ~10% lighter wash; then match prior mid/bottom stops for section blend */}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.28)_0%,rgba(5,5,5,0.28)_50%,rgba(5,5,5,0.31)_68%,rgba(5,5,5,0.55)_78%,rgba(5,5,5,0.88)_92%,#050505_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#050505]/72 via-transparent to-[#050505]/45"
        aria-hidden
      />

      <Container className="relative z-10 flex min-h-[min(72vh,720px)] flex-col justify-end pb-12 pt-28 sm:min-h-[min(78vh,800px)] sm:pb-16 sm:pt-32">
        <div className="max-w-3xl">
          <p className="mb-3 font-[family-name:var(--font-beats-hero)] text-base font-semibold uppercase tracking-[0.14em] text-[#016b28] drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] sm:mb-4 sm:text-lg md:text-xl">
            HiveMind Productions
          </p>

          <h1 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold leading-[1.2] tracking-tight text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.85)] sm:text-3xl md:text-4xl lg:text-[2.45rem] lg:leading-[1.15]">
            <span className="block text-white/95">Premium beats for artists</span>
            <span className="mt-2 block bg-gradient-to-r from-white via-[#e8fff4] to-[#6ee7a8] bg-clip-text font-bold text-transparent sm:mt-3">
              who move fast.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#C4C4C4] sm:text-xl">
            License trap, melodic, and R&amp;B instrumentals with clear tiers—preview
            every track before you buy. No guesswork: what you hear is what you
            license.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/cart" className={btnPrimary}>
              View Cart
            </Link>
            <Link href="/#licensing" className={btnSecondary}>
              See licenses
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold text-[#A1A1AA] transition hover:text-[#016b28]"
            >
              Watch videos
            </Link>
          </div>

          <p className="mt-10 text-sm text-[#A1A1AA]">
            <span className="font-medium text-[#016b28]">Featured:</span>{" "}
            <Link
              href={`/beats/${featuredSlug}`}
              className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:text-[#016b28] hover:decoration-[#016b28]"
            >
              {featuredTitle}
            </Link>
            <span className="text-[#6B6B6B]"> · </span>
            {featuredBpm} BPM
            <span className="text-[#6B6B6B]"> · </span>
            {featuredGenre}
          </p>
        </div>
      </Container>
    </section>
  );
}
