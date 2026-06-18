import SectionPageShell from "@/components/SectionPageShell";
import EnvelopeSection from "@/components/EnvelopeSection";
import QuickInfoStrip from "@/components/QuickInfoStrip";
import EventDetails from "@/components/EventDetails";
import CountdownTimer from "@/components/CountdownTimer";
import { EVENT_BRAND } from "@/lib/constants";

export const metadata = {
  title: `Invitation | ${EVENT_BRAND}`,
  description:
    "Open your formal invitation and view celebration details for Akukalia At 60.",
};

export default function InvitationPage() {
  return (
    <SectionPageShell withMusic crumb="Invitation">
      <EnvelopeSection />
      <QuickInfoStrip />
      <EventDetails />
      <CountdownTimer />
    </SectionPageShell>
  );
}
