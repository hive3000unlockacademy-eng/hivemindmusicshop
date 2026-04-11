"use client";

import { useEffect } from "react";
import type { VideoRow } from "@/lib/data/videos";

export function VideoModal({
  video,
  onClose,
}: {
  video: VideoRow;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal
      aria-labelledby="video-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl rounded-xl border border-white/15 bg-[#050505] p-4 shadow-2xl">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h2
              id="video-modal-title"
              className="font-[family-name:var(--font-beats-hero)] text-lg font-semibold tracking-tight text-white"
            >
              {video.title}
            </h2>
            {video.artist ? (
              <p className="text-sm text-[#A1A1AA]">{video.artist}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-white/15 px-3 py-1 text-sm text-[#A1A1AA] hover:border-[#002400]/50 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
          <iframe
            title={video.title}
            src={video.embed_url}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
