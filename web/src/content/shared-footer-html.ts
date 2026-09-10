import { homeHtml } from "@/content/home-html";

const footerStart = homeHtml.lastIndexOf('<footer class="site-footer"');
const footerEnd =
  footerStart >= 0 ? homeHtml.indexOf("</footer>", footerStart) + "</footer>".length : -1;

export const siteFooterHtml =
  footerStart >= 0 && footerEnd > footerStart
    ? homeHtml
        .slice(footerStart, footerEnd)
        .replaceAll('href="#', 'href="/#')
        .replaceAll('href="/#contact"', 'href="/contact"')
    : "";

export const homeBodyHtml =
  footerStart >= 0 && footerEnd > footerStart
    ? `${homeHtml.slice(0, footerStart)}${homeHtml.slice(footerEnd)}`
    : homeHtml;
