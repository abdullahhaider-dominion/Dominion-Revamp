import Image from "next/image";
import Link from "next/link";
import {
  PAIR_SESSIONS,
  PTT_ASSET,
  type PairSession,
} from "@/content/pairs-to-trade";
import { legalDocumentHref } from "@/content/legal-documents";
import { SITE_REGISTER_HREF } from "@/content/site-nav";
import "@/styles/pairs-to-trade.css";

type IconName =
  | "arrow"
  | "book"
  | "calendar"
  | "chart"
  | "clock"
  | "globe"
  | "landmark"
  | "shield"
  | "trend";

function PttIcon({ name }: { name: IconName }) {
  return <span className={`ptt-icon ptt-icon--${name}`} aria-hidden="true" />;
}

function OpenAccountButton({ className }: { className?: string }) {
  return (
    <a
      className={`ptt-cta${className ? ` ${className}` : ""}`}
      href={SITE_REGISTER_HREF}
    >
      Open an Account
      <PttIcon name="arrow" />
    </a>
  );
}

function PairChips({
  pairs,
  tone = "mint",
}: {
  pairs: readonly string[];
  tone?: "mint" | "soft";
}) {
  return (
    <ul className={`ptt-chips ptt-chips--${tone}`}>
      {pairs.map((pair) => (
        <li key={pair}>{pair}</li>
      ))}
    </ul>
  );
}

function SessionFacts({ session }: { session: PairSession }) {
  return (
    <div className="ptt-facts">
      <div className="ptt-fact">
        <span className="ptt-fact__mark">
          <PttIcon name="clock" />
        </span>
        <div>
          <p className="ptt-fact__label">Session Time (GMT)</p>
          <p className="ptt-fact__value">{session.times}</p>
        </div>
      </div>
      <div className="ptt-fact">
        <span className="ptt-fact__mark">
          <PttIcon name="chart" />
        </span>
        <div>
          <p className="ptt-fact__label">Recommended pairs</p>
          <PairChips pairs={session.pairs} />
        </div>
      </div>
      <div className="ptt-fact">
        <span className="ptt-fact__mark">
          <PttIcon name="trend" />
        </span>
        <div>
          <p className="ptt-fact__label">Use caution / avoid</p>
          <PairChips pairs={session.cautionPairs} tone="soft" />
          <p className="ptt-fact__note">{session.caution}</p>
        </div>
      </div>
    </div>
  );
}

function SessionVisual({ session }: { session: PairSession }) {
  return (
    <div className="ptt-session__visual">
      <Image
        src={session.image}
        alt={session.imageAlt}
        width={720}
        height={720}
        sizes="(max-width: 899px) 46vw, 360px"
        loading="eager"
        className="ptt-session__photo"
      />
      <p className="ptt-session__caption">
        <span>{session.captionCity}</span>
        {session.captionLine}
      </p>
    </div>
  );
}

function SessionBlock({ session }: { session: PairSession }) {
  return (
    <article
      className={`ptt-session ptt-session--${session.layout}`}
      id={session.id}
      aria-labelledby={`${session.id}-title`}
    >
      <SessionVisual session={session} />
      <div className="ptt-session__copy">
        <p className="ptt-session__meta">
          <span className="ptt-session__number">{session.number}</span>
          <span className="ptt-session__label">{session.label}</span>
        </p>
        <h3 id={`${session.id}-title`}>{session.title}</h3>
        <p className="ptt-session__kicker">{session.kicker}</p>
        <p className="ptt-session__body">{session.body}</p>
      </div>
      <SessionFacts session={session} />
      <OpenAccountButton className="ptt-session__cta" />
    </article>
  );
}

export function PairsToTradePage() {
  return (
    <main className="ptt-page" id="top">
      <section className="ptt-hero" aria-labelledby="ptt-title">
        <div className="ptt-hero__globe" aria-hidden="true">
          <Image
            src={`${PTT_ASSET}/hero-globe.png`}
            alt=""
            fill
            sizes="50vw"
            priority
          />
        </div>
        <div className="ptt-wrap">
          <nav className="ptt-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Education</span>
            <span aria-hidden="true">/</span>
            <span>Pairs to trade</span>
          </nav>
          <div className="ptt-hero__layout">
            <div className="ptt-hero__copy">
              <p className="ptt-eyebrow">Trading Education</p>
              <h1 id="ptt-title">Pairs to Trade</h1>
              <p>
                Choosing the right currency pair and trading them during the
                most active sessions can make a significant difference. Learn
                which pairs are most influenced by each market session and how
                to trade them with greater confidence.
              </p>
            </div>
          </div>
        </div>
        <p className="ptt-hero__aside">
          <span>Different markets</span>
          <span>Different opportunities</span>
          <em>The global forex market moves 24 hours a day.</em>
        </p>
      </section>

      <section className="ptt-picker" aria-labelledby="ptt-picker-title">
        <div className="ptt-wrap">
          <div className="ptt-picker__head">
            <div>
              <h2 id="ptt-picker-title">
                <span className="ptt-picker__mark">
                  <PttIcon name="calendar" />
                </span>
                Choose pair by active session
              </h2>
              <p>
                Each trading session has its own character, levels of activity
                and opportunities. Select a session to see the most relevant
                currency pairs.
              </p>
            </div>
            <p className="ptt-picker__aside">
              Three major sessions. A global market. 24 hours a day.
            </p>
          </div>
          <ul className="ptt-picker__grid">
            {PAIR_SESSIONS.map((session) => (
              <li key={`${session.id}-pick`}>
                <a className="ptt-pick" href={`#${session.id}`}>
                  <span className="ptt-pick__mark">
                    <PttIcon name={session.pickerIcon} />
                  </span>
                  <strong>{session.label}</strong>
                  <span className="ptt-pick__time">{session.times}</span>
                  <span className="ptt-pick__copy">{session.pickerCopy}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ptt-sessions" aria-label="Session pairs">
        <div className="ptt-wrap">
          {PAIR_SESSIONS.map((session) => (
            <SessionBlock key={session.id} session={session} />
          ))}
        </div>
      </section>

      <section className="ptt-note" aria-label="Educational disclaimer">
        <div className="ptt-wrap ptt-note__inner">
          <p>
            <span className="ptt-note__mark">
              <PttIcon name="book" />
            </span>
            This is not financial advice. Educational purposes only.
          </p>
          <p>
            Market conditions change. Pair these notes with your own research
            before trading.
          </p>
        </div>
      </section>

      <section className="ptt-risk" aria-labelledby="ptt-risk-title">
        <Image
          src={`${PTT_ASSET}/risk-wave.png`}
          alt=""
          fill
          sizes="100vw"
          className="ptt-risk__wave"
        />
        <div className="ptt-wrap ptt-risk__inner">
          <span className="ptt-risk__mark">
            <PttIcon name="shield" />
          </span>
          <div className="ptt-risk__copy">
            <p className="ptt-eyebrow ptt-eyebrow--light">Trade responsibly</p>
            <h2 id="ptt-risk-title">Knowledge leads to better decisions.</h2>
            <p>
              Trading involves risk and may not be suitable for all investors.
              The value of your investments can go down as well as up and you
              may lose some or all of your invested capital. Make sure you
              understand the risks and consider your financial situation and
              trading experience before you trade.
            </p>
          </div>
          <a
            className="ptt-risk__link"
            href={legalDocumentHref("risk-disclosure-and-warning-notice.pdf")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about risk
            <PttIcon name="arrow" />
          </a>
        </div>
      </section>
    </main>
  );
}
