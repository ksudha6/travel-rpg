import Phaser from 'phaser';
import { TAM } from '@/data/market';
import { FONT } from '@/ui/sceneConstants';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create(): void {
    try {
      const { width, height } = this.scale;

      // Simple dark background with subtle pixel grid
      const gfx = this.add.graphics();
      gfx.fillStyle(0x0e0e1a, 1);
      gfx.fillRect(0, 0, width, height);

      // Subtle grid lines (LennyRPG-style)
      gfx.lineStyle(1, 0x1a1a2e, 0.3);
      for (let x = 0; x < width; x += 64) {
        gfx.lineBetween(x, 0, x, height);
      }
      for (let y = 0; y < height; y += 64) {
        gfx.lineBetween(0, y, width, y);
      }

      // A few scattered stars
      for (let i = 0; i < 40; i++) {
        const sx = Phaser.Math.Between(0, width);
        const sy = Phaser.Math.Between(0, height);
        const sa = Phaser.Math.FloatBetween(0.1, 0.4);
        gfx.fillStyle(0xffffff, sa);
        gfx.fillCircle(sx, sy, 1.5);
      }

      // Character sprite
      this.add.image(width * 0.72, height * 0.55, 'char_arjun').setScale(0.25);

      // Title
      this.add
        .text(width * 0.35, height * 0.25, 'Atlys Travel\nExperience', {
          fontFamily: FONT,
          fontSize: '28px',
          color: '#ffffff',
          align: 'center',
          lineSpacing: 12,
        })
        .setOrigin(0.5);

      // Subtitle
      this.add
        .text(
          width * 0.35,
          height * 0.42,
          `India's ${TAM.current} travel market`,
          {
            fontFamily: FONT,
            fontSize: '10px',
            color: '#aaaaaa',
          },
        )
        .setOrigin(0.5);

      // Start Journey CTA
      const cta = this.add
        .text(width * 0.35, height * 0.55, 'Start Journey', {
          fontFamily: FONT,
          fontSize: '14px',
          color: '#22c55e',
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
