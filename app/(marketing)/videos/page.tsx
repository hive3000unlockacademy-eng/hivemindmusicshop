import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { VideoGridClient } from "@/components/videos/video-grid-client";
import { getVideos, groupVideosBySection } from "@/lib/data/videos";
import { VIDEO_PAGE_SECTIONS } from "@/lib/videos/sections";

export const metadata: Metadata = {
  title: "Videos",
  description: "Music videos, podcasts, and more from HiveMind.",
};

export default async function VideosPage() {
  const videos = await getVideos();
  const bySection = groupVideosBySection(videos);

  return (
    <div className="py-16">
      <Container>
        <h1 className="font-[family-name:var(--font-beats-hero)] text-4xl font-semibold tracking-tight text-white">
          Videos
        </h1>
        <p className="mt-4 max-w-2xl text-[#A1A1AA]">
          Artist videos, podcasts, and more—organized by category. Tap a tile to
          play.
        </p>
        <div className="mt-12 space-y-14">
          {VIDEO_PAGE_SECTIONS.map((section) => {
            const list = bySection.get(section.slug) ?? [];
            return (
              <section
                key={section.slug}
                aria-labelledby={`videos-section-${section.slug}`}
              >
                <h2
                  id={`videos-section-${section.slug}`}
                  className="font-[family-name:var(--font-beats-hero)] text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  {section.title}
                </h2>
                {list.length === 0 ? (
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#A1A1AA]">
                    {section.emptyMessage}
                  </p>
                ) : (
                  <VideoGridClient videos={list} />
                )}
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
