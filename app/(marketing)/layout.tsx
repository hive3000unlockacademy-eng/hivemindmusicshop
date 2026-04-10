import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AudioProvider } from "@/components/player/audio-context";
import { MiniPlayer } from "@/components/player/mini-player";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AudioProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 pb-24">{children}</main>
        <SiteFooter />
        <MiniPlayer />
      </div>
    </AudioProvider>
  );
}
