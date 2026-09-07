"use client";

import Image from "next/image";
import {
  Activity,
  ArrowRight,
  BarChart3,
  ChevronDown,
  Cog,
  Network,
  Play,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import "@/styles/cinematic-hero.css";

function Spark({ color }: { color: string }) {
  return (
    <svg width="56" height="20" viewBox="0 0 56 20" fill="none" aria-hidden="true">
      <path
        d="M1 14C8 13 12 5 18 7s12 11 18 6 12-5 18-3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InsightCard({
  icon,
  iconBg,
  title,
  desc,
  badge,
  badgeClass,
  spark,
  iconClass,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
  badge: string;
  badgeClass: string;
  spark: string;
  iconClass?: string;
}) {
  return (
    <div className="hg hero-card">
      <div className="hero-card__row">
        <div
          className={`hero-card__icon ${iconClass ?? ""}`}
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <div className="hero-card__body">
          <div className="hero-card__top">
            <p className="hero-card__title">{title}</p>
            <span className={`hero-card__badge ${badgeClass}`}>{badge}</span>
          </div>
          <div className="hero-card__meta">
            <p className="hero-card__desc">{desc}</p>
            <Spark color={spark} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BtcCard() {
  return (
    <div className="hg hero-btc">
      <div className="hero-btc__head">
        <div className="hero-btc__coin">₿</div>
        <div>
          <p className="hero-btc__pair">BTC/USDT</p>
          <p className="hero-btc__name">Bitcoin</p>
        </div>
      </div>
      <div className="hero-btc__row">
        <div>
          <p className="hero-btc__price">68,245.30</p>
          <p className="hero-btc__chg">+2.45% 24h</p>
        </div>
        <svg width="110" height="40" viewBox="0 0 110 40" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="bf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#47BD68" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#47BD68" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 28C14 26 22 14 34 16s20 16 32 6 20-10 44-6v24H0V28z" fill="url(#bf)" />
          <path d="M0 28C14 26 22 14 34 16s20 16 32 6 20-10 44-6" stroke="#47BD68" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

export function CinematicHero() {
  const insights = (
    <InsightCard
      icon={<Activity size={26} strokeWidth={1.75} color="#47BD68" aria-hidden="true" />}
      iconBg="rgba(71,189,104,0.16)"
      title="Real-time Insights"
      desc="AI-powered market analysis in real-time."
      badge="▲ 24.7%"
      badgeClass="hero-card__badge--green"
      spark="#47BD68"
    />
  );

  const signals = (
    <InsightCard
      icon={<Network size={26} strokeWidth={1.75} color="#38BDF8" aria-hidden="true" />}
      iconBg="rgba(56,189,248,0.14)"
      iconClass="hero-card__icon--blue"
      title="Automated Signals"
      desc="High-probability signals with precision."
      badge="▲ 32.1%"
      badgeClass="hero-card__badge--blue"
      spark="#38BDF8"
    />
  );

  return (
      <section id="top" className="hero-root">
      <div className="hero-sky" aria-hidden="true" />

      {/* ===== DESKTOP ===== */}
      <div className="hero-desktop">
        <div className="hero-desktop__glow" aria-hidden="true" />
        <div className="hero-desktop__cta-glow" aria-hidden="true" />

        <div className="hero-desktop__art">
          <Image
            src="/assets/hero/Hero-background.png"
            alt=""
            fill
            priority
            sizes="70vw"
          />
        </div>

        <div className="hero-desktop__copy">
          <div className="hg-pill hero-desktop__badge">
            <Sparkles size={12} color="#47BD68" aria-hidden="true" />
            AI-Powered Trading Platform
            <span className="hero-dot" />
          </div>

          <h1 className="hero-desktop__h1">
            Your <span className="ht-grad">AI Edge</span> in
            <br />
            Trading
          </h1>

          <p className="hero-desktop__sub">
            Smarter signals. Faster decisions. Stay ahead of the market with AI
            that works for you.
          </p>

          <div className="hero-desktop__ctas">
            <a href="#final-cta" className="hb-primary">
              Start Trading Smarter
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#platforms" className="hb-ghost">
              Watch Demo
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Play size={8} fill="#fff" aria-hidden="true" />
              </span>
            </a>
          </div>

          <div className="hg hero-desktop__stats">
            <div className="hero-desktop__stat">
              <Users size={28} strokeWidth={1.75} color="#47BD68" aria-hidden="true" />
              <span>
                <strong>125K+</strong>
                <span className="hero-desktop__stat-label">Active Traders</span>
              </span>
            </div>
            <div className="hero-desktop__stat">
              <TrendingUp size={28} strokeWidth={1.75} color="#47BD68" aria-hidden="true" />
              <span>
                <strong>98.6%</strong>
                <span className="hero-desktop__stat-label">Signal Accuracy</span>
              </span>
            </div>
            <div className="hero-desktop__stat">
              <ShieldCheck size={28} strokeWidth={1.75} color="#47BD68" aria-hidden="true" />
              <span>
                <strong>$2.4B+</strong>
                <span className="hero-desktop__stat-label">Volume Analyzed</span>
              </span>
            </div>
          </div>
        </div>

        <div className="hero-desktop__card-insights">{insights}</div>
        <div className="hero-desktop__card-signals">{signals}</div>
        <div className="hero-desktop__card-btc">
          <BtcCard />
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="hero-mobile">
        <div className="hero-mobile__sky" aria-hidden="true">
          <Image
            src="/assets/hero/3.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-mobile__sky-img"
          />
          <div className="hero-mobile__sky-fade" />
        </div>

        <div className="hero-mobile__stage" aria-hidden="true">
          <div className="hero-mobile__layer hero-mobile__layer--debris">
            <Image
              src="/assets/hero/4.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-mobile__img"
            />
          </div>
          <div className="hero-mobile__layer hero-mobile__layer--ring">
            <Image
              src="/assets/hero/5.png"
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 90vw, 400px"
              className="hero-mobile__img"
            />
          </div>

          <div className="hero-mobile__float">
            <div className="hero-mobile__layer hero-mobile__layer--candles">
              <Image
                src="/assets/hero/2.png"
                alt=""
                fill
                priority
                sizes="(max-width: 767px) 70vw, 320px"
                className="hero-mobile__img"
              />
            </div>
            <div className="hero-mobile__layer hero-mobile__layer--subject">
              <Image
                src="/assets/hero/1.png"
                alt=""
                fill
                priority
                sizes="(max-width: 767px) 92vw, 420px"
                className="hero-mobile__img"
              />
            </div>
          </div>

          <div className="hero-mobile__chip hero-mobile__chip--signal">
            <span className="hero-mobile__chip-value hero-mobile__chip-value--up">
              +12.4% ▲
            </span>
            <span className="hero-mobile__chip-label">AI Signal</span>
          </div>
          <div className="hero-mobile__chip hero-mobile__chip--risk">
            <span className="hero-mobile__chip-value hero-mobile__chip-value--down">
              −28% ▼
            </span>
            <span className="hero-mobile__chip-label">Lower Drawdown</span>
          </div>

          <p className="hero-mobile__micro hero-mobile__micro--tr">
            Markets intelligence
            <br />a higher tomorrow
          </p>
          <p className="hero-mobile__micro hero-mobile__micro--center">
            Discipline meets intelligence
          </p>
        </div>

        <div className="hero-mobile__content">
          <h1 className="hero-mobile__h1">
            Trade Smarter
            <span className="hero-mobile__h1-accent"> with AI</span>
          </h1>
          <p className="hero-mobile__sub">
            AI-driven trading tools built for faster decisions.
          </p>

          <div className="hero-mobile__ctas">
            <a href="#final-cta" className="hero-mobile__btn hero-mobile__btn--primary">
              Get Started
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#platforms" className="hero-mobile__btn hero-mobile__btn--ghost">
              <span className="hero-mobile__play" aria-hidden="true">
                <Play size={9} fill="currentColor" />
              </span>
              Watch Demo
            </a>
          </div>

          <div className="hero-mobile__features" role="list">
            <div className="hero-mobile__feature" role="listitem">
              <BarChart3 size={14} strokeWidth={2} color="#47BD68" aria-hidden="true" />
              <span>Real-time Signals</span>
            </div>
            <div className="hero-mobile__feature" role="listitem">
              <Cog size={14} strokeWidth={2} color="#47BD68" aria-hidden="true" />
              <span>Automation</span>
            </div>
            <div className="hero-mobile__feature" role="listitem">
              <Shield size={14} strokeWidth={2} color="#47BD68" aria-hidden="true" />
              <span>Risk Insights</span>
            </div>
          </div>

          <a href="#proof" className="hero-mobile__scroll">
            <ChevronDown size={16} aria-hidden="true" />
            <span>Scroll to explore</span>
          </a>
        </div>
      </div>
    </section>
  );
}
