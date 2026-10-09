'use client';

import { useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

const RESTING_SCALE = 1;
const HOVER_SCALE = 28;
const FREQ_RESTING = 0.009;
const FREQ_HOVER = 0.022;
const TENSION = 140;
const FRICTION = 13;

export function ReleaseCard({ release, isOdd, isPlaying, onTogglePlay, delay = 0 }) {
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
    const dispEl = document.getElementById(release.dispId);
    const turbEl = document.getElementById(`turb-${release.id === 'neon-requiem' ? 'r1' : release.id === 'midnight-transmission' ? 'r2' : release.id === 'afterglow' ? 'r3' : 'r4'}`);

    if (rafRef.current) return;

    s.lastTime = performance.now();
    function tick(now) {
      const dt = Math.min((now - s.lastTime) / 1000, 0.032);
      s.lastTime = now;

      // Spring physics (tension 140, friction 13, subtle watery overshoot)
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
  }, [release.dispId, release.id]);

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
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={`release-card relative group ${isOdd ? 'md:mt-24' : ''}`}
    >
      <div className="release-card__cover-wrap relative">
        <figure
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="liquid-image liquid-image--overlay aspect-[16/11] bg-surface rounded-sm border border-line overflow-hidden relative cursor-pointer"
        >
          <img
            className="liquid-image__img w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            src={release.cover}
            alt={`${release.title} cover`}
            style={{ filter: `url(#${release.filterId})` }}
          />

          {/* 1. Grayscale-to-Color Reveal Overlay */}
          <div className="vfx-grayscale-overlay" />

          {/* 2. Red Accent Glow Sweep Overlay */}
          <div className="vfx-glow-overlay" />

          {/* 3. Persistent Radial Vignette Overlay */}
          <div className="vfx-vignette-overlay" />
        </figure>

        {/* Audio Stem Preview Trigger */}
        <button
          onClick={() => onTogglePlay(release.id)}
          className={`release-card__play-btn absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider backdrop-blur-md border transition-all duration-300 ${
            isPlaying
              ? 'bg-accent text-[#08080a] border-accent shadow-[0_0_15px_rgba(255,42,133,0.5)]'
              : 'bg-[#08080a]/80 text-foreground border-line-strong hover:border-accent hover:text-accent'
          }`}
          aria-label={`Play preview snippet of ${release.title}`}
        >
          <span className="play-icon text-xs leading-none">{isPlaying ? '❚❚' : '▶'}</span>
          <span className="play-text">{isPlaying ? 'Playing' : 'Preview'}</span>
        </button>
      </div>

      <h3 className="release-card__name font-sans text-2xl font-semibold text-foreground mt-6 mb-2 group-hover:text-accent transition-colors duration-300">
        {release.title}
      </h3>
      <p className="release-card__blurb font-sans text-base leading-relaxed text-muted mb-4">
        {release.blurb}
      </p>

      <div className="release-card__row flex items-center gap-6 mb-2">
        <span className="release-card__year font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted">
          {release.year}
        </span>
        <span className="release-card__badge font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {release.badge}
        </span>
      </div>

      <p className="release-card__category font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted">
        {release.category}
      </p>
    </motion.article>
  );
}
