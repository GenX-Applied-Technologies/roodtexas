import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://redmouthco.vercel.app"; // [[FINAL DOMAIN]]

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Red Mouth Co. | Custom Gun Cerakote & Hydro-Dipping · Lubbock, TX",
    template: "%s | Red Mouth Co.",
  },
  description:
    "Red Mouth Co. personalizes firearms with custom Cerakote and hydro-dip finishes in Lubbock, Texas: solid colors, two-tone, camo, Aztec patterns, and battleworn. Drop-off or mail-in. Request a quote.",
  keywords: ["Cerakote Lubbock", "gun Cerakote", "hydro dipping Lubbock", "custom gun finish", "Red Mouth Co."],
  openGraph: {
    title: "Red Mouth Co. — Speak Softly. Carry Fire.",
    description: "Custom Cerakote and hydro-dip finishes. Lubbock, Texas.",
    url: SITE_URL,
    siteName: "Red Mouth Co.",
    images: [{ url: "/brand/og.jpg", width: 1200, height: 820, alt: "Red Cerakote AR build by Red Mouth Co." }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Red Mouth Co.", images: ["/brand/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0b0909",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
