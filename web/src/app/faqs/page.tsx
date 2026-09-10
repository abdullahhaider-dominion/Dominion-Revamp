import type { Metadata } from "next";
import { FaqsPage } from "@/components/faqs/FaqsPage";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about Dominion Markets accounts, cTrader, deposits, and withdrawals.",
  alternates: {
    canonical: "/faqs",
  },
};

export default function FaqsRoute() {
  return <FaqsPage />;
}
