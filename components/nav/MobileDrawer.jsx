'use client';

import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '#bio', label: 'Bio' },
  { href: '#releases', label: 'Releases' },
  { href: '#stats', label: 'Stats' },
  { href: '#press', label: 'Press' },
  { href: '#contact', label: 'Contact' },
];

export function MobileDrawer({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mobile-drawer fixed inset-0 z-40 bg-background flex flex-col justify-center px-gutter md:hidden"
        >
          <nav className="flex flex-col gap-4">
            {links.map((link, idx) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.06 * idx,
                }}
                className="font-display text-4xl sm:text-5xl uppercase text-foreground hover:text-accent transition-colors duration-300 py-1"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
