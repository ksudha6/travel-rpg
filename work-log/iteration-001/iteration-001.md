# Iteration 001
**Date started:** YYYY-MM-DD
**Bounded context:** Presentation (scaffold)
**Status:** pending

## Context
First iteration. Project scaffolded with Phaser 3 + Vite + TypeScript. Data files stubbed. No scenes built yet.

## JTBD
When I open the project for the first time, I want to see a title screen that renders in the browser, so I can confirm the tech stack works and start building scenes.

## Acceptance Criteria
- [ ] `npm run dev` starts Vite and opens browser
- [ ] Phaser canvas renders at 1280x720 with dark background
- [ ] Title text "Atlys Travel Experience" is visible on screen
- [ ] `npm run build` produces a working `dist/` folder
- [ ] No TypeScript errors

## Tasks
- [ ] Run `npm install` in frontend/
- [ ] Create TitleScene.ts with basic text rendering
- [ ] Register TitleScene in game config
- [ ] Verify build works
- [ ] Write first permanent test (title scene loads)

## Tests
### Scratch Tests
- [ ] Console log confirms Phaser version on boot

### Permanent Tests
- [ ] Vitest: game config has at least 1 scene registered
- [ ] Playwright: title screen loads and displays "Atlys Travel Experience"

## Decision Summary
[To be written at close]

## Carried Forward
[None yet]
