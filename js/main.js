/**
 * Maria Concepcion — Official EPK Core Logic
 * Liquid SVG Shaders, Smooth Scrolling, Sound Engine & Interactive Systems
 */
import { sonic } from './audio-engine.js';

// ── Adaptive Responsive Grid (Above 1920px) ──
const FONT_BASE = 16;
const BASE_W = 1920;
const COEF = 0.6666;

function applyAdaptiveGrid() {
  const w = window.innerWidth;
  const r = ((BASE_W - w) / BASE_W) * 100 * COEF;
  const s = FONT_BASE - (FONT_BASE * r) / 100;
  if (s > FONT_BASE) {
    document.documentElement.style.fontSize = s + "px";
  } else {
    document.documentElement.style.removeProperty("font-size");
  }
}
applyAdaptiveGrid();
window.addEventListener("resize", applyAdaptiveGrid);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── Resilient Lenis Smooth Scroll ──
let lenis;
async function initScroll() {
  try {
    const mod = await import("lenis");
    const LenisClass = mod.default || mod;
    lenis = new LenisClass({ smoothWheel: true });
  } catch (err) {
    const fallbackMod = await import("./lenis-local.js");
    const FallbackLenis = fallbackMod.default || fallbackMod;
    lenis = new FallbackLenis({ smoothWheel: true });
  }
  window.lenis = lenis;

  function raf(t) {
    lenis.raf(t);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
initScroll();

// ── Preloader System ──
function runPreloader() {
  return new Promise(resolve => {
    if (lenis && lenis.stop) lenis.stop();
    const el = document.getElementById("preloader");
    if (!el) {
      if (lenis && lenis.start) lenis.start();
      resolve();
      return;
    }

    if (reduceMotion) {
      el.style.display = "none";
      if (lenis && lenis.start) lenis.start();
      resolve();
      return;
    }

    const cnt = document.getElementById("preloader-count");
    const t0 = performance.now();
    const dur = 1800;

    function tick(now) {
      const t = Math.min((now - t0) / dur, 1);
      // Ease out count
      const eased = 1 - Math.pow(1 - t, 2.5);
      const val = Math.floor(eased * 100);
      if (cnt) cnt.textContent = val;

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        if (cnt) cnt.textContent = "100";
        el.classList.add("fade-text");
        setTimeout(() => {
          el.classList.add("wipe");
          setTimeout(() => {
            el.style.display = "none";
            if (lenis && lenis.start) lenis.start();
            resolve();
          }, 650);
        }, 350);
      }
    }
    requestAnimationFrame(tick);
  });
}

// ── Press Data & Real Photography ──
const pressData = [
  {
    quote: "Maria Concepcion delivers an undeniable masterclass in modern pop: dark, intoxicating, and vocally unmatched.",
    image: "images/singing.jpeg",
    filter: "liquid-p1",
    disp: "disp-p1",
    alt: "Maria Concepcion performing live with microphone under stage lighting"
  },
  {
    quote: "A magnetic stage presence and singular production voice that proves alternative pop has found its next great auteur.",
    image: "images/portrait standing.jpeg",
    filter: "liquid-p2",
    disp: "disp-p2",
    alt: "Maria Concepcion standing in dramatic editorial studio portrait"
  },
  {
    quote: "The kind of generational vocal power and visual worldbuilding that turns concerts into religious experiences.",
    image: "images/portrait.jpeg",
    filter: "liquid-p3",
    disp: "disp-p3",
    alt: "Maria Concepcion intense close-up portrait"
  }
];

function animateQuote(text) {
  const container = document.getElementById("press-quote");
  if (!container) return;
  container.innerHTML = "";
  const words = text.split(" ");
  words.forEach((w, i) => {
    const s = document.createElement("span");
    s.className = "press__word";
    s.textContent = w;
    s.style.transitionDelay = (i * 22) + "ms";
    container.appendChild(s);
    if (i < words.length - 1) {
      container.appendChild(document.createTextNode(" "));
    }
  });

  if (reduceMotion) {
    container.querySelectorAll(".press__word").forEach(w => w.classList.add("in-view"));
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      container.querySelectorAll(".press__word").forEach(w => w.classList.add("in-view"));
    });
  });
}

// ── Setup After Preloader ──
runPreloader().then(() => {
  const heroEl = document.querySelector(".hero");
  if (heroEl) heroEl.classList.add("animated");
  if (reduceMotion) return;
  animateQuote(pressData[0].quote);
});

// ── Scroll Reveal Observer ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

if (reduceMotion) {
  document.querySelectorAll(".reveal, .reveal-card, .reveal-line").forEach(el => el.classList.add("in-view"));
} else {
  document.querySelectorAll(".reveal, .reveal-card, .reveal-line").forEach(el => observer.observe(el));
}

// ── Interactive Press Switcher ──
let activePress = 0;
document.querySelectorAll(".press__btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const i = +btn.dataset.index;
    if (i === activePress) return;
    activePress = i;
    document.querySelectorAll(".press__btn").forEach((b, j) => b.classList.toggle("active", j === i));
    const d = pressData[i];
    animateQuote(d.quote);
    const img = document.getElementById("press-img");
    if (img) {
      img.src = d.image;
      img.alt = d.alt;
      img.style.filter = `url(#${d.filter})`;
    }
    const fig = document.getElementById("press-fig");
    if (fig) {
      fig.dataset.disp = d.disp;
    }
  });
});

// ── Mobile Navigation Drawer ──
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
if (burger && drawer) {
  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("open");
    drawer.classList.toggle("open", open);
    if (open) {
      if (lenis && lenis.stop) lenis.stop();
    } else {
      if (lenis && lenis.start) lenis.start();
    }
  });

  document.querySelectorAll(".mobile-drawer__link").forEach(l => {
    l.addEventListener("click", () => {
      burger.classList.remove("open");
      drawer.classList.remove("open");
      if (lenis && lenis.start) lenis.start();
    });
  });
}

// ── Nav Anchor Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (!href || href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      if (lenis && lenis.scrollTo) {
        lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (drawer && drawer.classList.contains("open")) {
      burger.classList.remove("open");
      drawer.classList.remove("open");
      if (lenis && lenis.start) lenis.start();
    }
  });
});

// ── SVG Liquid Displacement Hover Animation ──
function animDisp(el, from, to, dur = 550) {
  const t0 = performance.now();
  (function step(now) {
    const t = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - t, 3); // Cubic ease-out
    const val = (from + (to - from) * e).toFixed(2);
    el.setAttribute("scale", val);
    if (t < 1) requestAnimationFrame(step);
  })(performance.now());
}

document.querySelectorAll(".liquid-image[data-disp]").forEach(fig => {
  const dispEl = document.getElementById(fig.dataset.disp);
  if (!dispEl) return;
  fig.addEventListener("mouseenter", () => animDisp(dispEl, 0, 28));
  fig.addEventListener("mouseleave", () => animDisp(dispEl, 28, 0));
});

// ── Audio Engine Integration ──
// Release Card Previews
const releaseButtons = document.querySelectorAll(".release-card__play-btn");
releaseButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const trackId = btn.dataset.track;
    const isPlaying = sonic.playTrack(trackId);

    releaseButtons.forEach(b => {
      b.classList.remove("is-playing");
      const icon = b.querySelector(".play-icon");
      const text = b.querySelector(".play-text");
      if (icon) icon.textContent = "▶";
      if (text) text.textContent = "Preview";
    });

    if (isPlaying) {
      btn.classList.add("is-playing");
      const icon = btn.querySelector(".play-icon");
      const text = btn.querySelector(".play-text");
      if (icon) icon.textContent = "❚❚";
      if (text) text.textContent = "Playing";
    }
  });
});

// Ambient Sonic Experience Toggle in Nav
const soundToggle = document.getElementById("sound-toggle");
if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    sonic.toggleAmbient(soundToggle);
  });
}

// ── Booking Email Copy Feedback ──
const emailLink = document.querySelector(".footer__email");
const feedbackBadge = document.querySelector(".footer__copy-feedback");
if (emailLink && feedbackBadge) {
  emailLink.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("booking@mariaconcepcion.com").then(() => {
      feedbackBadge.classList.add("show");
      setTimeout(() => feedbackBadge.classList.remove("show"), 2000);
    });
  });
}
