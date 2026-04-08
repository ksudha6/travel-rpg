import Phaser from 'phaser';

// Scene imports will be added as iterations build them
// import { TitleScene } from '../scenes/TitleScene';

export const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 1280,
  height: 720,
  backgroundColor: '#0a0a0a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [], // populated per iteration
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  pixelArt: true, // LEGO pixel art style — no anti-aliasing
  roundPixels: true,
};
