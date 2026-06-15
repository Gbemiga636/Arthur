import SectionPageShell from "@/components/SectionPageShell";
import EnvelopeSection from "@/components/EnvelopeSection";
import { EVENT_BRAND } from "@/lib/constants";

export const metadata = {
  title: `Invitation | ${EVENT_BRAND}`,
  description: "Open your formal invitation to the Akukalia At 60 celebration.",
};

export default function InvitationPage() {
  return (
    <SectionPageShell withMusic crumb="Invitation">
      <EnvelopeSection />
    </SectionPageShell>
  );
}
