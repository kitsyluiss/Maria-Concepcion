/**
 * Maria Concepcion EPK — Web Audio Synthesizer Engine
 * Generates ambient live sonic landscapes, track previews & 5-second snippets
 */
class SonicEngine {
  constructor() {
    this.ctx = null;
    this.activeTrack = null;
    this.nodes = [];
    this.ambientPlaying = false;
    this.ambientNodes = [];
    this.snippetTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stopAll() {
    if (this.snippetTimer) {
      clearTimeout(this.snippetTimer);
      this.snippetTimer = null;
    }
    this.nodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.nodes = [];
    this.activeTrack = null;
  }

  playSnippet(trackId, durationMs = 5000, onEnd) {
    if (this.snippetTimer) {
      clearTimeout(this.snippetTimer);
      this.snippetTimer = null;
    }
    const isPlaying = this.playTrack(trackId);
    if (!isPlaying) {
      if (onEnd) onEnd();
      return false;
    }
    this.snippetTimer = setTimeout(() => {
      this.stopAll();
      this.snippetTimer = null;
      if (onEnd) onEnd();
    }, durationMs);
    return true;
  }

  playTrack(trackId) {
    this.init();
    if (this.activeTrack === trackId) {
      this.stopAll();
      return false; // paused
    }

    this.stopAll();
    this.activeTrack = trackId;

    const t = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, t);
    masterGain.gain.exponentialRampToValueAtTime(0.2, t + 0.6);
    masterGain.connect(this.ctx.destination);
    this.nodes.push(masterGain);

    if (trackId === 'royals' || trackId === 'neon-requiem') {
      // Deep C-minor chord + vocal shimmer + pulsing live bass
      const freqs = [65.41, 130.81, 155.56, 196.00]; // C2, C3, Eb3, G3
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(f, t);
        osc.detune.setValueAtTime((idx - 1.5) * 8, t);
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, t);
        filter.frequency.exponentialRampToValueAtTime(800, t + 2);
        
        gain.gain.setValueAtTime(0.25 / freqs.length, t);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        this.nodes.push(osc, gain, filter);
      });

    } else if (trackId === 'acoustic-session' || trackId === 'midnight-transmission') {
      // Intimate warm acoustic piano/synth resonance + subtle flutter
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, t); // A2
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(3.5, t);
      filter.frequency.setValueAtTime(320, t);
      
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(3.5, t);
      lfoGain.gain.setValueAtTime(120, t);
      lfo.connect(filter.frequency);
      lfo.start(t);
      this.nodes.push(lfo, lfoGain);

      gain.gain.setValueAtTime(0.3, t);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      this.nodes.push(osc, gain, filter);

    } else if (trackId === 'viande' || trackId === 'afterglow') {
      // 124 BPM driving rock bass pulse + rich harmonics
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, t); // A1 bass
      
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(2.07, t); // ~124 BPM pulse
      lfoGain.gain.setValueAtTime(0.15, t);
      lfo.connect(gain.gain);
      lfo.start(t);
      this.nodes.push(lfo, lfoGain);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, t);

      gain.gain.setValueAtTime(0.32, t);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      this.nodes.push(osc, gain, filter);

    } else if (trackId === 'master-repertoire' || trackId === 'subterranean') {
      // Multi-genre medley drone + orchestral presence
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'triangle';
      sub.frequency.setValueAtTime(65.41, t); // C2

      const distFilter = this.ctx.createBiquadFilter();
      distFilter.type = 'lowpass';
      distFilter.frequency.setValueAtTime(280, t);

      subGain.gain.setValueAtTime(0.35, t);
      sub.connect(distFilter);
      distFilter.connect(subGain);
      subGain.connect(masterGain);
      sub.start(t);
      this.nodes.push(sub, distFilter, subGain);
    }

    return true; // playing
  }

  toggleAmbient(buttonEl) {
    this.init();
    if (this.ambientPlaying) {
      this.ambientNodes.forEach(node => {
        try {
          if (node.stop) node.stop();
          if (node.disconnect) node.disconnect();
        } catch (e) {}
      });
      this.ambientNodes = [];
      this.ambientPlaying = false;
      if (buttonEl) buttonEl.classList.remove('playing');
      return false;
    } else {
      const t = this.ctx.currentTime;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.12, t + 1.5);
      gain.connect(this.ctx.destination);
      this.ambientNodes.push(gain);

      // Ethereal dark ambient fifths: D2 (73.42Hz), A2 (110Hz), F#3 (185Hz)
      const freqs = [73.42, 110.00, 185.00];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        
        // Gentle vibrato
        const vibrato = this.ctx.createOscillator();
        const vibGain = this.ctx.createGain();
        vibrato.frequency.setValueAtTime(0.2 + idx * 0.1, t);
        vibGain.gain.setValueAtTime(1.5, t);
        vibrato.connect(osc.frequency);
        vibrato.start(t);
        this.ambientNodes.push(vibrato, vibGain);

        oscGain.gain.setValueAtTime(0.08, t);
        osc.connect(oscGain);
        oscGain.connect(gain);
        osc.start(t);
        this.ambientNodes.push(osc, oscGain);
      });

      this.ambientPlaying = true;
      if (buttonEl) buttonEl.classList.add('playing');
      return true;
    }
  }
}

export const sonic = new SonicEngine();
