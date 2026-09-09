import type { Metadata } from "next";
import { PartnershipPage } from "@/components/partnership/PartnershipPage";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Partner with Dominion Markets through our introducing broker and affiliate program.",
  alternates: {
    canonical: "/partnership",
  },
};

export default function PartnershipsPage() {
  return <PartnershipPage />;
}
