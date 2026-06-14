"use client";

import { motion } from "framer-motion";
import { HONOREE_FIRST_NAME } from "@/lib/constants";
import { handleSectionNav } from "@/lib/scroll-to-section";

const links = [
  { href: "#welcome", label: "Welcome" },
  { href: "#invitation", label: "Invitation" },
  { href: "#details", label: "Details" },
  { href: "#hotel", label: "Hotel" },
  { href: "#rsvp", label: "RSVP", highlight: true },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const onNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSectionNav(e, href);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-gold/15"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
        {/* Logo — links to welcome */}
        <a
          href="#welcome"
          onClick={(e) => onNav(e, "#welcome")}
          className="flex items-center gap-1.5 shrink-0 group min-w-0"
        >
          <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center bg-navy/60 group-hover:border-gold/70 transition-colors">
            <span className="text-sm font-bold gold-3d font-[family-name:var(--font-playfair)] leading-none">
              60
            </span>
          </div>
          <span className="hidden min-[380px]:block text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-gold/75 font-[family-name:var(--font-cormorant)] truncate max-w-[88px] sm:max-w-none">
            {HONOREE_FIRST_NAME}&apos;s 60th
          </span>
        </a>

        {/* Single-line nav — all screen sizes */}
        <nav
          className="flex flex-1 items-center justify-end gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none min-w-0"
          aria-label="Page sections"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => onNav(e, link.href)}
              className={`shrink-0 px-2 sm:px-2.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-[family-name:var(--font-cormorant)] tracking-wide border transition-all active:scale-[0.97] ${
                link.highlight
                  ? "border-gold/55 text-gold-light bg-gold/15 font-semibold"
                  : "border-gold/20 text-cream/80 bg-navy/40 hover:border-gold/40 hover:text-gold-light"
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
