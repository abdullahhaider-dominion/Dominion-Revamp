import type { Metadata } from "next";
import { AccountsPage } from "@/components/accounts/AccountsPage";

export const metadata: Metadata = {
  title: "Account Types",
  description:
    "Compare Dominion Markets Standard STP, ECN, ECN Institutional, and Islamic trading accounts.",
  alternates: {
    canonical: "/accounts",
  },
};

export default function AccountTypesPage() {
  return <AccountsPage />;
}
