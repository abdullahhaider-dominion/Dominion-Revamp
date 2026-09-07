import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import {
  ArrowRight,
  Calendar,
  Check,
  Copy,
  Repeat,
  Shield,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { LbTestimonials } from "@/components/leaderboard/LbTestimonials";
import "@/styles/leaderboard-challenge.css";

const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["600"],
});

const REGISTER_HREF = "/#accounts";

const PRIZES = [
  { amount: "$25k", label: "Account" },
  { amount: "$10k", label: "Account" },
  { amount: "$5k", label: "Account" },
] as const;

const REASONS = [
  {
    title: "Win Prizes:",
    body: "The top traders will receive significant prizes, rewarding their hard work and success in the challenge.",
  },
  {
    title: "Gain More Followers:",
    body: "As master traders in copy trading, the winners will attract more followers, allowing them to earn additional income from copiers.",
  },
  {
    title: "Showcase Your Skills:",
    body: "Climbing the leaderboard helps you gain recognition and enhances your trading reputation within the Dominion Markets community.",
  },
] as const;

const CONDITIONS = [
  { icon: Shield, label: "Max Drawdown 2.5%" },
  { icon: TrendingUp, label: "No limits on profits" },
  { icon: Copy, label: "Copy trading is allowed" },
  { icon: Repeat, label: "Minimum 3 trades per week" },
  { icon: Wallet, label: "Minimum starting deposit $800" },
] as const;

const STEPS = [
  {
    title: "Sign up for Dominion Markets",
    body: "Create an account with Dominion Markets to begin.",
  },
  {
    title: "Go to Copy Trading",
    body: "Find the Copy Trading section on your dashboard and open My Accounts.",
  },
  {
    title: "Create a new account",
    body: "From My Accounts, create a new Master Account to be eligible for the challenge.",
  },
] as const;

function RegisterCta({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  return (
    <Link href={REGISTER_HREF} className={className ?? "lb-cta"}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}

export function LeaderboardChallenge() {
  return (
    <main className="lb-page" id="top">
      <section className="lb-hero" aria-labelledby="lb-hero-title">
        <Image
          src="/assets/leaderboard-challenge/hero-city.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="lb-hero__bg"
        />
        <div className="lb-hero__glow" aria-hidden="true" />
        <div className="lb-wrap lb-hero__copy">
          <p className="lb-kicker">Trade · Compete · Win bigger</p>
          <h1 id="lb-hero-title" className="lb-hero__title">
            <span>Leaderboard</span>
            {" "}
            <span>
              Challenge <span className="lb-hero__live">is live</span>
            </span>
          </h1>
          <p className="lb-hero__end">
            <Calendar size={16} aria-hidden="true" />
            Ending: March 31st
          </p>
          <div className="lb-prizes">
            {PRIZES.map((prize) => (
              <div key={prize.amount} className="lb-prize">
                <strong>{prize.amount}</strong>
                <span>{prize.label}</span>
              </div>
            ))}
          </div>
          <div className="lb-hero__action">
            <RegisterCta>Register Now</RegisterCta>
            <p className="lb-hero__tag">
              Trade. Climb. Earn.
              <span>Your performance. Real rewards.</span>
            </p>
          </div>
        </div>
        <div className="lb-hero__hill">
          <span className="lb-hero__ring" aria-hidden="true" />
          <Image
            src="/assets/leaderboard-challenge/hero-stage.png"
            alt="Trophy on a rocky hill with a live leaderboard of competing traders"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 62vw"
            className="lb-hero__stage"
          />
        </div>
      </section>

      <section className="lb-intro" aria-labelledby="lb-intro-title">
        <div className="lb-intro__scene" aria-hidden="true">
          <Image
            src="/assets/leaderboard-challenge/intro-landscape.png"
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <div className="lb-wrap lb-intro__content">
          <header className="lb-intro__head">
            <p className="lb-intro__eyebrow">Same platform · Bigger opportunities</p>
            <h2 id="lb-intro-title" className="lb-intro__title">
              What is The Leaderboard
              <span>Challenge 2026?</span>
            </h2>
            <p className="lb-intro__copy">
              The Dominion Markets Leaderboard Challenge ranks traders based on
              their performance, highlighting the top performers in terms of
              profitability. It&apos;s a fun and competitive way to track progress,
              gain recognition, and stay motivated while trading.
            </p>
          </header>
          <div className="lb-intro__inner">
            <div className="lb-why">
              <h3>Why Join The Leaderboard Challenge 2026?</h3>
              <ul>
                {REASONS.map((reason) => (
                  <li key={reason.title}>
                    <span className="lb-why__icon">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{reason.title}</strong> {reason.body}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="lb-why__dates">
                <Calendar size={16} aria-hidden="true" />
                14 February 2026 to 31 March 2026
              </p>
              <RegisterCta>Register Now</RegisterCta>
            </div>
            <div className="lb-intro__devices">
              <Image
                src="/assets/leaderboard-challenge/devices-mockup.png"
                alt="Dominion Markets trading platform on laptop and mobile"
                fill
                sizes="(max-width: 1023px) 90vw, 42vw"
              />
              <p className={`${handwriting.className} lb-intro__script`}>
                More Than Trading
              </p>
            </div>
            <Image
              src="/assets/leaderboard-challenge/feature-pills.png"
              alt="Trade, track, climb, get rewarded"
              width={1086}
              height={1448}
              className="lb-intro__pills"
            />
          </div>
        </div>
      </section>

      <section className="lb-conditions" aria-labelledby="lb-conditions-title">
        <div className="lb-wrap">
          <h2 id="lb-conditions-title">Conditions</h2>
          <div className="lb-pills">
            {CONDITIONS.map(({ icon: Icon, label }) => (
              <span key={label} className="lb-pill">
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="lb-rewards" aria-labelledby="lb-rewards-title">
        <Image
          src="/assets/leaderboard-challenge/mountains-dark-2x.webp"
          alt=""
          fill
          sizes="100vw"
          className="lb-rewards__bg"
        />
        <div className="lb-rewards__veil" aria-hidden="true" />
        <div className="lb-wrap lb-rewards__inner">
          <h2 id="lb-rewards-title">What will you earn?</h2>
          <div className="lb-podium">
            <div className="lb-trophy lb-trophy--silver">
              <Image
                src="/assets/leaderboard-challenge/trophy-silver-trimmed.png"
                alt="Second place: $10,000 trading account"
                width={1049}
                height={991}
                className="lb-trophy__cup"
              />
              <Image
                src="/assets/leaderboard-challenge/pedestal-silver-extended.webp"
                alt=""
                width={1254}
                height={754}
                className="lb-trophy__pedestal"
              />
            </div>
            <div className="lb-trophy lb-trophy--gold">
              <Image
                src="/assets/leaderboard-challenge/trophy-gold-trimmed.png"
                alt="First place: $25,000 trading account"
                width={1070}
                height={1098}
                className="lb-trophy__cup"
              />
              <Image
                src="/assets/leaderboard-challenge/pedestal-gold-trimmed.png"
                alt=""
                width={1254}
                height={709}
                className="lb-trophy__pedestal"
              />
            </div>
            <div className="lb-trophy lb-trophy--bronze">
              <Image
                src="/assets/leaderboard-challenge/trophy-bronze-trimmed.png"
                alt="Third place: $5,000 trading account"
                width={822}
                height={972}
                className="lb-trophy__cup"
              />
              <Image
                src="/assets/leaderboard-challenge/pedestal-bronze-extended.webp"
                alt=""
                width={1129}
                height={722}
                className="lb-trophy__pedestal"
              />
            </div>
          </div>
          <p className="lb-rewards__aside">Top performers · Real opportunities</p>
        </div>
      </section>

      <section className="lb-steps" aria-labelledby="lb-steps-title">
        <div className="lb-wrap">
          <div className="lb-steps__grid">
            <div className="lb-steps__visual">
              <div className="lb-steps__portrait">
                <span className="lb-steps__orbit" aria-hidden="true" />
                <span className="lb-steps__word lb-steps__word--n">Discipline</span>
                <span className="lb-steps__word lb-steps__word--e">Skills</span>
                <span className="lb-steps__word lb-steps__word--s">Rewards</span>
                <span className="lb-steps__word lb-steps__word--w">Freedom</span>
                <Image
                  src="/assets/leaderboard-challenge/winner.png"
                  alt="Trader celebrating with a gold trophy"
                  fill
                  sizes="(max-width: 1023px) 80vw, 40vw"
                  className="lb-steps__winner"
                />
              </div>
              <div className="lb-steps__cta">
                <RegisterCta>Register now and win up to $25,000</RegisterCta>
                <p>14 February 2026 to 31 March 2026</p>
              </div>
            </div>
            <div className="lb-steps__content">
              <h2 id="lb-steps-title">
                3 Simple Steps
                <span>to Join and Start Competing</span>
              </h2>
              <ol className="lb-steps__list">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="lb-step">
                    <span className="lb-step__num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <LbTestimonials />
    </main>
  );
}
