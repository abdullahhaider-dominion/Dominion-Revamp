"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Globe2,
  Heart,
  LineChart,
  Quote,
  Star,
  UsersRound,
} from "lucide-react";
import "@/styles/wall-of-love.css";

const ASSET_ROOT = "/assets/wall-of-love";

const ASSETS = {
  hero: `${ASSET_ROOT}/hero-landscape.png`,
  community: `${ASSET_ROOT}/community-mist.png`,
} as const;

const FILTERS = [
  "All Reviews",
  "Platform",
  "Profits",
  "Mobile App",
  "Account Funding",
  "Customer Support",
  "Education",
  "Community",
] as const;

type Filter = (typeof FILTERS)[number];
type Visual = "chart" | "balance" | "account" | "matrix" | "history" | "phone";

type Review = {
  initials: string;
  name: string;
  country: string;
  category: Exclude<Filter, "All Reviews">;
  quote: string;
  visual?: Visual;
  value?: string;
};

const REVIEWS: Review[] = [
  {
    initials: "DK",
    name: "Daniel K.",
    country: "United Kingdom",
    category: "Customer Support",
    quote:
      "Best trading experience I've ever had. The platform is fast, reliable and the spreads are excellent.",
  },
  {
    initials: "RS",
    name: "Ryan S.",
    country: "Australia",
    category: "Platform",
    visual: "chart",
    quote: "Clean charts, fast execution. Exactly what I needed.",
  },
  {
    initials: "MT",
    name: "Maria T.",
    country: "Philippines",
    category: "Profits",
    visual: "account",
    value: "$12,468.32",
    quote:
      "Consistent profits with Dominion Markets. Simple and powerful platform.",
  },
  {
    initials: "JL",
    name: "James L.",
    country: "Canada",
    category: "Platform",
    visual: "matrix",
    quote:
      "The trading tools are outstanding. Everything I need in one place.",
  },
  {
    initials: "AS",
    name: "Aisha S.",
    country: "UAE",
    category: "Customer Support",
    quote:
      "Professional, transparent and trustworthy. Deposits and withdrawals are smooth and I've never had an issue.",
  },
  {
    initials: "TP",
    name: "Thomas P.",
    country: "Germany",
    category: "Profits",
    visual: "history",
    quote: "Profits speak louder than words.",
  },
  {
    initials: "LW",
    name: "Lisa W.",
    country: "South Africa",
    category: "Mobile App",
    visual: "balance",
    value: "$8,752.21",
    quote:
      "My account has grown steadily. Dominion Markets has changed my life.",
  },
  {
    initials: "MK",
    name: "Mohammed K.",
    country: "Saudi Arabia",
    category: "Education",
    quote:
      "Excellent support and education. The team is always helpful and responsive.",
  },
  {
    initials: "JP",
    name: "Jason P.",
    country: "Singapore",
    category: "Platform",
    visual: "matrix",
    quote: "Fast execution, tight spreads and a world-class platform.",
  },
  {
    initials: "RB",
    name: "Ricardo B.",
    country: "Brazil",
    category: "Platform",
    visual: "chart",
    quote: "Simple. Reliable. Profitable. That's Dominion Markets.",
  },
  {
    initials: "SN",
    name: "Sarah N.",
    country: "United States",
    category: "Community",
    quote:
      "The best trading community I've ever been part of. Great people and great support.",
  },
  {
    initials: "DL",
    name: "David L.",
    country: "Netherlands",
    category: "Platform",
    visual: "chart",
    quote:
      "Crystal clear charts and super-fast execution. Everything just works.",
  },
  {
    initials: "KC",
    name: "Kevin C.",
    country: "Malaysia",
    category: "Profits",
    visual: "account",
    quote: "Everything I trade, all in one place.",
  },
  {
    initials: "HH",
    name: "Natalie H.",
    country: "New Zealand",
    category: "Customer Support",
    quote:
      "Withdrawals are always processed quickly. It gives me peace of mind knowing I'm trading with a trustworthy broker.",
  },
  {
    initials: "AC",
    name: "Andres C.",
    country: "Mexico",
    category: "Mobile App",
    visual: "phone",
    value: "$15,324.90",
    quote: "Amazing platform, even better support.",
  },
  {
    initials: "LB",
    name: "Loren B.",
    country: "Argentina",
    category: "Education",
    quote:
      "I've been trading for years and Dominion Markets is by far the most reliable broker I've used.",
  },
  {
    initials: "PR",
    name: "Priya R.",
    country: "India",
    category: "Community",
    quote:
      "From the educational content to the platform, everything is designed with traders in mind.",
  },
  {
    initials: "AK",
    name: "Abdullah K.",
    country: "Qatar",
    category: "Platform",
    quote:
      "Low fees, fast execution and amazing customer support. Everything a trader needs.",
  },
  {
    initials: "CT",
    name: "Chloe T.",
    country: "Australia",
    category: "Platform",
    quote:
      "A broker that actually delivers on its promises. Fair, safe and grounded as a trader.",
  },
  {
    initials: "BT",
    name: "Ben T.",
    country: "United States",
    category: "Community",
    quote:
      "I started with a small account and I'm now consistently profitable. Dominion Markets gave real traders a real chance.",
  },
  {
    initials: "YK",
    name: "Yuki K.",
    country: "Japan",
    category: "Mobile App",
    quote: "Simple, elegant and powerful. The best trading experience I've had.",
  },
  {
    initials: "AJ",
    name: "Anna H.",
    country: "Canada",
    category: "Account Funding",
    visual: "account",
    quote: "Smooth deposits and withdrawals every time.",
  },
  {
    initials: "LR",
    name: "Luke R.",
    country: "Poland",
    category: "Profits",
    quote:
      "The spreads are excellent and the execution is lightning fast. I couldn't ask for more.",
  },
  {
    initials: "OS",
    name: "Omar S.",
    country: "Kuwait",
    category: "Education",
    quote:
      "Dominion Markets has helped me fund trading and build opportunity. Thank you.",
  },
  {
    initials: "GC",
    name: "Grace C.",
    country: "Ireland",
    category: "Profits",
    visual: "balance",
    value: "$6,421.32",
    quote: "Grateful to be part of such an amazing community.",
  },
  {
    initials: "JH",
    name: "Jack H.",
    country: "United States",
    category: "Customer Support",
    quote:
      "Consistently reliable. Dominion Markets sets the standard for what a broker should be.",
  },
  {
    initials: "LD",
    name: "Luis D.",
    country: "Mexico",
    category: "Platform",
    visual: "chart",
    quote: "The benefits of being united — that's Dominion Markets.",
  },
  {
    initials: "NT",
    name: "Nina T.",
    country: "Thailand",
    category: "Community",
    quote:
      "More than just a broker — it's a community. I've made great friends and learned so much.",
  },
  {
    initials: "EM",
    name: "Emily M.",
    country: "United Kingdom",
    category: "Customer Support",
    quote:
      "A great platform, great people, great opportunities. Dominion Markets is the real deal.",
  },
  {
    initials: "JM",
    name: "Joshua M.",
    country: "United States",
    category: "Mobile App",
    quote:
      "The mobile app is fantastic. I can trade anywhere, anytime. The interface is smooth and reliable.",
  },
];

function ReviewVisual({ type, value }: { type: Visual; value?: string }) {
  if (type === "chart" || type === "balance") {
    return (
      <div className={`wol-card-visual wol-card-visual--${type}`}>
        {value ? (
          <div className="wol-balance">
            <strong>{value}</strong>
            <span>+18.4%</span>
          </div>
        ) : (
          <span className="wol-symbol">XAUUSD&nbsp; 1m</span>
        )}
        <svg viewBox="0 0 220 96" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`wol-fill-${type}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#27d681" stopOpacity=".36" />
              <stop offset="1" stopColor="#27d681" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 83 L18 76 L31 79 L47 63 L61 67 L79 48 L94 54 L109 42 L124 49 L141 30 L157 36 L172 20 L188 29 L205 12 L220 17 L220 96 L0 96 Z"
            fill={`url(#wol-fill-${type})`}
          />
          <polyline
            points="0,83 18,76 31,79 47,63 61,67 79,48 94,54 109,42 124,49 141,30 157,36 172,20 188,29 205,12 220,17"
            fill="none"
            stroke="#20ce79"
            strokeWidth="3"
          />
        </svg>
      </div>
    );
  }

  if (type === "account") {
    return (
      <div className="wol-card-visual wol-account">
        <span>Live Account</span>
        <strong>{value ?? "$9,542.10"}</strong>
        <small>+12.28%</small>
        <div>
          <i>EURUSD</i><b>+$263.50</b>
          <i>XAUUSD</i><b>+$184.20</b>
          <i>GBPUSD</i><b>+$98.60</b>
        </div>
      </div>
    );
  }

  if (type === "matrix") {
    return (
      <div className="wol-card-visual wol-matrix" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <span key={index}>
            <i style={{ height: `${28 + index * 9}%` }} />
            <i style={{ height: `${56 - index * 6}%` }} />
            <i style={{ height: `${36 + index * 8}%` }} />
          </span>
        ))}
      </div>
    );
  }

  if (type === "history") {
    return (
      <div className="wol-card-visual wol-history">
        <strong>History</strong>
        {["Profit", "Profit", "Profit", "Profit"].map((label, index) => (
          <span key={`${label}-${index}`}>
            <i>{label}</i>
            <b>+${[240, 182, 165, 328][index]}.00</b>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="wol-card-visual wol-phone">
      <span>DOMINION MARKETS</span>
      <strong>{value ?? "$15,324.90"}</strong>
      <div><i>Deposit</i><i>Trade</i><i>Withdraw</i></div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className={`wol-review${review.visual ? " has-visual" : ""}`}>
      <header>
        <span className="wol-avatar">{review.initials}</span>
        <span>
          <strong>{review.name}</strong>
          <small>{review.country}</small>
        </span>
      </header>
      <div className="wol-stars" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} size={11} fill="currentColor" aria-hidden="true" />
        ))}
      </div>
      {review.visual ? <ReviewVisual type={review.visual} value={review.value} /> : null}
      <p>
        <Quote size={15} fill="currentColor" aria-hidden="true" />
        <span>{review.quote}</span>
      </p>
      <footer>
        <span>{review.category}</span>
        <span>Verified trader</span>
      </footer>
    </article>
  );
}

export function WallOfLove() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All Reviews");
  const visibleReviews = useMemo(
    () =>
      activeFilter === "All Reviews"
        ? REVIEWS
        : REVIEWS.filter((review) => review.category === activeFilter),
    [activeFilter],
  );

  return (
    <main className="wol-page" id="top">
      <section className="wol-hero" aria-labelledby="wol-hero-title">
        <Image
          src={ASSETS.hero}
          alt=""
          fill
          sizes="100vw"
          className="wol-cover"
          priority
        />
        <div className="wol-hero__shade" aria-hidden="true" />
        <div className="wol-wrap wol-hero__inner">
          <div className="wol-hero__copy">
            <p className="wol-kicker">Real traders &nbsp;|&nbsp; Real stories</p>
            <h1 id="wol-hero-title">
              Wall of Love
              <Heart fill="currentColor" aria-label="Love" />
            </h1>
            <p>A global community of traders, united by a higher standard.</p>
            <div className="wol-hero__stats" aria-label="Trader community statistics">
              <span><UsersRound aria-hidden="true" /><b>1,000+</b><small>Happy Traders</small></span>
              <span><Globe2 aria-hidden="true" /><b>100+</b><small>Countries</small></span>
              <span><Star aria-hidden="true" /><b>4.9/5</b><small>Average Rating</small></span>
            </div>
          </div>
          <p className="wol-hero__script">
            More
            <br />Than Trading
            <br /><b>A Community</b>
          </p>
          <p className="wol-hero__aside">
            Discipline
            <br />Creates
            <br />Freedom
          </p>
        </div>
      </section>

      <section className="wol-community" aria-labelledby="wol-community-title">
        <Image
          src={ASSETS.community}
          alt=""
          fill
          sizes="100vw"
          className="wol-community__background"
        />
        <h2 className="wol-sr-only" id="wol-community-title">Trader reviews</h2>
        <div className="wol-wrap">
          <div className="wol-toolbar">
            <div className="wol-filters" role="tablist" aria-label="Filter reviews">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter}
                  className={activeFilter === filter ? "is-active" : ""}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="wol-global">
              <Globe2 aria-hidden="true" />
              <span><strong>Global Traders</strong><small>Real people. Real results.</small></span>
            </div>
          </div>

          <div className="wol-review-grid" aria-live="polite">
            {visibleReviews.map((review) => (
              <ReviewCard key={`${review.name}-${review.country}`} review={review} />
            ))}
          </div>

          <div className="wol-join">
            <div className="wol-join__brand">
              <LineChart aria-hidden="true" />
              <span><strong>Join thousands of traders</strong><small>Trading at a higher standard.</small></span>
            </div>
            <p>Ready to write your own success story?</p>
            <Link href="/#accounts">
              Open an Account <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
