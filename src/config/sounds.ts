import type { SoundConfig } from '../types';
import { createSoundId, createSoundPath } from '../types';

// Summer sound configurations - 12 sounds
export const SUMMER_SOUNDS = [
  // Nature (4 sounds)
  {
    id: createSoundId('cicadas'),
    name: '蝉',
    category: 'nature',
    path: createSoundPath('cicadas'),
  },
  {
    id: createSoundId('waves'),
    name: '波',
    category: 'nature',
    path: createSoundPath('wave'),
  },
  {
    id: createSoundId('thunder'),
    name: '雷雨',
    category: 'nature',
    path: createSoundPath('thunder'),
  },

  // Cultural (3 sounds)
  {
    id: createSoundId('festival'),
    name: '祭',
    category: 'human',
    path: createSoundPath('festival'),
  },
  {
    id: createSoundId('windChimes'),
    name: '風鈴',
    category: 'human',
    path: createSoundPath('wind_chime'),
  },

  // Modern (5 sounds)
  {
    id: createSoundId('pool'),
    name: 'プール',
    category: 'life',
    path: createSoundPath('pool'),
  },
  {
    id: createSoundId('airplane'),
    name: '飛行機',
    category: 'life',
    path: createSoundPath('airplane'),
  },
  {
    id: createSoundId('shaved_ice'),
    name: 'かき氷',
    category: 'life',
    path: createSoundPath('shaved_ice'),
  },
] as const satisfies readonly SoundConfig[];

// Export sound IDs for type safety
export const SOUND_IDS = SUMMER_SOUNDS.map((sound) => sound.id);

// Helper function to get sound config by ID
export const getSoundById = (id: string) => {
  return SUMMER_SOUNDS.find((sound) => sound.id === id);
};

// Group sounds by category
export const getSoundsByCategory = (category: SoundConfig['category']) => {
  return SUMMER_SOUNDS.filter((sound) => sound.category === category);
};

// Get all sound categories
export const SOUND_CATEGORIES = ['nature', 'human', 'life'] as const;
