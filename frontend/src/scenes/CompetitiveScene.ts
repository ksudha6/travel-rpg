import Phaser from 'phaser';
import { COMPETITIVE_POSITIONING } from '@/data/strategy';
import { COLORS, TEXT, FONT } from '@/ui/sceneConstants';

export class CompetitiveScene extends Phaser.Scene {
  private currentStep = 0;
  private stepObjects: Phaser.GameObjects.GameObject[] = [];
  private transitioning = false;

  constructor() {
    super({ key: 'CompetitiveScene' });
  }

  create(): void {
    try {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      this.currentStep = 0;
      this.stepObjects = [];
      this.transitioning = false;
      this.showStep();

      this.input.on('pointerdown', () => this.advanceStep());
      this.input.keyboard?.on('keydown-SPACE', () => this.advanceStep());
    } catch (error) {
      console.error('CompetitiveScene failed to create:', error);
      const { width, height } = this.scale;
      this.add
        .text(width / 2, height / 2, 'Something went wrong.', {
          fontFamily: FONT,
          fontSize: '24px',
          color: TEXT.RED,
        })
        .setOrigin(0.5);
    }
  }

  private track<T extends Phaser.GameObjects.GameObject>(obj: T): T {
    this.stepObjects.push(obj);
    return obj;
  }

  private clearStep(): void {
    this.stepObjects.forEach((obj) => obj.destroy());
    this.stepObjects = [];
  }

  private advanceStep(): void {
    if (this.transitioning) return;
    this.currentStep++;
    if (this.currentStep > 2) {
      this.transitioning = true;
      this.input.removeAllListeners();
      this.input.keyboard?.removeAllListeners();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('GTMScene');
      });
      return;
    }
    this.clearStep();
    this.showStep();
  }

  private showStep(): void {
    const { width, height } = this.scale;
    switch (this.currentStep) {
      case 0:
        this.renderMatrix(width, height);
        break;
      case 1:
        this.renderBarriers(width, height);
        break;
      case 2:
        this.renderWindow(width, height);
        break;
    }
  }

  // ── Step 0: 2x2 Competitive Matrix ───────────────────────────

  private renderMatrix(width: number, height: number): void {
    this.track(
      this.add
        .text(width / 2, 18, 'The Competitive Truth', {
          fontFamily: FONT,
          fontSize: '24px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    // Matrix dimensions
    const mW = 800;
    const mH = 440;
    const mX = width / 2 - mW / 2;
    const mY = 70;
    const midX = mX + mW / 2;
    const midY = mY + mH / 2;

    // Draw axes
    const gfx = this.track(this.add.graphics());
    gfx.lineStyle(2, 0x444444);
    // Vertical divider
    gfx.lineBetween(midX, mY, midX, mY + mH);
    // Horizontal divider
    gfx.lineBetween(mX, midY, mX + mW, midY);
    // Border
    gfx.lineStyle(1, 0x333333);
    gfx.strokeRect(mX, mY, mW, mH);

    // Axis labels
    this.track(
      this.add
        .text(width / 2, mY + mH + 10, 'Single Phase  ←→  Full Journey', {
          fontFamily: FONT,
          fontSize: '13px',
          color: TEXT.SUB,
        })
        .setOrigin(0.5, 0),
    );

    this.track(
      this.add
        .text(mX - 12, midY, 'Transactional\n     ↑\nCompanion', {
          fontFamily: FONT,
          fontSize: '11px',
          color: TEXT.SUB,
          align: 'center',
        })
        .setOrigin(1, 0.5),
    );

    // Competitor placements
    const competitors = [
      { name: 'MakeMyTrip', x: mX + mW * 0.25, y: midY + mH * 0.2 },
      { name: 'iVisa', x: mX + mW * 0.15, y: midY + mH * 0.35 },
      { name: 'Headout', x: mX + mW * 0.35, y: midY + mH * 0.15 },
      { name: 'EaseMyTrip', x: mX + mW * 0.3, y: midY + mH * 0.3 },
      { name: 'ChatGPT', x: mX + mW * 0.2, y: midY - mH * 0.2 },
    ];

    competitors.forEach((c) => {
      this.track(this.add.circle(c.x, c.y, 8, 0x666666, 0.8));
      this.track(
        this.add
          .text(c.x + 12, c.y - 6, c.name, {
            fontFamily: FONT,
            fontSize: '10px',
            color: '#999999',
          }),
      );
    });

    // Top-right quadrant — ATLYS opportunity (empty, glowing)
    const trX = midX;
    const trY = mY;
    const trW = mW / 2;
    const trH = mH / 2;

    const glowRect = this.track(
      this.add
        .rectangle(trX + trW / 2, trY + trH / 2, trW - 10, trH - 10, 0x0a2a0a, 0.3)
        .setStrokeStyle(2, COLORS.ATLYS_GREEN),
    );

    this.tweens.add({
      targets: glowRect,
      alpha: { from: 0.2, to: 0.5 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    this.track(
      this.add
        .text(trX + trW / 2, trY + trH / 2 - 10, '★ ATLYS?', {
          fontFamily: FONT,
          fontSize: '20px',
          color: TEXT.GREEN,
          fontStyle: 'bold',
        })
        .setOrigin(0.5),
    );

    this.track(
      this.add
        .text(trX + trW / 2, trY + trH / 2 + 16, 'Nobody is here.', {
          fontFamily: FONT,
          fontSize: '12px',
          color: TEXT.GREEN,
        })
        .setOrigin(0.5),
    );

    // Bottom text
    this.track(
      this.add
        .text(
          width / 2,
          mY + mH + 36,
          'Nobody owns the Full Journey + Companion quadrant.',
          {
            fontFamily: FONT,
            fontSize: '16px',
            color: TEXT.WHITE,
          },
        )
        .setOrigin(0.5, 0),
    );

    // Prompt
    const prompt = this.track(
      this.add
        .text(width / 2, height - 30, 'Click to continue', {
          fontFamily: FONT,
          fontSize: '14px',
          color: TEXT.MUTED,
        })
        .setOrigin(0.5),
    );
    this.tweens.add({ targets: prompt, alpha: { from: 0.3, to: 1 }, duration: 1000, yoyo: true, repeat: -1 });
  }

  // ── Step 1: Barriers ─────────────────────────────────────────

  private renderBarriers(width: number, height: number): void {
    const colW = 540;
    const gap = 40;
    const leftX = width / 2 - colW - gap / 2;
    const rightX = width / 2 + gap / 2;

    // Left column: Headout barriers
    this.track(
      this.add.text(leftX, 20, "Why Headout Can't Add Visas", {
        fontFamily: FONT,
        fontSize: '16px',
        color: TEXT.RED,
        fontStyle: 'bold',
      }),
    );

    COMPETITIVE_POSITIONING.headoutBarrier.forEach((item, i) => {
      this.track(
        this.add.text(leftX, 55 + i * 80, `${i + 1}.`, {
          fontFamily: FONT,
          fontSize: '13px',
          color: TEXT.RED,
          fontStyle: 'bold',
        }),
      );
      this.track(
        this.add.text(leftX + 24, 55 + i * 80, item, {
          fontFamily: FONT,
          fontSize: '12px',
          color: '#dddddd',
          wordWrap: { width: colW - 30 },
        }),
      );
    });

    // Right column: Atlys barriers
    this.track(
      this.add.text(rightX, 20, "Why Atlys Can't Just Add Activities", {
        fontFamily: FONT,
        fontSize: '16px',
        color: '#f59e0b',
        fontStyle: 'bold',
      }),
    );

    COMPETITIVE_POSITIONING.atlysBarrier.forEach((item, i) => {
      this.track(
        this.add.text(rightX, 55 + i * 80, `${i + 1}.`, {
          fontFamily: FONT,
          fontSize: '13px',
          color: '#f59e0b',
          fontStyle: 'bold',
        }),
      );
      this.track(
        this.add.text(rightX + 24, 55 + i * 80, item, {
          fontFamily: FONT,
          fontSize: '12px',
          color: '#dddddd',
          wordWrap: { width: colW - 30 },
        }),
      );
    });

    // Prompt
    const prompt = this.track(
      this.add
        .text(width / 2, height - 30, 'Click to continue', {
          fontFamily: FONT,
          fontSize: '14px',
          color: TEXT.MUTED,
        })
        .setOrigin(0.5),
    );
    this.tweens.add({ targets: prompt, alpha: { from: 0.3, to: 1 }, duration: 1000, yoyo: true, repeat: -1 });
  }

  // ── Step 2: The 18-Month Window ──────────────────────────────

  private renderWindow(width: number, height: number): void {
    this.track(
      this.add
        .text(width / 2, height / 2 - 80, 'The 18-Month Window', {
          fontFamily: FONT,
          fontSize: '28px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5),
    );

    const windowText = this.track(
      this.add
        .text(width / 2, height / 2, COMPETITIVE_POSITIONING.window, {
          fontFamily: FONT,
          fontSize: '18px',
          color: TEXT.GREEN,
          align: 'center',
          wordWrap: { width: 900 },
        })
        .setOrigin(0.5)
        .setAlpha(0),
    );

    this.tweens.add({ targets: windowText, alpha: 1, duration: 800 });

    const prompt = this.track(
      this.add
        .text(width / 2, height - 50, '→ Next: Go-To-Market', {
          fontFamily: FONT,
          fontSize: '16px',
          color: TEXT.GREEN,
        })
        .setOrigin(0.5),
    );
    this.tweens.add({ targets: prompt, alpha: { from: 0.4, to: 1 }, duration: 1000, yoyo: true, repeat: -1 });
  }
}
