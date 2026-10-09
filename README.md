# Maria Concepcion — Official Electronic Press Kit (EPK)

An Awwwards-tier, editorial Electronic Press Kit and portfolio for dark electronic pop artist **Maria Concepcion**. Engineered with cinematic spatial rhythm, fluid SVG liquid displacement shaders, responsive typography, interactive Web Audio track stems, and smooth scroll physics.

---

## 🌟 Visual & Technical Highlights

- **Hero Portrait Cutout**: Custom-applied high-resolution RGBA portrait (`Maria Concepcion portrait.png`) layered over dynamic typographic reveals and liquid displacement shaders.
- **Real Stage & Editorial Photography**: Integrated photography from the `images/` archive (`singing.jpeg`, `portrait standing.jpeg`, and `portrait.jpeg`) across the critical press acclaim engine.
- **Liquid Shader Micro-Interactions**: Custom SVG `<feTurbulence>` and `<feDisplacementMap>` interactive shaders animating fluid ripples across album covers, press photos, and the hero portrait on mouse hover.
- **Interactive Web Audio Synthesizer**: In-browser audio engine with ambient soundscape toggles and dark synth-pop previews for each release (*Neon Requiem*, *Midnight Transmission*, *Afterglow*, *Subterranean*).
- **Smooth Momentum Scrolling**: Hardware-accelerated smooth scrolling with [Lenis](https://lenis.darkroom.engineering/) and a zero-dependency local fallback for offline previews.
- **Adaptive REM Grid**: Fluid responsive viewport calculations calibrated from mobile to 4K ultra-wide monitors.
- **Editorial Typography Scale**: Bespoke pairing of `Anton` for brutalist headline impact and `Onest` for clean editorial readability.

---

## 📁 Project Structure

```
mariaaaa/
├── index.html                     # Main semantic EPK entrypoint
├── package.json                   # Project metadata and Vite scripts
├── vite.config.js                 # Vite development & build configuration
├── .gitignore                     # Git ignore rules
├── README.md                      # Project documentation
├── css/
│   └── style.css                  # Tokenized design system & animations
├── js/
│   ├── main.js                    # Core logic, preloader, observers, shaders
│   ├── audio-engine.js            # Web Audio API dark synth-pop stem generator
│   └── lenis-local.js             # Resilient offline smooth scroll fallback
├── public/
│   ├── favicon.svg                # Minimalist MC monogram icon
│   ├── images/
│   │   ├── Maria Concepcion portrait.png  # Hero cutout portrait (RGBA)
│   │   ├── singing.jpeg                   # Live performance photo (Press 01)
│   │   ├── portrait standing.jpeg         # Editorial standing photo (Press 02)
│   │   ├── portrait.jpeg                  # Close-up portrait (Press 03)
│   │   └── releases/                      # Album cover artwork vector/raster assets
│   │       ├── release-01.svg             # Neon Requiem (2024 Studio Album)
│   │       ├── release-02.svg             # Midnight Transmission (2022 EP)
│   │       ├── release-03.svg             # Afterglow (2021 Lead Single)
│   │       └── release-04.svg             # Subterranean (2019 Debut Album)
│   └── assets/                            # Symlinked/aliased assets for cross-compatibility
└── images -> public/images                # Root alias for direct file access
```

---

## 🚀 Getting Started

### Option 1: Live Development Server (Vite)

Run the local development server with hot module replacement:

```bash
# Start development server on port 3000
npm run dev
# or
npx vite
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Production Build

Generate an optimized static production bundle in `dist/`:

```bash
npm run build
npm run preview
```

### Option 3: Zero-Setup Static Preview

The codebase is fully self-contained with offline fallbacks. You can directly preview it using any local static file server:

```bash
# Python 3
python3 -m http.server 8080

# or simply open index.html in your browser:
open index.html
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
