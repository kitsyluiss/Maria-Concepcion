'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    const t0 = performance.now();
    const duration = 1600;
    let rafId = null;

    function tick(now) {
      const elapsed = Math.min((now - t0) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const val = Math.floor(eased * 100);
      setCount(val);

      if (elapsed < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            setShouldRender(false);
            onComplete?.();
          }, 650);
        }, 300);
      }
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          animate={{ y: isDone ? '-100%' : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="preloader fixed inset-0 z-[100] bg-background flex flex-col sm:flex-row justify-end sm:justify-between items-start sm:items-end p-gutter gap-4 sm:gap-0 select-none"
        >
          <motion.div
            animate={{ opacity: isDone ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="preloader__label font-display text-2xl uppercase tracking-tight text-foreground"
          >
            Maria Concepcion
          </motion.div>

          <motion.div
            animate={{ opacity: isDone ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="preloader__counter font-display text-7xl sm:text-8xl tabular-nums leading-none text-foreground"
          >
            <span>{count}</span>
            <span className="preloader__pct text-accent">%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
