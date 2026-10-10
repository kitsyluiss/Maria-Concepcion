'use client';

import { motion } from 'framer-motion';
import { HeroPortrait } from './HeroPortrait';

const roles = ['Vocalist', 'Live Performer', 'Band Leader', 'Session Artist'];
const firstName = 'Maria'.split('');
const lastName = 'Concepcion'.split('');

const letterVariant = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.05,
    },
  }),
};

export function Hero() {
  return (
    <section id="top" className="hero min-h-[100svh] relative flex flex-col overflow-hidden">
      {/* Top Header Row: Roles & Statement */}
      <div className="hero__top relative z-30 px-gutter pt-20 sm:pt-32 flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
        <h2 className="hero__roles font-display text-xl sm:text-4xl lg:text-5xl uppercase leading-[1.05] tracking-tight text-foreground">
          {roles.map((role, idx) => (
            <span key={role} className="hero__roles-line block overflow-hidden">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.76,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.08,
                }}
                className="block"
              >
                {role}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="hero__statement max-w-[280px] sm:max-w-sm font-sans text-xs sm:text-base leading-relaxed text-muted text-left sm:text-right"
        >
          A powerhouse vocalist and captivating performer with over 26 years of stage command. Delivering world-class live vocals across international hotel residencies, headline live gigs, and premier corporate events.
        </motion.p>
      </div>

      {/* Massive Typographic Headline */}
      <h1 className="hero__name absolute inset-x-0 bottom-[9vh] sm:bottom-0 sm:translate-y-[6%] flex flex-col items-center font-display uppercase leading-[0.82] sm:leading-[0.78] tracking-tight text-accent text-[17vw] sm:text-[24vw] lg:text-[26vw] z-10 select-none">
        <span className="hero__name-line flex" aria-hidden="true">
          {firstName.map((char, i) => (
            <span key={i} className="hero__name-lw inline-block overflow-hidden align-bottom">
              <motion.span
                custom={i}
                variants={letterVariant}
                initial="hidden"
                animate="visible"
                className="hero__name-letter inline-block"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
        <span className="hero__name-line flex" aria-hidden="true">
          {lastName.map((char, i) => (
            <span key={i} className="hero__name-lw inline-block overflow-hidden align-bottom">
              <motion.span
                custom={i + firstName.length}
                variants={letterVariant}
                initial="hidden"
                animate="visible"
                className="hero__name-letter inline-block"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      </h1>

      {/* Hero Portrait Cutout with Liquid Outline Displacement */}
      <HeroPortrait />

      {/* Cinematic Base Shadow Blend */}
      <div className="hero__gradient absolute inset-x-0 bottom-0 h-[22vh] sm:h-[28vh] bg-gradient-to-b from-transparent via-[#08080a]/40 to-[#08080a] z-[21] pointer-events-none" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hero__scroll-cue absolute bottom-4 sm:bottom-8 left-gutter flex items-center gap-3 font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] text-muted z-30"
      >
        <span className="hero__scroll-line block w-8 sm:w-10 h-[1px] bg-accent" />
        <span>Explore EPK</span>
      </motion.div>
    </section>
  );
}
