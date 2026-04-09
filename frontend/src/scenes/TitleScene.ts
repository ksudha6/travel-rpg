import Phaser from 'phaser';
import { TAM } from '@/data/market';
import { FONT, ANCHOR } from '@/ui/sceneConstants';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create(): void {
    try {
      const { width, height } = this.scale;

      // Mustard yellow background
      const gfx = this.add.graphics();
      gfx.fillStyle(0xffdb58, 1);
      gfx.fillRect(0, 0, width, height);

      // Character sprite on ground line
      this.add
        .image(width * ANCHOR.RIGHT, height * ANCHOR.GROUND_Y, 'char_arjun')
        .setScale(0.22)
        .setOrigin(0.5, 1);

      // Title
      this.add
        .text(width * 0.35, height * 0.25, 'Atlys Travel\nExperience', {
          fontFamily: FONT,
          fontSize: '28px',
          color: '#1a1a2e',
          align: 'center',
          lineSpacing: 18,
        })
        .setOrigin(0.5);

      // Subtitle
      this.add
        .text(
          width * 0.35,
          height * 0.45,
          `India's ${TAM.current} travel market`,
          {
            fontFamily: FONT,
            fontSize: '10px',
            color: '#444444',
            lineSpacing: 8,
          },
        )
        .setOrigin(0.5);

      // Start Journey CTA
      const cta = this.add
        .text(width * 0.35, height * 0.58, 'Start Journey', {
          fontFamily: FONT,
          fontSize: '14px',
          color: '#1a5a2e',
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      this.tweens.add({
        targets: cta,
        alpha: { from: 0.4, to: 1 },
        duration: 1200,
        yoyo: true,
        repeat: -1,
      });

      // Input
      cta.on('pointerdown', () => this.advance());
      this.input.keyboard?.once('keydown-SPACE', () => this.advance());
    } catch (error) {
      console.error('TitleScene failed to create:', error);
      const { width, height } = this.scale;
      this.add
        .text(width / 2, height / 2, 'Something went wrong.', {
          fontFamily: FONT,
          fontSize: '12px',
          color: '#ff4444',
        })
        .setOrigin(0.5);
    }
  }

  private advance(): void {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MarketScene');
    });
  }
}
