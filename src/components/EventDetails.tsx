"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { HONOREE_FULL_NAME } from "@/lib/constants";
import { displayHonoreeName } from "@/lib/format-name";

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
            <p className="section-label mb-4">In Honor Of</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-playfair)] text-gold-shimmer leading-snug tracking-wide">
              {displayHonoreeName(HONOREE_FULL_NAME)}
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
            value="Wayne Tree Manor"
            sub="35100 Van Born Rd, Wayne, MI 48184"
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
            <p className="section-label mb-4">Special Message</p>
            <p className="text-cream/85 font-[family-name:var(--font-cormorant)] text-lg leading-[1.85]">
              Join us for an evening of celebration, laughter, music, and
              thanksgiving as we honor this wonderful milestone.
            </p>
            <p className="text-gold-light italic mt-4 font-[family-name:var(--font-cormorant)] text-xl">
              Your presence will make this occasion truly memorable.
            </p>
          </div>

          <div className="glass-gold rounded-2xl p-8 border border-gold/25 flex flex-col justify-center">
            <p className="section-label mb-4">60 Years of</p>
            <ul className="space-y-2">
              {["Faith", "Wisdom", "Love &", "Legacy"].map((item) => (
                <li
                  key={item}
                  className="text-2xl font-[family-name:var(--font-great-vibes)] text-gold-light"
                >
                  {item}
                </li>
              ))}
            </ul>
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
      <p className="section-label section-label--compact mb-2">{label}</p>
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
