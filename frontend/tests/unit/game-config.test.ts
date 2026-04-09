import { describe, it, expect, vi } from 'vitest';

// Mock Phaser before any imports that depend on it.
// Phaser does canvas feature detection on import, which fails outside a browser.
vi.mock('phaser', () => {
  const Scale = { FIT: 1, CENTER_BOTH: 1 };
  const AUTO = 0;
  const Math = { Between: () => 0, FloatBetween: () => 0 };
  class Scene {
    constructor(_config: unknown) {}
  }
  return { default: { AUTO, Scale, Scene, Math } };
});

import { GAME_CONFIG } from '@/config/game';
import { PreloadScene } from '@/scenes/PreloadScene';
import { TitleScene } from '@/scenes/TitleScene';
import { MarketScene } from '@/scenes/MarketScene';
import { JourneyMapScene } from '@/scenes/JourneyMapScene';
import { DreamingScene } from '@/scenes/DreamingScene';
import { PreDepartureScene } from '@/scenes/PreDepartureScene';
import { InTransitScene } from '@/scenes/InTransitScene';
import { OnGroundScene } from '@/scenes/OnGroundScene';
import { PostTripScene } from '@/scenes/PostTripScene';
import { HypothesesScene } from '@/scenes/HypothesesScene';
import { CompetitiveScene } from '@/scenes/CompetitiveScene';
import { GTMScene } from '@/scenes/GTMScene';
import { PunchlineScene } from '@/scenes/PunchlineScene';

const ALL_SCENES = [
  PreloadScene,
  TitleScene,
  MarketScene,
  JourneyMapScene,
  DreamingScene,
  PreDepartureScene,
  InTransitScene,
  OnGroundScene,
  PostTripScene,
  HypothesesScene,
  CompetitiveScene,
  GTMScene,
  PunchlineScene,
];

describe('GAME_CONFIG', () => {
  it('has all 13 scenes registered', () => {
    const scenes = GAME_CONFIG.scene as unknown[];
    expect(scenes).toHaveLength(13);
  });

  it('scenes are in correct order', () => {
    const scenes = GAME_CONFIG.scene as unknown[];
    ALL_SCENES.forEach((scene, i) => {
      expect(scenes[i], `scene at index ${i}`).toBe(scene);
    });
  });

  it('canvas is 1280x720', () => {
    expect(GAME_CONFIG.width).toBe(1280);
    expect(GAME_CONFIG.height).toBe(720);
  });
});
