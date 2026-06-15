import SectionPageShell from "@/components/SectionPageShell";
import FAQSection from "@/components/FAQSection";
import { EVENT_BRAND } from "@/lib/constants";

export const metadata = {
  title: `FAQ | ${EVENT_BRAND}`,
  description: "Frequently asked questions about the Akukalia At 60 celebration.",
};

export default function FaqPage() {
  return (
    <SectionPageShell crumb="FAQ">
      <FAQSection />
    </SectionPageShell>
  );
}
