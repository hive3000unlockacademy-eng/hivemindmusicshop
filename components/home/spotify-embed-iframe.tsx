"use client";

import { useEffect, useState } from "react";

type Props = {
  title: string;
  embedSrc: string;
};

/**
 * Spotify embeds only receive a `src` after mount so the iframe is never
 * affected by SSR/hydration quirks; blank black boxes are often fixed by
 * pairing this with permissive iframe `referrerPolicy` + Permissions-Policy.
 */
export function SpotifyEmbedIframe({ title, embedSrc }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(embedSrc);
  }, [embedSrc]);

  return (
    <div className="min-h-[152px] w-full shrink-0 overflow-hidden rounded-xl bg-[#121212]">
      {src ? (
        <iframe
          title={title}
          src={src}
          width="100%"
          height={152}
          className="block w-full border-0"
          style={{ borderRadius: 12 }}
          loading="eager"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="no-referrer"
        />
      ) : (
        <div
          className="flex h-[152px] w-full items-center justify-center bg-[#121212] text-xs text-[#71717A]"
          aria-hidden
        >
          Loading player…
        </div>
      )}
    </div>
  );
}
