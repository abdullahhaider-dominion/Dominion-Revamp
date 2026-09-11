import Link from "next/link";
import { MarketAnalysisDesk } from "@/components/market-analysis/MarketAnalysisDesk";
import "@/styles/market-analysis.css";

export function MarketAnalysisPage() {
  return (
    <main className="analysis-page" id="top">
      <section className="analysis-hero" aria-labelledby="analysis-title">
        <div className="analysis-wrap">
          <nav className="analysis-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Market Analysis</span>
          </nav>
          <p className="analysis-eyebrow">London session</p>
          <h1 id="analysis-title">Market Analysis</h1>
          <p>
            Market analysis from the Dominion desk — gold and yen crosses,
            updated around the London session.
          </p>
          <MarketAnalysisDesk />
        </div>
      </section>
    </main>
  );
}
