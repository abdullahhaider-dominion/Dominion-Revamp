import type { Metadata } from "next";
import { Mt5WebTraderPage } from "@/components/webterminal-mt5/Mt5WebTraderPage";

export const metadata: Metadata = {
  title: "MetaTrader 5 WebTerminal | Trade Online from Any Browser",
  description:
    "Access MetaTrader 5 WebTerminal in your browser with Dominion Markets. Analyze charts, place orders, and manage your account — no download required.",
  alternates: {
    canonical: "/webterminal-mt5",
  },
};

export default function Mt5WebTraderRoute() {
  return <Mt5WebTraderPage />;
}
