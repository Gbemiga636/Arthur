"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen, X } from "lucide-react";
import { useMusic } from "./MusicProvider";
import HashtagSeal from "@/components/HashtagSeal";
import { HONOREE_FULL_NAME } from "@/lib/constants";

export default function EnvelopeSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inviteLoaded, setInviteLoaded] = useState(false);
  const wasOpenRef = useRef(false);
  const { playMusic, stopMusic } = useMusic();

  useEffect(() => {
    const img = new window.Image();
    img.src = "/invite.jpeg";
    img.onload = () => setInviteLoaded(true);
  }, []);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      stopMusic();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, stopMusic]);

  const handleOpen = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    playMusic();
    setIsOpen(true);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handleClose = () => {
    setIsOpen(false);
    stopMusic();
  };

  return (
    <section id="invitation" className="relative px-6 pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="section-label">Private Invitation</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-[family-name:var(--font-playfair)] text-cream">
            Your Formal Invite
          </h2>
          <p className="text-cream/45 mt-2 font-[family-name:var(--font-cormorant)] italic">
            Tap the envelope to reveal the invitation card
          </p>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="invitation-reveal"
              initial={{ opacity: 1, rotate: 0, scale: 0.94 }}
              animate={{ opacity: 1, rotate: 360, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                rotate: { duration: 1.15, ease: [0.45, 0, 0.2, 1] },
                scale: { duration: 1.15, ease: [0.45, 0, 0.2, 1] },
                opacity: { duration: 0.25 },
              }}
              className="relative mb-10 flex flex-col items-center"
            >
              <div className="absolute -inset-4 bg-gradient-to-b from-gold/12 via-gold/4 to-transparent rounded-2xl blur-xl pointer-events-none" />

              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gold/30 bg-[#f0e8d8]">
                {inviteLoaded ? (
                  <Image
                    src="/invite.jpeg"
                    alt={`60th Birthday Invitation for ${HONOREE_FULL_NAME}`}
                    width={600}
                    height={800}
                    priority
                    className="w-full h-auto block"
                  />
                ) : (
                  <div className="aspect-[3/4] flex items-center justify-center bg-gradient-to-b from-[#faf6ef] to-[#f0e8d8]">
                    <p className="text-navy/40 text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-cormorant)]">
                      Loading invite...
                    </p>
                  </div>
                )}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                onClick={handleClose}
                className="mt-5 flex items-center gap-2 px-5 py-2 rounded-full border border-gold/30 text-cream/60 hover:text-gold-light hover:border-gold/50 text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-cormorant)] transition-all"
              >
                <X className="w-4 h-4" />
                Close Invitation
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isOpen && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              <div
                className="relative cursor-pointer group"
                onClick={handleOpen}
                style={{ perspective: "1200px" }}
              >
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-black/40 blur-2xl rounded-full" />

                <motion.div
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="relative w-72 md:w-96"
                >
                  <div
                    className="relative h-52 md:h-60 rounded-xl overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(160deg, #1e3568 0%, #0d1b3e 45%, #0a1628 100%)",
                      boxShadow:
                        "0 30px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(232,197,71,0.25)",
                    }}
                  >
                    <div className="absolute inset-x-4 top-3 bottom-4 rounded-lg bg-cream/10 border border-cream/5" />
                    <div className="absolute inset-0 rounded-xl border border-gold/35" />

                    <div
                      className="absolute bottom-0 left-0 w-1/2 h-[70%]"
                      style={{
                        background: "linear-gradient(135deg, #0a1628, #122244)",
                        clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-1/2 h-[70%]"
                      style={{
                        background: "linear-gradient(225deg, #0a1628, #122244)",
                        clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                      }}
                    />

                    <motion.div
                      className="absolute top-0 inset-x-0 z-20"
                      style={{
                        height: "58%",
                        transformOrigin: "top center",
                        background: "linear-gradient(180deg, #243c72, #0d1b3e)",
                        clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                        borderBottom: "1px solid rgba(201,162,39,0.2)",
                      }}
                      animate={
                        isAnimating
                          ? { rotateX: -160, opacity: 0.3 }
                          : { rotateX: 0, opacity: 1 }
                      }
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                    />

                    <motion.div
                      className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                      animate={
                        isAnimating
                          ? { scale: 0, opacity: 0 }
                          : { scale: 1, opacity: 1 }
                      }
                      transition={{ duration: 0.25 }}
                    >
                      <HashtagSeal size="lg" />
                    </motion.div>

                    <motion.div
                      className="absolute left-5 right-5 top-5 bottom-6 rounded-md z-10 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(180deg, #faf6ef, #f0e8d8)",
                        boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
                      }}
                      animate={
                        isAnimating
                          ? { y: -180, opacity: 1 }
                          : { y: 10, opacity: 0.9 }
                      }
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                    >
                      <div className="text-center px-4">
                        <p className="text-navy/50 text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-cormorant)]">
                          Sealed With Love
                        </p>
                        <p className="text-gold/80 text-base font-[family-name:var(--font-great-vibes)] mt-1">
                          Open to Reveal
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(201,162,39,0.25)" }}
                whileTap={{ scale: 0.96 }}
                className="mt-10 flex items-center gap-3 px-10 py-3.5 rounded-full border border-gold/45 text-gold-light tracking-[0.25em] uppercase text-xs font-[family-name:var(--font-cormorant)] transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(201,162,39,0.18), rgba(201,162,39,0.06))",
                }}
              >
                <MailOpen className="w-4 h-4" />
                Open Envelope
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-cream/30 text-xs font-[family-name:var(--font-cormorant)] mt-2"
          >
            Scroll down to explore the celebration details
          </motion.p>
        )}
      </div>
    </section>
  );
}
