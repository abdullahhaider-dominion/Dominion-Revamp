import { incentivePath } from "@/content/incentives";

export type SiteNavLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

export type SiteNavItem = {
  label: string;
  href?: string;
  openInNewTab?: boolean;
  children?: readonly SiteNavLink[];
};

const LIVE = "https://www.dominionmarkets.com";

export const SITE_NAV: readonly SiteNavItem[] = [
  {
    label: "Accounts",
    href: "/accounts",
  },
  {
    label: "IBs/Partners",
    href: "/partnership",
  },
  {
    label: "Incentives",
    children: [
      { label: "Leaderboard Challenge", href: incentivePath("leaderboard-challenge") },
      { label: "Commission", href: incentivePath("commission-incentives") },
      { label: "Copy Trading", href: incentivePath("copy-trading") },
      { label: "More Info", href: incentivePath("more-info") },
      { label: "Wall of Love", href: incentivePath("wall-of-love") },
    ],
  },
  {
    label: "Platforms",
    children: [
      {
        label: "Meta Trader 5",
        href: "https://download.mql5.com/cdn/web/dominion.markets.llc/mt5/dominionmarkets5setup.exe",
        openInNewTab: true,
      },
      {
        label: "Meta Trader 5 Web Trader",
        href: "/webterminal-mt5",
      },
      { label: "cTrader", href: "/ctrader" },
      {
        label: "cTrader Webterminal",
        href: "https://app.ctrader.com/",
        openInNewTab: true,
      },
    ],
  },
  {
    label: "Get Funded",
    href: "https://dominionfunding.trade/",
    openInNewTab: true,
  },
  {
    label: "Education",
    children: [
      { label: "Market Analysis", href: "/marketanalysis" },
      {
        label: "Best Times to Trade",
        href: `${LIVE}/before-you-trade-trading-sessions/`,
      },
      { label: "Pairs to Trade", href: "/education/pairs-to-trade" },
      { label: "Blog", href: `${LIVE}/blog/` },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
];

export const SITE_LOGIN_HREF = "https://app.dominionmarkets.com/en/login";
export const SITE_REGISTER_HREF = "https://app.dominionmarkets.com/";
