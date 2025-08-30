# Tech Stack

## Frontend Framework
- **Framework**: Solid.js (Pure SPA)
- **Language**: TypeScript (strict mode, type safety priority)
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Styling & UI
- **CSS Framework**: Tailwind CSS v4.0.7
- **UI Components**: Custom Solid.js components
- **Responsive Design**: Desktop, tablet, smartphone compatible

## Audio Processing
- **Audio Library**: Tone.js v15.1.22 (Web Audio API wrapper)
- **Audio Format**: MP3 128kbps recommended
- **Capabilities**: Simultaneous playback of up to 10 audio sources

## State Management
- **State**: Solid.js Signals (createSignal, createStore)
- **Architecture**: Centralized audio state management

## Development Tools
- **Formatter**: Biome.js v2.2.2
- **Linter**: ESLint v9.34.0 (with TypeScript plugin)
- **TypeScript**: v5.7.2 (strict configuration)

## Deployment
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions (to be configured)

## Dependencies Overview
Key dependencies from package.json:
- solid-js: ^1.9.5
- tone: ^15.1.22
- tailwindcss: ^4.0.7
- typescript: ^5.7.2
- vite: ^6.0.0