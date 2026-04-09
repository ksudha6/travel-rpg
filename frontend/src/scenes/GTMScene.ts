import Phaser from 'phaser';
import { GTM_MOTIONS } from '@/data/strategy';
import { COLORS, TEXT, FONT, typeText, drawPixelGrid, TypewriterText } from '@/ui/sceneConstants';

export class GTMScene extends Phaser.Scene {
  private currentBeat = 0;
  private beatObjects: Phaser.GameObjects.GameObject[] = [];
  private activeTypewriter: TypewriterText | null = null;
  private transitioning = false;

  constructor() {
    super({ key: 'GTMScene' });
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
      console.error('GTMScene failed to create:', error);
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
        this.scene.start('PunchlineScene');
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
      case 2: this.beatAtlysInside(width, height); break;
    }
  }

  // ── Beat 0: Narrated intro ──────────────────────────────────

  private beatIntro(width: number, height: number): void {
    const tw = typeText(
      this, width / 2, height / 2,
      'Three paths to market.\nOne clear winner.',
      { fontFamily: FONT, fontSize: '12px', color: TEXT.WHITE, align: 'center', lineSpacing: 10 },
    );
    tw.setOrigin(0.5);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 1: GTM cards ──────────────────────────────────────

  private beatCards(width: number, height: number): void {
    this.track(this.add.text(width / 2, 15, 'Go-To-Market Plays', {
      fontFamily: FONT, fontSize: '12px', color: TEXT.WHITE,
    }).setOrigin(0.5, 0));

    const cardW = 380;
    const cardH = 420;
    const gap = 20;
    const totalW = cardW * 3 + gap * 2;
    const startX = (width - totalW) / 2;
    const cardY = 50;

    GTM_MOTIONS.forEach((motion, i) => {
      const x = startX + i * (cardW + gap);
      const cx = x + cardW / 2;
      const isPrimary = motion.name.includes('Partnerships');

      const card = this.track(
        this.add.rectangle(cx, cardY + cardH / 2, cardW, cardH, COLORS.CARD_BG, 0.95)
          .setStrokeStyle(isPrimary ? 3 : 1, isPrimary ? COLORS.ATLYS_GREEN : COLORS.CARD_BORDER),
      );
      if (isPrimary) {
        this.tweens.add({ targets: card, alpha: { from: 0.85, to: 1 }, duration: 800, yoyo: true, repeat: -1 });
      }

      // Name
      this.track(this.add.text(cx, cardY + 14, motion.name, {
        fontFamily: FONT, fontSize: '7px', color: isPrimary ? TEXT.GREEN : TEXT.WHITE,
        align: 'center', wordWrap: { width: cardW - 24 },
      }).setOrigin(0.5, 0));

      // Fit score circles
      const scoreY = cardY + 55;
      for (let s = 0; s < 5; s++) {
        const filled = s < motion.fitScore;
        this.track(this.add.circle(cx - 40 + s * 20, scoreY, 6,
          filled ? COLORS.ATLYS_GREEN : 0x333333, filled ? 1 : 0.5));
      }

      // Mechanism
      this.track(this.add.text(x + 12, cardY + 80, 'Mechanism:', {
        fontFamily: FONT, fontSize: '6px', color: TEXT.GREEN,
      }));
      this.track(this.add.text(x + 12, cardY + 96, motion.mechanism, {
        fontFamily: FONT, fontSize: '6px', color: '#dddddd', wordWrap: { width: cardW - 24 },
      }));

      // Why it works
      this.track(this.add.text(x + 12, cardY + 210, 'Why it works:', {
        fontFamily: FONT, fontSize: '6px', color: TEXT.GREEN,
      }));
      this.track(this.add.text(x + 12, cardY + 226, motion.whyItWorks, {
        fontFamily: FONT, fontSize: '6px', color: TEXT.SUB, wordWrap: { width: cardW - 24 },
      }));

      // Timeline
      this.track(this.add.text(cx, cardY + cardH - 16, motion.timeline, {
        fontFamily: FONT, fontSize: '6px', color: TEXT.MUTED,
      }).setOrigin(0.5, 1));
    });
  }

  // ── Beat 2: Atlys Inside ───────────────────────────────────

  private beatAtlysInside(width: number, height: number): void {
    const tw = typeText(
      this, width / 2, height / 2,
      "Like Intel Inside.\n'Visa by Atlys' in every OTA checkout.\nAtlys becomes the infrastructure,\nnot the destination.",
      { fontFamily: FONT, fontSize: '9px', color: TEXT.GREEN, align: 'center', lineSpacing: 10 },
    );
    tw.setOrigin(0.5);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }
}
