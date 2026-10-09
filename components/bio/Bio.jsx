'use client';

import { motion } from 'framer-motion';
import { PillarItem } from './PillarItem';

const pillars = [
  {
    index: '01',
    title: 'Unfiltered Lyrical Edge',
    blurb: 'Writing every song from visceral lived experience. No ghostwriting, no watered-down sentimentality.',
  },
  {
    index: '02',
    title: 'Sculpted Electronic Production',
    blurb: 'Fusing modular analog synthesizers with modern trap percussion and orchestral sub-bass.',
  },
  {
    index: '03',
    title: 'Immersive Live Experience',
    blurb: 'Transforming concerts into high-contrast visual performances with synchronized lighting and choreography.',
  },
  {
    index: '04',
    title: 'Direct-to-Fan Independence',
    blurb: 'Building an engaged community across digital platforms that champions authenticity over algorithm chasing.',
  },
];

export function Bio() {
  return (
    <section id="bio" className="bio py-section px-gutter">
      <div className="bio__grid grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-gutter">
        {/* Left Editorial Narrative */}
        <div className="bio__left lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex items-center gap-3 font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted mb-6"
          >
            <span className="eyebrow__dot w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#ff2a85] shrink-0" />
            The Artistry
          </motion.div>

          <div className="reveal-line overflow-hidden mb-6">
            <motion.h2
              initial={{ y: '110%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="bio__heading font-display text-4xl sm:text-5xl uppercase leading-none"
            >
              Sound that commands the room.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bio__lead font-sans text-xl leading-relaxed text-muted max-w-[46ch]"
          >
            For eight years Maria Concepcion has carved out a singular lane in modern pop — blending industrial synth textures with soaring, classically grounded vocal hooks. From intimate basement venues to international festival stages, her trajectory is defined by razor-sharp artistic control and a dedicated global fanbase.
          </motion.p>
        </div>

        {/* Right Pillars List */}
        <div className="bio__right lg:col-span-6">
          <ul>
            {pillars.map((pillar, i) => (
              <PillarItem
                key={pillar.index}
                index={pillar.index}
                title={pillar.title}
                blurb={pillar.blurb}
                delay={i * 0.1}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
