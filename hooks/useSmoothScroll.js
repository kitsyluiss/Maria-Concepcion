'use client';

import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let lenisInstance = null;
    let rafId = null;

    async function initLenis() {
      try {
        const Lenis = (await import('lenis')).default;
        lenisInstance = new Lenis({
          smoothWheel: true,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        window.lenis = lenisInstance;

        function raf(time) {
          lenisInstance.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      } catch (e) {
        console.warn('Lenis could not be initialized, falling back to native scrolling', e);
      }
    }

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);
}
