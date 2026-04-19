import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const btnCta =
  "inline-flex items-center justify-center rounded-md bg-[#016b28] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(1,107,40,0.35)] transition-shadow duration-200 hover:shadow-[0_0_44px_rgba(1,107,40,0.55),0_0_88px_rgba(1,107,40,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016b28]";

/** `public/beats hero.png` — shared with other sections that reuse the beats hero artwork. */
export const BEATS_PAGE_HERO_IMAGE = "/beats%20hero.png";

type Props = {
  /** Default: {@link BEATS_PAGE_HERO_IMAGE} */
  imageSrc?: string;
  /** Primary CTA target. Use `/beats#catalog` when this hero is shown on a page without `#catalog`. */
  browseHref?: string;
};

/**
 * Full-bleed 16:9 beats catalog hero: artwork weighted right in the image;
 * left gradient keeps headline + CTA readable (no fake UI overlays).
 */
export function BeatsPageHero({
  imageSrc = BEATS_PAGE_HERO_IMAGE,
  browseHref = "#catalog",
}: Props) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#050505]">
      <div className="relative aspect-video w-full min-h-[200px] overflow-hidden">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          className="object-cover object-right object-top"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/55 to-transparent sm:via-[#050505]/40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-[#050505]/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050505]/15"
          aria-hidden
        />

        <Container className="absolute inset-0 z-10 flex items-center py-8 sm:py-12">
          <div className="max-w-2xl">
            <h1
              className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold leading-[1.2] tracking-tight text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.85)] sm:text-3xl md:text-4xl lg:text-[2.45rem] lg:leading-[1.15]"
            >
              <span className="block text-white/95">Not From Here.</span>
              <span className="mt-2 block bg-gradient-to-r from-white via-[#e8fff4] to-[#6ee7a8] bg-clip-text font-bold text-transparent sm:mt-3">
                Neither Is Your Sound.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#C8C8C8] sm:mt-6 sm:text-lg">
              Unlock beats that stand out from the rest.
            </p>
            <div className="mt-8 sm:mt-10">
              <Link href={browseHref} className={btnCta}>
                Browse beats
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
