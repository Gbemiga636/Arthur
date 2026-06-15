"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ParallaxBackground from "@/components/ParallaxBackground";
import FloatingParticles from "@/components/FloatingParticles";
import Header from "@/components/Header";
import { MusicProvider } from "@/components/MusicProvider";
import FloatingMusicButton from "@/components/FloatingMusicButton";
import { EVENT_BRAND, EVENT_HASHTAG, HONOREE_FULL_NAME } from "@/lib/constants";
import { displayHonoreeName } from "@/lib/format-name";

type SectionPageShellProps = {
  children: React.ReactNode;
  withMusic?: boolean;
  crumb: string;
};

function ShellInner({
  children,
  crumb,
  withMusic,
}: SectionPageShellProps) {
  return (
    <>
      <ParallaxBackground />
      <FloatingParticles />
      <Header />
      {withMusic && <FloatingMusicButton />}

      <main className="relative z-10 pt-[var(--header-offset)] pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-2">
          <nav
            className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-[family-name:var(--font-cormorant)] tracking-[0.15em] uppercase"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-cream/45 hover:text-gold-light transition-colors">
              Home
            </Link>
            <span className="text-cream/25">/</span>
            <span className="text-gold/80">{crumb}</span>
          </nav>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>

        <footer className="text-center mt-12 px-6 pb-8">
          <div className="ornament-divider max-w-xs mx-auto mb-4">
            <span className="text-gold text-sm font-[family-name:var(--font-playfair)]">
              {EVENT_BRAND}
            </span>
          </div>
          <p className="text-cream/35 text-xs font-[family-name:var(--font-cormorant)] tracking-[0.15em]">
            {displayHonoreeName(HONOREE_FULL_NAME)} · August 22, 2026
          </p>
          <p className="hashtag-bold text-sm mt-2">{EVENT_HASHTAG}</p>
        </footer>
      </main>
    </>
  );
}

export default function SectionPageShell({
  children,
  withMusic = false,
  crumb,
}: SectionPageShellProps) {
  if (withMusic) {
    return (
      <MusicProvider>
        <ShellInner withMusic crumb={crumb}>
          {children}
        </ShellInner>
      </MusicProvider>
    );
  }

  return (
    <ShellInner withMusic={false} crumb={crumb}>
      {children}
    </ShellInner>
  );
}
