import Image from "next/image";
import Link from "next/link";
import "@/styles/accounts.css";

const ASSET_ROOT = "/assets/Accounts-page";
const ICON_ROOT = `${ASSET_ROOT}/icons`;

type AccountId = "standard" | "ecn" | "institutional" | "islamic";

type AccountType = {
  id: AccountId;
  name: string;
  subtitle: string;
  bestFor: string;
  spread: string;
  commission: string;
  minimum: string;
  platform: string;
  keyBenefit: string;
  icon: string;
  features: readonly string[];
};

type ComparisonFeature = {
  label: string;
  key: keyof Pick<
    AccountType,
    "bestFor" | "spread" | "commission" | "minimum" | "platform" | "keyBenefit"
  >;
};

type Benefit = {
  title: string;
  body: string;
  icon: string;
};

type OnboardingStep = {
  title: string;
  body: string;
  icon: string;
};

type FrequentlyAskedQuestion = {
  question: string;
  answer: string;
};

type HeroBenefit = {
  title: string;
  icon: string;
};

const ACCOUNTS: readonly AccountType[] = [
  {
    id: "standard",
    name: "Standard STP",
    subtitle: "Simple · Transparent · Reliable",
    bestFor: "Novice traders",
    spread: "2.0 pip",
    commission: "$0.00",
    minimum: "$50",
    platform: "cTrader",
    keyBenefit: "Simple & accessible",
    icon: "layers.png",
    features: [
      "Simple, direct market access",
      "No commissions",
      "Competitive spreads",
      "Clear pricing",
      "One-click trading",
      "Minimum deposit $50",
      "Leverage up to 500:1",
      "Ideal for novice traders",
    ],
  },
  {
    id: "ecn",
    name: "ECN",
    subtitle: "For the Experienced Trader",
    bestFor: "Experienced traders",
    spread: "0.0 pip",
    commission: "$3.5",
    minimum: "$100",
    platform: "cTrader",
    keyBenefit: "Deep liquidity & tight spreads",
    icon: "network.png",
    features: [
      "Built for experienced traders",
      "Raw spreads from 0.0 pip",
      "Transparent commission",
      "Deep liquidity access",
      "Direct market execution",
      "Tight, transparent pricing",
      "Minimum deposit $100",
      "Designed for active strategies",
    ],
  },
  {
    id: "institutional",
    name: "ECN Institutional",
    subtitle: "Built for Professionals",
    bestFor: "Professional traders",
    spread: "0.0 pip",
    commission: "$3.0",
    minimum: "$20,000",
    platform: "MetaTrader 5",
    keyBenefit: "Institutional-grade liquidity",
    icon: "institution.png",
    features: [
      "Institutional-grade liquidity",
      "Raw spreads from 0.0 pip",
      "$3.0 one-way commission",
      "Professional trading conditions",
      "MetaTrader 5 only",
      "Transparent execution",
      "Minimum deposit $20,000",
      "Built for professional traders",
    ],
  },
  {
    id: "islamic",
    name: "Islamic",
    subtitle: "Trade With Confidence",
    bestFor: "Traders seeking Sharia-compliant conditions",
    spread: "1.0 pip",
    commission: "$3.5",
    minimum: "$50",
    platform: "cTrader",
    keyBenefit: "Swap-free trading",
    icon: "crescent-star.png",
    features: [
      "Sharia-compliant conditions",
      "100% swap-free trading",
      "Spreads from 1.0 pip",
      "$3.5 one-way commission",
      "Access to all instruments",
      "Transparent pricing",
      "Minimum deposit $50",
      "Available on cTrader",
    ],
  },
] as const;

const COMPARISON_FEATURES: readonly ComparisonFeature[] = [
  { label: "Best For", key: "bestFor" },
  { label: "Spread (from)", key: "spread" },
  { label: "Commission (one way)", key: "commission" },
  { label: "Minimum Deposit", key: "minimum" },
  { label: "Trading Platform", key: "platform" },
  { label: "Key Benefit", key: "keyBenefit" },
] as const;

const HERO_BENEFITS: readonly HeroBenefit[] = [
  { title: "Multiple Account Options", icon: "layers.png" },
  { title: "Transparent Trading Conditions", icon: "infinity.png" },
  { title: "Regulated & Trusted", icon: "shield-check.png" },
  { title: "2,800+ Traders Live", icon: "users.png" },
] as const;

const BENEFITS: readonly Benefit[] = [
  {
    title: "Tight Spreads",
    body: "Competitive pricing across our account types.",
    icon: "bar-chart.png",
  },
  {
    title: "Fast Execution",
    body: "Low-latency infrastructure built for trade execution.",
    icon: "lightning.png",
  },
  {
    title: "Flexible Platforms",
    body: "Trade on cTrader and MetaTrader 5.",
    icon: "platforms.png",
  },
  {
    title: "Secure Funding",
    body: "Multiple secure account funding methods.",
    icon: "shield-lock.png",
  },
  {
    title: "Dedicated Support",
    body: "A responsive, knowledgeable support team.",
    icon: "headset.png",
  },
  {
    title: "Regulated Environment",
    body: "Licensed and trusted for your peace of mind.",
    icon: "file-shield.png",
  },
] as const;

const ONBOARDING_STEPS: readonly OnboardingStep[] = [
  {
    title: "Register",
    body: "Choose an account type and complete our secure application.",
    icon: "document-edit.png",
  },
  {
    title: "Fund",
    body: "Fund your trading account using one of our available methods.",
    icon: "wallet.png",
  },
  {
    title: "Trade",
    body: "Start trading on your live account across 2,800+ instruments.",
    icon: "trend-up.png",
  },
] as const;

function getAccount(id: AccountId): AccountType {
  const account = ACCOUNTS.find((item) => item.id === id);
  if (!account) {
    throw new Error(`Unknown account type: ${id}`);
  }
  return account;
}

const standardAccount = getAccount("standard");
const ecnAccount = getAccount("ecn");
const institutionalAccount = getAccount("institutional");
const islamicAccount = getAccount("islamic");
const platforms = [...new Set(ACCOUNTS.map((account) => account.platform))].join(
  " and ",
);

const FAQS: readonly FrequentlyAskedQuestion[] = [
  {
    question: "Which account is best for beginners?",
    answer: `${standardAccount.name} is designed for ${standardAccount.bestFor.toLowerCase()}, with spreads from ${standardAccount.spread}, ${standardAccount.commission} one-way commission, and a ${standardAccount.minimum} minimum deposit.`,
  },
  {
    question: "What is the minimum deposit?",
    answer: `The lowest minimum deposit is ${standardAccount.minimum} for ${standardAccount.name} and ${islamicAccount.name}. ${ecnAccount.name} requires ${ecnAccount.minimum}, while ${institutionalAccount.name} requires ${institutionalAccount.minimum}.`,
  },
  {
    question: "Can I open a Shariah account?",
    answer: `Yes. The ${islamicAccount.name} account offers ${islamicAccount.keyBenefit.toLowerCase()} with spreads from ${islamicAccount.spread} on ${islamicAccount.platform}.`,
  },
  {
    question: "What platforms are available?",
    answer: `${platforms} are available. ${institutionalAccount.name} is offered exclusively on ${institutionalAccount.platform}; the other account types use cTrader.`,
  },
  {
    question: "Do all accounts support leverage?",
    answer:
      "Leverage availability depends on the account, instrument, and applicable trading conditions. Review the current terms before opening an account.",
  },
  {
    question: "What is the difference between STP and ECN?",
    answer: `${standardAccount.name} prioritizes ${standardAccount.keyBenefit.toLowerCase()} with no commission. ${ecnAccount.name} offers ${ecnAccount.keyBenefit.toLowerCase()} from ${ecnAccount.spread} plus a ${ecnAccount.commission} one-way commission.`,
  },
] as const;

function IconImage({
  file,
  size = 28,
  className,
}: {
  file: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={`${ICON_ROOT}/${file}`}
      alt=""
      width={size}
      height={size}
      className={className}
    />
  );
}

function Arrow() {
  return (
    <span aria-hidden="true" className="accounts-arrow">
      →
    </span>
  );
}

export function AccountsPage() {
  return (
    <main className="accounts-page" id="top">
      <section className="accounts-hero" aria-labelledby="accounts-hero-title">
        <Image
          src={`${ASSET_ROOT}/accounts-hero-mountains.png`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="accounts-cover"
        />
        <div className="accounts-hero__wash" aria-hidden="true" />
        <div className="accounts-wrap accounts-hero__inner">
          <nav className="accounts-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span>Trading Account Types</span>
          </nav>
          <div className="accounts-hero__layout">
            <div className="accounts-hero__copy">
              <p className="accounts-eyebrow">Trading for a brighter tomorrow</p>
              <h1 id="accounts-hero-title">Account Types</h1>
              <p>
                Whether you are a beginner, a professional, or an intraday
                trader, Dominion Markets has the right account for you. Choose
                the account type that matches your trading style and goals,
                and trade with confidence.
              </p>
            </div>
            <p className="accounts-hero__aside">
              Higher opportunities.
              <br />A brighter tomorrow.
            </p>
          </div>
          <div
            className="accounts-hero__benefits"
            aria-label="Account benefits"
          >
            {HERO_BENEFITS.map((benefit) => (
              <div key={benefit.title}>
                <IconImage file={benefit.icon} size={30} />
                <span>{benefit.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="accounts-flow">
        <section
          className="accounts-cards-section"
          aria-label="Dominion Markets account types"
        >
          <div className="accounts-wrap accounts-card-grid">
            {ACCOUNTS.map((account) => (
              <article className="accounts-card" key={account.id}>
                <header className="accounts-card__header">
                  <IconImage file={account.icon} size={39} />
                  <div>
                    <h2>{account.name}</h2>
                    <p>{account.subtitle}</p>
                  </div>
                </header>
                <div className="accounts-card__price">
                  <span>One way</span>
                  <strong>{account.commission}</strong>
                  <small>Spread from {account.spread}</small>
                </div>
                <ul>
                  {account.features.map((feature) => (
                    <li key={feature}>
                      <IconImage file="check-circle.png" size={14} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link className="accounts-button" href="/#final-cta">
                  Open an Account <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          className="accounts-comparison"
          aria-labelledby="accounts-comparison-title"
        >
          <div className="accounts-wrap">
            <header className="accounts-section-heading">
              <h2 id="accounts-comparison-title">
                Which Account Fits Your Trading Style?
              </h2>
              <p>
                Compare account features side by side and find the right match
                for your trading goals.
              </p>
            </header>

            <div className="accounts-table-wrap">
              <table>
                <caption className="accounts-visually-hidden">
                  Dominion Markets account type comparison
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Feature</th>
                    {ACCOUNTS.map((account) => (
                      <th scope="col" key={account.id}>
                        <span>
                          <IconImage file={account.icon} size={28} />
                          {account.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((feature) => (
                    <tr key={feature.key}>
                      <th scope="row">{feature.label}</th>
                      {ACCOUNTS.map((account) => (
                        <td key={account.id}>{account[feature.key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="accounts-comparison-mobile">
              {ACCOUNTS.map((account) => (
                <article key={account.id}>
                  <h3>
                    <IconImage file={account.icon} size={30} />
                    {account.name}
                  </h3>
                  <dl>
                    {COMPARISON_FEATURES.map((feature) => (
                      <div key={feature.key}>
                        <dt>{feature.label}</dt>
                        <dd>{account[feature.key]}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="accounts-benefits"
          aria-labelledby="accounts-benefits-title"
        >
          <div className="accounts-wrap">
            <header className="accounts-section-heading">
              <h2 id="accounts-benefits-title">
                Why Trade With Dominion Markets?
              </h2>
              <p>
                More than just a trading account. A trusted partner in your
                trading journey.
              </p>
            </header>
            <div className="accounts-benefits__grid">
              {BENEFITS.map((benefit) => (
                <article key={benefit.title}>
                  <IconImage file={benefit.icon} size={32} />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="accounts-start"
          aria-labelledby="accounts-start-title"
        >
          <div className="accounts-wrap">
            <header className="accounts-section-heading">
              <h2 id="accounts-start-title">How to Start?</h2>
              <p>
                Open your live trading account in just a few simple steps and
                get access to global markets.
              </p>
            </header>
            <ol className="accounts-start__steps">
              {ONBOARDING_STEPS.map((step, index) => (
                <li key={step.title}>
                  <span className="accounts-start__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <IconImage file={step.icon} size={35} />
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="accounts-actions">
              <Link className="accounts-button" href="/#final-cta">
                Register Now <Arrow />
              </Link>
              <Link
                className="accounts-button accounts-button--outline"
                href="/#client-area"
              >
                Client Login
              </Link>
            </div>
          </div>
        </section>

        <section className="accounts-faq" aria-labelledby="accounts-faq-title">
          <div className="accounts-wrap">
            <header className="accounts-section-heading">
              <h2 id="accounts-faq-title">Frequently Asked Questions</h2>
              <p>Find quick answers to common questions about our accounts.</p>
            </header>
            <div className="accounts-faq__grid">
              {FAQS.map((item) => (
                <details key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <span aria-hidden="true" className="accounts-faq__plus">
                      +
                    </span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section
        className="accounts-final"
        id="accounts-final-cta"
        aria-labelledby="accounts-final-title"
      >
        <Image
          src={`${ASSET_ROOT}/accounts-cta-mountains.png`}
          alt=""
          fill
          sizes="100vw"
          className="accounts-cover"
        />
        <div className="accounts-final__veil" aria-hidden="true" />
        <div className="accounts-wrap accounts-final__inner">
          <div>
            <p className="accounts-eyebrow">Ready to trade?</p>
            <h2 id="accounts-final-title">
              Take a step forward.
              <br />
              Open an account with us.
            </h2>
          </div>
          <Link className="accounts-button" href="/#final-cta">
            Register Now <Arrow />
          </Link>
          <p className="accounts-final__aside">
            Higher opportunities.
            <br />A brighter tomorrow.
          </p>
        </div>
      </section>
    </main>
  );
}
