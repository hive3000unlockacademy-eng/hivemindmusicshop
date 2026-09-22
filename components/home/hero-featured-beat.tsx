import Image from "next/image";
import { Container } from "@/components/ui/container";

type Props = {
  artworkSrc?: string;
};

/**
 * Full-bleed studio hero with marketing headline on the image.
 */
export function HeroFeaturedBeat({
  artworkSrc = "/blackwhite hero image.png",
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
            <span className="block text-white/95">Your next session</span>
            <span className="mt-2 block bg-gradient-to-r from-white via-[#e8fff4] to-[#6ee7a8] bg-clip-text font-bold text-transparent sm:mt-3">
              starts here.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#C4C4C4] sm:text-xl">
            Recording, mixing, mastering, and full production—book studio time
            and build the record with HiveMind.
          </p>
        </div>
      </Container>
    </section>
  );
}
