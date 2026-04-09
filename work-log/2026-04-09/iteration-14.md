# Iteration 14
**Date started:** 2026-04-09
**Bounded context:** Journey (per-scene drama)
**Status:** pending

## Context
Iter 13 rewrote BasePhaseScene as a world-first beat engine. This iteration creates the most dramatic scene in the presentation — InTransitScene "The Zero Hour" — where competitor screens black out and the Arrival Protocol brings calm.

## JTBD
When I reach the InTransitScene, I want to experience chaos (screens going dark, camera shaking) followed by calm (green fills, driver appears), so the Atlys argument hits viscerally, not just intellectually.

## Acceptance Criteria
- [ ] Beat 1: competitor "screens" appear lit then simultaneously black out
- [ ] Camera shake effect on blackout, "No Service" label
- [ ] Beat 3: eSIM bar fills green, Green Stripe driver appears, "Local number active"
- [ ] Scene palette shifts from grey/red to green during beats 3-4
- [ ] Beat 4: three sequential dialogue beats (eSIM, driver, flight delay)
- [ ] Most visually dramatic scene in the entire presentation
- [ ] All tests pass, TSC clean

## Tasks
- [ ] Override Beat 1: lit screens → blackout + camera shake
- [ ] Override Beat 3: Arrival Protocol sequence (eSIM, driver, connectivity)
- [ ] Color transition: grey/red → green during beats 3-4
- [ ] Override Beat 4: three sequential dialogue beats
- [ ] Scratch test: verify blackout timing and drama

## Tests
### Scratch Tests
- [ ] Visual: blackout feels shocking
- [ ] Visual: green transition feels like relief
- [ ] Visual: most dramatic scene in full flow

### Permanent Tests
- [ ] All existing tests still pass

## Decision Summary
[To be written at iteration close]

## Carried Forward
None
