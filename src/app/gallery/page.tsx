import SectionPageShell from "@/components/SectionPageShell";
import { MemoryGallery } from "@/components/MemoryGallery";
import { GALLERY_IMAGES } from "@/lib/gallery";
import { EVENT_BRAND, HONOREE_FIRST_NAME } from "@/lib/constants";

export const metadata = {
  title: `Memory Gallery | ${EVENT_BRAND}`,
  description: `A living album of ${GALLERY_IMAGES.length} cherished moments celebrating ${EVENT_BRAND}.`,
};

export default function GalleryPage() {
  return (
    <SectionPageShell crumb="Gallery">
      <div className="max-w-6xl mx-auto text-center px-6 pt-2 pb-4">
        <p className="section-label inline-flex items-center gap-2">
          <span className="gallery-page__spark" aria-hidden>
            ✦
          </span>
          Memory Lane
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-[family-name:var(--font-playfair)] text-cream leading-[1.1]">
          Sixty Years in{" "}
          <span className="text-gold-shimmer">Living Colour</span>
        </h1>
        <p className="text-cream/55 mt-4 font-[family-name:var(--font-cormorant)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Walk through {GALLERY_IMAGES.length} treasured photographs of{" "}
          {HONOREE_FIRST_NAME}&rsquo;s journey — filter by chapter, tap a polaroid,
          or let fate pick your next memory.
        </p>
      </div>
      <MemoryGallery />
    </SectionPageShell>
  );
}
