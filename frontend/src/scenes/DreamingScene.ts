import { BasePhaseScene } from './BasePhaseScene';
import { JOURNEY_PHASES } from '@/data/journeyPhases';
import { TravelPhase, JourneyPhase } from '../../../shared/types';

export class DreamingScene extends BasePhaseScene {
  protected readonly nextScene = 'PreDepartureScene';

  constructor() {
    super({ key: 'DreamingScene' });
  }

  getPhaseData(): JourneyPhase {
    return JOURNEY_PHASES.find((p) => p.id === TravelPhase.DREAMING)!;
  }
}
