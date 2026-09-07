import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
  title: "Wall of Love",
};

export default function WallOfLovePage() {
  return <PlaceholderPage title="Wall of Love" />;
}
