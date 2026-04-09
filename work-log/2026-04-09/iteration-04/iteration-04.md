# Iteration 04
**Date started:** 2026-04-09
**Bounded context:** Market + Personas + Presentation
**Status:** in-progress

## Context
Iterations 001-003 complete: title screen renders, data layer aligned to STORY.md, 20 data integrity tests passing. This iteration builds the first real scene — a market overview with garden layout showing 7 TAM segments and a character selector to begin the journey.

## JTBD
When I click past the title screen, I want to see the Indian travel market visualized as a garden of segments with character selection, so I can pick a persona and start the journey.

## Acceptance Criteria
- [ ] Clicking/pressing space on TitleScene advances to MarketScene with fade transition
- [ ] MarketScene shows ₹18,00,000 crore headline and 7 market segment plots
- [ ] Visas segment is visually distinct (green, pulsing) with Atlys badge
- [ ] 4 character cards show name, subtitle; hover reveals one-liner
- [ ] Clicking a character stores selection in registry and shows confirmation
- [ ] No TypeScript errors
- [ ] All tests pass

## Tasks
- [x] Add click-to-advance on TitleScene (fade + transition)
- [x] Create MarketScene with garden layout (7 segment plots from market.ts)
- [x] Add character select cards (4 personas from personas.ts)
- [x] Register MarketScene in game config
- [ ] Write tests (unit: MarketScene registered; existing tests still pass)

## Tests
### Scratch Tests
- [ ] Visual check: click title → market scene loads with segments and cards

### Permanent Tests
- [ ] Unit: GAME_CONFIG has MarketScene registered

## Decision Summary
[To be written at close]

## Carried Forward
[None yet]
