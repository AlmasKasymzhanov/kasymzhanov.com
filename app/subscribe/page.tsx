import { permanentRedirect } from "next/navigation";

export default function LegacySubscribePage() {
  permanentRedirect("/newsletter");
}
