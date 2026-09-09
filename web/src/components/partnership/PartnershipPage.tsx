import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  BarChart3,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Coins,
  DollarSign,
  Globe2,
  Handshake,
  Headphones,
  Leaf,
  Mail,
  Monitor,
  Share2,
  ShieldCheck,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { IncomeCalculator } from "@/components/partnership/IncomeCalculator";
import "@/styles/partnership.css";

const ASSET_ROOT = "/assets/Partnership-page";

type IconType = ComponentType<{
  size?: number | string;
  strokeWidth?: number | string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

type IconItem = {
  title: string;
  body?: string;
  icon: IconType;
};

const HERO_BENEFITS: readonly IconItem[] = [
  { title: "Trusted Global Broker", icon: Globe2 },
  { title: "Competitive Payouts", icon: CircleDollarSign },
  { title: "Your Growth, Our Support", icon: Headphones },
] as const;

const BROKER_BENEFITS: readonly IconItem[] = [
  {
    title: "Tight, transparent spreads",
    body: "Competitive pricing from 1 pip on Gold and from 0.0 pips on EUR/USD, subject to account conditions.",
    icon: Coins,
  },
  {
    title: "Leverage up to 1:500",
    body: "Flexible account options, including swap-free Islamic accounts where available.",
    icon: TrendingUp,
  },
  {
    title: "Cutting-edge trading platforms",
    body: "Full access to MT5 and cTrader across desktop, web, and mobile.",
    icon: Monitor,
  },
  {
    title: "Efficient withdrawals",
    body: "Eligible withdrawal requests are processed quickly, with support available when needed.",
    icon: Zap,
  },
] as const;

const PROGRAM_FEATURES: readonly IconItem[] = [
  {
    title: "Tightest spreads in the industry",
    body: "Starting from 1 pip on Gold and from 0.0 pips on EUR/USD.",
    icon: Coins,
  },
  {
    title: "Cutting-edge trading platforms",
    body: "Lowest latency, advanced technology, and a seamless experience.",
    icon: Monitor,
  },
  {
    title: "Leverage up to 1:500 & swap free",
    body: "Swap-free options with leverage up to 1:500 on Islamic accounts.",
    icon: BarChart3,
  },
  {
    title: "Efficient withdrawals",
    body: "Fast withdrawal processing with client-first support.",
    icon: Zap,
  },
] as const;

const STATS: readonly {
  value: string;
  label: string;
  icon: IconType;
}[] = [
  { value: "1,000+", label: "IBs & Affiliates", icon: Handshake },
  { value: "90,000+", label: "Dominion Markets Clients", icon: Users },
  { value: "200+", label: "Trading Instruments", icon: BarChart3 },
  { value: "3+", label: "Offices & Branches", icon: Globe2 },
] as const;

const STEPS: readonly IconItem[] = [
  {
    title: "Register",
    body: "Register with us and sign up for an IB agreement.",
    icon: UserPlus,
  },
  {
    title: "Introduce",
    body: "Refer clients to Dominion Markets.",
    icon: Share2,
  },
  {
    title: "Earn",
    body: "Track eligible commissions in your partner dashboard.",
    icon: Wallet,
  },
] as const;

const FAQS = [
  {
    question: "What is involved in the Dominion Markets affiliate program?",
    answer:
      "You introduce eligible clients to Dominion Markets through your unique referral link. The partner dashboard helps you monitor referrals and qualifying trading activity.",
  },
  {
    question: "What are the costs associated with joining the affiliate program?",
    answer:
      "There is no application fee to join. Eligibility, commission conditions, and regional restrictions are reviewed during onboarding.",
  },
  {
    question: "Why should I become an affiliate for Dominion Markets?",
    answer:
      "Partners receive transparent commission terms, marketing support, access to established trading platforms, and a dedicated point of contact.",
  },
  {
    question: "Is there a limit on the number of traders I can refer?",
    answer:
      "There is no fixed referral limit, subject to the program agreement, compliance checks, and the availability of services in each client’s jurisdiction.",
  },
  {
    question: "What kind of support and resources will I receive?",
    answer:
      "Approved partners receive campaign materials, performance reporting, onboarding guidance, and support from the Dominion Markets partnerships team.",
  },
] as const;

const DESTINATIONS: readonly {
  title: string;
  href: string;
  icon: IconType;
}[] = [
  { title: "About Us", href: "/about", icon: Leaf },
  { title: "Blogs", href: "/#blogs", icon: BookOpen },
  {
    title: "Leaderboard",
    href: "/incentives/leaderboard-challenge",
    icon: Trophy,
  },
  { title: "Contact", href: "/#contact", icon: Headphones },
] as const;

function IconBadge({
  icon: Icon,
  size = 22,
}: {
  icon: IconType;
  size?: number;
}) {
  return (
    <span className="partner-icon" aria-hidden="true">
      <Icon size={size} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}

function Arrow() {
  return <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />;
}

export function PartnershipPage() {
  return (
    <main className="partner-page">
      <section
        className="partner-hero"
        id="top"
        aria-labelledby="partner-hero-title"
      >
        <div className="partner-hero__chart" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="partner-hero__orb partner-hero__orb--one" aria-hidden="true" />
        <div className="partner-hero__orb partner-hero__orb--two" aria-hidden="true" />

        <div className="partner-wrap partner-hero__layout">
          <div className="partner-hero__copy">
            <p className="partner-eyebrow">Partner with Dominion Markets</p>
            <h1 id="partner-hero-title">
              Chart Your Own Path
              <br />
              with Dominion Markets.
            </h1>
            <p>
              Partnering with Dominion Markets is a straightforward and highly
              rewarding opportunity for the right partners.
            </p>
            <div className="partner-actions">
              <Link className="partner-button" href="#how-it-works">
                Become an IB <Arrow />
              </Link>
              <Link
                className="partner-button partner-button--outline-dark"
                href="/#client-area"
              >
                Partner Login
              </Link>
            </div>
          </div>

          <div className="partner-hero__visual" aria-hidden="true">
            <div className="partner-hero__globe" />
            <Image
              src={`${ASSET_ROOT}/partnership-hero-partner.png`}
              alt=""
              width={864}
              height={1152}
              priority
              unoptimized
              className="partner-hero__person"
            />
            <p className="partner-hero__note">
              More Clients
              <br />
              Bigger Opportunities
            </p>
          </div>
        </div>

        <div className="partner-wrap partner-hero__benefits">
          {HERO_BENEFITS.map((benefit) => (
            <div key={benefit.title}>
              <IconBadge icon={benefit.icon} size={18} />
              <span>{benefit.title}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="partner-light-flow">
        <section
          className="partner-income"
          id="income"
          aria-labelledby="partner-income-title"
        >
          <div className="partner-wrap partner-income__layout">
            <header>
              <p className="partner-eyebrow">Grow at your pace</p>
              <h2 id="partner-income-title">
                The More Clients You Sign Up,
                <br />
                the Greater Your Income
              </h2>
              <p>
                Move the slider to explore an illustrative monthly estimate
                based on the total number of clients you refer.
              </p>
            </header>
            <IncomeCalculator />
          </div>
          <p className="partner-disclaimer partner-wrap">
            Estimates are illustrative only. Actual commissions depend on
            eligible client activity and your signed partner agreement.
          </p>
        </section>

        <section
          className="partner-broker"
          id="why-partner"
          aria-labelledby="partner-broker-title"
        >
          <div className="partner-wrap partner-broker__layout">
            <div className="partner-broker__copy">
              <p className="partner-eyebrow">A partnership built for you</p>
              <h2 id="partner-broker-title">
                Be Your Own Broker
                <br />
                with Dominion Markets!
              </h2>
              <p>
                As a partner of Dominion Markets, you can earn commissions on
                eligible trading activity under your agreed program terms.
              </p>
              <h3>What Dominion Markets offers:</h3>
              <ul>
                {BROKER_BENEFITS.map((benefit) => (
                  <li key={benefit.title}>
                    <span aria-hidden="true">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <p>
                      <strong>{benefit.title}</strong>
                      {benefit.body}
                    </p>
                  </li>
                ))}
              </ul>
              <Link className="partner-text-link" href="#program">
                Explore the program <Arrow />
              </Link>
            </div>

            <div className="partner-broker__visual">
              <Image
                src={`${ASSET_ROOT}/partnership-dashboard-devices.png`}
                alt="Partner dashboard displayed on a laptop and phone"
                width={1152}
                height={864}
                loading="eager"
                className="partner-broker__devices"
              />
              <span className="partner-broker__tag partner-broker__tag--one">
                Partner
                <br />
                Grow · Earn
                <br />
                Belong
              </span>
              <span className="partner-broker__tag partner-broker__tag--two">
                Same markets
                <br />
                New possibilities
              </span>
            </div>
          </div>
        </section>

        <section className="partner-stats" aria-label="Partnership facts">
          <div className="partner-wrap partner-stats__grid">
            {STATS.map((stat) => (
              <article key={stat.label}>
                <stat.icon size={31} strokeWidth={1.7} aria-hidden="true" />
                <div>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="partner-program"
          id="program"
          aria-labelledby="partner-program-title"
        >
          <div className="partner-wrap">
            <header className="partner-section-heading">
              <p className="partner-eyebrow">More than a program</p>
              <h2 id="partner-program-title">
                Dominion Markets Affiliate Program Includes
              </h2>
            </header>

            <div className="partner-program__layout">
              <div className="partner-program__column">
                {PROGRAM_FEATURES.slice(0, 2).map((feature) => (
                  <article key={feature.title}>
                    <IconBadge icon={feature.icon} size={28} />
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.body}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="partner-program__portrait">
                <span className="partner-program__globe" aria-hidden="true" />
                <Image
                  src={`${ASSET_ROOT}/partnership-hero-partner.png`}
                  alt=""
                  width={864}
                  height={1152}
                  unoptimized
                  loading="eager"
                  className="partner-program__person"
                />
                <span className="partner-program__orbit-dot" aria-hidden="true" />
              </div>

              <div className="partner-program__column">
                {PROGRAM_FEATURES.slice(2).map((feature) => (
                  <article key={feature.title}>
                    <IconBadge icon={feature.icon} size={28} />
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="partner-steps"
          id="how-it-works"
          aria-labelledby="partner-steps-title"
        >
          <div className="partner-wrap partner-steps__layout">
            <header>
              <p className="partner-eyebrow">Get started today</p>
              <h2 id="partner-steps-title">How Does It Work</h2>
            </header>
            <ol>
              {STEPS.map((step, index) => (
                <li key={step.title}>
                  <span className="partner-steps__number">{index + 1}</span>
                  <IconBadge icon={step.icon} size={25} />
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                  {index < STEPS.length - 1 ? (
                    <ChevronRight
                      className="partner-steps__arrow"
                      size={25}
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="partner-faq"
          id="faqs"
          aria-labelledby="partner-faq-title"
        >
          <div className="partner-wrap partner-faq__layout">
            <header>
              <p className="partner-eyebrow">Common questions</p>
              <h2 id="partner-faq-title">Frequently Asked Questions</h2>
              <p className="partner-faq__signature">
                Your ambition
                <br />
                Our support
              </p>
            </header>
            <div className="partner-faq__questions">
              {FAQS.map((item) => (
                <details key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <span className="partner-faq__plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="partner-next"
          aria-labelledby="partner-next-title"
        >
          <div className="partner-wrap">
            <h2 id="partner-next-title">Choose Where To Go Next</h2>
            <nav className="partner-next__grid" aria-label="Related pages">
              {DESTINATIONS.map((destination) => (
                <Link key={destination.title} href={destination.href}>
                  <destination.icon
                    size={22}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>{destination.title}</span>
                  <ChevronRight size={17} aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </div>

      <section
        className="partner-cta"
        aria-labelledby="partner-cta-title"
      >
        <div className="partner-wrap partner-cta__layout">
          <div>
            <p className="partner-eyebrow">People · Partnership · Progress</p>
            <h2 id="partner-cta-title">Ready to partner and grow?</h2>
          </div>
          <Link className="partner-button" href="#how-it-works">
            Register Now <Arrow />
          </Link>
          <div className="partner-cta__proof">
            <ShieldCheck size={24} aria-hidden="true" />
            <span>Licensed brokerage</span>
            <Building2 size={24} aria-hidden="true" />
            <span>Global support</span>
            <DollarSign size={24} aria-hidden="true" />
            <span>Transparent terms</span>
            <CheckCircle2 size={24} aria-hidden="true" />
            <span>Simple onboarding</span>
            <Mail size={24} aria-hidden="true" />
          </div>
        </div>
      </section>
    </main>
  );
}
