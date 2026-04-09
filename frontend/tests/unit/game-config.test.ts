import { describe, it, expect, vi } from 'vitest';

// Mock Phaser before any imports that depend on it.
// Phaser does canvas feature detection on import, which fails outside a browser.
vi.mock('phaser', () => {
  const Scale = { FIT: 1, CENTER_BOTH: 1 };
  const AUTO = 0;
  class Scene {
    constructor(_config: unknown) {}
  }
  return { default: { AUTO, Scale, Scene } };
});

import { GAME_CONFIG } from '@/config/game';
import { TitleScene } from '@/scenes/TitleScene';
import { MarketScene } from '@/scenes/MarketScene';

describe('GAME_CONFIG', () => {
  it('has TitleScene registered', () => {
    const scenes = GAME_CONFIG.scene as unknown[];
    expect(scenes).toContain(TitleScene);
  });

  it('has MarketScene registered', () => {
    const scenes = GAME_CONFIG.scene as unknown[];
    expect(scenes).toContain(MarketScene);
  });

  it('canvas is 1280x720', () => {
    expect(GAME_CONFIG.width).toBe(1280);
    expect(GAME_CONFIG.height).toBe(720);
  });
});
