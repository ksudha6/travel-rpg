import Phaser from 'phaser';
import { PersonaId } from '../../../shared/types';
import { FONT, TEXT, ANCHOR, addRestartButton, slideCharacter } from '@/ui/sceneConstants';
import { drawGarden } from '@/ui/backgrounds';

const PHASE_ICONS = [
  { emoji: '🌙', label: 'Dreaming' },
  { emoji: '📋', label: 'Pre-Departure' },
  { emoji: '🛬', label: 'In Transit' },
  { emoji: '🗺️', label: 'On Ground' },
  { emoji: '🏠', label: 'Post-Trip' },
];

const CLOSING_LINES = [
  'The best travel tech is the tech you never have to search for.',
  'Visa. Connectivity. Safety. Companion.',
  'The Arrival Protocol.',
];

export class PunchlineScene extends Phaser.Scene {
  private characterSprite: Phaser.GameObjects.Image | null = null;
  private saviSprite: Phaser.GameObjects.Image | null = null;
  private finished = false;

  constructor() {
    super({ key: 'PunchlineScene' });
  }

  create(): void {
    try {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      const { width, height } = this.scale;
      this.finished = false;
      this.characterSprite = null;
      this.saviSprite = null;

      drawGarden(this);
      addRestartButton(this);

      const groundY = height * ANCHOR.GROUND_Y;
      const personaId = this.registry.get('selectedPersona') as PersonaId;

      // Character starts off-screen left
      if (personaId) {
        this.characterSprite = this.add
          .image(-50, groundY, `char_${personaId}`)
          .setScale(0.18)
          .setOrigin(0.5, 1);
      }

      // Savi walks alongside
      if (this.registry.get('saviActive')) {
        this.saviSprite = this.add
          .image(-100, groundY, 'char_savi')
          .setScale(0.12)
          .setOrigin(0.5, 1);
      }

      // 5 stop positions spread across the walk
      const stops = PHASE_ICONS.map((_, i) => {
        return 140 + i * ((width - 280) / 4);
      });

      // Place phase icon markers along the path (hidden initially)
      const iconTexts: Phaser.GameObjects.Text[] = [];
      const labelTexts: Phaser.GameObjects.Text[] = [];

      PHASE_ICONS.forEach((phase, i) => {
        const x = stops[i];
        const icon = this.add
          .text(x, groundY - 180, phase.emoji, {
            fontSize: '32px',
          })
          .setOrigin(0.5)
          .setAlpha(0);
        iconTexts.push(icon);

        const label = this.add
          .text(x, groundY - 140, phase.label, {
            fontFamily: FONT,
            fontSize: '7px',
            color: TEXT.GREEN,
          })
          .setOrigin(0.5)
          .setAlpha(0);
        labelTexts.push(label);
      });

      // Animate the walk: character moves to each stop, icon flashes
      this.walkToStops(stops, iconTexts, labelTexts, width, height, groundY);

      // Click to skip ahead
      this.input.on('pointerdown', (_pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
        if (currentlyOver.length > 0) return;
        if (!this.finished) {
          this.skipToEnd(width, height);
        }
      });
      this.input.keyboard?.on('keydown-SPACE', () => {
        if (!this.finished) {
          this.skipToEnd(width, height);
        }
      });
    } catch (error) {
      console.error('PunchlineScene failed to create:', error);
      const { width, height } = this.scale;
      this.add
        .text(width / 2, height / 2, 'Something went wrong.', {
          fontFamily: FONT,
          fontSize: '12px',
          color: TEXT.RED,
        })
        .setOrigin(0.5);
    }
  }

  private walkToStops(
    stops: number[],
    icons: Phaser.GameObjects.Text[],
    labels: Phaser.GameObjects.Text[],
    width: number,
    height: number,
    _groundY: number,
  ): void {
    let delay = 300;

    stops.forEach((x, i) => {
      this.time.delayedCall(delay, () => {
        if (this.finished) return;

        // Slide character to this stop
        if (this.characterSprite) {
          slideCharacter(this, this.characterSprite, x, 800);
        }
        if (this.saviSprite) {
          slideCharacter(this, this.saviSprite, x - 60, 800);
        }

        // Flash the icon at this stop after arriving
        this.time.delayedCall(900, () => {
          if (this.finished) return;
          this.tweens.add({
            targets: icons[i],
            alpha: 1,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 300,
            yoyo: true,
            hold: 400,
            onComplete: () => {
              icons[i].setAlpha(0.6).setScale(1);
            },
          });
          this.tweens.add({
            targets: labels[i],
            alpha: 1,
            duration: 400,
          });
        });
      });

      delay += 2000;
    });

    // After all stops: walk to far right, then show closing lines
    this.time.delayedCall(delay + 500, () => {
      if (this.finished) return;
      if (this.characterSprite) {
        slideCharacter(this, this.characterSprite, width - 100, 1000);
      }
      if (this.saviSprite) {
        slideCharacter(this, this.saviSprite, width - 160, 1000);
      }

      this.time.delayedCall(1200, () => {
        if (this.finished) return;
        this.showClosingLines(width, height);
      });
    });
  }

  private showClosingLines(width: number, height: number): void {
    const startY = height * 0.2;
    const spacing = 60;

    CLOSING_LINES.forEach((line, i) => {
      const isLast = i === CLOSING_LINES.length - 1;
      const text = this.add
        .text(width / 2, startY + i * spacing, line, {
          fontFamily: FONT,
          fontSize: isLast ? '14px' : '9px',
          color: isLast ? TEXT.GREEN : TEXT.WHITE,
          fontStyle: isLast ? 'bold' : 'normal',
          align: 'center',
          wordWrap: { width: 900 },
        })
        .setOrigin(0.5)
        .setAlpha(0);

      this.tweens.add({
        targets: text,
        alpha: 1,
        duration: 800,
        delay: i * 1500,
      });
    });

    // Final fade after all lines
    const totalTime = CLOSING_LINES.length * 1500 + 3000;
    this.time.delayedCall(totalTime, () => {
      this.finishScene(width, height);
    });
  }

  private skipToEnd(width: number, height: number): void {
    if (this.finished) return;
    this.finished = true;
    this.tweens.killAll();

    // Show everything immediately
    this.children.getAll().forEach((child) => {
      if (child instanceof Phaser.GameObjects.Text || child instanceof Phaser.GameObjects.Image) {
        child.setAlpha(1).setScale(child.scaleX > 0 ? child.scaleX : 1);
      }
    });

    // Position characters at final spot
    const { width: w } = this.scale;
    if (this.characterSprite) this.characterSprite.setX(w - 100);
    if (this.saviSprite) this.saviSprite.setX(w - 160);

    // Show closing lines immediately
    this.showClosingLines(width, height);
  }

  private finishScene(width: number, height: number): void {
    if (this.finished) return;
    this.finished = true;
    this.input.removeAllListeners();
    this.input.keyboard?.removeAllListeners();

    this.cameras.main.fadeOut(2000, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.cameras.main.setBackgroundColor(0x000000);
      const thankYou = this.add
        .text(width / 2, height / 2, 'Thank you.', {
          fontFamily: FONT,
          fontSize: '14px',
          color: '#22c55e',
        })
        .setOrigin(0.5)
        .setAlpha(0);

      this.cameras.main.fadeIn(1000, 0, 0, 0);
      this.time.delayedCall(200, () => {
        this.tweens.add({ targets: thankYou, alpha: 1, duration: 800 });
      });
    });
  }
}
