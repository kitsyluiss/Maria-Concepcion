'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export function useAudioEngine() {
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const audioCtxRef = useRef(null);
  const activeNodesRef = useRef([]);
  const ambientNodesRef = useRef([]);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const stopActiveTrack = useCallback(() => {
    activeNodesRef.current.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    activeNodesRef.current = [];
    setActiveTrack(null);
  }, []);

  const playTrack = useCallback((trackId) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (activeTrack === trackId) {
      stopActiveTrack();
      return;
    }

    stopActiveTrack();
    setActiveTrack(trackId);

    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, t);
    masterGain.gain.exponentialRampToValueAtTime(0.22, t + 0.5);
    masterGain.connect(ctx.destination);
    activeNodesRef.current.push(masterGain);

    if (trackId === 'neon-requiem') {
      const freqs = [65.41, 130.81, 155.56, 196.00]; // C minor dark synth chord
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(f, t);
        osc.detune.setValueAtTime((idx - 1.5) * 8, t);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, t);
        filter.frequency.exponentialRampToValueAtTime(900, t + 2);

        gain.gain.setValueAtTime(0.2 / freqs.length, t);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        osc.start(t);
        activeNodesRef.current.push(osc, gain, filter);
      });
    } else if (trackId === 'midnight-transmission') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, t);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(4, t);
      filter.frequency.setValueAtTime(320, t);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(4.5, t);
      lfoGain.gain.setValueAtTime(180, t);
      lfo.connect(filter.frequency);
      lfo.start(t);

      gain.gain.setValueAtTime(0.28, t);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      activeNodesRef.current.push(osc, gain, filter, lfo, lfoGain);
    } else if (trackId === 'afterglow') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, t); // A1 bass

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(2.13, t); // ~128 BPM pulse
      lfoGain.gain.setValueAtTime(0.18, t);
      lfo.connect(gain.gain);
      lfo.start(t);

      gain.gain.setValueAtTime(0.35, t);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(t);
      activeNodesRef.current.push(osc, gain, lfo, lfoGain);
    } else if (trackId === 'subterranean') {
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'triangle';
      sub.frequency.setValueAtTime(43.65, t); // F1 sub drone

      const distFilter = ctx.createBiquadFilter();
      distFilter.type = 'lowpass';
      distFilter.frequency.setValueAtTime(200, t);

      subGain.gain.setValueAtTime(0.38, t);
      sub.connect(distFilter);
      distFilter.connect(subGain);
      subGain.connect(masterGain);
      sub.start(t);
      activeNodesRef.current.push(sub, distFilter, subGain);
    }
  }, [activeTrack, getAudioContext, stopActiveTrack]);

  const toggleAmbient = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (isPlayingAmbient) {
      ambientNodesRef.current.forEach(node => {
        try {
          if (node.stop) node.stop();
          if (node.disconnect) node.disconnect();
        } catch (e) {}
      });
      ambientNodesRef.current = [];
      setIsPlayingAmbient(false);
    } else {
      const t = ctx.currentTime;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.12, t + 1.5);
      gain.connect(ctx.destination);
      ambientNodesRef.current.push(gain);

      const freqs = [73.42, 110.00, 185.00];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        const vibrato = ctx.createOscillator();
        const vibGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(0.2 + idx * 0.1, t);
        vibGain.gain.setValueAtTime(1.5, t);
        vibrato.connect(osc.frequency);
        vibrato.start(t);
        ambientNodesRef.current.push(vibrato, vibGain);

        oscGain.gain.setValueAtTime(0.08, t);
        osc.connect(oscGain);
        oscGain.connect(gain);
        osc.start(t);
        ambientNodesRef.current.push(osc, oscGain);
      });

      setIsPlayingAmbient(true);
    }
  }, [isPlayingAmbient, getAudioContext]);

  useEffect(() => {
    return () => {
      stopActiveTrack();
      ambientNodesRef.current.forEach(node => {
        try {
          if (node.stop) node.stop();
          if (node.disconnect) node.disconnect();
        } catch (e) {}
      });
    };
  }, [stopActiveTrack]);

  return {
    isPlayingAmbient,
    activeTrack,
    toggleAmbient,
    playTrack,
    stopActiveTrack
  };
}
