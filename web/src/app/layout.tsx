import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dominion Markets — Floating Sanctuary UI Mockup",
  description:
    "Hi-fi UI mockup for Dominion Markets Floating Sanctuary homepage redesign.",
  icons: {
    icon: "/assets/logo/logo-isotype-app.png",
    apple: "/assets/logo/logo-isotype-app.png",
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
      className={`${inter.variable} ${montserrat.variable} ${poppins.variable}`}
    >
      <head>
        {/* Served from /public so Tailwind PostCSS does not rewrite mockup CSS */}
        <link rel="stylesheet" href="/mockups.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
