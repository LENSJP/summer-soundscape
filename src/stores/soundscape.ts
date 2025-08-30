import { createStore } from 'solid-js/store';
import type { Player } from 'tone';
import type { SoundState, Volume } from '../types';
import { createVolume } from '../types';
import { SUMMER_SOUNDS } from '../config/sounds';

// Complete soundscape state for all 10 sounds
const [soundscape, setSoundscape] = createStore<{
  sounds: Record<string, SoundState>;
  masterVolume: Volume;
  isInitialized: boolean;
  isPlaying: boolean;
}>({
  sounds: Object.fromEntries(
    SUMMER_SOUNDS.map((config) => [
      config.id,
      {
        id: config.id,
        name: config.name,
        category: config.category,
        path: config.path,
        volume: createVolume(50),
        isLoaded: false,
        isPlaying: false,
        isLoading: false,
        isInitialized: false,
      },
    ])
  ),
  masterVolume: createVolume(70),
  isInitialized: false,
  isPlaying: false,
});

// Actions for the complete soundscape store
export const soundscapeActions = {
  setInitialized: (initialized: boolean) => {
    setSoundscape('isInitialized', initialized);
  },
  setMasterVolume: (volume: Volume) => {
    setSoundscape('masterVolume', volume);
  },
  setGlobalPlayback: (playing: boolean) => {
    setSoundscape('isPlaying', playing);
  },
  setSoundLoading: (soundId: string, loading: boolean) => {
    setSoundscape('sounds', soundId, 'isLoading', loading);
  },
  setSoundPlayer: (soundId: string, player: Player) => {
    setSoundscape('sounds', soundId, 'player', player);
  },
  setSoundLoaded: (soundId: string, loaded: boolean) => {
    setSoundscape('sounds', soundId, 'isLoaded', loaded);
  },
  setSoundVolume: (soundId: string, volume: Volume) => {
    setSoundscape('sounds', soundId, 'volume', volume);
  },
  setSoundPlayback: (soundId: string, playing: boolean) => {
    setSoundscape('sounds', soundId, 'isPlaying', playing);
  },
  setSoundInitialized: (soundId: string, initialized: boolean) => {
    setSoundscape('sounds', soundId, 'isInitialized', initialized);
  },
};

export { soundscape };
