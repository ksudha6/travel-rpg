# Retrospective — Iterations 01-10

## Sizing Failures
| Iteration | Issue |
|---|---|
| 06-09 | Attempted to build ALL remaining scenes in one sprint. CLAUDE.md says max 5 tasks per iteration. We ran 4 iterations simultaneously (~20 tasks). Result: everything compiled but missed the narrative goal. |
| 10 | Correctly scoped — 5 tasks for the narration redesign. Delivered what mattered. |

**Pattern:** Parallel execution is fast but loses context. Sequential iterations with user feedback between them would have caught the "dashboard not narration" problem after iter-07, not after iter-09.

## Missing Acceptance Criteria
| Iteration | What was missed |
|---|---|
| 06-09 | No acceptance criterion for "feels like a story" or "follows STORY.md script." Criteria were technical (renders, transitions, tests pass) not experiential. |

**Fix:** Every scene iteration should have an AC: *"Follows the corresponding STORY.md section beat-for-beat."*

## Tests That Caught Real Bugs vs Useless Tests
| Test | Value |
|---|---|
| scene-flow.test.ts (nextScene chain) | High — caught a wiring error early |
| data-integrity.test.ts (all 22) | High — protects the canonical data |
| game-config.test.ts (12 scenes registered) | Medium — useful sanity check |
| E2E full-flow.spec.ts | Low in current form — just verifies no crash, not narrative quality |

**Takeaway:** Unit tests protect data and wiring. Narrative quality can only be verified visually. Scratch tests (manual click-through) are the real quality gate for a presentation.

## Delegation Gaps
| Gap | What happened |
|---|---|
| Agent permissions | All 3 agents failed to write files (permission denied). Wasted ~2 minutes of wall time per agent. Should have written files directly from the start, or ensured agents had write access. |
| Agent prompts lost context | Agents received UI layout specs (pixel positions, card dimensions) instead of the STORY.md narrative script. They built exactly what was asked — dashboards — because that's what the prompts described. |

**Fix:** When delegating, include the STORY.md script for the relevant section. Describe the *experience*, not the *layout*.

## Scope Creep
Minimal. The user kept scope tight throughout. The only scope expansion was the narration redesign (iter-10), which was a necessary correction, not creep.

## Key Lessons

1. **Context > Code Volume.** 12 scenes and 36 tests meant nothing when the scenes didn't tell the story. The narration redesign (iter-10) changed fewer files but delivered more value.

2. **Follow the script.** STORY.md is the source of truth for what the viewer experiences. Every scene must be cross-checked against it before closing.

3. **Sequential beats parallel for quality.** Parallel execution is appropriate for independent, well-specified tasks (data alignment, test writing). It fails for creative/narrative work where feedback between steps matters.

4. **The user is the quality gate.** No amount of automated testing substitutes for "click through and see if it tells the story." Build → show → iterate.

## Metrics
- **Iterations 01-10:** 2 days (Apr 8-9)
- **Files created:** 20+
- **Tests:** 36 unit + 2 E2E
- **Scenes:** 12 (full chain working)
- **Biggest rework:** MarketScene (built 3 times: v1 grid → v2 dashboard → v3 narration)
