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

window.addEventListener("resize", () => {
  drawLineChart(document.getElementById("market-chart"), 2);
  drawLineChart(document.getElementById("copy-chart"), 5);
});
