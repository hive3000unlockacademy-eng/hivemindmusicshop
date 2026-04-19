"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/ui/container";

const nav = [
  { href: "/beats", label: "Beats" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
];

const linkClass =
  "text-sm font-medium text-[#016b28] transition hover:text-[#1f9d55]";
const mobileLinkClass =
  "border-b border-white/5 py-3 text-base font-medium text-[#016b28] transition last:border-b-0 hover:text-[#1f9d55]";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <BrandLogo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center md:flex">
          <Link
            href="/cart"
            className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-white transition hover:border-[#002400]/50"
          >
            Cart
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/15 text-white transition hover:border-[#016b28]/50 hover:bg-white/5 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="site-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </Container>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="site-mobile-menu"
            className="absolute left-0 right-0 top-full z-50 border-b border-white/10 bg-[#050505]/98 shadow-[0_24px_48px_rgba(0,0,0,0.55)] backdrop-blur-md md:hidden"
          >
            <Container className="py-2">
              <nav className="flex flex-col" aria-label="Mobile">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={mobileLinkClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  className="mt-1 rounded-md border border-white/15 px-3 py-3 text-center text-base font-medium text-white transition hover:border-[#002400]/50"
                  onClick={() => setMenuOpen(false)}
                >
                  Cart
                </Link>
              </nav>
            </Container>
          </div>
        </>
      ) : null}
    </header>
  );
}
