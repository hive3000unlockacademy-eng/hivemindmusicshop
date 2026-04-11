import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/ui/container";

const nav = [
  { href: "/beats", label: "Beats" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <BrandLogo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#A1A1AA] transition hover:text-[#016b28]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-white transition hover:border-[#002400]/50"
          >
            Cart
          </Link>
        </div>
      </Container>
    </header>
  );
}
