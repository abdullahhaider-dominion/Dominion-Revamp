import Image from "next/image";
import Link from "next/link";
import "@/styles/about.css";

const ASSET_ROOT = "/assets/About-page";
const ICON_ROOT = `${ASSET_ROOT}/icons`;

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
  icon: string;
};

const STATS: readonly Stat[] = [
  { value: "50,000+", label: "Active Traders" },
  { value: "180+", label: "Countries" },
  { value: "200+", label: "Instruments" },
  { value: "3+", label: "Global Offices" },
] as const;

const TIMELINE: readonly TimelineMilestone[] = [
  {
    year: "2018",
    title: "Founded",
    body: "A trader-first vision takes shape.",
  },
  {
    year: "2020",
    title: "Expanded",
    body: "Reached clients across global markets.",
  },
  {
    year: "Today",
    title: "Trusted",
    body: "Building a trusted sanctuary for modern traders.",
  },
] as const;

const VALUES: readonly IllustratedItem[] = [
  {
    title: "Integrity",
    body: "We do what’s right, always.",
    icon: "integrity-shield.png",
  },
  {
    title: "Transparency",
    body: "Clear conditions. No hidden agendas.",
    icon: "transparency-document.png",
  },
  {
    title: "Innovation",
    body: "Always improving the trading experience.",
    icon: "innovation-bulb.png",
  },
  {
    title: "Traders First",
    body: "Support built around real trader needs.",
    icon: "traders-first-users.png",
  },
] as const;

const BENEFITS: readonly IllustratedItem[] = [
  {
    title: "Global Reach",
    body: "Trade from over 180 countries.",
    icon: "global-reach-globe.png",
  },
  {
    title: "Advanced Technology",
    body: "Fast, stable, and reliable infrastructure.",
    icon: "advanced-technology-growth.png",
  },
  {
    title: "Secure & Regulated",
    body: "A professional environment built on trust.",
    icon: "secure-regulated-shield.png",
  },
  {
    title: "Client-First Support",
    body: "Real people. Real help.",
    icon: "client-first-support-headset.png",
  },
] as const;

const COMMUNITY_PILLARS: readonly IllustratedItem[] = [
  {
    title: "Education",
    body: "Learn and develop your skills.",
    icon: "education-cap.png",
  },
  {
    title: "Global Community",
    body: "Connect with traders worldwide.",
    icon: "global-community-group.png",
  },
  {
    title: "Commission Incentives",
    body: "Trade more. Get more.",
    icon: "commission-incentives-gift.png",
  },
] as const;

function IconImage({
  file,
  size,
}: {
  file: string;
  size: number;
}) {
  return (
    <Image
      src={`${ICON_ROOT}/${file}`}
      alt=""
      width={size}
      height={size}
      className="about-icon"
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
                Dominion Markets is built for traders who value transparency,
                confidence, and performance. We combine institutional-grade
                conditions with a client-first experience designed to help
                traders grow with clarity.
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
                Our mission is to provide a secure, modern, and accessible
                trading environment where traders of all levels can operate
                with confidence. We focus on trust, technology, and long-term
                relationships over hype.
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
                <IconImage file={value.icon} size={88} />
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
                We believe a broker should offer more than access to markets.
                Dominion Markets combines smart technology, responsive support,
                and professional-grade conditions in one seamless experience.
              </p>
            </header>
            <div className="about-benefits__grid">
              {BENEFITS.map((benefit) => (
                <article key={benefit.title}>
                  <IconImage file={benefit.icon} size={62} />
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.body}</p>
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
            <p className="about-eyebrow">More Than a Broker</p>
            <h2 id="about-community-title">A Global Community of Traders</h2>
            <p>
              Education, incentives, and a strong support culture help our
              clients do more than trade — they grow.
            </p>
          </header>
          <div className="about-community__pillars">
            {COMMUNITY_PILLARS.map((pillar) => (
              <article key={pillar.title}>
                <IconImage file={pillar.icon} size={66} />
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
          <p className="about-community__quote">
            “Built by traders, for traders.”
          </p>
        </div>
      </section>

      <section
        className="about-final"
        id="about-final-cta"
        aria-labelledby="about-final-title"
      >
        <Image
          src={`${ASSET_ROOT}/about-light-wave-background.png`}
          alt=""
          fill
          sizes="100vw"
          className="about-cover about-final__waves"
        />
        <div className="about-wrap">
          <header className="about-section-heading">
            <p className="about-eyebrow">Your Next Chapter</p>
            <h2 id="about-final-title">Trade with a Global Partner</h2>
            <p>
              Experience a trading environment designed around trust, clarity,
              and opportunity.
            </p>
          </header>
          <div className="about-final__actions">
            <Link className="about-button" href="/accounts">
              Open an Account <Arrow />
            </Link>
            <Link
              className="about-button about-button--outline"
              href="#our-story"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
