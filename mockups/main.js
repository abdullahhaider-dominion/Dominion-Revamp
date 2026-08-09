const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Sticky nav state */
const nav = document.getElementById("site-nav");
const onScroll = () => {
  if (!nav) return;
  nav.classList.toggle("is-scrolled", window.scrollY > 24);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Scroll reveals */
const reveals = document.querySelectorAll(".reveal");
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
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );
  reveals.forEach((el) => io.observe(el));
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
drawLineChart(document.getElementById("copy-chart"), 5);

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
}

updateSessionCards();
setInterval(updateSessionCards, 1000);

/* Mobile sessions carousel dots */
(function initSessionsCarousel() {
  const track = document.querySelector("[data-sessions-track]");
  const dots = document.querySelectorAll("[data-sessions-dots] [data-dot]");
  if (!track || !dots.length) return;

  const cards = [...track.querySelectorAll(".session-card")];

  const setActive = (index) => {
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  };

  const syncFromScroll = () => {
    if (window.matchMedia("(min-width: 960px)").matches) return;
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
      const card = cards[index];
      if (!card) return;
      card.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
      setActive(index);
    });
  });
})();

window.addEventListener("resize", () => {
  drawLineChart(document.getElementById("market-chart"), 2);
  drawLineChart(document.getElementById("copy-chart"), 5);
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
