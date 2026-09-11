import { siteFooterHtml } from "@/content/shared-footer-html";
import "@/styles/site-footer.css";

export function SiteFooter() {
  return (
    <div
      className="page-root"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: siteFooterHtml }}
    />
  );
}
