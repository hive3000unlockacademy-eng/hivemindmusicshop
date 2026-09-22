import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { HeroFeaturedBeat } from "@/components/home/hero-featured-beat";
import { LicensingTierCards } from "@/components/home/licensing-tier-cards";
import { Container } from "@/components/ui/container";
import { marketingMetadata } from "@/lib/seo/marketing-metadata";
import contactPhoto from "../../../public/contact.jpg";

export const metadata = marketingMetadata({
  title: "Studio",
  description:
    "Book a recording session with HiveMind Productions. Recording, mixing, mastering, and full production — reach out to start your session.",
  path: "/studio",
  keywords: [
    "recording studio",
    "book a session",
    "vocal recording",
    "mixing",
    "mastering",
    "HiveMind Productions",
  ],
});

export default function StudioPage() {
  return (
    <>
      <HeroFeaturedBeat artworkSrc="/blackwhite hero image.png" />
      <LicensingTierCards bookPath="" variant="studio" />
      <section id="book" className="scroll-mt-24 py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className="order-2 flex min-h-0 flex-col lg:order-1">
              <h2 className="font-[family-name:var(--font-beats-hero)] text-4xl font-semibold tracking-tight text-white">
                Book a session
              </h2>
              <p className="mt-4 max-w-2xl text-[#A1A1AA]">
                Tell us what you need — recording, mixing, mastering, or full
                production. Follow{" "}
                <a
                  href="https://instagram.com/HiveMind_the_HitMaker"
                  className="text-[#016b28] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @HiveMind_the_HitMaker
                </a>{" "}
                for updates.
              </p>
              <Suspense
                fallback={
                  <p className="mt-10 text-sm text-[#A1A1AA]">Loading form…</p>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
            <div className="order-1 w-full lg:order-2">
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={contactPhoto}
                  alt="HiveMind Productions"
                  className="h-auto w-full brightness-[0.72] contrast-[1.05] saturate-[0.75]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                  placeholder="blur"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/55 via-[#050505]/15 to-[#050505]/25"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
