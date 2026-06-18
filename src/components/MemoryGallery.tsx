"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X, ZoomIn } from "lucide-react";
import { GALLERY_IMAGES, GALLERY_TEASER_IDS } from "@/lib/gallery";
import { EVENT_BRAND, EVENT_HASHTAG } from "@/lib/constants";

function GalleryImg({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

export default function GalleryTeaser() {
  const teaser = GALLERY_TEASER_IDS.map(
    (id) => GALLERY_IMAGES.find((img) => img.id === id)!
  );

  return (
    <section id="gallery" className="relative px-6 py-16 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="section-label inline-flex items-center gap-2">
            <Images className="w-3.5 h-3.5" />
            Memory Lane
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-[family-name:var(--font-playfair)] text-cream">
            A Gallery of{" "}
            <span className="text-gold-shimmer">Precious Moments</span>
          </h2>
          <p className="text-cream/50 mt-3 font-[family-name:var(--font-cormorant)] text-lg max-w-lg mx-auto">
            Walk through cherished memories celebrating {EVENT_BRAND}.
          </p>
        </div>

        <div className="gallery-teaser-grid">
          {teaser.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`gallery-teaser-item gallery-teaser-item--${i + 1}`}
            >
              <Link href="/gallery" className="block absolute inset-0">
                <GalleryImg
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="gallery-teaser-item__veil" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold/40 text-gold-light font-[family-name:var(--font-cormorant)] tracking-[0.2em] uppercase text-xs hover:bg-gold/10 transition-all"
          >
            <Images className="w-4 h-4" />
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

export function MemoryGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const open = (id: number) => setLightbox(id);
  const close = () => setLightbox(null);

  const step = useCallback((dir: 1 | -1) => {
    setLightbox((current) => {
      if (current === null) return null;
      const idx = GALLERY_IMAGES.findIndex((g) => g.id === current);
      const next = (idx + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
      return GALLERY_IMAGES[next].id;
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, step]);

  const active = lightbox
    ? GALLERY_IMAGES.find((g) => g.id === lightbox)
    : null;

  const lightboxUi = (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="gallery-lightbox"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="gallery-lightbox__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="gallery-lightbox__close"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              className="gallery-lightbox__nav gallery-lightbox__nav--prev"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="gallery-lightbox__nav gallery-lightbox__nav--next"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="gallery-lightbox__image-wrap">
              <GalleryImg
                src={active.src}
                alt={active.alt}
                className="w-full h-full object-contain bg-navy-deep"
                priority
              />
            </div>
            <p className="text-center mt-4 text-cream font-[family-name:var(--font-playfair)] text-lg">
              {active.caption}
            </p>
            <p className="text-center text-cream/40 text-xs mt-1 font-[family-name:var(--font-cormorant)]">
              {active.id} / {GALLERY_IMAGES.length}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <section className="relative px-4 sm:px-6 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto mb-8 md:mb-12"
        >
          <button
            type="button"
            onClick={() => open(GALLERY_IMAGES[0].id)}
            className="gallery-hero group w-full text-left"
          >
            <GalleryImg
              src={GALLERY_IMAGES[0].src}
              alt={GALLERY_IMAGES[0].alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
            <div className="gallery-hero__overlay">
              <p className="text-gold/80 text-xs tracking-[0.35em] uppercase font-[family-name:var(--font-cormorant)]">
                Featured Memory
              </p>
              <p className="text-cream text-xl md:text-2xl font-[family-name:var(--font-playfair)] mt-1">
                {GALLERY_IMAGES[0].caption}
              </p>
              <span className="gallery-hero__zoom">
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>
          </button>
        </motion.div>

        <div className="max-w-6xl mx-auto gallery-mosaic">
          {GALLERY_IMAGES.slice(1).map((img, i) => (
            <motion.button
              key={img.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 4) * 0.06 }}
              whileHover={{ y: -4 }}
              onClick={() => open(img.id)}
              className={`gallery-mosaic__cell gallery-mosaic__cell--${(i % 6) + 1}`}
            >
              <GalleryImg
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="gallery-mosaic__frame" aria-hidden />
              <div className="gallery-mosaic__caption">
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold-light/90 font-[family-name:var(--font-cormorant)]">
                  {img.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="text-center text-cream/35 text-xs mt-12 font-[family-name:var(--font-cormorant)] tracking-wider">
          {EVENT_HASHTAG}
        </p>
      </section>

      {mounted && createPortal(lightboxUi, document.body)}
    </>
  );
}
