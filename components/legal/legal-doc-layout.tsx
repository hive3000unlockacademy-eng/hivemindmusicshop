import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function LegalDocLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="py-16">
      <Container>
        <h1 className="font-[family-name:var(--font-beats-hero)] text-4xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[#A1A1AA]">{description}</p>
        <div className="mt-12 max-w-3xl space-y-8 text-sm leading-relaxed text-[#C4C4C4]">
          {children}
        </div>
      </Container>
    </div>
  );
}

export function LegalSection({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-[family-name:var(--font-beats-hero)] text-lg font-semibold tracking-tight text-white">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 text-[#A1A1AA]">{children}</div>
    </section>
  );
}
