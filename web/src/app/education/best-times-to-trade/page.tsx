import type { Metadata } from "next";
import { BestTimesToTradePage } from "@/components/best-times-to-trade/BestTimesToTradePage";

export const metadata: Metadata = {
  title: "Best Time to Trade",
  description:
    "Learn when the forex market is most active. Compare Asian, London and New York sessions so you can trade high-volume windows with more confidence.",
  alternates: {
    canonical: "/education/best-times-to-trade",
  },
};

export default function BestTimesToTradeRoute() {
  return <BestTimesToTradePage />;
}
