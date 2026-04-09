import Phaser from 'phaser';
import { PersonaId } from '../../../shared/types';
import { FONT, TEXT, drawPixelGrid, addRestartButton } from '@/ui/sceneConstants';

const LINES = [
  'The best travel tech is the tech you never have to search for.',
  'Atlys owns the only moment every Indian traveler trusts an app completely.',
  'We are not building a better MakeMyTrip.',
  'We are building the layer underneath every travel app that exists.',
  'Visa. Connectivity. Safety. Companion.',
  'The Arrival Protocol.',
];

export class PunchlineScene extends Phaser.Scene {
  private lineTexts: Phaser.GameObjects.Text[] = [];
  private revealed = 0;
  private finished = false;

  constructor() {
    super({ key: 'PunchlineScene' });
  }

  create(): void {
    try {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      const { width, height } = this.scale;
      this.revealed = 0;
      this.finished = false;
      this.lineTexts = [];

      drawPixelGrid(this, width, height);
      addRestartButton(this);

      // Character sprite
      const personaId = this.registry.get('selectedPersona') as PersonaId;
      if (personaId) {
        this.add.image(width - 140, height - 140, `char_${personaId}`).setScale(0.18);
      }

      // Create all lines hidden
      const startY = 130;
      const spacing = 80;
      const centerX = 560;

      LINES.forEach((line, i) => {
        const isLast = i === LINES.length - 1;
        const isPenultimate = i === LINES.length - 2;

        const text = this.add
          .text(centerX, startY + i * spacing, line, {
            fontFamily: FONT,
            fontSize: isLast ? '18px' : isPenultimate ? '14px' : '11px',
            color: isLast ? '#22c55e' : TEXT.WHITE,
            fontStyle: isLast || isPenultimate ? 'bold' : 'normal',
            align: 'center',
            wordWrap: { width: 900 },
          })
          .setOrigin(0.5)
          .setAlpha(0);

        this.lineTexts.push(text);
      });

      // Timed reveal
      LINES.forEach((_, i) => {
        this.time.delayedCall(500 + i * 2000, () => {
          if (this.revealed <= i) {
            this.revealLine(i);
          }
        });
      });

      // Final fade after all lines
      this.time.delayedCall(500 + LINES.length * 2000 + 2000, () => {
        if (!this.finished) {
          this.finishScene(width, height);
        }
      });

      // Click to skip
      this.input.on('pointerdown', (_pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
        if (currentlyOver.length > 0) return;
        this.skipAhead(width, height);
      });
      this.input.keyboard?.on('keydown-SPACE', () => this.skipAhead(width, height));
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

  private revealLine(index: number): void {
    if (index < this.lineTexts.length && this.lineTexts[index].alpha < 1) {
      this.tweens.add({
        targets: this.lineTexts[index],
        alpha: 1,
        duration: 800,
      });
      this.revealed = index + 1;
    }
  }

  private skipAhead(width: number, height: number): void {
    if (this.finished) return;

    // If not all lines shown, reveal all remaining
    if (this.revealed < LINES.length) {
      for (let i = this.revealed; i < LINES.length; i++) {
        this.lineTexts[i].setAlpha(1);
      }
      this.revealed = LINES.length;
      return;
    }

    // All lines shown — finish
    this.finishScene(width, height);
  }

  private finishScene(width: number, height: number): void {
    if (this.finished) return;
    this.finished = true;
    this.input.removeAllListeners();
    this.input.keyboard?.removeAllListeners();

    this.cameras.main.fadeOut(2000, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.cameras.main.setBackgroundColor(0x000000);
      this.add
        .text(width / 2, height / 2, 'Thank you.', {
          fontFamily: FONT,
          fontSize: '14px',
          color: '#22c55e',
        })
        .setOrigin(0.5)
        .setAlpha(0);

      this.cameras.main.fadeIn(1000, 0, 0, 0);
      this.time.delayedCall(200, () => {
        const children = this.children.getAll();
        const thankYou = children[children.length - 1];
        this.tweens.add({ targets: thankYou, alpha: 1, duration: 800 });
      });
    });
  }
}
