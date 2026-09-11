export const MT5_WEBTERMINAL_SRC =
  "https://webtrader.dominionmarkets.com/terminal?version=&lang=en&save_password=off";

export const MT5_MARK = "/assets/Mt5-webtrader-page/mt5-mark.png";

export type Mt5Install = {
  id: "desktop" | "ios" | "android";
  label: string;
  href: string;
};

export const MT5_INSTALLS: readonly Mt5Install[] = [
  {
    id: "desktop",
    label: "Desktop",
    href: "https://download.mql5.com/cdn/web/dominion.markets.llc/mt5/dominionmarkets5setup.exe",
  },
  {
    id: "ios",
    label: "iOS",
    href: "https://download.mql5.com/cdn/mobile/mt5/ios?server=DominionMarkets-Live",
  },
  {
    id: "android",
    label: "Android",
    href: "https://download.mql5.com/cdn/mobile/mt5/android?server=DominionMarkets-Live",
  },
];
