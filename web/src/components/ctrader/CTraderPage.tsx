import Image from "next/image";
import Link from "next/link";
import { CTraderDock } from "@/components/ctrader/CTraderDock";
import {
  CTRADER_FAQS,
  CTRADER_MODULES,
  CTRADER_PROOF,
  CTRADER_VIDEO,
  CTRADER_WATCHLIST,
} from "@/content/ctrader";
import "@/styles/ctrader.css";

function ChartPane() {
  const candles = [
    [92, 150, 136, 104],
    [78, 140, 120, 86],
    [70, 132, 98, 78],
    [74, 146, 82, 128],
    [58, 128, 118, 68],
    [48, 118, 76, 56],
    [44, 112, 62, 96],
    [40, 108, 92, 52],
    [36, 102, 64, 46],
    [42, 120, 50, 108],
    [38, 110, 98, 54],
    [30, 96, 60, 40],
  ];

  return (
    <article className="ctrader-pane ctrader-pane--chart">
      <header className="ctrader-pane__bar">
        <span className="ctrader-pane__dots" aria-hidden="true" />
        <h2>XAUUSD</h2>
        <span>Indicative</span>
      </header>
      <svg
        className="ctrader-chart"
        viewBox="0 0 360 168"
        role="img"
        aria-label="Indicative candlestick chart"
      >
        {candles.map(([low, high, open, close], index) => {
          const x = 16 + index * 28;
          const up = close < open;
          return (
            <g key={x} fill={up ? "#47bd68" : "#8aa0b3"}>
              <rect x={x + 6} y={low} width="2" height={high - low} />
              <rect
                x={x}
                y={Math.min(open, close)}
                width="14"
                height={Math.max(10, Math.abs(close - open))}
                rx="1.5"
              />
            </g>
          );
        })}
      </svg>
    </article>
  );
}

function WatchPane() {
  return (
    <article className="ctrader-pane ctrader-pane--watch">
      <header className="ctrader-pane__bar">
        <span className="ctrader-pane__dots" aria-hidden="true" />
        <h2>Watchlist</h2>
        <span>Indicative</span>
      </header>
      <ul>
        {CTRADER_WATCHLIST.map((row) => (
          <li key={row.pair}>
            <span>{row.pair}</span>
            <b className={row.up ? "is-up" : "is-down"}>{row.change}</b>
          </li>
        ))}
      </ul>
    </article>
  );
}

function TicketPane() {
  return (
    <article className="ctrader-pane ctrader-pane--ticket">
      <header className="ctrader-pane__bar">
        <span className="ctrader-pane__dots" aria-hidden="true" />
        <h2>Order ticket</h2>
        <span>Layout only</span>
      </header>
      <div className="ctrader-ticket" aria-hidden="true">
        <span>1.00 lot</span>
        <div>
          <span className="ctrader-ticket__sell">Sell</span>
          <span className="ctrader-ticket__buy">Buy</span>
        </div>
      </div>
    </article>
  );
}

export function CTraderPage() {
  const ticker = [...CTRADER_PROOF, ...CTRADER_PROOF];

  return (
    <main className="ctrader-page" id="top">
      <div className="ctrader-atmosphere" aria-hidden="true">
        <Image
          src="/assets/Ctrader-page/ctrader-hero-banner.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="ctrader-cover"
        />
        <div className="ctrader-atmosphere__fade" />
      </div>

      <section className="ctrader-hero" aria-labelledby="ctrader-title">
        <div className="ctrader-wrap">
          <nav className="ctrader-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>cTrader</span>
          </nav>
          <div className="ctrader-hero__copy">
            <p className="ctrader-eyebrow">Your desk</p>
            <div className="ctrader-mark">
              <Image
                src="/assets/Ctrader-page/ctrader-mark.png"
                alt=""
                width={36}
                height={36}
              />
              <h1 id="ctrader-title">cTrader</h1>
            </div>
            <p>
              Download cTrader and trade from a clearer desk with Dominion
              Markets. Advanced charting, fast execution, and transparent
              pricing — on desktop, web, and mobile.
            </p>
          </div>
          <div className="ctrader-workspace">
            <ChartPane />
            <WatchPane />
            <TicketPane />
          </div>
          <CTraderDock />
        </div>
      </section>

      <div className="ctrader-flow">
        <section className="ctrader-body" aria-labelledby="ctrader-modules-title">
          <div className="ctrader-wrap">
            <header className="ctrader-section-head">
              <p className="ctrader-eyebrow">The workspace</p>
              <h2 id="ctrader-modules-title">Why traders open cTrader here</h2>
              <p>
                cTrader is built for Forex, stocks, CFDs, and cryptocurrencies.
                These are the modules on the desk — not a grid of generic
                promises.
              </p>
            </header>
            <div className="ctrader-modules">
              {CTRADER_MODULES.map((module) => (
                <article className="ctrader-module" key={module.id}>
                  <header className="ctrader-pane__bar">
                    <span className="ctrader-pane__dots" aria-hidden="true" />
                    <h3>{module.title}</h3>
                  </header>
                  <p>{module.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ctrader-cinema" aria-labelledby="ctrader-video-title">
          <div className="ctrader-wrap">
            <header className="ctrader-section-head">
              <p className="ctrader-eyebrow">See the desk</p>
              <h2 id="ctrader-video-title">A short walk through cTrader</h2>
            </header>
            <div className="ctrader-video">
              <iframe
                src={CTRADER_VIDEO}
                title="cTrader walkthrough"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <div className="ctrader-ticker" aria-label="Platform figures">
          <div className="ctrader-ticker__track">
            {ticker.map((item, index) => (
              <span key={`${item.value}-${index}`}>
                <b>{item.value}</b> {item.label}
              </span>
            ))}
          </div>
        </div>

        <section className="ctrader-why" aria-labelledby="ctrader-why-title">
          <div className="ctrader-wrap ctrader-why__inner">
            <div>
              <p className="ctrader-eyebrow">With Dominion</p>
              <h2 id="ctrader-why-title">Why trade on cTrader with us</h2>
            </div>
            <p>
              We are a licensed brokerage dedicated to the tools you actually
              use. Education, market resources, and a desk on cTrader — the
              platform we believe is the future of how this work feels.
            </p>
          </div>
        </section>

        <section className="ctrader-faqs" aria-labelledby="ctrader-faq-title">
          <div className="ctrader-wrap">
            <header className="ctrader-section-head">
              <p className="ctrader-eyebrow">Questions</p>
              <h2 id="ctrader-faq-title">cTrader FAQs</h2>
            </header>
            <div className="ctrader-faq-list">
              {CTRADER_FAQS.map((item) => (
                <details className="ctrader-faq" key={item.id}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="ctrader-close" aria-labelledby="ctrader-close-title">
          <div className="ctrader-wrap ctrader-close__inner">
            <div>
              <p className="ctrader-eyebrow">Open the desk</p>
              <h2 id="ctrader-close-title">Ready to trade on cTrader?</h2>
              <p>
                Trading CFDs and leveraged instruments carries a high level of
                risk and may not be suitable for every investor. Do not trade
                money you cannot afford to lose.
              </p>
            </div>
            <div className="ctrader-close__actions">
              <a
                className="ctrader-chip ctrader-chip--primary"
                href="https://app.ctrader.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open web terminal
              </a>
              <Link className="ctrader-chip" href="/accounts">
                View accounts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
