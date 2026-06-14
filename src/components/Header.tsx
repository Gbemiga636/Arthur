"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  const onNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSectionNav(e, href, () => setOpen(false));
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`border-b border-gold/15 ${open ? "bg-navy-deep" : "glass"}`}
      >
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <a
            href="#invitation"
            onClick={(e) => onNav(e, "#invitation")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-navy/60 group-hover:border-gold/70 transition-colors">
              <span className="text-lg font-bold gold-3d font-[family-name:var(--font-playfair)] leading-none">
                60
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] tracking-[0.35em] uppercase text-gold/80 font-[family-name:var(--font-cormorant)]">
                Arthur&apos;s Golden Celebration
              </p>
              <p className="text-cream/50 text-[11px] tracking-wider font-[family-name:var(--font-cormorant)]">
                Wayne, Michigan · August 2026
              </p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => onNav(e, link.href)}
                className="px-4 py-2 text-cream/60 hover:text-gold-light text-xs tracking-[0.2em] uppercase transition-colors font-[family-name:var(--font-cormorant)] rounded-lg hover:bg-gold/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#rsvp"
              onClick={(e) => onNav(e, "#rsvp")}
              className="ml-2 px-5 py-2 rounded-full text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-cormorant)] border border-gold/50 text-gold-light hover:bg-gold/15 transition-all"
              style={{
                background: "linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.05))",
              }}
            >
              RSVP Now
            </a>
          </nav>

          <button
            className="md:hidden p-2 text-cream/70 hover:text-gold transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-deep border-b border-gold/15 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          >
            <nav className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => onNav(e, link.href)}
                  className="px-4 py-3 text-cream/70 hover:text-gold-light text-sm tracking-wider uppercase font-[family-name:var(--font-cormorant)] rounded-lg hover:bg-gold/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#rsvp"
                onClick={(e) => onNav(e, "#rsvp")}
                className="mt-2 px-4 py-3 text-center rounded-full border border-gold/50 text-gold-light text-sm tracking-wider uppercase font-[family-name:var(--font-cormorant)]"
                style={{
                  background: "linear-gradient(135deg, rgba(201,162,39,0.15), rgba(201,162,39,0.05))",
                }}
              >
                RSVP Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </motion.header>
  );
}
