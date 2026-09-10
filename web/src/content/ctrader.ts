export type CTraderDownload = {
  id: "web" | "ios" | "android" | "macos" | "windows";
  label: string;
  href: string;
  primary?: boolean;
  dock: "always" | "more";
};

export type CTraderModule = {
  id: string;
  title: string;
  body: string;
};

export type CTraderFaq = {
  id: string;
  question: string;
  answer: string;
};

export const CTRADER_VIDEO =
  "https://www.youtube-nocookie.com/embed/vQSyoQ20y58";

export const CTRADER_DOWNLOADS: readonly CTraderDownload[] = [
  {
    id: "web",
    label: "Web terminal",
    href: "https://app.ctrader.com/",
    primary: true,
    dock: "always",
  },
  {
    id: "ios",
    label: "iOS",
    href: "https://apps.apple.com/ae/app/dominion-markets-ctrader/id6477392582",
    dock: "always",
  },
  {
    id: "android",
    label: "Android",
    href: "https://www.dominionmarkets.com/ctrader/files/com.dominion.app.apk",
    dock: "always",
  },
  {
    id: "macos",
    label: "macOS",
    href: "https://getctradermac.com/dominionmarkets/ctrader-dominionmarkets-setup.dmg",
    dock: "more",
  },
  {
    id: "windows",
    label: "Windows",
    href: "https://getctrader.com/dominionmarkets/ctrader-dominionmarkets-setup.exe",
    dock: "more",
  },
];

export const CTRADER_WATCHLIST = [
  { pair: "XAUUSD", change: "+0.42", up: true },
  { pair: "EURUSD", change: "-0.08", up: false },
  { pair: "GBPJPY", change: "+0.21", up: true },
  { pair: "BTCUSD", change: "+1.14", up: true },
] as const;

export const CTRADER_PROOF = [
  { value: "1.0", label: "pip spreads" },
  { value: "500:1", label: "leverage" },
  { value: "~30ms", label: "executions" },
  { value: "200+", label: "instruments" },
] as const;

export const CTRADER_MODULES: readonly CTraderModule[] = [
  {
    id: "charting",
    title: "Advanced charting",
    body: "A wide range of technical indicators and drawing tools for a clearer read of the market.",
  },
  {
    id: "execution",
    title: "Fast execution",
    body: "Lightning-fast order execution, built to reduce latency and slippage.",
  },
  {
    id: "dom",
    title: "Transparent pricing and DoM",
    body: "Transparent pricing with Depth of Market data so you can see liquidity as you decide.",
  },
  {
    id: "interface",
    title: "User-friendly interface",
    body: "Personalize layout, colors, and chart settings so the desk fits how you trade.",
  },
  {
    id: "one-click",
    title: "One-click trading",
    body: "Execute trades swiftly with one-click trading from the chart or ticket.",
  },
  {
    id: "calgo",
    title: "cAlgo integration",
    body: "Algorithmic trading, backtesting, and deployment through cAlgo.",
  },
  {
    id: "ndd",
    title: "No dealing desk",
    body: "Direct market access that helps reduce trading costs and improve execution speed.",
  },
  {
    id: "detach",
    title: "Detachable charts",
    body: "Detach charts and move them across screens if you work on more than one monitor.",
  },
  {
    id: "risk",
    title: "Risk management tools",
    body: "Built-in stop loss and take profit orders to help you manage risk on every trade.",
  },
];

export const CTRADER_FAQS: readonly CTraderFaq[] = [
  {
    id: "best",
    question: "Why is cTrader considered the best trading platform at Dominion Markets?",
    answer:
      "cTrader stands out for its intuitive interface, advanced charting tools, and transparent pricing, offering a seamless trading experience.",
  },
  {
    id: "superior",
    question: "What makes cTrader superior to other trading platforms?",
    answer:
      "One-click trading, comprehensive charting, and transparent market depth give you more control and a clearer view of the book.",
  },
  {
    id: "efficiency",
    question: "How does cTrader enhance trading efficiency?",
    answer:
      "Fast order execution and a customizable interface let you act quickly and keep the workspace the way you work.",
  },
  {
    id: "analysis",
    question: "What advantages does cTrader offer for technical analysis?",
    answer:
      "An extensive range of technical indicators and drawing tools supports thorough analysis before you place an order.",
  },
  {
    id: "resources",
    question: "Does cTrader provide access to advanced trading resources?",
    answer:
      "At Dominion Markets you also get educational materials, market insights, and analysis to stay informed.",
  },
  {
    id: "support",
    question: "How does Dominion Markets support traders using cTrader?",
    answer:
      "Responsive customer service and ongoing platform updates so you have the tools and knowledge you need.",
  },
  {
    id: "levels",
    question: "Is cTrader suitable for both beginner and experienced traders?",
    answer:
      "The interface is accessible for beginners, while advanced features serve experienced traders.",
  },
  {
    id: "devices",
    question: "Can I access cTrader on different devices?",
    answer:
      "Yes. Desktop, web, and mobile — so you can open the same desk on the device in front of you.",
  },
];
