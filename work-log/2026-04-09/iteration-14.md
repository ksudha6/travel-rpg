# Iteration 14
**Date started:** 2026-04-09
**Bounded context:** Journey (scene engine)
**Status:** pending

## Context
Iter 13 added music and rebuilt MarketScene as a garden world. This iteration rewrites BasePhaseScene so all 5 journey phase scenes become worlds — characters move, buildings rise, power-ups glow, dialogue boxes replace centered text.

## JTBD
When I click through a journey phase, I want to watch 6 visual moments — buildings rising, the character walking, a power-up glowing — with brief dialogue text, so the story is shown, not told.

## Acceptance Criteria
- [ ] Beat 0 (Thought): persona's thought with character sprite (already done in iter 12)
- [ ] Beat 1 (Standard World): competitor buildings rise on right, character enters from left, one-line dialogue
- [ ] Beat 2 (Anxiety): character walks to center, thought bubble grows above, brief dialogue
- [ ] Beat 3 (Hook): power-up appears at center, character walks to collect it, brief dialogue
- [ ] Beat 4+5 (Atlys Play + Advance): buildings dim, green overlay, character at right, advance prompt
- [ ] All 5 phase scenes inherit the new behavior automatically
- [ ] All tests pass, TSC clean

## Already done (do NOT redo):
- Beat 0 personalized with persona thought (iter 12)
- addRestartButton already in create()
- lineSpacing already set to 24
- JourneyMapScene between phases (iter 12)

## Tasks
- [ ] Replace drawPixelGrid with drawSceneBackground in BasePhaseScene
- [ ] Beat 1: drawCompetitorBuilding for each competitor + enterFromLeft + showDialogue
- [ ] Beat 2: slideCharacter to CENTER + drawThoughtBubble + showDialogue
- [ ] Beat 3: drawPowerUp at center + slideCharacter to collect + showDialogue
- [ ] Beat 4+5: dim buildings + green overlay + slideCharacter RIGHT + showDialogue + exitRight

## Tests
### Scratch Tests
- [ ] Visual: click through DreamingScene, verify 6 visual beats
- [ ] Visual: character moves between anchor positions
- [ ] Visual: buildings appear and dim

### Permanent Tests
- [ ] All existing tests still pass

## Decision Summary
[To be written at iteration close]

## Carried Forward
None
