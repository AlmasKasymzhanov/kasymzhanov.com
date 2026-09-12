import type { ReactNode } from "react";
import { PersonalDocument } from "@/components/personal-document";

export default function SellerForumLayout({ children }: { children: ReactNode }) {
  return <PersonalDocument report>{children}</PersonalDocument>;
}
