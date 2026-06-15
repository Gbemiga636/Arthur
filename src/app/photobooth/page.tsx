import type { Metadata } from "next";
import { EVENT_BRAND } from "@/lib/constants";
import PhotoboothPage from "./PhotoboothPageClient";

export const metadata: Metadata = {
  title: `Photobooth | ${EVENT_BRAND}`,
  description: "Capture and share your celebration moment at Akukalia At 60.",
};

export default function Page() {
  return <PhotoboothPage />;
}
