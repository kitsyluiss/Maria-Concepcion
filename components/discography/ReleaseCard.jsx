'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export function ReleaseCard({ release, isOdd, isPlaying, onTogglePlay, delay = 0 }) {
  const animFrameRef = useRef(null);

  const animDisp = useCallback((from, to, dur = 550) => {
    const dispEl = document.getElementById(release.dispId);
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
  }, [release.dispId]);

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
          onMouseEnter={() => animDisp(0, 25)}
          onMouseLeave={() => animDisp(25, 0)}
          className="liquid-image liquid-image--overlay aspect-[16/11] bg-surface rounded-sm border border-line overflow-hidden relative cursor-pointer"
        >
          <img
            className="liquid-image__img w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            src={release.cover}
            alt={`${release.title} cover`}
            style={{ filter: `url(#${release.filterId})` }}
          />
          <div className="liquid-image__veil absolute inset-0 bg-[#808080] mix-blend-color opacity-85 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
          <div className="liquid-image__glow absolute inset-0 bg-gradient-to-tr from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
