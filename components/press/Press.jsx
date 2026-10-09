'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pressReviews } from './pressData';
import { PressSelector } from './PressSelector';
import { PressQuote } from './PressQuote';

const RESTING_SCALE = 1;
const HOVER_SCALE = 22; // Testimonial portraits hover scale
const FREQ_RESTING = 0.009;
const FREQ_HOVER = 0.022;
const TENSION = 140;
const FRICTION = 13;

export function Press() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = pressReviews[activeIndex];

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
    const dispEl = document.getElementById(activeReview.dispId);
    const turbEl = document.getElementById(`turb-${activeReview.dispId === 'disp-p1' ? 'p1' : activeReview.dispId === 'disp-p2' ? 'p2' : 'p3'}`);

    if (rafRef.current) return;

    s.lastTime = performance.now();
    function tick(now) {
      const dt = Math.min((now - s.lastTime) / 1000, 0.032);
      s.lastTime = now;

      // Sub-step semi-implicit Euler integration (tension 140, friction 13)
      const subSteps = 4;
      const subDt = dt / subSteps;
      for (let i = 0; i < subSteps; i++) {
        const force = -TENSION * (s.current - s.target) - FRICTION * s.velocity;
        s.velocity += force * subDt;
        s.current += s.velocity * subDt;
      }

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
  }, [activeReview.dispId]);

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
    <section id="press" className="press py-section px-gutter">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="eyebrow flex items-center gap-3 font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted mb-6"
      >
        <span className="eyebrow__dot w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#ff2a85] shrink-0" />
        Critical Acclaim
      </motion.div>

      <div className="reveal-line overflow-hidden mb-12">
        <motion.h2
          initial={{ y: '110%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="press__heading font-display text-4xl sm:text-5xl uppercase leading-none"
        >
          What the critics say.
        </motion.h2>
      </div>

      <div className="press__grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter items-start">
        {/* Review Selector Tabs */}
        <div className="lg:col-span-5">
          <PressSelector
            reviews={pressReviews}
            activeIndex={activeIndex}
            onSelect={(idx) => {
              setActiveIndex(idx);
              stateRef.current.current = RESTING_SCALE;
              stateRef.current.target = RESTING_SCALE;
              stateRef.current.velocity = 0;
            }}
          />
        </div>

        {/* Featured Quote & Dynamic Testimonial Photo with Photo VFX */}
        <div className="press__featured lg:col-span-7">
          <PressQuote key={activeReview.publication} quote={activeReview.quote} />

          <div className="relative overflow-hidden rounded-sm group">
            <figure
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="liquid-image liquid-image--overlay aspect-[4/5] max-h-[70vh] bg-surface rounded-sm border border-line overflow-hidden relative cursor-pointer"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeReview.image}
                  initial={{ opacity: 0.2, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.2 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="liquid-image__img w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  src={activeReview.image}
                  alt={activeReview.alt}
                  style={{ filter: `url(#${activeReview.filterId})` }}
                />
              </AnimatePresence>

              {/* 1. Grayscale-to-Color Reveal Overlay */}
              <div className="vfx-grayscale-overlay" />

              {/* 2. Red Accent Glow Sweep Overlay */}
              <div className="vfx-glow-overlay" />

              {/* 3. Persistent Radial Vignette Overlay */}
              <div className="vfx-vignette-overlay" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
