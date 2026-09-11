import type { Metadata } from "next";
import { MarketAnalysisPage } from "@/components/market-analysis/MarketAnalysisPage";

export const metadata: Metadata = {
  title: "Market Analysis",
  description:
    "Technical analysis from the Dominion Markets desk — XAUUSD and GBPJPY 1h notes, updated around the London session.",
  alternates: {
    canonical: "/marketanalysis",
  },
};

export default function MarketAnalysisRoute() {
  return <MarketAnalysisPage />;
}
