import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 sm:gap-3 ${className}`}
    >
      <span className="relative block h-9 w-9 shrink-0 sm:h-10 sm:w-10">
        <Image
          src="/logo.png"
          alt="HiveMind Productions"
          fill
          className="object-contain"
          sizes="40px"
          priority
        />
      </span>
      <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold tracking-tight text-white sm:text-2xl">
        HiveMind
      </span>
    </Link>
  );
}
