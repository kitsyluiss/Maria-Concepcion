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
    quote: "Katrina delivers an electrifying vocal masterclass every single night. Her vocal power, effortless charisma, and rapport with international audiences set a gold standard for live headliners.",
    image: "images/singing.jpeg",
    filter: "liquid-p1",
    disp: "disp-p1",
    turb: "turb-p1",
    alt: "Ma. Katrina Concepcion performing live with microphone under stage lighting"
  },
  {
    quote: "A rare vocalist who commands both intimate, heart-wrenching acoustic ballads and soaring classic rock anthems with effortless precision. A powerhouse frontwoman and crowd magnet.",
    image: "images/portrait standing.jpeg",
    filter: "liquid-p2",
    disp: "disp-p2",
    turb: "turb-p2",
    alt: "Ma. Katrina Concepcion standing in dramatic editorial studio portrait"
  },
  {
    quote: "An astonishing 300+ song repertoire spanning decades and genres. Whether fronting a full live band or performing stripped acoustic sets, her vocal stamina and charisma are second to none.",
    image: "images/portrait.jpeg",
    filter: "liquid-p3",
    disp: "disp-p3",
    turb: "turb-p3",
    alt: "Ma. Katrina Concepcion intense close-up portrait"
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
      fig.dataset.turb = d.turb;
      if (pressVfxController) {
        pressVfxController.updateTargets(d.disp, d.turb);
      }
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

// ── Photo VFX: Spring Physics Liquid Distortion ──
// Parameters: tension = 140, friction = 13, duration ≈ 520ms, subtle watery overshoot
const VFX_SCALES = {
  hero: { resting: 1, hover: 30 },
  card: { resting: 1, hover: 28 },
  testimonial: { resting: 1, hover: 22 }
};

const FREQ_RESTING = 0.009;
const FREQ_HOVER = 0.022;
const TENSION = 140;
const FRICTION = 13;

function isVFXDisabled() {
  if (typeof window === 'undefined') return true;
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isSmallViewport = window.innerWidth <= 768;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return isTouch || isSmallViewport || isReducedMotion;
}

class LiquidSpringController {
  constructor(container) {
    this.container = container;
    this.context = container.dataset.vfxContext || 'card';
    this.dispId = container.dataset.disp;
    this.turbId = container.dataset.turb;

    this.dispEl = document.getElementById(this.dispId);
    this.turbEl = document.getElementById(this.turbId);

    const config = VFX_SCALES[this.context] || VFX_SCALES.card;
    this.restingScale = config.resting;
    this.hoverScale = config.hover;

    this.currentScale = this.restingScale;
    this.velocity = 0;
    this.targetScale = this.restingScale;

    this.rafId = null;
    this.lastTime = null;

    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);

    this.init();
  }

  init() {
    this.container.addEventListener('mouseenter', this.onEnter);
    this.container.addEventListener('mouseleave', this.onLeave);
    if (this.dispEl) this.dispEl.setAttribute('scale', this.restingScale);
    if (this.turbEl) this.turbEl.setAttribute('baseFrequency', FREQ_RESTING);
  }

  updateTargets(dispId, turbId) {
    this.dispId = dispId;
    this.turbId = turbId;
    this.dispEl = document.getElementById(dispId);
    this.turbEl = document.getElementById(turbId);
    this.currentScale = this.restingScale;
    this.velocity = 0;
    this.targetScale = this.restingScale;
    if (this.dispEl) this.dispEl.setAttribute('scale', this.restingScale);
    if (this.turbEl) this.turbEl.setAttribute('baseFrequency', FREQ_RESTING);
  }

  onEnter() {
    if (isVFXDisabled()) return;
    this.setTarget(this.hoverScale);
  }

  onLeave() {
    this.setTarget(this.restingScale);
  }

  setTarget(target) {
    this.targetScale = target;
    if (!this.rafId) {
      this.lastTime = performance.now();
      this.rafId = requestAnimationFrame(this.tick.bind(this));
    }
  }

  tick(now) {
    const elapsed = Math.min((now - this.lastTime) / 1000, 0.032);
    this.lastTime = now;

    // Sub-stepping semi-implicit Euler integration for tension 140 & friction 13
    const subSteps = 4;
    const dt = elapsed / subSteps;
    for (let i = 0; i < subSteps; i++) {
      const force = -TENSION * (this.currentScale - this.targetScale) - FRICTION * this.velocity;
      this.velocity += force * dt;
      this.currentScale += this.velocity * dt;
    }

    // Map scale progress to baseFrequency (0.009 -> 0.022) with watery overshoot
    const progress = (this.currentScale - this.restingScale) / (this.hoverScale - this.restingScale);
    const currentFreq = FREQ_RESTING + progress * (FREQ_HOVER - FREQ_RESTING);

    if (this.dispEl) {
      this.dispEl.setAttribute('scale', this.currentScale.toFixed(2));
    }
    if (this.turbEl) {
      this.turbEl.setAttribute('baseFrequency', Math.max(0.002, currentFreq).toFixed(4));
    }

    // Settling threshold
    const isSettled = Math.abs(this.currentScale - this.targetScale) < 0.01 && Math.abs(this.velocity) < 0.05;

    if (isSettled) {
      this.currentScale = this.targetScale;
      this.velocity = 0;
      if (this.dispEl) this.dispEl.setAttribute('scale', this.targetScale.toFixed(2));
      const finalFreq = this.targetScale === this.hoverScale ? FREQ_HOVER : FREQ_RESTING;
      if (this.turbEl) this.turbEl.setAttribute('baseFrequency', finalFreq.toFixed(4));
      this.rafId = null;
    } else {
      this.rafId = requestAnimationFrame(this.tick.bind(this));
    }
  }

  destroy() {
    this.container.removeEventListener('mouseenter', this.onEnter);
    this.container.removeEventListener('mouseleave', this.onLeave);
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

// Instantiate controllers on all liquid image containers
const vfxControllers = [];
let pressVfxController = null;

document.querySelectorAll('.liquid-image[data-disp]').forEach(container => {
  const ctrl = new LiquidSpringController(container);
  vfxControllers.push(ctrl);
  if (container.id === 'press-fig') {
    pressVfxController = ctrl;
  }
});

// Window resize listener to handle responsive threshold
window.addEventListener('resize', () => {
  if (isVFXDisabled()) {
    vfxControllers.forEach(ctrl => {
      ctrl.setTarget(ctrl.restingScale);
    });
  }
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
    navigator.clipboard.writeText("cma.katrina@yahoo.com").then(() => {
      feedbackBadge.classList.add("show");
      setTimeout(() => feedbackBadge.classList.remove("show"), 2000);
    });
  });
}
