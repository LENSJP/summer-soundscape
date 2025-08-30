# Development Guidelines & Patterns

## Design Principles

### Type Safety Priority
- Use strict TypeScript configuration
- Implement branded types for domain concepts (Volume, SoundId)
- Use const assertions with satisfies pattern
- No implicit any types allowed

### Performance Focus
- Lightweight implementation priority
- Support simultaneous playback of 10 audio sources
- Optimize for modern browsers with Web Audio API
- Use efficient state management with Solid.js signals

### Simplicity Focus
- Avoid excessive features
- Prioritize user experience over technical complexity
- Clean, maintainable code architecture

## Solid.js Specific Guidelines

### Component Patterns
```typescript
// Use functional components with proper typing
const ComponentName: Component<Props> = (props) => {
  // Component logic
  return <div>{/* JSX */}</div>;
};

// Use type imports
import type { Component } from 'solid-js';
```

### State Management
```typescript
// Use createStore for complex state
const [soundscape, setSoundscape] = createStore<SoundscapeState>({
  sounds: { /* audio sources */ },
  masterVolume: 50 as Volume,
  isPlaying: false,
  isInitialized: false
});

// Use createSignal for simple reactive values
const [volume, setVolume] = createSignal<Volume>(50 as Volume);
```

### JSX Conventions
- Use `class` instead of `className` (Solid.js specific)
- Proper event handling with Solid.js patterns
- Efficient reactive updates

## Audio Development Patterns

### Tone.js Integration
- Centralized AudioManager class for Tone.js operations
- Proper Web Audio API context management
- Error handling for audio loading and playback
- Support for audio context suspension/resumption

### Audio State Management
- Separate concerns: UI state vs Audio state
- Reactive updates for volume changes
- Proper cleanup of audio resources
- Loading state management for audio assets

## File Organization Patterns

### Component Structure
- One component per file
- Co-locate related types with components
- Use index.ts for barrel exports when appropriate

### Import Patterns
```typescript
// Type-only imports
import type { Component, JSX } from 'solid-js';

// Regular imports
import { createSignal, createStore } from 'solid-js';

// External dependencies
import * as Tone from 'tone';
```

### Naming Conventions
- Components: PascalCase
- Files: Match component names
- Constants: UPPER_SNAKE_CASE
- Functions: camelCase
- Types/Interfaces: PascalCase

## Error Handling

### Audio Errors
- Handle audio loading failures gracefully
- Provide user feedback for audio context issues
- Fallback behaviors for unsupported browsers

### TypeScript Errors
- No any types
- Proper null/undefined checking
- Exhaustive switch statements
- Proper error boundaries

## Accessibility Guidelines
- Proper semantic HTML
- Keyboard navigation support
- Screen reader compatibility for audio controls
- Clear visual feedback for interactive elements

## Browser Compatibility
- Target modern browsers with Web Audio API support
- Progressive enhancement approach
- Mobile device considerations for audio playback