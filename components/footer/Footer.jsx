'use client';

import { motion } from 'framer-motion';
import { CopyEmailBtn } from './CopyEmailBtn';

const contacts = [
  { href: 'tel:+639776281086', label: '+63 977 628 1086' },
  { href: 'mailto:cma.katrina@yahoo.com', label: 'Email Inquiries' },
  { href: '#videos', label: 'Live Reel' },
];

export function Footer() {
  return (
    <footer id="contact" className="footer pt-section px-gutter">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="eyebrow flex items-center gap-3 font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted mb-6"
      >
        <span className="eyebrow__dot w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_#ff2a85] shrink-0" />
        Bookings &amp; Inquiries
      </motion.div>

      <div className="reveal-line overflow-hidden mb-6">
        <motion.h2
          initial={{ y: '110%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="footer__heading font-display text-4xl sm:text-5xl uppercase leading-none"
        >
          Ready to bring world-class vocals to your stage?
        </motion.h2>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="footer__subtitle font-sans text-xl leading-relaxed text-muted mb-10 max-w-[46ch]"
      >
        Available for international hotel residencies, headline live band gigs, corporate galas, weddings, and private events.
      </motion.p>

      {/* Interactive Email Copy Button */}
      <CopyEmailBtn />

      {/* Bottom Bar */}
      <div className="footer__bar flex flex-wrap justify-between items-end gap-8 border-t border-line py-10">
        <div>
          <p className="footer__signature font-display text-3xl sm:text-4xl uppercase leading-none mb-2">
            Ma. Katrina Concepcion
          </p>
          <p className="footer__subtitle-sm font-sans text-xs text-muted tracking-[0.14em]">
            Vocalist &amp; Live Performer · Direct: +63 977 628 1086
          </p>
        </div>

        <nav className="footer__socials flex gap-8 flex-wrap" aria-label="Booking and professional contact channels">
          {contacts.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="footer__social-link relative font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted hover:text-foreground transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="footer__copyright font-sans text-xs text-muted tracking-[0.14em]">
          © 2026 Ma. Katrina Concepcion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
