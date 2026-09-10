import { homeHtml } from "@/content/home-html";

const footerStart = homeHtml.lastIndexOf('<footer class="site-footer"');
const footerEnd =
  footerStart >= 0 ? homeHtml.indexOf("</footer>", footerStart) + "</footer>".length : -1;

export const siteFooterHtml =
  footerStart >= 0 && footerEnd > footerStart
    ? homeHtml
        .slice(footerStart, footerEnd)
        .replaceAll('href="#', 'href="/#')
        .replaceAll('href="/#faqs"', 'href="/faqs"')
        .replaceAll('href="/#contact"', 'href="/contact"')
        .replaceAll('href="/#legal"', 'href="/legal-documents"')
        .replaceAll('href="/#careers"', 'href="/careers"')
        .replace(
          '<a href="/#platforms">cTrader<span aria-hidden="true">›</span></a>',
          '<a href="/ctrader">cTrader<span aria-hidden="true">›</span></a>',
        )
        .replace(
          '<a href="/#platforms">cTrader iOS<span aria-hidden="true">›</span></a>',
          '<a href="https://apps.apple.com/ae/app/dominion-markets-ctrader/id6477392582">cTrader iOS<span aria-hidden="true">›</span></a>',
        )
        .replace(
          '<a href="/#platforms">cTrader Android<span aria-hidden="true">›</span></a>',
          '<a href="https://www.dominionmarkets.com/ctrader/files/com.dominion.app.apk">cTrader Android<span aria-hidden="true">›</span></a>',
        )
    : "";

export const homeBodyHtml =
  footerStart >= 0 && footerEnd > footerStart
    ? `${homeHtml.slice(0, footerStart)}${homeHtml.slice(footerEnd)}`
    : homeHtml;
