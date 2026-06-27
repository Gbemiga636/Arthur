import SectionPageShell from "@/components/SectionPageShell";
import GiftRegistrySection from "@/components/GiftRegistrySection";
import { EVENT_BRAND } from "@/lib/constants";

export const metadata = {
  title: `Gift Registry | ${EVENT_BRAND}`,
  description:
    "Celebrate Akukalia At 60 from anywhere — prayers, love, and our MyRegistry celebration wishlist.",
};

export default function GiftRegistryPage() {
  return (
    <SectionPageShell crumb="Gift Registry">
      <GiftRegistrySection compact />
    </SectionPageShell>
  );
}
