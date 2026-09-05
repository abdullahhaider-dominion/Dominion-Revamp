/* Auto-wrapped from mockups/main.js */
export function initDominionMockups() {
  if (typeof window === "undefined") return;
  if (window.__dominionMockupsInit) return;
  window.__dominionMockupsInit = true;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Sticky nav state */
const nav = document.getElementById("site-nav");
const onScroll = () => {
  if (!nav) return;
  nav.classList.toggle("is-scrolled", window.scrollY > 24);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Mobile burger menu */
(function initMobileNav() {
  const chrome = document.getElementById("site-chrome");
  const btn = document.getElementById("nav-menu-btn");
  const drawer = document.getElementById("nav-drawer");
  if (!chrome || !btn || !drawer) return;

  const desktopMq = window.matchMedia("(min-width: 900px)");

  const setOpen = (open) => {
    chrome.classList.toggle("is-menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      drawer.hidden = false;
      document.body.style.overflow = "hidden";
    } else {
      drawer.hidden = true;
      document.body.style.overflow = "";
    }
  };

  btn.addEventListener("click", () => {
    setOpen(!chrome.classList.contains("is-menu-open"));
  });

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  const onBreakpoint = () => {
    if (desktopMq.matches) setOpen(false);
  };
  if (typeof desktopMq.addEventListener === "function") {
    desktopMq.addEventListener("change", onBreakpoint);
  } else if (typeof desktopMq.addListener === "function") {
    desktopMq.addListener(onBreakpoint);
  }
})();

/* Scroll reveals */
const reveals = document.querySelectorAll(".reveal");
const revealCheck = () => {
  const vh = window.innerHeight;
  reveals.forEach((el) => {
    if (el.classList.contains("is-visible")) return;
    const r = el.getBoundingClientRect();
    if (r.height <= 0) return;
    if (r.top < vh * 0.94 && r.bottom > 48) {
      el.classList.add("is-visible");
    }
  });
};
if (reduceMotion) {
  reveals.forEach((el) => el.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
  );
  reveals.forEach((el) => io.observe(el));
  window.addEventListener("scroll", revealCheck, { passive: true });
  revealCheck();
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

/* Line chart drawer */
function drawLineChart(canvas, seed = 1, color = "#47BD68") {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssW = canvas.clientWidth || 640;
  const cssH = canvas.clientHeight || 220;
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const points = [];
  let y = cssH * 0.62;
  let t = seed * 12.9898;
  for (let i = 0; i < 48; i++) {
    t += 1;
    const n =
      Math.sin(t * 0.35) * 18 +
      Math.sin(t * 0.11 + seed) * 28 +
      (Math.sin(t * 1.7) * 8);
    y = Math.max(28, Math.min(cssH - 24, y - 2.2 + n * 0.08));
    points.push({ x: (i / 47) * cssW, y });
  }

  const drawFrame = (progress) => {
    ctx.clearRect(0, 0, cssW, cssH);

    ctx.strokeStyle = "rgba(29,51,71,0.08)";
    ctx.lineWidth = 1;
    for (let g = 1; g < 4; g++) {
      const gy = (cssH / 4) * g;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(cssW, gy);
      ctx.stroke();
    }

    const count = Math.max(2, Math.floor(points.length * progress));
    const visible = points.slice(0, count);

    const grad = ctx.createLinearGradient(0, 0, 0, cssH);
    grad.addColorStop(0, "rgba(71,189,104,0.28)");
    grad.addColorStop(1, "rgba(71,189,104,0)");
    ctx.beginPath();
    visible.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.lineTo(visible[visible.length - 1].x, cssH);
    ctx.lineTo(visible[0].x, cssH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    visible.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();

    const last = visible[visible.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(last.x, last.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(71,189,104,0.18)";
    ctx.fill();
  };

  if (reduceMotion) {
    drawFrame(1);
    return;
  }

  let start;
  const duration = 1400;
  const tick = (ts) => {
    if (!start) start = ts;
    const p = Math.min(1, (ts - start) / duration);
    drawFrame(0.15 + p * 0.85);
    if (p < 1) requestAnimationFrame(tick);
  };

  const chartIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(tick);
          chartIo.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );
  chartIo.observe(canvas);
}

drawLineChart(document.getElementById("market-chart"), 2);

/* Soft ambient viz behind platform video */
function paintPlatformViz() {
  const canvas = document.getElementById("platform-viz");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  let frame = 0;

  const render = () => {
    frame += 1;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(29,51,71,0.15)";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 18; i++) {
      const x = (i / 17) * w;
      const barH =
        40 +
        Math.abs(Math.sin(frame * 0.03 + i * 0.55)) * (h * 0.35) +
        (i % 3) * 12;
      ctx.fillStyle = `rgba(71,189,104,${0.15 + (i % 5) * 0.05})`;
      ctx.fillRect(x + 8, h - barH - 30, w / 22, barH);
    }

    ctx.beginPath();
    for (let i = 0; i < 40; i++) {
      const x = (i / 39) * w;
      const y = h * 0.45 + Math.sin(frame * 0.04 + i * 0.3) * 40;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();

    if (!reduceMotion) requestAnimationFrame(render);
  };
  render();
}
paintPlatformViz();

/* Mock play buttons */
document.querySelectorAll(".play-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = btn.textContent.trim() === "▶" ? "❚❚" : "▶";
    btn.parentElement?.animate(
      [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(1.03)", opacity: 0.9 },
        { transform: "scale(1)", opacity: 1 },
      ],
      { duration: 420, easing: "ease-out" }
    );
  });
});

/* ——— Active market sessions (UTC windows) ——— */
function pad2(n) {
  return String(n).padStart(2, "0");
}

function sessionState(openHour, closeHour, now = new Date()) {
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const utcSeconds = now.getUTCSeconds();
  const open = openHour * 60;
  const close = closeHour * 60;
  const wraps = close <= open;
  const isOpen = wraps ? utcMinutes >= open || utcMinutes < close : utcMinutes >= open && utcMinutes < close;

  let targetMinutes;
  if (isOpen) {
    targetMinutes = wraps && utcMinutes >= open ? close + 24 * 60 : close;
  } else if (wraps) {
    targetMinutes = utcMinutes >= close ? open : open;
  } else {
    targetMinutes = utcMinutes < open ? open : open + 24 * 60;
  }

  let remaining = targetMinutes * 60 - (utcMinutes * 60 + utcSeconds);
  if (remaining < 0) remaining += 24 * 60 * 60;

  return {
    isOpen,
    hours: Math.floor(remaining / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
  };
}

function formatOpenLocal(openHour) {
  const hh = pad2(openHour % 24);
  return `Opens at ${hh}:00 GMT`;
}

function updateSessionCards() {
  const now = new Date();
  document.querySelectorAll(".session-card[data-session]").forEach((card) => {
    const open = Number(card.dataset.open);
    const close = Number(card.dataset.close);
    const state = sessionState(open, close, now);
    const badgeText = card.querySelector("[data-badge-text]");
    const timerLabel = card.querySelector("[data-timer-label]");
    const footText = card.querySelector("[data-foot-text]");
    const h = card.querySelector("[data-h]");
    const m = card.querySelector("[data-m]");
    const s = card.querySelector("[data-s]");

    card.classList.toggle("is-open", state.isOpen);
    card.classList.toggle("is-closed", !state.isOpen);

    if (badgeText) badgeText.textContent = state.isOpen ? "Open" : "Closed";
    if (timerLabel) {
      timerLabel.textContent = state.isOpen ? "Market closes in" : "Market opens in";
    }
    if (footText) {
      footText.textContent = state.isOpen ? "Live market" : formatOpenLocal(open);
    }
    if (h) h.textContent = pad2(state.hours);
    if (m) m.textContent = pad2(state.minutes);
    if (s) s.textContent = pad2(state.seconds);
  });

  reorderSessionCardsForMobile();
}

/* Mobile only: open markets lead the sessions carousel */
function reorderSessionCardsForMobile() {
  const track = document.querySelector("[data-sessions-track]");
  if (!track) return;

  const cards = [...track.querySelectorAll(".session-card[data-session]")];
  if (!cards.length) return;

  cards.forEach((card, index) => {
    if (card.dataset.originalOrder == null) {
      card.dataset.originalOrder = String(index);
    }
  });

  const mobile = window.matchMedia("(max-width: 959px)").matches;
  const ranked = cards.slice().sort((a, b) => {
    if (mobile) {
      const aOpen = a.classList.contains("is-open") ? 0 : 1;
      const bOpen = b.classList.contains("is-open") ? 0 : 1;
      if (aOpen !== bOpen) return aOpen - bOpen;
    }
    return Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder);
  });

  const alreadyOrdered = ranked.every((card, index) => card === cards[index]);
  if (alreadyOrdered) return;

  ranked.forEach((card) => track.appendChild(card));

  if (mobile) {
    track.scrollTo({ left: 0, behavior: "auto" });
    track.dispatchEvent(new Event("scroll"));
  }
}

updateSessionCards();
setInterval(updateSessionCards, 1000);
window.addEventListener("resize", reorderSessionCardsForMobile, { passive: true });

/* Mobile sessions carousel dots */
(function initSessionsCarousel() {
  const track = document.querySelector("[data-sessions-track]");
  const dots = document.querySelectorAll("[data-sessions-dots] [data-dot]");
  if (!track || !dots.length) return;

  const getCards = () => [...track.querySelectorAll(".session-card")];

  const setActive = (index) => {
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  };

  const syncFromScroll = () => {
    if (window.matchMedia("(min-width: 960px)").matches) return;
    const cards = getCards();
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const mid = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  };

  track.addEventListener("scroll", () => {
    window.requestAnimationFrame(syncFromScroll);
  }, { passive: true });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.dot);
      const card = getCards()[index];
      if (!card) return;
      card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
      setActive(index);
    });
  });

  // After initial open-first reorder, sync the active dot
  reorderSessionCardsForMobile();
  syncFromScroll();
})();

/* Mobile awards carousel */
(function initAwardsCarousel() {
  const track = document.querySelector("[data-awards-track]");
  const dots = document.querySelectorAll("[data-awards-dots] [data-awards-dot]");
  if (!track || !dots.length) return;

  const cards = [...track.querySelectorAll(".award-seal")];
  const desktopMq = window.matchMedia("(min-width: 900px)");

  const setActive = (index) => {
    dots.forEach((dot, i) => {
      const on = i === index;
      dot.classList.toggle("is-active", on);
      dot.setAttribute("aria-current", on ? "true" : "false");
    });
  };

  const syncFromScroll = () => {
    if (desktopMq.matches) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const mid = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  };

  track.addEventListener(
    "scroll",
    () => {
      window.requestAnimationFrame(syncFromScroll);
    },
    { passive: true }
  );

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      if (desktopMq.matches) return;
      const index = Number(dot.dataset.awardsDot);
      const card = cards[index];
      if (!card) return;
      card.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
      setActive(index);
    });
  });

  setActive(0);
  syncFromScroll();
})();

window.addEventListener("resize", () => {
  drawLineChart(document.getElementById("market-chart"), 2);
});

/* ——— Live quotes mock (Option C) ——— */
(function initLiveQuotes() {
  const grid = document.querySelector("[data-quotes-grid]");
  const tabs = document.querySelectorAll("[data-quotes-tab]");
  if (!grid || !tabs.length) return;

  const CATALOG = {
    fx: [
      { symbol: "EURUSD", name: "Euro / US Dollar", flags: ["🇪🇺", "🇺🇸"], bid: 1.08472, spread: 0.00006, digits: 5 },
      { symbol: "GBPUSD", name: "Pound / US Dollar", flags: ["🇬🇧", "🇺🇸"], bid: 1.26341, spread: 0.00008, digits: 5 },
      { symbol: "USDJPY", name: "US Dollar / Yen", flags: ["🇺🇸", "🇯🇵"], bid: 149.842, spread: 0.012, digits: 3 },
      { symbol: "AUDUSD", name: "Aussie / US Dollar", flags: ["🇦🇺", "🇺🇸"], bid: 0.66128, spread: 0.00007, digits: 5 },
      { symbol: "USDCHF", name: "US Dollar / Franc", flags: ["🇺🇸", "🇨🇭"], bid: 0.87415, spread: 0.00009, digits: 5 },
      { symbol: "EURGBP", name: "Euro / Pound", flags: ["🇪🇺", "🇬🇧"], bid: 0.85862, spread: 0.00008, digits: 5 },
    ],
    indices: [
      { symbol: "US500", name: "S&P 500", flags: ["🇺🇸", "📈"], bid: 5284.5, spread: 0.4, digits: 1 },
      { symbol: "US100", name: "Nasdaq 100", flags: ["🇺🇸", "📈"], bid: 18420.2, spread: 1.2, digits: 1 },
      { symbol: "GER40", name: "DAX 40", flags: ["🇩🇪", "📈"], bid: 18215.6, spread: 1.0, digits: 1 },
      { symbol: "UK100", name: "FTSE 100", flags: ["🇬🇧", "📈"], bid: 8248.3, spread: 1.0, digits: 1 },
      { symbol: "JP225", name: "Nikkei 225", flags: ["🇯🇵", "📈"], bid: 38642.0, spread: 8, digits: 1 },
      { symbol: "HK50", name: "Hang Seng", flags: ["🇭🇰", "📈"], bid: 17785.0, spread: 6, digits: 1 },
    ],
    crypto: [
      { symbol: "BTCUSD", name: "Bitcoin / USD", flags: ["₿", "🇺🇸"], bid: 64250, spread: 18, digits: 0 },
      { symbol: "ETHUSD", name: "Ethereum / USD", flags: ["Ξ", "🇺🇸"], bid: 3184.5, spread: 1.2, digits: 1 },
      { symbol: "XRPUSD", name: "XRP / USD", flags: ["✕", "🇺🇸"], bid: 0.6124, spread: 0.0012, digits: 4 },
      { symbol: "SOLUSD", name: "Solana / USD", flags: ["◎", "🇺🇸"], bid: 148.26, spread: 0.08, digits: 2 },
      { symbol: "ADAUSD", name: "Cardano / USD", flags: ["₳", "🇺🇸"], bid: 0.4521, spread: 0.0008, digits: 4 },
      { symbol: "LTCUSD", name: "Litecoin / USD", flags: ["Ł", "🇺🇸"], bid: 84.62, spread: 0.06, digits: 2 },
    ],
    shares: [
      { symbol: "AAPL", name: "Apple Inc.", flags: ["🍎", "🇺🇸"], bid: 189.42, spread: 0.04, digits: 2 },
      { symbol: "MSFT", name: "Microsoft", flags: ["🪟", "🇺🇸"], bid: 428.15, spread: 0.05, digits: 2 },
      { symbol: "NVDA", name: "NVIDIA", flags: ["🟢", "🇺🇸"], bid: 112.84, spread: 0.06, digits: 2 },
      { symbol: "AMZN", name: "Amazon", flags: ["📦", "🇺🇸"], bid: 186.22, spread: 0.05, digits: 2 },
      { symbol: "TSLA", name: "Tesla", flags: ["⚡", "🇺🇸"], bid: 248.76, spread: 0.08, digits: 2 },
      { symbol: "META", name: "Meta Platforms", flags: ["ƒ", "🇺🇸"], bid: 512.4, spread: 0.07, digits: 2 },
    ],
  };

  let active = "fx";
  let instruments = CATALOG.fx.map((item) => ({
    ...item,
    ask: item.bid + item.spread,
    dir: 1,
    history: seedHistory(item.bid, 28),
  }));

  function seedHistory(base, n) {
    const pts = [];
    let v = base;
    for (let i = 0; i < n; i++) {
      v *= 1 + (Math.random() - 0.48) * 0.0015;
      pts.push(v);
    }
    return pts;
  }

  function formatPrice(value, digits) {
    const fixed = value.toFixed(digits);
    if (digits <= 1) return { main: fixed, pip: "" };
    const main = fixed.slice(0, -1);
    const pip = fixed.slice(-1);
    return { main, pip };
  }

  function spreadDisplay(item) {
    if (item.digits >= 4) return (item.spread * Math.pow(10, item.digits - 1)).toFixed(1);
    if (item.digits === 3) return item.spread.toFixed(1);
    return item.spread.toFixed(Math.min(2, item.digits));
  }

  function render() {
    grid.innerHTML = instruments
      .map((item, index) => {
        const up = item.dir >= 0;
        const bid = formatPrice(item.bid, item.digits);
        const ask = formatPrice(item.ask, item.digits);
        return `
          <article class="quote-card ${up ? "is-up" : "is-down"}" data-quote-index="${index}">
            <div class="quote-card__top">
              <div class="quote-card__flags" aria-hidden="true">
                <span class="quote-card__flag">${item.flags[0]}</span>
                <span class="quote-card__flag">${item.flags[1]}</span>
              </div>
              <div class="quote-card__meta">
                <h3 class="quote-card__symbol">${item.symbol}</h3>
                <span class="quote-card__name">${item.name}</span>
              </div>
              <span class="quote-card__trend" aria-hidden="true">${up ? "↑" : "↓"}</span>
            </div>
            <div class="quote-card__prices">
              <div>
                <span>Bid</span>
                <strong class="quote-card__bid">${bid.main}<em>${bid.pip}</em></strong>
              </div>
              <div>
                <span>Ask</span>
                <strong class="quote-card__ask">${ask.main}<em>${ask.pip}</em></strong>
              </div>
            </div>
            <div class="quote-card__bottom">
              <span class="quote-card__spread">Spread ${spreadDisplay(item)}</span>
              <canvas class="quote-card__spark" width="220" height="68" aria-hidden="true"></canvas>
            </div>
          </article>
        `;
      })
      .join("");

    grid.querySelectorAll(".quote-card").forEach((card, i) => {
      drawSpark(card.querySelector(".quote-card__spark"), instruments[i]);
    });
  }

  function drawSpark(canvas, item) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth || 110;
    const cssH = canvas.clientHeight || 34;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const pts = item.history;
    const min = Math.min(...pts);
    const max = Math.max(...pts);
    const range = Math.max(max - min, item.bid * 0.0002);
    const color = item.dir >= 0 ? "#47BD68" : "#c4544a";
    const mapped = pts.map((v, i) => ({
      x: (i / (pts.length - 1)) * cssW,
      y: cssH - ((v - min) / range) * (cssH - 6) - 3,
    }));

    ctx.beginPath();
    mapped.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.lineTo(cssW, cssH);
    ctx.lineTo(0, cssH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, cssH);
    grad.addColorStop(0, item.dir >= 0 ? "rgba(71,189,104,0.28)" : "rgba(196,84,74,0.22)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    mapped.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  function tick() {
    if (reduceMotion) return;
    instruments = instruments.map((item) => {
      const delta = item.bid * (Math.random() - 0.48) * 0.00035;
      const bid = Math.max(item.bid * 0.5, item.bid + delta);
      const history = item.history.slice(1).concat(bid);
      return {
        ...item,
        bid,
        ask: bid + item.spread,
        dir: delta >= 0 ? 1 : -1,
        history,
      };
    });
    render();
  }

  function setTab(key) {
    active = key;
    tabs.forEach((tab) => {
      const on = tab.dataset.quotesTab === key;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
    });
    instruments = CATALOG[key].map((item) => ({
      ...item,
      ask: item.bid + item.spread,
      dir: 1,
      history: seedHistory(item.bid, 28),
    }));
    render();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setTab(tab.dataset.quotesTab));
  });

  render();
  const interval = reduceMotion ? null : setInterval(tick, 1600);
  window.addEventListener("beforeunload", () => interval && clearInterval(interval));
})();

/* ——— Scroll-Expansion Hero (vanilla port of scroll-expansion-hero.tsx) ———
   A sticky scroll track drives a 0..1 progress: the media window expands, the
   split title slides apart and fades, the background dims, then the brand CTA
   panel reveals. Native scroll (no wheel hijack) so it is robust on desktop,
   touch, and keyboard. Falls back to a static hero under reduced-motion. */
(function initScrollHero() {
  const hero = document.querySelector("[data-xhero]");
  if (!hero) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    hero.classList.add("xhero--static", "xhero--revealed");
    return;
  }

  // Play the self-hosted background video (muted + looping). If the file is
  // missing it simply errors out and the poster image remains — no broken UI.
  const bgVideo = hero.querySelector("video[data-xhero-video]");
  if (bgVideo) {
    const tryPlay = () => bgVideo.play().catch(function () {});
    tryPlay();
    bgVideo.addEventListener("loadeddata", tryPlay, { once: true });
  }

  const isMobile = () => window.innerWidth < 768;
  let ticking = false;

  const update = () => {
    ticking = false;
    const track = Math.max(1, hero.offsetHeight - window.innerHeight);
    const rect = hero.getBoundingClientRect();
    // Keep progress at 0 near the page top so the title stays centered on load
    // (hero negative-margin under the fixed nav can otherwise make -rect.top > 0).
    let p = window.scrollY <= 2 ? 0 : Math.min(1, Math.max(0, -rect.top / track));

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const startW = isMobile() ? Math.min(300, vw * 0.78) : 560;
    const startH = startW * (9 / 16); // 16:9 window so the video is not distorted
    const shiftMax = isMobile() ? 22 : 18; // vw

    hero.style.setProperty("--xw", startW + p * (vw - startW) + "px");
    hero.style.setProperty("--xh", startH + p * (vh - startH) + "px");
    hero.style.setProperty("--xr", 6 + 18 * (1 - p) + "px");
    hero.style.setProperty("--xshift", shiftMax * p + "vw");
    hero.style.setProperty("--xtitle", String(Math.max(0, 1 - p * 2.2)));
    hero.style.setProperty("--xmeta", String(Math.max(0, 1 - p * 3)));
    hero.style.setProperty("--xbg", String(1 - p));
    hero.style.setProperty("--xveil", String(0.55 - p * 0.28));

    const panel = Math.max(0, Math.min(1, (p - 0.7) / 0.22));
    hero.style.setProperty("--xpanel", String(panel));
    hero.classList.toggle("xhero--revealed", panel > 0.5);
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
  requestAnimationFrame(update);
  window.addEventListener("load", update, { once: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(update).catch(() => {});
  }
})();

/* ——— Marquee (vanilla port of marquee.tsx) ———
   Duplicates the track's item set enough times that each half is at least a
   viewport wide, so the CSS translateX(-50%) loop is always seamless and the
   strip fills the screen. Duration is derived for a constant scroll speed. */
(function initMarquees() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SPEED = 60; // px per second

  document.querySelectorAll("[data-marquee]").forEach((marquee) => {
    const track = marquee.querySelector(".marquee__track");
    if (!track) return;
    const originals = Array.from(track.children);
    if (!originals.length) return;
    if (reduce) return; // CSS shows a centered static set under reduced-motion

    const build = () => {
      // Measure one set
      track.innerHTML = "";
      originals.forEach((el) => track.appendChild(el.cloneNode(true)));
      const oneSet = track.scrollWidth;
      const containerW = marquee.getBoundingClientRect().width || window.innerWidth;

      // Copies per half so each half spans the container, then two halves total
      const perHalf = Math.max(1, Math.ceil((containerW + 80) / Math.max(1, oneSet)));
      track.innerHTML = "";
      for (let i = 0; i < perHalf * 2; i++) {
        originals.forEach((el) => {
          const clone = el.cloneNode(true);
          if (i > 0) clone.setAttribute("aria-hidden", "true");
          track.appendChild(clone);
        });
      }
      const halfWidth = oneSet * perHalf;
      track.style.setProperty("--duration", halfWidth / SPEED + "s");
    };

    build();
    let rt;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(rt);
        rt = setTimeout(build, 200);
      },
      { passive: true }
    );
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
  });
})();

/* ——— Interactive Timeline scroll behaviour ———
   Grows the green progress line with scroll, lights up each node as the line
   reaches it, and slides cards in from their side as they enter view. */
(function initTimeline() {
  const tl = document.querySelector(".tl");
  if (!tl) return;

  const progress = tl.querySelector(".tl__progress");
  const nodes = Array.from(tl.querySelectorAll(".tl__node"));
  const items = Array.from(tl.querySelectorAll(".tl__item"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    if (progress) progress.style.height = "100%";
    nodes.forEach((n) => n.classList.add("is-active"));
    items.forEach((i) => i.classList.add("is-in"));
    return;
  }

  // Slide cards in as they enter the viewport
  tl.classList.add("tl--anim");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  items.forEach((i) => io.observe(i));

  // Scroll-linked progress fill + node activation
  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = tl.getBoundingClientRect();
    const vh = window.innerHeight;
    let p = (vh * 0.5 - rect.top) / Math.max(1, rect.height);
    p = Math.min(1, Math.max(0, p));
    if (progress) progress.style.height = p * 100 + "%";
    nodes.forEach((n) => {
      const nr = n.getBoundingClientRect();
      n.classList.toggle("is-active", nr.top + nr.height / 2 < vh * 0.55);
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();

/* ——— Markets Platforms selector (MT5 / cTrader) ——— */
(function initMarketsPlatforms() {
  const root = document.getElementById("markets");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll('[role="tab"][data-platform]'));
  const panel = root.querySelector("[data-platform-panel]");
  const stage = root.querySelector("[data-platform-stage]");
  if (!tabs.length || !panel || !stage) return;

  const PLATFORM = {
    mt5: {
      name: "MetaTrader 5",
      badge: "MT5",
      badgeSrc: "/assets/platforms/mt5-official.png",
      tabId: "markets-tab-mt5",
      symbol: "EURUSD",
      symbolMeta: "Euro / US Dollar · M15",
      change: "+0.18%",
      orderType: "Market",
      chartSeed: 2,
      watchlist: [
        ["EURUSD", "1.0847", "is-up"],
        ["GBPUSD", "1.2634", "is-up"],
        ["USDJPY", "149.84", "is-down"],
        ["XAUUSD", "2342.1", "is-up"],
        ["US500", "5284.5", "is-up"],
      ],
      mobilePath: "M2 36 C18 34 28 20 42 22 C56 24 64 12 78 14 C92 16 104 8 118 10",
    },
    ctrader: {
      name: "cTrader",
      badge: "cTrader",
      badgeSrc: "/assets/platforms/ctrader-official.png",
      tabId: "markets-tab-ctrader",
      symbol: "XAUUSD",
      symbolMeta: "Gold / US Dollar · H1",
      change: "+0.26%",
      orderType: "Instant",
      chartSeed: 7,
      watchlist: [
        ["XAUUSD", "2342.1", "is-up"],
        ["EURUSD", "1.0847", "is-up"],
        ["NAS100", "18420", "is-up"],
        ["BTCUSD", "64250", "is-down"],
        ["UK100", "8248.3", "is-up"],
      ],
      mobilePath: "M2 30 C16 28 26 18 40 20 C54 22 66 10 80 12 C94 14 106 16 118 8",
    },
  };

  const nameEl = root.querySelector("[data-platform-name]");
  const badgeImg = root.querySelector("[data-platform-badge]");
  const badgeLabel = root.querySelector("[data-platform-badge-label]");
  const symbolEl = root.querySelector("[data-platform-symbol]");
  const symbolMetaEl = root.querySelector("[data-platform-symbol-meta]");
  const changeEl = root.querySelector("[data-platform-change]");
  const orderTypeEl = root.querySelector("[data-platform-order-type]");
  const watchlistEl = root.querySelector("[data-platform-watchlist]");
  const mobileNameEl = root.querySelector("[data-platform-mobile-name]");
  const mobilePairEl = root.querySelector("[data-platform-mobile-pair]");
  const mobileChangeEl = root.querySelector("[data-platform-mobile-change]");
  const mobilePathEl = root.querySelector("[data-platform-mobile-path]");
  const chartCanvas = document.getElementById("market-chart");

  let active = "mt5";
  let switchTimer;

  const applyPlatform = (key) => {
    const data = PLATFORM[key];
    if (!data) return;
    active = key;

    if (nameEl) nameEl.textContent = data.name;
    if (badgeImg) {
      badgeImg.src = data.badgeSrc;
      badgeImg.alt = "";
    }
    if (badgeLabel) badgeLabel.textContent = data.badge;
    if (symbolEl) symbolEl.textContent = data.symbol;
    if (symbolMetaEl) symbolMetaEl.textContent = data.symbolMeta;
    if (changeEl) changeEl.textContent = data.change;
    if (orderTypeEl) orderTypeEl.textContent = data.orderType;
    if (mobileNameEl) mobileNameEl.textContent = data.badge;
    if (mobilePairEl) mobilePairEl.textContent = data.symbol;
    if (mobileChangeEl) mobileChangeEl.textContent = data.change;
    if (mobilePathEl) mobilePathEl.setAttribute("d", data.mobilePath);

    if (watchlistEl) {
      watchlistEl.innerHTML = data.watchlist
        .map(
          ([symbol, price, tone]) =>
            `<li><span>${symbol}</span><span class="${tone}">${price}</span></li>`
        )
        .join("");
    }

    panel.setAttribute("aria-labelledby", data.tabId);
    drawLineChart(chartCanvas, data.chartSeed);
  };

  const selectPlatform = (key, { focus = false } = {}) => {
    if (!PLATFORM[key]) return;

    tabs.forEach((tab) => {
      const on = tab.dataset.platform === key;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      if (on && focus) tab.focus();
    });

    const commit = () => {
      applyPlatform(key);
      stage.classList.remove("is-switching");
    };

    if (reduceMotion) {
      commit();
      return;
    }

    stage.classList.add("is-switching");
    window.clearTimeout(switchTimer);
    switchTimer = window.setTimeout(commit, 160);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      selectPlatform(tab.dataset.platform);
    });

    tab.addEventListener("keydown", (event) => {
      const key = event.key;
      if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Home" && key !== "End") {
        return;
      }
      event.preventDefault();
      let next = index;
      if (key === "ArrowRight") next = (index + 1) % tabs.length;
      if (key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (key === "Home") next = 0;
      if (key === "End") next = tabs.length - 1;
      selectPlatform(tabs[next].dataset.platform, { focus: true });
    });
  });

  applyPlatform(active);
})();

/* ——— Dominion Dashboard: feature tabs + accessible lightbox ——— */
(function initDominionDashboard() {
  const root = document.getElementById("dashboard");
  if (!root) return;

  const FEATURE_COPY = {
    overview:
      "View market activity, account information, trading sessions and quick access tools from one central overview.",
    sessions:
      "Follow active global trading sessions and understand which major markets are currently open.",
    money:
      "Access tools designed to help organize trading activity and manage account decisions.",
    journal: "Record and review trading activity through the integrated Dominion Journal.",
    copy: "Access Dominion’s copy-trading area directly through the connected dashboard ecosystem.",
  };

  const tabs = Array.from(root.querySelectorAll('[role="tab"][data-dash-feature]'));
  const panel = root.querySelector("[data-dash-feature-copy]");
  const lightbox = document.getElementById("dashboard-lightbox");
  const expandBtn = root.querySelector("[data-dashboard-expand]");
  const closeEls = lightbox
    ? Array.from(lightbox.querySelectorAll("[data-dashboard-close]"))
    : [];

  let lastFocus = null;

  const selectFeature = (key, { focus = false } = {}) => {
    if (!FEATURE_COPY[key]) return;

    tabs.forEach((tab) => {
      const on = tab.dataset.dashFeature === key;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      if (on && focus) tab.focus();
    });

    if (panel) {
      panel.textContent = FEATURE_COPY[key];
      const activeTab = tabs.find((t) => t.dataset.dashFeature === key);
      if (activeTab) panel.setAttribute("aria-labelledby", activeTab.id);
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      selectFeature(tab.dataset.dashFeature);
    });

    tab.addEventListener("keydown", (event) => {
      const key = event.key;
      if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Home" && key !== "End") {
        return;
      }
      event.preventDefault();
      let next = index;
      if (key === "ArrowRight") next = (index + 1) % tabs.length;
      if (key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (key === "Home") next = 0;
      if (key === "End") next = tabs.length - 1;
      selectFeature(tabs[next].dataset.dashFeature, { focus: true });
    });
  });

  const getFocusable = () => {
    if (!lightbox) return [];
    return Array.from(
      lightbox.querySelectorAll(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && !el.closest("[hidden]"));
  };

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("dashboard-lightbox-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
    lastFocus = null;
  };

  const openLightbox = () => {
    if (!lightbox) return;
    lastFocus = document.activeElement;
    lightbox.hidden = false;
    document.body.classList.add("dashboard-lightbox-open");
    const closeBtn = lightbox.querySelector(".dominion-dashboard__lightbox-close");
    if (closeBtn) closeBtn.focus();
  };

  if (expandBtn) {
    expandBtn.addEventListener("click", openLightbox);
  }

  closeEls.forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox || lightbox.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getFocusable();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();

/* ——— Dominion Ecosystem Hub (Option B) ——— */
(function initEcoHub() {
  const root = document.getElementById("ecosystem");
  if (!root) return;

  const modules = Array.from(root.querySelectorAll("[data-eco-module]"));
  const detail = root.querySelector("[data-eco-detail]");
  const lines = Array.from(root.querySelectorAll("[data-eco-line]"));
  if (!modules.length || !detail) return;

  const ICONS = {
    education:
      '<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M6.5 12v4.2c0 .8 2.4 2.4 5.5 2.4s5.5-1.6 5.5-2.4V12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    simulator:
      '<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><rect x="3.5" y="4.5" width="17" height="12" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 19.5h8M12 16.5v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M7 12.5 10 9.5l3 2.5 3.5-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    tools:
      '<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M4 7h10M18 7h2M14 5v4M4 17h6M14 17h6M10 15v4M4 12h4M12 12h8M8 10v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    community:
      '<svg viewBox="0 0 24 24" width="24" height="24" fill="none"><circle cx="9" cy="9" r="3" stroke="currentColor" stroke-width="1.7"/><circle cx="16.5" cy="10" r="2.4" stroke="currentColor" stroke-width="1.7"/><path d="M3.8 18c.7-2.4 2.7-3.6 5.2-3.6s4.5 1.2 5.2 3.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M14.2 14.6c1.5-.4 3.1 0 4.2 1.4.7.9 1.1 2 1.2 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  };

  const DATA = {
    education: {
      category: "Education",
      title: "Build your knowledge",
      copy: "Access courses, live sessions and practical market analysis through Market Fluidity.",
      linkHref: "#blogs",
      linkLabel: "Explore Education →",
      tabId: "eco-tab-education",
    },
    simulator: {
      category: "Simulator",
      title: "Test before you trade",
      copy: "Practise strategies in a realistic simulated environment with the MT5 Simulator.",
      linkHref: "#mt5-simulator",
      linkLabel: "Open MT5 Simulator →",
      tabId: "eco-tab-simulator",
    },
    tools: {
      category: "Trading Tools",
      title: "Trade with greater control",
      copy: "Manage orders, position sizes and risk using Magic Keys.",
      linkHref: "#dashboard",
      linkLabel: "Explore Trading Tools →",
      tabId: "eco-tab-tools",
    },
    community: {
      category: "Community",
      title: "Learn alongside active traders",
      copy: "Exchange insights and access ongoing support through the Dominion trader community.",
      linkHref: "#trader-community",
      linkLabel: "Join the Community →",
      tabId: "eco-tab-community",
    },
  };

  const categoryEl = detail.querySelector("[data-eco-detail-category]");
  const titleEl = detail.querySelector("[data-eco-detail-title]");
  const copyEl = detail.querySelector("[data-eco-detail-copy]");
  const linkEl = detail.querySelector("[data-eco-detail-link]");
  const iconEl = detail.querySelector("[data-eco-detail-icon]");

  let active = "education";
  let timer;
  let scrollLock = false;
  const mobileMq = window.matchMedia("(max-width: 899px)");
  const modulesEl = root.querySelector(".eco-hub__modules");
  const core = root.querySelector(".eco-hub__core");

  const apply = (key) => {
    const data = DATA[key];
    if (!data) return;
    active = key;

    if (categoryEl) categoryEl.textContent = data.category;
    if (titleEl) titleEl.textContent = data.title;
    if (copyEl) copyEl.textContent = data.copy;
    if (linkEl) {
      linkEl.href = data.linkHref;
      linkEl.textContent = data.linkLabel;
    }
    if (iconEl) iconEl.innerHTML = ICONS[key] || "";
    detail.setAttribute("aria-labelledby", data.tabId);

    lines.forEach((line) => {
      line.classList.toggle("is-active", line.dataset.ecoLine === key);
    });
  };

  const paintActive = (key, focus = false) => {
    modules.forEach((btn) => {
      const on = btn.dataset.ecoModule === key;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
      btn.tabIndex = on ? 0 : -1;
      if (on && focus) btn.focus();
    });
  };

  const select = (key, { focus = false, fromScroll = false } = {}) => {
    if (!DATA[key]) return;
    if (key === active) {
      paintActive(key, focus);
      return;
    }

    paintActive(key, focus);

    const commit = () => {
      apply(key);
      detail.classList.remove("is-switching");
    };

    if (reduceMotion || fromScroll || mobileMq.matches) {
      commit();
      return;
    }

    detail.classList.add("is-switching");
    window.clearTimeout(timer);
    timer = window.setTimeout(commit, 150);
  };

  modules.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      scrollLock = true;
      select(btn.dataset.ecoModule);
      window.setTimeout(() => {
        scrollLock = false;
      }, 700);
    });
    btn.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
        return;
      }
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % modules.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + modules.length) % modules.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = modules.length - 1;
      select(modules[next].dataset.ecoModule, { focus: true });
    });
  });

  const sectionInView = () => {
    const rect = root.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    return rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
  };

  const syncScrollStory = () => {
    const vh = window.innerHeight || 1;
    root.classList.toggle("is-live", sectionInView() && !reduceMotion);

    if (!mobileMq.matches || !modulesEl) return;

    const railRect = modulesEl.getBoundingClientRect();
    const start = railRect.top + window.scrollY - vh * 0.55;
    const end = railRect.bottom + window.scrollY - vh * 0.35;
    let progress = (window.scrollY - start) / Math.max(1, end - start);
    progress = Math.min(1, Math.max(0, progress));
    modulesEl.style.setProperty("--eco-progress", String(reduceMotion ? 1 : progress));

    if (core) {
      const coreRect = core.getBoundingClientRect();
      if (coreRect.top < vh * 0.9) core.classList.add("is-revealed");
    }

    const focusY = vh * 0.42;
    let best = modules[0];
    let bestDist = Infinity;
    modules.forEach((module) => {
      const rect = module.getBoundingClientRect();
      if (rect.top < vh * 0.92) module.classList.add("is-revealed");
      const mid = rect.top + rect.height / 2;
      const dist = Math.abs(mid - focusY);
      if (dist < bestDist) {
        bestDist = dist;
        best = module;
      }
    });

    if (!scrollLock && best && best.dataset.ecoModule) {
      select(best.dataset.ecoModule, { fromScroll: true });
    }
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      syncScrollStory();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  if (typeof mobileMq.addEventListener === "function") {
    mobileMq.addEventListener("change", onScroll);
  } else if (typeof mobileMq.addListener === "function") {
    mobileMq.addListener(onScroll);
  }

  apply(active);
  paintActive(active);
  syncScrollStory();
})();

/* ——— MT5 Simulator Experience (illustrative replay demo) ——— */
(() => {
  const root = document.querySelector("[data-sim-xp]");
  if (!root) return;

  const canvas = root.querySelector("#sim-xp-chart");
  const playBtn = root.querySelector("[data-sim-play]");
  const scrub = root.querySelector("[data-sim-scrub]");
  const timeEl = root.querySelector("[data-sim-time]");
  const speedBtns = [...root.querySelectorAll("[data-sim-speed]")];
  const stepBtns = [...root.querySelectorAll("[data-sim-step]")];
  const scenarioBtn = root.querySelector("[data-sim-scenario]");
  const scenarioCard = root.querySelector(".sim-xp__scenario");
  const scenarioToggle = root.querySelector("[data-sim-scenario-toggle]");
  const scenarioClose = root.querySelector("[data-sim-scenario-close]");
  const practiceBtns = [...root.querySelectorAll(".sim-xp__sell, .sim-xp__buy")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const candles = [
    { o: 1.0862, h: 1.0884, l: 1.0851, c: 1.0876 },
    { o: 1.0876, h: 1.0898, l: 1.0864, c: 1.0889 },
    { o: 1.0889, h: 1.0912, l: 1.0878, c: 1.0901 },
    { o: 1.0901, h: 1.0918, l: 1.0884, c: 1.0892 },
    { o: 1.0892, h: 1.0906, l: 1.0868, c: 1.0874 },
    { o: 1.0874, h: 1.0891, l: 1.0859, c: 1.0882 },
    { o: 1.0882, h: 1.0924, l: 1.0876, c: 1.0915 },
    { o: 1.0915, h: 1.0938, l: 1.0902, c: 1.0928 },
    { o: 1.0928, h: 1.0942, l: 1.0898, c: 1.0904 },
    { o: 1.0904, h: 1.0916, l: 1.0872, c: 1.0881 },
    { o: 1.0881, h: 1.0908, l: 1.0866, c: 1.0902 },
    { o: 1.0902, h: 1.0931, l: 1.0894, c: 1.0924 },
    { o: 1.0924, h: 1.0948, l: 1.0911, c: 1.0936 },
    { o: 1.0936, h: 1.0952, l: 1.0908, c: 1.0914 },
    { o: 1.0914, h: 1.0926, l: 1.0884, c: 1.0895 },
    { o: 1.0895, h: 1.0918, l: 1.0881, c: 1.0911 },
    { o: 1.0911, h: 1.0934, l: 1.0902, c: 1.0922 },
    { o: 1.0922, h: 1.0941, l: 1.0906, c: 1.0910 },
    { o: 1.0910, h: 1.0928, l: 1.0888, c: 1.0898 },
    { o: 1.0898, h: 1.0915, l: 1.0876, c: 1.0906 },
    { o: 1.0906, h: 1.0932, l: 1.0894, c: 1.0925 },
    { o: 1.0925, h: 1.0946, l: 1.0912, c: 1.0938 },
    { o: 1.0938, h: 1.0955, l: 1.0918, c: 1.0924 },
    { o: 1.0924, h: 1.0936, l: 1.0892, c: 1.0899 },
  ];

  const startMs = Date.UTC(2024, 4, 16, 7, 0, 0);
  const endMs = Date.UTC(2024, 4, 16, 12, 0, 0);
  const scenarios = [
    {
      pair: "EUR/USD · London Session",
      date: "16 May 2024",
      time: "08:30 (GMT+1)",
      scenario: "London Open",
    },
    {
      pair: "EUR/USD · New York Overlap",
      date: "16 May 2024",
      time: "13:30 (GMT+1)",
      scenario: "NY Overlap",
    },
  ];

  let progress = Number(scrub?.value || 28);
  let playing = false;
  let speed = 1;
  let scenarioIndex = 0;
  let raf = 0;
  let lastTs = 0;

  const formatTime = (pct) => {
    const ms = startMs + ((endMs - startMs) * pct) / 100;
    const d = new Date(ms);
    const day = d.getUTCDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const hh = String(d.getUTCHours() + 1).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    const ss = String(d.getUTCSeconds()).padStart(2, "0");
    return `${day} ${months[d.getUTCMonth()]} 2024 ${hh}:${mm}:${ss} GMT+1`;
  };

  const drawChart = () => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth || 720;
    const cssH = canvas.clientHeight || 280;
    const w = Math.max(1, Math.floor(cssW * dpr));
    const h = Math.max(1, Math.floor(cssH * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const visible = Math.max(8, Math.round(8 + (candles.length - 8) * (progress / 100)));
    const slice = candles.slice(0, visible);
    let min = Infinity;
    let max = -Infinity;
    slice.forEach((c) => {
      min = Math.min(min, c.l);
      max = Math.max(max, c.h);
    });
    const pad = (max - min) * 0.12 || 0.001;
    min -= pad;
    max += pad;

    const left = 8;
    const right = cssW - 52;
    const top = 10;
    const bottom = cssH - 22;
    const plotW = right - left;
    const plotH = bottom - top;
    const yOf = (price) => top + ((max - price) / (max - min)) * plotH;

    ctx.strokeStyle = "rgba(71,189,104,0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i += 1) {
      const y = top + (plotH * i) / 4;
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
      ctx.stroke();
    }

    const gap = plotW / Math.max(slice.length, 1);
    const bodyW = Math.max(3, gap * 0.55);

    slice.forEach((c, i) => {
      const x = left + gap * i + gap / 2;
      const yO = yOf(c.o);
      const yC = yOf(c.c);
      const yH = yOf(c.h);
      const yL = yOf(c.l);
      const up = c.c >= c.o;
      const color = up ? "#47BD68" : "#D45B5B";

      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, yH);
      ctx.lineTo(x, yL);
      ctx.stroke();

      ctx.fillStyle = color;
      const bodyTop = Math.min(yO, yC);
      const bodyH = Math.max(2, Math.abs(yC - yO));
      ctx.fillRect(x - bodyW / 2, bodyTop, bodyW, bodyH);
    });

    const last = slice[slice.length - 1];
    if (last) {
      const y = yOf(last.c);
      ctx.strokeStyle = "rgba(71,189,104,0.55)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#47BD68";
      ctx.fillRect(right + 4, y - 10, 44, 20);
      ctx.fillStyle = "#102418";
      ctx.font = "600 10px Montserrat, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(last.c.toFixed(5), right + 26, y);
    }
  };

  const syncUi = () => {
    if (scrub) {
      scrub.value = String(Math.round(progress));
      scrub.setAttribute("aria-valuetext", `${Math.round(progress)} percent through historical replay`);
    }
    if (timeEl) timeEl.textContent = formatTime(progress);
    if (playBtn) {
      playBtn.setAttribute("aria-pressed", playing ? "true" : "false");
      playBtn.setAttribute("aria-label", playing ? "Pause historical replay" : "Play historical replay");
    }
    drawChart();
  };

  const stopLoop = () => {
    playing = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    lastTs = 0;
    syncUi();
  };

  const tick = (ts) => {
    if (!playing) return;
    if (!lastTs) lastTs = ts;
    const delta = ts - lastTs;
    lastTs = ts;
    progress = Math.min(100, progress + (delta * 0.0045 * speed));
    if (progress >= 100) {
      progress = 100;
      stopLoop();
      return;
    }
    syncUi();
    raf = requestAnimationFrame(tick);
  };

  const startLoop = () => {
    if (reduceMotion) {
      progress = Math.min(100, progress + 8);
      syncUi();
      return;
    }
    playing = true;
    lastTs = 0;
    syncUi();
    raf = requestAnimationFrame(tick);
  };

  playBtn?.addEventListener("click", () => {
    if (playing) stopLoop();
    else startLoop();
  });

  scrub?.addEventListener("input", () => {
    progress = Number(scrub.value);
    if (playing) stopLoop();
    else syncUi();
  });

  speedBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      speed = Number(btn.dataset.simSpeed || 1);
      speedBtns.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    });
  });

  stepBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = Number(btn.dataset.simStep || 0);
      progress = Math.max(0, Math.min(100, progress + dir * 6));
      if (playing) stopLoop();
      else syncUi();
    });
  });

  const setScenarioOpen = (open, { restoreFocus = false } = {}) => {
    if (!scenarioCard) return;
    scenarioCard.hidden = !open;
    scenarioCard.classList.toggle("is-open", open);
    scenarioToggle?.setAttribute("aria-expanded", open ? "true" : "false");
    if (!open && restoreFocus) scenarioToggle?.focus();
  };

  const applyScenario = () => {
    const data = scenarios[scenarioIndex];
    if (!data || !scenarioCard) return;
    const pair = scenarioCard.querySelector(".sim-xp__scenario-pair");
    const values = scenarioCard.querySelectorAll("li strong");
    if (pair) pair.textContent = data.pair;
    if (values[0]) values[0].textContent = data.date;
    if (values[1]) values[1].textContent = data.time;
    if (values[2]) values[2].textContent = data.scenario;
    scenarioBtn?.setAttribute("aria-pressed", "true");
  };

  scenarioToggle?.addEventListener("click", () => {
    const open = scenarioCard?.hidden !== false;
    setScenarioOpen(open);
  });

  scenarioClose?.addEventListener("click", () => setScenarioOpen(false, { restoreFocus: true }));

  scenarioBtn?.addEventListener("click", () => {
    scenarioIndex = (scenarioIndex + 1) % scenarios.length;
    applyScenario();
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && scenarioCard && !scenarioCard.hidden) {
      setScenarioOpen(false, { restoreFocus: true });
    }
  });

  practiceBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("is-pressed");
      window.setTimeout(() => btn.classList.remove("is-pressed"), 180);
    });
  });

  const onResize = () => drawChart();
  window.addEventListener("resize", onResize, { passive: true });

  syncUi();
})();

/* ——— Copy Trading Control-First (illustrative preview) ——— */
(() => {
  const root = document.querySelector("[data-copy-ctrl]");
  if (!root) return;

  const strategySelect = root.querySelector("[data-copy-strategy]");
  const strategyMeta = root.querySelector("[data-copy-strategy-meta]");
  const statusStrategy = root.querySelector("[data-copy-status-strategy]");
  const allocInput = root.querySelector("[data-copy-alloc]");
  const allocOut = root.querySelector("[data-copy-alloc-out]");
  const allocPct = root.querySelector("[data-copy-alloc-pct]");
  const allocShare = root.querySelector("[data-copy-alloc-share]");
  const availShare = root.querySelector("[data-copy-avail-share]");
  const statusAlloc = root.querySelector("[data-copy-status-alloc]");
  const bar = root.querySelector("[data-copy-bar]");
  const lossInput = root.querySelector("[data-copy-loss]");
  const lossOut = root.querySelector("[data-copy-loss-out]");
  const positionsEl = root.querySelector("[data-copy-positions]");
  const statusPositions = root.querySelector("[data-copy-status-positions]");
  const statusBadge = root.querySelector("[data-copy-status]");
  const stateLabel = root.querySelector("[data-copy-state-label]");
  const chip = root.querySelector("[data-copy-chip]");
  const pauseBtn = root.querySelector("[data-copy-pause]");
  const stopBtn = root.querySelector("[data-copy-stop]");

  const strategies = {
    balanced: {
      label: "Balanced Strategy",
      meta: "Moderate risk · Forex & Indices",
      positions: 4,
    },
    conservative: {
      label: "Conservative Strategy",
      meta: "Lower risk · Major FX",
      positions: 3,
    },
    growth: {
      label: "Growth Strategy",
      meta: "Higher risk · Indices & Commodities",
      positions: 5,
    },
  };

  const balance = 10000;
  let mode = "active"; // active | paused | stopped

  const formatMoney = (value) =>
    `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  const syncAlloc = () => {
    if (!allocInput) return;
    const value = Number(allocInput.value);
    const pct = Math.round((value / balance) * 100);
    const available = Math.max(0, 100 - pct);
    if (allocOut) allocOut.textContent = formatMoney(value);
    if (allocPct) allocPct.textContent = `${pct}% of available balance`;
    if (allocShare) allocShare.textContent = `${pct}%`;
    if (availShare) availShare.textContent = `${available}%`;
    if (statusAlloc) statusAlloc.textContent = formatMoney(value);
    if (bar) bar.style.width = `${pct}%`;
    allocInput.setAttribute("aria-valuetext", `${value} dollars allocated`);
  };

  const syncLoss = () => {
    if (!lossInput) return;
    const value = Number(lossInput.value);
    if (lossOut) lossOut.textContent = `${value}%`;
    lossInput.setAttribute("aria-valuetext", `${value} percent maximum loss`);
  };

  const syncStrategy = () => {
    const key = strategySelect?.value || "balanced";
    const data = strategies[key] || strategies.balanced;
    if (strategyMeta) strategyMeta.textContent = data.meta;
    if (statusStrategy) statusStrategy.textContent = data.label;
    if (positionsEl) positionsEl.textContent = String(data.positions);
    if (statusPositions) statusPositions.textContent = String(data.positions);
  };

  const syncMode = () => {
    const labels = {
      active: "Active",
      paused: "Paused",
      stopped: "Stopped",
    };
    const stateLabels = {
      active: "Copying active",
      paused: "Copying paused",
      stopped: "Copying stopped",
    };

    statusBadge?.classList.remove("is-paused", "is-stopped");
    chip?.classList.remove("is-paused", "is-stopped");
    if (mode === "paused") {
      statusBadge?.classList.add("is-paused");
      chip?.classList.add("is-paused");
    }
    if (mode === "stopped") {
      statusBadge?.classList.add("is-stopped");
      chip?.classList.add("is-stopped");
    }

    if (statusBadge) {
      statusBadge.innerHTML = `<span class="copy-ctrl__status-dot" aria-hidden="true"></span>${labels[mode]}`;
    }
    if (stateLabel) stateLabel.textContent = stateLabels[mode];
    if (chip) {
      chip.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="7.25" stroke="currentColor" stroke-width="1.7" />
          <path d="M8.5 12.2l2.3 2.3 4.7-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        ${stateLabels[mode]}
      `;
    }

    pauseBtn?.setAttribute("aria-pressed", mode === "paused" ? "true" : "false");
    stopBtn?.setAttribute("aria-pressed", mode === "stopped" ? "true" : "false");
    if (pauseBtn) {
      const icon =
        mode === "paused"
          ? '<path d="M9 8.2v7.6l6.8-3.8L9 8.2z" fill="currentColor"/>'
          : '<path d="M9 7v10M15 7v10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
      pauseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">${icon}</svg>
        ${mode === "paused" ? "Resume Copying" : "Pause Copying"}
      `;
    }
  };

  strategySelect?.addEventListener("change", syncStrategy);
  allocInput?.addEventListener("input", syncAlloc);
  lossInput?.addEventListener("input", syncLoss);

  pauseBtn?.addEventListener("click", () => {
    if (mode === "stopped") mode = "active";
    else mode = mode === "paused" ? "active" : "paused";
    syncMode();
  });

  stopBtn?.addEventListener("click", () => {
    mode = mode === "stopped" ? "active" : "stopped";
    syncMode();
  });

  syncStrategy();
  syncAlloc();
  syncLoss();
  syncMode();
})();

}

export default initDominionMockups;
