import type { Metadata } from "next";
import { CareersPage } from "@/components/careers/CareersPage";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the team at Dominion Markets. Apply for Markets, Platform, Partnerships, or Operations.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersRoute() {
  return <CareersPage />;
}
