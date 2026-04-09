# Iteration 06
**Date started:** 2026-04-09
**Bounded context:** Presentation
**Status:** in-progress

## Context
Iteration 05 (research) complete. Music: CC0 chiptune from OpenGameArt. Sprites: scale via Phaser `setScale()`. Backgrounds: hybrid programmatic + DALL-E props. This iteration creates PreloadScene and overhauls TitleScene with pixel background, character sprite, and "Start Journey" CTA.

## JTBD
When I open the app, I want to see an atmospheric title screen with a visible character and a deliberate "Start Journey" moment, so the presentation feels like entering a game world.

## Acceptance Criteria
- [ ] PreloadScene loads all 4 character sprites before any scene renders
- [ ] TitleScene has programmatic pixel background (dawn/atmospheric)
- [ ] One character sprite visible on TitleScene
- [ ] Pulsing "Start Journey" CTA
- [ ] Click/space advances to MarketScene with fade

## Tasks
- [ ] Create PreloadScene.ts (load character sprites, transition to TitleScene)
- [ ] Rewrite TitleScene.ts (programmatic background, sprite, CTA)
- [ ] Register PreloadScene as first scene in game.ts
