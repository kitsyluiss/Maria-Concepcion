# Maria Concepcion — Official Electronic Press Kit (EPK)

An Awwwards-tier, editorial Electronic Press Kit and portfolio for dark electronic pop artist **Maria Concepcion**. Engineered with Next.js, Framer Motion, Tailwind CSS, fluid SVG liquid displacement shaders, interactive Web Audio track stems, and smooth scroll physics.

---

## 🌟 Visual & Architectural Features

- **Segmented Next.js Architecture**: Every section and process is broken down into modular, single-responsibility components under `components/` and `app/`.
- **Outline-Only Liquid Distortion**: Integrated SVG `<feMorphology>` edge-isolation filter (`LiquidShaderDef.jsx`) combined with `<feDisplacementMap>`. When hovered/cursored over `Maria Concepcion portrait.png`, **only the character's perimeter silhouette outline ripples** — keeping facial features and interior clothing 100% sharp while preventing any rectangular box artifacts.
- **Framer Motion Micro-Interactions**: Declarative spring physics, staggered typographic letter entrance reveals, AnimatePresence mobile drawer transitions, and word-by-word press quote reveals.
- **Real Stage & Editorial Photography**: Integrated photography from the `public/images/` archive (`singing.jpeg`, `portrait standing.jpeg`, and `portrait.jpeg`) across the critical press acclaim engine.
- **Interactive Web Audio Synthesizer**: In-browser audio engine hook (`useAudioEngine.js`) providing ambient soundscape toggles and dark synth-pop previews for each release (*Neon Requiem*, *Midnight Transmission*, *Afterglow*, *Subterranean*).
- **Smooth Momentum Scrolling**: Hardware-accelerated smooth scrolling with [Lenis](https://lenis.darkroom.engineering/) and a zero-dependency local fallback for offline previews.

---

## 📁 Segmented Codebase Structure

```
mariaaaa/
├── app/
│   ├── layout.jsx                 # Root layout with Google Fonts (Anton & Onest) and metadata
│   ├── page.jsx                   # Main client page composing all sections
│   └── globals.css                # Tailwind directives, CSS tokens, and rem scaling
│
├── components/
│   ├── hero/
│   │   ├── Hero.jsx               # Hero section, roles reveal, big name staggered typography
│   │   ├── HeroPortrait.jsx       # Hero portrait with edge-isolated outline displacement
│   │   └── LiquidShaderDef.jsx    # SVG filters (<feMorphology> edge band, <feDisplacementMap>)
│   ├── nav/
│   │   ├── Header.jsx             # Fixed header with monogram logo & desktop nav links
│   │   ├── SoundToggle.jsx        # Audio experience toggle with animated equalizer bars
│   │   └── MobileDrawer.jsx       # AnimatePresence slide-in mobile navigation drawer
│   ├── preloader/
│   │   └── Preloader.jsx          # 0-100% ease-out counter with Framer Motion slide-up wipe
│   ├── marquee/
│   │   └── Marquee.jsx            # Infinite hardware-accelerated sonic identity ticker
│   ├── bio/
│   │   ├── Bio.jsx                # Artistry narrative grid
│   │   └── PillarItem.jsx         # Individual pillar cards with staggered scroll reveal
│   ├── discography/
│   │   ├── Discography.jsx        # Discography header and asymmetric release grid
│   │   ├── ReleaseCard.jsx        # Release card with play button, liquid hover & badges
│   │   └── releasesData.js        # Discography release items & metadata
│   ├── stats/
│   │   ├── Stats.jsx              # By the numbers grid
│   │   └── StatItem.jsx           # Individual stat figure with hover transitions
│   ├── press/
│   │   ├── Press.jsx              # Press review container & photo switcher
│   │   ├── PressQuote.jsx         # Dynamic word-by-word staggered reveal quote
│   │   ├── PressSelector.jsx      # Interactive quote selector tabs with active lines
│   │   └── pressData.js           # Review quotes and real photography references
│   ├── footer/
│   │   ├── Footer.jsx             # Booking CTA, representation, socials & copyright
│   │   └── CopyEmailBtn.jsx       # Tactile email interaction with copy feedback tooltip
│   └── audio/
│       └── useAudioEngine.js      # Web Audio API hook for dark synth drones & stems
│
├── hooks/
│   └── useSmoothScroll.js         # Lenis smooth scroll hook for Next.js
│
├── public/
│   ├── favicon.svg                # Minimalist MC monogram icon
│   └── images/
│       ├── Maria Concepcion portrait.png  # Hero cutout portrait (RGBA)
│       ├── singing.jpeg                   # Live performance photo (Press 01)
│       ├── portrait standing.jpeg         # Editorial standing photo (Press 02)
│       ├── portrait.jpeg                  # Close-up portrait (Press 03)
│       └── releases/                      # Album cover artwork vector/raster assets
│           ├── release-01.svg             # Neon Requiem (2024 Studio Album)
│           ├── release-02.svg             # Midnight Transmission (2022 EP)
│           ├── release-03.svg             # Afterglow (2021 Lead Single)
│           └── release-04.svg             # Subterranean (2019 Debut Album)
│
├── package.json                   # Next.js, Framer Motion, Lenis, Tailwind dependencies
├── tailwind.config.js             # Custom tokens, fonts, and keyframes
├── postcss.config.js              # PostCSS configuration
├── next.config.mjs                # Next.js configuration
└── README.md                      # Project documentation
```

---

## 🚀 Running the Next.js Project

### 1. Install Dependencies
```bash
cd /Users/kitsydumbo/mariaaaa
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Start
```bash
npm run build
npm run start
```

---

## 🎨 Design System Tokens

| Token | Value | Purpose |
|---|---|---|
| `--background` | `#08080a` | Deepest OLED black canvas |
| `--foreground` | `#f3f1ea` | Warm editorial off-white text |
| `--surface` | `#111114` | Secondary obsidian card container |
| `--accent` | `#ff2a85` | Signature electric neon magenta |
| `--accent-2` | `#ff65a3` | Soft magenta highlight / glow |
| `--line` | `rgba(243,241,234,0.1)` | Subtle structural hairpins |
| `--font-display` | `Anton, sans-serif` | Brutalist uppercase headline scale |
| `--font-sans` | `Onest, sans-serif` | Precision geometric body typography |

---

## 📄 License & Attribution

All rights reserved © 2026 Maria Concepcion. Representation by WME & Pulse Music Group.
