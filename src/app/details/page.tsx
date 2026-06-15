import SectionPageShell from "@/components/SectionPageShell";
import EventDetails from "@/components/EventDetails";
import CountdownTimer from "@/components/CountdownTimer";
import QuickInfoStrip from "@/components/QuickInfoStrip";
import { EVENT_BRAND } from "@/lib/constants";

export const metadata = {
  title: `Event Details | ${EVENT_BRAND}`,
  description: "Date, time, venue, and celebration details for Akukalia At 60.",
};

export default function DetailsPage() {
  return (
    <SectionPageShell crumb="Details">
      <QuickInfoStrip />
      <EventDetails />
      <CountdownTimer />
    </SectionPageShell>
  );
}
