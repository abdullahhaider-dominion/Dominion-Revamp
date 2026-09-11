import Image from "next/image";
import Link from "next/link";
import {
  BTT_ASSET,
  BTT_HOURS,
  MARKET_SESSIONS,
  SESSION_OVERLAP,
  hourToPercent,
  type MarketSession,
} from "@/content/best-times-to-trade";
import { legalDocumentHref } from "@/content/legal-documents";
import { SITE_REGISTER_HREF } from "@/content/site-nav";
import "@/styles/best-times-to-trade.css";

type IconName = "clock" | "volume" | "lightbulb" | "shield" | "arrow";

function BttIcon({ name }: { name: IconName }) {
  return <span className={`btt-icon btt-icon--${name}`} aria-hidden="true" />;
}

function OpenAccountButton({ className }: { className?: string }) {
  return (
    <a
      className={`btt-cta${className ? ` ${className}` : ""}`}
      href={SITE_REGISTER_HREF}
    >
      Open an Account
      <BttIcon name="arrow" />
    </a>
  );
}

function SessionFacts({ session }: { session: MarketSession }) {
  return (
    <div className="btt-facts">
      <div className="btt-facts__pair">
        <div className="btt-fact">
          <span className="btt-fact__mark">
            <BttIcon name="clock" />
          </span>
          <div>
            <p className="btt-fact__label">Key Times (GMT)</p>
            <p className="btt-fact__value">{session.times}</p>
          </div>
        </div>
        <div className="btt-fact">
          <span className="btt-fact__mark">
            <BttIcon name="volume" />
          </span>
          <div>
            <p className="btt-fact__label">Relative Volume</p>
            <p className="btt-fact__value">{session.volume}</p>
          </div>
        </div>
      </div>
      <div className="btt-fact btt-fact--stack">
        <span className="btt-fact__mark">
          <BttIcon name="lightbulb" />
        </span>
        <div>
          <p className="btt-fact__label">Key Characteristics</p>
          <ul>
            {session.characteristics.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SessionVisual({ session }: { session: MarketSession }) {
  return (
    <div className="btt-session__visual">
      <Image
        src={session.image}
        alt={session.imageAlt}
        width={720}
        height={720}
        className="btt-session__photo"
      />
      <p className="btt-session__caption">
        <span>{session.captionCity}</span>
        {session.captionLine}
      </p>
    </div>
  );
}

function SessionBlock({ session }: { session: MarketSession }) {
  return (
    <article
      className={`btt-session btt-session--${session.layout}`}
      id={session.id}
      aria-labelledby={`${session.id}-title`}
    >
      <SessionVisual session={session} />
      <div className="btt-session__copy">
        <p className="btt-session__meta">
          <span className="btt-session__number">{session.number}</span>
          <span className="btt-session__label">{session.label}</span>
        </p>
        <h3 id={`${session.id}-title`}>{session.title}</h3>
        <p className="btt-session__kicker">{session.kicker}</p>
        <p className="btt-session__body">{session.body}</p>
        <SessionFacts session={session} />
        <OpenAccountButton className="btt-session__cta" />
      </div>
    </article>
  );
}

export function BestTimesToTradePage() {
  return (
    <main className="btt-page" id="top">
      <section className="btt-hero" aria-labelledby="btt-title">
        <div className="btt-hero__globe" aria-hidden="true">
          <Image
            src={`${BTT_ASSET}/globe.png`}
            alt=""
            width={1400}
            height={1000}
            priority
          />
        </div>
        <div className="btt-wrap">
          <nav className="btt-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Education</span>
            <span aria-hidden="true">/</span>
            <span>Best time to trade</span>
          </nav>
          <div className="btt-hero__layout">
            <div className="btt-hero__copy">
              <p className="btt-eyebrow">Trading Education</p>
              <h1 id="btt-title">Best Time to Trade</h1>
              <p>
                The forex market is open 24 hours a day, five days a week. Each
                trading session has its own character, levels of activity and
                opportunities. Understanding when to trade can help you make
                more informed decisions and trade with greater confidence.
              </p>
            </div>
            <p className="btt-hero__aside">
              <span>Global markets</span>
              <span>around the clock</span>
              <em>Different sessions. Different opportunities.</em>
            </p>
          </div>
        </div>
      </section>

      <section className="btt-timeline" aria-labelledby="btt-timeline-title">
        <div className="btt-wrap">
          <div className="btt-timeline__head">
            <h2 id="btt-timeline-title">
              24-Hour Market Activity Timeline (GMT)
            </h2>
            <p>
              The forex market operates 24 hours a day, five days a week.
            </p>
          </div>

          <div className="btt-timeline__board">
            <div className="btt-gantt" aria-hidden="false">
              <div className="btt-gantt__hours">
                {BTT_HOURS.map((hour) => (
                  <span key={hour}>{hour}</span>
                ))}
              </div>
              <div className="btt-gantt__track">
                {MARKET_SESSIONS.map((session) => (
                  <div key={`${session.id}-bar`} className="btt-gantt__row">
                    <span
                      className={`btt-gantt__bar btt-gantt__bar--${session.bar.tone}`}
                      style={{
                        left: `${hourToPercent(session.bar.startHour)}%`,
                        width: `${hourToPercent(session.bar.endHour - session.bar.startHour)}%`,
                      }}
                    >
                      <strong>{session.label}</strong>
                      {session.times}
                    </span>
                  </div>
                ))}
                <div className="btt-gantt__overlap">
                  <span
                    style={{
                      left: `${hourToPercent(SESSION_OVERLAP.startHour)}%`,
                      width: `${hourToPercent(SESSION_OVERLAP.endHour - SESSION_OVERLAP.startHour)}%`,
                    }}
                  >
                    {SESSION_OVERLAP.label}
                    <small>{SESSION_OVERLAP.times}</small>
                  </span>
                </div>
              </div>
            </div>

            <ol className="btt-rail">
              {MARKET_SESSIONS.map((session) => (
                <li
                  key={`${session.id}-rail`}
                  className={`btt-rail__item btt-rail__item--${session.bar.tone}`}
                >
                  <span className="btt-rail__dot" />
                  <div>
                    <strong>{session.label}</strong>
                    <span>{session.times}</span>
                  </div>
                </li>
              ))}
              <li className="btt-rail__item btt-rail__item--overlap">
                <span className="btt-rail__dot" />
                <div>
                  <strong>{SESSION_OVERLAP.label}</strong>
                  <span>{SESSION_OVERLAP.times}</span>
                </div>
              </li>
            </ol>

            <aside className="btt-access">
              <span className="btt-access__mark">
                <BttIcon name="clock" />
              </span>
              <div>
                <p className="btt-access__label">24 / 5 Access</p>
                <p>
                  Three major sessions create continuous opportunities across
                  the globe.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="btt-sessions" aria-label="Trading sessions">
        <div className="btt-wrap">
          {MARKET_SESSIONS.map((session) => (
            <SessionBlock key={session.id} session={session} />
          ))}
        </div>
      </section>

      <section className="btt-risk" aria-labelledby="btt-risk-title">
        <Image
          src={`${BTT_ASSET}/risk-wave.png`}
          alt=""
          fill
          sizes="100vw"
          className="btt-risk__wave"
        />
        <div className="btt-wrap btt-risk__inner">
          <span className="btt-risk__mark">
            <BttIcon name="shield" />
          </span>
          <div className="btt-risk__copy">
            <p className="btt-eyebrow btt-eyebrow--light">Trade responsibly</p>
            <h2 id="btt-risk-title">Knowledge leads to better decisions.</h2>
            <p>
              Trading involves risk and may not be suitable for all investors.
              The value of your investments can go down as well as up and you
              may lose some or all of your invested capital. Make sure you
              understand the risks and consider your financial situation and
              trading experience before you trade.
            </p>
          </div>
          <a
            className="btt-risk__link"
            href={legalDocumentHref("risk-disclosure-and-warning-notice.pdf")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about risk
            <BttIcon name="arrow" />
          </a>
        </div>
      </section>
    </main>
  );
}
