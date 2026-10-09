'use client';

export function SoundToggle({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`nav__sound-btn inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line font-sans text-[11px] uppercase tracking-[0.15em] backdrop-blur-md transition-all duration-300 ${
        isPlaying
          ? 'border-accent text-accent shadow-[0_0_12px_rgba(255,42,133,0.25)] bg-[#111114]/90'
          : 'text-muted hover:border-accent hover:text-foreground bg-[#111114]/60'
      }`}
      title="Toggle dark synth soundscape"
      aria-label={isPlaying ? 'Mute dark synth ambient audio' : 'Play dark synth ambient audio'}
    >
      <span className="sound-bars inline-flex items-end gap-[2px] h-3">
        <span
          className="w-[2px] bg-current rounded-sm transition-all duration-200"
          style={{
            height: isPlaying ? undefined : '3px',
            animation: isPlaying ? 'soundBar 800ms infinite ease-in-out' : 'none',
          }}
        />
        <span
          className="w-[2px] bg-current rounded-sm transition-all duration-200"
          style={{
            height: isPlaying ? undefined : '3px',
            animation: isPlaying ? 'soundBar 800ms infinite ease-in-out 200ms' : 'none',
          }}
        />
        <span
          className="w-[2px] bg-current rounded-sm transition-all duration-200"
          style={{
            height: isPlaying ? undefined : '3px',
            animation: isPlaying ? 'soundBar 800ms infinite ease-in-out 400ms' : 'none',
          }}
        />
      </span>
      <span>{isPlaying ? 'Sound: On' : 'Sound'}</span>
    </button>
  );
}
