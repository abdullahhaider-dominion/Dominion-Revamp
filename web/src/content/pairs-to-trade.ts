export const PTT_ASSET = "/assets/pairs-to-trade";
export const PTT_ICON = `${PTT_ASSET}/icons`;

export type SessionLayout = "image-end" | "image-start";

export type PairSession = {
  id: string;
  number: string;
  label: string;
  title: string;
  kicker: string;
  body: string;
  times: string;
  pickerIcon: "globe" | "landmark" | "chart";
  pickerCopy: string;
  pairs: readonly string[];
  cautionPairs: readonly string[];
  caution: string;
  image: string;
  imageAlt: string;
  captionCity: string;
  captionLine: string;
  layout: SessionLayout;
};

export const PAIR_SESSIONS: readonly PairSession[] = [
  {
    id: "asian",
    number: "01",
    label: "Asian Session",
    title: "Asian Session",
    kicker: "A calm start to the trading week",
    body: "The Asian session has the lowest volume of the three sessions. It is important to understand which major currencies are open at this point — AUD, NZD and JPY. Pairs like GBPJPY, EURJPY and USDJPY also have volume because they are only being influenced by the yen; GBP, EUR and USD are closed. AUDJPY and NZDJPY are influenced by both currencies, so they generally need one side strong or weak and the other stable.",
    times: "00:00 – 09:00",
    pickerIcon: "globe",
    pickerCopy: "A calm start with unique opportunities.",
    pairs: ["GBPJPY", "EURJPY", "USDJPY", "AUDJPY", "NZDJPY"],
    cautionPairs: ["EURUSD", "USDCAD"],
    caution: "These pairs generally consolidate because both currencies are closed.",
    image: `${PTT_ASSET}/asia-session.png`,
    imageAlt: "Pagoda in misted mountains representing the Asian session",
    captionCity: "Asia",
    captionLine: "Discipline creates opportunity",
    layout: "image-end",
  },
  {
    id: "london",
    number: "02",
    label: "London Session",
    title: "London Session",
    kicker: "The most liquid session",
    body: "This is a volatile session with excellent opportunities. The main currencies moving the market are GBP, EUR and CHF, so pairs like GBPJPY, EURJPY, EURUSD and GBPUSD typically see a lot of volume. EURGBP has two open currencies — it needs one side really strong or really weak, or it is likely to range. Trading USDJPY or USDCAD on 30-minute to 4-hour timeframes is not good practice here because both currencies are closed.",
    times: "08:00 – 17:00",
    pickerIcon: "landmark",
    pickerCopy: "The most liquid session with major movements.",
    pairs: ["GBPJPY", "EURJPY", "EURUSD", "GBPUSD"],
    cautionPairs: ["EURGBP", "USDJPY", "USDCAD"],
    caution: "EURGBP needs a clear imbalance. USDJPY and USDCAD are closed on both sides.",
    image: `${PTT_ASSET}/london-session.png`,
    imageAlt: "London skyline with Big Ben and the London Eye",
    captionCity: "London",
    captionLine: "Liquidity delivers possibilities",
    layout: "image-start",
  },
  {
    id: "newyork",
    number: "03",
    label: "New York Session",
    title: "New York Session",
    kicker: "High activity and key market moves",
    body: "This session has the most volume, largely because London is still open. USD and CAD are the New York currencies. GBPUSD and EURUSD get trickier because both sides can be open, so they need one currency really strong and the other really weak. Pairs like GBPJPY, EURJPY, USDJPY, Gold and US30 are often easier to trade. GBPUSD and GBPJPY will not always move the same as they would in London.",
    times: "13:00 – 22:00",
    pickerIcon: "chart",
    pickerCopy: "High activity and key market moves.",
    pairs: ["GBPJPY", "EURJPY", "USDJPY", "XAUUSD", "US30"],
    cautionPairs: ["GBPUSD", "EURUSD"],
    caution: "Both sides can be open, so these pairs need a clear imbalance to travel.",
    image: `${PTT_ASSET}/new-york-session.png`,
    imageAlt: "New York skyline with the Empire State Building",
    captionCity: "New York",
    captionLine: "Momentum fuels markets",
    layout: "image-end",
  },
] as const;
