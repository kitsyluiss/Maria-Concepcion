'use client';

import { motion } from 'framer-motion';
import { StatItem } from './StatItem';

const statsData = [
  { figure: '350M+', label: 'Global catalog streams' },
  { figure: '4.8M', label: 'Monthly Spotify listeners' },
  { figure: '28', label: 'Sold-out headline tour dates' },
  { figure: '14', label: 'International festival appearances' },
];

export function Stats() {
  return (
    <section id="stats" className="stats py-section px-gutter">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="eyebrow flex items-center gap-3 font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted mb-6"
      >
        <span className="eyebrow__dot w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#ff2a85] shrink-0" />
        By The Numbers
      </motion.div>

      <div className="reveal-line overflow-hidden mb-12">
        <motion.h2
          initial={{ y: '110%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="stats__heading font-display text-4xl sm:text-5xl uppercase leading-none"
        >
          Global reach, measured.
        </motion.h2>
      </div>

      <dl className="stats__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-line">
        {statsData.map((stat, i) => (
          <StatItem
            key={stat.label}
            figure={stat.figure}
            label={stat.label}
            delay={i * 0.1}
          />
        ))}
      </dl>
    </section>
  );
}
