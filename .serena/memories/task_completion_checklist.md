# Task Completion Checklist

## When Completing Development Tasks

### Code Quality Checks
1. **Format Code**: Run Biome formatter (currently no script exists, manual: `npx biome format --write .`)
2. **Lint Code**: Run ESLint (currently no script exists, manual: `npx eslint src --ext .ts,.tsx`)
3. **Type Check**: Ensure TypeScript compilation passes (`tsc --noEmit`)
4. **Build Check**: Verify production build works (`pnpm build`)

### Testing (When Available)
- Currently no test scripts configured
- Manual testing required in browser
- Audio functionality testing with Web Audio API

### Audio-Specific Validation
1. **Audio Loading**: Verify all audio files load correctly
2. **Simultaneous Playback**: Test up to 10 concurrent audio sources
3. **Volume Controls**: Ensure all sliders work properly
4. **Browser Compatibility**: Test Web Audio API functionality
5. **Mobile Responsiveness**: Test touch controls on mobile devices

### Before Committing
1. **Code Review**: Self-review changes for consistency
2. **Documentation**: Update comments if adding complex logic
3. **Type Safety**: Ensure no TypeScript errors or warnings
4. **Performance**: Check for any audio performance issues

### Deployment Preparation
1. **Build Success**: `pnpm build` completes without errors
2. **Asset Optimization**: Verify audio files are optimized (MP3 128kbps)
3. **GitHub Pages Ready**: Ensure build output is compatible

### Currently Missing (To Add Later)
- Unit tests setup
- E2E tests for audio functionality
- Automated linting/formatting in package.json scripts
- Pre-commit hooks
- CI/CD pipeline for automated checks

### Audio Development Notes
- Always test audio changes across different browsers
- Monitor browser console for Web Audio API warnings
- Verify audio file paths and loading states
- Test volume ramping and audio context initialization