"use client";

import { motion } from "framer-motion";

/** Deterministic positions — avoids hydration mismatch from Math.random() */
const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: ((i * 17 + 13) % 97) + 1,
  y: ((i * 23 + 7) % 93) + 2,
  size: 2 + (i % 5) * 0.8,
  delay: (i % 8) * 0.6,
  duration: 3 + (i % 5) * 0.8,
}));

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? "rgba(184, 134, 11, 0.45)"
                : p.id % 3 === 1
                  ? "rgba(139, 115, 85, 0.35)"
                  : "rgba(201, 162, 39, 0.25)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
