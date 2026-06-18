import SectionPageShell from "@/components/SectionPageShell";
import { MemoryGallery } from "@/components/MemoryGallery";
import { EVENT_BRAND } from "@/lib/constants";

export const metadata = {
  title: `Memory Gallery | ${EVENT_BRAND}`,
  description: "A gallery of cherished moments celebrating Akukalia At 60.",
};

export default function GalleryPage() {
  return (
    <SectionPageShell crumb="Gallery">
      <div className="max-w-6xl mx-auto text-center px-6 pt-4 pb-8">
        <p className="section-label">Memory Lane</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-cream leading-tight">
          A Living Album of{" "}
          <span className="text-gold-shimmer">Love & Legacy</span>
        </h1>
        <p className="text-cream/55 mt-4 font-[family-name:var(--font-cormorant)] text-lg max-w-xl mx-auto">
          Tap any photograph to step inside a moment from this beautiful journey.
        </p>
      </div>
      <MemoryGallery />
    </SectionPageShell>
  );
}
