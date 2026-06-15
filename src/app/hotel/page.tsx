import SectionPageShell from "@/components/SectionPageShell";
import HotelReservation from "@/components/HotelReservation";
import { EVENT_BRAND } from "@/lib/constants";

export const metadata = {
  title: `Hotel Accommodations | ${EVENT_BRAND}`,
  description: "Fairfield by Marriott and Skyline Hotel group rates for celebration guests.",
};

export default function HotelPage() {
  return (
    <SectionPageShell crumb="Hotel">
      <HotelReservation />
    </SectionPageShell>
  );
}
