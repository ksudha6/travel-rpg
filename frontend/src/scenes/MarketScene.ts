import Phaser from 'phaser';
import { TAM, MARKET_SEGMENTS } from '@/data/market';
import { PERSONAS } from '@/data/personas';
import { PersonaId } from '../../../shared/types';
import {
  TEXT,
  FONT,
  COLORS,
  ANCHOR,
  typeText,
  TypewriterText,
  addRestartButton,
  slideCharacter,
  exitRight,
} from '@/ui/sceneConstants';
import { drawGarden } from '@/ui/backgrounds';

/**
 * MarketScene — "The Market Nobody Sees Whole" (STORY.md Act 1)
 *
 * Beat-based narration:
 * 0: "₹18,00,000 crore."
 * 1: "That's the Indian travel market by 2030."
 * 2: 7 segments appear as a list, Visas glows green
 * 3: "Atlys owns 1–2% of this pie. The other 98% is the journey."
 * 4: 4 character sprites appear — "Pick your traveler."
 * 5: Click a character → start journey
 */
export class MarketScene extends Phaser.Scene {
  private currentBeat = 0;
  private beatObjects: Phaser.GameObjects.GameObject[] = [];
  private activeTypewriter: TypewriterText | null = null;
  private characterSelectActive = false;
  private characterSprites: Map<PersonaId, Phaser.GameObjects.Image> = new Map();

  constructor() {
    super({ key: 'MarketScene' });
  }

  create(): void {
    try {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      const { width, height } = this.scale;
      this.currentBeat = 0;
      this.beatObjects = [];
      this.activeTypewriter = null;
      this.characterSelectActive = false;

      drawGarden(this);
      addRestartButton(this);

      this.showBeat();

      this.input.on('pointerdown', (_pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
        if (currentlyOver.length > 0) return;
        this.handleClick();
      });
      this.input.keyboard?.on('keydown-SPACE', () => this.handleClick());
    } catch (error) {
      console.error('MarketScene failed to create:', error);
      const { width, height } = this.scale;
      this.add
        .text(width / 2, height / 2, 'Something went wrong.', {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.RED,
        })
        .setOrigin(0.5);
    }
  }

  private handleClick(): void {
    if (this.characterSelectActive) return;
    if (this.activeTypewriter?.skipTyping()) return;

    this.currentBeat++;
    if (this.currentBeat > 4) return; // beat 4 is character select, handled separately
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
      case 0: this.beat0_Amount(width, height); break;
      case 1: this.beat1_Context(width, height); break;
      case 2: this.beat2_Segments(width, height); break;
      case 3: this.beat3_AtlysPie(width, height); break;
      case 4: this.beat4_CharacterSelect(width, height); break;
    }
  }

  // ── Beat 0: The big number ───────────────────────────────────

  private beat0_Amount(width: number, height: number): void {
    const tw = typeText(this, width / 2, height / 2, TAM.currentINR, {
      fontFamily: FONT,
      fontSize: '18px',
      color: TEXT.WHITE,
    });
    tw.setOrigin(0.5);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 1: What the number means ────────────────────────────

  private beat1_Context(width: number, height: number): void {
    // Keep the big number
    this.track(
      this.add
        .text(width / 2, height / 2 - 40, TAM.currentINR, {
          fontFamily: FONT,
          fontSize: '18px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5),
    );

    const tw = typeText(
      this,
      width / 2,
      height / 2 + 20,
      "That's the Indian travel market by 2030.",
      {
        fontFamily: FONT,
        fontSize: '9px',
        color: TEXT.SUB,
      },
    );
    tw.setOrigin(0.5);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 2: Segments as garden plots ─────────────────────────

  private beat2_Segments(width: number, height: number): void {
    // Header
    this.track(
      this.add
        .text(width / 2, 30, TAM.currentINR, {
          fontFamily: FONT,
          fontSize: '12px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    // 7 segment plots as colored rectangles (2 rows: 4 top + 3 bottom)
    const plotW = 130;
    const plotH = 55;
    const groundY = height * ANCHOR.GROUND_Y;
    const topY = groundY + 15;
    const botY = groundY + 85;

    MARKET_SEGMENTS.forEach((seg, i) => {
      const isAtlys = seg.atlysPresent;
      const row = i < 4 ? 0 : 1;
      const col = row === 0 ? i : i - 4;
      const cols = row === 0 ? 4 : 3;
      const rowY = row === 0 ? topY : botY;
      const totalW = cols * (plotW + 16) - 16;
      const startX = (width - totalW) / 2;
      const px = startX + col * (plotW + 16);

      // Plot rectangle
      const plotColor = isAtlys ? COLORS.ATLYS_GREEN : 0x2a4a3a;
      const plotAlpha = isAtlys ? 0.8 : 0.5;
      const rect = this.track(
        this.add.rectangle(px + plotW / 2, rowY + plotH / 2, plotW, plotH, plotColor, plotAlpha),
      );
      rect.setStrokeStyle(isAtlys ? 2 : 1, isAtlys ? COLORS.ATLYS_GREEN : 0x4a6a5a);

      // Segment name
      this.track(
        this.add
          .text(px + plotW / 2, rowY + 10, seg.name, {
            fontFamily: FONT,
            fontSize: '6px',
            color: isAtlys ? TEXT.GREEN : TEXT.WHITE,
          })
          .setOrigin(0.5, 0),
      );

      // Market size
      this.track(
        this.add
          .text(px + plotW / 2, rowY + 28, seg.marketSize2025, {
            fontFamily: FONT,
            fontSize: '5px',
            color: isAtlys ? TEXT.GREEN : TEXT.MUTED,
          })
          .setOrigin(0.5, 0),
      );

      // Atlys badge
      if (isAtlys) {
        const badge = this.track(
          this.add
            .text(px + plotW / 2, rowY + plotH - 10, 'ATLYS', {
              fontFamily: FONT,
              fontSize: '6px',
              color: '#000000',
              backgroundColor: '#22c55e',
              padding: { x: 4, y: 2 },
            })
            .setOrigin(0.5),
        );
        this.tweens.add({
          targets: badge,
          alpha: { from: 0.7, to: 1 },
          duration: 800,
          yoyo: true,
          repeat: -1,
        });
      }

      // Fade in with stagger
      rect.setAlpha(0);
      this.tweens.add({
        targets: rect,
        alpha: plotAlpha,
        delay: i * 100,
        duration: 300,
      });
    });

    // Prompt
    const prompt = this.track(
      this.add
        .text(width / 2, height - 30, 'click to continue', {
          fontFamily: FONT,
          fontSize: '7px',
          color: TEXT.MUTED,
        })
        .setOrigin(0.5)
        .setAlpha(0),
    );
    this.tweens.add({
      targets: prompt,
      alpha: 0.6,
      delay: MARKET_SEGMENTS.length * 100 + 400,
      duration: 500,
    });
  }

  // ── Beat 3: Atlys's slice ────────────────────────────────────

  private beat3_AtlysPie(width: number, height: number): void {
    const tw = typeText(
      this,
      width / 2,
      height / 2,
      "Atlys owns 1-2% of this pie.\nThe other 98% is the journey.",
      {
        fontFamily: FONT,
        fontSize: '10px',
        color: TEXT.WHITE,
        align: 'center',
        lineSpacing: 24,
      },
    );
    tw.setOrigin(0.5);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 4: Character select ─────────────────────────────────

  private beat4_CharacterSelect(width: number, height: number): void {
    this.characterSelectActive = true;

    this.track(
      this.add
        .text(width / 2, 60, 'Pick your traveler.', {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    const personas = Object.values(PERSONAS);
    const spacing = 260;
    const totalW = (personas.length - 1) * spacing;
    const startX = width / 2 - totalW / 2;

    personas.forEach((persona, i) => {
      const x = startX + i * spacing;
      const y = height / 2 - 20;

      // Character sprite
      const sprite = this.track(
        this.add.image(x, y, `char_${persona.id}`).setScale(0.14),
      );
      sprite.setInteractive({ useHandCursor: true });
      this.characterSprites.set(persona.id, sprite);

      // Name tag
      this.track(
        this.add
          .text(x, y + 95, persona.name, {
            fontFamily: FONT,
            fontSize: '8px',
            color: TEXT.WHITE,
          })
          .setOrigin(0.5, 0),
      );

      // Subtitle
      this.track(
        this.add
          .text(x, y + 120, persona.subtitle, {
            fontFamily: FONT,
            fontSize: '6px',
            color: TEXT.MUTED,
            align: 'center',
            wordWrap: { width: 220 },
            lineSpacing: 12,
          })
          .setOrigin(0.5, 0),
      );

      // One-liner on hover
      const oneLiner = this.track(
        this.add
          .text(x, y + 165, `"${persona.oneLiner}"`, {
            fontFamily: FONT,
            fontSize: '6px',
            color: TEXT.SUB,
            align: 'center',
            wordWrap: { width: 230 },
            lineSpacing: 12,
          })
          .setOrigin(0.5, 0)
          .setAlpha(0),
      );

      sprite.on('pointerover', () => {
        sprite.setScale(0.16);
        oneLiner.setAlpha(1);
      });
      sprite.on('pointerout', () => {
        sprite.setScale(0.14);
        oneLiner.setAlpha(0);
      });
      sprite.on('pointerdown', () => {
        this.selectCharacter(persona.id, persona.name);
      });
    });
  }

  private selectCharacter(id: PersonaId, name: string): void {
    this.registry.set('selectedPersona', id);
    this.registry.set('journeyPhaseIndex', 0);
    this.input.removeAllListeners();
    this.input.keyboard?.removeAllListeners();
    this.characterSelectActive = true;

    const { width } = this.scale;
    const selected = this.characterSprites.get(id);

    // Fade out other sprites
    this.characterSprites.forEach((sprite, pid) => {
      if (pid !== id) {
        this.tweens.add({ targets: sprite, alpha: 0, duration: 400 });
      }
    });

    // Slide selected to center
    if (selected) {
      slideCharacter(this, selected, width / 2, 600, () => {
        this.add
          .text(width / 2, this.scale.height - 40, `${name}'s journey begins...`, {
            fontFamily: FONT,
            fontSize: '9px',
            color: TEXT.GREEN,
          })
          .setOrigin(0.5);

        // Exit right after a pause
        this.time.delayedCall(800, () => {
          exitRight(this, selected, () => {
            this.cameras.main.fadeOut(400, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
              this.scene.start('JourneyMapScene');
            });
          });
        });
      });
    }
  }
}
