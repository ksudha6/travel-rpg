import Phaser from 'phaser';
import { GTM_MOTIONS } from '@/data/strategy';
import { COLORS, TEXT, FONT } from '@/ui/sceneConstants';

export class GTMScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GTMScene' });
  }

  create(): void {
    try {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      const { width, height } = this.scale;

      // Header
      this.add
        .text(width / 2, 20, 'Go-To-Market Plays', {
          fontFamily: FONT,
          fontSize: '24px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0);

      // 3 motion cards
      const cardW = 380;
      const cardH = 460;
      const gap = 20;
      const totalW = cardW * 3 + gap * 2;
      const startX = (width - totalW) / 2;
      const cardY = 65;

      GTM_MOTIONS.forEach((motion, i) => {
        const x = startX + i * (cardW + gap);
        const centerX = x + cardW / 2;
        const isPartnership = motion.name.includes('Partnerships');

        // Card
        const card = this.add.rectangle(
          centerX,
          cardY + cardH / 2,
          cardW,
          cardH,
          COLORS.CARD_BG,
          0.95,
        );
        card.setStrokeStyle(
          isPartnership ? 3 : 1,
          isPartnership ? COLORS.ATLYS_GREEN : COLORS.CARD_BORDER,
        );

        if (isPartnership) {
          this.tweens.add({
            targets: card,
            alpha: { from: 0.85, to: 1 },
            duration: 800,
            yoyo: true,
            repeat: -1,
          });
        }

        // Name
        this.add
          .text(centerX, cardY + 18, motion.name, {
            fontFamily: FONT,
            fontSize: '14px',
            color: isPartnership ? TEXT.GREEN : TEXT.WHITE,
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: cardW - 30 },
          })
          .setOrigin(0.5, 0);

        // Fit score (circles)
        const scoreY = cardY + 65;
        for (let s = 0; s < 5; s++) {
          const cx = centerX - 50 + s * 25;
          const filled = s < motion.fitScore;
          this.add.circle(cx, scoreY, 8, filled ? COLORS.ATLYS_GREEN : 0x333333, filled ? 1 : 0.5);
        }

        this.add
          .text(centerX + 70, scoreY - 6, `Fit: ${motion.fitScore}/5`, {
            fontFamily: FONT,
            fontSize: '11px',
            color: TEXT.SUB,
          });

        // Mechanism
        this.add.text(x + 15, cardY + 95, 'Mechanism:', {
          fontFamily: FONT,
          fontSize: '11px',
          color: TEXT.GREEN,
        });

        this.add.text(x + 15, cardY + 115, motion.mechanism, {
          fontFamily: FONT,
          fontSize: '11px',
          color: '#dddddd',
          wordWrap: { width: cardW - 30 },
        });

        // Why it works
        this.add.text(x + 15, cardY + 240, 'Why it works:', {
          fontFamily: FONT,
          fontSize: '11px',
          color: TEXT.GREEN,
        });

        this.add.text(x + 15, cardY + 260, motion.whyItWorks, {
          fontFamily: FONT,
          fontSize: '11px',
          color: TEXT.SUB,
          wordWrap: { width: cardW - 30 },
        });

        // Timeline
        this.add
          .text(centerX, cardY + cardH - 20, motion.timeline, {
            fontFamily: FONT,
            fontSize: '10px',
            color: TEXT.MUTED,
          })
          .setOrigin(0.5, 1);
      });

      // Bottom text
      this.add
        .text(
          width / 2,
          height - 50,
          "Atlys Inside: Like Intel Inside — 'Visa by Atlys' in every OTA checkout.",
          {
            fontFamily: FONT,
            fontSize: '14px',
            color: TEXT.GREEN,
            align: 'center',
            wordWrap: { width: 900 },
          },
        )
        .setOrigin(0.5);

      // Advance
      this.input.on('pointerdown', () => this.advance());
      this.input.keyboard?.on('keydown-SPACE', () => this.advance());
    } catch (error) {
      console.error('GTMScene failed to create:', error);
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

  private advance(): void {
    this.input.removeAllListeners();
    this.input.keyboard?.removeAllListeners();
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('PunchlineScene');
    });
  }
}
