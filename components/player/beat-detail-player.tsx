"use client";

import { useAudio } from "@/components/player/audio-context";
import { trackBeatStoreEvent } from "@/lib/analytics/client-events";

export function BeatDetailPlayer({
  slug,
  title,
  previewUrl,
}: {
  slug: string;
  title: string;
  previewUrl: string | null;
}) {
  const { current, isPlaying, progress, duration, play, toggle } = useAudio();
  const active = current?.slug === slug;
  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  if (!previewUrl) {
    return (
      <p className="mt-6 text-sm text-[#A1A1AA]">
        Preview file not uploaded yet. Check back after the producer publishes
        the public preview.
      </p>
    );
  }

  return (
    <div className="mt-8 max-w-xl">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            if (active) {
              toggle();
            } else {
              trackBeatStoreEvent("preview", slug, { source: "beat_detail" });
              play({ slug, title, previewUrl });
            }
          }}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#016b28] bg-[#016b28]/15 text-[#016b28] shadow-[0_0_24px_rgba(1,107,40,0.28)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(1,107,40,0.45),0_0_64px_rgba(1,107,40,0.2)]"
          aria-label={active && isPlaying ? "Pause preview" : "Play preview"}
        >
          {active && isPlaying ? "❚❚" : "▶"}
        </button>
        <div className="min-w-0 flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#016b28] shadow-[0_0_12px_rgba(1,107,40,0.5)] transition-[width]"
              style={{ width: active ? `${pct}%` : "0%" }}
            />
          </div>
          <p className="mt-2 text-xs text-[#A1A1AA]">
            <span className="font-semibold text-[#016b28]">Preview</span> — not for commercial use
          </p>
        </div>
      </div>
    </div>
  );
}
