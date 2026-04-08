# Tech Decisions Log

## Decision 001: Phaser 3 over React
**Date:** 2026-04-08
**Context:** Need to build an interactive scrollytelling presentation with LEGO-style pixel art characters walking through a travel journey.
**Decision:** Phaser 3 (2D game framework) instead of React.
**Rationale:** This is a game/animation, not a form app. Phaser handles sprites, scenes, transitions, and canvas rendering natively. React would require additional libraries (react-spring, framer-motion) to achieve the same effect, adding complexity.
**Tradeoff:** Phaser's ecosystem is smaller. UI overlays (data cards, tables) require manual implementation.

## Decision 002: Vite over Webpack
**Date:** 2026-04-08
**Context:** Need a bundler for TypeScript + Phaser.
**Decision:** Vite.
**Rationale:** Fastest dev server. HMR in milliseconds. Zero-config TypeScript support. Smaller bundle than Webpack.
**Tradeoff:** None significant for this project.

## Decision 003: No Backend (Phase 1)
**Date:** 2026-04-08
**Context:** Data is all hardcoded (market values, competitors, personas).
**Decision:** Static site. No backend. No database.
**Rationale:** Eliminates infra complexity. Deployable anywhere (Vercel, Netlify, even a GitHub Page). Backend added only when justified (leaderboard, analytics).
**Tradeoff:** If we need dynamic data later, we add Fastify. Folder structure already scaffolded for this.

## Decision 004: ChatGPT for Character Art
**Date:** 2026-04-08
**Context:** Need 4 LEGO-style pixel art characters.
**Decision:** Generate in ChatGPT (DALL-E), refine prompt for consistency, export as PNG.
**Rationale:** LennyRPG proved this workflow. Non-technical creator (designer at Miro) generated 250+ consistent avatars this way. We only need 4.
**Tradeoff:** Quality ceiling vs. professional pixel artist. Acceptable for interview presentation.

## Decision 005: Playwright for E2E
**Date:** 2026-04-08
**Context:** Phaser renders on canvas, making DOM-based testing insufficient.
**Decision:** Playwright for E2E tests. Vitest for unit tests.
**Rationale:** Playwright can verify page loads, canvas presence, and scene transitions via URL navigation or button clicks. Can screenshot on failure for visual debugging.
**Tradeoff:** Canvas internals aren't testable via Playwright. We test "did the scene load" not "did the sprite render at pixel X,Y."
