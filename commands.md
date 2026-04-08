# Commands

All commands run from `frontend/`.

```bash
cd frontend
```

## Dev Server
```bash
npm run dev           # Start dev server → http://localhost:3000
```

## Build
```bash
npm run build         # TypeScript check + production build → dist/
npm run preview       # Preview production build locally
```

## Tests
```bash
npm run test          # Vitest unit tests (permanent)
npm run test:e2e      # Playwright E2E tests (auto-starts server if not running)
npm run test:all      # Both unit + E2E
```
