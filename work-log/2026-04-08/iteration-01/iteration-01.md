# Iteration 01
**Date started:** 2026-04-08
**Bounded context:** Presentation (scaffold)
**Status:** completed

## Context
First iteration. Project scaffolded with Phaser 3 + Vite + TypeScript. Data files stubbed. No scenes built yet.

## JTBD
When I open the project for the first time, I want to see a title screen that renders in the browser, so I can confirm the tech stack works and start building scenes.

## Acceptance Criteria
- [x] `npm run dev` starts Vite and opens browser
- [x] Phaser canvas renders at 1280x720 with dark background
- [x] Title text "Atlys Travel Experience" is visible on screen
- [x] `npm run build` produces a working `dist/` folder
- [x] No TypeScript errors

## Tasks
- [x] Run `npm install` in frontend/
- [x] Create TitleScene.ts with basic text rendering
- [x] Register TitleScene in game config
- [x] Verify build works
- [x] Write first permanent tests

## Tests
### Scratch Tests
- [x] Console log confirms Phaser version on boot (verified via dev server)

### Permanent Tests
- [x] Vitest: game config has TitleScene registered + canvas is 1280x720 (2 tests pass)
- [x] Playwright: title screen loads and Phaser canvas is visible (1 test passes)

## Decision Summary
Stood up the minimum viable Phaser scene. TitleScene renders title and subtitle text centered on a 1280x720 dark canvas. Vitest unit tests mock Phaser to avoid canvas feature detection failures in Node — this is the standard pattern for testing Phaser config without a browser. Playwright handles the real browser verification. Added `vite-env.d.ts` for `import.meta.env` types, `jsdom` + `@types/node` as dev dependencies, and `vitest.config.ts` for test runner config. The `tsconfig.json` include was expanded to cover `tests/` so the IDE resolves `@/` aliases in test files.

## Carried Forward
None
