'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pressReviews } from './pressData';
import { PressSelector } from './PressSelector';
import { PressQuote } from './PressQuote';

export function Press() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = pressReviews[activeIndex];
  const animFrameRef = useRef(null);

  const animDisp = useCallback((dispId, from, to, dur = 550) => {
    const dispEl = document.getElementById(dispId);
    if (!dispEl) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const t0 = performance.now();
    function step(now) {
      const t = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3);
      const val = (from + (to - from) * e).toFixed(2);
      dispEl.setAttribute('scale', val);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    }
    animFrameRef.current = requestAnimationFrame(step);
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
        {/* Review Selector Buttons */}
        <div className="lg:col-span-5">
          <PressSelector
            reviews={pressReviews}
            activeIndex={activeIndex}
            onSelect={(idx) => setActiveIndex(idx)}
          />
        </div>

        {/* Featured Quote & Dynamic Photo with Liquid Shader */}
        <div className="press__featured lg:col-span-7">
          <PressQuote key={activeReview.publication} quote={activeReview.quote} />

          <div className="relative overflow-hidden rounded-sm group">
            <figure
              onMouseEnter={() => animDisp(activeReview.dispId, 0, 25)}
              onMouseLeave={() => animDisp(activeReview.dispId, 25, 0)}
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
              <div className="liquid-image__veil absolute inset-0 bg-[#808080] mix-blend-color opacity-85 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
              <div className="liquid-image__glow absolute inset-0 bg-gradient-to-tr from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
