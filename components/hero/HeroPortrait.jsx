'use client';

import { useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

const RESTING_SCALE = 1;
const HOVER_SCALE = 30;
const FREQ_RESTING = 0.009;
const FREQ_HOVER = 0.022;
const TENSION = 140;
const FRICTION = 13;

export function HeroPortrait() {
  const figRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({
    current: RESTING_SCALE,
    velocity: 0,
    target: RESTING_SCALE,
    lastTime: null,
  });

  const isVFXDisabled = useCallback(() => {
    if (typeof window === 'undefined') return true;
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isSmall = window.innerWidth <= 768;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isTouch || isSmall || isReduced;
  }, []);

  const animateTo = useCallback((target) => {
    const s = stateRef.current;
    s.target = target;
    const dispEl = document.getElementById('disp-hero');
    const turbEl = document.getElementById('turb-hero');

    if (rafRef.current) return;

    s.lastTime = performance.now();
    function tick(now) {
      const dt = Math.min((now - s.lastTime) / 1000, 0.032);
      s.lastTime = now;

      // Sub-stepping semi-implicit Euler integration with tension 140 & friction 13
      const subSteps = 4;
      const subDt = dt / subSteps;
      for (let i = 0; i < subSteps; i++) {
        const force = -TENSION * (s.current - s.target) - FRICTION * s.velocity;
        s.velocity += force * subDt;
        s.current += s.velocity * subDt;
      }

      // Map scale to baseFrequency with subtle watery overshoot
      const progress = (s.current - RESTING_SCALE) / (HOVER_SCALE - RESTING_SCALE);
      const currentFreq = FREQ_RESTING + progress * (FREQ_HOVER - FREQ_RESTING);

      if (dispEl) dispEl.setAttribute('scale', s.current.toFixed(2));
      if (turbEl) turbEl.setAttribute('baseFrequency', Math.max(0.002, currentFreq).toFixed(4));

      const isSettled = Math.abs(s.current - s.target) < 0.01 && Math.abs(s.velocity) < 0.05;

      if (isSettled) {
        s.current = s.target;
        s.velocity = 0;
        if (dispEl) dispEl.setAttribute('scale', s.target.toFixed(2));
        const finalFreq = s.target === HOVER_SCALE ? FREQ_HOVER : FREQ_RESTING;
        if (turbEl) turbEl.setAttribute('baseFrequency', finalFreq.toFixed(4));
        rafRef.current = null;
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const handleMouseEnter = () => {
    if (isVFXDisabled()) return;
    animateTo(HOVER_SCALE);
  };

  const handleMouseLeave = () => {
    animateTo(RESTING_SCALE);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="hero__portrait-col absolute bottom-0 inset-x-0 mx-auto h-[88vh] sm:h-[90vh] lg:h-[94vh] w-[85vw] sm:w-[56vw] lg:w-[42vw] z-20 flex items-end justify-center pointer-events-auto select-none"
    >
      {/* Hero Portrait Exception: Apply ONLY the liquid SVG distortion. No grayscale, glow sweep, or vignette */}
      <figure
        ref={figRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="liquid-image liquid-image--bare w-full h-full flex items-end justify-center mx-auto group"
      >
        <img
          className="liquid-image__img liquid-image__img--hero w-full h-full object-contain object-bottom mx-auto pointer-events-auto"
          src="/images/Maria Concepcion portrait.png"
          alt="Maria Concepcion portrait"
          style={{ filter: 'url(#liquid-hero)' }}
          draggable={false}
        />
      </figure>
    </motion.div>
  );
}
