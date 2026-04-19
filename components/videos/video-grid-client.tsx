"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { VideoRow } from "@/lib/data/videos";
import { formatPublishedDate } from "@/lib/format";
import { videoThumbnailUrl } from "@/lib/video/thumbnail";
import { VideoModal } from "@/components/videos/video-modal";

export function VideoGridClient({
  videos,
  className,
  /** When false, hides the artist / date line under the title (e.g. Artist Music Videos). */
  showArtistMeta = true,
}: {
  videos: VideoRow[];
  /** Merged onto the grid wrapper (default spacing for section layouts). */
  className?: string;
  showArtistMeta?: boolean;
}) {
  const [active, setActive] = useState<VideoRow | null>(null);

  const sorted = useMemo(
    () => [...videos].sort((a, b) => a.sort_order - b.sort_order),
    [videos],
  );

  return (
    <>
      <div
        className={`mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className ?? ""}`}
      >
        {sorted.map((v) => {
          const thumb = videoThumbnailUrl(v.embed_url, v.thumbnail_path);
          const artistMeta = showArtistMeta
            ? [v.artist, formatPublishedDate(v.published_at)]
                .filter(Boolean)
                .join(" · ")
            : "";
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setActive(v)}
              className="group relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A] text-left transition hover:border-[#002400]/45"
            >
              <Image
                src={thumb}
                alt=""
                fill
                className="object-cover transition group-hover:opacity-90"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                aria-hidden
              />
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#002400]/80 bg-black/50 text-lg text-[#016b28] shadow-[0_0_24px_rgba(0,36,0,0.35)]">
                ▶
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="line-clamp-2 text-sm font-semibold text-white">
                  {v.title}
                </p>
                {artistMeta ? (
                  <p className="mt-1 line-clamp-2 text-xs text-[#A1A1AA]">
                    {artistMeta}
                  </p>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
      {active ? (
        <VideoModal video={active} onClose={() => setActive(null)} />
      ) : null}
    </>
  );
}
