"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, BookOpen, Heart, Crown } from "lucide-react";
import { HONOREE_FULL_NAME, EVENT_VENUE_NAME, EVENT_VENUE_ADDRESS } from "@/lib/constants";

const VIRTUES = [
  { word: "Faith", icon: Sparkles, delay: 0 },
  { word: "Wisdom", icon: BookOpen, delay: 0.08 },
  { word: "Love &", icon: Heart, delay: 0.16 },
  { word: "Legacy", icon: Crown, delay: 0.24 },
] as const;

export default function EventDetails() {
  return (
    <section id="details" className="relative px-6 py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label">Celebration Details</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-cream">
            An Evening Worthy of{" "}
            <span className="text-gold-shimmer">Six Decades</span>
          </h2>
        </div>

        {/* Honoree banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/8 to-transparent rounded-2xl" />
          <div className="relative glass-cream rounded-2xl py-10 px-8 border border-gold/20">
            <p className="text-gold/70 text-xs tracking-[0.35em] uppercase font-[family-name:var(--font-cormorant)] mb-3">
              In Honor Of
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-playfair)] text-gold-shimmer leading-snug tracking-wide">
              {HONOREE_FULL_NAME}
            </h3>
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="text-6xl md:text-7xl font-bold gold-3d font-[family-name:var(--font-playfair)]">
                60
              </span>
              <div className="text-left">
                <p className="text-2xl font-[family-name:var(--font-great-vibes)] text-gold-light">
                  Birthday
                </p>
                <p className="text-gold/80 tracking-[0.3em] uppercase text-xs font-[family-name:var(--font-cormorant)]">
                  Celebration
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detail cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          <DetailCard
            icon={<Calendar className="w-6 h-6" />}
            label="Date"
            value="Saturday, August 22nd, 2026"
            delay={0}
          />
          <DetailCard
            icon={<Clock className="w-6 h-6" />}
            label="Time"
            value="7:00 PM till 1:00 AM"
            delay={0.1}
          />
          <DetailCard
            icon={<MapPin className="w-6 h-6" />}
            label="Venue"
            value={EVENT_VENUE_NAME}
            sub={EVENT_VENUE_ADDRESS}
            delay={0.2}
          />
        </div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="glass rounded-2xl p-8 border border-gold/15">
            <p className="text-gold/60 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-cormorant)] mb-4">
              Special Message
            </p>
            <p className="text-cream/85 font-[family-name:var(--font-cormorant)] text-lg leading-[1.85]">
              Join us for an evening of celebration, laughter, music, and
              thanksgiving as we honor this wonderful milestone.
            </p>
            <p className="text-gold-light italic mt-4 font-[family-name:var(--font-cormorant)] text-xl">
              Your presence will make this occasion truly memorable.
            </p>
          </div>

          <div className="virtues-pillar relative overflow-hidden rounded-2xl border border-gold/30 p-6 sm:p-8 min-h-[280px] flex flex-col justify-center">
            <div className="virtues-pillar__glow" aria-hidden />
            <p className="relative z-10 text-gold/70 text-xs tracking-[0.35em] uppercase font-[family-name:var(--font-cormorant)] text-center mb-5">
              60 Years of
            </p>

            <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
              {VIRTUES.map(({ word, icon: Icon, delay }) => (
                <motion.div
                  key={word}
                  initial={{ opacity: 0, y: 18, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className="virtues-pillar__card group"
                >
                  <span className="virtues-pillar__icon">
                    <Icon className="w-4 h-4 text-gold" />
                  </span>
                  <p className="virtues-pillar__word font-[family-name:var(--font-playfair)]">
                    {word}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative z-10 text-center mt-5 text-[10px] tracking-[0.25em] uppercase text-cream/40 font-[family-name:var(--font-cormorant)]"
            >
              A life beautifully lived
            </motion.p>
          </div>
        </motion.div>

        {/* RSVP notice + closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-7 py-3 rounded-full glass border border-gold/35">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <p className="text-gold-light tracking-[0.2em] uppercase text-xs font-[family-name:var(--font-cormorant)]">
              This event requires advanced RSVP
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          </div>

          <div className="ornament-divider max-w-sm mx-auto">
            <span className="text-gold">✦</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-gold-shimmer">
            We Look Forward to Celebrating With You!
          </h3>
        </motion.div>
      </div>
    </section>
  );
}

function DetailCard({
  icon,
  label,
  value,
  sub,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass rounded-xl p-6 text-center hover:border-gold/35 transition-colors border border-gold/10 group"
    >
      <div className="text-gold/70 group-hover:text-gold transition-colors flex justify-center mb-3">
        {icon}
      </div>
      <p className="text-[10px] tracking-[0.25em] uppercase text-gold/60 font-[family-name:var(--font-cormorant)] mb-2">
        {label}
      </p>
      <p className="text-cream font-[family-name:var(--font-cormorant)] text-lg leading-snug">
        {value}
      </p>
      {sub && (
        <p className="text-cream/45 text-sm mt-1.5 font-[family-name:var(--font-cormorant)]">
          {sub}
        </p>
      )}
    </motion.div>
  );
}
