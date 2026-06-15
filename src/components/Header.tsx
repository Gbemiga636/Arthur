"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HashtagSeal from "@/components/HashtagSeal";
import { handleSectionNav } from "@/lib/scroll-to-section";

const sectionLinks = [
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
        <a
          href="#welcome"
          onClick={(e) => onNav(e, "#welcome")}
          className="flex items-center gap-1.5 shrink-0 group min-w-0"
        >
          <HashtagSeal size="sm" />
        </a>

        <nav
          className="flex flex-1 items-center justify-end gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none min-w-0"
          aria-label="Page sections"
        >
          {sectionLinks.map((link) => (
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
          <Link
            href="/photobooth"
            className="shrink-0 px-2 sm:px-2.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-[family-name:var(--font-cormorant)] tracking-wide border border-gold/35 text-gold-light bg-gold/10 hover:border-gold/50 transition-all"
          >
            Photobooth
          </Link>
        </nav>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </motion.header>
  );
}
