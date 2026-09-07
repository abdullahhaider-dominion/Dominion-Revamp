import { incentivePath, INCENTIVES_PAGES } from "@/content/incentives";

export type SiteNavLink = {
  label: string;
  href: string;
};

export type SiteNavItem = SiteNavLink & {
  children?: readonly SiteNavLink[];
};

export const SITE_NAV: readonly SiteNavItem[] = [
  {
    label: "Markets",
    href: "/#markets",
    children: [
      { label: "Markets overview", href: "/#markets" },
      { label: "Market sessions", href: "/#sessions" },
      { label: "Trade better", href: "/#trade-better" },
    ],
  },
  {
    label: "Accounts",
    href: "/#accounts",
    children: [
      { label: "Account types", href: "/#accounts" },
      { label: "Funding", href: "/#funding" },
    ],
  },
  {
    label: "Platforms",
    href: "/#platforms",
  },
  {
    label: "Tools",
    href: "/#dashboard",
    children: [
      { label: "Trader dashboard", href: "/#dashboard" },
      { label: "Copy trading", href: "/#copy-trading" },
      { label: "Ecosystem", href: "/#ecosystem" },
    ],
  },
  {
    label: "Incentives",
    href: incentivePath("leaderboard-challenge"),
    children: INCENTIVES_PAGES.map((page) => ({
      label: page.title,
      href: incentivePath(page.slug),
    })),
  },
  {
    label: "About",
    href: "/#trust",
    children: [
      { label: "Why Dominion", href: "/#why-dominion" },
      { label: "Trust & regulation", href: "/#trust" },
      { label: "Insights & blog", href: "/#blogs" },
    ],
  },
];
