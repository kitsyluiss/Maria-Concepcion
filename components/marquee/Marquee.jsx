export function Marquee() {
  const words = [
    'Dark Pop',
    'Hypnotic Vocals',
    'Heavy Basslines',
    'Sold Out Nights',
    'Cinematic Soul',
    'Sonic Velocity',
  ];

  return (
    <section className="marquee overflow-hidden border-y border-line py-8 bg-surface select-none" aria-label="Sonic identity">
      <div className="marquee__track flex w-max">
        {/* Track 1 */}
        <div className="marquee__group flex items-center shrink-0">
          {words.map((word, i) => (
            <span key={`w1-${i}`} className="flex items-center">
              <span className="marquee__word font-display text-4xl sm:text-5xl uppercase whitespace-nowrap px-6 text-foreground">
                {word}
              </span>
              <span className="marquee__dot w-2.5 h-2.5 bg-accent rounded-full shrink-0 shadow-[0_0_8px_#ff2a85]" />
            </span>
          ))}
        </div>

        {/* Track 2 for seamless loop */}
        <div className="marquee__group flex items-center shrink-0" aria-hidden="true">
          {words.map((word, i) => (
            <span key={`w2-${i}`} className="flex items-center">
              <span className="marquee__word font-display text-4xl sm:text-5xl uppercase whitespace-nowrap px-6 text-foreground">
                {word}
              </span>
              <span className="marquee__dot w-2.5 h-2.5 bg-accent rounded-full shrink-0 shadow-[0_0_8px_#ff2a85]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
