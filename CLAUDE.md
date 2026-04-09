# Travel RPG — Project Rules

## Persona & Constraints
Be concise. No sycophancy. No pandering. Challenge ideas with rationale.
The human is a product manager, not an engineer. Explain technical tradeoffs in plain language. Never make architectural decisions without stating the tradeoff.

---

## Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| Frontend engine | Phaser 3 | 2D game framework for HTML5. Handles rendering, scenes, sprites, input. No React needed. |
| Bundler | Vite | Fastest dev server. HMR in milliseconds. Zero-config TypeScript. |
| Language | TypeScript (strict) | Catches bugs at compile time. Required for all `.ts` files. |
| Backend | None (Phase 1). Fastify when needed. | Static site first. Add API only when there's a real need (leaderboard, analytics). |
| Database | None (Phase 1). SQLite when needed. | Hardcoded JSON data. No infra until justified. |
| Package manager | npm | Simple. No pnpm/yarn unless dependency resolution fails. |
| Deployment | Static hosting (Vercel or Netlify) | One command deploy. No Docker. No CI/CD complexity until Phase 2. |

**Rules:**
- No React, Next.js, or heavy frameworks. Phaser owns the rendering.
- No CSS frameworks. Phaser handles UI within the game canvas.
- External scripts only from cdnjs.cloudflare.com if absolutely needed.
- Every dependency added must have a one-line justification in the commit message.

---

## Domain-Driven Design

This project is governed by a bounded context model to keep iteration scope small.

### Bounded Contexts

| Context | Owns | Files |
|---------|------|-------|
| **Personas** | Traveler characters, traits, one-liners, pain points per phase | `src/data/personas.ts`, `src/entities/Character.ts` |
| **Journey** | 5 travel phases, offbeat hooks, standard vs offbeat framing | `src/data/journey-phases.ts`, `src/scenes/*Scene.ts` |
| **Market** | TAM data, segment breakdown, market values | `src/data/market.ts` |
| **Competitors** | Company profiles, revenue, positioning, gaps per phase | `src/data/competitors.ts` |
| **Strategy** | Hypotheses, GTM motions, positioning matrix | `src/data/strategy.ts` |
| **Presentation** | Scene transitions, scrollytelling flow, UI overlays | `src/ui/*`, `src/config/game.ts` |

**Rules:**
- Each iteration touches ONE bounded context primarily. Cross-context changes require justification.
- Domain vocabulary is maintained in `docs/ddd-vocab.md`. Use these terms in code, commits, and iteration notes.
- Name representations of domain values using enums/constants, not bare strings. Example: `TravelPhase.DREAMING` not `"dreaming"`.

---

## Iteration Workflow

### Rules
1. **Iterations are SMALL.** If an iteration has more than 5 tasks, it's too big. Warn the user and split it.
2. **Every iteration produces a viewable/playable state.** If it doesn't render, it's not done.
3. **All commits to `main` must contain working code.** No broken builds on main. Ever.
4. **Content authoring is human work, not agent work.** The agent handles structure, plumbing, rendering. The human provides domain-accurate text, copy, and creative decisions.
5. **Research and implementation are separate iterations.** Never mix "figure out how" and "build it" in the same iteration.
6. **No TODOs. No placeholders.** Every file committed must be complete. No `// TODO`, no `placeholder`, no stub functions that do nothing. If it's not ready, it doesn't go in.

### Starting an Iteration

**Directory structure (mandatory):**
```
work-log/
  <YYYY-MM-DD>/          ← date folder (day iteration starts)
    iteration-NN.md       ← iteration log file directly inside date folder
```
Example: `work-log/2026-04-08/iteration-01.md`

**Steps:**
1. Find the latest iteration number by scanning `work-log/*/iteration-*.md`. Increment by 1.
2. Create the date folder if it doesn't exist: `work-log/<YYYY-MM-DD>/`
3. Create `iteration-NN.md` inside the date folder with this template:

```markdown
# Iteration NN
**Date started:** YYYY-MM-DD
**Bounded context:** [which context this touches]
**Status:** in-progress | completed | carried-forward

## Context
[What's the current state? What happened in the previous iteration?]

## JTBD (Job To Be Done)
[One sentence: "When [situation], I want to [action], so I can [outcome]"]

## Acceptance Criteria
- [ ] Criterion 1 (specific, testable)
- [ ] Criterion 2
- [ ] Criterion 3

## Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
(Max 5 tasks. If more, split the iteration.)

## Tests
### Scratch Tests (verify implementation, disposable, never committed)
- [ ] Test description

### Permanent Tests (protect against regression, committed)
- [ ] Test description

## Decision Summary
[One paragraph written at iteration close. What was decided and why.]

## Carried Forward
[Any incomplete tasks that move to the next iteration]
```

### Iteration Nomenclature
- Format: `iteration-NN` where NN is a global counter (01, 02, 03...)
- The counter NEVER resets. Iteration 01 is always the first iteration of the project.
- Each iteration's folder is `work-log/<YYYY-MM-DD>/iteration-NN/` where the date is the day the iteration started.
- Multiple iterations on the same day share the same date folder.
- If an iteration spans multiple days, it keeps its original start date and number.
- New iterations always increment by 1 from the previous, regardless of date.

### Closing an Iteration
Before marking complete, verify ALL of the following:
1. All acceptance criteria are met
2. All tasks are done (or explicitly carried forward with reason)
3. All scratch tests pass (then delete them)
4. All permanent tests pass: `npm run test`
5. The app renders in browser without errors
6. Decision summary is written (one paragraph, not an action log)
7. Code is committed to main with a descriptive message

### Retrospectives
Every 10 iterations (10, 20, 30...), review patterns in:
- Sizing failures (iterations that were too big)
- Missing acceptance criteria
- Tests that caught real bugs vs. tests that were useless
- Delegation gaps (what should have been a sub-agent task?)
- Scope creep

---

## Agent Delegation

### When to use Sonnet sub-agents
- Content generation exceeding ~2k tokens
- Parallel research tasks
- File operations across multiple bounded contexts
- Test writing

### How to delegate
Use intent-based prompts. Describe the problem, constraints, and acceptance criteria. Don't dictate code.

**Mandatory tool block (paste before every sub-agent task):**
```
Use Read for files, Edit for modifications, Write for new files, Grep for search,
Glob for file search, Bash exclusively for commands.
```

### Never assign to Haiku
No programming tasks. No architectural decisions. Haiku is for summarization only.

---

## Frontend Rules

### Phaser-Specific
- Each scene is a self-contained class extending `Phaser.Scene`
- Scenes communicate via the Phaser event system, not global state
- Assets loaded in a dedicated `PreloadScene`, not per-scene
- Game config lives in `src/config/game.ts` — single source of truth
- Canvas size: 1280x720 (16:9, scales down for mobile)

### Code Style
- State problems being solved, not layout changes. "Pain point card must be readable at 720p" not "make text bigger"
- No duplicate functions differing by one flag — use parameters
- Specify generic type parameters: `Map<string, Competitor>` not `Map<any, any>`
- Extract test data into variables; assert full structures, not individual fields

### Data Layer
- All market data, competitor info, persona pain points live in `src/data/`
- Data files export typed constants, not classes
- Data is hardcoded JSON-in-TypeScript. No fetch calls. No API. No database.
- When data changes, only data files change. Scenes should not contain data.

---

## Testing

### Three Test Layers

| Layer | Tool | Purpose | When to Run |
|-------|------|---------|-------------|
| **Unit (scratch)** | Vitest | Verify implementation correctness. Disposable. | During iteration. Delete at close. |
| **Unit (permanent)** | Vitest | Data integrity, type safety, business logic. | Before every commit. |
| **E2E (permanent)** | Playwright | Scene loads, transitions work, canvas renders, user flow works. | Before every commit. |

### Scratch Tests (disposable)
- Verify implementation correctness during development
- Never committed to version control
- Run with: `npx vitest run --config vitest.scratch.config.ts`
- Delete after iteration closes

### Permanent Unit Tests
- Protect against regression
- Cover: data file conformance to TypeScript interfaces, business logic
- Run with: `npm run test`
- Must pass before any commit to main

### Permanent E2E Tests (Playwright)
- Cover: scene loading, scene transitions, user interaction flow, canvas rendering
- Run with: `npm run test:e2e`
- Playwright config: `playwright.config.ts` in frontend root
- Tests live in `frontend/tests/e2e/`
- **What to test with Playwright:**
  - Title screen loads and renders without errors
  - Character select: clicking a persona loads the correct journey
  - Each phase scene transitions correctly to the next
  - Final punchline screen renders with market data
  - Full flow: title → select → phase 1-5 → strategy → punchline
- **What NOT to test with Playwright:**
  - Pixel-perfect rendering (Phaser handles that)
  - Animation timing (too flaky)
  - Specific text content (test in unit tests via data files)
- **Scratch Playwright tests:** `cd frontend && npx playwright test --config=playwright-scratch.config.ts`

### Dev Server
- **Start:** `cd frontend && npm run dev` — runs Vite on `http://localhost:3000`
- **Port:** 3000 (configured in `frontend/vite.config.ts`)
- **Reuse:** Playwright's `webServer.reuseExistingServer: true` means a running dev server is reused automatically. Start the server once, run E2E tests as many times as needed.
- **When to start:** Before any manual browser verification or repeated E2E test runs during an iteration.

### Test Commands
```bash
cd frontend
npm run dev           # Start dev server (keep running in background)
npm run test          # Vitest permanent unit tests
npm run test:e2e      # Playwright permanent E2E tests (auto-starts server if not running)
npm run test:all      # Both
```

---

## Visual & Art Direction

- **Style:** Pixel art LEGO minifigures. Blocky, colorful, charming.
- **Character sprites:** Generated in ChatGPT (DALL-E). Stored in `frontend/assets/characters/` as PNG.
- **Backgrounds:** Generated programmatically in Phaser (colored tiles, simple shapes). No external art needed.
- **Data overlays:** Clean, minimal. White/dark cards with market data. No heavy UI frameworks.
- **Screenshot format:** JPEG, quality 20. Viewport only, never full page.
- **Transitions:** Fade between scenes. Keep Phaser transition timing in mind — wait for completion before asserting state.

---

## Git Conventions

- Commit messages: imperative mood, one line, under 72 chars. Body if needed.
- Format: `iter-NN: <what changed>` (e.g., `iter-01: scaffold project with phaser 3 and vite`)
- Never commit: node_modules, dist, .env, scratch test files, .DS_Store
- Branch strategy: `main` only (for now). Feature branches when collaboration starts.
- Every commit must have working code. No WIP commits on main.

---

## Foundational Webapp Principles

### 1. Separation of Concerns
Data, rendering, and logic live in separate files. A scene file should not contain market data. A data file should not contain rendering logic.

### 2. Single Source of Truth
Every piece of data has exactly one home. Personas live in `personas.ts`. Market data lives in `market.ts`. If you need persona data in a scene, import it — don't copy it.

### 3. Progressive Enhancement
Build the simplest version first. Title screen → character select → one phase → all phases → strategy → polish. Every intermediate state must be viewable.

### 4. Type Safety as Documentation
TypeScript interfaces document the shape of your data. If a `Persona` has `painPoints: Record<TravelPhase, string>`, that IS the spec. Keep interfaces accurate.

### 5. No Premature Optimization
Don't cache, lazy-load, or split bundles until there's a measured performance problem. Vite + Phaser handles a presentation-sized app without optimization.

### 6. Asset Pipeline Discipline
All assets in `frontend/assets/`. Named consistently: `arjun.png`, `priya.png`, not `character1.png`. Sub-folders by type: `characters/`, `world/`, `icons/`.

### 7. Error Boundaries
Every scene has a try-catch around its `create()` method. If a scene fails, show a fallback message — don't crash the whole app.

### 8. Mobile Consideration
Canvas scales to viewport. Touch input mapped to click. Text readable at 360px width minimum. But desktop is primary — don't over-engineer responsive.

### 9. Deployment Readiness from Day 1
`npm run build` produces a deployable `dist/` folder from iteration 01. No "we'll figure out deployment later."

### 10. Documentation Lives in Code
Comments explain what and why. TypeScript types explain shape. Iteration notes explain decisions. No separate wiki. No external docs that drift.
