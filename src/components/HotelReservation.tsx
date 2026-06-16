"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BedDouble,
  MapPin,
  ExternalLink,
  CalendarCheck,
  Key,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { EVENT_BRAND, EVENT_HASHTAG, HONOREE_FIRST_NAME } from "@/lib/constants";
import { MARRIOTT_HOTEL, SKYLINE_HOTEL } from "@/lib/hotels";

type HotelId = "marriott" | "skyline";

const HOTEL_TABS: { id: HotelId; label: string; sub: string }[] = [
  { id: "marriott", label: "Fairfield by Marriott", sub: "hotel" },
  { id: "skyline", label: "Skyline", sub: "hotel" },
];

export default function HotelReservation() {
  const [active, setActive] = useState<HotelId>("marriott");

  return (
    <section id="hotel" className="relative px-6 py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="section-label">Travel &amp; Stay</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-cream">
            Hotel Accommodations
          </h2>
          <p className="text-cream/50 mt-3 font-[family-name:var(--font-cormorant)] italic text-lg max-w-xl mx-auto">
            Two hand-picked options for out-of-town guests — choose the stay that
            suits you best for {EVENT_BRAND}.
          </p>
        </div>

        {/* Hotel picker */}
        <div className="hotel-picker mb-8">
          {HOTEL_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`hotel-picker__tab ${active === tab.id ? "hotel-picker__tab--active" : ""}`}
            >
              <span className="hotel-picker__tab-label">{tab.label}</span>
              <span className="hotel-picker__tab-sub">{tab.sub}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active === "marriott" ? (
            <MarriottPanel key="marriott" />
          ) : (
            <SkylinePanel key="skyline" />
          )}
        </AnimatePresence>

        <p className="text-center text-cream/30 text-xs mt-8 font-[family-name:var(--font-cormorant)] tracking-wider">
          {EVENT_HASHTAG}
        </p>
      </div>
    </section>
  );
}

function MarriottPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div className="absolute -inset-4 bg-gradient-to-b from-gold/10 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative glass-cream rounded-2xl overflow-hidden border border-gold/25">
        <div className="h-1.5 bg-gradient-to-r from-navy via-gold to-navy" />

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <HotelIconBadge icon={<BedDouble className="w-9 h-9 text-gold-light" />} />

            <div className="flex-1 text-center md:text-left">
              <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-cormorant)] mb-2">
                {MARRIOTT_HOTEL.tagline}
              </p>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-cream mb-2 leading-snug">
                {MARRIOTT_HOTEL.name}
              </h3>
              <p className="text-cream/55 text-sm font-[family-name:var(--font-cormorant)] flex items-center gap-1.5 justify-center md:justify-start mb-5">
                <MapPin className="w-3.5 h-3.5 text-gold/70 shrink-0" />
                {MARRIOTT_HOTEL.address}, {MARRIOTT_HOTEL.city}
              </p>
              <p className="text-cream/70 font-[family-name:var(--font-cormorant)] text-lg leading-relaxed mb-6">
                A special Fairfield by Marriott group rate for celebration guests.
                Book online for the {EVENT_BRAND} weekend — August 22, 2026.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <DetailPill
                  icon={<CalendarCheck className="w-4 h-4" />}
                  label="Event Weekend"
                  value={MARRIOTT_HOTEL.eventDate}
                />
                <DetailPill
                  icon={<Key className="w-4 h-4" />}
                  label="Booking Type"
                  value={`Group Rate — ${HONOREE_FIRST_NAME} 60th`}
                />
                <DetailPill
                  icon={<Building2 className="w-4 h-4" />}
                  label="Hotel Brand"
                  value={MARRIOTT_HOTEL.provider}
                />
              </div>

              <a
                href={MARRIOTT_HOTEL.bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-navy-deep font-[family-name:var(--font-cormorant)] tracking-[0.2em] uppercase text-sm transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(201,162,39,0.35)]"
                style={{
                  background:
                    "linear-gradient(135deg, #c9a227 0%, #e8c547 50%, #c9a227 100%)",
                }}
              >
                Reserve Your Room
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-cream/35 text-xs mt-4 font-[family-name:var(--font-cormorant)]">
                Redirects to Marriott&apos;s secure reservation page.
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-4 bg-navy/40 border-t border-gold/15">
          <p className="text-cream/45 text-sm font-[family-name:var(--font-cormorant)] text-center md:text-left">
            <span className="text-gold/70">Tip:</span> Book early — group blocks fill
            quickly during event weekends.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SkylinePanel() {
  const { coordinator } = SKYLINE_HOTEL;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div className="absolute -inset-4 bg-gradient-to-br from-gold/8 via-transparent to-navy/20 rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative skyline-hotel-card rounded-2xl overflow-hidden border border-gold/30">
        <div className="skyline-hotel-card__header px-6 py-5 md:px-8 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-gold/80 text-[10px] tracking-[0.35em] uppercase font-[family-name:var(--font-cormorant)] mb-1 flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Group Block — {SKYLINE_HOTEL.groupName}
            </p>
            <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-cream">
              {SKYLINE_HOTEL.name}
            </h3>
            <p className="text-cream/55 text-sm mt-1 font-[family-name:var(--font-cormorant)] flex items-center gap-1.5 justify-center sm:justify-start">
              <MapPin className="w-3.5 h-3.5 text-gold/70 shrink-0" />
              {SKYLINE_HOTEL.address}, {SKYLINE_HOTEL.city}
            </p>
          </div>
          <div className="skyline-hotel-card__badge text-center sm:text-right shrink-0">
            <p className="text-[10px] tracking-[0.2em] uppercase text-cream/45 font-[family-name:var(--font-cormorant)]">
              From
            </p>
            <p className="text-3xl font-[family-name:var(--font-playfair)] text-gold-shimmer leading-none">
              $99
            </p>
            <p className="text-[10px] text-cream/40 font-[family-name:var(--font-cormorant)]">
              + tax / night
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6 bg-navy-deep/40">
          {/* Room rates */}
          <div>
            <p className="text-gold/60 text-xs tracking-[0.28em] uppercase font-[family-name:var(--font-cormorant)] mb-3">
              Room Options
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {SKYLINE_HOTEL.rooms.map((room) => (
                <div key={room.label} className="skyline-room-tile">
                  <BedDouble className="w-5 h-5 text-gold mb-2" />
                  <p className="text-cream font-[family-name:var(--font-cormorant)] text-base">
                    {room.label}
                  </p>
                  <p className="text-gold-light text-sm font-[family-name:var(--font-playfair)] mt-1">
                    {room.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline strip */}
          <div className="skyline-timeline">
            <div className="skyline-timeline__item">
              <CalendarCheck className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold/50 font-[family-name:var(--font-cormorant)]">
                  Booking Dates
                </p>
                <p className="text-cream/85 text-sm font-[family-name:var(--font-cormorant)]">
                  {SKYLINE_HOTEL.bookingDates}
                </p>
              </div>
            </div>
            <div className="skyline-timeline__divider" aria-hidden />
            <div className="skyline-timeline__item">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold/50 font-[family-name:var(--font-cormorant)]">
                  Cut-Off Date
                </p>
                <p className="text-cream/85 text-sm font-[family-name:var(--font-cormorant)]">
                  {SKYLINE_HOTEL.cutoffDate}
                </p>
              </div>
            </div>
          </div>

          {/* Deposit notice */}
          <div className="flex gap-3 items-start px-4 py-3 rounded-xl border border-gold/20 bg-gold/5">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p className="text-cream/65 text-sm font-[family-name:var(--font-cormorant)] leading-relaxed">
              {SKYLINE_HOTEL.depositNote}
            </p>
          </div>

          {/* Coordinator contact */}
          <div className="skyline-coordinator rounded-xl border border-gold/25 p-5 md:p-6">
            <p className="text-gold/70 text-xs tracking-[0.28em] uppercase font-[family-name:var(--font-cormorant)] mb-3">
              To Secure Your Reservation
            </p>
            <p className="text-cream font-[family-name:var(--font-playfair)] text-lg mb-1">
              {coordinator.name}
            </p>
            <p className="text-cream/45 text-sm font-[family-name:var(--font-cormorant)] mb-4">
              {coordinator.title}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${coordinator.email}?subject=${encodeURIComponent(SKYLINE_HOTEL.groupName + " Room Reservation")}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gold/35 text-gold-light text-sm font-[family-name:var(--font-cormorant)] hover:bg-gold/10 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {coordinator.email}
              </a>
              <a
                href={`tel:${coordinator.phoneTel}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-navy-deep text-sm font-[family-name:var(--font-cormorant)] tracking-wide transition-all hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #c9a227, #e8c547)",
                }}
              >
                <Phone className="w-4 h-4" />
                {coordinator.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HotelIconBadge({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex-shrink-0 mx-auto md:mx-0">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center border border-gold/30"
        style={{
          background:
            "linear-gradient(135deg, rgba(201,162,39,0.15), rgba(13,27,62,0.6))",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

function DetailPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-gold/10">
      <span className="text-gold/70 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold/50 font-[family-name:var(--font-cormorant)]">
          {label}
        </p>
        <p className="text-cream/80 text-sm font-[family-name:var(--font-cormorant)]">
          {value}
        </p>
      </div>
    </div>
  );
}
