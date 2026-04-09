# Iteration 12
**Date started:** 2026-04-09
**Bounded context:** Market + Presentation
**Status:** pending

## Context
Iter 11 built the world engine toolkit and applied fixes: TitleScene already has mustard yellow background + character on ground line + CTA. Restart button and line spacing already fixed on ALL scenes. This iteration focuses on MarketScene world rewrite and music.

## JTBD
When I click "Start Journey," I want music playing and then walk into a garden where market segments are physical places and characters are NPCs, so the presentation feels like entering a game world.

## Acceptance Criteria
- [ ] 8-bit chiptune music plays from TitleScene, loops, mute toggle works
- [ ] MarketScene uses garden background with 7 segment plots as visual rectangles
- [ ] 4 NPCs stand on ground line, hover shows dialogue box with one-liner
- [ ] Selected character walks to center, others fade, exit right to DreamingScene
- [ ] All tests pass, TSC clean

## Tasks
- [ ] Source CC0 8-bit music, add to PreloadScene, play in TitleScene, mute toggle
- [ ] Rewrite MarketScene: garden background, 7 segment plots as colored rectangles with labels
- [ ] MarketScene: 4 NPC sprites on ground line, hover shows one-liner via showDialogue
- [ ] MarketScene: click character → slideCharacter to center, others fade, exitRight → DreamingScene
- [ ] MarketScene: "₹18,00,000 crore" and "Atlys owns 1-2%" as dialogue box beats over the garden

## Already done (do NOT redo):
- TitleScene background (mustard yellow #FFDB58)
- TitleScene character positioning (ANCHOR.RIGHT, GROUND_Y)
- TitleScene CTA + advance logic
- Restart button on all scenes
- Line spacing (18px) on all scenes

## Tests
### Scratch Tests
- [ ] Visual: music plays on title, mute works
- [ ] Visual: garden has 7 distinct plots, Visas glows green
- [ ] Visual: character select has walking animation

### Permanent Tests
- [ ] All existing tests still pass

## Decision Summary
[To be written at iteration close]

## Carried Forward
None
