'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export function HeroPortrait() {
  const figRef = useRef(null);
  const animFrameRef = useRef(null);

  const animDisp = useCallback((from, to, dur = 550) => {
    const dispEl = document.getElementById('disp-hero');
    if (!dispEl) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const t0 = performance.now();
    function step(now) {
      const t = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - t, 3); // Cubic ease-out
      const val = (from + (to - from) * e).toFixed(2);
      dispEl.setAttribute('scale', val);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    }
    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  const handleMouseEnter = () => {
    animDisp(0, 26, 600);
  };

  const handleMouseLeave = () => {
    animDisp(26, 0, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="hero__portrait-col absolute bottom-0 left-1/2 -translate-x-1/2 h-[86vh] w-[80vw] sm:w-[48vw] lg:w-[36vw] z-20 flex items-end justify-center pointer-events-auto select-none"
    >
      <figure
        ref={figRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="liquid-image liquid-image--bare w-full h-full flex items-end justify-center group"
      >
        <img
          className="liquid-image__img liquid-image__img--hero w-full h-full object-contain object-bottom pointer-events-auto"
          src="/images/Maria Concepcion portrait.png"
          alt="Maria Concepcion portrait"
          style={{ filter: 'url(#liquid-hero)' }}
          draggable={false}
        />
      </figure>
    </motion.div>
  );
}
