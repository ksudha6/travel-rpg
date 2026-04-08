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
}
