# Iteration 04
**Date started:** 2026-04-09
**Bounded context:** Market + Personas + Presentation
**Status:** completed

## Context
Iterations 001-003 complete: title screen renders, data layer aligned to STORY.md, 20 data integrity tests passing. This iteration builds the first real scene — a market overview with garden layout showing 7 TAM segments and a character selector to begin the journey.

## JTBD
When I click past the title screen, I want to see the Indian travel market visualized as a garden of segments with character selection, so I can pick a persona and start the journey.

## Acceptance Criteria
- [x] Clicking/pressing space on TitleScene advances to MarketScene with fade transition
- [x] MarketScene shows ₹18,00,000 crore headline and 7 market segment plots
- [x] Visas segment is visually distinct (green, pulsing) with Atlys badge
- [x] 4 character cards show name, subtitle; hover reveals one-liner
- [x] Clicking a character stores selection in registry and shows confirmation
- [x] No TypeScript errors
- [x] All tests pass

## Tasks
- [x] Add click-to-advance on TitleScene (fade + transition)
- [x] Create MarketScene with garden layout (7 segment plots from market.ts)
- [x] Add character select cards (4 personas from personas.ts)
- [x] Register MarketScene in game config
- [x] Write tests (unit: MarketScene registered; existing tests still pass)

## Tests
### Scratch Tests
- [ ] Visual check: click title → market scene loads with segments and cards

### Permanent Tests
- [ ] Unit: GAME_CONFIG has MarketScene registered

## Decision Summary
Built MarketScene with garden layout showing 7 TAM segments and 4 character cards. MarketScene is registered in game config and accessible via click/space from TitleScene with fade transition. Visas segment is visually distinct (green, pulsing) with Atlys badge. Character cards show name and subtitle with hover one-liner. All 21 tests pass including new MarketScene registration test.

## Carried Forward
None
