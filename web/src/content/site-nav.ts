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
    href: "/accounts",
  },
  {
    label: "Platforms",
    href: "/#platforms",
  },
  {
    label: "Partners",
    href: "/partnership",
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
    href: "/about",
    children: [
      { label: "Our Story", href: "/about#our-story" },
      { label: "Our Values", href: "/about#our-values" },
      { label: "Why Dominion", href: "/about#why-dominion" },
      { label: "How to Start", href: "/about#how-to-start" },
    ],
  },
];
