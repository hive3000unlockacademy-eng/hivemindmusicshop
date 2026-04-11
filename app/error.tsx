"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 bg-[#050505] px-6 py-16">
      <h1 className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold tracking-tight text-white">
        Something went wrong
      </h1>
      <p className="max-w-md text-center text-sm text-[#A1A1AA]">
        Try again. If the problem continues, refresh the page or come back later.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-md border border-white/15 px-5 py-2 text-sm text-white hover:border-[#002400]/50"
      >
        Try again
      </button>
    </div>
  );
}
