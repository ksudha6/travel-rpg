import Phaser from 'phaser';
import { JourneyPhase, PersonaId } from '../../../shared/types';
import { PERSONAS } from '@/data/personas';
import {
  COLORS,
  TEXT,
  FONT,
  typeText,
  drawPixelGrid,
  TypewriterText,
  addRestartButton,
} from '@/ui/sceneConstants';

/**
 * Beat-based narration engine for the 5 journey phase scenes.
 * Each phase plays as 6 narrative beats (from STORY.md Act 3):
 *   0: Tagline (dramatic, full screen)
 *   1: Standard World (competitors + what happens today)
 *   2: Persona Anxiety (character's fear — thought bubble)
 *   3: Hook (Atlys's unique angle — power-up)
 *   4: Atlys Play (what Atlys does here)
 *   5: Advance prompt → next scene
 */
export abstract class BasePhaseScene extends Phaser.Scene {
  protected abstract readonly nextScene: string;
  protected competitorColor: number = COLORS.COMPETITOR_GREY;

  private currentBeat = 0;
  private beatObjects: Phaser.GameObjects.GameObject[] = [];
  private phase!: JourneyPhase;
  private personaId!: PersonaId;
  private transitioning = false;
  private activeTypewriter: TypewriterText | null = null;

  abstract getPhaseData(): JourneyPhase;

  create(): void {
    try {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      const { width, height } = this.scale;
      this.phase = this.getPhaseData();
      this.personaId = this.registry.get('selectedPersona') as PersonaId;
      this.currentBeat = 0;
      this.beatObjects = [];
      this.transitioning = false;
      this.activeTypewriter = null;

      // Persistent layer
      drawPixelGrid(this, width, height);
      addRestartButton(this);

      // Show beat 0
      this.showBeat();

      this.input.on('pointerdown', (_pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
        if (currentlyOver.length > 0) return; // click was on an interactive object (e.g. nav button)
        this.handleClick();
      });
      this.input.keyboard?.on('keydown-SPACE', () => this.handleClick());
    } catch (error) {
      console.error(`${this.scene.key} failed to create:`, error);
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
    if (this.transitioning) return;

    // If typewriter is active, skip to end of current text
    if (this.activeTypewriter?.skipTyping()) return;

    // Otherwise advance to next beat
    this.currentBeat++;
    if (this.currentBeat > 5) {
      this.transitioning = true;
      this.transitionToNext();
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
      case 0: this.beatTagline(width, height); break;
      case 1: this.beatStandardWorld(width, height); break;
      case 2: this.beatPersonaAnxiety(width, height); break;
      case 3: this.beatHook(width, height); break;
      case 4: this.beatAtlysPlay(width, height); break;
      case 5: this.beatAdvance(width, height); break;
    }
  }

  // ── Beat 0: Tagline ──────────────────────────────────────────

  private beatTagline(width: number, height: number): void {
    this.track(
      this.add
        .text(width / 2, height / 2 - 50, `${this.phase.emoji} ${this.phase.title}`, {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.SUB,
        })
        .setOrigin(0.5),
    );

    const tw = typeText(
      this,
      width / 2,
      height / 2,
      this.phase.sceneTagline,
      {
        fontFamily: FONT,
        fontSize: '12px',
        color: TEXT.WHITE,
        align: 'center',
        wordWrap: { width: 900 },
        lineSpacing: 24,
      },
    );
    tw.setOrigin(0.5);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 1: Standard World ───────────────────────────────────

  private beatStandardWorld(width: number, height: number): void {
    // Phase header
    this.track(
      this.add
        .text(width / 2, 20, `${this.phase.emoji} ${this.phase.title}`, {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    // Competitor names as grey labels
    const competitors = this.phase.competitorNames;
    const labelY = 55;
    const label = competitors.join('  ·  ');
    this.track(
      this.add
        .text(width / 2, labelY, label, {
          fontFamily: FONT,
          fontSize: '7px',
          color: '#666666',
        })
        .setOrigin(0.5, 0),
    );

    // Character sprite
    const spriteKey = `char_${this.personaId}`;
    this.track(this.add.image(100, height - 100, spriteKey).setScale(0.12));

    // Narrate standardFocus (first 2 sentences)
    const focus = this.firstSentences(this.phase.standardFocus, 2);
    const tw = typeText(this, width / 2, height / 2 - 30, focus, {
      fontFamily: FONT,
      fontSize: '8px',
      color: TEXT.SUB,
      align: 'center',
      wordWrap: { width: 800 },
      lineSpacing: 24,
    });
    tw.setOrigin(0.5, 0);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 2: Persona Anxiety ──────────────────────────────────

  private beatPersonaAnxiety(width: number, height: number): void {
    const persona = PERSONAS[this.personaId];
    const anxiety = this.phase.personaAnxieties[this.personaId];

    // Phase header
    this.track(
      this.add
        .text(width / 2, 20, `${this.phase.emoji} ${this.phase.title}`, {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    // Character sprite (larger, centered)
    const spriteKey = `char_${this.personaId}`;
    this.track(this.add.image(width / 2, height / 2 + 80, spriteKey).setScale(0.18));

    // Thought bubble indicator
    this.track(
      this.add
        .text(width / 2, height / 2 - 100, `💭 ${persona.name}`, {
          fontFamily: FONT,
          fontSize: '9px',
          color: TEXT.RED,
        })
        .setOrigin(0.5),
    );

    // Anxiety narration (red text, types in)
    const tw = typeText(this, width / 2, height / 2 - 70, anxiety, {
      fontFamily: FONT,
      fontSize: '8px',
      color: '#ff8888',
      align: 'center',
      wordWrap: { width: 800 },
      lineSpacing: 24,
    });
    tw.setOrigin(0.5, 0);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 3: Hook ─────────────────────────────────────────────

  private beatHook(width: number, height: number): void {
    // Phase header
    this.track(
      this.add
        .text(width / 2, 20, `${this.phase.emoji} ${this.phase.title}`, {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    // Power-up label (green, glowing)
    const hookLabel = this.track(
      this.add
        .text(width / 2, height / 2 - 80, `⚡ ${this.phase.hookName}`, {
          fontFamily: FONT,
          fontSize: '11px',
          color: TEXT.GREEN,
        })
        .setOrigin(0.5),
    );

    this.tweens.add({
      targets: hookLabel,
      alpha: { from: 0.6, to: 1 },
      duration: 600,
      yoyo: true,
      repeat: -1,
    });

    // Hook quote narration
    const tw = typeText(this, width / 2, height / 2 - 30, this.phase.hookQuote, {
      fontFamily: FONT,
      fontSize: '8px',
      color: '#cccccc',
      align: 'center',
      wordWrap: { width: 800 },
      lineSpacing: 24,
    });
    tw.setOrigin(0.5, 0);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 4: Atlys Play ──────────────────────────────────────

  private beatAtlysPlay(width: number, height: number): void {
    // Phase header
    this.track(
      this.add
        .text(width / 2, 20, `${this.phase.emoji} ${this.phase.title}`, {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    // "Atlys Play" label
    this.track(
      this.add
        .text(width / 2, 60, 'Atlys Play', {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.GREEN,
        })
        .setOrigin(0.5, 0),
    );

    // Atlys play narration (first 3 sentences, green-tinted)
    const play = this.firstSentences(this.phase.atlysPlay, 3);
    const tw = typeText(this, width / 2, 110, play, {
      fontFamily: FONT,
      fontSize: '8px',
      color: '#aaffaa',
      wordWrap: { width: 900 },
      lineSpacing: 24,
    });
    tw.setOrigin(0.5, 0);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 5: Advance ─────────────────────────────────────────

  private beatAdvance(width: number, height: number): void {
    // Phase header
    this.track(
      this.add
        .text(width / 2, 20, `${this.phase.emoji} ${this.phase.title}`, {
          fontFamily: FONT,
          fontSize: '10px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    // Additional hook names as badges
    const hooks = this.phase.additionalHooks ?? [];
    if (hooks.length > 0) {
      this.track(
        this.add
          .text(width / 2, height / 2 - 80, 'Additional Hooks', {
            fontFamily: FONT,
            fontSize: '8px',
            color: TEXT.SUB,
          })
          .setOrigin(0.5),
      );

      hooks.forEach((hook, i) => {
        const colonIdx = hook.indexOf(':');
        const name = colonIdx > -1 ? hook.substring(0, colonIdx) : hook.substring(0, 30);
        this.track(
          this.add
            .text(width / 2, height / 2 - 40 + i * 28, `· ${name}`, {
              fontFamily: FONT,
              fontSize: '7px',
              color: TEXT.GREEN,
            })
            .setOrigin(0.5, 0),
        );
      });
    }

    // Advance prompt
    const nextLabel = this.nextScene.replace('Scene', '').replace(/([A-Z])/g, ' $1').trim();
    const prompt = this.track(
      this.add
        .text(width / 2, height - 60, `→ ${nextLabel}`, {
          fontFamily: FONT,
          fontSize: '9px',
          color: TEXT.GREEN,
        })
        .setOrigin(0.5),
    );

    this.tweens.add({
      targets: prompt,
      alpha: { from: 0.4, to: 1 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  // ── Helpers ──────────────────────────────────────────────────

  private firstSentences(text: string, count: number): string {
    const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
    return sentences.slice(0, count).join(' ').trim();
  }

  private transitionToNext(): void {
    this.input.removeAllListeners();
    this.input.keyboard?.removeAllListeners();
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(this.nextScene);
    });
  }
}
