import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#016b28] text-white shadow-[0_0_20px_rgba(1,107,40,0.28)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(1,107,40,0.55),0_0_72px_rgba(1,107,40,0.2)]",
  secondary:
    "border border-white/15 bg-white/5 text-white hover:border-[#002400]/50 hover:bg-white/10",
  ghost: "text-[#A1A1AA] hover:text-white",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#016b28] disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
