import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { HONOREE_FULL_NAME } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: `60th Birthday Celebration | ${HONOREE_FULL_NAME}`,
  description: `You're cordially invited to celebrate the 60th birthday of ${HONOREE_FULL_NAME}. Saturday, August 22nd, 2026 at Wayne Tree Manor, Wayne, MI.`,
  openGraph: {
    title: `60th Birthday Celebration — ${HONOREE_FULL_NAME}`,
    description: "Join us for an evening of celebration, laughter, music, and thanksgiving.",
    images: ["/invite.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-cormorant)]">
        {children}
      </body>
    </html>
  );
}
