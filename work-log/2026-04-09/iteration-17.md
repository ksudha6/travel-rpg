# Iteration 17
**Date started:** 2026-04-09
**Bounded context:** Personas + Strategy + Presentation
**Status:** pending

## Context
All phase scenes rebuilt as worlds (iters 11-16). This capstone iteration adds the Savi companion, cinematic PunchlineScene walk, and grounds strategy scenes in the world.

## JTBD
When Atlys enters the journey, I want a green companion (Savi) to appear and walk alongside the character from that point forward, and the finale to show both walking together through memories, so the "Full Journey Companion" concept is literal, not abstract.

## Acceptance Criteria
- [ ] Savi sprite loaded in PreloadScene
- [ ] Savi appears at first hook beat (DreamingScene), walks slightly behind character
- [ ] Savi stays present for all subsequent phases (registry flag)
- [ ] PunchlineScene: character + Savi walk LEFT→RIGHT, phase icons flash at 5 positions
- [ ] Strategy scenes: boardroom background, character at LEFT observing
- [ ] Full run-through: Title → Punchline works, music plays, Savi appears and stays
- [ ] All tests pass, TSC clean, build succeeds

## Tasks
- [ ] HUMAN: generate Savi sprite, save as assets/characters/savi.png
- [ ] Savi in BasePhaseScene: spawn at first hook, persist via registry
- [ ] PunchlineScene: cinematic walk with phase icon flashes + Savi alongside
- [ ] Strategy scenes: boardroom background + character presence
- [ ] Full run-through verification + E2E tests

## Tests
### Scratch Tests
- [ ] Visual: Savi appears at hook, stays for subsequent scenes
- [ ] Visual: PunchlineScene walk is cinematic
- [ ] Visual: full flow tells a coherent story

### Permanent Tests
- [ ] All unit tests pass
- [ ] All E2E tests pass
- [ ] npm run build produces clean dist

## Decision Summary
[To be written at iteration close]

## Carried Forward
None
