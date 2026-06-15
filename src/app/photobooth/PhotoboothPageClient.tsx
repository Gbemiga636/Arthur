"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ParallaxBackground from "@/components/ParallaxBackground";
import FloatingParticles from "@/components/FloatingParticles";
import PhotoboothCapture from "@/components/PhotoboothCapture";
import HashtagSeal from "@/components/HashtagSeal";
import { EVENT_BRAND } from "@/lib/constants";

export default function PhotoboothPage() {
  return (
    <>
      <ParallaxBackground />
      <FloatingParticles />

      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gold/15">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <HashtagSeal size="sm" />
          </Link>
          <Link
            href="/"
            className="text-[10px] sm:text-xs tracking-[0.15em] uppercase text-cream/70 hover:text-gold-light font-[family-name:var(--font-cormorant)] border border-gold/20 px-3 py-1.5 rounded-full"
          >
            ← Invitation
          </Link>
        </div>
      </header>

      <main className="relative z-10 min-h-screen pt-20 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Celebration Photobooth
            </p>
            <h1 className="mt-4 text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-cream">
              Capture the{" "}
              <span className="text-gold-shimmer">Golden Moment</span>
            </h1>
            <p className="mt-4 text-cream/55 font-[family-name:var(--font-cormorant)] text-lg max-w-md mx-auto">
              Step into the {EVENT_BRAND} frame, snap your photo, and share a
              memory from this special evening.
            </p>
          </motion.div>
        </div>

        <PhotoboothCapture />
      </main>
    </>
  );
}
