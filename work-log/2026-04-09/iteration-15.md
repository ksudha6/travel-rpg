# Iteration 15
**Date started:** 2026-04-09
**Bounded context:** Journey (per-scene visuals)
**Status:** pending

## Context
Iter 13 rewrote BasePhaseScene as a world engine. Iter 14 gave InTransitScene its unique drama. This iteration gives DreamingScene and PreDepartureScene their unique visual signatures.

## JTBD
When I click through Dreaming and PreDeparture, I want to see billboards, dream bubbles, scattered app windows, and a trust trigger badge — so each phase feels distinct, not templated.

## Acceptance Criteria
- [ ] DreamingScene: billboards for Instagram/MMT, dream-bubble destinations overhead
- [ ] DreamingScene: "Visa Reality Check" power-up colors dream bubbles green/yellow/red
- [ ] PreDepartureScene: app windows floating in air, VFS queue as line of rectangles
- [ ] PreDepartureScene: "Trust Trigger" power-up snaps windows into alignment + golden badge
- [ ] Both scenes follow STORY.md beat-for-beat
- [ ] All tests pass, TSC clean

## Tasks
- [ ] DreamingScene Beat 1: billboards + signboards + dream bubbles
- [ ] DreamingScene Beat 3: visa reality check color-tagging
- [ ] PreDepartureScene Beat 1: app windows + VFS queue + clock
- [ ] PreDepartureScene Beat 3: trust trigger alignment + badge
- [ ] Verify both scenes against STORY.md

## Tests
### Scratch Tests
- [ ] Visual: Dreaming has visible billboards and color-tagged bubbles
- [ ] Visual: PreDeparture chaos snaps to order

### Permanent Tests
- [ ] All existing tests still pass

## Decision Summary
[To be written at iteration close]

## Carried Forward
None
