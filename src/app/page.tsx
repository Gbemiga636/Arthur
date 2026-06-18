"use client";

import Header from "@/components/Header";
import ParallaxBackground from "@/components/ParallaxBackground";
import FloatingParticles from "@/components/FloatingParticles";
import WelcomeHero from "@/components/WelcomeHero";
import QuickInfoStrip from "@/components/QuickInfoStrip";
import EnvelopeSection from "@/components/EnvelopeSection";
import GalleryTeaser from "@/components/MemoryGallery";
import CountdownTimer from "@/components/CountdownTimer";
import RSVPForm from "@/components/RSVPForm";
import HotelReservation from "@/components/HotelReservation";
import FAQSection from "@/components/FAQSection";
import PhotoboothPromo from "@/components/PhotoboothPromo";
import { MusicProvider } from "@/components/MusicProvider";
import FloatingMusicButton from "@/components/FloatingMusicButton";
import { HONOREE_FULL_NAME, EVENT_HASHTAG, EVENT_BRAND } from "@/lib/constants";
import { displayHonoreeName } from "@/lib/format-name";

export default function HomePage() {
  return (
    <MusicProvider>
      <ParallaxBackground />
      <FloatingParticles />
      <Header />
      <FloatingMusicButton />

      <main className="relative z-10 pt-[var(--header-offset)] pb-16">
        <WelcomeHero />
        <EnvelopeSection />
        <QuickInfoStrip />
        <GalleryTeaser />
        <RSVPForm />
        <CountdownTimer />
        <HotelReservation />
        <PhotoboothPromo />
        <FAQSection />

        <footer className="text-center mt-8 px-6 pb-8">
          <div className="ornament-divider max-w-xs mx-auto mb-5">
            <span className="text-gold text-sm font-[family-name:var(--font-playfair)]">{EVENT_BRAND}</span>
          </div>
          <p className="text-cream/35 text-xs font-[family-name:var(--font-cormorant)] tracking-[0.15em]">
            {displayHonoreeName(HONOREE_FULL_NAME)} · August 22, 2026
          </p>
          <p className="hashtag-bold text-sm mt-3">
            {EVENT_HASHTAG}
          </p>
          <p className="text-cream/20 text-[11px] mt-2 font-[family-name:var(--font-cormorant)]">
            Luxury invitation experience — crafted with love
          </p>
        </footer>
      </main>
    </MusicProvider>
  );
}
