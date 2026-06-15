"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionPageShell from "@/components/SectionPageShell";
import PhotoboothCapture from "@/components/PhotoboothCapture";
import { EVENT_BRAND } from "@/lib/constants";

export default function PhotoboothPage() {
  return (
    <SectionPageShell crumb="Photobooth">
      <div className="max-w-2xl mx-auto text-center mb-10 px-6">
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
    </SectionPageShell>
  );
}
