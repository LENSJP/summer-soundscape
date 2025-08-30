# Summer Existence Proof 🌻

_Interactive Summer Soundscape Experience_

## Overview

"Summer Existence Proof" (夏の存在証明) is an interactive web artwork that allows users to reconstruct their personal impressions of summer by adjusting environmental sounds. Experience and create your unique summer atmosphere through intuitive audio mixing.

## 🎵 Features

- **10 Curated Summer Sounds** - From cicadas to festivals, waves to air conditioners
- **Real-time Audio Mixing** - Adjust each sound's volume independently
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Lightweight & Fast** - Optimized for smooth audio performance

## 🚀 Live Demo

Visit the experience: [summer-soundscape.github.io](https://your-username.github.io/summer-soundscape/)

## 🛠 Tech Stack

- **Frontend**: Solid.js + TypeScript
- **Audio**: Tone.js (Web Audio API)
- **Styling**: Tailwind CSS
- **Build**: Vite
- **Deploy**: GitHub Pages

## 🔧 Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/summer-soundscape.git
cd summer-soundscape

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm format       # Format code with Biome
pnpm lint         # Lint code with ESLint
```

## 🎨 Sound Categories

### Nature Summer

- 🦗 **Cicadas** - The quintessential summer chorus
- 🌊 **Ocean Waves** - Rhythmic coastal ambiance
- ⛈️ **Thunder** - Distant summer storms
- 🌧️ **Rain** - Refreshing summer showers

### Cultural Summer

- 🏮 **Festival** - Traditional summer matsuri sounds
- 🎆 **Fireworks** - Celebration in the night sky
- 🎐 **Wind Chimes** - Gentle metallic melodies

### Modern Summer

- ❄️ **Air Conditioner** - Urban summer comfort
- 🏊 **Pool** - Splashing water sounds
- 🚗 **City Traffic** - The rhythm of summer streets

## 🏗 Project Structure

```
src/
├── App.tsx                 # Main application
├── components/
│   ├── SoundController.tsx # Audio mixing interface
│   ├── VolumeSlider.tsx   # Individual sound controls
│   └── PlayButton.tsx     # Global play/pause
├── stores/
│   └── soundscape.ts      # Audio state management
├── audio/
│   └── AudioManager.ts    # Tone.js integration
├── types/
│   └── index.ts          # TypeScript definitions
├── config/
│   └── sounds.ts         # Audio configuration
└── assets/
    └── sounds/           # Audio files
```

## 🎯 Usage

1. **Load the Experience** - Audio files are loaded automatically
2. **Press Play** - Start the ambient summer soundscape
3. **Mix Your Summer** - Adjust individual sound volumes using sliders
4. **Create Atmosphere** - Find your perfect summer mood combination

## 🔊 Audio Technical Details

- **Format**: MP3 128kbps for optimal quality/size balance
- **Simultaneous Playback**: Up to 10 audio sources
- **Looping**: All sounds seamlessly loop for continuous experience
- **Web Audio API**: High-performance audio processing

## 🎨 Design Philosophy

This project explores the relationship between sound and memory, allowing users to:

- **Reconstruct** personal summer experiences
- **Discover** new atmospheric combinations
- **Reflect** on cultural and personal associations with seasonal sounds

## 🤝 Contributing

This is an artistic research project. If you're interested in contributing or have ideas for sound additions, please open an issue or reach out.

## 📄 License

MIT License - Feel free to use this project as inspiration for your own audio experiments.

## 🙏 Credits

- **Audio Sources**: [List will be updated with actual sources]
- **Inspiration**: The universal human experience of summer nostalgia
- **Technical**: Built with modern web technologies for accessibility and performance

## 📞 Contact

Created for HCI research and artistic exploration.

---

_Experience your summer. Prove its existence through sound._
