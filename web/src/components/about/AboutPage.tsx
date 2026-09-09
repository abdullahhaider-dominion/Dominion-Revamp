import Image from "next/image";
import Link from "next/link";
import { incentivePath } from "@/content/incentives";
import "@/styles/about.css";

const ASSET_ROOT = "/assets/About-page";
const ICON_ROOT = `${ASSET_ROOT}/icons`;
const ACCOUNTS_ICON_ROOT = "/assets/Accounts-page/icons";
type Stat = {
  value: string;
  label: string;
};

type TimelineMilestone = {
  year: string;
  title: string;
  body: string;
};

type IllustratedItem = {
  title: string;
  body: string;
  icon?: string;
  src?: string;
  href?: string;
};

type FeatureItem = {
  title: string;
  body: string;
  src: string;
};

type OnboardingStep = {
  title: string;
  body: string;
  src: string;
};

const STATS: readonly Stat[] = [
  { value: "50,000+", label: "DM Clients" },
  { value: "180+", label: "Countries" },
  { value: "200+", label: "Trading Instruments" },
  { value: "3+", label: "Offices and Branches" },
] as const;

const TIMELINE: readonly TimelineMilestone[] = [
  {
    year: "2018",
    title: "Founded",
    body: "A trader-first vision founded on better conditions takes shape.",
  },
  {
    year: "2020",
    title: "Expanded",
    body: "Reached clients across global markets with licensed offices.",
  },
  {
    year: "Today",
    title: "Trusted",
    body: "Building a trusted sanctuary for modern traders worldwide.",
  },
] as const;

const VALUES: readonly IllustratedItem[] = [
  {
    title: "Integrity & Transparency",
    body: "We prioritize honesty and clear communication, ensuring a trusted and open trading atmosphere. Our commitment to ethical practices fosters enduring relationships built on trust.",
    icon: "integrity-shield.png",
  },
  {
    title: "Trust and Sustainability",
    body: "We are dedicated to meeting and surpassing stringent regulatory standards, underscoring our commitment to user trust and security. That work prioritizes our users’ interests and a responsible future for the industry.",
    icon: "transparency-document.png",
  },
  {
    title: "Adaptability and Inventiveness",
    body: "As a forward-thinking brokerage, we thrive on adaptability, constantly evolving to meet market demands. Our inventive approach delivers dynamic solutions for traders in changing landscapes.",
    icon: "innovation-bulb.png",
  },
  {
    title: "Client-Centric Focus",
    body: "Users are our priority. We have fortified the platform with security, data privacy measures, and professional trading conditions, along with commission incentives centered around your needs.",
    icon: "traders-first-users.png",
  },
] as const;

const BENEFITS: readonly IllustratedItem[] = [
  {
    title: "Global Reach",
    body: "Trade from over 180 countries with licensed offices and branches.",
    icon: "global-reach-globe.png",
  },
  {
    title: "Advanced Technology",
    body: "Pioneering platforms, fast execution, and reliable infrastructure.",
    icon: "advanced-technology-growth.png",
  },
  {
    title: "Secure & Regulated",
    body: "A fully licensed brokerage built on trust and regulatory standards.",
    icon: "secure-regulated-shield.png",
  },
  {
    title: "Client-First Support",
    body: "Education, risk-management tools, and real help when you need it.",
    icon: "client-first-support-headset.png",
  },
] as const;

const TRADE_FEATURES: readonly FeatureItem[] = [
  {
    title: "Start trading with $100",
    body: "Trade with as little as $100 on Dominion Markets.",
    src: `${ACCOUNTS_ICON_ROOT}/wallet.png`,
  },
  {
    title: "500:1 leverage",
    body: "Leverage your trades up to 500 times with us.",
    src: `${ACCOUNTS_ICON_ROOT}/infinity.png`,
  },
  {
    title: "Lightning-fast execution",
    body: "Experience lightning-fast trade execution.",
    src: `${ACCOUNTS_ICON_ROOT}/lightning.png`,
  },
  {
    title: "Razor-sharp spreads",
    body: "Benefit from razor-sharp spreads across the markets you trade.",
    src: `${ACCOUNTS_ICON_ROOT}/bar-chart.png`,
  },
  {
    title: "Expert advisors allowed",
    body: "Use expert advisors for more systematic trading.",
    src: `${ACCOUNTS_ICON_ROOT}/layers.png`,
  },
  {
    title: "Low commission",
    body: "Enjoy low commissions designed for active trading.",
    src: `${ACCOUNTS_ICON_ROOT}/check-circle.png`,
  },
] as const;

const PLATFORMS: readonly IllustratedItem[] = [
  {
    title: "MetaTrader 5",
    body: "Professional charts, expert advisors, and multi-asset trading on desktop, web, and mobile.",
    src: `${ICON_ROOT}/mt5.png`,
    href: "/#platforms",
  },
  {
    title: "cTrader",
    body: "Advanced execution, Level II pricing, and a clean workspace for active traders.",
    src: `${ICON_ROOT}/ctrader.png`,
    href: "/#platforms",
  },
] as const;

const COMMUNITY_PILLARS: readonly IllustratedItem[] = [
  {
    title: "Magic Keys",
    body: "Unlock Digital Magic Keys after qualifying commissions.",
    icon: "commission-incentives-gift.png",
    href: incentivePath("commission-incentives"),
  },
  {
    title: "Discord",
    body: "Join the Dominion Markets community for market updates and education.",
    icon: "global-community-group.png",
    href: incentivePath("commission-incentives"),
  },
  {
    title: "Education",
    body: "Access forex education and trading tools at no extra charge.",
    icon: "education-cap.png",
    href: incentivePath("more-info"),
  },
] as const;

const ONBOARDING_STEPS: readonly OnboardingStep[] = [
  {
    title: "Register",
    body: "Choose an account type and complete our fast and secure application form.",
    src: `${ACCOUNTS_ICON_ROOT}/document-edit.png`,
  },
  {
    title: "Fund",
    body: "Fund your trading account using a wide range of funding methods.",
    src: `${ACCOUNTS_ICON_ROOT}/wallet.png`,
  },
  {
    title: "Trade",
    body: "Start trading on your live account and access 200+ instruments.",
    src: `${ACCOUNTS_ICON_ROOT}/trend-up.png`,
  },
] as const;

function IconImage({
  file,
  src,
  size,
  alt = "",
  className = "about-icon",
}: {
  file?: string;
  src?: string;
  size: number;
  alt?: string;
  className?: string;
}) {
  return (
    <Image
      src={src ?? `${ICON_ROOT}/${file}`}
      alt={alt}
      width={size}
      height={size}
      className={className}
    />
  );
}

function Arrow() {
  return (
    <span className="about-arrow" aria-hidden="true">
      →
    </span>
  );
}

function ActionPair({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className="about-actions">
      <Link className="about-button" href={primaryHref}>
        {primaryLabel} <Arrow />
      </Link>
      <Link className="about-button about-button--outline" href={secondaryHref}>
        {secondaryLabel}
      </Link>
    </div>
  );
}

export function AboutPage() {
  return (
    <main className="about-page">
      <section
        className="about-hero"
        id="top"
        aria-labelledby="about-hero-title"
      >
        <Image
          src={`${ASSET_ROOT}/about-hero-mountains.png`}
          alt=""
          fill
          preload
          sizes="100vw"
          className="about-cover about-hero__mountains"
        />
        <div className="about-hero__veil" aria-hidden="true" />

        <div className="about-wrap about-hero__inner">
          <nav className="about-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span>About Us</span>
          </nav>

          <div className="about-hero__layout">
            <div className="about-hero__copy">
              <p className="about-eyebrow">About Us</p>
              <h1 id="about-hero-title">
                A Higher
                <br />
                Standard
                <br />
                for Trading
              </h1>
              <p className="about-hero__intro">
                Dominion Markets is an award-winning, fully licensed brokerage
                specializing in narrow spreads and rapid withdrawals. We cater
                to traders who need a reliable platform.
              </p>
              <Link className="about-button" href="#our-story">
                Our Story <Arrow />
              </Link>
              <p className="about-hero__tagline">
                <span aria-hidden="true" />
                Security. Transparency. Opportunity.
              </p>
            </div>

            <div className="about-hero__art">
              <blockquote>
                “Greater
                <br />
                opportunities
                <br />
                for a brighter
                <br />
                tomorrow.”
              </blockquote>
              <div className="about-hero__sanctuary">
                <Image
                  src={`${ASSET_ROOT}/about-hero-energy-pillar.png`}
                  alt=""
                  width={724}
                  height={2172}
                  sizes="(max-width: 767px) 18vw, 8vw"
                  className="about-hero__pillar"
                />
                <p>
                  Your
                  <br />
                  Trading
                  <br />
                  Sanctuary
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="about-light-flow">
        <Image
          src={`${ASSET_ROOT}/about-light-wave-mesh.png`}
          alt=""
          fill
          sizes="100vw"
          className="about-cover about-light-flow__mesh"
        />

        <section
          className="about-vision"
          id="vision"
          aria-labelledby="about-vision-title"
        >
          <div className="about-wrap">
            <header className="about-section-heading">
              <p className="about-eyebrow">Our Vision</p>
              <h2 id="about-vision-title">Empowering Traders Worldwide</h2>
              <p>
                Dominion Markets aims to be the foremost brokerage, renowned
                for unmatched trading solutions, pioneering technology, and
                driving client success.
              </p>
            </header>

            <dl className="about-stats">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className="about-story"
          id="our-story"
          aria-labelledby="about-story-title"
        >
          <div className="about-wrap about-story__layout">
            <header className="about-story__copy">
              <p className="about-eyebrow">Our Story</p>
              <h2 id="about-story-title">Our Story</h2>
              <p>
                What began as a commitment to better trading conditions has
                grown into a global trading community shaped by transparency,
                innovation, and support.
              </p>
            </header>

            <ol className="about-timeline" aria-label="Company timeline">
              {TIMELINE.map((milestone) => (
                <li key={milestone.year}>
                  <span className="about-timeline__year">{milestone.year}</span>
                  <span className="about-timeline__marker" aria-hidden="true" />
                  <div>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <section
        className="about-values"
        id="our-values"
        aria-labelledby="about-values-title"
      >
        <Image
          src={`${ASSET_ROOT}/about-values-waveform.png`}
          alt=""
          fill
          sizes="100vw"
          className="about-cover"
        />
        <div className="about-dark-veil" aria-hidden="true" />
        <div className="about-wrap">
          <header className="about-section-heading about-section-heading--dark">
            <p className="about-eyebrow">Our Values</p>
            <h2 id="about-values-title">Principles That Drive Everything We Do</h2>
          </header>
          <div className="about-values__grid">
            {VALUES.map((value) => (
              <article key={value.title}>
                <IconImage file={value.icon} src={value.src} size={110} />
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="about-light-finish">
        <Image
          src={`${ASSET_ROOT}/about-light-wave-background.png`}
          alt=""
          fill
          sizes="100vw"
          className="about-cover about-light-finish__waves"
        />

        <section
          className="about-benefits"
          id="why-dominion"
          aria-labelledby="about-benefits-title"
        >
          <div className="about-wrap">
            <header className="about-section-heading">
              <p className="about-eyebrow">Why Dominion Markets</p>
              <h2 id="about-benefits-title">A Better Trading Experience</h2>
              <p>
                Dominion Markets is an award-winning, fully licensed brokerage
                specializing in narrow spreads and rapid withdrawals. We cater
                to traders’ needs for a reliable platform.
              </p>
              <p>
                We empower traders through education and risk-management tools.
                Our commitment is to provide the knowledge and resources needed
                for informed decision-making, together with tools that help
                manage potential risks and strengthen your trading experience.
              </p>
            </header>
            <div className="about-benefits__grid">
              {BENEFITS.map((benefit) => (
                <article key={benefit.title}>
                  <IconImage file={benefit.icon} src={benefit.src} size={86} />
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="about-features"
          id="why-trade"
          aria-labelledby="about-features-title"
        >
          <div className="about-wrap">
            <header className="about-section-heading">
              <p className="about-eyebrow">Why Trade With Us</p>
              <h2 id="about-features-title">
                Trusted by Traders Worldwide
              </h2>
              <p>
                Our platform is the trusted choice of thousands globally,
                offering an unmatched portfolio of advanced financial trading
                features.
              </p>
            </header>
            <div className="about-features__grid">
              {TRADE_FEATURES.map((feature) => (
                <article key={feature.title}>
                  <IconImage src={feature.src} size={72} />
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <ActionPair
              primaryHref="/#final-cta"
              primaryLabel="Register Now"
              secondaryHref="/#client-area"
              secondaryLabel="Client Login"
            />
          </div>
        </section>

        <section
          className="about-platforms"
          id="about-platforms"
          aria-labelledby="about-platforms-title"
        >
          <div className="about-wrap">
            <header className="about-section-heading">
              <p className="about-eyebrow">Platforms</p>
              <h2 id="about-platforms-title">Trade on Premier Platforms</h2>
              <p>
                Unlock top-tier trading experiences with MetaTrader 5 and
                cTrader.
              </p>
            </header>
            <div className="about-platforms__grid">
              {PLATFORMS.map((platform) => (
                <article key={platform.title}>
                  <IconImage
                    src={platform.src}
                    size={78}
                    alt={`${platform.title} logo`}
                    className="about-icon about-platform-logo"
                  />
                  <div>
                    <h3>{platform.title}</h3>
                    <p>{platform.body}</p>
                    <Link href={platform.href ?? "/#platforms"}>
                      Explore platforms <Arrow />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section
        className="about-community"
        id="community"
        aria-labelledby="about-community-title"
      >
        <Image
          src={`${ASSET_ROOT}/about-community-trading-waves.png`}
          alt=""
          fill
          sizes="100vw"
          className="about-cover"
        />
        <div className="about-dark-veil" aria-hidden="true" />
        <div className="about-wrap about-community__layout">
          <header className="about-community__copy">
            <p className="about-eyebrow">Commission Incentives</p>
            <h2 id="about-community-title">More Than a Broker</h2>
            <p>
              Maximize your commissions for exclusive access to valuable tools
              and top forex education at no extra charge.
            </p>
          </header>
          <div className="about-community__pillars">
            {COMMUNITY_PILLARS.map((pillar) => (
              <article key={pillar.title}>
                <IconImage file={pillar.icon} src={pillar.src} size={92} />
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
                {pillar.href ? (
                  <Link href={pillar.href}>
                    Learn more <Arrow />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
          <p className="about-community__quote">
            “Built by traders, for traders.”
          </p>
        </div>
      </section>

      <div className="about-light-closing">
        <Image
          src={`${ASSET_ROOT}/about-light-wave-background.png`}
          alt=""
          fill
          sizes="100vw"
          className="about-cover about-light-closing__waves"
        />

        <section
          className="about-demo"
          id="demo-account"
          aria-labelledby="about-demo-title"
        >
          <div className="about-wrap about-demo__layout">
            <header className="about-demo__copy">
              <p className="about-eyebrow">No Cost</p>
              <h2 id="about-demo-title">No-cost $5,000 Demo Account</h2>
              <p>
                Begin your trading journey with a complimentary $5,000 demo
                account. Use cTrader to refine your skills, navigate diverse
                markets, and hone your strategies in a simulated environment.
                Open and close trades, build your virtual portfolio, and trade
                with confidence.
              </p>
              <ActionPair
                primaryHref="/#final-cta"
                primaryLabel="Register Now"
                secondaryHref="/#client-area"
                secondaryLabel="Client Login"
              />
            </header>
            <aside className="about-demo__card" aria-hidden="true">
              <p className="about-demo__amount">$5,000</p>
              <p>Practice on cTrader</p>
            </aside>
          </div>
        </section>

        <section
          className="about-start"
          id="how-to-start"
          aria-labelledby="about-start-title"
        >
          <div className="about-wrap">
            <header className="about-section-heading">
              <p className="about-eyebrow">Get Started</p>
              <h2 id="about-start-title">How to Start?</h2>
              <p>
                Open your live trading account in a few simple steps and get
                access to global markets.
              </p>
            </header>
            <ol className="about-start__steps">
              {ONBOARDING_STEPS.map((step, index) => (
                <li key={step.title}>
                  <span className="about-start__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <IconImage src={step.src} size={56} />
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ActionPair
              primaryHref="/#final-cta"
              primaryLabel="Register Now"
              secondaryHref="/#client-area"
              secondaryLabel="Client Login"
            />
          </div>
        </section>

        <section
          className="about-final"
          id="about-final-cta"
          aria-labelledby="about-final-title"
        >
          <div className="about-wrap">
            <header className="about-section-heading">
              <p className="about-eyebrow">Your Next Chapter</p>
              <h2 id="about-final-title">Trade with a Global Partner</h2>
              <p>
                Take a step forward and open an account with Dominion Markets.
              </p>
            </header>
            <ActionPair
              primaryHref="/accounts"
              primaryLabel="Open an Account"
              secondaryHref="#our-story"
              secondaryLabel="Learn More"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
