import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s · Admin · HiveMind",
  },
  description: "HiveMindMusic.Shop administration.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
        <p className="font-[family-name:var(--font-beats-hero)] text-sm font-semibold tracking-tight text-[#016b28]">
          HiveMind Admin
        </p>
        <Link href="/" className="text-sm text-[#A1A1AA] hover:text-white">
          Storefront
        </Link>
      </header>
      <div className="p-6">{children}</div>
    </div>
  );
}
