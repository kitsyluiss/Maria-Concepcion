'use client';

import { useState } from 'react';

export function CopyEmailBtn() {
  const [copied, setCopied] = useState(false);
  const email = 'booking@mariaconcepcion.com';

  const handleCopy = (e) => {
    // Allows regular click to mailto, but right-click or long-press copies
    if (e.type === 'contextmenu') {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  const handleManualCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <div className="footer__email-wrap relative inline-block mb-20 group">
      <div
        className={`footer__copy-feedback absolute -top-8 left-0 bg-accent text-[#08080a] font-sans text-xs font-semibold px-3 py-1 rounded-full pointer-events-none transition-all duration-300 ${
          copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        Email copied to clipboard!
      </div>

      <div className="flex items-center gap-4">
        <a
          href={`mailto:${email}`}
          onContextMenu={handleCopy}
          className="footer__email inline-flex items-center gap-2 font-display text-4xl sm:text-6xl lg:text-7xl text-foreground hover:text-accent transition-all duration-300 hover:translate-x-3"
          title="Click to email or right-click to copy"
        >
          {email}
          <span className="footer__arrow text-accent font-sans text-3xl sm:text-5xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
            ↗
          </span>
        </a>

        <button
          onClick={handleManualCopy}
          className="hidden sm:inline-flex px-3 py-1.5 rounded-full border border-line text-xs font-sans text-muted hover:border-accent hover:text-foreground transition-colors duration-300"
          title="Copy email address"
          aria-label="Copy booking email address"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
