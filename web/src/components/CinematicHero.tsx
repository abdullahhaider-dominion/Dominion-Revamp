"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  ChevronDown,
  Menu,
  Network,
  Play,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import "@/styles/cinematic-hero.css";

const NAV = [
  {
    label: "Markets",
    href: "#markets",
    children: [
      { label: "Markets overview", href: "#markets" },
      { label: "Market sessions", href: "#sessions" },
      { label: "Trade better", href: "#trade-better" },
    ],
  },
  {
    label: "Accounts",
    href: "#accounts",
    children: [
      { label: "Account types", href: "#accounts" },
      { label: "Funding", href: "#funding" },
    ],
  },
  {
    label: "Platforms",
    href: "#platforms",
  },
  {
    label: "Tools",
    href: "#dashboard",
    children: [
      { label: "Trader dashboard", href: "#dashboard" },
      { label: "Copy trading", href: "#copy-trading" },
      { label: "Ecosystem", href: "#ecosystem" },
    ],
  },
  {
    label: "About",
    href: "#trust",
    children: [
      { label: "Why Dominion", href: "#why-dominion" },
      { label: "Trust & regulation", href: "#trust" },
      { label: "Insights & blog", href: "#blogs" },
    ],
  },
] as const;

const AWARDS = [
  {
    org: "Forex Expo Dubai",
    name: "Fastest Trade Execution",
    year: "2023",
  },
  {
    org: "MEFM",
    name: "Top 100 Trusted Financial Institutions",
    year: "2023",
  },
  {
    org: "Forex Traders Summit Dubai",
    name: "Innovation Leader in Forex",
    year: "2025",
  },
  {
    org: "Forex Expo Dubai",
    name: "Fastest Growing Broker",
    year: "2025",
  },
  {
    org: "MEFM",
    name: "Top 100 Trusted Financial Institutions",
    year: "2025",
  },
] as const;

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
  compact,
  iconClass,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
  badge: string;
  badgeClass: string;
  spark: string;
  compact?: boolean;
  iconClass?: string;
}) {
  return (
    <div
      className={`hg hero-card ${compact ? "hero-card--sm" : ""}`}
      style={compact ? { padding: 10, borderRadius: 12 } : undefined}
    >
      <div className="hero-card__row">
        <div
          className={`hero-card__icon ${iconClass ?? ""}`}
          style={{
            background: iconBg,
            width: compact ? 28 : undefined,
            height: compact ? 28 : undefined,
          }}
        >
          {icon}
        </div>
        <div className="hero-card__body">
          <div className="hero-card__top">
            <p className="hero-card__title" style={compact ? { fontSize: 11 } : undefined}>
              {title}
            </p>
            <span
              className={`hero-card__badge ${badgeClass}`}
              style={compact ? { fontSize: 9 } : undefined}
            >
              {badge}
            </span>
          </div>
          <div className="hero-card__meta">
            <p className="hero-card__desc" style={compact ? { fontSize: 9 } : undefined}>
              {desc}
            </p>
            <Spark color={spark} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioCard() {
  return (
    <div className="hg hero-card" style={{ padding: 10, borderRadius: 12 }}>
      <div className="hero-card__row">
        <div
            className="hero-card__icon"
            style={{
              background: "rgba(71,189,104,0.14)",
              width: 28,
              height: 28,
            }}
          >
          <Shield size={14} color="#47BD68" aria-hidden="true" />
        </div>
        <div className="hero-card__body">
          <div className="hero-card__top">
            <p className="hero-card__title" style={{ fontSize: 11 }}>
              Portfolio Protection
            </p>
            <span className="hero-card__badge hero-card__badge--green" style={{ fontSize: 9 }}>
              LIVE
            </span>
          </div>
          <p className="hero-card__desc" style={{ fontSize: 9 }}>
            Real-time risk monitoring.
          </p>
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

function AwardsRow() {
  return (
    <div className="hero-awards" role="list" aria-label="Industry awards">
      {AWARDS.map((award) => (
        <article
          key={`${award.org}-${award.name}-${award.year}`}
          className="hero-award"
          role="listitem"
        >
          <Image
            src="/assets/awards/laurel-wreath.svg"
            alt=""
            width={120}
            height={92}
            className="hero-award__wreath"
            unoptimized
          />
          <div className="hero-award__body">
            <p className="hero-award__org">{award.org}</p>
            <span className="hero-award__rule" aria-hidden="true" />
            <h3 className="hero-award__name">{award.name}</h3>
            <p className="hero-award__year">{award.year}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function CinematicHero() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navShown, setNavShown] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 12);

      // Always show near the top; hide on scroll down, reveal on scroll up
      if (y <= 24) {
        setNavShown(true);
      } else if (delta > 6) {
        setNavShown(false);
        setOpenMenu(null);
        setOpen(false);
      } else if (delta < -6) {
        setNavShown(true);
      }

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenus = () => {
    setOpen(false);
    setOpenMenu(null);
  };

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
    <>
      <header
        className={`dm-nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}${navShown || open ? "" : " is-hidden"}`}
      >
        <div className="dm-nav__inner">
          <a href="#top" className="dm-nav__brand" onClick={closeMenus}>
            <Image
              src="/assets/logo/logo-horizontal-reverse.svg"
              alt="Dominion Markets"
              width={176}
              height={28}
              priority
              className="dm-nav__logo dm-nav__logo--desktop"
            />
            <Image
              src="/assets/logo/logo-horizontal-reverse.svg"
              alt="Dominion Markets"
              width={140}
              height={22}
              priority
              className="dm-nav__logo dm-nav__logo--mobile"
            />
          </a>

          <nav className="dm-nav__links" aria-label="Primary">
            {NAV.map((item) => {
              const hasChildren = "children" in item && Boolean(item.children?.length);
              return (
                <div
                  key={item.label}
                  className={`dm-nav__item${openMenu === item.label ? " is-open" : ""}`}
                  onMouseEnter={() => {
                    if (hasChildren) setOpenMenu(item.label);
                  }}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <a
                    href={item.href}
                    className="dm-nav__link"
                    aria-haspopup={hasChildren ? "menu" : undefined}
                    aria-expanded={hasChildren ? openMenu === item.label : undefined}
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                    {hasChildren ? (
                      <ChevronDown
                        size={14}
                        className="dm-nav__chevron"
                        aria-hidden="true"
                      />
                    ) : null}
                  </a>
                  {hasChildren ? (
                    <div className="dm-nav__dropdown" role="menu">
                      {item.children!.map((child) => (
                        <a
                          key={`${child.href}-${child.label}`}
                          href={child.href}
                          role="menuitem"
                          onClick={closeMenus}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="dm-nav__actions">
            <a href="#final-cta" className="dm-nav__login" onClick={closeMenus}>
              Log in
            </a>
            <a
              href="#accounts"
              className="hb-primary dm-nav__cta"
              onClick={closeMenus}
            >
              Get Started
            </a>
            <button
              type="button"
              className="dm-nav__burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="dm-nav-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          id="dm-nav-drawer"
          className={`dm-nav__drawer${open ? " is-open" : ""}`}
          hidden={!open}
        >
          <nav className="dm-nav__drawer-nav" aria-label="Mobile">
            {NAV.map((item) => (
              <div key={item.label} className="dm-nav__drawer-group">
                <a
                  href={item.href}
                  className="dm-nav__drawer-link"
                  onClick={closeMenus}
                >
                  {item.label}
                </a>
                {"children" in item && item.children
                  ? item.children.map((child) => (
                      <a
                        key={`${child.href}-${child.label}`}
                        href={child.href}
                        className="dm-nav__drawer-sub"
                        onClick={closeMenus}
                      >
                        {child.label}
                      </a>
                    ))
                  : null}
              </div>
            ))}
            <a
              href="#final-cta"
              className="dm-nav__drawer-link"
              onClick={closeMenus}
            >
              Log in
            </a>
            <a
              href="#accounts"
              className="hb-primary dm-nav__drawer-cta"
              onClick={closeMenus}
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

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

          <div className="hero-desktop__trust">
            <p>Recognized for excellence</p>
            <AwardsRow />
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
        <div className="hero-mobile__art" aria-hidden="true">
          <Image
            src="/assets/hero/Hero-background.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="hero-mobile__content">
          <div className="hero-mobile__top">
            <div>
              <div className="hg-pill hero-mobile__badge">
                <Sparkles size={9} color="#47BD68" aria-hidden="true" />
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  AI-Powered Trading Platform
                </span>
                <span className="hero-dot" />
              </div>
              <h1 className="hero-mobile__h1">
                Your <span className="ht-ai">AI</span> Edge in Trading
              </h1>
              <p className="hero-mobile__sub">
                Smarter signals. Faster decisions. Stay ahead of the market with
                AI that works for you.
              </p>
              <div className="hero-mobile__ctas">
                <a href="#final-cta" className="hb-primary">
                  Start Trading Smarter
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
                <a href="#platforms" className="hb-ghost">
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.4)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Play size={7} fill="#fff" aria-hidden="true" />
                  </span>
                  Watch Demo
                </a>
              </div>
            </div>

            <div className="hero-mobile__cards">
              <InsightCard
                compact
                icon={<Activity size={13} color="#47BD68" aria-hidden="true" />}
                iconBg="rgba(71,189,104,0.14)"
                title="Real-time Insights"
                desc="AI-powered market analysis in real-time."
                badge="+ 27.6%"
                badgeClass="hero-card__badge--green"
                spark="#47BD68"
              />
              <InsightCard
                compact
                icon={<Network size={13} color="#6FD48A" aria-hidden="true" />}
                iconBg="rgba(71,189,104,0.1)"
                title="Automated Signals"
                desc="High-probability signals with precision."
                badge="+ 32.1%"
                badgeClass="hero-card__badge--blue"
                spark="#6FD48A"
              />
              <PortfolioCard />
            </div>
          </div>

          <div className="hero-mobile__bottom">
            <div className="hg hero-mobile__stats">
              <div className="hero-mobile__stat">
                <Users size={22} strokeWidth={1.75} color="#47BD68" aria-hidden="true" />
                <span>
                  <strong>125K+</strong> Active Traders
                </span>
              </div>
              <div className="hero-mobile__stat">
                <TrendingUp size={22} strokeWidth={1.75} color="#47BD68" aria-hidden="true" />
                <span>
                  <strong>98.6%</strong> Signal Accuracy
                </span>
              </div>
              <div className="hero-mobile__stat">
                <ShieldCheck size={22} strokeWidth={1.75} color="#47BD68" aria-hidden="true" />
                <span>
                  <strong>$2.4B+</strong> Volume Analyzed
                </span>
              </div>
            </div>

            <div className="hero-mobile__trust">
              <p>Recognized for excellence</p>
              <AwardsRow />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
