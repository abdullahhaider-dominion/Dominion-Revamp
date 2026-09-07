import type { Metadata } from "next";
import { CommissionIncentives } from "@/components/commission/CommissionIncentives";

export const metadata: Metadata = {
  title: "Commission Incentives",
  description:
    "Earn more with Dominion Markets commission incentives. Transparent rewards for active traders on MT5 and cTrader.",
};

export default function CommissionIncentivesPage() {
  return <CommissionIncentives />;
}
