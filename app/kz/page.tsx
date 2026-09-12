import { redirect } from "next/navigation";
// Kazakh is temporarily unavailable; retain the old URL as a redirect.
export default function HomeKz() { redirect("/"); }
