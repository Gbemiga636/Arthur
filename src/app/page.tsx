"use client";

import Header from "@/components/Header";
import ParallaxBackground from "@/components/ParallaxBackground";
import FloatingParticles from "@/components/FloatingParticles";
import WelcomeHero from "@/components/WelcomeHero";
import QuickInfoStrip from "@/components/QuickInfoStrip";
import EnvelopeSection from "@/components/EnvelopeSection";
import EventDetails from "@/components/EventDetails";
import CountdownTimer from "@/components/CountdownTimer";
import RSVPForm from "@/components/RSVPForm";
import HotelReservation from "@/components/HotelReservation";
import FAQSection from "@/components/FAQSection";
import { MusicProvider } from "@/components/MusicProvider";
import FloatingMusicButton from "@/components/FloatingMusicButton";
import { HONOREE_FULL_NAME, EVENT_HASHTAG } from "@/lib/constants";

export default function HomePage() {
  return (
    <MusicProvider>
      <ParallaxBackground />
      <FloatingParticles />
      <Header />
      <FloatingMusicButton />

      <main className="relative z-10 pt-[var(--header-offset)] lg:pt-20 pb-16">
        <EnvelopeSection />
        <WelcomeHero />
        <QuickInfoStrip />
        <EventDetails />
        <RSVPForm />
        <CountdownTimer />
        <HotelReservation />
        <FAQSection />

        <footer className="text-center mt-8 px-6 pb-8">
          <div className="ornament-divider max-w-xs mx-auto mb-5">
            <span className="text-gold text-sm font-[family-name:var(--font-playfair)]">A60</span>
          </div>
          <p className="text-cream/35 text-xs font-[family-name:var(--font-cormorant)] tracking-[0.15em]">
            {HONOREE_FULL_NAME} · 60th Birthday · August 22, 2026
          </p>
          <p className="text-gold/50 text-sm mt-3 font-[family-name:var(--font-great-vibes)]">
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
