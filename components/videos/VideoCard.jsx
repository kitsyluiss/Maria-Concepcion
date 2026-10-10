'use client';

import { motion } from 'framer-motion';

export function VideoCard({ video, isOdd = false, delay = 0 }) {
  const isVideo = Boolean(video.src);

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={`release-card relative group ${isOdd ? 'md:mt-24' : ''}`}
    >
      <div className="release-card__cover-wrap relative">
        {isVideo ? (
          <div
            className="video-card__frame-wrap relative w-full bg-[#111114] border border-line rounded-[0.25rem] overflow-hidden transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_10px_30px_rgba(255,42,133,0.14)]"
            style={{ paddingTop: video.paddingTop }}
          >
            <iframe
              src={video.src}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title={video.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        ) : (
          <figure className="liquid-image liquid-image--overlay aspect-[16/11] bg-surface rounded-sm border border-line overflow-hidden relative cursor-pointer">
            <img
              className="liquid-image__img w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              src={video.cover}
              alt={`${video.title} cover`}
              style={{ filter: `url(#${video.filterId})` }}
            />
            {/* 1. Grayscale-to-Color Reveal Overlay */}
            <div className="vfx-grayscale-overlay" />
            {/* 2. Red Accent Glow Sweep Overlay */}
            <div className="vfx-glow-overlay" />
            {/* 3. Persistent Radial Vignette Overlay */}
            <div className="vfx-vignette-overlay" />
          </figure>
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
