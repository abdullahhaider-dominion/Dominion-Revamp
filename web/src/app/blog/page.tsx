import type { Metadata } from "next";
import { BlogPage } from "@/components/blog/BlogPage";

export const metadata: Metadata = {
  title: "The Dominion Journal",
  description:
    "Practical trading guides and fresh perspectives from Dominion Markets — platforms, forex, risk and market insights.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogRoute() {
  return <BlogPage />;
}
