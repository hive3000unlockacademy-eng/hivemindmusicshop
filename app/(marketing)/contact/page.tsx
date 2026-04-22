import Image from "next/image";
import { ContactForm } from "@/components/contact/contact-form";
import { Container } from "@/components/ui/container";
import { marketingMetadata } from "@/lib/seo/marketing-metadata";
import contactPhoto from "../../../public/contact.jpg";

export const metadata = marketingMetadata({
  title: "Contact",
  description:
    "Contact HiveMind Productions for business inquiries, custom beats, collabs, and licensing questions.",
  path: "/contact",
  keywords: [
    "contact HiveMind",
    "custom beats",
    "music collab",
    "HiveMind Productions",
    "beat producer contact",
  ],
});

export default function ContactPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="order-2 flex min-h-0 flex-col lg:order-1">
            <h1 className="font-[family-name:var(--font-beats-hero)] text-4xl font-semibold tracking-tight text-white">
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
          <div className="order-1 w-full lg:order-2">
            <Image
              src={contactPhoto}
              alt="HiveMind Productions"
              className="h-auto w-full rounded-2xl border border-white/10"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
