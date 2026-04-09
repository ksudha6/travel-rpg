import Phaser from 'phaser';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create(): void {
    try {
      const { width, height } = this.scale;

      this.add
        .text(width / 2, height / 2 - 40, 'Atlys Travel Experience', {
          fontFamily: 'monospace',
          fontSize: '48px',
          color: '#ffffff',
          align: 'center',
        })
        .setOrigin(0.5);

      this.add
        .text(width / 2, height / 2 + 30, 'A gamified scrollytelling adventure', {
          fontFamily: 'monospace',
          fontSize: '20px',
          color: '#aaaaaa',
          align: 'center',
        })
        .setOrigin(0.5);

      const prompt = this.add
        .text(width / 2, height / 2 + 100, 'Click to begin', {
          fontFamily: 'monospace',
          fontSize: '16px',
          color: '#666666',
          align: 'center',
        })
        .setOrigin(0.5);

      this.tweens.add({
        targets: prompt,
        alpha: { from: 0.3, to: 1 },
        duration: 1000,
        yoyo: true,
        repeat: -1,
      });

      this.input.once('pointerdown', () => this.advance());
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
