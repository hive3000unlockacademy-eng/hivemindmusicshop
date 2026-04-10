import type { ReactNode } from "react";

const baseDepth =
  "shadow-[0_8px_32px_rgba(0,0,0,0.55),0_2px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]";
const hoverDepth =
  "hover:shadow-[0_16px_48px_rgba(0,0,0,0.65),0_4px_16px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,36,0,0.08)] hover:-translate-y-0.5";

export function Card({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  const glowShadow = glow
    ? "shadow-[0_0_48px_rgba(0,36,0,0.14),0_12px_40px_rgba(0,0,0,0.55),0_2px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_0_56px_rgba(0,36,0,0.2),0_18px_52px_rgba(0,0,0,0.6),0_4px_16px_rgba(0,0,0,0.4)] hover:-translate-y-0.5"
    : `${baseDepth} ${hoverDepth}`;

  return (
    <div
      className={`rounded-xl border border-white/10 bg-[#0A0A0A]/80 p-6 backdrop-blur-sm transition duration-300 ease-out hover:border-[#002400]/40 ${glowShadow} ${className}`}
    >
      {children}
    </div>
  );
}
