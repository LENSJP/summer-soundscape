/// <reference types="vite/client" />

// Branded types for type safety
export type Volume = number & { readonly __brand: unique symbol };
export type SoundId = string & { readonly __brand: unique symbol };

// Template literal types for paths
export type SoundPath = `/sounds/${string}.mp3`;

// Sound categories
export type SoundCategory = 'nature' | 'human' | 'life';

// Sound configuration interface
export interface SoundConfig {
  readonly id: SoundId;
  readonly name: string;
  readonly category: SoundCategory;
  readonly path: SoundPath;
}

// Individual sound state
export interface SoundState {
  readonly id: SoundId;
  readonly name: string;
  readonly category: SoundCategory;
  readonly path: SoundPath;
  volume: Volume;
  isLoaded: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  player?: import('tone').Player;
}

// Main soundscape state
export interface SoundscapeState {
  readonly sounds: Record<SoundId, SoundState>;
  readonly masterVolume: Volume;
  readonly isPlaying: boolean;
  readonly isInitialized: boolean;
  readonly isLoading: boolean;
}

// Utility functions for branded types
export const createVolume = (value: number): Volume => {
  if (value < 0 || value > 100) {
    throw new Error('Volume must be between 0 and 100');
  }
  return value as Volume;
};

export const createSoundId = (id: string): SoundId => {
  if (!id.trim()) {
    throw new Error('SoundId cannot be empty');
  }
  return id as SoundId;
};

export const createSoundPath = (filename: string): SoundPath => {
  return `/sounds/${filename}.mp3` as SoundPath;
};

// Component props types
export interface VolumeSliderProps {
  name: string;
  volume: Volume;
  onVolumeChange: (volume: Volume) => void;
  isPlaying: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export interface SoundControllerProps {
  sounds: Record<SoundId, SoundState>;
  masterVolume: Volume;
  isPlaying: boolean;
  onVolumeChange: (soundId: SoundId, volume: Volume) => void;
  onMasterVolumeChange: (volume: Volume) => void;
  onTogglePlay: () => void;
}
