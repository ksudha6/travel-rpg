import Phaser from 'phaser';

import { PreloadScene } from '../scenes/PreloadScene';
import { TitleScene } from '../scenes/TitleScene';
import { MarketScene } from '../scenes/MarketScene';
import { DreamingScene } from '../scenes/DreamingScene';
import { PreDepartureScene } from '../scenes/PreDepartureScene';
import { InTransitScene } from '../scenes/InTransitScene';
import { OnGroundScene } from '../scenes/OnGroundScene';
import { PostTripScene } from '../scenes/PostTripScene';
import { HypothesesScene } from '../scenes/HypothesesScene';
import { CompetitiveScene } from '../scenes/CompetitiveScene';
import { GTMScene } from '../scenes/GTMScene';
import { PunchlineScene } from '../scenes/PunchlineScene';

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
  scene: [
    PreloadScene,
    TitleScene,
    MarketScene,
    DreamingScene,
    PreDepartureScene,
    InTransitScene,
    OnGroundScene,
    PostTripScene,
    HypothesesScene,
    CompetitiveScene,
    GTMScene,
    PunchlineScene,
  ],
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
