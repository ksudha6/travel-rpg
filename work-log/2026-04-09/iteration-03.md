# Iteration 03
**Date started:** 2026-04-09
**Bounded context:** All data contexts
**Status:** completed

## Context
Iteration 02 aligned the bulk of the data files to STORY.md. This iteration cleans up the remaining gaps: a sprite filename mismatch, a missing INR market figure, a duplicate TypeScript interface, and the absence of automated data integrity tests.

## JTBD
When I build scenes in future iterations, I want the data layer to be fully trustworthy and protected by tests, so I never discover a data bug at render time.

## Acceptance Criteria
- [x] Meera sprite filename matches `personas.ts` reference (`meera-family.png`)
- [x] `market.ts` TAM includes ₹18,00,000 crore figure
- [x] Single `JourneyPhase` interface in `shared/types.ts` — no duplicate in `journeyPhases.ts`
- [x] Data integrity tests cover STORY.md verification checklist
- [x] All tests pass (`npm run test` — 20 tests)
- [x] No TypeScript errors

## Tasks
- [x] Rename `meera & family.png` → `meera-family.png`
- [x] Add `currentINR` field to TAM in `market.ts`
- [x] Consolidate `JourneyPhase` interface — delete local `JourneyPhaseData`, update types.ts to use `competitorNames: string[]`
- [x] Write `data-integrity.test.ts` — 18 tests covering phases, personas, competitors, market, strategy

## Tests
### Scratch Tests
- None

### Permanent Tests
- [x] `data-integrity.test.ts`: 18 tests
  - 5 phases, all TravelPhase values covered
  - Every phase has sceneTagline, hookName, atlysPlay, gtmPlay
  - Every phase has personaAnxieties for all 4 personas
  - No banned competitors (GetYourGuide, Viator, Google Travel) in any phase
  - 4 personas, all PersonaId values present
  - Sprite paths match expected pattern
  - All competitors have indiaContext and strategy
  - 7 market segments, only Visas has atlysPresent
  - TAM includes INR figure
  - 3 hypotheses with correct score rankings (H2 highest moat/defensibility, H3 highest revenue/lowest feasibility)
  - 3 GTM motions, Partnership has fitScore 5

## Decision Summary
Consolidated the duplicate JourneyPhase interface by updating `shared/types.ts` to match the actual data shape (`competitorNames: string[]` instead of `competitors: Competitor[]`, `additionalHooks?: string[]` instead of `Array<{name, quote}>`). The local `JourneyPhaseData` in journeyPhases.ts was removed. Data integrity tests now enforce every STORY.md verification rule automatically — future data edits will break tests if they violate the canonical script.

## Carried Forward
None
