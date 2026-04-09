import Phaser from 'phaser';
import { HYPOTHESES } from '@/data/strategy';
import { COLORS, TEXT, FONT, typeText, drawPixelGrid, TypewriterText } from '@/ui/sceneConstants';

export class HypothesesScene extends Phaser.Scene {
  private currentBeat = 0;
  private beatObjects: Phaser.GameObjects.GameObject[] = [];
  private activeTypewriter: TypewriterText | null = null;
  private transitioning = false;

  constructor() {
    super({ key: 'HypothesesScene' });
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
      this.showBeat();

      this.input.on('pointerdown', () => this.handleClick());
      this.input.keyboard?.on('keydown-SPACE', () => this.handleClick());
    } catch (error) {
      console.error('HypothesesScene failed to create:', error);
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
    if (this.currentBeat > 2) {
      this.transitioning = true;
      this.input.removeAllListeners();
      this.input.keyboard?.removeAllListeners();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('CompetitiveScene');
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
      case 0: this.beatIntro(width, height); break;
      case 1: this.beatCards(width, height); break;
      case 2: this.beatHonesty(width, height); break;
    }
  }

  // ── Beat 0: Narrated intro ──────────────────────────────────

  private beatIntro(width: number, height: number): void {
    const tw = typeText(
      this, width / 2, height / 2,
      'Three hypotheses.\nScored honestly.',
      { fontFamily: FONT, fontSize: '12px', color: TEXT.WHITE, align: 'center', lineSpacing: 10 },
    );
    tw.setOrigin(0.5);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 1: Cards appear ────────────────────────────────────

  private beatCards(width: number, height: number): void {
    const cardW = 380;
    const cardH = 500;
    const gap = 20;
    const totalW = cardW * 3 + gap * 2;
    const startX = (width - totalW) / 2;
    const cardY = 50;

    HYPOTHESES.forEach((hyp, i) => {
      const x = startX + i * (cardW + gap);
      const cx = x + cardW / 2;
      const isH2 = hyp.id === 'h2';

      // Card bg
      const card = this.track(
        this.add.rectangle(cx, cardY + cardH / 2, cardW, cardH, COLORS.CARD_BG, 0.95)
          .setStrokeStyle(isH2 ? 3 : 1, isH2 ? COLORS.ATLYS_GREEN : COLORS.CARD_BORDER),
      );
      if (isH2) {
        this.tweens.add({ targets: card, alpha: { from: 0.85, to: 1 }, duration: 800, yoyo: true, repeat: -1 });
      }

      // ID label
      this.track(this.add.text(cx, cardY + 14, hyp.id.toUpperCase(), {
        fontFamily: FONT, fontSize: '8px', color: isH2 ? TEXT.GREEN : TEXT.MUTED,
      }).setOrigin(0.5, 0));

      // Title
      this.track(this.add.text(cx, cardY + 32, hyp.title, {
        fontFamily: FONT, fontSize: '7px', color: TEXT.WHITE,
        align: 'center', wordWrap: { width: cardW - 24 },
      }).setOrigin(0.5, 0));

      // Thesis
      this.track(this.add.text(cx, cardY + 75, hyp.thesis, {
        fontFamily: FONT, fontSize: '6px', color: TEXT.SUB,
        wordWrap: { width: cardW - 24 },
      }).setOrigin(0.5, 0));

      // Divider
      const gfx = this.track(this.add.graphics());
      gfx.lineStyle(1, 0x444444);
      gfx.lineBetween(x + 12, cardY + 210, x + cardW - 12, cardY + 210);

      // Score bars
      const scores = [
        { label: 'Defensibility', val: hyp.scores.defensibility },
        { label: 'Revenue', val: hyp.scores.revenue },
        { label: 'Feasibility', val: hyp.scores.feasibility },
        { label: 'Moat', val: hyp.scores.moat },
      ];

      scores.forEach((s, si) => {
        const barY = cardY + 230 + si * 38;
        const barX = x + 16;
        const barMaxW = 180;

        this.track(this.add.text(barX, barY - 12, `${s.label}  ${s.val}/10`, {
          fontFamily: FONT, fontSize: '6px', color: '#888888',
        }));

        this.track(this.add.rectangle(barX + barMaxW / 2, barY + 4, barMaxW, 10, 0x222222));
        const fillW = (s.val / 10) * barMaxW;
        const barColor = s.val >= 7 ? COLORS.ATLYS_GREEN : s.val >= 5 ? 0xf59e0b : COLORS.DANGER_RED;
        if (fillW > 0) {
          this.track(this.add.rectangle(barX + fillW / 2, barY + 4, fillW, 10, barColor));
        }
      });

      // Strength / Weakness
      this.track(this.add.text(x + 12, cardY + cardH - 70, `+ ${hyp.strength}`, {
        fontFamily: FONT, fontSize: '6px', color: TEXT.GREEN, wordWrap: { width: cardW - 24 },
      }));
      this.track(this.add.text(x + 12, cardY + cardH - 35, `- ${hyp.weakness}`, {
        fontFamily: FONT, fontSize: '6px', color: TEXT.RED, wordWrap: { width: cardW - 24 },
      }));
    });
  }

  // ── Beat 2: Honesty line ────────────────────────────────────

  private beatHonesty(width: number, height: number): void {
    const tw = typeText(
      this, width / 2, height / 2,
      'We are not presenting the best case.\nWe are presenting the honest one.',
      { fontFamily: FONT, fontSize: '10px', color: TEXT.WHITE, align: 'center', lineSpacing: 10 },
    );
    tw.setOrigin(0.5);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }
}
