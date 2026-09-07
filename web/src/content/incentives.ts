export const INCENTIVES_PAGES = [
  {
    slug: "leaderboard-challenge",
    title: "Leaderboard Challenge",
  },
  {
    slug: "commission-incentives",
    title: "Commission Incentives",
  },
  {
    slug: "copy-trading",
    title: "Copy Trading",
  },
  {
    slug: "more-info",
    title: "More Info",
  },
  {
    slug: "wall-of-love",
    title: "Wall of Love",
  },
] as const;

export type IncentiveSlug = (typeof INCENTIVES_PAGES)[number]["slug"];

export function incentivePath(slug: IncentiveSlug): `/incentives/${IncentiveSlug}` {
  return `/incentives/${slug}`;
}
