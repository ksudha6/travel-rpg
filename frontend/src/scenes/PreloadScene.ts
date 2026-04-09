import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(): void {
    const { width, height } = this.scale;

    // Loading bar
    const bar = this.add.rectangle(width / 2, height / 2, 400, 20, 0x222222);
    bar.setStrokeStyle(1, 0x444444);
    const fill = this.add.rectangle(width / 2 - 198, height / 2, 0, 16, 0x22c55e);
    fill.setOrigin(0, 0.5);

    this.load.on('progress', (value: number) => {
      fill.width = 396 * value;
    });

    // Character sprites
    this.load.image('char_arjun', 'assets/characters/arjun.png');
    this.load.image('char_priya', 'assets/characters/priya.png');
    this.load.image('char_rahul', 'assets/characters/rahul.png');
    this.load.image('char_meera', 'assets/characters/meera-family.png');
  }

  create(): void {
    this.scene.start('TitleScene');
  }
}
