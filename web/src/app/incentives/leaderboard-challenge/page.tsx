import type { Metadata } from "next";
import { LeaderboardChallenge } from "@/components/leaderboard/LeaderboardChallenge";

export const metadata: Metadata = {
  title: "Leaderboard Challenge",
  description:
    "Trade, compete, and win on the Dominion Markets Leaderboard Challenge 2026. Top performers can earn funded trading accounts up to $25,000.",
};

export default function LeaderboardChallengePage() {
  return <LeaderboardChallenge />;
}
