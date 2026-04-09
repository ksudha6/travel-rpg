import Phaser from 'phaser';
import { HYPOTHESES } from '@/data/strategy';
import { COLORS, TEXT, FONT } from '@/ui/sceneConstants';

export class HypothesesScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HypothesesScene' });
  }

  create(): void {
    try {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      const { width, height } = this.scale;

      // Header
      this.add
        .text(width / 2, 20, 'Three Hypotheses — Scored Honestly', {
          fontFamily: FONT,
          fontSize: '24px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0);

      // 3 cards
      const cardW = 380;
      const cardH = 540;
      const gap = 20;
      const totalW = cardW * 3 + gap * 2;
      const startX = (width - totalW) / 2;
      const cardY = 70;

      HYPOTHESES.forEach((hyp, i) => {
        const x = startX + i * (cardW + gap);
        const centerX = x + cardW / 2;
        const isH2 = hyp.id === 'h2';

        // Card background
        const card = this.add.rectangle(
          centerX,
          cardY + cardH / 2,
          cardW,
          cardH,
          COLORS.CARD_BG,
          0.95,
        );
        card.setStrokeStyle(isH2 ? 3 : 1, isH2 ? COLORS.ATLYS_GREEN : COLORS.CARD_BORDER);

        if (isH2) {
          this.tweens.add({
            targets: card,
            alpha: { from: 0.85, to: 1 },
            duration: 800,
            yoyo: true,
            repeat: -1,
          });
        }

        // Hypothesis label
        this.add
          .text(centerX, cardY + 16, hyp.id.toUpperCase(), {
            fontFamily: FONT,
            fontSize: '14px',
            color: isH2 ? TEXT.GREEN : TEXT.MUTED,
            fontStyle: 'bold',
          })
          .setOrigin(0.5, 0);

        // Title
        this.add
          .text(centerX, cardY + 38, hyp.title, {
            fontFamily: FONT,
            fontSize: '14px',
            color: TEXT.WHITE,
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: cardW - 30 },
          })
          .setOrigin(0.5, 0);

        // Thesis
        this.add
          .text(centerX, cardY + 85, hyp.thesis, {
            fontFamily: FONT,
            fontSize: '11px',
            color: TEXT.SUB,
            wordWrap: { width: cardW - 30 },
          })
          .setOrigin(0.5, 0);

        // Divider
        const divY = cardY + 230;
        const line = this.add.graphics();
        line.lineStyle(1, 0x444444);
        line.lineBetween(x + 15, divY, x + cardW - 15, divY);

        // Score bars
        const scoreEntries = [
          { label: 'Defensibility', value: hyp.scores.defensibility },
          { label: 'Revenue', value: hyp.scores.revenue },
          { label: 'Feasibility', value: hyp.scores.feasibility },
          { label: 'Moat', value: hyp.scores.moat },
        ];

        scoreEntries.forEach((entry, si) => {
          const barY = divY + 24 + si * 42;
          const barMaxW = 180;
          const barH = 14;
          const barX = x + 20;

          // Label
          this.add.text(barX, barY - 14, entry.label, {
            fontFamily: FONT,
            fontSize: '10px',
            color: '#888888',
          });

          // Score text
          this.add
            .text(barX + barMaxW + 10, barY - 14, `${entry.value}/10`, {
              fontFamily: FONT,
              fontSize: '10px',
              color: TEXT.SUB,
            });

          // Background bar
          this.add.rectangle(
            barX + barMaxW / 2,
            barY,
            barMaxW,
            barH,
            0x222222,
          );

          // Filled bar
          const fillW = (entry.value / 10) * barMaxW;
          const barColor =
            entry.value >= 7 ? COLORS.ATLYS_GREEN : entry.value >= 5 ? 0xf59e0b : COLORS.DANGER_RED;

          if (fillW > 0) {
            this.add.rectangle(
              barX + fillW / 2,
              barY,
              fillW,
              barH,
              barColor,
            );
          }
        });

        // Strength
        this.add.text(x + 15, cardY + cardH - 80, `✓ ${hyp.strength}`, {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.GREEN,
          wordWrap: { width: cardW - 30 },
        });

        // Weakness
        this.add.text(x + 15, cardY + cardH - 45, `✗ ${hyp.weakness}`, {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.RED,
          wordWrap: { width: cardW - 30 },
        });
      });

      // Subtext
      this.add
        .text(
          width / 2,
          height - 40,
          'We are not presenting the best case. We are presenting the honest one.',
          {
            fontFamily: FONT,
            fontSize: '14px',
            color: TEXT.SUB,
            fontStyle: 'italic',
          },
        )
        .setOrigin(0.5);

      // Advance
      this.input.on('pointerdown', () => this.advance());
      this.input.keyboard?.on('keydown-SPACE', () => this.advance());
    } catch (error) {
      console.error('HypothesesScene failed to create:', error);
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
      this.scene.start('CompetitiveScene');
    });
  }
}
