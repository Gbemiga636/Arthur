"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Shuffle,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react";
import {
  GALLERY_CHAPTERS,
  GALLERY_IMAGES,
  GALLERY_TEASER_IDS,
  chapterLabel,
  type GalleryChapter,
} from "@/lib/gallery";
import { EVENT_BRAND, EVENT_HASHTAG, HONOREE_FIRST_NAME } from "@/lib/constants";

type ChapterFilter = "all" | GalleryChapter;

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
      draggable={false}
    />
  );
}

export default function GalleryTeaser() {
  const teaser = GALLERY_TEASER_IDS.map(
    (id) => GALLERY_IMAGES.find((img) => img.id === id)!
  );

  return (
    <section id="gallery" className="relative px-6 py-16 md:py-20 overflow-hidden">
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
            {GALLERY_IMAGES.length} cherished photographs celebrating {EVENT_BRAND}.
          </p>
        </div>

        <div className="gallery-teaser-reel mb-8" aria-hidden>
          <div className="gallery-teaser-reel__fade gallery-teaser-reel__fade--left" />
          <div className="gallery-teaser-reel__fade gallery-teaser-reel__fade--right" />
          <div className="gallery-teaser-reel__track">
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
              <div key={`${img.id}-${i}`} className="gallery-teaser-reel__frame">
                <GalleryImg src={img.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
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
            <Sparkles className="w-4 h-4" />
            Explore Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

function MemoryReel() {
  const doubled = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <div className="gallery-reel mb-10 md:mb-14" aria-hidden>
      <div className="gallery-reel__fade gallery-reel__fade--left" />
      <div className="gallery-reel__fade gallery-reel__fade--right" />
      <div className="gallery-reel__track">
        {doubled.map((img, i) => (
          <div key={`reel-${img.id}-${i}`} className="gallery-reel__slide">
            <GalleryImg src={img.src} alt="" className="w-full h-full object-cover" />
            <span className="gallery-reel__caption">{img.caption}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MemoryGallery() {
  const [filter, setFilter] = useState<ChapterFilter>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const touchStart = useRef<number | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((g) => g.chapter === filter),
    [filter]
  );

  const open = (id: number) => setLightbox(id);
  const close = () => setLightbox(null);

  const step = useCallback((dir: 1 | -1) => {
    setLightbox((current) => {
      if (current === null) return null;
      const pool =
        filter === "all"
          ? GALLERY_IMAGES
          : GALLERY_IMAGES.filter((g) => g.chapter === filter);
      const idx = pool.findIndex((g) => g.id === current);
      if (idx === -1) return pool[0]?.id ?? null;
      const next = (idx + dir + pool.length) % pool.length;
      return pool[next].id;
    });
  }, [filter]);

  const openRandom = () => {
    const pool = filtered.length ? filtered : GALLERY_IMAGES;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    open(pick.id);
  };

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
            key={active.id}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="gallery-lightbox__panel"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStart.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStart.current === null) return;
              const delta = e.changedTouches[0].clientX - touchStart.current;
              if (Math.abs(delta) > 48) step(delta > 0 ? -1 : 1);
              touchStart.current = null;
            }}
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

            <span className="gallery-lightbox__chapter">
              {chapterLabel(active.chapter)}
            </span>

            <div className="gallery-lightbox__image-wrap">
              <GalleryImg
                src={active.src}
                alt={active.alt}
                className="w-full h-full object-contain bg-navy-deep"
                priority
              />
            </div>
            <p className="text-center mt-4 text-cream font-[family-name:var(--font-playfair)] text-lg md:text-xl">
              {active.caption}
            </p>
            <p className="text-center text-cream/40 text-xs mt-1 font-[family-name:var(--font-cormorant)] tracking-wider">
              {active.id} of {GALLERY_IMAGES.length} · swipe or use arrows
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const featured = GALLERY_IMAGES[0];

  return (
    <>
      <section className="relative px-4 sm:px-6 pb-16 md:pb-24">
        <MemoryReel />

        <div className="max-w-6xl mx-auto mb-8 flex flex-wrap items-center justify-center gap-3 text-center">
          <div className="gallery-stat">
            <span className="gallery-stat__num">{GALLERY_IMAGES.length}</span>
            <span className="gallery-stat__label">Memories</span>
          </div>
          <div className="gallery-stat">
            <span className="gallery-stat__num">60</span>
            <span className="gallery-stat__label">Years of {HONOREE_FIRST_NAME}</span>
          </div>
          <div className="gallery-stat">
            <span className="gallery-stat__num">∞</span>
            <span className="gallery-stat__label">Love & Legacy</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-10"
        >
          <button
            type="button"
            onClick={() => open(featured.id)}
            className="gallery-hero group w-full text-left"
          >
            <GalleryImg
              src={featured.src}
              alt={featured.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              priority
            />
            <div className="gallery-hero__overlay">
              <p className="text-gold/80 text-xs tracking-[0.35em] uppercase font-[family-name:var(--font-cormorant)]">
                Spotlight Memory
              </p>
              <p className="text-cream text-xl md:text-3xl font-[family-name:var(--font-playfair)] mt-1">
                {featured.caption}
              </p>
              <span className="gallery-hero__zoom">
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>
          </button>
        </motion.div>

        <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div
            className="gallery-chapters flex flex-wrap justify-center sm:justify-start gap-2"
            role="tablist"
            aria-label="Filter memories by chapter"
          >
            {GALLERY_CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                type="button"
                role="tab"
                aria-selected={filter === ch.id}
                onClick={() => setFilter(ch.id)}
                className={`gallery-chapter-pill ${
                  filter === ch.id ? "gallery-chapter-pill--active" : ""
                }`}
              >
                <span aria-hidden>{ch.icon}</span>
                {ch.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={openRandom}
            className="gallery-surprise-btn shrink-0"
          >
            <Shuffle className="w-3.5 h-3.5" />
            Surprise Me
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="max-w-6xl mx-auto gallery-polaroid-wall"
          >
            {filtered.map((img, i) => (
              <motion.button
                key={img.id}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(i * 0.03, 0.36) }}
                onClick={() => open(img.id)}
                className={`gallery-polaroid gallery-polaroid--${(i % 6) + 1}`}
                style={{ "--tilt": `${img.tilt}deg` } as React.CSSProperties}
              >
                <div className="gallery-polaroid__tape" aria-hidden />
                <div className="gallery-polaroid__photo">
                  <GalleryImg
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="gallery-polaroid__caption">{img.caption}</p>
                <span className="gallery-polaroid__chapter">
                  {chapterLabel(img.chapter)}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-cream/35 text-xs mt-14 font-[family-name:var(--font-cormorant)] tracking-wider">
          {EVENT_HASHTAG}
        </p>
      </section>

      {mounted && createPortal(lightboxUi, document.body)}
    </>
  );
}
