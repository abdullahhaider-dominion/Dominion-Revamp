import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Check,
  ChevronRight,
  GraduationCap,
  Landmark,
  Quote,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { CommissionIncluded } from "@/components/commission/CommissionIncluded";
import "@/styles/commission-incentives.css";

const ASSET_ROOT = "/assets/commission-incentives";

const ASSETS = {
  promo: `${ASSET_ROOT}/promo-banner.png`,
  magic: `${ASSET_ROOT}/magic-mountains.png`,
  whiteMist: `${ASSET_ROOT}/mist-light.png`,
  stats: `${ASSET_ROOT}/stats-mountains.png`,
  funding: `${ASSET_ROOT}/funding-mountains.png`,
  faq: `${ASSET_ROOT}/mist-curve.png`,
  keys: `${ASSET_ROOT}/magic-keys.png`,
} as const;

const MAGIC_BENEFITS = [
  "Manage risk — Open orders based on your risk parameters with dynamic position and risk/reward calculations.",
  "Automate trade management — Set automatic trade management rules, including break-even and multiple profit targets.",
  "Easy trade entry — Open and manage positions with precision and speed using one-click controls.",
  "Trading limits — Set daily, weekly and total loss limits to keep your risk within a disciplined trading routine.",
  "Statistics — View results on your performance, including profitability, commissions and trade analytics.",
] as const;

const SEMINAR_CARDS = [
  {
    icon: BarChart3,
    title: "Practical Insights from Professionals",
    body: "Benefit from professional sessions that explore real market examples, strategies, risk management and trading psychology.",
  },
  {
    icon: BookOpenCheck,
    title: "Learn Candle Reading Techniques",
    body: "Discover how to analyse candlestick patterns, recognise market sentiment and plan entries with greater clarity.",
  },
  {
    icon: GraduationCap,
    title: "Master Price Action Basics",
    body: "Understand the core principles of price action and learn how to identify high-probability setups without relying on complex indicators.",
  },
] as const;

const STATS = [
  { icon: UsersRound, label: "Dominion Markets Clients", value: "50,000+" },
  { icon: Landmark, label: "Offices and Branches", value: "3+" },
  { icon: BarChart3, label: "Trading Instruments", value: "200+" },
] as const;

const TESTIMONIALS = [
  {
    title: "Magic Keys has made very precise steps...",
    body: "Magic Keys has made a huge difference to my trading. The practical range of tools allows me to execute my strategies more efficiently and with greater confidence.",
    author: "Karl R.",
  },
  {
    title: "Native to MT4/MT5 and elegantly designed...",
    body: "The commissions are transparent and the platform is reliable. The seminars are valuable, and I appreciate having a supportive trading community.",
    author: "Robert R.",
  },
  {
    title: "This product is ideal for precise entries.",
    body: "It is a practical tool for precise entries. I manage risk and targets at the correct level, and the seminars and Discord community have also been excellent resources.",
    author: "Erika H.",
  },
] as const;

const FAQS = [
  {
    question: "What are commission incentives?",
    answer:
      "Commission incentives reward eligible trading activity with access to premium tools, educational seminars and the Dominion Markets Discord community.",
  },
  {
    question: "How do I get access to Commission Incentives?",
    answer:
      "Open and fund an eligible Dominion Markets account, meet the qualifying commission requirement and contact your account manager to activate the benefits.",
  },
  {
    question:
      "What if I wish to purchase Magic Keys but currently lack sufficient commissions in my account?",
    answer:
      "Contact our support team. If your account meets the programme requirements, the team will review your activity and help activate the eligible benefit.",
  },
  {
    question:
      "If my account lacks sufficient commissions, what options do I have to purchase Market Fluidity courses?",
    answer:
      "The programme requirements are designed to keep rewards transparent and sustainable. Your account manager can confirm the exact qualification route for your account.",
  },
  {
    question: "How do I get access to the Discord Community?",
    answer:
      "Once qualified, you will receive a private invitation to the Dominion Markets Discord community by email or through your account manager.",
  },
  {
    question: "Are the course and Magic Keys worth the investment?",
    answer:
      "They are designed to improve execution, risk management and market understanding. Their value depends on your trading approach and how consistently you apply the tools.",
  },
] as const;

function RegisterButton({
  children = "Register Now",
  outline = false,
}: {
  children?: string;
  outline?: boolean;
}) {
  return (
    <Link
      className={`ci-button${outline ? " ci-button--outline" : ""}`}
      href="/#accounts"
    >
      {children}
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  );
}

export function CommissionIncentives() {
  return (
    <main className="ci-page" id="top">
      <section className="ci-hero" aria-labelledby="ci-hero-title">
        <div className="ci-wrap ci-hero__content">
          <nav className="ci-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span>Commission Incentives</span>
          </nav>

          <div className="ci-hero__heading">
            <div>
              <h1 id="ci-hero-title">Commission Incentives</h1>
              <p>Contact us · incentives@dominionmarkets.com</p>
            </div>
            <p className="ci-side-note">Same brand · Bigger incentives</p>
          </div>

          <article className="ci-promo">
            <Image
              src={ASSETS.promo}
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 100vw, 90vw"
              className="ci-promo__bg"
            />
            <div className="ci-promo__copy">
              <h2>
                Commission <span>Incentives</span>
              </h2>
              <p>
                At Dominion Markets, our commission rewards give you more
                than competitive trading conditions — they reward top-tier
                execution, expert education and a like-minded community of
                traders.
              </p>
              <ul>
                <li>Trade</li>
                <li>Learn</li>
                <li>Improve</li>
                <li>Repeat</li>
              </ul>
            </div>
            <p className="ci-promo__micro">
              3 benefits
              <span>to maximise</span>
              <span>knowledge</span>
            </p>
          </article>
        </div>
      </section>

      <section className="ci-included" aria-labelledby="ci-included-title">
        <Image
          src={ASSETS.whiteMist}
          alt=""
          fill
          sizes="100vw"
          className="ci-section-bg"
        />
        <div className="ci-wrap">
          <header className="ci-section-heading ci-section-heading--center">
            <h2 id="ci-included-title">What&apos;s included</h2>
            <p>Turn your trading activity into powerful opportunities.</p>
          </header>

          <CommissionIncluded />
        </div>
      </section>

      <section className="ci-magic" aria-labelledby="ci-magic-title">
        <Image
          src={ASSETS.magic}
          alt=""
          fill
          sizes="100vw"
          className="ci-section-bg"
        />
        <div className="ci-magic__veil" aria-hidden="true" />
        <div className="ci-wrap ci-magic__grid">
          <div className="ci-magic__content">
            <header className="ci-section-heading ci-section-heading--light">
              <h2 id="ci-magic-title">Digital Magic Keys</h2>
              <p>Powerful tools for a more precise trading experience.</p>
            </header>
            <ul className="ci-check-list">
              {MAGIC_BENEFITS.map((benefit) => (
                <li key={benefit}>
                  <span>
                    <Check size={13} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="ci-actions">
              <RegisterButton />
              <RegisterButton outline>Client Login</RegisterButton>
            </div>
            <p className="ci-magic__note">
              Same market · More possibilities
            </p>
          </div>

          <div className="ci-magic__visual">
            <span className="ci-magic__halo" aria-hidden="true" />
            <Image
              src={ASSETS.keys}
              alt="Digital Magic Keys trading keypad"
              fill
              priority
              sizes="(max-width: 767px) 76vw, 42vw"
            />
            <p>Tools that build opportunity</p>
          </div>
        </div>
      </section>

      <section className="ci-seminars" aria-labelledby="ci-seminars-title">
        <Image
          src={ASSETS.whiteMist}
          alt=""
          fill
          sizes="100vw"
          className="ci-section-bg"
        />
        <div className="ci-wrap ci-seminars__grid">
          <div className="ci-seminars__intro">
            <h2 id="ci-seminars-title">Educational Seminars</h2>
            <p>Deepen your market knowledge with expert-led sessions.</p>
            <RegisterButton />
          </div>
          <div className="ci-seminars__cards">
            {SEMINAR_CARDS.map(({ icon: Icon, title, body }) => (
              <article className="ci-seminar-card" key={title}>
                <Icon size={24} strokeWidth={1.65} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ci-stats" aria-label="Dominion Markets statistics">
        <Image
          src={ASSETS.stats}
          alt=""
          fill
          sizes="100vw"
          className="ci-section-bg"
        />
        <div className="ci-stats__veil" aria-hidden="true" />
        <div className="ci-wrap ci-stats__grid">
          {STATS.map(({ icon: Icon, label, value }) => (
            <article key={label}>
              <Icon size={27} strokeWidth={1.55} aria-hidden="true" />
              <p>{label}</p>
              <strong>{value}</strong>
            </article>
          ))}
          <p className="ci-stats__note">
            Together, every milestone becomes possible
          </p>
        </div>
      </section>

      <section className="ci-funding" aria-labelledby="ci-funding-title">
        <Image
          src={ASSETS.funding}
          alt=""
          fill
          sizes="100vw"
          className="ci-section-bg"
        />
        <div className="ci-wrap ci-funding__inner">
          <Sparkles size={19} aria-hidden="true" />
          <h2 id="ci-funding-title">Immediate Account Setup and Funding</h2>
          <p>
            Unlock your trading account in minutes with simple onboarding and
            transparent funding.
          </p>
          <div className="ci-actions">
            <RegisterButton />
            <RegisterButton outline>Client Login</RegisterButton>
          </div>
          <span>Start today · Build the future you trade for</span>
        </div>
      </section>

      <section className="ci-testimonials" aria-labelledby="ci-testimonials-title">
        <div className="ci-wrap">
          <header className="ci-section-heading ci-section-heading--center">
            <h2 id="ci-testimonials-title">What our Clients says about us</h2>
          </header>
          <div className="ci-testimonials__grid">
            {TESTIMONIALS.map((testimonial) => (
              <article className="ci-testimonial" key={testimonial.title}>
                <Quote size={34} strokeWidth={1.3} aria-hidden="true" />
                <h3>{testimonial.title}</h3>
                <p>{testimonial.body}</p>
                <strong>{testimonial.author}</strong>
                <span aria-label="5 out of 5 stars">★★★★★</span>
              </article>
            ))}
          </div>
          <div className="ci-dots" aria-hidden="true">
            <span />
            <span className="is-active" />
            <span />
          </div>
        </div>
      </section>

      <section className="ci-faq" aria-labelledby="ci-faq-title">
        <Image
          src={ASSETS.faq}
          alt=""
          fill
          sizes="100vw"
          className="ci-section-bg"
        />
        <div className="ci-faq__wash" aria-hidden="true" />
        <div className="ci-wrap">
          <header className="ci-section-heading ci-section-heading--center">
            <h2 id="ci-faq-title">FAQs</h2>
            <p>Everything you need to know about commission incentives.</p>
          </header>
          <div className="ci-faq__list">
            {FAQS.map((faq) => (
              <details key={faq.question}>
                <summary>
                  <span>+</span>
                  {faq.question}
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
