# Iteration 05
**Date started:** 2026-04-09
**Bounded context:** Presentation (assets & art direction)
**Status:** completed

## Context
Iterations 001-004 complete: data layer aligned, 21 tests passing, TitleScene and MarketScene rendering. No assets are loaded yet — TitleScene is text-only, character sprites exist but aren't displayed. No PreloadScene, no music, no backgrounds.

## JTBD
When I plan the visual overhaul (iteration 006+), I want music, sprite scaling, and background style decisions already made, so I can implement without research pauses.

## Acceptance Criteria
- [x] Music: source identified, license confirmed, format compatible with Phaser 3
- [x] Sprite scaling: tested approach for 1024px PNGs on 1280x720 canvas
- [x] Background style: approach chosen with rationale
- [x] Decisions documented for iteration 006

## Research Findings

### 1. Music

**Sources (all CC0 — no attribution required):**
- **Juhani Junkala** on OpenGameArt — "Town Theme", "Mystical Theme". Chiptune, loops well, .ogg/.wav
- **SubspaceAudio** on OpenGameArt — "A Journey Awaits". Exploration/overworld feel, CC0
- **itch.io** — search "free chiptune RPG music CC0" for packs (Tallbeard Studios, others)

**Phaser 3 format:** `.ogg` primary + `.mp3` fallback. Phaser handles dual-format natively via `this.sound.add()`.

**Action for user:** Browse OpenGameArt.org → filter Music → 8-bit → CC0 → sort by rating. Pick 1-2 tracks. Download .ogg. Drop into `frontend/assets/music/`.

### 2. Sprite Scaling

**Current state:**
- 4 character PNGs: 1024x1024 (arjun, priya, rahul), 1536x1024 (meera-family)
- Canvas: 1280x720
- Config already has `pixelArt: true` + `roundPixels: true` (nearest-neighbor filtering — correct for pixel art)

**Scaling math:**
- In-scene NPCs: ~120px tall → `setScale(120/1024)` ≈ `0.117`
- Character select pedestals: ~200px tall → `setScale(200/1024)` ≈ `0.195`
- Title screen hero: ~300px tall → `setScale(300/1024)` ≈ `0.293`
- meera-family (wider): same height scale, wider display is fine

**Risk:** At these scales, 1024px source images lose detail. The DALL-E pixel art style survives nearest-neighbor downscaling reasonably well, but test visually.

**Recommendation:** Scale in Phaser (not pre-resize files). `pixelArt: true` ensures crisp downscaling. If results are muddy, pre-resize PNGs to 256x256 with nearest-neighbor in an image editor.

### 3. Background Style

**Decision: Hybrid (programmatic base + DALL-E props)**

Why not free tilesets: Different pixel density and palette from existing DALL-E characters. Visual inconsistency in a presentation is worse than simple backgrounds.

Why not fully programmatic: Looks flat next to DALL-E character art. The contrast undermines the "world you want to stay in" goal.

Why not fully DALL-E backgrounds: DALL-E outputs 1024x1024, not 1280x720. Aspect ratio mismatch, grid alignment breaks, anti-aliasing artifacts.

**The hybrid approach:**
1. **Programmatic base layer** — `Phaser.Graphics` for sky/ground color fills, simple geometric shapes
2. **DALL-E accent props** — 2-3 key elements per scene (airport desk, garden gate, storefront). Generate at 1024x1024, crop to element size, downscale with nearest-neighbor
3. **TileSprite for floors** — small seamless tiles (64x64 or 128x128, must be power-of-two) repeated via `this.add.tileSprite()`

**Depth layering convention:**
| Depth | Content |
|-------|---------|
| 0 | Programmatic background fill |
| 1 | Tiled floor/ground texture |
| 2 | DALL-E scene props |
| 3 | Character sprites |
| 4 | UI overlays / text |

**Phaser tips:**
- TileSprite textures MUST be power-of-two dimensions or they get anti-aliased despite `pixelArt: true`
- `fillGradientStyle` on Graphics is WebGL-only (fine — `Phaser.AUTO` defaults to WebGL)

## Tasks
- [x] Research music sources and Phaser audio format
- [x] Analyze sprite dimensions and calculate scaling factors
- [x] Research background approaches and pick one
- [ ] User: source 1-2 music tracks from OpenGameArt (CC0, .ogg)
- [ ] User: generate 1 test DALL-E background prop to validate hybrid style

## Tests
### Scratch Tests
None (research iteration — no code)

### Permanent Tests
None (research iteration — no code)

## Decision Summary
Three research areas resolved. **Music:** any CC0 chiptune loop from OpenGameArt works — not a creative blocker, just needs someone to download one. **Sprite scaling:** Phaser's `pixelArt: true` handles 1024→120-300px downscaling; test visually in iter-006. **Background style:** hybrid (programmatic fills + DALL-E props) chosen for palette consistency with existing character art. The overarching insight: this is an internal strategy presentation, not a consumer game. Art polish serves engagement, not perfection. The real payload is pain points, entry points, and competitive barriers — visual decisions should never block content delivery.

## Carried Forward
- Source 1-2 CC0 chiptune tracks (.ogg) — non-blocking, can happen during iter-006 implementation
- Test DALL-E prop — nice-to-have, not a gate for moving forward
