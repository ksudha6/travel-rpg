# Iteration 07
**Date started:** 2026-04-09
**Bounded context:** Journey
**Status:** in-progress

## Context
Building all 5 journey phase scenes in parallel. Each phase follows the same scrollytelling structure: tagline → competitors → persona anxiety → hook → Atlys play → advance. All data comes from journeyPhases.ts. Selected persona from registry.

## JTBD
When I select a character and start the journey, I want to walk through all 5 travel phases seeing competitors, pain points, and Atlys's unique plays, so the strategic argument builds scene by scene.

## Acceptance Criteria
- [ ] DreamingScene renders with correct phase data and transitions to PreDepartureScene
- [ ] PreDepartureScene renders and transitions to InTransitScene
- [ ] InTransitScene renders (most dramatic — Zero Hour) and transitions to OnGroundScene
- [ ] OnGroundScene renders and transitions to PostTripScene
- [ ] PostTripScene renders with flywheel visual and transitions to HypothesesScene

## Tasks
- [ ] Create DreamingScene.ts (Phase 1)
- [ ] Create PreDepartureScene.ts (Phase 2)
- [ ] Create InTransitScene.ts (Phase 3 — Zero Hour)
- [ ] Create OnGroundScene.ts (Phase 4)
- [ ] Create PostTripScene.ts (Phase 5 + flywheel)
