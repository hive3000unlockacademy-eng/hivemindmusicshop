import type { ReactNode } from "react";

/** Orbitron is loaded on the root layout (`--font-beats-hero`); no extra wrapper needed. */
export default function BeatsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
