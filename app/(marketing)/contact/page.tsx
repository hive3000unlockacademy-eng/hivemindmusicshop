import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact HiveMind Productions for collabs, custom beats, and inquiries.",
};

export default function ContactPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <div className="order-2 flex min-h-0 flex-col lg:order-1">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-white">
              Contact
            </h1>
            <p className="mt-4 max-w-2xl text-[#A1A1AA]">
              Business, custom beats, and collabs. Follow{" "}
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
            <ContactForm />
          </div>
          <div className="relative order-1 aspect-[4/3] min-h-0 w-full overflow-hidden rounded-2xl border border-white/10 lg:order-2 lg:aspect-auto lg:h-full">
            <Image
              src="/images/site/contact-studio.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
