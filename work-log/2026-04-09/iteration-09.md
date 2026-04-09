# Iteration 09
**Date started:** 2026-04-09
**Bounded context:** Presentation (integration)
**Status:** in-progress

## Context
All scenes built in parallel (iterations 06-08). This iteration wires everything together: PreloadScene → TitleScene → MarketScene → 5 phases → 3 strategy scenes → PunchlineScene.

## JTBD
When I run the app, I want the full flow to work end-to-end — every scene loads, transitions correctly, and the presentation tells the complete Atlys story.

## Acceptance Criteria
- [ ] Full scene chain works: Title → Market → 5 phases → Hypotheses → Competitive → GTM → Punchline
- [ ] All scenes registered in game.ts
- [ ] MarketScene character selection transitions to DreamingScene
- [ ] All existing tests still pass
- [ ] App renders without TypeScript or runtime errors

## Tasks
- [ ] Update game.ts with all 11 scenes in order
- [ ] Fix MarketScene transition target (→ DreamingScene)
- [ ] Run TypeScript check + existing tests
- [ ] Visual verification of full flow
