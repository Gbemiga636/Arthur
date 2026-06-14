"use client";

import { motion } from "framer-motion";
import {
  HONOREE_FULL_NAME,
  HONOREE_FAMILY_NAME,
  HONOREE_GIVEN_NAME,
  EVENT_HASHTAG,
  EVENT_BRAND,
} from "@/lib/constants";
import { displayHonoreeName } from "@/lib/format-name";

export default function WelcomeHero() {
  const honoreeName = displayHonoreeName(HONOREE_FULL_NAME);
  const familyName = displayHonoreeName(HONOREE_FAMILY_NAME);
  const givenName = displayHonoreeName(HONOREE_GIVEN_NAME);

  return (
    <section id="welcome" className="relative pt-4 pb-12 md:pt-8 md:pb-20">
      <div className="max-w-3xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="section-label">Welcome</p>

          <h1 className="mt-5 font-[family-name:var(--font-playfair)] leading-none">
            <span className="hero-name block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-playfair)] font-extrabold gold-3d tracking-tight">
              {givenName}
            </span>
            <span className="flex items-center justify-center gap-2 sm:gap-4 mt-3 sm:mt-4">
              <span className="text-lg sm:text-xl md:text-2xl tracking-[0.45em] uppercase text-coffee-light font-[family-name:var(--font-cormorant)] font-light">
                At
              </span>
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold gold-3d tabular-nums">
                60
              </span>
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base font-[family-name:var(--font-playfair)] text-coffee tracking-wide">
            {honoreeName}
          </p>

          <p className="mt-2 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-gold font-[family-name:var(--font-cormorant)]">
            {EVENT_BRAND}
          </p>

          <p className="mt-3 text-sm sm:text-base hashtag-bold">{EVENT_HASHTAG}</p>

          <p className="mt-6 text-coffee-light/80 font-[family-name:var(--font-cormorant)] text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            A celebration of sixty years of life, faith, wisdom, and legacy —
            honored with elegance in Wayne, Michigan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-12 glass-cream rounded-2xl p-8 md:p-10 text-left border border-gold/20"
        >
          <p className="section-label section-label--wide mb-5">With a full heart, we welcome you</p>
          <p className="text-coffee/85 font-[family-name:var(--font-cormorant)] text-lg leading-[1.8]">
            Thank you for being part of this sacred milestone. Your presence is a
            gift, and we are genuinely excited to share this evening with you. As
            we reflect on sixty years of a life beautifully lived, we are deeply
            aware that every season — joyful and stretching alike — has been held
            together by grace, faith, and love.
          </p>
          <blockquote className="mt-6 pl-5 border-l-2 border-gold/45">
            <p className="text-coffee-light italic font-[family-name:var(--font-cormorant)] text-lg leading-relaxed">
              &ldquo;Join us for an evening of celebration, laughter, music, and
              thanksgiving as we honor this wonderful milestone.&rdquo;
            </p>
          </blockquote>
          <p className="mt-6 text-coffee-light/75 font-[family-name:var(--font-cormorant)] text-base leading-relaxed">
            This celebration has been thoughtfully curated to reflect the essence
            of who {honoreeName} is: a man of faith, wisdom, love, and enduring legacy.
            May we laugh freely, celebrate intentionally, and walk in gratitude
            for how far God has brought him.
          </p>
          <p className="mt-8 text-gold font-[family-name:var(--font-great-vibes)] text-2xl">
            With Love &amp; Gratitude
          </p>
          <p className="text-coffee-pale text-sm mt-1 font-[family-name:var(--font-cormorant)] tracking-wider">
            The {familyName} Family ·{" "}
            <span className="hashtag-bold text-xs sm:text-sm">{EVENT_HASHTAG}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
