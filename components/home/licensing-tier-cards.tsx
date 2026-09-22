"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export type Service = {
  slug: string;
  name: string;
  price: string;
  highlight?: boolean;
  features: string[];
};

const defaultServices: Service[] = [
  {
    slug: "recording",
    name: "Recording",
    price: "$60/hr",
    features: [
      "Vocal and instrumental tracking",
      "3-hour session focus",
      "Files ready for mix",
    ],
  },
  {
    slug: "mixing",
    name: "Mixing",
    price: "$150/song",
    highlight: true,
    features: [
      "A finished mix of your session",
      "Balance, depth, and punch",
      "Two mix revisions included",
    ],
  },
  {
    slug: "mastering",
    name: "Mastering",
    price: "$50/song",
    features: [
      "A release-ready master",
      "Loudness and polish for platforms",
      "Final stereo deliverable",
    ],
  },
  {
    slug: "full-production",
    name: "Full production",
    price: "$380/song",
    features: [
      "3 hours recording + mix + master",
      "One booking from start to finish",
      "Built for release day",
    ],
  },
];

function LandingServiceCards({
  services,
  bookPath,
  showSectionHeading,
}: {
  services: Service[];
  bookPath: string;
  showSectionHeading: boolean;
}) {
  const bookSessionHref = bookPath ? `${bookPath}#book` : "#book";

  return (
    <section id="services" className="scroll-mt-24 py-20">
      <Container>
        {showSectionHeading ? (
          <SectionHeading
            title="Services"
            subtitle="Recording, mixing, mastering, and full production. Book a session to start."
            action={
              <Link
                href={bookSessionHref}
                className="inline-flex rounded-md border border-[#016b28]/40 bg-[#016b28]/10 px-4 py-2 text-sm font-semibold text-[#016b28] transition hover:bg-[#016b28]/20"
              >
                Book a session
              </Link>
            }
          />
        ) : null}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.slug}
              glow={service.highlight}
              className={`flex flex-col ${service.highlight ? "scale-[1.02] border-[#016b28]/40 lg:-mt-2" : ""}`}
            >
              {service.highlight ? (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  Popular
                </p>
              ) : null}
              <h3 className="font-[family-name:var(--font-beats-hero)] text-lg font-semibold tracking-tight text-white">
                {service.name}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-beats-hero)] text-3xl font-semibold tracking-tight text-white">
                {service.price}
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-[#A1A1AA]">
                {service.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#016b28]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`${bookPath}?service=${service.slug}#book`}
                className="mt-6 inline-flex justify-center rounded-md bg-[#016b28] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_0_20px_rgba(1,107,40,0.28)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(1,107,40,0.55),0_0_72px_rgba(1,107,40,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016b28]"
              >
                Book
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Studio rate sheet — no CTAs; form lives below. */
function StudioRateSheet({
  services,
  showSectionHeading,
}: {
  services: Service[];
  showSectionHeading: boolean;
}) {
  return (
    <section id="services" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        {showSectionHeading ? (
          <div className="mb-12 max-w-2xl">
            <p className="font-[family-name:var(--font-beats-hero)] text-xs font-semibold uppercase tracking-[0.2em] text-[#016b28]">
              Rate sheet
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-beats-hero)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Services
            </h2>
            <p className="mt-3 text-[#A1A1AA]">
              Clear rates for recording, mixing, mastering, and full production
              in Sullivan County, NY.
            </p>
          </div>
        ) : null}

        <ol className="divide-y divide-white/10 border-y border-white/10">
          {services.map((service, index) => (
            <li
              key={service.slug}
              className="group grid gap-4 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:gap-8 sm:py-10"
            >
              <span className="font-[family-name:var(--font-beats-hero)] text-sm font-semibold tracking-widest text-[#016b28]/80 transition group-hover:text-[#016b28]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {service.name}
                  </h3>
                  {service.highlight ? (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                      Popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
                  {service.features.join(" · ")}
                </p>
              </div>

              <p className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold tracking-tight text-white sm:pt-1 sm:text-right sm:text-3xl">
                {service.price}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function LicensingTierCards({
  services = defaultServices,
  showSectionHeading = true,
  bookPath = "/studio",
  variant = "landing",
}: {
  services?: Service[];
  showSectionHeading?: boolean;
  /** Path used for Book links, e.g. `/studio` or `` for same-page query. */
  bookPath?: string;
  /** `studio` = rate sheet without book buttons (form is below). */
  variant?: "landing" | "studio";
}) {
  if (variant === "studio") {
    return (
      <StudioRateSheet
        services={services}
        showSectionHeading={showSectionHeading}
      />
    );
  }

  return (
    <LandingServiceCards
      services={services}
      bookPath={bookPath}
      showSectionHeading={showSectionHeading}
    />
  );
}
