"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  ExternalLink,
  Gift,
  Heart,
  Sparkles,
  Star,
} from "lucide-react";
import {
  EVENT_BRAND,
  GIFT_REGISTRY_TITLE,
  GIFT_REGISTRY_URL,
  HONOREE_FIRST_NAME,
} from "@/lib/constants";

const SENTIMENTS = [
  {
    icon: Heart,
    title: "Your Prayers",
    text: "Lift us in prayer as we mark this sacred milestone together in spirit.",
  },
  {
    icon: Star,
    title: "Your Love",
    text: "A message, a memory shared, or simply thinking of us means the world.",
  },
  {
    icon: Gift,
    title: "Your Gift",
    text: "Optional blessings through our celebration wishlist — never expected, always cherished.",
  },
] as const;

type GiftRegistrySectionProps = {
  compact?: boolean;
};

export default function GiftRegistrySection({
  compact = false,
}: GiftRegistrySectionProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(GIFT_REGISTRY_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  return (
    <section
      id="support"
      className={`relative px-4 sm:px-6 overflow-hidden ${
        compact ? "py-10 md:py-12" : "py-16 md:py-24"
      }`}
    >
      <div className="support-aurora" aria-hidden />
      <div className="support-spark support-spark--1" aria-hidden />
      <div className="support-spark support-spark--2" aria-hidden />
      <div className="support-spark support-spark--3" aria-hidden />

      <div className="max-w-5xl mx-auto relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="section-label inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Celebrate From Afar
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-playfair)] text-cream leading-tight">
            With Love,{" "}
            <span className="text-gold-shimmer">Near or Far</span>
          </h2>
          <p className="text-cream/55 mt-4 font-[family-name:var(--font-cormorant)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Unable to join us in person? Your presence in prayer, love, and
            encouragement still means everything as we honour {HONOREE_FIRST_NAME}
            &rsquo;s {EVENT_BRAND}.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-4 mb-10 md:mb-12">
          {SENTIMENTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="support-sentiment"
            >
              <div className="support-sentiment__icon">
                <item.icon className="w-4 h-4" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-cream text-base mt-3">
                {item.title}
              </h3>
              <p className="text-cream/50 text-sm mt-1.5 font-[family-name:var(--font-cormorant)] leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="support-portal"
        >
          <div className="support-portal__ribbon" aria-hidden>
            <span>Celebration Wishlist</span>
          </div>

          <div className="support-portal__inner">
            <div className="support-portal__glow" aria-hidden />

            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
              <div className="flex-1 text-center lg:text-left">
                <div className="support-portal__seal mx-auto lg:mx-0">
                  <Gift className="w-8 h-8 text-gold-light" />
                </div>
                <p className="mt-5 text-[10px] tracking-[0.3em] uppercase text-gold/75 font-[family-name:var(--font-cormorant)]">
                  MyRegistry · Official Wishlist
                </p>
                <h3 className="mt-2 text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-cream">
                  Bless {HONOREE_FIRST_NAME}&rsquo;s{" "}
                  <span className="text-gold-shimmer">Golden Chapter</span>
                </h3>
                <p className="mt-3 text-cream/55 font-[family-name:var(--font-cormorant)] text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                  Friends who cannot attend have asked how they may support this
                  celebration. Browse the curated wishlist and send a blessing
                  in whatever way feels right for you.
                </p>
              </div>

              <div className="support-portal__actions shrink-0 w-full lg:w-auto">
                <a
                  href={GIFT_REGISTRY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="support-portal__cta group"
                >
                  <span className="support-portal__cta-shine" aria-hidden />
                  <Gift className="w-4 h-4 relative z-[1]" />
                  <span className="relative z-[1]">Open Celebration Wishlist</span>
                  <ExternalLink className="w-3.5 h-3.5 relative z-[1] opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>

                <button
                  type="button"
                  onClick={copyLink}
                  className="support-portal__copy"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-gold-light" />
                      Link copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy wishlist link
                    </>
                  )}
                </button>

                <p className="support-portal__url" title={GIFT_REGISTRY_TITLE}>
                  myregistry.com · Akukalia Ikenna Ibegbu
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {!compact && (
          <p className="text-center mt-8 text-cream/35 text-xs font-[family-name:var(--font-cormorant)] tracking-wider max-w-lg mx-auto">
            Gifts are never expected — your love, prayers, and well-wishes are the
            greatest blessing of all.
          </p>
        )}
      </div>
    </section>
  );
}
