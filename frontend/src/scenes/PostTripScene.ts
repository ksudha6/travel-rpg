import { BasePhaseScene } from './BasePhaseScene';
import { JOURNEY_PHASES } from '@/data/journeyPhases';
import { TravelPhase, JourneyPhase } from '../../../shared/types';

export class PostTripScene extends BasePhaseScene {
  protected readonly nextScene = 'HypothesesScene';

  constructor() {
    super({ key: 'PostTripScene' });
  }

  getPhaseData(): JourneyPhase {
    return JOURNEY_PHASES.find((p) => p.id === TravelPhase.POST_TRIP)!;
  }
}
