"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Camera } from "lucide-react";
import { EVENT_BRAND } from "@/lib/constants";

export default function PhotoboothPromo() {
  return (
    <section className="px-6 py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto glass-cream rounded-2xl p-8 md:p-10 text-center border border-gold/20"
      >
        <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-gold/35 flex items-center justify-center bg-gold/10">
          <Camera className="w-7 h-7 text-gold-light" />
        </div>
        <p className="section-label">Celebration Photobooth</p>
        <h2 className="mt-4 text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-cream">
          Snap a Photo at {EVENT_BRAND}
        </h2>
        <p className="mt-3 text-cream/55 font-[family-name:var(--font-cormorant)] text-lg max-w-md mx-auto">
          Capture your golden moment in our elegant event frame — upload instantly
          and take home a memory from the celebration.
        </p>
        <Link
          href="/photobooth"
          className="inline-flex mt-7 px-8 py-3.5 rounded-full items-center gap-2 text-navy-deep font-[family-name:var(--font-cormorant)] tracking-[0.2em] uppercase text-sm transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #c9a227 0%, #e8c547 50%, #c9a227 100%)",
            boxShadow: "0 4px 20px rgba(201,162,39,0.35)",
          }}
        >
          <Camera className="w-4 h-4" />
          Open Photobooth
        </Link>
      </motion.div>
    </section>
  );
}
