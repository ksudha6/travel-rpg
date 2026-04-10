import Phaser from 'phaser';
import { TravelPhase, PersonaId } from '../../../shared/types';
import { JOURNEY_PHASES } from '@/data/journeyPhases';
import { PERSONAS } from '@/data/personas';
import {
  FONT,
  TEXT,
  ANCHOR,
  slideCharacter,
  addRestartButton,
} from '@/ui/sceneConstants';

/**
 * JourneyMapScene — RPG overworld between phases.
 *
 * Shows the character walking along a horizontal path. Each phase title
 * appears as a landmark. Previous landmarks stay visible. Click advances
 * to the phase scene.
 *
 * Reused 5 times — registry key 'journeyPhaseIndex' tracks progress (0-4).
 */

const PHASE_SCENES = [
  'DreamingScene',
  'PreDepartureScene',
  'InTransitScene',
  'OnGroundScene',
  'PostTripScene',
];

const PHASE_IDS = [
  TravelPhase.DREAMING,
  TravelPhase.PRE_DEPARTURE,
  TravelPhase.IN_TRANSIT,
  TravelPhase.ON_GROUND,
  TravelPhase.POST_TRIP,
];

export class JourneyMapScene extends Phaser.Scene {
  constructor() {
    super({ key: 'JourneyMapScene' });
  }

  create(): void {
    try {
      this.cameras.main.fadeIn(400, 0, 0, 0);
      const { width, height } = this.scale;
      const phaseIndex = (this.registry.get('journeyPhaseIndex') as number) ?? 0;
      const personaId = this.registry.get('selectedPersona') as PersonaId;
      const persona = PERSONAS[personaId];
      const phase = JOURNEY_PHASES.find((p) => p.id === PHASE_IDS[phaseIndex])!;

      // Journey map background image
      const bgImg = this.add.image(width / 2, height / 2, 'bg_journey_map');
      bgImg.setDisplaySize(width, height);
      bgImg.setDepth(-1);

      addRestartButton(this);

      const groundY = height * ANCHOR.GROUND_Y;

      // Path line overlay (subtle, on top of the background image)
      const gfx = this.add.graphics();
      const pathY = groundY - 4;
      gfx.fillStyle(0xffffff, 0.08);
      gfx.fillRect(60, pathY, width - 120, 4);

      // Landmark positions (evenly spaced)
      const landmarkSpacing = (width - 200) / 4;
      const landmarks: { x: number; title: string; emoji: string }[] = [];

      for (let i = 0; i < 5; i++) {
        const lx = 100 + i * landmarkSpacing;
        const phaseData = JOURNEY_PHASES.find((p) => p.id === PHASE_IDS[i])!;
        landmarks.push({ x: lx, title: phaseData.title, emoji: phaseData.emoji });
      }

      // Draw completed landmarks (phases already visited)
      for (let i = 0; i < phaseIndex; i++) {
        const lm = landmarks[i];
        // Milestone dot
        gfx.fillStyle(0x22c55e, 0.6);
        gfx.fillCircle(lm.x, pathY, 8);

        // Label
        this.add
          .text(lm.x, pathY + 30, `${lm.emoji} ${lm.title}`, {
            fontFamily: FONT,
            fontSize: '7px',
            color: '#22c55e',
          })
          .setOrigin(0.5, 0)
          .setAlpha(0.5);
      }

      // Draw future landmarks as dim dots
      for (let i = phaseIndex + 1; i < 5; i++) {
        gfx.fillStyle(0x3a3a5a, 0.4);
        gfx.fillCircle(landmarks[i].x, pathY, 6);
      }

      // Current landmark — starts invisible, fades in when character arrives
      const currentLm = landmarks[phaseIndex];

      // Milestone dot for current
      const currentDot = this.add.graphics();
      currentDot.fillStyle(0xffdb58, 1);
      currentDot.fillCircle(currentLm.x, pathY, 10);
      currentDot.setAlpha(0);

      // Current phase label (below the path line)
      const currentLabel = this.add
        .text(currentLm.x, pathY + 30, `${currentLm.emoji} ${currentLm.title}`, {
          fontFamily: FONT,
          fontSize: '10px',
          color: '#ffffff',
        })
        .setOrigin(0.5, 0)
        .setAlpha(0);

      // Character sprite
      const startX = phaseIndex === 0
        ? -50
        : landmarks[phaseIndex - 1].x;
      const sprite = this.add
        .image(startX, groundY, `char_${personaId}`)
        .setScale(0.16)
        .setOrigin(0.5, 1);

      // Walk character to current landmark
      slideCharacter(this, sprite, currentLm.x, 1200, () => {
        // Landmark fades in on arrival
        this.tweens.add({
          targets: [currentDot, currentLabel],
          alpha: 1,
          duration: 500,
          ease: 'Power2',
        });

        // Persona name
        this.add
          .text(width / 2, height * 0.2, `${persona.name}'s Journey`, {
            fontFamily: FONT,
            fontSize: '12px',
            color: TEXT.WHITE,
          })
          .setOrigin(0.5);

        // Prompt
        const prompt = this.add
          .text(width / 2, height - 40, 'click to continue', {
            fontFamily: FONT,
            fontSize: '7px',
            color: TEXT.MUTED,
          })
          .setOrigin(0.5)
          .setAlpha(0);

        this.tweens.add({
          targets: prompt,
          alpha: 0.6,
          delay: 300,
          duration: 500,
        });

        // Click to advance to phase scene
        this.input.on('pointerdown', (_pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
          if (currentlyOver.length > 0) return;
          this.advanceToPhase(phaseIndex);
        });
        this.input.keyboard?.on('keydown-SPACE', () => {
          this.advanceToPhase(phaseIndex);
        });
      });
    } catch (error) {
      console.error('JourneyMapScene failed:', error);
      this.add
        .text(640, 360, 'Something went wrong.', {
          fontFamily: FONT,
          fontSize: '10px',
          color: '#ff4444',
        })
        .setOrigin(0.5);
    }
  }

  private advanceToPhase(phaseIndex: number): void {
    this.input.removeAllListeners();
    this.input.keyboard?.removeAllListeners();
    this.cameras.main.fadeOut(400, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(PHASE_SCENES[phaseIndex]);
    });
  }
}
