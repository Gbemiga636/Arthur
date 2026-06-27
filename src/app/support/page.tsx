import { redirect } from "next/navigation";

/** Legacy route — renamed to Gift Registry */
export default function SupportPage() {
  redirect("/gift-registry");
}
