# Code Style & Conventions

## TypeScript Configuration
- **Strictness**: Very strict TypeScript configuration
- **Target**: ES2022
- **JSX**: Preserve mode with solid-js import source
- **Key strict options**:
  - `strict: true`
  - `noUncheckedIndexedAccess: true`
  - `exactOptionalPropertyTypes: true`
  - `noImplicitReturns: true`
  - `noFallthroughCasesInSwitch: true`

## Code Formatting (Biome.js)
- **Indentation**: 2 spaces
- **Line Width**: 100 characters
- **Quotes**: Single quotes for JavaScript/TypeScript
- **Trailing Commas**: ES5 style
- **Linter**: Disabled in Biome (using ESLint instead)

## Naming Conventions
- **Components**: PascalCase (e.g., `SoundController.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Constants**: UPPER_SNAKE_CASE for configuration
- **Types**: PascalCase with meaningful names

## TypeScript Design Patterns
From CLAUDE.md specifications:
- **Branded Types**: For type safety (e.g., `Volume`, `SoundId`)
- **Const Assertions**: With `satisfies` pattern
- **Template Literal Types**: For type-safe paths
- **Strict Type Definitions**: No implicit any, proper type annotations

## Component Structure
- **Solid.js Components**: Functional components with TypeScript
- **Type Imports**: Use `import type` for type-only imports
- **Props**: Properly typed interfaces
- **JSX**: Use `class` instead of `className` (Solid.js convention)

## File Organization
- Components in `/components/` directory
- State management in `/stores/`
- Audio logic in `/audio/`
- Type definitions in `/types/`
- Configuration in `/config/`