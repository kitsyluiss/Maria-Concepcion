'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

const RESTING_SCALE = 1;
const HOVER_SCALE = 28;
const FREQ_RESTING = 0.009;
const FREQ_HOVER = 0.022;
const TENSION = 140;
const FRICTION = 13;

export function VideoCard({
  video,
  isOdd = false,
  delay = 0,
}) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef(null);

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
    const dispEl = document.getElementById(video.dispId);
    const turbEl = document.getElementById(`turb-${video.id === 'royals' ? 'r1' : video.id === 'acoustic-session' ? 'r2' : video.id === 'viande' ? 'r3' : 'r4'}`);

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
  }, [video.dispId, video.id]);

  const handleMouseEnter = () => {
    if (isVFXDisabled() || isPlayingVideo) return;
    animateTo(HOVER_SCALE);
  };

  const handleMouseLeave = () => {
    animateTo(RESTING_SCALE);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleWatchVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlayingVideo(true);
  };

  const handleCloseVideo = (e) => {
    e.stopPropagation();
    setIsPlayingVideo(false);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={`release-card relative group ${isOdd ? 'md:mt-24' : ''}`}
    >
      <div className="release-card__cover-wrap relative">
        {/* 16:11 Cover with Full Photo VFX Shaders & Effects */}
        <figure
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleWatchVideo}
          className="liquid-image liquid-image--overlay aspect-[16/11] bg-surface rounded-sm border border-line overflow-hidden relative cursor-pointer"
        >
          {video.snippetVideo ? (
            <video
              ref={videoRef}
              src={video.snippetVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={video.cover}
              onTimeUpdate={(e) => {
                if (e.currentTarget.currentTime >= 5.0) {
                  e.currentTarget.currentTime = 0;
                }
              }}
              className="liquid-image__video w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              style={{ filter: `url(#${video.filterId})` }}
            />
          ) : (
            <img
              className="liquid-image__img w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              src={video.cover}
              alt={`${video.title} performance cover`}
              style={{ filter: `url(#${video.filterId})` }}
            />
          )}

          {/* 1. Grayscale-to-Color Reveal Overlay */}
          <div className="vfx-grayscale-overlay" />

          {/* 2. Red Accent Glow Sweep Overlay */}
          <div className="vfx-glow-overlay" />

          {/* 3. Persistent Radial Vignette Overlay */}
          <div className="vfx-vignette-overlay" />
        </figure>

        {/* Action Button: Watch Video */}
        {!isPlayingVideo && video.vimeoId && (
          <div className="release-card__actions absolute bottom-4 right-4 z-10 flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWatchVideo();
              }}
              className="release-card__video-btn px-4 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider bg-[#08080a]/85 text-foreground border border-line-strong backdrop-blur-md hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-1.5"
              aria-label={`Watch full video of ${video.title}`}
            >
              <span className="play-icon text-xs leading-none">▶</span>
              <span>Watch Video</span>
            </button>
          </div>
        )}

        {/* Video Player: Mounted and played only when clicked */}
        {isPlayingVideo && (
          <div className="release-card__video-player active absolute inset-0 z-25 bg-[#08080a] rounded-sm overflow-hidden">
            <button
              onClick={handleCloseVideo}
              className="release-card__close-video absolute top-3 right-3 z-30 px-3 py-1 rounded-full bg-[#08080a]/85 text-foreground border border-line-strong hover:border-accent hover:text-accent font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200"
              aria-label="Close video"
            >
              ✕ Close
            </button>
            <div className="w-full h-full">
              <iframe
                src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title={video.title}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}
      </div>

      <h3 className="release-card__name font-sans text-2xl font-semibold text-foreground mt-6 mb-2 group-hover:text-accent transition-colors duration-300">
        {video.title}
      </h3>
      <p className="release-card__blurb font-sans text-base leading-relaxed text-muted mb-4">
        {video.blurb}
      </p>

      <div className="release-card__row flex items-center gap-6 mb-2">
        <span className="release-card__year font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted">
          {video.year}
        </span>
        <span className="release-card__badge font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {video.badge}
        </span>
      </div>

      <p className="release-card__category font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted">
        {video.category}
      </p>
    </motion.article>
  );
}
