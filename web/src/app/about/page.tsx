import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover Dominion Markets' vision, story, values, and trader-first global community.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutUsPage() {
  return <AboutPage />;
}
