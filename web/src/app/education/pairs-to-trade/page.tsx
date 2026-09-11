import type { Metadata } from "next";
import { PairsToTradePage } from "@/components/pairs-to-trade/PairsToTradePage";

export const metadata: Metadata = {
  title: "Pairs to Trade",
  description:
    "Learn which currency pairs have volume in the Asian, London and New York sessions so you can match the pair to the market that is open.",
  alternates: {
    canonical: "/education/pairs-to-trade",
  },
};

export default function PairsToTradeRoute() {
  return <PairsToTradePage />;
}
