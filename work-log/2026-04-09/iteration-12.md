# Iteration 12
**Date started:** 2026-04-09
**Bounded context:** Journey + Presentation
**Status:** in-progress

## Context
Iter 11 built the world engine toolkit. The user wants a journey map screen between every phase — the character walks along a path, phase titles appear as landmarks, then the persona's thought appears before the phase scene plays. This is the connective tissue of the presentation.

## JTBD
When I finish one phase and move to the next, I want to see my character walking along a journey path with phase landmarks appearing, so the presentation feels like a continuous journey, not disconnected slides.

## Acceptance Criteria
- [ ] JourneyMapScene shows a horizontal path with the character walking
- [ ] Phase title fades in as a landmark when the character arrives
- [ ] Previous phase landmarks remain visible (journey progress)
- [ ] Click advances to the phase scene
- [ ] Beat 0 of each phase scene shows the persona's thought (not generic tagline)
- [ ] Flow: MarketScene → JourneyMap("Dreaming") → DreamingScene → JourneyMap("Pre-Departure") → PreDepartureScene → ... etc.
- [ ] JourneyMapScene registered in game config
- [ ] All tests pass, TSC clean

## Already done (do NOT redo):
- Movement utilities (slideCharacter, enterFromLeft, exitRight)
- Background renderers (drawGarden etc.)
- Restart button + line spacing on all scenes
- TitleScene (mustard yellow)

## Tasks
- [ ] Create JourneyMapScene — horizontal path, character walks to next landmark, phase title fades in
- [ ] Wire scene flow: MarketScene → JourneyMap → phase → JourneyMap → phase (5 times)
- [ ] Personalize BasePhaseScene beat 0: show persona thought instead of generic tagline
- [ ] Register JourneyMapScene in game config, update SCENE_ORDER
- [ ] Update tests: scene flow, game config registration

## Tests
### Scratch Tests
- [ ] Visual: character walks along path, landmark appears
- [ ] Visual: previous landmarks stay visible
- [ ] Visual: persona thought shows before each phase

### Permanent Tests
- [ ] JourneyMapScene registered in game config
- [ ] Scene flow chain updated with JourneyMapScene
- [ ] All existing tests still pass

## Decision Summary
[To be written at iteration close]

## Carried Forward
- Music sourcing (moved to later iteration — not blocking)
- Savi sprite (waiting for human to generate)
