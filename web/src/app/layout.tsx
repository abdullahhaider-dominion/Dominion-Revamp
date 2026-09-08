import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

/** Body / UI copy — matches homepage */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

/** Headings / CTAs — matches homepage */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = "https://dominion-revamp.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dominion Markets | Your Trading Sanctuary",
    template: "%s | Dominion Markets",
  },
  description:
    "Trade with clarity on MT5 and cTrader. Regulated brokerage with transparent conditions, fast execution, and global market access.",
  applicationName: "Dominion Markets",
  keywords: [
    "Dominion Markets",
    "forex",
    "CFD trading",
    "MT5",
    "cTrader",
    "regulated broker",
  ],
  authors: [{ name: "Dominion Markets" }],
  creator: "Dominion Markets",
  publisher: "Dominion Markets",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/logo/logo-isotype-app.png", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/assets/logo/logo-isotype.png", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dominion Markets",
    title: "Dominion Markets | Your Trading Sanctuary",
    description:
      "Trade with clarity on MT5 and cTrader. Regulated brokerage with transparent conditions, fast execution, and global market access.",
    images: [
      {
        url: "/og-share.png",
        width: 1200,
        height: 630,
        alt: "Dominion Markets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominion Markets | Your Trading Sanctuary",
    description:
      "Trade with clarity on MT5 and cTrader. Regulated brokerage with transparent conditions, fast execution, and global market access.",
    images: ["/og-share.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable}`}
    >
      <head>
        {/* Served from /public so Tailwind PostCSS does not rewrite mockup CSS */}
        <link rel="stylesheet" href="/mockups.css" />
      </head>
      <body className={montserrat.className}>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
