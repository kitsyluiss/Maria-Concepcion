'use client';

import { useState } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { useAudioEngine } from '../components/audio/useAudioEngine';
import { Preloader } from '../components/preloader/Preloader';
import { LiquidShaderDef } from '../components/hero/LiquidShaderDef';
import { Header } from '../components/nav/Header';
import { MobileDrawer } from '../components/nav/MobileDrawer';
import { Hero } from '../components/hero/Hero';
import { Marquee } from '../components/marquee/Marquee';
import { Bio } from '../components/bio/Bio';
import { Videos } from '../components/videos/Videos';
import { Stats } from '../components/stats/Stats';
import { Press } from '../components/press/Press';
import { Footer } from '../components/footer/Footer';

export default function HomePage() {
  // Initialize Lenis smooth scroll
  useSmoothScroll();

  // Web Audio synthesizer engine for ambient soundscapes & track stems
  const { isPlayingAmbient, activeTrack, toggleAmbient, playTrack, playSnippet } = useAudioEngine();

  // Mobile navigation drawer state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Interactive 0-100% Preloader with Framer Motion Wipe */}
      <Preloader />

      {/* SVG Liquid Displacement Filters & Edge-Morphology Shaders */}
      <LiquidShaderDef />

      {/* Navigation Header */}
      <Header
        isPlayingAmbient={isPlayingAmbient}
        onToggleAmbient={toggleAmbient}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <main className="relative w-full overflow-x-hidden">
        {/* Hero Section with Applied Portrait Cutout & Outline Shaders */}
        <Hero />

        {/* Marquee Ticker */}
        <Marquee />

        {/* Bio / Artistry Story */}
        <Bio />

        {/* Live Performance Archives & Master Repertoire (Staggered Layout) */}
        <Videos
          activeTrack={activeTrack}
          onToggleSnippet={playSnippet}
        />

        {/* Catalog & Tour Statistics */}
        <Stats />

        {/* Critical Acclaim & Dynamic Real Photography Archive */}
        <Press />

        {/* Booking & Representation Footer */}
        <Footer />
      </main>
    </>
  );
}
