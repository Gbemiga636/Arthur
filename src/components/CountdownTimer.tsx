"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-08-22T19:00:00-04:00");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) {
    return { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  return {
    weeks: Math.floor(diff / (1000 * 60 * 60 * 24 * 7)),
    days: Math.floor((diff / (1000 * 60 * 60 * 24)) % 7),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

type TimeLeft = ReturnType<typeof getTimeLeft>;

const PLACEHOLDER: TimeLeft = {
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  done: false,
};

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const display = time ?? PLACEHOLDER;

  const units = [
    { label: "Weeks", value: display.weeks },
    { label: "Days", value: display.days },
    { label: "Hours", value: display.hours },
    { label: "Minutes", value: display.minutes },
    { label: "Seconds", value: display.seconds },
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <p className="section-label">Countdown</p>
        <h2 className="mt-3 text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-cream mb-2">
          Until August 22, 2026
        </h2>
        <p className="text-cream/40 text-sm font-[family-name:var(--font-cormorant)] mb-8">
          Wayne Tree Manor · Wayne, Michigan
        </p>

        {display.done ? (
          <p className="text-gold-light text-xl font-[family-name:var(--font-great-vibes)]">
            The celebration is here!
          </p>
        ) : (
          <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
            {units.map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-xl w-[72px] md:w-20 py-4 border border-gold/15"
              >
                <p
                  className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-playfair)] text-gold-light tabular-nums"
                  suppressHydrationWarning
                >
                  {time === null ? "--" : String(unit.value).padStart(2, "0")}
                </p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-cream/40 mt-1 font-[family-name:var(--font-cormorant)]">
                  {unit.label}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
