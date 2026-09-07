import type { Metadata } from "next";
import { MoreInfo } from "@/components/more-info/MoreInfo";

export const metadata: Metadata = {
  title: "More Info",
  description: "Learn more about Dominion Markets.",
};

export default function MoreInfoPage() {
  return <MoreInfo />;
}
