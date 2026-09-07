import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ExternalLink,
  KeyRound,
} from "lucide-react";
import "@/styles/more-info.css";

const ASSET_ROOT = "/assets/more-info";

const ASSETS = {
  hero: `${ASSET_ROOT}/hero-mountains.png`,
  article: `${ASSET_ROOT}/article-mist.png`,
  education: `${ASSET_ROOT}/education-mountains.png`,
  bull: `${ASSET_ROOT}/education-bull.png`,
  magic: `${ASSET_ROOT}/magic-mountains.png`,
  keys: `${ASSET_ROOT}/magic-keys.png`,
  earning: `${ASSET_ROOT}/earning-mountains.png`,
  hiker: `${ASSET_ROOT}/earning-hiker.png`,
} as const;

function SideNote({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`mi-side-note ${className}`}>{children}</p>;
}

function WebsiteCard({
  icon,
  name,
  label,
  href,
}: {
  icon: "education" | "keys";
  name: string;
  label: string;
  href: string;
}) {
  return (
    <Link className="mi-website" href={href} target="_blank">
      <span
        className={`mi-website__icon mi-website__icon--${icon}`}
        aria-hidden="true"
      >
        {icon === "education" ? (
          <BookOpenCheck size={24} strokeWidth={1.7} />
        ) : (
          <KeyRound size={24} strokeWidth={1.7} />
        )}
      </span>
      <span>
        <strong>{name}</strong>
        <small>{label}</small>
      </span>
      <ExternalLink size={15} aria-hidden="true" />
    </Link>
  );
}

export function MoreInfo() {
  return (
    <main className="mi-page" id="top">
      <section className="mi-hero" aria-labelledby="mi-hero-title">
        <Image
          src={ASSETS.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="mi-cover"
        />
        <div className="mi-hero__wash" aria-hidden="true" />
        <div className="mi-wrap mi-hero__inner">
          <div>
            <p className="mi-kicker">Knowledge &nbsp;|&nbsp; Incentives &nbsp;|&nbsp; A Brighter Tomorrow</p>
            <h1 id="mi-hero-title">
              More <span>Info</span>
            </h1>
            <p>Trading education. Valuable incentives. A stronger you.</p>
          </div>
          <SideNote className="mi-hero__note">
            Same markets
            <br />
            More opportunities
          </SideNote>
          <SideNote className="mi-hero__aside">
            People
            <br />
            Education
            <br />
            Opportunity
            <br />
            A brighter tomorrow
          </SideNote>
        </div>
      </section>

      <section className="mi-article" aria-labelledby="mi-article-title">
        <Image
          src={ASSETS.article}
          alt=""
          fill
          sizes="100vw"
          className="mi-cover"
        />
        <div className="mi-wrap mi-article__inner">
          <article>
            <span className="mi-rule" aria-hidden="true" />
            <div>
              <p className="mi-kicker">Traders &nbsp; Grow &nbsp; Further &nbsp; Together</p>
              <h2 id="mi-article-title">
                Forex Brokers That Offer Trading Education and Incentives Should
                Be Every
                <br />
                <span>Forex Trader&apos;s Dream</span>
              </h2>
              <p>
                According to data from multiple liquidity providers in the
                Forex industry, 90% of traders lose money, and this is a
                conservative estimate.
              </p>
              <p>
                As a broker, the goal is to keep your traders on your platform
                for as long as possible for a few reasons. First, if they are
                profitable they will continue trading and continue paying
                commissions, which leads to more business for the brokerage and
                a community of happy traders. Secondly, it encourages them to
                share their success with those close to them where they will
                recommend their broker of choice.
              </p>
              <p>
                At Dominion Markets, we strongly believe that an{" "}
                <strong>educated trader is a profitable trader</strong>, and a{" "}
                <strong>profitable trader is our best promoter</strong>. Here&apos;s
                how we incentivise the use of our platform.
              </p>
            </div>
          </article>
          <SideNote>
            Better traders
            <br />
            Brighter tomorrow
          </SideNote>
        </div>
      </section>

      <section className="mi-feature mi-feature--education" aria-labelledby="mi-education-title">
        <Image
          src={ASSETS.education}
          alt=""
          fill
          sizes="100vw"
          className="mi-cover"
        />
        <div className="mi-wrap mi-feature__inner">
          <article className="mi-feature-card">
            <p className="mi-kicker">Learn &nbsp;|&nbsp; Practice &nbsp;|&nbsp; Grow</p>
            <h2 id="mi-education-title">Trading Education</h2>
            <p>
              Partnered with Market Fluidity, we are committed to making sure
              that both seasoned and beginner traders have access to high
              quality education that helps them unlearn and relearn trading
              concepts from professionals. 6 &amp; 7 figure traders. To make this
              possible, we allow our traders to utilize the commissions they
              pay towards the purchase of this resource; helping them acquire
              the knowledge they need to build confidence when traversing any
              market.
            </p>
            <p>
              More importantly, gaining access to Market Fluidity is only a
              one-time purchase that is frequently updated with webinars and
              simulations. As you likely know, the key to making money in the
              markets is making more money than you lose, and we have a solution
              for that too.
            </p>
            <WebsiteCard
              icon="education"
              name="Our Website"
              label="Market Fluidity Website"
              href="https://marketfluidity.com"
            />
          </article>
          <div className="mi-feature__visual mi-feature__visual--bull">
            <span aria-hidden="true" />
            <Image
              src={ASSETS.bull}
              alt="Colourful market bull with a rising performance line"
              fill
              sizes="(max-width: 767px) 92vw, 50vw"
            />
          </div>
          <SideNote>
            Knowledge
            <br />
            Builds
            <br />
            Confidence
          </SideNote>
        </div>
      </section>

      <section className="mi-feature mi-feature--magic" aria-labelledby="mi-magic-title">
        <Image
          src={ASSETS.magic}
          alt=""
          fill
          sizes="100vw"
          className="mi-cover"
        />
        <div className="mi-wrap mi-feature__inner">
          <article className="mi-feature-card">
            <p className="mi-kicker">Tools &nbsp;|&nbsp; Control &nbsp;|&nbsp; Trade Smarter</p>
            <h2 id="mi-magic-title">Digital Magic Keys</h2>
            <p>
              We&apos;ve partnered with Digital Magic Keys to provide our traders
              with the hardware and software to manage risk like the pros. Using
              their commissions, traders at Dominion Markets can now manage
              their risk to make better decisions before entering their
              positions — a broker incentive that can&apos;t be found with any
              other broker in the market.
            </p>
            <p>
              Using simple key strokes on the trading pad, traders are able to
              perform all tasks needed to make trading as stress free as
              possible.
            </p>
            <WebsiteCard
              icon="keys"
              name="Our Website"
              label="Magic Keys Website"
              href="https://magickeys.trade"
            />
          </article>
          <div className="mi-feature__visual mi-feature__visual--keys">
            <span aria-hidden="true" />
            <Image
              src={ASSETS.keys}
              alt="Digital Magic Keys trading keypad"
              fill
              sizes="(max-width: 767px) 88vw, 45vw"
            />
          </div>
          <SideNote>
            Simple tools
            <br />
            Big results
          </SideNote>
        </div>
      </section>

      <section className="mi-earning" aria-labelledby="mi-earning-title">
        <Image
          src={ASSETS.earning}
          alt=""
          fill
          sizes="100vw"
          className="mi-cover"
        />
        <div className="mi-wrap mi-earning__inner">
          <article>
            <p className="mi-kicker">Higher Potential &nbsp;|&nbsp; More Opportunity</p>
            <h2 id="mi-earning-title">
              More Earning <span>Potential</span>
            </h2>
            <p>
              Trading is like a game; however, the consequences of your actions
              are permanent. That&apos;s why Dominion Markets wants to reward those
              who have gotten better and have proven themselves in the market.
              Using our Leaderboard, top traders gain access to offers who want
              to leverage their knowledge of a specific trader for their
              benefit. Not only does this promote more earnings for traders, it
              rewards skilled traders with a set percentage of that commission.
            </p>
            <p>
              If you&apos;re a Forex trader and you want to make the most of your
              trading, make sure you identify a broker who invests in your
              success. Brokers are not obligated to try and help you beyond
              providing you with spreads that are competitive. At Dominion
              Markets, our expectation is that if we take care of you, you&apos;ll
              be capable of taking better care of yourself. Take advantage of
              these broker incentives and you&apos;ll level up in no time.
            </p>
            <Link className="mi-earning__link" href="/incentives/leaderboard-challenge">
              Explore the Leaderboard
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </article>
          <div className="mi-earning__visual">
            <span className="mi-earning__glow" aria-hidden="true" />
            <Image
              src={ASSETS.hiker}
              alt="Trader overlooking a mountain summit"
              fill
              sizes="(max-width: 767px) 65vw, 30vw"
            />
          </div>
          <SideNote>
            Higher traders
            <br />
            Brighter tomorrow
          </SideNote>
        </div>
      </section>
    </main>
  );
}
