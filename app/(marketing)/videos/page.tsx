import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { VideoGridClient } from "@/components/videos/video-grid-client";
import { getVideos } from "@/lib/data/videos";

export const metadata: Metadata = {
  title: "Videos",
  description: "Music videos, tutorials, and placements from HiveMind.",
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="py-16">
      <Container>
        <h1 className="font-[family-name:var(--font-beats-hero)] text-4xl font-semibold tracking-tight text-white">
          Videos
        </h1>
        <p className="mt-4 max-w-2xl text-[#A1A1AA]">
          Placements, tutorials, and behind-the-scenes. Tap a tile to play.
        </p>
        {videos.length === 0 ? (
          <p className="mt-10 text-[#A1A1AA]">No videos yet — check back soon.</p>
        ) : (
          <VideoGridClient videos={videos} />
        )}
      </Container>
    </div>
  );
}
