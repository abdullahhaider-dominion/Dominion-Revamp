import type { Metadata } from "next";
import { CTraderPage } from "@/components/ctrader/CTraderPage";

export const metadata: Metadata = {
  title: "cTrader",
  description:
    "Download Dominion Markets cTrader for desktop, web, and mobile. Advanced charting, fast execution, and transparent pricing.",
  alternates: {
    canonical: "/ctrader",
  },
};

export default function CTraderRoute() {
  return <CTraderPage />;
}
