# Iteration 16
**Date started:** 2026-04-09
**Bounded context:** Journey (per-scene visuals)
**Status:** pending

## Context
Iter 13 rewrote BasePhaseScene. Iters 14-15 gave InTransit, Dreaming, and PreDeparture their unique visuals. This iteration completes the journey with OnGround and PostTrip.

## JTBD
When I reach OnGround, I want to see a hidden door open to the local world; when I reach PostTrip, I want to see a flywheel animation closing the loop, so the full journey arc feels complete.

## Acceptance Criteria
- [ ] OnGroundScene: storefronts for Headout/Google Maps/Instagram with tourist price tags
- [ ] OnGroundScene: "Hacked Icon Access" opens hidden door, local apps appear, prices flip
- [ ] PostTripScene: receipt pile, photo pile, competitor buildings
- [ ] PostTripScene: flywheel circular animation with 5 phase emojis, loop closes
- [ ] All 5 phase scenes verified as worlds
- [ ] All tests pass, TSC clean

## Tasks
- [ ] OnGroundScene Beat 1: storefronts with price tags
- [ ] OnGroundScene Beat 3: keycard + hidden door + price flip
- [ ] PostTripScene Beat 1: receipt/photo pile visuals
- [ ] PostTripScene Beat 4: flywheel animation connecting all 5 phases
- [ ] Verify both scenes against STORY.md

## Tests
### Scratch Tests
- [ ] Visual: hidden door opens convincingly
- [ ] Visual: flywheel loop is visually clear

### Permanent Tests
- [ ] All existing tests still pass

## Decision Summary
[To be written at iteration close]

## Carried Forward
None
