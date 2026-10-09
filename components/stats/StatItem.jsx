'use client';

import { motion } from 'framer-motion';

export function StatItem({ figure, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="stat py-10 border-b sm:border-b-0 border-line hover:pl-2 transition-all duration-300 group"
    >
      <dd className="stat__figure font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
        {figure}
      </dd>
      <dt className="stat__label font-sans text-base uppercase tracking-[0.14em] text-muted leading-tight">
        {label}
      </dt>
    </motion.div>
  );
}
