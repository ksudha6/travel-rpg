import { describe, it, expect } from 'vitest';
import {
  ANCHOR,
  COLORS,
  TEXT,
  FONT,
  SCENE_ORDER,
  slideCharacter,
  enterFromLeft,
  exitRight,
  drawCompetitorBuilding,
  drawPowerUp,
  drawThoughtBubble,
  showDialogue,
  typeText,
  drawPixelGrid,
  addRestartButton,
} from '@/ui/sceneConstants';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

describe('ANCHOR constants', () => {
  it('LEFT is 0.15', () => {
    expect(ANCHOR.LEFT).toBe(0.15);
  });

  it('CENTER is 0.50', () => {
    expect(ANCHOR.CENTER).toBe(0.50);
  });

  it('RIGHT is 0.85', () => {
    expect(ANCHOR.RIGHT).toBe(0.85);
  });

  it('GROUND_Y is 0.75', () => {
    expect(ANCHOR.GROUND_Y).toBe(0.75);
  });

  it('all values are fractions between 0 and 1', () => {
    for (const [key, value] of Object.entries(ANCHOR)) {
      expect(value, `ANCHOR.${key}`).toBeGreaterThan(0);
      expect(value, `ANCHOR.${key}`).toBeLessThan(1);
    }
  });

  it('resolves to correct pixel positions on 1280x720 canvas', () => {
    expect(ANCHOR.LEFT * CANVAS_WIDTH).toBe(192);
    expect(ANCHOR.CENTER * CANVAS_WIDTH).toBe(640);
    expect(ANCHOR.RIGHT * CANVAS_WIDTH).toBe(1088);
    expect(ANCHOR.GROUND_Y * CANVAS_HEIGHT).toBe(540);
  });
});

describe('COLORS', () => {
  const requiredKeys = [
    'ATLYS_GREEN',
    'COMPETITOR_GREY',
    'THOUGHT_RED',
    'DIALOGUE_BG',
    'DIALOGUE_BORDER',
  ] as const;

  for (const key of requiredKeys) {
    it(`has ${key}`, () => {
      expect(COLORS[key], `COLORS.${key}`).toBeDefined();
      expect(typeof COLORS[key]).toBe('number');
    });
  }
});

describe('TEXT constants', () => {
  it('exports WHITE, SUB, MUTED, GREEN, RED as strings', () => {
    for (const [key, value] of Object.entries(TEXT)) {
      expect(typeof value, `TEXT.${key}`).toBe('string');
    }
  });
});

describe('FONT constant', () => {
  it('includes Press Start 2P', () => {
    expect(FONT).toContain('Press Start 2P');
  });
});

describe('Function exports', () => {
  const functions = {
    slideCharacter,
    enterFromLeft,
    exitRight,
    drawCompetitorBuilding,
    drawPowerUp,
    drawThoughtBubble,
    showDialogue,
    typeText,
    drawPixelGrid,
  };

  for (const [name, fn] of Object.entries(functions)) {
    it(`${name} is an exported function`, () => {
      expect(typeof fn).toBe('function');
    });
  }

  it('addRestartButton is an exported function', () => {
    expect(typeof addRestartButton).toBe('function');
  });
});

describe('SCENE_ORDER navigation', () => {
  it('starts with TitleScene', () => {
    expect(SCENE_ORDER[0]).toBe('TitleScene');
  });

  it('ends with PunchlineScene', () => {
    expect(SCENE_ORDER[SCENE_ORDER.length - 1]).toBe('PunchlineScene');
  });

  it('has no duplicates', () => {
    const unique = new Set(SCENE_ORDER);
    expect(unique.size).toBe(SCENE_ORDER.length);
  });

  it('back from MarketScene goes to TitleScene', () => {
    const idx = SCENE_ORDER.indexOf('MarketScene');
    expect(idx).toBe(1);
    expect(SCENE_ORDER[idx - 1]).toBe('TitleScene');
  });

  it('JourneyMapScene is between MarketScene and DreamingScene', () => {
    const marketIdx = SCENE_ORDER.indexOf('MarketScene');
    const journeyIdx = SCENE_ORDER.indexOf('JourneyMapScene');
    const dreamingIdx = SCENE_ORDER.indexOf('DreamingScene');
    expect(journeyIdx).toBe(marketIdx + 1);
    expect(dreamingIdx).toBe(journeyIdx + 1);
  });

  it('back from DreamingScene goes to JourneyMapScene', () => {
    const idx = SCENE_ORDER.indexOf('DreamingScene');
    expect(SCENE_ORDER[idx - 1]).toBe('JourneyMapScene');
  });

  it('back from each scene goes to its predecessor', () => {
    for (let i = 1; i < SCENE_ORDER.length; i++) {
      const current = SCENE_ORDER[i];
      const prev = SCENE_ORDER[i - 1];
      expect(prev, `back from ${current}`).toBeDefined();
      expect(prev, `back from ${current}`).not.toBe(current);
    }
  });

  it('TitleScene has no back (index 0)', () => {
    const idx = SCENE_ORDER.indexOf('TitleScene');
    expect(idx).toBe(0);
  });
});
