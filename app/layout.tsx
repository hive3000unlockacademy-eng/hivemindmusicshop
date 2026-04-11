import type { Metadata } from "next";
import { DM_Sans, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const orbitron = Orbitron({
  variable: "--font-beats-hero",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "HiveMind — HiveMindMusic.Shop",
    template: "%s · HiveMindMusic.Shop",
  },
  description:
    "Premium beats, licensing, and producer tools from HiveMind Productions.",
  metadataBase: new URL("https://hivemindmusic.shop"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${orbitron.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-white">{children}</body>
    </html>
  );
}
