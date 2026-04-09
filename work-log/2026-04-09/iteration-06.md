# Iteration 06
**Date started:** 2026-04-09
**Bounded context:** Presentation
**Status:** completed

## Context
Iteration 05 (research) complete. This iteration creates PreloadScene and overhauls TitleScene.

## JTBD
When I open the app, I want to see an atmospheric title screen with a visible character and a deliberate "Start Journey" moment, so the presentation feels like entering a game world.

## Acceptance Criteria
- [x] PreloadScene loads all 4 character sprites before any scene renders
- [x] TitleScene has programmatic pixel background
- [x] One character sprite visible on TitleScene
- [x] Pulsing "Start Journey" CTA
- [x] Click/space advances to MarketScene with fade

## Tasks
- [x] Create PreloadScene.ts (load character sprites, transition to TitleScene)
- [x] Rewrite TitleScene.ts (pixel grid background, sprite, CTA)
- [x] Register PreloadScene as first scene in game.ts

## Decision Summary
Created PreloadScene with loading bar and 4 character sprite loads. TitleScene overhauled with pixel grid background, dawn sky replaced with simple grid (user feedback: keep it simple like LennyRPG). Press Start 2P pixel font loaded via Google Fonts. PreloadScene registered as first scene in game config.

## Carried Forward
None
