import type { Metadata, Viewport } from "next";
import { DM_Sans, Orbitron, Space_Grotesk } from "next/font/google";
import { BRAND, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo/site";
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
    default: `${BRAND} — ${SITE_NAME}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Premium beats, licensing, and producer tools from HiveMind Productions — melodic trap, drill, and modern Hip Hop/R&B instrumentals.",
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: BRAND, url: SITE_URL }],
  creator: BRAND,
  publisher: BRAND,
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${BRAND} — ${SITE_NAME}`,
    description:
      "Premium beats and clear licensing from HiveMind Productions. Preview tracks, choose a license tier, and buy with confidence.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${BRAND} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND} — ${SITE_NAME}`,
    description:
      "Premium beats and clear licensing from HiveMind Productions.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
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
