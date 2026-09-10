import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Legal Documents",
  description:
    "Review Dominion Markets policies and procedures before opening a trading account or placing an order.",
  alternates: {
    canonical: "/legal-documents",
  },
};

export default function LegalDocumentsRoute() {
  return <LegalPage />;
}
