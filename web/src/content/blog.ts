export const BLOG_ASSET = "/assets/blog";

export type BlogCategory =
  | "Platforms"
  | "Forex"
  | "Risk"
  | "Market Insights"
  | "Commodities"
  | "Trading Psychology"
  | "Trading Fundamentals";

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  categoryLabel: string;
  minutes: number;
  publishedAt: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const BLOG_FILTERS = [
  { id: "all", label: "All articles" },
  { id: "Platforms", label: "Platforms" },
  { id: "Forex", label: "Forex" },
  { id: "Risk", label: "Risk" },
  { id: "Market Insights", label: "Market Insights" },
] as const;

export const BLOG_SORTS = [
  { id: "latest", label: "Latest" },
  { id: "oldest", label: "Oldest" },
  { id: "title", label: "Title" },
] as const;

export const BLOG_PAGE_SIZE = 6;

export const BLOG_ARTICLES: readonly BlogArticle[] = [
  {
    slug: "understanding-mt5-timeframes",
    title: "Understanding MT5 Timeframes",
    excerpt:
      "Learn how different timeframes work in MT5 and how to choose the right one for your trading style.",
    category: "Platforms",
    categoryLabel: "Platform Guides",
    minutes: 5,
    publishedAt: "2026-09-12",
    image: `${BLOG_ASSET}/featured-mt5-timeframes.png`,
    imageAlt: "Laptop showing an MT5 chart beside a watch and fountain pen",
    featured: true,
  },
  {
    slug: "managing-risk-before-you-trade",
    title: "Managing Risk Before You Trade",
    excerpt:
      "A practical look at position size, stops and how to protect your account before you enter a trade.",
    category: "Risk",
    categoryLabel: "Risk",
    minutes: 5,
    publishedAt: "2026-09-11",
    image: `${BLOG_ASSET}/risk-management-chess.png`,
    imageAlt: "Chess pieces on a dark board representing risk decisions",
    featured: true,
  },
  {
    slug: "how-to-read-candlestick-charts",
    title: "How to Read Candlestick Charts",
    excerpt:
      "Learn the building blocks of candlestick charts so you can read market structure with more confidence.",
    category: "Trading Fundamentals",
    categoryLabel: "Trading Fundamentals",
    minutes: 5,
    publishedAt: "2026-09-10",
    image: `${BLOG_ASSET}/candlestick-market-display.png`,
    imageAlt: "Candlestick chart displayed on a monitor",
    featured: true,
  },
  {
    slug: "how-to-add-indicators-on-mt5",
    title: "How to Add Indicators on MT5",
    excerpt:
      "A step-by-step guide to finding, adding and customising indicators in MT5.",
    category: "Platforms",
    categoryLabel: "Platform Guides",
    minutes: 5,
    publishedAt: "2026-09-09",
    image: `${BLOG_ASSET}/mt5-indicators-workstation.png`,
    imageAlt: "MT5 workstation with indicator charts on screen",
  },
  {
    slug: "a-guide-to-forex-currency-pairs",
    title: "A Guide to Forex Currency Pairs",
    excerpt:
      "Understand major, minor and exotic pairs and what moves them in the market.",
    category: "Forex",
    categoryLabel: "Forex",
    minutes: 5,
    publishedAt: "2026-09-08",
    image: `${BLOG_ASSET}/currency-symbols.png`,
    imageAlt: "Euro, dollar and yen symbols on a dark surface",
  },
  {
    slug: "trading-sessions-explained",
    title: "Trading Sessions Explained",
    excerpt:
      "Discover how global trading sessions work and what they mean for trading.",
    category: "Market Insights",
    categoryLabel: "Market Insights",
    minutes: 5,
    publishedAt: "2026-09-07",
    image: `${BLOG_ASSET}/trading-sessions-globe.png`,
    imageAlt: "World map showing connected global trading centres",
  },
  {
    slug: "gold-trading-the-fundamentals",
    title: "Gold Trading: The Fundamentals",
    excerpt:
      "Explore what drives gold prices and how traders approach this popular market.",
    category: "Commodities",
    categoryLabel: "Commodities",
    minutes: 5,
    publishedAt: "2026-09-06",
    image: `${BLOG_ASSET}/gold-fundamentals.png`,
    imageAlt: "Stacked gold bars",
  },
  {
    slug: "building-a-trading-plan",
    title: "Building a Trading Plan",
    excerpt:
      "Learn the key elements of a solid trading plan and how to put it into practice.",
    category: "Trading Psychology",
    categoryLabel: "Trading Psychology",
    minutes: 5,
    publishedAt: "2026-09-05",
    image: `${BLOG_ASSET}/trading-plan.png`,
    imageAlt: "Notebook labelled trading plan with a pen",
  },
  {
    slug: "understanding-leverage-and-margin",
    title: "Understanding Leverage and Margin",
    excerpt:
      "A clear explanation of leverage, margin and how to manage them responsibly.",
    category: "Risk",
    categoryLabel: "Risk",
    minutes: 5,
    publishedAt: "2026-09-04",
    image: `${BLOG_ASSET}/leverage-margin-architecture.png`,
    imageAlt: "Glass office towers representing structured market risk",
  },
  {
    slug: "mt5-order-types-explained",
    title: "MT5 Order Types Explained",
    excerpt:
      "Market, limit, stop and pending orders — when each one is useful and when it is not.",
    category: "Platforms",
    categoryLabel: "Platform Guides",
    minutes: 6,
    publishedAt: "2026-09-03",
    image: `${BLOG_ASSET}/mt5-indicators-workstation.png`,
    imageAlt: "Trading workstation used to place MT5 orders",
  },
  {
    slug: "what-moves-the-us-dollar",
    title: "What Moves the US Dollar",
    excerpt:
      "Rates, data and risk appetite — the main forces that show up in USD pairs.",
    category: "Forex",
    categoryLabel: "Forex",
    minutes: 6,
    publishedAt: "2026-09-02",
    image: `${BLOG_ASSET}/currency-symbols.png`,
    imageAlt: "Currency symbols representing the US dollar complex",
  },
  {
    slug: "how-to-size-a-position",
    title: "How to Size a Position",
    excerpt:
      "A simple framework for choosing lot size from your stop distance and risk amount.",
    category: "Risk",
    categoryLabel: "Risk",
    minutes: 4,
    publishedAt: "2026-09-01",
    image: `${BLOG_ASSET}/risk-management-chess.png`,
    imageAlt: "Chess pieces used as a metaphor for position sizing",
  },
  {
    slug: "reading-the-economic-calendar",
    title: "Reading the Economic Calendar",
    excerpt:
      "How to scan the week’s events and decide which releases actually matter for your pairs.",
    category: "Market Insights",
    categoryLabel: "Market Insights",
    minutes: 5,
    publishedAt: "2026-08-30",
    image: `${BLOG_ASSET}/trading-sessions-globe.png`,
    imageAlt: "Global map used to illustrate market-moving events",
  },
  {
    slug: "support-and-resistance-basics",
    title: "Support and Resistance Basics",
    excerpt:
      "How traders mark levels, why they hold or break, and how to avoid forcing a story onto the chart.",
    category: "Trading Fundamentals",
    categoryLabel: "Trading Fundamentals",
    minutes: 5,
    publishedAt: "2026-08-28",
    image: `${BLOG_ASSET}/candlestick-market-display.png`,
    imageAlt: "Candlestick chart used to illustrate support and resistance",
  },
  {
    slug: "keeping-a-trading-journal",
    title: "Keeping a Trading Journal",
    excerpt:
      "What to record after each trade so you can review decisions instead of only results.",
    category: "Trading Psychology",
    categoryLabel: "Trading Psychology",
    minutes: 4,
    publishedAt: "2026-08-26",
    image: `${BLOG_ASSET}/trading-plan.png`,
    imageAlt: "Notebook used as a trading journal",
  },
  {
    slug: "customising-mt5-charts",
    title: "Customising MT5 Charts",
    excerpt:
      "Colours, templates and layouts that make it easier to read price without extra noise.",
    category: "Platforms",
    categoryLabel: "Platform Guides",
    minutes: 5,
    publishedAt: "2026-08-24",
    image: `${BLOG_ASSET}/featured-mt5-timeframes.png`,
    imageAlt: "MT5 chart layout ready for customisation",
  },
  {
    slug: "trading-the-london-new-york-overlap",
    title: "Trading the London–New York Overlap",
    excerpt:
      "Why this window is often the most active of the day, and how to plan around it.",
    category: "Market Insights",
    categoryLabel: "Market Insights",
    minutes: 5,
    publishedAt: "2026-08-22",
    image: `${BLOG_ASSET}/trading-sessions-globe.png`,
    imageAlt: "World map highlighting overlapping trading sessions",
  },
  {
    slug: "majors-vs-exotics",
    title: "Majors vs Exotics",
    excerpt:
      "Spread, liquidity and session behaviour — how major pairs differ from thinner exotic markets.",
    category: "Forex",
    categoryLabel: "Forex",
    minutes: 5,
    publishedAt: "2026-08-20",
    image: `${BLOG_ASSET}/currency-symbols.png`,
    imageAlt: "Currency symbols representing major and exotic pairs",
  },
  {
    slug: "stop-losses-that-make-sense",
    title: "Stop Losses That Make Sense",
    excerpt:
      "Place stops from structure and volatility, not from a round number that feels comfortable.",
    category: "Risk",
    categoryLabel: "Risk",
    minutes: 5,
    publishedAt: "2026-08-18",
    image: `${BLOG_ASSET}/leverage-margin-architecture.png`,
    imageAlt: "Structured city architecture used as a metaphor for stops",
  },
  {
    slug: "why-gold-moves-with-the-dollar",
    title: "Why Gold Moves with the Dollar",
    excerpt:
      "The inverse relationship traders watch, and when gold decouples from USD strength.",
    category: "Commodities",
    categoryLabel: "Commodities",
    minutes: 5,
    publishedAt: "2026-08-16",
    image: `${BLOG_ASSET}/gold-fundamentals.png`,
    imageAlt: "Gold bars representing the gold–dollar relationship",
  },
  {
    slug: "reviewing-trades-without-hindsight",
    title: "Reviewing Trades Without Hindsight",
    excerpt:
      "A process for judging the decision you actually had, not the candle that printed afterwards.",
    category: "Trading Psychology",
    categoryLabel: "Trading Psychology",
    minutes: 4,
    publishedAt: "2026-08-14",
    image: `${BLOG_ASSET}/trading-plan.png`,
    imageAlt: "Trading plan notebook used for an honest trade review",
  },
];

export const BLOG_FEATURED = BLOG_ARTICLES.filter((article) => article.featured);

export function articleHref(slug: string) {
  return `/blog/${slug}`;
}
