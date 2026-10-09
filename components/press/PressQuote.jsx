'use client';

import { motion } from 'framer-motion';

export function PressQuote({ quote }) {
  const words = quote.split(' ');

  return (
    <blockquote className="press__quote font-sans text-2xl sm:text-3xl leading-snug text-foreground mb-8 min-h-[4.5em]">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.48,
            ease: [0.165, 0.84, 0.44, 1],
            delay: i * 0.022,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </blockquote>
  );
}
