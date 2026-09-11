import Image from "next/image";
import Link from "next/link";
import {
  MT5_INSTALLS,
  MT5_MARK,
  MT5_WEBTERMINAL_SRC,
} from "@/content/webterminal-mt5";
import "@/styles/webterminal-mt5.css";

export function Mt5WebTraderPage() {
  return (
    <main className="mt5web-page" id="top">
      <section className="mt5web-desk" aria-labelledby="mt5web-title">
        <div className="mt5web-wrap mt5web-desk__grid">
          <div className="mt5web-copy">
            <nav className="mt5web-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>MT5 Web Trader</span>
            </nav>
            <div className="mt5web-mark">
              <Image
                src={MT5_MARK}
                alt=""
                width={48}
                height={48}
              />
              <p className="mt5web-eyebrow">In the browser</p>
            </div>
            <h1 id="mt5web-title">MT5 Web Trader</h1>
            <p>
              Open your Dominion desk in the browser — no install required.
              Charts, orders, and accounts stay in the official MetaTrader 5
              WebTerminal.
            </p>
            <div className="mt5web-chips">
              {MT5_INSTALLS.map((item) => (
                <a
                  key={item.id}
                  className="mt5web-chip"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt5web-stage">
            <div className="mt5web-pane mt5web-glass">
              <header className="mt5web-pane__bar">
                <span className="mt5web-pane__dots" aria-hidden="true" />
                <h2>WebTerminal</h2>
              </header>
              <iframe
                className="mt5web-frame"
                src={MT5_WEBTERMINAL_SRC}
                title="MetaTrader 5 WebTerminal"
                allow="fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
