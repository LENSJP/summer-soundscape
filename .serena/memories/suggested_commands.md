# Suggested Commands

## Development Commands
```bash
# Start development server (port 3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm serve
# or
pnpm preview

# Install dependencies
pnpm install
```

## Code Quality Commands
```bash
# Format code with Biome
pnpm format
# Note: Currently no format script in package.json, would need to add:
# "format": "biome format --write ."

# Lint code with ESLint  
pnpm lint
# Note: Currently no lint script in package.json, would need to add:
# "lint": "eslint src --ext .ts,.tsx"

# Type checking
# Note: No explicit typecheck script, but TypeScript checking happens during build
tsc --noEmit
```

## System Commands (macOS/Darwin)
```bash
# File operations
ls -la          # List files with details
find . -name    # Find files by name
grep -r         # Search in files recursively

# Git operations
git status      # Check repository status
git add .       # Stage all changes
git commit -m   # Commit changes
git push        # Push to remote

# Process management
ps aux          # List running processes
kill -9 <pid>   # Force kill process
```

## Audio Development Specific
```bash
# Check audio file formats in assets
file assets/sounds/*.mp3

# Monitor audio loading in browser console
# Use browser dev tools for Web Audio API debugging
```

## Package Management
```bash
# Add new dependency
pnpm add <package>

# Add dev dependency  
pnpm add -D <package>

# Remove dependency
pnpm remove <package>

# Update dependencies
pnpm update
```

## Project Setup (First time)
```bash
# Clone and setup
git clone <repo-url>
cd summer-soundscape
pnpm install
pnpm dev
```