import { BasePhaseScene } from './BasePhaseScene';
import { JOURNEY_PHASES } from '@/data/journeyPhases';
import { TravelPhase, JourneyPhase } from '../../../shared/types';

export class OnGroundScene extends BasePhaseScene {
  protected readonly nextScene = 'PostTripScene';

  constructor() {
    super({ key: 'OnGroundScene' });
  }

  getPhaseData(): JourneyPhase {
    return JOURNEY_PHASES.find((p) => p.id === TravelPhase.ON_GROUND)!;
  }
}
