"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";

const linkClass = (active: boolean, highlight?: boolean) =>
  `shrink-0 whitespace-nowrap px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full text-[7.5px] min-[380px]:text-[8px] sm:text-[9px] md:text-[10px] font-[family-name:var(--font-cormorant)] tracking-wide border transition-all active:scale-[0.97] ${
    active
      ? "border-gold/55 text-gold-light bg-gold/15 font-semibold"
      : highlight
        ? "border-gold/45 text-gold-light bg-gold/10 font-semibold hover:border-gold/55"
        : "border-gold/20 text-cream/80 bg-navy/40 hover:border-gold/40 hover:text-gold-light"
  }`;

export default function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="site-header fixed top-0 left-0 right-0 z-50 glass border-b border-gold/15"
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2">
        <nav
          className="site-header__nav flex flex-nowrap items-center justify-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-none"
          aria-label="Main navigation"
        >
          <Link href="/" className={linkClass(pathname === "/")}>
            Home
          </Link>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(pathname === link.href, link.highlight)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </motion.header>
  );
}
