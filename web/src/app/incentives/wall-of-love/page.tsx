import type { Metadata } from "next";
import { WallOfLove } from "@/components/wall-of-love/WallOfLove";

export const metadata: Metadata = {
  title: "Wall of Love",
  description: "See what traders say about Dominion Markets.",
};

export default function WallOfLovePage() {
  return <WallOfLove />;
}
