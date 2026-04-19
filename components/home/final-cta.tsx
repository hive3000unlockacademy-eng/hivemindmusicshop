import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const btnPrimary =
  "inline-flex items-center justify-center rounded-md bg-[#016b28] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f9d55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016b28]";
const btnSecondary =
  "inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#002400]/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002400]";

export function FinalCta() {
  return (
    <section className="py-20">
      <Container>
        <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[#002400]/25 shadow-[0_0_40px_rgba(0,36,0,0.08)]">
          <Image
            src="/images/site/cta-studio.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1152px"
            priority={false}
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#050505]/82 via-[#050505]/75 to-[#0A0A0A]/80"
            aria-hidden
          />
          <div className="relative z-10 p-10 text-center sm:p-14">
            <h2 className="font-[family-name:var(--font-beats-hero)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to build?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#A1A1AA]">
              Browse the catalog, explore videos, or reach out for exclusives and
              custom work.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/beats" className={btnPrimary}>
                Shop beats
              </Link>
              <Link href="/contact" className={btnSecondary}>
                Contact
              </Link>
              <Link href="/videos" className={btnSecondary}>
                Watch videos
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
