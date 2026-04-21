import Link from "next/link";
import { Container } from "@/components/ui/container";

const links = [
  { href: "/beats", label: "Beats" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A] py-14">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <p className="font-[family-name:var(--font-beats-hero)] text-lg font-semibold tracking-tight text-white">
              HiveMind Productions
            </p>
            <p className="mt-2 text-sm text-[#A1A1AA]">
              Premium beats and licensing.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-[#A1A1AA]">
              <a
                href="https://instagram.com/HiveMind_the_HitMaker"
                className="inline-flex items-center gap-2 text-[#016b28] transition hover:text-[#1f9d55]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="HiveMind on Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 shrink-0"
                  aria-hidden
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="underline-offset-2 hover:underline">
                  @HiveMind_the_HitMaker
                </span>
              </a>
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                prefetch={l.href.startsWith("/admin") ? false : undefined}
                className="text-sm text-[#016b28] transition hover:text-[#1f9d55]"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 space-y-4 border-t border-white/10 pt-8 text-center text-xs text-[#A1A1AA]">
          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
            aria-label="Legal"
          >
            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms of Service
            </Link>
          </nav>
          <p>© 2016 HiveMind Productions. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://www.nebuladigital.net"
              className="text-[#016b28] underline-offset-2 transition hover:text-[#1f9d55] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nebula Digital
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
