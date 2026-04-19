"use client";

import { useAudio } from "@/components/player/audio-context";

function formatDurationSecondsLocal(total: number) {
  const s = Math.floor(total % 60);
  const m = Math.floor(total / 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function MiniPlayer() {
  const { current, isPlaying, progress, duration, toggle, seek } = useAudio();
  if (!current) return null;

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#050505]/95 px-4 py-3 backdrop-blur-md"
      role="region"
      aria-label="Now playing"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{current.title}</p>
          <p className="truncate text-xs">
            <span className="inline-flex rounded-md bg-[#016b28] px-1.5 py-0.5 font-semibold text-white shadow-[0_0_8px_rgba(1,107,40,0.25)]">
              Preview
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3 sm:w-80">
          <button
            type="button"
            onClick={toggle}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#016b28]/50 bg-[#016b28]/15 text-[#016b28] transition hover:bg-[#016b28]/25"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <div className="min-w-0 flex-1">
            <div
              className="h-1.5 cursor-pointer overflow-hidden rounded-full bg-white/10"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                seek(x / rect.width);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                }
              }}
              role="slider"
              tabIndex={0}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[#016b28] shadow-[0_0_12px_rgba(1,107,40,0.45)]"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-[#A1A1AA]">
              <span>{formatDurationSecondsLocal(progress)}</span>
              <span>{formatDurationSecondsLocal(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
