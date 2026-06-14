"use client";

import { motion, AnimatePresence } from "framer-motion";
import { VolumeX } from "lucide-react";
import { useMusic } from "./MusicProvider";

export default function FloatingMusicButton() {
  const { isPlaying, stopMusic } = useMusic();

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={stopMusic}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-2.5 px-5 py-3 rounded-full border border-gold/45 text-cream shadow-[0_8px_32px_rgba(10,22,40,0.25)] hover:border-gold/70 hover:scale-[1.03] active:scale-[0.97] transition-all"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,27,62,0.96), rgba(10,22,40,0.96))",
          }}
          aria-label="Stop music"
        >
          <VolumeX className="w-4 h-4" />
          <span className="text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-cormorant)]">
            Stop Music
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
