# Iteration 02
**Date started:** 2026-04-08
**Bounded context:** All data contexts
**Status:** completed

## Context
Iteration 01 complete — title screen renders. STORY.md (the canonical story script) was added to GitHub. Cross-check revealed that `competitors.ts` and `journeyPhases.ts` diverged significantly from STORY.md: wrong hook names, wrong competitor lists per phase, missing fields (sceneTagline, personaAnxieties, gtmPlay), and India-irrelevant competitors in scene lists.

## JTBD
When I start building scenes from STORY.md, I want the data files to match the canonical script exactly, so I can trust every import without cross-referencing manually.

## Acceptance Criteria
- [x] `competitors.ts` matches STORY.md competitor lists per phase
- [x] `journeyPhases.ts` has correct hook names, scene taglines, and persona anxieties
- [x] `shared/types.ts` includes `indiaContext`, `strategy`, `sceneTagline`, `personaAnxieties`, `gtmPlay` fields
- [x] No TypeScript errors

## Tasks
- [x] Update `shared/types.ts` — add `indiaContext` and `strategy` to Competitor; add `sceneTagline`, `personaAnxieties`, `gtmPlay` to JourneyPhase
- [x] Copy corrected `competitors.ts` from workspace backup into repo
- [x] Copy corrected `journeyPhases.ts` from workspace backup into repo
- [x] Commit and push

## Tests
### Scratch Tests
- None (data alignment, not logic)

### Permanent Tests
- None added this iteration (deferred to iter-03)

## Decision Summary
Copied the human-authored corrected data files from the workspace backup rather than editing the repo versions in place. This preserved the domain expert's research notes, India-context commentary, and carefully curated competitor lists. The types.ts interface was extended to accommodate the new fields. GetYourGuide, Viator, and Google Travel were removed from scene competitor lists per STORY.md rules.

## Carried Forward
- Data integrity tests (moved to iter-03)
- Interface deduplication between JourneyPhaseData and JourneyPhase (moved to iter-03)
