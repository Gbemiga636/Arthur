"use client";

import Image from "next/image";

export default function ParallaxBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Solid base */}
      <div className="absolute inset-0 bg-[#0a1628]" />

      {/* Arthur portrait — fixed, no scroll movement */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-3xl mx-auto opacity-[0.18]">
          <Image
            src="/arthur.png"
            alt=""
            fill
            className="object-contain object-center"
            priority
            quality={90}
            aria-hidden
          />
        </div>
      </div>

      {/* Semi-transparent scrim — lighter so portrait reads clearer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070f1c]/80 via-[#0a1628]/72 to-[#060d18]/82" />

      {/* Soft gold ambient glow — fixed */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-15 blur-[120px]"
        style={{
          background: "radial-gradient(ellipse, rgba(201,162,39,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Gentle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(6,13,24,0.5)_100%)]" />

      {/* Fine grain */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
