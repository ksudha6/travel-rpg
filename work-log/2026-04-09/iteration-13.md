# Iteration 13
**Date started:** 2026-04-09
**Bounded context:** Market + Presentation
**Status:** pending

## Context
Iter 12 added JourneyMapScene. The original iter 12 tasks (music, MarketScene garden rewrite) were deferred. This iteration picks them up.

## JTBD
When I start the presentation, I want music playing and the market scene to feel like a garden world with segments as physical places, so the atmosphere is set from the first click.

## Acceptance Criteria
- [ ] 8-bit chiptune music plays from TitleScene, loops, mute toggle works
- [ ] MarketScene uses garden background with 7 segment plots as visual rectangles
- [ ] Visas plot glows green with Atlys badge
- [ ] 4 NPCs on ground line, hover shows one-liner via showDialogue
- [ ] Selected character slides to center (slideCharacter), others fade, exit right
- [ ] All tests pass, TSC clean

## Already done (do NOT redo):
- TitleScene background (mustard yellow), character positioning, CTA
- MarketScene → JourneyMapScene wiring (iter 12)
- Restart/back buttons on all scenes
- Line spacing fixed

## Tasks
- [ ] Source CC0 8-bit music, add to PreloadScene, play in TitleScene, mute toggle
- [ ] MarketScene: replace drawPixelGrid with drawGarden, 7 segment plots as colored rectangles
- [ ] MarketScene: 4 NPC sprites on ground line, hover one-liner via showDialogue
- [ ] MarketScene: click character → slideCharacter to center, others fade, exitRight
- [ ] MarketScene: "₹18,00,000 crore" and "Atlys owns 1-2%" as dialogue box beats over garden

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
