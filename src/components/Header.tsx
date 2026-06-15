"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";

export default function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-gold/15"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5">
        <nav
          className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className={`shrink-0 px-2 sm:px-2.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-[family-name:var(--font-cormorant)] tracking-wide border transition-all active:scale-[0.97] ${
              pathname === "/"
                ? "border-gold/55 text-gold-light bg-gold/15 font-semibold"
                : "border-gold/20 text-cream/80 bg-navy/40 hover:border-gold/40 hover:text-gold-light"
            }`}
          >
            Home
          </Link>
          {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`shrink-0 px-2 sm:px-2.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-[family-name:var(--font-cormorant)] tracking-wide border transition-all active:scale-[0.97] ${
                    active
                      ? "border-gold/55 text-gold-light bg-gold/15 font-semibold"
                      : link.highlight
                        ? "border-gold/45 text-gold-light bg-gold/10 font-semibold hover:border-gold/55"
                        : "border-gold/20 text-cream/80 bg-navy/40 hover:border-gold/40 hover:text-gold-light"
                  }`}
                >
                  {link.label}
                </Link>
              );
          })}
        </nav>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </motion.header>
  );
}
