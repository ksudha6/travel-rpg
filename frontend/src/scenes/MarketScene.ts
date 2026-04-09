import Phaser from 'phaser';
import { TAM, MARKET_SEGMENTS } from '@/data/market';
import { PERSONAS } from '@/data/personas';
import { PersonaId } from '../../../shared/types';
import {
  TEXT,
  FONT,
  typeText,
  drawPixelGrid,
  TypewriterText,
  addRestartButton,
} from '@/ui/sceneConstants';

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

      drawPixelGrid(this, width, height);
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

  // ── Beat 2: Segments list ────────────────────────────────────

  private beat2_Segments(width: number, height: number): void {
    this.track(
      this.add
        .text(width / 2, 30, TAM.currentINR, {
          fontFamily: FONT,
          fontSize: '12px',
          color: TEXT.MUTED,
        })
        .setOrigin(0.5, 0),
    );

    const startY = 90;
    const lineH = 32;

    MARKET_SEGMENTS.forEach((seg, i) => {
      const isAtlys = seg.atlysPresent;
      const y = startY + i * lineH;

      // Segment name + size
      const label = `${seg.name}  ${seg.marketSize2025}`;
      const text = this.track(
        this.add
          .text(width / 2, y, isAtlys ? `★ ${label}  — ATLYS` : label, {
            fontFamily: FONT,
            fontSize: '8px',
            color: isAtlys ? TEXT.GREEN : TEXT.SUB,
          })
          .setOrigin(0.5, 0),
      );

      // Pulse the Atlys segment
      if (isAtlys) {
        this.tweens.add({
          targets: text,
          alpha: { from: 0.7, to: 1 },
          duration: 800,
          yoyo: true,
          repeat: -1,
        });
      }

      // Fade in each segment
      text.setAlpha(0);
      this.tweens.add({
        targets: text,
        alpha: isAtlys ? 1 : 0.8,
        delay: i * 120,
        duration: 300,
      });
    });

    // No typewriter on this beat — it's visual. Prompt to continue.
    const prompt = this.track(
      this.add
        .text(width / 2, height - 50, 'click to continue', {
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
      delay: MARKET_SEGMENTS.length * 120 + 400,
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
    this.input.removeAllListeners();
    this.input.keyboard?.removeAllListeners();

    const { width, height } = this.scale;
    this.add
      .text(width / 2, height - 40, `${name}'s journey begins...`, {
        fontFamily: FONT,
        fontSize: '9px',
        color: TEXT.GREEN,
      })
      .setOrigin(0.5);

    this.time.delayedCall(1200, () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('DreamingScene');
      });
    });
  }
}
