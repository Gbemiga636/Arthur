import SectionPageShell from "@/components/SectionPageShell";
import RSVPForm from "@/components/RSVPForm";
import CountdownTimer from "@/components/CountdownTimer";
import { EVENT_BRAND } from "@/lib/constants";

export const metadata = {
  title: `RSVP | ${EVENT_BRAND}`,
  description: "Respond to your invitation for the Akukalia At 60 celebration.",
};

export default function RsvpPage() {
  return (
    <SectionPageShell crumb="RSVP">
      <RSVPForm />
      <CountdownTimer />
    </SectionPageShell>
  );
}
