export const BTT_ASSET = "/assets/best-times-to-trade";

export const BTT_HOURS = [
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
  "24:00",
] as const;

export type SessionLayout = "image-end" | "image-start";

export type MarketSession = {
  id: string;
  number: string;
  label: string;
  title: string;
  kicker: string;
  body: string;
  times: string;
  volume: string;
  characteristics: readonly string[];
  image: string;
  imageAlt: string;
  captionCity: string;
  captionLine: string;
  layout: SessionLayout;
  bar: {
    startHour: number;
    endHour: number;
    tone: "asia" | "london" | "newyork";
  };
};

export const MARKET_SESSIONS: readonly MarketSession[] = [
  {
    id: "asian",
    number: "01",
    label: "Asian Session",
    title: "Asian Session",
    kicker: "A calm start to the trading week",
    body: "The Asian session begins the trading week and is characterised by relatively lower volatility. It is often driven by economic news from the Asia-Pacific region and can offer opportunities in certain currency pairs, such as those involving the Japanese yen.",
    times: "00:00 – 09:00",
    volume: "Generally lower",
    characteristics: [
      "Lower volatility compared to London / New York",
      "Influenced by Asia-Pacific news",
      "Opportunities in JPY pairs",
    ],
    image: `${BTT_ASSET}/asia-session.png`,
    imageAlt: "Pagoda in misted mountains representing the Asian session",
    captionCity: "Asia",
    captionLine: "Discipline creates opportunity",
    layout: "image-end",
    bar: { startHour: 0, endHour: 9, tone: "asia" },
  },
  {
    id: "london",
    number: "02",
    label: "London Session",
    title: "London Session",
    kicker: "The most liquid session",
    body: "The London session brings a significant increase in trading activity as European markets open. It is usually the most liquid session, with wider participation from institutional traders and more frequent price movements.",
    times: "08:00 – 17:00",
    volume: "High",
    characteristics: [
      "Highest liquidity of the day",
      "Driven by European economic news",
      "Often sets the day's trading tone",
    ],
    image: `${BTT_ASSET}/london-session.png`,
    imageAlt: "London skyline with Big Ben and the London Eye",
    captionCity: "London",
    captionLine: "Liquidity delivers possibilities",
    layout: "image-start",
    bar: { startHour: 8, endHour: 17, tone: "london" },
  },
  {
    id: "newyork",
    number: "03",
    label: "New York Session",
    title: "New York Session",
    kicker: "High activity and key market moves",
    body: "The New York session opens as the London session is still active, creating a period of increased volatility and opportunity. Major U.S. economic data releases often occur during this time, which can lead to significant price movements.",
    times: "13:00 – 22:00",
    volume: "High (especially during London overlap)",
    characteristics: [
      "High volatility and trading activity",
      "Influenced by U.S. economic news",
      "Overlaps with London (13:00 – 17:00)",
    ],
    image: `${BTT_ASSET}/new-york-session.png`,
    imageAlt: "New York skyline with the Empire State Building",
    captionCity: "New York",
    captionLine: "Momentum fuels markets",
    layout: "image-end",
    bar: { startHour: 13, endHour: 22, tone: "newyork" },
  },
] as const;

export const SESSION_OVERLAP = {
  label: "London & New York Overlap",
  times: "13:00 – 17:00",
  startHour: 13,
  endHour: 17,
} as const;

export function hourToPercent(hour: number) {
  return (hour / 24) * 100;
}
