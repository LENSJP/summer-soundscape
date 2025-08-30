import type { Volume, SoundPath, SoundId } from '../types';

export class MultiAudioManager {
  private players: Map<SoundId, any> = new Map(); // Use any to avoid importing Tone before user gesture
  private isInitialized = false;
  private masterGain: any = null;
  private Tone: any = null;

  constructor() {
    // Don't import or initialize anything Tone.js related
  }

  private async initializeTone() {
    if (this.Tone) return;
    // Dynamic import of Tone.js only after user gesture
    this.Tone = await import('tone');
  }

  private async initializeAudioContext() {
    try {
      // Only initialize if not already done
      if (this.isInitialized) return;
      
      await this.initializeTone();
      
      // Ensure audio context is running
      if (this.Tone.getContext().state !== 'running') {
        await this.Tone.start();
      }
      
      // Create master gain node after AudioContext starts
      this.masterGain = new this.Tone.Gain(0.7).toDestination();
      this.isInitialized = true;
      console.log('AudioContext initialized after user gesture');
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      this.isInitialized = false;
    }
  }

  async loadSound(soundId: SoundId, soundPath: SoundPath): Promise<any> {
    // Ensure AudioContext is initialized before loading
    if (!this.isInitialized) {
      await this.initializeAudioContext();
    }

    try {
      // Check if sound is already loaded
      if (this.players.has(soundId)) {
        console.warn(`Sound ${soundId} is already loaded`);
        return this.players.get(soundId)!;
      }

      // Create new player instance
      const player = new this.Tone.Player({
        url: soundPath,
        loop: true, // All summer sounds should loop
        autostart: false,
      }).connect(this.masterGain);

      // Store the player
      this.players.set(soundId, player);

      // Wait for the sound to load
      await this.Tone.loaded();

      console.log(`Sound loaded successfully: ${soundId} (${soundPath})`);
      return player;
    } catch (error) {
      console.error(`Failed to load sound: ${soundId} (${soundPath})`, error);
      throw error;
    }
  }

  async loadAllSounds(soundConfigs: Array<{ id: SoundId; path: SoundPath }>): Promise<void> {
    try {
      console.log('Loading all sounds...');

      // Load all sounds in parallel
      const loadPromises = soundConfigs.map(({ id, path }) => this.loadSound(id, path));

      await Promise.all(loadPromises);
      console.log('All sounds loaded successfully');
    } catch (error) {
      console.error('Failed to load some sounds:', error);
      throw error;
    }
  }

  setVolume(soundId: SoundId, volume: Volume): void {
    const player = this.players.get(soundId);
    if (!player) {
      console.warn(`No player found for sound: ${soundId}`);
      return;
    }

    try {
      // Convert volume percentage (0-100) to decibels
      // Volume 0 = -Infinity (silent)
      // Volume 100 = 0dB (full volume)
      // Use logarithmic scale for more natural volume control
      const volumeDb = volume === 0 ? -Infinity : 20 * Math.log10(volume / 100);
      player.volume.value = volumeDb;
    } catch (error) {
      console.error(`Failed to set volume for ${soundId}:`, error);
    }
  }

  setMasterVolume(volume: Volume): void {
    try {
      if (!this.masterGain) return;
      // Convert volume percentage to linear gain (0-1)
      const gain = volume / 100;
      this.masterGain.gain.value = gain;
    } catch (error) {
      console.error('Failed to set master volume:', error);
    }
  }

  async play(soundId: SoundId): Promise<void> {
    const player = this.players.get(soundId);
    if (!player) {
      console.warn(`No player found for sound: ${soundId}`);
      return;
    }

    try {
      // Ensure audio context is running before playback
      if (this.Tone.getContext().state !== 'running') {
        await this.Tone.start();
      }

      if (player.state !== 'started') {
        player.start();
        console.log(`Playback started: ${soundId}`);
      }
    } catch (error) {
      console.error(`Failed to start playback for ${soundId}:`, error);
      throw error;
    }
  }

  stop(soundId: SoundId): void {
    const player = this.players.get(soundId);
    if (!player) {
      console.warn(`No player found for sound: ${soundId}`);
      return;
    }

    try {
      if (player.state === 'started') {
        player.stop();
        console.log(`Playback stopped: ${soundId}`);
      }
    } catch (error) {
      console.error(`Failed to stop playback for ${soundId}:`, error);
    }
  }

  async playAll(): Promise<void> {
    try {
      // Ensure audio context is running
      if (this.Tone.getContext().state !== 'running') {
        await this.Tone.start();
      }

      // Start all players
      for (const [soundId, player] of this.players) {
        if (player.state !== 'started') {
          player.start();
        }
      }
      console.log('All sounds started');
    } catch (error) {
      console.error('Failed to start all sounds:', error);
      throw error;
    }
  }

  stopAll(): void {
    try {
      for (const [soundId, player] of this.players) {
        if (player.state === 'started') {
          player.stop();
        }
      }
      console.log('All sounds stopped');
    } catch (error) {
      console.error('Failed to stop all sounds:', error);
    }
  }

  isPlaying(soundId: SoundId): boolean {
    const player = this.players.get(soundId);
    return player ? player.state === 'started' : false;
  }

  isLoaded(soundId: SoundId): boolean {
    const player = this.players.get(soundId);
    return player ? player.loaded : false;
  }

  getAllLoadedSounds(): SoundId[] {
    const loaded: SoundId[] = [];
    for (const [soundId, player] of this.players) {
      if (player.loaded) {
        loaded.push(soundId);
      }
    }
    return loaded;
  }

  dispose(): void {
    // Dispose all players
    for (const [soundId, player] of this.players) {
      player.dispose();
    }
    this.players.clear();

    // Dispose master gain
    if (this.masterGain) {
      this.masterGain.dispose();
    }
  }

  // Static method to initialize audio context (useful for user gesture requirement)
  static async startAudioContext(): Promise<void> {
    try {
      const Tone = await import('tone');
      if (Tone.getContext().state !== 'running') {
        await Tone.start();
        console.log('Audio context started by user gesture');
      }
    } catch (error) {
      console.error('Failed to start audio context:', error);
      throw error;
    }
  }
}