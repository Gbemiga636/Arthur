"use client";

import { motion } from "framer-motion";
import { BedDouble, MapPin, ExternalLink, CalendarCheck, Key } from "lucide-react";

const HOTEL_LINK =
  "https://www.marriott.com/event-reservations/reservation-link.mi?id=1771962347989&key=GRP&app=resvlink&_branch_match_id=1358235068982778562&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi3OyczLtgdK2ALZZSCOWmaKraG5uaGlmZGxibmlhaVadmqlrXtQgFpdUWpaKlB3Xnp8UlF%2BeXFqkW1wYm5xaV46AKvK5ilhAAAA";

export default function HotelReservation() {
  return (
    <section id="hotel" className="relative px-6 py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label">Travel &amp; Stay</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-cream">
            Hotel Accommodations
          </h2>
          <p className="text-cream/50 mt-3 font-[family-name:var(--font-cormorant)] italic text-lg max-w-lg mx-auto">
            For guests traveling from out of town — a reserved room block has been
            arranged for your convenience.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Ambient glow */}
          <div className="absolute -inset-4 bg-gradient-to-b from-gold/10 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />

          <div className="relative glass-cream rounded-2xl overflow-hidden border border-gold/25">
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-navy via-gold to-navy" />

            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                {/* Icon block */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center border border-gold/30"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(201,162,39,0.15), rgba(13,27,62,0.6))",
                    }}
                  >
                    <BedDouble className="w-9 h-9 text-gold-light" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <p className="text-gold/70 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-cormorant)] mb-2">
                    Official Group Reservation
                  </p>
                  <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] text-cream mb-3">
                    Marriott Hotels — Wayne Area
                  </h3>
                  <p className="text-cream/70 font-[family-name:var(--font-cormorant)] text-lg leading-relaxed mb-6">
                    We have secured a special group rate for celebration guests
                    through Marriott. Book early to guarantee availability near
                    Wayne Tree Manor for the weekend of August 22, 2026.
                  </p>

                  {/* Detail pills */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    <DetailPill
                      icon={<MapPin className="w-4 h-4" />}
                      label="Near Venue"
                      value="Wayne Tree Manor Area"
                    />
                    <DetailPill
                      icon={<CalendarCheck className="w-4 h-4" />}
                      label="Event Weekend"
                      value="August 22, 2026"
                    />
                    <DetailPill
                      icon={<Key className="w-4 h-4" />}
                      label="Booking Type"
                      value="Group Rate — Arthur 60th"
                    />
                    <DetailPill
                      icon={<BedDouble className="w-4 h-4" />}
                      label="Provider"
                      value="Marriott International"
                    />
                  </div>

                  {/* CTA */}
                  <a
                    href={HOTEL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-navy-deep font-[family-name:var(--font-cormorant)] tracking-[0.2em] uppercase text-sm transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(201,162,39,0.35)]"
                    style={{
                      background: "linear-gradient(135deg, #c9a227 0%, #e8c547 50%, #c9a227 100%)",
                    }}
                  >
                    Reserve Your Room
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <p className="text-cream/35 text-xs mt-4 font-[family-name:var(--font-cormorant)]">
                    You will be redirected to Marriott&apos;s secure reservation page.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom note strip */}
            <div className="px-8 py-4 bg-navy/40 border-t border-gold/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-cream/45 text-sm font-[family-name:var(--font-cormorant)]">
                <span className="text-gold/70">Tip:</span> Book as soon as possible — group
                blocks fill quickly during event weekends.
              </p>
              <p className="text-cream/30 text-xs font-[family-name:var(--font-cormorant)] tracking-wider">
                #AkukaliaArthurat60
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
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
