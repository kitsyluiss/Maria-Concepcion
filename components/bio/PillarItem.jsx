'use client';

import { motion } from 'framer-motion';

export function PillarItem({ index, title, blurb, delay = 0 }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="pillar grid grid-cols-[auto_1fr] gap-x-6 border-t border-line py-8 hover:border-line-strong transition-colors duration-300"
    >
      <span className="pillar__index font-sans text-2xl font-semibold text-accent">
        {index}
      </span>
      <div>
        <h3 className="pillar__title font-sans text-2xl font-semibold text-foreground mb-2 leading-tight">
          {title}
        </h3>
        <p className="pillar__blurb font-sans text-base leading-relaxed text-muted max-w-xl">
          {blurb}
        </p>
      </div>
    </motion.li>
  );
}
