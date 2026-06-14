"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { EVENT_BRAND, EVENT_VENUE_NAME, EVENT_VENUE_ADDRESS } from "@/lib/constants";

const items = [
  {
    icon: Calendar,
    label: "Date",
    value: "August 22, 2026",
    sub: "Saturday Evening",
  },
  {
    icon: Clock,
    label: "Time",
    value: "7:00 PM – 1:00 AM",
    sub: "An Evening of Elegance",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: EVENT_VENUE_NAME,
    sub: EVENT_VENUE_ADDRESS,
  },
  {
    icon: Sparkles,
    label: "Occasion",
    value: EVENT_BRAND,
    sub: "Sixty & Sacred",
  },
];

export default function QuickInfoStrip() {
  return (
    <section className="px-6 pb-12">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4 md:p-5 text-center group hover:border-gold/40 transition-all border border-gold/10"
          >
            <item.icon className="w-5 h-5 text-gold/70 mx-auto mb-2 group-hover:text-gold transition-colors" />
            <p className="text-[10px] tracking-[0.25em] uppercase text-gold/60 font-[family-name:var(--font-cormorant)]">
              {item.label}
            </p>
            <p className="text-cream font-[family-name:var(--font-cormorant)] text-base md:text-lg mt-1 leading-tight">
              {item.value}
            </p>
            <p className="text-cream/40 text-xs mt-1 font-[family-name:var(--font-cormorant)]">
              {item.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
