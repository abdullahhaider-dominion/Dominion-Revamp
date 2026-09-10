import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Dominion Markets. Reach our Dubai management office or Mauritius registered office, or send a message and we will reply as soon as we can.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactRoute() {
  return <ContactPage />;
}
