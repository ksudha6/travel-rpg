import Phaser from 'phaser';
import { COMPETITIVE_POSITIONING } from '@/data/strategy';
import { COLORS, TEXT, FONT, typeText, drawPixelGrid, TypewriterText, addRestartButton } from '@/ui/sceneConstants';

export class CompetitiveScene extends Phaser.Scene {
  private currentBeat = 0;
  private beatObjects: Phaser.GameObjects.GameObject[] = [];
  private activeTypewriter: TypewriterText | null = null;
  private transitioning = false;

  constructor() {
    super({ key: 'CompetitiveScene' });
  }

  create(): void {
    try {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      const { width, height } = this.scale;
      this.currentBeat = 0;
      this.beatObjects = [];
      this.activeTypewriter = null;
      this.transitioning = false;

      drawPixelGrid(this, width, height);
      addRestartButton(this);
      this.showBeat();

      this.input.on('pointerdown', (_pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
        if (currentlyOver.length > 0) return;
        this.handleClick();
      });
      this.input.keyboard?.on('keydown-SPACE', () => this.handleClick());
    } catch (error) {
      console.error('CompetitiveScene failed to create:', error);
      const { width, height } = this.scale;
      this.add.text(width / 2, height / 2, 'Something went wrong.', {
        fontFamily: FONT, fontSize: '10px', color: TEXT.RED,
      }).setOrigin(0.5);
    }
  }

  private handleClick(): void {
    if (this.transitioning) return;
    if (this.activeTypewriter?.skipTyping()) return;
    this.currentBeat++;
    if (this.currentBeat > 3) {
      this.transitioning = true;
      this.input.removeAllListeners();
      this.input.keyboard?.removeAllListeners();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('GTMScene');
      });
      return;
    }
    this.clearBeat();
    this.showBeat();
  }

  private clearBeat(): void {
    this.activeTypewriter = null;
    this.beatObjects.forEach((obj) => obj.destroy());
    this.beatObjects = [];
  }

  private track<T extends Phaser.GameObjects.GameObject>(obj: T): T {
    this.beatObjects.push(obj);
    return obj;
  }

  private showBeat(): void {
    const { width, height } = this.scale;
    switch (this.currentBeat) {
      case 0: this.beatMatrix(width, height); break;
      case 1: this.beatBarriers(width, height); break;
      case 2: this.beatWindow(width, height); break;
      case 3: this.beatAdvance(width, height); break;
    }
  }

  // ── Beat 0: 2x2 Matrix ──────────────────────────────────────

  private beatMatrix(width: number, height: number): void {
    this.track(this.add.text(width / 2, 15, 'The Competitive Truth', {
      fontFamily: FONT, fontSize: '12px', color: TEXT.WHITE,
    }).setOrigin(0.5, 0));

    const mW = 700;
    const mH = 380;
    const mX = width / 2 - mW / 2;
    const mY = 60;
    const midX = mX + mW / 2;
    const midY = mY + mH / 2;

    const gfx = this.track(this.add.graphics());
    gfx.lineStyle(1, 0x444444);
    gfx.lineBetween(midX, mY, midX, mY + mH);
    gfx.lineBetween(mX, midY, mX + mW, midY);
    gfx.lineStyle(1, 0x333333);
    gfx.strokeRect(mX, mY, mW, mH);

    // Axis labels
    this.track(this.add.text(width / 2, mY + mH + 8, 'Single Phase  ---  Full Journey', {
      fontFamily: FONT, fontSize: '7px', color: TEXT.SUB,
    }).setOrigin(0.5, 0));

    this.track(this.add.text(mX - 8, midY, 'Transactional\n     |\nCompanion', {
      fontFamily: FONT, fontSize: '6px', color: TEXT.SUB, align: 'right',
    }).setOrigin(1, 0.5));

    // Competitors in bottom-left (transactional, single phase)
    const placements = [
      { name: 'MakeMyTrip', x: mX + mW * 0.22, y: midY + mH * 0.18 },
      { name: 'iVisa', x: mX + mW * 0.12, y: midY + mH * 0.32 },
      { name: 'Headout', x: mX + mW * 0.35, y: midY + mH * 0.12 },
      { name: 'ChatGPT', x: mX + mW * 0.18, y: midY - mH * 0.18 },
    ];

    placements.forEach((c) => {
      this.track(this.add.circle(c.x, c.y, 6, 0x666666, 0.8));
      this.track(this.add.text(c.x + 10, c.y - 5, c.name, {
        fontFamily: FONT, fontSize: '6px', color: '#888888',
      }));
    });

    // Top-right: ATLYS opportunity
    const trX = midX + 5;
    const trY = mY + 5;
    const trW = mW / 2 - 10;
    const trH = mH / 2 - 10;

    const glow = this.track(
      this.add.rectangle(trX + trW / 2, trY + trH / 2, trW, trH, 0x0a2a0a, 0.3)
        .setStrokeStyle(2, COLORS.ATLYS_GREEN),
    );
    this.tweens.add({ targets: glow, alpha: { from: 0.2, to: 0.5 }, duration: 1000, yoyo: true, repeat: -1 });

    this.track(this.add.text(trX + trW / 2, trY + trH / 2, 'ATLYS?', {
      fontFamily: FONT, fontSize: '12px', color: TEXT.GREEN,
    }).setOrigin(0.5));

    // Narration below
    const tw = typeText(this, width / 2, mY + mH + 30,
      'Nobody owns the Full Journey + Companion quadrant.',
      { fontFamily: FONT, fontSize: '8px', color: TEXT.WHITE },
    );
    tw.setOrigin(0.5, 0);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 1: Barriers ────────────────────────────────────────

  private beatBarriers(width: number, height: number): void {
    const colW = 500;
    const leftX = width / 2 - colW - 20;
    const rightX = width / 2 + 20;

    this.track(this.add.text(leftX, 20, "Why Headout can't\nadd visas", {
      fontFamily: FONT, fontSize: '9px', color: TEXT.RED, lineSpacing: 24,
    }));

    COMPETITIVE_POSITIONING.headoutBarrier.forEach((item, i) => {
      this.track(this.add.text(leftX, 65 + i * 60, `${i + 1}. ${item}`, {
        fontFamily: FONT, fontSize: '6px', color: '#dddddd', wordWrap: { width: colW },
      }));
    });

    this.track(this.add.text(rightX, 20, "Why Atlys can't just\nadd activities", {
      fontFamily: FONT, fontSize: '9px', color: '#f59e0b', lineSpacing: 24,
    }));

    COMPETITIVE_POSITIONING.atlysBarrier.forEach((item, i) => {
      this.track(this.add.text(rightX, 65 + i * 60, `${i + 1}. ${item}`, {
        fontFamily: FONT, fontSize: '6px', color: '#dddddd', wordWrap: { width: colW },
      }));
    });
  }

  // ── Beat 2: The 18-Month Window ─────────────────────────────

  private beatWindow(width: number, height: number): void {
    this.track(this.add.text(width / 2, height / 2 - 60, 'The 18-Month Window', {
      fontFamily: FONT, fontSize: '12px', color: TEXT.WHITE,
    }).setOrigin(0.5));

    const tw = typeText(this, width / 2, height / 2,
      COMPETITIVE_POSITIONING.window,
      { fontFamily: FONT, fontSize: '9px', color: TEXT.GREEN, align: 'center', wordWrap: { width: 800 } },
    );
    tw.setOrigin(0.5, 0);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 3: Advance ─────────────────────────────────────────

  private beatAdvance(width: number, height: number): void {
    const prompt = this.track(this.add.text(width / 2, height / 2, '→ Go-To-Market', {
      fontFamily: FONT, fontSize: '10px', color: TEXT.GREEN,
    }).setOrigin(0.5));
    this.tweens.add({ targets: prompt, alpha: { from: 0.4, to: 1 }, duration: 1000, yoyo: true, repeat: -1 });
  }
}
