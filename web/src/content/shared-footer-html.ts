import { incentivePath } from "@/content/incentives";
import { homeHtml } from "@/content/home-html";

const LIVE = "https://www.dominionmarkets.com";
const MT5_DESKTOP =
  "https://download.mql5.com/cdn/web/dominion.markets.llc/mt5/dominionmarkets5setup.exe";
const MT5_IOS =
  "https://download.mql5.com/cdn/mobile/mt5/ios?server=DominionMarkets-Live";
const MT5_ANDROID =
  "https://download.mql5.com/cdn/mobile/mt5/android?server=DominionMarkets-Live";
const CTRADER_IOS =
  "https://apps.apple.com/ae/app/dominion-markets-ctrader/id6477392582";
const CTRADER_ANDROID =
  "https://getctrader.com/spotware/mobile/com.spotware.ct.apk";

const footerStart = homeHtml.lastIndexOf('<footer class="site-footer"');
const footerEnd =
  footerStart >= 0 ? homeHtml.indexOf("</footer>", footerStart) + "</footer>".length : -1;

function applyFooterHrefs(html: string): string {
  const replacements: readonly [string, string][] = [
    ['href="#top"', 'href="/"'],
    [
      'class="site-footer__register" href="#accounts"',
      'class="site-footer__register" href="https://app.dominionmarkets.com/register"',
    ],
    ['href="#about"', 'href="/about"'],
    ['href="#faqs"', 'href="/faqs"'],
    ['href="#contact"', 'href="/contact"'],
    ['href="#legal"', 'href="/legal-documents"'],
    ['href="#accounts">Accounts overview', 'href="/accounts">Accounts overview'],
    [
      'href="#ecosystem">Commission incentives',
      `href="${incentivePath("commission-incentives")}">Commission incentives`,
    ],
    [
      'href="#copy-trading">Copy Trading and Social Trading',
      `href="${incentivePath("copy-trading")}">Copy Trading and Social Trading`,
    ],
    ['href="#accounts">Open an account', 'href="/accounts">Open an account'],
    [
      'href="#dashboard">Client area',
      'href="https://app.dominionmarkets.com/en/login">Client area',
    ],
    [
      'href="#markets">Market Analysis',
      `href="${LIVE}/marketanalysis/">Market Analysis`,
    ],
    [
      'href="#sessions">Best times to trade',
      `href="${LIVE}/before-you-trade-trading-sessions/">Best times to trade`,
    ],
    [
      'href="#markets">Pairs to trade',
      `href="${LIVE}/pairs-to-trade/">Pairs to trade`,
    ],
    ['href="#blogs">Blogs', `href="${LIVE}/blog/">Blogs`],
    ['href="#careers"', 'href="/careers"'],
    [
      'href="#platforms">Meta Trader 5<span',
      `href="${MT5_DESKTOP}" target="_blank" rel="noopener noreferrer">Meta Trader 5<span`,
    ],
    [
      'href="#platforms">Meta Trader 5 Web Trader<span',
      `href="${LIVE}/webterminal-mt5/">Meta Trader 5 Web Trader<span`,
    ],
    [
      'href="#platforms">Meta Trader 5 iOS<span',
      `href="${MT5_IOS}" target="_blank" rel="noopener noreferrer">Meta Trader 5 iOS<span`,
    ],
    [
      'href="#platforms">Meta Trader 5 Android<span',
      `href="${MT5_ANDROID}" target="_blank" rel="noopener noreferrer">Meta Trader 5 Android<span`,
    ],
    ['href="#platforms">cTrader<span', 'href="/ctrader">cTrader<span'],
    [
      'href="#platforms">cTrader iOS<span',
      `href="${CTRADER_IOS}" target="_blank" rel="noopener noreferrer">cTrader iOS<span`,
    ],
    [
      'href="#platforms">cTrader Android<span',
      `href="${CTRADER_ANDROID}" target="_blank" rel="noopener noreferrer">cTrader Android<span`,
    ],
    [
      'href="https://www.instagram.com/"',
      'href="https://www.instagram.com/dominionmarkets/"',
    ],
    ['href="https://x.com/"', 'href="https://x.com/DominionMktsLLC"'],
    [
      'href="https://www.youtube.com/"',
      'href="https://www.youtube.com/@DominionMarkets"',
    ],
  ];

  let next = html;
  for (const [from, to] of replacements) {
    next = next.replaceAll(from, to);
  }
  return next;
}

export const siteFooterHtml =
  footerStart >= 0 && footerEnd > footerStart
    ? applyFooterHrefs(homeHtml.slice(footerStart, footerEnd))
    : "";

export const homeBodyHtml =
  footerStart >= 0 && footerEnd > footerStart
    ? `${homeHtml.slice(0, footerStart)}${homeHtml.slice(footerEnd)}`
    : homeHtml;
