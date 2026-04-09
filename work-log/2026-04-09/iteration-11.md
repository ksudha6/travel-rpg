# Iteration 11
**Date started:** 2026-04-09
**Bounded context:** Presentation (utilities)
**Status:** in-progress

## Context
Iterations 01-10 built 12 scenes as text presentations — centered typewriter paragraphs on dark pixel grids. Retrospective revealed they feel like dashboards, not a world. STORY.md rewritten with game-world format and character movement spec. This iteration builds every utility the world scenes need.

## JTBD
When I start rewriting scenes as worlds, I want movement, backgrounds, visual objects, and dialogue box utilities ready to use, so scene rewrites can focus on choreography, not plumbing.

## Acceptance Criteria
- [ ] Anchor constants (LEFT=0.15, CENTER=0.50, RIGHT=0.85, GROUND_Y=0.75) exported
- [ ] slideCharacter, enterFromLeft, exitRight functions work with Phaser tweens + bob
- [ ] 5 programmatic backgrounds: garden, airport, city, home, boardroom
- [ ] drawCompetitorBuilding, drawPowerUp, drawThoughtBubble visual objects
- [ ] showDialogue RPG dialogue box with typewriter text
- [ ] All 58+ tests pass, TSC clean

## Tasks
- [x] Add movement utilities to sceneConstants.ts (anchors, slide, enter, exit)
- [x] Create backgrounds.ts with 5 environment renderers + scene mapping
- [x] Add visual objects to sceneConstants.ts (building, power-up, thought bubble)
- [x] Add RPG dialogue box to sceneConstants.ts (showDialogue)
- [x] Write world-engine.test.ts (22 tests for exports and anchor math)

## Tests
### Scratch Tests
- [ ] Visual: TitleScene renders airport terminal background
- [ ] Visual: character sits on ground line at ANCHOR.RIGHT

### Permanent Tests
- [x] 22 world engine tests (anchors, colors, function exports)
- [x] All 36 existing tests still pass

## Decision Summary
Built the complete world engine toolkit in one iteration: movement (slide + bob via Phaser tweens), 5 programmatic backgrounds (no external art), visual objects (competitor buildings with rise animation, power-ups with pulse + collect, thought bubbles with grow-in), and RPG dialogue box (screen-bottom box with typewriter, replaces centered text). TitleScene wired to airport background as proof of concept. 58 tests pass.

## Carried Forward
None
