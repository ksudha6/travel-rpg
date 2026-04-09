# Iteration 13
**Date started:** 2026-04-09
**Bounded context:** Journey (scene engine)
**Status:** pending

## Context
Iter 12 rebuilt MarketScene as a garden world with music. Restart button and line spacing already on all scenes from iter 11 fixes. This iteration rewrites BasePhaseScene beats from text-first to world-first.

## JTBD
When I click through a journey phase, I want to watch 6 visual moments — buildings rising, the character walking, a power-up glowing — with brief dialogue text, so the story is shown, not told.

## Acceptance Criteria
- [ ] Beat 0 (Tagline): dramatic full-screen text, character not visible
- [ ] Beat 1 (Standard World): competitor buildings rise on right, character enters from left, one-line dialogue
- [ ] Beat 2 (Anxiety): character walks to center, thought bubble grows above, brief dialogue
- [ ] Beat 3 (Hook): power-up appears at center, character walks to collect it, brief dialogue
- [ ] Beat 4+5 (Atlys Play + Advance): buildings dim, green overlay, character at right, advance prompt
- [ ] All 5 phase scenes inherit the new behavior automatically
- [ ] All tests pass, TSC clean

## Already done (do NOT redo):
- addRestartButton already called in create()
- lineSpacing already set to 18 on all text
- drawPixelGrid already called (will be replaced with drawSceneBackground)

## Tasks
- [ ] Beat 0: keep tagline, replace drawPixelGrid with drawSceneBackground
- [ ] Beat 1: drawCompetitorBuilding for each competitor + enterFromLeft for character + showDialogue (first sentence of standardFocus)
- [ ] Beat 2: slideCharacter to CENTER + drawThoughtBubble + showDialogue (persona name + brief fear)
- [ ] Beat 3: drawPowerUp at center + slideCharacter to collect + showDialogue (hookName + one line hookQuote)
- [ ] Beat 4+5: dim buildings + green overlay + slideCharacter to RIGHT + showDialogue (first sentence atlysPlay) + exitRight + advance

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
