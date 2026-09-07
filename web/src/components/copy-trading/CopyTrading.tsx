import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Headphones,
  LineChart,
  Lock,
  MousePointerClick,
  Quote,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";
import "@/styles/copy-trading.css";

const ASSET_ROOT = "/assets/copy-trading";

const ASSETS = {
  hero: `${ASSET_ROOT}/hero-landscape.png`,
  traderBackdrop: `${ASSET_ROOT}/master-traders-backdrop.png`,
  darkMountains: `${ASSET_ROOT}/how-it-works-mountains.png`,
  devices: `${ASSET_ROOT}/copy-trading-devices.png`,
  frances: `${ASSET_ROOT}/top-master-user-02.png`,
  alex: `${ASSET_ROOT}/top-master-user-01.png`,
  ignas: `${ASSET_ROOT}/top-master-user-03.png`,
} as const;

const MASTER_TRADERS = [
  {
    name: "Frances Poh",
    image: ASSETS.frances,
    profit: "118%",
    score: "73",
    position: "center 18%",
  },
  {
    name: "Alex Charles",
    image: ASSETS.alex,
    profit: "88%",
    score: "68",
    position: "center 24%",
  },
  {
    name: "Ignas",
    image: ASSETS.ignas,
    profit: "64%",
    score: "47",
    position: "center 34%",
  },
] as const;

const REASONS = [
  {
    icon: BarChart3,
    title: "Expert Traders",
    body: "Follow traders with proven track records and real strategies.",
  },
  {
    icon: Activity,
    title: "Low Fees",
    body: "Enjoy competitive, transparent pricing with no hidden fees.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    body: "Manage your risk with flexible settings to suit your trading style.",
  },
  {
    icon: Zap,
    title: "Instant Execution",
    body: "Instantly copy trades and enjoy lightning-fast execution.",
  },
  {
    icon: Headphones,
    title: "24/5 Support",
    body: "Our dedicated support team is available around the clock to assist you.",
  },
  {
    icon: Lock,
    title: "Secure Platform",
    body: "Your funds and data are protected under strict safety protocols.",
  },
] as const;

const COPY_STEPS = [
  {
    icon: UsersRound,
    title: "Choose a Master Trader",
    body: "On your dashboard, browse a selection of experienced traders with proven track records.",
  },
  {
    icon: SlidersHorizontal,
    title: "Set Your Preferences",
    body: "Decide how much you’d like to invest and which trades you’d like to follow.",
  },
  {
    icon: Copy,
    title: "Copy Trades in Real-Time",
    body: "Once you’ve selected a trader, their trades will be mirrored in your account automatically.",
  },
  {
    icon: LineChart,
    title: "Monitor Your Success",
    body: "Track your portfolio performance and adjust your settings anytime.",
  },
] as const;

const START_STEPS = [
  {
    icon: MousePointerClick,
    title: "Choose",
    body: "Identify top traders by past performance and profile.",
  },
  {
    icon: Copy,
    title: "Copy",
    body: "Mirror trades of top traders and generate similar results.",
  },
  {
    icon: Settings2,
    title: "Control",
    body: "Control your risk, follow multiple traders, and diversify your portfolio.",
  },
] as const;

function ActionButton({
  children,
  outline = false,
}: {
  children: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <Link
      className={`ct-button${outline ? " ct-button--outline" : ""}`}
      href={outline ? "/#client-area" : "/#accounts"}
    >
      {children}
      <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}

function SectionAside({ children }: { children: React.ReactNode }) {
  return <p className="ct-aside">{children}</p>;
}

export function CopyTrading() {
  return (
    <main className="ct-page" id="top">
      <section className="ct-hero" aria-labelledby="ct-hero-title">
        <Image
          src={ASSETS.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="ct-cover"
        />
        <div className="ct-hero__wash" aria-hidden="true" />
        <div className="ct-wrap ct-hero__inner">
          <div className="ct-hero__copy">
            <p className="ct-eyebrow">Follow · Learn · Grow Together</p>
            <h1 id="ct-hero-title">
              <span>
                <b>Copy</b> Trading
              </span>
              with Dominion Markets
            </h1>
            <p className="ct-hero__lead">
              Tap into the expertise of experienced traders and automatically
              copy their strategies in real time. Trade smarter, not harder,
              with Dominion Markets.
            </p>
            <div className="ct-actions">
              <ActionButton>Register Now</ActionButton>
              <ActionButton outline>Client Login</ActionButton>
            </div>
            <div className="ct-hero__benefits" aria-label="Copy trading benefits">
              <span>
                <UsersRound aria-hidden="true" />
                Proven Traders
              </span>
              <span>
                <ShieldCheck aria-hidden="true" />
                Transparent Performance
              </span>
              <span>
                <BarChart3 aria-hidden="true" />A More Confident Tomorrow
              </span>
            </div>
          </div>
          <SectionAside>
            Same markets
            <br />
            More possibilities
          </SectionAside>
        </div>
      </section>

      <section className="ct-intro" aria-labelledby="ct-intro-title">
        <div className="ct-wrap ct-intro__inner">
          <h2 id="ct-intro-title">What is Copy Trading?</h2>
          <p>
            Copy trading allows you to automatically replicate the trades of
            master traders in real-time. With Dominion Markets, you can follow
            expert traders and copy their strategies effortlessly, all while
            keeping your own investment to achieve better results.
          </p>
        </div>
      </section>

      <section className="ct-masters" aria-labelledby="ct-masters-title">
        <div className="ct-wrap">
          <div className="ct-masters__panel">
            <Image
              src={ASSETS.traderBackdrop}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 88vw"
              className="ct-cover"
            />
            <div className="ct-masters__veil" aria-hidden="true" />
            <h2 id="ct-masters-title">Meet Our Top Master Traders</h2>
            <div className="ct-masters__grid">
              {MASTER_TRADERS.map((trader) => (
                <article className="ct-trader-card" key={trader.name}>
                  <Image
                    src={trader.image}
                    alt={`${trader.name}, Dominion Markets master trader`}
                    fill
                    sizes="(max-width: 767px) 78vw, 28vw"
                    style={{ objectPosition: trader.position }}
                  />
                  <div className="ct-trader-card__shade" aria-hidden="true" />
                  <div className="ct-trader-card__details">
                    <h3>{trader.name}</h3>
                    <dl>
                      <div>
                        <dt>Profit</dt>
                        <dd>{trader.profit}</dd>
                      </div>
                      <div>
                        <dt>Risk Score</dt>
                        <dd>{trader.score}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
            <p>
              Copy the strategies of our master traders and succeed with
              Dominion Markets Copy Trading.
            </p>
            <ActionButton>Start Copy Trading Now</ActionButton>
            <SectionAside>
              Real traders
              <br />
              Real strategies
            </SectionAside>
          </div>
        </div>
      </section>

      <section className="ct-reasons" aria-labelledby="ct-reasons-title">
        <div className="ct-wrap">
          <header className="ct-section-heading">
            <h2 id="ct-reasons-title">
              Why Choose Dominion Markets
              <br />
              for Copy Trading?
            </h2>
            <p>
              Dominion Markets offers an intuitive, secure, and transparent
              copy trading experience. Here’s why thousands of traders trust us.
            </p>
          </header>
          <div className="ct-reasons__grid">
            {REASONS.map(({ icon: Icon, title, body }) => (
              <article className="ct-reason-card" key={title}>
                <span>
                  <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
          <SectionAside>
            Trusted trading
            <br />
            for a brighter tomorrow
          </SectionAside>
        </div>
      </section>

      <section className="ct-how" aria-labelledby="ct-how-title">
        <Image
          src={ASSETS.darkMountains}
          alt=""
          fill
          sizes="100vw"
          className="ct-cover"
        />
        <div className="ct-how__veil" aria-hidden="true" />
        <div className="ct-wrap ct-how__grid">
          <div className="ct-how__visual">
            <span className="ct-how__glow" aria-hidden="true" />
            <Image
              src={ASSETS.devices}
              alt="Dominion Markets copy trading dashboard on mobile devices"
              fill
              sizes="(max-width: 767px) 92vw, 46vw"
            />
          </div>
          <div className="ct-how__content">
            <h2 id="ct-how-title">How Does Copy Trading Work?</h2>
            <ol>
              {COPY_STEPS.map(({ icon: Icon, title, body }, index) => (
                <li key={title}>
                  <span className="ct-step-icon">
                    <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                    <small>{index + 1}</small>
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="ct-how__note">
              <Check size={17} strokeWidth={2.5} aria-hidden="true" />
              It’s that easy. No need to monitor the markets 24/7 — let the
              experts do the hard work for you!
            </p>
          </div>
          <SectionAside>
            Learn
            <br />
            Smarter
            <br />
            Stronger
            <br />
            Together
          </SectionAside>
        </div>
      </section>

      <section className="ct-testimonials" aria-labelledby="ct-testimonials-title">
        <div className="ct-wrap ct-testimonials__inner">
          <h2 id="ct-testimonials-title">What our Clients says about us</h2>
          <article className="ct-quote-card">
            <button type="button" aria-label="Previous testimonial">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div>
              <Quote size={39} strokeWidth={1.5} aria-hidden="true" />
              <blockquote>
                “What I like most is the ability to follow skilled traders. It
                helped me learn while also seeing more consistent results. The
                platform is reliable and easy to use.”
              </blockquote>
              <strong>Clive</strong>
            </div>
            <button type="button" aria-label="Next testimonial">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </article>
          <div className="ct-dots" aria-hidden="true">
            <span />
            <span className="is-active" />
            <span />
          </div>
          <SectionAside>
            Real people
            <br />
            Real progress
          </SectionAside>
        </div>
      </section>

      <section className="ct-start" aria-labelledby="ct-start-title">
        <div className="ct-wrap ct-start__inner">
          <header className="ct-section-heading">
            <Sparkles size={22} aria-hidden="true" />
            <h2 id="ct-start-title">Ready to Get Started?</h2>
            <p>
              Join Dominion Markets today and start copying the strategies of
              expert traders right away!
            </p>
          </header>
          <div className="ct-start__grid">
            {START_STEPS.map(({ icon: Icon, title, body }) => (
              <article key={title}>
                <span>
                  <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="ct-actions">
            <ActionButton>Register Now</ActionButton>
            <ActionButton outline>Client Login</ActionButton>
          </div>
          <SectionAside>
            Your trading journey
            <br />
            starts here
          </SectionAside>
        </div>
      </section>
    </main>
  );
}
