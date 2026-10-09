'use client';

import { motion } from 'framer-motion';

export function VideoCard({ video, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className={`video-card group flex flex-col ${video.colSpan}`}
    >
      {/* Responsive Vimeo Frame Container */}
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

      {/* Video Metadata */}
      <div className="video-card__meta pt-5">
        <div className="video-card__tags flex items-center gap-3 mb-2">
          <span className="video-card__badge font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {video.badge}
          </span>
          <span className="video-card__ratio font-sans text-xs font-medium uppercase tracking-[0.14em] text-muted">
            {video.ratio}
          </span>
        </div>
        <h3 className="video-card__title font-sans text-xl sm:text-2xl font-semibold text-foreground mb-1.5 transition-colors duration-300 group-hover:text-accent">
          {video.title}
        </h3>
        <p className="video-card__desc font-sans text-sm text-muted leading-relaxed">
          {video.description}
        </p>
      </div>
    </motion.article>
  );
}
