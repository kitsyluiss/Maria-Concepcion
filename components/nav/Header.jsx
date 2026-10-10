'use client';

import { SoundToggle } from './SoundToggle';

const navItems = [
  { href: '#bio', label: 'Bio' },
  { href: '#videos', label: 'Videos' },
  { href: '#stats', label: 'Stats' },
  { href: '#press', label: 'Acclaim' },
  { href: '#contact', label: 'Contact' },
];

export function Header({ isPlayingAmbient, onToggleAmbient, isMenuOpen, onToggleMenu }) {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 pointer-events-none bg-gradient-to-b from-[#08080a]/90 to-transparent">
      <nav className="site-nav pointer-events-auto flex items-center justify-between px-gutter py-6" aria-label="Main navigation">
        {/* Monogram Brand */}
        <a href="#top" className="nav__logo flex items-center gap-3 group" aria-label="Return to top">
          <div className="nav__monogram w-10 h-10 rounded-full border border-line-strong flex items-center justify-center font-sans font-semibold text-xs bg-white/[0.03] backdrop-blur-md group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
            MC
          </div>
          <span className="nav__brand font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted group-hover:text-foreground transition-colors duration-300 hidden sm:inline-block">
            Maria Concepcion — EPK
          </span>
        </a>

        {/* Right Nav Group: Links, Sound Toggle & Mobile Burger */}
        <div className="flex items-center gap-8">
          <ul className="nav__links hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav__link relative font-sans text-xs font-medium uppercase tracking-[0.22em] text-muted hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <SoundToggle isPlaying={isPlayingAmbient} onToggle={onToggleAmbient} />

          {/* Mobile Hamburger Button */}
          <button
            onClick={onToggleMenu}
            className={`nav__burger md:hidden p-1 flex flex-col gap-[5px] ${isMenuOpen ? 'open' : ''}`}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`block w-[22px] h-[2px] bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-foreground transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-x-[5px] -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </nav>
    </header>
  );
}
