import Phaser from 'phaser';

const W = 1280;
const H = 720;
const GROUND = 540; // GROUND_Y * H = 0.75 * 720

// ── Garden ────────────────────────────────────────────────
// Used by: MarketScene, DreamingScene, PunchlineScene
// Green grass, garden plots, pixel trees, a winding path.

export function drawGarden(scene: Phaser.Scene): void {
  const gfx = scene.add.graphics();

  // Sky gradient (dark blue to lighter blue)
  gfx.fillStyle(0x0c1445, 1);
  gfx.fillRect(0, 0, W, GROUND);

  // Lighter sky band near horizon
  gfx.fillStyle(0x1a2a5e, 0.6);
  gfx.fillRect(0, GROUND - 80, W, 80);

  // Grass floor
  gfx.fillStyle(0x2a5a3a, 1);
  gfx.fillRect(0, GROUND, W, H - GROUND);

  // Lighter grass stripe
  gfx.fillStyle(0x3a6a4a, 0.5);
  gfx.fillRect(0, GROUND, W, 8);

  // Path (lighter green strip down the center)
  gfx.fillStyle(0x5a7a5a, 0.4);
  gfx.fillRect(W / 2 - 30, GROUND, 60, H - GROUND);

  // 7 garden plot outlines (two rows: 4 top, 3 bottom)
  gfx.lineStyle(2, 0x4a8a5a, 0.6);
  const plotW = 120;
  const plotH = 60;
  const topY = GROUND + 20;
  const botY = GROUND + 100;

  // Top row: 4 plots
  for (let i = 0; i < 4; i++) {
    const px = 100 + i * (plotW + 60);
    gfx.fillStyle(0x1a3a2a, 0.4);
    gfx.fillRect(px, topY, plotW, plotH);
    gfx.strokeRect(px, topY, plotW, plotH);
  }

  // Bottom row: 3 plots
  for (let i = 0; i < 3; i++) {
    const px = 200 + i * (plotW + 80);
    gfx.fillStyle(0x1a3a2a, 0.4);
    gfx.fillRect(px, botY, plotW, plotH);
    gfx.strokeRect(px, botY, plotW, plotH);
  }

  // Pixel trees at edges
  drawTree(gfx, 40, GROUND);
  drawTree(gfx, 1220, GROUND);
  drawTree(gfx, 680, GROUND - 10);
}

function drawTree(gfx: Phaser.GameObjects.Graphics, x: number, groundY: number): void {
  // Trunk
  gfx.fillStyle(0x5a3a1a, 1);
  gfx.fillRect(x - 4, groundY - 30, 8, 30);
  // Canopy (triangle as stacked rects)
  gfx.fillStyle(0x2a7a3a, 1);
  gfx.fillRect(x - 16, groundY - 50, 32, 10);
  gfx.fillRect(x - 12, groundY - 60, 24, 10);
  gfx.fillRect(x - 8, groundY - 68, 16, 8);
}

// ── Airport Terminal ──────────────────────────────────────
// Used by: TitleScene, PreDepartureScene, InTransitScene
// Grey tile floor, window panels, departure board, ceiling lights.

export function drawAirportTerminal(scene: Phaser.Scene): void {
  const gfx = scene.add.graphics();

  // Ceiling / upper wall
  gfx.fillStyle(0x1a1a2a, 1);
  gfx.fillRect(0, 0, W, GROUND);

  // Large window panels (light blue with grey dividers)
  const windowY = 40;
  const windowH = 200;
  const paneW = 180;
  const gap = 20;
  for (let i = 0; i < 6; i++) {
    const px = 40 + i * (paneW + gap);
    // Window glass
    gfx.fillStyle(0x1a3a5a, 0.5);
    gfx.fillRect(px, windowY, paneW, windowH);
    // Window frame
    gfx.lineStyle(2, 0x333355, 0.8);
    gfx.strokeRect(px, windowY, paneW, windowH);
    // Horizontal divider
    gfx.lineBetween(px, windowY + windowH / 2, px + paneW, windowY + windowH / 2);
  }

  // Departure board area
  gfx.fillStyle(0x0a0a15, 1);
  gfx.fillRect(W / 2 - 200, 280, 400, 80);
  gfx.lineStyle(1, 0x333355, 0.6);
  gfx.strokeRect(W / 2 - 200, 280, 400, 80);

  // Board text lines (decorative)
  gfx.fillStyle(0x22aa44, 0.3);
  for (let i = 0; i < 4; i++) {
    gfx.fillRect(W / 2 - 180, 290 + i * 16, 120 + (i % 2) * 40, 6);
  }

  // Ceiling lights
  gfx.fillStyle(0xffee88, 0.3);
  for (let i = 0; i < 10; i++) {
    gfx.fillCircle(80 + i * 120, 15, 4);
  }

  // Grey tile floor
  gfx.fillStyle(0x2a2a3a, 1);
  gfx.fillRect(0, GROUND, W, H - GROUND);

  // Tile lines
  gfx.lineStyle(1, 0x3a3a4a, 0.3);
  for (let x = 0; x < W; x += 80) {
    gfx.lineBetween(x, GROUND, x, H);
  }
  gfx.lineBetween(0, GROUND + 60, W, GROUND + 60);
  gfx.lineBetween(0, GROUND + 120, W, GROUND + 120);
}

// ── City Street ───────────────────────────────────────────
// Used by: OnGroundScene
// Dark road, building silhouettes, street lamps, twilight sky.

export function drawCityStreet(scene: Phaser.Scene): void {
  const gfx = scene.add.graphics();

  // Twilight sky (dark purple gradient)
  gfx.fillStyle(0x1a0a2a, 1);
  gfx.fillRect(0, 0, W, GROUND);
  gfx.fillStyle(0x2a1a3a, 0.5);
  gfx.fillRect(0, GROUND - 100, W, 100);

  // Building silhouettes (varying heights)
  const buildings = [
    { x: 0, w: 140, h: 280 },
    { x: 160, w: 100, h: 200 },
    { x: 280, w: 120, h: 340 },
    { x: 420, w: 90, h: 180 },
    { x: 530, w: 150, h: 300 },
    { x: 700, w: 110, h: 240 },
    { x: 830, w: 130, h: 320 },
    { x: 980, w: 100, h: 190 },
    { x: 1100, w: 180, h: 260 },
  ];

  for (const b of buildings) {
    gfx.fillStyle(0x151525, 1);
    gfx.fillRect(b.x, GROUND - b.h, b.w, b.h);

    // Yellow window dots
    gfx.fillStyle(0xffcc44, 0.3);
    const cols = Math.floor(b.w / 25);
    const rows = Math.floor(b.h / 35);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() > 0.4) {
          gfx.fillRect(b.x + 10 + c * 25, GROUND - b.h + 15 + r * 35, 10, 14);
        }
      }
    }
  }

  // Street lamps
  for (let i = 0; i < 4; i++) {
    const lx = 200 + i * 280;
    gfx.fillStyle(0x3a3a4a, 1);
    gfx.fillRect(lx - 2, GROUND - 80, 4, 80);
    gfx.fillStyle(0xffee88, 0.5);
    gfx.fillCircle(lx, GROUND - 85, 6);
  }

  // Dark road
  gfx.fillStyle(0x1a1a2a, 1);
  gfx.fillRect(0, GROUND, W, H - GROUND);

  // Road markings
  gfx.fillStyle(0x4a4a5a, 0.4);
  for (let x = 0; x < W; x += 100) {
    gfx.fillRect(x + 20, GROUND + 85, 50, 4);
  }
}

// ── Home ──────────────────────────────────────────────────
// Used by: PostTripScene
// Warm interior — wooden floor, window, couch, shelf.

export function drawHome(scene: Phaser.Scene): void {
  const gfx = scene.add.graphics();

  // Wall (warm dark tone)
  gfx.fillStyle(0x2a2018, 1);
  gfx.fillRect(0, 0, W, GROUND);

  // Warm ambient glow
  gfx.fillStyle(0x3a2a18, 0.3);
  gfx.fillCircle(W / 2, GROUND / 2, 300);

  // Window on right side (blue sky)
  const winX = W - 250;
  const winY = 100;
  gfx.fillStyle(0x3a5a8a, 0.6);
  gfx.fillRect(winX, winY, 160, 200);
  gfx.lineStyle(3, 0x5a4a3a, 1);
  gfx.strokeRect(winX, winY, 160, 200);
  // Window cross
  gfx.lineBetween(winX + 80, winY, winX + 80, winY + 200);
  gfx.lineBetween(winX, winY + 100, winX + 160, winY + 100);

  // Shelf with books/photos
  gfx.fillStyle(0x4a3a2a, 1);
  gfx.fillRect(100, 180, 300, 8);
  // Books
  const bookColors = [0x8a2a2a, 0x2a5a8a, 0x5a8a2a, 0x8a6a2a, 0x6a2a8a];
  for (let i = 0; i < 5; i++) {
    gfx.fillStyle(bookColors[i], 0.8);
    gfx.fillRect(110 + i * 40, 140, 14, 40);
  }

  // Couch outline
  gfx.fillStyle(0x3a2a1a, 0.8);
  gfx.fillRect(400, GROUND - 80, 250, 60);
  // Couch back
  gfx.fillRect(400, GROUND - 120, 250, 40);
  // Armrests
  gfx.fillStyle(0x4a3a2a, 0.8);
  gfx.fillRect(390, GROUND - 120, 20, 100);
  gfx.fillRect(640, GROUND - 120, 20, 100);

  // Wooden floor
  gfx.fillStyle(0x4a3218, 1);
  gfx.fillRect(0, GROUND, W, H - GROUND);

  // Floor planks
  gfx.lineStyle(1, 0x5a4228, 0.3);
  for (let y = GROUND; y < H; y += 30) {
    gfx.lineBetween(0, y, W, y);
  }
}

// ── Boardroom ─────────────────────────────────────────────
// Used by: HypothesesScene, CompetitiveScene, GTMScene
// Dark corporate — table, projection screen, spotlight.

export function drawBoardroom(scene: Phaser.Scene): void {
  const gfx = scene.add.graphics();

  // Dark walls
  gfx.fillStyle(0x12121a, 1);
  gfx.fillRect(0, 0, W, GROUND);

  // Projection screen area (lighter rect at top center)
  gfx.fillStyle(0x1a1a28, 1);
  gfx.fillRect(W / 2 - 350, 40, 700, 350);
  gfx.lineStyle(2, 0x2a2a3a, 0.6);
  gfx.strokeRect(W / 2 - 350, 40, 700, 350);

  // Subtle spotlight (brighter circle)
  gfx.fillStyle(0x1a1a2a, 0.4);
  gfx.fillCircle(W / 2, 220, 250);

  // Dark floor
  gfx.fillStyle(0x1a1a22, 1);
  gfx.fillRect(0, GROUND, W, H - GROUND);

  // Conference table
  gfx.fillStyle(0x2a2a38, 1);
  gfx.fillRect(W / 2 - 300, GROUND + 20, 600, 50);
  gfx.lineStyle(1, 0x3a3a4a, 0.5);
  gfx.strokeRect(W / 2 - 300, GROUND + 20, 600, 50);

  // Table legs
  gfx.fillStyle(0x2a2a38, 1);
  gfx.fillRect(W / 2 - 280, GROUND + 70, 8, 50);
  gfx.fillRect(W / 2 + 272, GROUND + 70, 8, 50);
}

// ── Scene-to-background mapping ───────────────────────────

export function drawSceneBackground(scene: Phaser.Scene, sceneName: string): void {
  switch (sceneName) {
    case 'TitleScene':
    case 'PreDepartureScene':
    case 'InTransitScene':
      drawAirportTerminal(scene);
      break;
    case 'MarketScene':
    case 'DreamingScene':
    case 'PunchlineScene':
      drawGarden(scene);
      break;
    case 'OnGroundScene':
      drawCityStreet(scene);
      break;
    case 'PostTripScene':
      drawHome(scene);
      break;
    case 'HypothesesScene':
    case 'CompetitiveScene':
    case 'GTMScene':
      drawBoardroom(scene);
      break;
    default:
      drawGarden(scene);
      break;
  }
}
