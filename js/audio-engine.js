/**
 * Maria Concepcion EPK — Web Audio Synthesizer Engine
 * Generates ambient dark pop sonic landscapes and track previews
 */
class SonicEngine {
  constructor() {
    this.ctx = null;
    this.activeTrack = null;
    this.nodes = [];
    this.ambientPlaying = false;
    this.ambientNodes = [];
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
    this.nodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.nodes = [];
    this.activeTrack = null;
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

    if (trackId === 'neon-requiem') {
      // Deep C-minor dark pop chord + sub drone + pulsing arpeggio
      const freqs = [65.41, 130.81, 155.56, 196.00]; // C2, C3, Eb3, G3
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(f, t);
        
        // Detune for lush thickness
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

    } else if (trackId === 'midnight-transmission') {
      // 108.4 MHz cybernetic pulse + filtered white noise sweep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, t); // A2
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(4, t);
      filter.frequency.setValueAtTime(300, t);
      
      // LFO modulation for transmission flutter
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(4, t);
      lfoGain.gain.setValueAtTime(180, t);
      lfo.connect(filter.frequency);
      lfo.start(t);
      this.nodes.push(lfo, lfoGain);

      gain.gain.setValueAtTime(0.3, t);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      this.nodes.push(osc, gain, filter);

    } else if (trackId === 'afterglow') {
      // 128 BPM driving bass pulse + harmonic lead
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, t); // A1 bass
      
      // Sidechain pump simulation
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(2.13, t); // ~128 BPM quarter notes
      lfoGain.gain.setValueAtTime(0.15, t);
      lfo.connect(gain.gain);
      lfo.start(t);
      this.nodes.push(lfo, lfoGain);

      gain.gain.setValueAtTime(0.35, t);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      this.nodes.push(osc, gain);

    } else if (trackId === 'subterranean') {
      // 40Hz heavy industrial sub drone + cavernous resonance
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'triangle';
      sub.frequency.setValueAtTime(43.65, t); // F1 sub
      
      const distFilter = this.ctx.createBiquadFilter();
      distFilter.type = 'lowpass';
      distFilter.frequency.setValueAtTime(220, t);

      subGain.gain.setValueAtTime(0.4, t);
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
