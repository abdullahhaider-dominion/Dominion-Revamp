import { siteFooterHtml } from "@/content/shared-footer-html";

export function SiteFooter() {
  return (
    <div
      className="page-root"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: siteFooterHtml }}
    />
  );
}
