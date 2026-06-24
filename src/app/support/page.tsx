import SectionPageShell from "@/components/SectionPageShell";
import GiftRegistrySection from "@/components/GiftRegistrySection";
import { EVENT_BRAND } from "@/lib/constants";

export const metadata = {
  title: `Celebrate From Afar | ${EVENT_BRAND}`,
  description:
    "Support Akukalia At 60 from anywhere — prayers, love, and our celebration wishlist for friends who cannot attend in person.",
};

export default function SupportPage() {
  return (
    <SectionPageShell crumb="Support">
      <GiftRegistrySection compact />
    </SectionPageShell>
  );
}
