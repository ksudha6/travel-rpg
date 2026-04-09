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
      const gfx = this.add.graphics();

      // ── Night sky with gradient ──────────────────────────
      gfx.fillStyle(0x0a0a1a, 1);
      gfx.fillRect(0, 0, width, height);

      // Horizon warm glow (dawn)
      gfx.fillStyle(0x1a1030, 0.8);
      gfx.fillRect(0, height * 0.5, width, height * 0.2);
      gfx.fillStyle(0x2a1535, 0.5);
      gfx.fillRect(0, height * 0.4, width, height * 0.15);

      // Stars
      for (let i = 0; i < 80; i++) {
        const sx = Phaser.Math.Between(0, width);
        const sy = Phaser.Math.Between(0, height * 0.5);
        const size = Phaser.Math.FloatBetween(0.5, 2);
        const alpha = Phaser.Math.FloatBetween(0.15, 0.6);
        gfx.fillStyle(0xffffff, alpha);
        gfx.fillCircle(sx, sy, size);
      }

      // Twinkling stars (animated)
      for (let i = 0; i < 12; i++) {
        const star = this.add.circle(
          Phaser.Math.Between(40, width - 40),
          Phaser.Math.Between(20, height * 0.45),
          Phaser.Math.FloatBetween(1, 2.5),
          0xffffff,
          0.3,
        );
        this.tweens.add({
          targets: star,
          alpha: { from: 0.15, to: 0.7 },
          duration: Phaser.Math.Between(1500, 3000),
          yoyo: true,
          repeat: -1,
          delay: Phaser.Math.Between(0, 2000),
        });
      }

      // ── Ground — warm earth tone ────────────────────────
      const groundY = height * ANCHOR.GROUND_Y;
      gfx.fillStyle(0x1a1520, 1);
      gfx.fillRect(0, groundY, width, height - groundY);

      // Horizon line glow
      gfx.fillStyle(0xffdb58, 0.08);
      gfx.fillRect(0, groundY - 2, width, 6);

      // ── Silhouette buildings (distant city) ─────────────
      const cityBuildings = [
        { x: 60, w: 50, h: 80 },
        { x: 120, w: 35, h: 120 },
        { x: 165, w: 55, h: 65 },
        { x: 800, w: 40, h: 100 },
        { x: 850, w: 60, h: 140 },
        { x: 920, w: 45, h: 90 },
        { x: 980, w: 55, h: 110 },
        { x: 1050, w: 35, h: 70 },
        { x: 1100, w: 50, h: 130 },
        { x: 1160, w: 40, h: 85 },
      ];
      gfx.fillStyle(0x0e0e18, 0.9);
      for (const b of cityBuildings) {
        gfx.fillRect(b.x, groundY - b.h, b.w, b.h);
      }
      // Tiny warm windows
      gfx.fillStyle(0xffcc44, 0.15);
      for (const b of cityBuildings) {
        for (let r = 0; r < Math.floor(b.h / 20); r++) {
          for (let c = 0; c < Math.floor(b.w / 15); c++) {
            if (Math.random() > 0.5) {
              gfx.fillRect(b.x + 4 + c * 15, groundY - b.h + 8 + r * 20, 6, 8);
            }
          }
        }
      }

      // ── Character sprite ────────────────────────────────
      const charSprite = this.add
        .image(width * 0.72, groundY, 'char_savi')
        .setScale(0.22)
        .setOrigin(0.5, 1)
        .setAlpha(0);

      // Character fades in with slight rise
      charSprite.y = groundY + 10;
      this.tweens.add({
        targets: charSprite,
        alpha: 1,
        y: groundY,
        duration: 1000,
        delay: 300,
        ease: 'Power2',
      });

      // ── Title text ──────────────────────────────────────
      const title = this.add
        .text(width * 0.35, height * 0.28, 'Atlys Travel\nExperience', {
          fontFamily: FONT,
          fontSize: '26px',
          color: '#ffffff',
          align: 'center',
          lineSpacing: 20,
        })
        .setOrigin(0.5)
        .setAlpha(0);

      this.tweens.add({
        targets: title,
        alpha: 1,
        duration: 1200,
        delay: 500,
      });

      // Subtitle
      const subtitle = this.add
        .text(width * 0.35, height * 0.46, `India's ${TAM.current} travel market`, {
          fontFamily: FONT,
          fontSize: '9px',
          color: '#888888',
          lineSpacing: 8,
        })
        .setOrigin(0.5)
        .setAlpha(0);

      this.tweens.add({
        targets: subtitle,
        alpha: 1,
        duration: 800,
        delay: 1000,
      });

      // ── Start Journey CTA ───────────────────────────────
      const cta = this.add
        .text(width * 0.35, height * 0.58, '[ Start Journey ]', {
          fontFamily: FONT,
          fontSize: '12px',
          color: '#ffdb58',
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .setAlpha(0);

      this.tweens.add({
        targets: cta,
        alpha: 1,
        duration: 600,
        delay: 1500,
        onComplete: () => {
          // Pulse after appearing
          this.tweens.add({
            targets: cta,
            alpha: { from: 0.5, to: 1 },
            duration: 1200,
            yoyo: true,
            repeat: -1,
          });
        },
      });

      // ── Mute toggle ─────────────────────────────────────
      const muteBtn = this.add
        .text(width - 16, 12, 'M', {
          fontFamily: FONT,
          fontSize: '10px',
          color: '#555555',
        })
        .setOrigin(1, 0)
        .setInteractive({ useHandCursor: true });
      muteBtn.on('pointerdown', () => {
        this.sound.mute = !this.sound.mute;
        muteBtn.setColor(this.sound.mute ? '#aa4444' : '#555555');
      });

      // ── Input ───────────────────────────────────────────
      cta.on('pointerdown', () => this.advance());
      this.input.keyboard?.once('keydown-SPACE', () => this.advance());
      this.input.keyboard?.on('keydown-M', () => {
        this.sound.mute = !this.sound.mute;
        muteBtn.setColor(this.sound.mute ? '#aa4444' : '#555555');
      });
    } catch (error) {
      console.error('TitleScene failed to create:', error);
      this.add
        .text(640, 360, 'Something went wrong.', {
          fontFamily: FONT,
          fontSize: '12px',
          color: '#ff4444',
        })
        .setOrigin(0.5);
    }
  }

  private advance(): void {
    try {
      if (this.cache.audio.exists('bgm')) {
        this.sound.play('bgm', { loop: true, volume: 0.15 });
      }
    } catch (e) {
      console.error('[AUDIO] failed to play:', e);
    }
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MarketScene');
    });
  }
}
