"use client";

import Image from "next/image";

export default function ParallaxBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Warm ivory base with subtle navy wash at edges */}
      <div className="absolute inset-0 bg-ivory" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/[0.07] via-transparent to-navy-deep/[0.09]" />

      {/* Arthur portrait — visible but soft behind content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-[min(92vh,900px)] max-w-2xl md:max-w-3xl mx-auto opacity-[0.38] md:opacity-[0.44]">
          <Image
            src="/arthur.png"
            alt=""
            fill
            className="object-contain object-center mix-blend-multiply"
            priority
            quality={90}
            aria-hidden
          />
        </div>
      </div>

      {/* Light scrim — lets portrait show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/55 via-ivory/25 to-ivory-warm/65" />

      {/* Gold + navy ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,162,39,0.2) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-20 blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(30,53,104,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(249,246,240,0.55)_100%)]" />
    </div>
  );
}
