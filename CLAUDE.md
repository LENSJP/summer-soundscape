# Summer Existence Proof - Summer Soundscape

## Project Overview

**Concept:** 
"Summer Existence Proof" (夏の存在証明) - An interactive web application that allows viewers to reconstruct their personal impressions of summer by selecting and adjusting environmental sounds themselves.

**Technical Goals:**
- Learn Solid.js framework
- Implement audio control using Tone.js
- Create prototype for future HCI research

## Confirmed Technology Stack

### Frontend
- **Framework:** Pure Solid.js SPA
- **Language:** TypeScript (strict mode, type safety priority)
- **Styling:** Tailwind CSS
- **State Management:** Solid.js Signals (createSignal, createStore)
- **Build Tool:** Vite
- **Package Manager:** pnpm

### Audio Processing
- **Audio Library:** Tone.js
- **Audio Format:** MP3 128kbps recommended
- **Simultaneous Playback:** Up to 10 audio sources

### Development Tools
- **Formatter:** Biome.js
- **Linter:** ESLint
- **Git Hooks:** Skip for now
- **CI/CD:** GitHub Actions (configure later)

### Deployment
- **Hosting:** GitHub Pages
- **Repository:** `summer-soundscape`

## UI/UX Specifications

### Interface
- **Volume Control:** Horizontal sliders (input type="range")
- **Visual Representation:** Simple (volume display only, no audio-reactive effects)
- **Target Devices:** PC, tablet, smartphone compatible

### User Experience
- **Duration:** A few minutes per session
- **Format:** Individual experience
- **Interaction:** Real-time volume adjustment

## Audio Configuration

### 10 Summer Sounds (Proposal)
```typescript
const SUMMER_SOUNDS = [
  // Nature Summer (4 sounds)
  { id: 'cicadas', name: 'Cicada Voices', category: 'nature' },
  { id: 'waves', name: 'Ocean Waves', category: 'nature' },
  { id: 'thunder', name: 'Distant Thunder', category: 'nature' },
  { id: 'rain', name: 'Summer Rain', category: 'nature' },
  
  // Human Summer (3 sounds)
  { id: 'festival', name: 'Festival Sounds', category: 'human' },
  { id: 'fireworks', name: 'Fireworks', category: 'human' },
  { id: 'windChimes', name: 'Wind Chimes', category: 'human' },
  
  // Life Summer (3 sounds)
  { id: 'airconditioner', name: 'Air Conditioner', category: 'life' },
  { id: 'pool', name: 'Pool Water Sounds', category: 'life' },
  { id: 'traffic', name: 'Summer City Traffic', category: 'life' },
] as const;
```

## Architecture Design

### Project Structure
```
summer-soundscape/
├── src/
│   ├── App.tsx                 # Main application
│   ├── components/
│   │   ├── SoundController.tsx # Overall audio control UI
│   │   ├── VolumeSlider.tsx   # Individual volume control component
│   │   └── PlayButton.tsx     # Play/stop control
│   ├── stores/
│   │   └── soundscape.ts      # Global state management
│   ├── audio/
│   │   └── AudioManager.ts    # Tone.js integration & audio management
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   ├── config/
│   │   └── sounds.ts         # Audio source configuration
│   └── assets/
│       └── sounds/           # Audio files (MP3)
├── public/
├── package.json
├── vite.config.ts            # Vite config (base setting for GitHub Pages)
├── tsconfig.json             # TypeScript strict configuration
├── biome.json                # Biome.js configuration
├── .eslintrc.js              # ESLint configuration
└── tailwind.config.js        # Tailwind configuration
```

### TypeScript Design (Modern Web Development Trends)

```typescript
// Strict type definitions
type Volume = number & { readonly __brand: unique symbol };
type SoundId = string & { readonly __brand: unique symbol };

// const assertions + satisfies pattern
const SOUND_CONFIGS = [...] as const satisfies readonly SoundConfig[];

// Branded Types usage
interface SoundState {
  readonly id: SoundId;
  readonly name: string;
  volume: Volume;
  isLoaded: boolean;
  player?: Tone.Player;
}

// Template Literal Types
type SoundPath = `/sounds/${string}.mp3`;
```

### State Management Design

```typescript
// Using Solid.js createStore
interface SoundscapeState {
  readonly sounds: Record<SoundId, SoundState>;
  readonly masterVolume: Volume;
  readonly isPlaying: boolean;
  readonly isInitialized: boolean;
}

const [soundscape, setSoundscape] = createStore<SoundscapeState>({
  sounds: { /* 10 audio sources */ },
  masterVolume: 50 as Volume,
  isPlaying: false,
  isInitialized: false
});
```

## Setup Instructions

### 1. Project Initialization
```bash
npm create solid@latest summer-soundscape
cd summer-soundscape
rm package-lock.json
pnpm install
```

### 2. Add Dependencies
```bash
pnpm add tone
pnpm add -D @biomejs/biome eslint @typescript-eslint/eslint-plugin
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D @types/node
```

### 3. Initialize Tailwind
```bash
npx tailwindcss init -p
```

## Configuration Files

### tsconfig.json (Strict Settings)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "jsxImportSource": "solid-js"
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  base: '/summer-soundscape/', // For GitHub Pages
  build: {
    target: 'esnext',
    outDir: 'dist'
  }
});
```

### biome.json
```json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5"
    }
  }
}
```

## Implementation Priority

### Phase 1: Foundation
1. ✅ Technology selection complete
2. 🔄 Project setup
3. 📁 Basic project structure creation
4. 🎵 Basic Tone.js integration (single audio source verification)

### Phase 2: Core Features
1. 🎛️ 10 audio source management system
2. 🎚️ Volume slider components
3. ▶️ Play/stop controls
4. 🔊 Real-time volume adjustment

### Phase 3: UI/UX Improvements
1. 🎨 Tailwind design implementation
2. 📱 Responsive design
3. ♿ Accessibility improvements

### Phase 4: Optimization & Deployment
1. ⚡ Performance optimization
2. 🚀 GitHub Pages configuration
3. 🔧 GitHub Actions setup

## Constraints & Notes

### Technical Constraints
- **Audio Files:** Will be provided separately (sourced externally)
- **Browser Support:** Modern browsers (Web Audio API required)
- **Performance:** Support simultaneous playback of 10 audio sources

### Development Guidelines
- **Type Safety Priority:** Strict TypeScript configuration
- **Performance Focus:** Lightweight, fast implementation
- **Simplicity Focus:** Avoid excessive features
- **Artwork Focus:** Prioritize user experience over technical experiments

## Future Expansion Plans

### HCI Research Elements (Later phase additions)
- User behavior analysis
- A/B testing foundation
- Interaction logging

### Feature Expansion Candidates
- Preset functionality
- Audio effects
- Visualizers

## Reference Links

- [Solid.js Documentation](https://www.solidjs.com/)
- [Tone.js Documentation](https://tonejs.github.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

---

**Development Start Date:** August 30, 2025  
**Developer:** HCI Research + Artwork Creation  
**Target Completion:** Aim for Phase 2 completion as immediate goal
