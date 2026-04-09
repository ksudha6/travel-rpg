import { describe, it, expect, vi } from 'vitest';

vi.mock('phaser', () => {
  const Scale = { FIT: 1, CENTER_BOTH: 1 };
  const AUTO = 0;
  class Scene {
    constructor(_config: unknown) {}
  }
  return { default: { AUTO, Scale, Scene } };
});

import { DreamingScene } from '@/scenes/DreamingScene';
import { PreDepartureScene } from '@/scenes/PreDepartureScene';
import { InTransitScene } from '@/scenes/InTransitScene';
import { OnGroundScene } from '@/scenes/OnGroundScene';
import { PostTripScene } from '@/scenes/PostTripScene';
import { TravelPhase } from '../../../shared/types';

const PHASE_SCENES = [
  { Scene: DreamingScene, phase: TravelPhase.DREAMING, next: 'PreDepartureScene' },
  { Scene: PreDepartureScene, phase: TravelPhase.PRE_DEPARTURE, next: 'InTransitScene' },
  { Scene: InTransitScene, phase: TravelPhase.IN_TRANSIT, next: 'OnGroundScene' },
  { Scene: OnGroundScene, phase: TravelPhase.ON_GROUND, next: 'PostTripScene' },
  { Scene: PostTripScene, phase: TravelPhase.POST_TRIP, next: 'HypothesesScene' },
];

describe('Phase scene flow', () => {
  PHASE_SCENES.forEach(({ Scene, phase, next }) => {
    const name = Scene.name;

    it(`${name} returns correct phase data (${phase})`, () => {
      const scene = new Scene();
      const data = scene.getPhaseData();
      expect(data.id).toBe(phase);
    });

    it(`${name} transitions to ${next}`, () => {
      const scene = new Scene();
      expect((scene as unknown as { nextScene: string }).nextScene).toBe(next);
    });
  });

  it('full phase chain connects without gaps', () => {
    const chain = PHASE_SCENES.map((s) => s.next);
    // Each scene's nextScene should be the next scene in the list (except the last)
    for (let i = 0; i < PHASE_SCENES.length - 1; i++) {
      expect(chain[i]).toBe(PHASE_SCENES[i + 1].Scene.name);
    }
    // Last phase scene goes to HypothesesScene
    expect(chain[chain.length - 1]).toBe('HypothesesScene');
  });
});
