import { BasePhaseScene } from './BasePhaseScene';
import { JOURNEY_PHASES } from '@/data/journeyPhases';
import { TravelPhase, JourneyPhase } from '../../../shared/types';
import { COLORS } from '@/ui/sceneConstants';

export class InTransitScene extends BasePhaseScene {
  protected readonly nextScene = 'OnGroundScene';
  protected competitorColor = COLORS.COMPETITOR_DARK;

  constructor() {
    super({ key: 'InTransitScene' });
  }

  getPhaseData(): JourneyPhase {
    return JOURNEY_PHASES.find((p) => p.id === TravelPhase.IN_TRANSIT)!;
  }
}
