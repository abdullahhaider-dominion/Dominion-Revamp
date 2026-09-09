import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Dominion Markets — our vision, values, platforms, trading conditions, and how to get started.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutUsPage() {
  return <AboutPage />;
}
