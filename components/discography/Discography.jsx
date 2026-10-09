'use client';

import { motion } from 'framer-motion';
import { releases } from './releasesData';
import { ReleaseCard } from './ReleaseCard';

export function Discography({ activeTrack, onTogglePlay }) {
  return (
    <section id="releases" className="discography py-section px-gutter">
      <div className="section-header flex justify-between items-start mb-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex items-center gap-3 font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted mb-6"
          >
            <span className="eyebrow__dot w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#ff2a85] shrink-0" />
            Discography
          </motion.div>

          <div className="reveal-line overflow-hidden">
            <motion.h2
              initial={{ y: '110%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="discography__heading font-display text-4xl sm:text-5xl uppercase leading-none"
            >
              The records that moved audiences.
            </motion.h2>
          </div>
        </div>

        <span className="section-header__label font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted whitespace-nowrap hidden sm:inline-block">
          04 / Key Releases
        </span>
      </div>

      <div className="discography__grid grid grid-cols-1 md:grid-cols-2 md:gap-x-gutter gap-y-16">
        {releases.map((release, i) => (
          <ReleaseCard
            key={release.id}
            release={release}
            isOdd={i % 2 === 1}
            isPlaying={activeTrack === release.id}
            onTogglePlay={onTogglePlay}
            delay={i * 0.08}
          />
        ))}
      </div>
    </section>
  );
}
