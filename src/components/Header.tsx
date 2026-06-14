"use client";

import { motion } from "framer-motion";
import { EVENT_BRAND } from "@/lib/constants";
import HashtagSeal from "@/components/HashtagSeal";
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
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-navy/10"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
        <a
          href="#welcome"
          onClick={(e) => onNav(e, "#welcome")}
          className="flex items-center gap-1.5 shrink-0 group min-w-0"
        >
          <HashtagSeal size="sm" />
          <span className="hidden min-[400px]:block text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-navy font-[family-name:var(--font-cormorant)] font-semibold truncate">
            {EVENT_BRAND}
          </span>
        </a>

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
                  ? "border-gold/55 text-gold bg-gold/15 font-semibold"
                  : "border-navy/15 text-navy bg-white/70 hover:border-gold/45 hover:text-gold"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
    </motion.header>
  );
}
