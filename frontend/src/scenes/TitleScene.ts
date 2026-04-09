import Phaser from 'phaser';
import { TAM } from '@/data/market';

// Dawn sky gradient colors (top to bottom)
const SKY_COLORS = [
  0x0a0618, 0x0f0a24, 0x150e30, 0x1a0a2e, 0x221040,
  0x2e1648, 0x3a1a4e, 0x4a1e4a, 0x5c2244, 0x6b2a42,
  0x7a303e, 0x8b3a3a, 0x9c4836, 0xa85832, 0xb46830,
  0xc07830, 0xc76b3a, 0xb08040, 0x605830, 0x1a1a0a,
];

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create(): void {
    try {
      const { width, height } = this.scale;
      const stripH = height / SKY_COLORS.length;

      // Dawn sky gradient
      const gfx = this.add.graphics();
      SKY_COLORS.forEach((color, i) => {
        gfx.fillStyle(color, 1);
        gfx.fillRect(0, i * stripH, width, stripH + 1);
      });

      // Stars in upper sky
      for (let s = 0; s < 30; s++) {
        const sx = Phaser.Math.Between(0, width);
        const sy = Phaser.Math.Between(0, height * 0.35);
        const sa = Phaser.Math.FloatBetween(0.2, 0.7);
        const sr = Phaser.Math.FloatBetween(1, 2.5);
        gfx.fillStyle(0xffffff, sa);
        gfx.fillCircle(sx, sy, sr);
      }

      // Character sprite
      this.add.image(width * 0.72, height * 0.58, 'char_arjun').setScale(0.25);

      // Title
      this.add
        .text(width * 0.35, height * 0.28, 'Atlys Travel Experience', {
          fontFamily: 'monospace',
          fontSize: '42px',
          color: '#ffffff',
        })
        .setOrigin(0.5);

      // Subtitle
      this.add
        .text(
          width * 0.35,
          height * 0.38,
          `A journey through India's ${TAM.current} travel market`,
          {
            fontFamily: 'monospace',
            fontSize: '16px',
            color: '#aaaaaa',
          },
        )
        .setOrigin(0.5);

      // Start Journey CTA
      const cta = this.add
        .text(width * 0.35, height * 0.53, '▶  Start Journey', {
          fontFamily: 'monospace',
          fontSize: '22px',
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
          fontFamily: 'monospace',
          fontSize: '24px',
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
