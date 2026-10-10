'use client';

import { motion } from 'framer-motion';
import { PillarItem } from './PillarItem';

const pillars = [
  {
    index: '01',
    title: 'Versatile Vocal Mastery',
    blurb: 'Effortlessly traversing power ballads, classic rock anthems, soulful R&B, dance pop, and timeless Filipino OPM with crystalline pitch and emotional depth.',
  },
  {
    index: '02',
    title: 'Dynamic Band Leadership',
    blurb: 'A seasoned frontwoman with natural band chemistry. Commands the room with magnetic presence, tight musical cues, and an electric connection with audiences.',
  },
  {
    index: '03',
    title: 'International Stage Pedigree',
    blurb: 'Over two decades headlining luxury hotel lounges and premier concert venues across Tokyo, Dubai, Abu Dhabi, Changchun, and Southeast Asia.',
  },
  {
    index: '04',
    title: 'Master 300+ Song Repertoire',
    blurb: 'A vast multi-genre catalog spanning 80s & 90s classics, classic rock, modern radio hits, acoustic duets, and iconic medleys tailored for any venue.',
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
            The Performer
          </motion.div>

          <div className="reveal-line overflow-hidden mb-6">
            <motion.h2
              initial={{ y: '110%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="bio__heading font-display text-4xl sm:text-5xl uppercase leading-none"
            >
              A voice that commands the room.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bio__lead font-sans text-xl leading-relaxed text-muted max-w-[46ch]"
          >
            With over 26 years of international stage experience, Ma. Katrina Concepcion is a remarkably versatile vocalist celebrated for captivating live performances. Having graced stages from intimate acoustic lounges to high-energy hotel residencies across Japan, Dubai, Abu Dhabi, China, Malaysia, and Indonesia, she specializes in delivering powerful live vocals, engaging stage presence, and unwavering professionalism.
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
