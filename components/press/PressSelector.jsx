'use client';

export function PressSelector({ reviews, activeIndex, onSelect }) {
  return (
    <div className="press__selector flex flex-col">
      {reviews.map((rev, idx) => {
        const isActive = activeIndex === idx;
        return (
          <button
            key={rev.publication}
            onClick={() => onSelect(idx)}
            className={`press__btn flex items-start gap-6 py-6 border-b border-line text-left relative w-full group transition-colors duration-300 ${
              isActive ? 'border-line-strong' : 'hover:border-line-strong'
            }`}
            aria-label={`Select press quote from ${rev.publication}`}
          >
            <span
              className={`press__btn-num font-sans text-xs font-semibold tracking-[0.14em] transition-colors duration-300 ${
                isActive ? 'text-foreground' : 'text-muted group-hover:text-foreground'
              }`}
            >
              {rev.index}
            </span>

            <div className="flex-1 pr-12">
              <p
                className={`press__btn-quote font-sans text-base leading-snug mb-2 transition-colors duration-300 line-clamp-2 ${
                  isActive ? 'text-foreground' : 'text-muted group-hover:text-foreground'
                }`}
              >
                {rev.quote}
              </p>
              <p
                className={`press__btn-meta font-sans text-xs font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                  isActive ? 'text-accent' : 'text-muted'
                }`}
              >
                {rev.publication} · {rev.type}
              </p>
            </div>

            {/* Indicator Line */}
            <div
              className={`press__btn-indicator absolute right-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent shadow-[0_0_8px_#ff2a85] transition-all duration-300 ${
                isActive ? 'w-12' : 'w-0'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
