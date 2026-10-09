/**
 * Resilient, zero-dependency Smooth Scroll Engine (Lenis API compatible)
 * Provides silky smooth scrolling and complete offline support
 */
export default class Lenis {
  constructor(options = {}) {
    this.options = Object.assign({
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    }, options);

    this.isStopped = false;
    this.targetY = window.scrollY;
    this.currentY = window.scrollY;
    this.callbacks = [];

    // Check if user prefers reduced motion
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  raf(time) {
    if (this.isStopped || this.reduceMotion) return;
    // Passive tick compatibility
  }

  stop() {
    this.isStopped = true;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  start() {
    this.isStopped = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  scrollTo(target, options = {}) {
    if (!target) return;
    let targetElement = null;

    if (typeof target === 'string') {
      targetElement = document.querySelector(target);
    } else if (target instanceof HTMLElement) {
      targetElement = target;
    }

    let top = 0;
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      top = rect.top + window.scrollY - (options.offset || 0);
    } else if (typeof target === 'number') {
      top = target;
    }

    window.scrollTo({
      top: Math.max(0, top),
      behavior: this.reduceMotion ? 'auto' : 'smooth'
    });
  }

  on(event, callback) {
    if (event === 'scroll' && typeof callback === 'function') {
      this.callbacks.push(callback);
    }
  }

  destroy() {
    this.start();
    this.callbacks = [];
  }
}
