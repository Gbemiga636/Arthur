"use client";

import { motion } from "framer-motion";
import { HONOREE_FIRST_NAME } from "@/lib/constants";
import { handleSectionNav } from "@/lib/scroll-to-section";

const links = [
  { href: "#invitation", label: "Invitation" },
  { href: "#welcome", label: "Welcome" },
  { href: "#details", label: "Details" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#hotel", label: "Hotel" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const onNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSectionNav(e, href);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-gold/15"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-5 py-3">
        {/* Brand row */}
        <div className="flex items-center justify-between gap-3">
          <a
            href="#invitation"
            onClick={(e) => onNav(e, "#invitation")}
            className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
          >
            <div className="relative w-10 h-10 shrink-0 rounded-full border border-gold/40 flex items-center justify-center bg-navy/60 group-hover:border-gold/70 transition-colors">
              <span className="text-lg font-bold gold-3d font-[family-name:var(--font-playfair)] leading-none">
                60
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.35em] uppercase text-gold/80 font-[family-name:var(--font-cormorant)] truncate">
                {HONOREE_FIRST_NAME}&apos;s Golden Celebration
              </p>
              <p className="text-cream/50 text-[10px] sm:text-[11px] tracking-wider font-[family-name:var(--font-cormorant)] truncate">
                Wayne, Michigan · August 2026
              </p>
            </div>
          </a>

          {/* Desktop nav — single row */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => onNav(e, link.href)}
                className="px-3 py-2 text-cream/60 hover:text-gold-light text-xs tracking-[0.15em] uppercase transition-colors font-[family-name:var(--font-cormorant)] rounded-lg hover:bg-gold/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#rsvp"
              onClick={(e) => onNav(e, "#rsvp")}
              className="ml-1 px-5 py-2 rounded-full text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-cormorant)] border border-gold/50 text-gold-light hover:bg-gold/15 transition-all"
              style={{
                background:
                  "linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.05))",
              }}
            >
              RSVP Now
            </a>
          </nav>
        </div>

        {/* Mobile & tablet — always-visible section buttons (no hamburger) */}
        <nav
          className="lg:hidden mt-3 pt-3 border-t border-gold/10 grid grid-cols-3 gap-2"
          aria-label="Page sections"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => onNav(e, link.href)}
              className={`flex items-center justify-center min-h-[44px] px-2 py-2.5 rounded-xl text-center text-sm font-[family-name:var(--font-cormorant)] tracking-wide border transition-all active:scale-[0.98] ${
                link.href === "#rsvp"
                  ? "border-gold/55 text-gold-light bg-gold/15 font-semibold"
                  : "border-gold/25 text-cream/85 bg-navy/50 hover:border-gold/45 hover:bg-gold/10"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </motion.header>
  );
}
