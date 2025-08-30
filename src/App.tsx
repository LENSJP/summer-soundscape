import { Component, createSignal, onMount, For } from 'solid-js';
import { soundscape, soundscapeActions } from './stores/soundscape';
import { MultiAudioManager } from './audio/MultiAudioManager';
import { SUMMER_SOUNDS } from './config/sounds';
import type { Volume, SoundId } from './types';
import { createVolume, createSoundId } from './types';
import { ChevronRight } from 'lucide-solid';
// Simple SVG icons to avoid import issues
const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const VolumeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" fill="none" />
  </svg>
);

const App: Component = () => {
  const audioManager = new MultiAudioManager();
  const [error, setError] = createSignal<string | null>(null);
  const [showHowToUse, setShowHowToUse] = createSignal(false);
  const [showRestart, setShowRestart] = createSignal(false);

  onMount(async () => {
    try {
      console.log('Preparing Summer Soundscape...');
      console.log('Available sounds:', SUMMER_SOUNDS);

      // Just verify that sound files exist without loading them
      // This avoids AudioContext issues on page load
      console.log('Sound files ready for loading on user interaction');

      // Mark all sounds as ready (not loaded, but ready to load)
      SUMMER_SOUNDS.forEach((config) => {
        soundscapeActions.setSoundInitialized(config.id, true);
        soundscapeActions.setSoundLoading(config.id, false);
      });

      soundscapeActions.setInitialized(true);
      console.log('Summer Soundscape ready - sounds will load on first interaction');
    } catch (err) {
      console.error('Failed to initialize soundscape:', err);
      setError(`Failed to prepare audio: ${err}`);
    }
  });

  const handleVolumeChange = (soundId: string, volume: Volume) => {
    soundscapeActions.setSoundVolume(soundId, volume);
    audioManager.setVolume(createSoundId(soundId), volume);
  };


  const handleSoundToggle = async (soundId: string) => {
    try {
      await MultiAudioManager.startAudioContext();

      const sound = soundscape.sounds[soundId];
      if (!sound) return;

      // If sound is not loaded yet, load it first
      if (!sound.isLoaded) {
        console.log(`Loading sound ${soundId} for first time...`);
        soundscapeActions.setSoundLoading(soundId, true);
        
        const config = SUMMER_SOUNDS.find(s => s.id === soundId);
        if (!config) {
          throw new Error(`Sound configuration not found for ${soundId}`);
        }

        await audioManager.loadSound(createSoundId(soundId), config.path);
        soundscapeActions.setSoundLoaded(soundId, true);
        soundscapeActions.setSoundLoading(soundId, false);
        console.log(`Sound ${soundId} loaded successfully`);
      }

      if (sound.isPlaying) {
        audioManager.stop(createSoundId(soundId));
        soundscapeActions.setSoundPlayback(soundId, false);
      } else {
        await audioManager.play(createSoundId(soundId));
        soundscapeActions.setSoundPlayback(soundId, true);
      }
    } catch (err) {
      console.error(`Failed to toggle sound ${soundId}:`, err);
      setError(`Failed to control ${soundId}. Please try again.`);
      soundscapeActions.setSoundLoading(soundId, false);
    }
  };


  return (
    <div class="min-h-screen flex flex-col relative">
      {/* Fixed background */}
      <div 
        class="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style="background-image: url('./background.webp')"
      ></div>
      
      {/* Logo at top left */}
      <div class="logo-position">
        <img src="./logo.svg" alt="夏の存在証明" class="h-8" />
      </div>

      {/* Top right buttons */}
      <div class="top-right-buttons">
        <button 
          onClick={() => setShowHowToUse(true)}
          class="text-sm text-white hover:text-gray-200 px-3 py-1"
          style="font-family: serif; background: none; border: none; color: white;"
        >
          使い方
        </button>
        <button 
          onClick={() => setShowRestart(true)}
          class="text-sm text-white hover:text-gray-200 px-3 py-1"
          style="font-family: serif; background: none; border: none; color: white;"
        >
          はじめから
        </button>
      </div>

      {/* Error display */}
      {error() && (
        <div class="mb-6 p-4 rounded-lg max-w-3xl mx-auto w-full">
          <p class="text-red-700 text-sm bg-white/90 p-2 rounded">{error()}</p>
        </div>
      )}

      {/* Spacer to push content to bottom */}
      <div class="flex-grow"></div>

      {/* Sound Controls at bottom - 4x2 grid */}
      <div class="sound-controls">
        <div class="sound-grid">
          <For each={SUMMER_SOUNDS}>
            {(config) => {
              const sound = () => soundscape.sounds[config.id];
              return (
                <div class="p-4">
                  {/* Top row: Sound name immediately followed by play button */}
                  <div class="sound-header">
                    <span class="text-sm font-medium text-gray-800">{config.name}</span>
                    <button
                      onClick={() => handleSoundToggle(config.id)}
                      disabled={!sound()?.isInitialized}
                      class={`w-8 h-8 rounded-none flex items-center justify-center transition-colors border-none ${
                        sound()?.isPlaying
                          ? 'text-green-600'
                          : 'text-gray-600 hover:text-gray-800'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      style="background: none; -webkit-appearance: none; color: inherit;"
                    >
                      {sound()?.isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                  </div>
                  
                  {/* Bottom row: Volume icon and slider aligned vertically */}
                  <div class="flex items-center space-x-3">
                    <div class="text-gray-600 flex-shrink-0 flex items-center">
                      <VolumeIcon />
                    </div>
                    <div class="flex-1 relative flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sound()?.volume || 0}
                        onInput={(e) =>
                          handleVolumeChange(
                            config.id,
                            createVolume(Number(e.currentTarget.value))
                          )
                        }
                        disabled={!sound()?.isInitialized}
                        class="custom-slider w-full h-2 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>

      {!soundscape.isInitialized && (
        <div class="text-center text-gray-500 mt-4">
          <p>Loading audio files...</p>
          <div class="text-xs mt-2">
            <p>If loading takes too long, please check the browser console for details</p>
          </div>
        </div>
      )}

      {/* Debug info */}
      {/* <div style="position: fixed; top: 50px; left: 50px; background: red; color: white; padding: 5px; z-index: 999;"> */}
      {/*   Modal State: {showHowToUse() ? 'OPEN' : 'CLOSED'} */}
      {/* </div> */}

      {/* How to Use Modal */}
      {showHowToUse() && (
        <div 
          class="fixed inset-0 z-50 flex items-center justify-center"
          style="background: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;"
        >
          <div 
            class="bg-white p-6 relative"
            style="background: white; padding: 24px; border-radius: 8px; width: 800px; height: 500px; overflow-y: auto; margin: 16px; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;"
          >
            <button 
              onClick={() => setShowHowToUse(false)}
              class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              style="position: absolute; top: 8px; right: 8px; background: none; border: none; font-size: 20px; cursor: pointer;"
            >
              ×
            </button>
            <h2 class="text-lg font-bold mb-4" style="font-size: 18px; font-weight: bold; margin-bottom: 24px; text-align: center;">使い方</h2>
            <div class="text-sm text-gray-700 space-y-2" style="font-size: 14px; color: #374151; text-align: center; margin-bottom: 32px;">
              <ol style="list-style: none; padding: 0;">
                <li>8つの夏の音を聴きながら、音の中に存在する夏を思い浮かべる</li>
                <li>カルーセルを調整して音を組み合わせ、自分の記憶に残る夏の音を作る</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Restart Modal */}
      {showRestart() && (
        <div 
          class="fixed inset-0 z-50 flex items-center justify-center"
          style="background: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;"
        >
          <div 
            class="bg-white p-6 relative"
            style="background: white; padding: 24px; border-radius: 8px; width: 800px; height: 500px; overflow-y: auto; margin: 16px; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;"
          >
            <button 
              onClick={() => setShowRestart(false)}
              class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              style="position: absolute; top: 8px; right: 8px; background: none; border: none; font-size: 20px; cursor: pointer;"
            >
              ×
            </button>
            <h2 class="text-lg font-bold mb-4" style="font-size: 18px; font-weight: bold; margin-bottom: 24px; text-align: center;">はじめから</h2>
            <div class="text-sm text-gray-700 space-y-2" style="font-size: 14px; color: #374151; text-align: center; margin-bottom: 32px;">
              <p>これまでのデータを全て削除し、初めから作り直しますか？</p>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
              <button 
                onClick={() => {
                  // Reset all sounds
                  SUMMER_SOUNDS.forEach(config => {
                    audioManager.stop(createSoundId(config.id));
                    soundscapeActions.setSoundPlayback(config.id, false);
                    soundscapeActions.setSoundVolume(config.id, createVolume(50));
                    audioManager.setVolume(createSoundId(config.id), createVolume(50));
                  });
                  setShowRestart(false);
                }}
                style="width: 350px; height: 40px; flex-shrink: 0; border-radius: 50px; border: 1px solid #000; font-family: serif; background: none; color: #000; display: flex; align-items: center; justify-content: center; gap: 8px;"
                class="hover:bg-gray-100"
              >
                はじめから作り直す
                <ChevronRight size={16} />
              </button>
              <button 
                onClick={() => setShowRestart(false)}
                style="width: 350px; height: 40px; flex-shrink: 0; border-radius: 50px; border: 1px solid #000; font-family: serif; background: none; color: #000; display: flex; align-items: center; justify-content: center; gap: 8px;"
                class="hover:bg-gray-100"
              >
                キャンセルする
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
