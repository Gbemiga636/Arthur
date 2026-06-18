import { redirect } from "next/navigation";

/** Legacy route — Details moved to Invitation; gallery replaced Details in nav */
export default function DetailsPage() {
  redirect("/gallery");
}
