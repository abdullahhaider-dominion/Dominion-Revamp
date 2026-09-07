import type { Metadata } from "next";
import { CopyTrading } from "@/components/copy-trading/CopyTrading";

export const metadata: Metadata = {
  title: "Copy Trading",
  description:
    "Follow experienced traders and copy their strategies automatically with Dominion Markets Copy Trading.",
};

export default function CopyTradingPage() {
  return <CopyTrading />;
}
