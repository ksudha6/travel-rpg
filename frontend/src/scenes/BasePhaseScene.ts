import Phaser from 'phaser';
import { JourneyPhase, PersonaId } from '../../../shared/types';
import { PERSONAS } from '@/data/personas';
import {
  COLORS,
  TEXT,
  FONT,
  ANCHOR,
  typeText,
  TypewriterText,
  addRestartButton,
  slideCharacter,
  enterFromLeft,
  exitRight,
  drawCompetitorBuilding,
  drawPowerUp,
  drawThoughtBubble,
  showDialogue,
  BuildingResult,
  PowerUpResult,
  DialogueBox,
} from '@/ui/sceneConstants';
import { drawSceneBackground } from '@/ui/backgrounds';

/**
 * World-first beat engine for the 5 journey phase scenes.
 * Each beat SHOWS a visual moment first, then brief dialogue text.
 *
 *   0: Persona thought (character centered, inner voice)
 *   1: Standard World (buildings rise, character enters from left)
 *   2: Persona Anxiety (character center, thought bubble grows)
 *   3: Hook (power-up appears, character collects it)
 *   4: Atlys Play (buildings dim, green overlay, character right)
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

  // Persistent across beats (not destroyed on clearBeat)
  private characterSprite: Phaser.GameObjects.Image | null = null;
  private saviSprite: Phaser.GameObjects.Image | null = null;
  private buildings: BuildingResult[] = [];
  private currentDialogue: DialogueBox | null = null;
  private currentPowerUp: PowerUpResult | null = null;
  private thoughtBubbleObj: Phaser.GameObjects.Container | null = null;

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
      this.characterSprite = null;
      this.saviSprite = null;
      this.buildings = [];
      this.currentDialogue = null;
      this.currentPowerUp = null;
      this.thoughtBubbleObj = null;

      // Background + nav
      drawSceneBackground(this, this.scene.key);
      addRestartButton(this);

      // Show beat 0
      this.showBeat();

      this.input.on('pointerdown', (_pointer: Phaser.Input.Pointer, currentlyOver: Phaser.GameObjects.GameObject[]) => {
        if (currentlyOver.length > 0) return;
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

    // If dialogue is typing, skip it
    if (this.currentDialogue?.skipTyping()) return;
    // If typewriter is active, skip it
    if (this.activeTypewriter?.skipTyping()) return;

    // Advance to next beat
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
    // Destroy beat-scoped objects
    this.beatObjects.forEach((obj) => obj.destroy());
    this.beatObjects = [];
    // Destroy dialogue (slides out)
    if (this.currentDialogue) {
      this.currentDialogue.destroy();
      this.currentDialogue = null;
    }
    // Destroy thought bubble
    if (this.thoughtBubbleObj) {
      this.thoughtBubbleObj.destroy();
      this.thoughtBubbleObj = null;
    }
    // Power-up destroyed on collect, but clean up if still around
    if (this.currentPowerUp) {
      this.currentPowerUp.container.destroy();
      this.currentPowerUp = null;
    }
    // NOTE: characterSprite and buildings persist across beats
  }

  private track<T extends Phaser.GameObjects.GameObject>(obj: T): T {
    this.beatObjects.push(obj);
    return obj;
  }

  private showBeat(): void {
    const { width, height } = this.scale;
    switch (this.currentBeat) {
      case 0: this.beatThought(width, height); break;
      case 1: this.beatStandardWorld(width, height); break;
      case 2: this.beatAnxiety(width, height); break;
      case 3: this.beatHook(width, height); break;
      case 4: this.beatAtlysPlay(width, height); break;
      case 5: this.beatAdvance(width, height); break;
    }
  }

  // ── Beat 0: Persona thought ──────────────────────────────────

  private beatThought(width: number, height: number): void {
    const persona = PERSONAS[this.personaId];
    const thought = this.phase.personaAnxieties[this.personaId];

    // Character sprite centered
    const spriteKey = `char_${this.personaId}`;
    this.track(
      this.add
        .image(width / 2, height * 0.65, spriteKey)
        .setScale(0.18)
        .setOrigin(0.5, 1),
    );

    // Persona name
    this.track(
      this.add
        .text(width / 2, height * 0.3 - 40, `${persona.name} thinks...`, {
          fontFamily: FONT,
          fontSize: '9px',
          color: TEXT.SUB,
        })
        .setOrigin(0.5),
    );

    // Persona's thought
    const tw = typeText(
      this, width / 2, height * 0.3,
      `"${thought}"`,
      {
        fontFamily: FONT,
        fontSize: '8px',
        color: '#ff8888',
        align: 'center',
        wordWrap: { width: 800 },
        lineSpacing: 24,
      },
    );
    tw.setOrigin(0.5, 0);
    this.track(tw);
    this.activeTypewriter = tw as TypewriterText;
  }

  // ── Beat 1: Standard World (buildings + character enters) ────

  private beatStandardWorld(width: number, height: number): void {
    const groundY = height * ANCHOR.GROUND_Y;

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

    // Competitor buildings rise on right side
    const competitors = this.phase.competitorNames;
    const buildingSpacing = Math.min(160, 600 / competitors.length);
    const buildingStartX = width * 0.45;
    this.buildings = [];

    competitors.forEach((name, i) => {
      const bx = buildingStartX + i * buildingSpacing;
      const bHeight = 60 + (i % 3) * 20; // Vary heights
      const building = drawCompetitorBuilding(this, bx, groundY, name, bHeight);
      this.buildings.push(building);
    });

    // Character enters from left
    const spriteKey = `char_${this.personaId}`;
    this.characterSprite = this.add
      .image(-50, groundY, spriteKey)
      .setScale(0.15)
      .setOrigin(0.5, 1);

    enterFromLeft(this, this.characterSprite, width * ANCHOR.LEFT);

    // If Savi already active from a previous phase, she enters alongside
    if (this.registry.get('saviActive')) {
      this.spawnSavi(width * ANCHOR.LEFT - 60, groundY);
    }

    // Dialogue: first sentence of standardFocus
    const focus = this.firstSentences(this.phase.standardFocus, 1);
    this.currentDialogue = showDialogue(this, focus);
  }

  // ── Beat 2: Anxiety (character center + thought bubble) ──────

  private beatAnxiety(width: number, height: number): void {
    const groundY = height * ANCHOR.GROUND_Y;
    const anxiety = this.firstSentences(this.phase.personaAnxieties[this.personaId], 1);

    // Slide character to center
    if (this.characterSprite) {
      slideCharacter(this, this.characterSprite, width * ANCHOR.CENTER, 600, () => {
        // Thought bubble grows above character
        this.thoughtBubbleObj = drawThoughtBubble(
          this,
          width * ANCHOR.CENTER,
          groundY - 160,
          anxiety,
        );
      });
    }

    // Dialogue: persona name + brief fear
    const persona = PERSONAS[this.personaId];
    this.currentDialogue = showDialogue(this, `${persona.name}: "${anxiety}"`);
  }

  // ── Beat 3: Hook (power-up + character collects) ─────────────

  private beatHook(width: number, height: number): void {
    // Power-up appears at center
    this.currentPowerUp = drawPowerUp(
      this,
      width * ANCHOR.CENTER,
      height * 0.35,
      this.phase.hookName,
    );

    // Slide character toward power-up
    if (this.characterSprite) {
      slideCharacter(this, this.characterSprite, width * ANCHOR.CENTER, 600, () => {
        // Collect power-up
        if (this.currentPowerUp) {
          this.currentPowerUp.collect();
          this.currentPowerUp = null;
        }
      });
    }

    // Savi appears for the first time at the hook (Atlys entry point)
    if (!this.registry.get('saviActive')) {
      this.registry.set('saviActive', true);
      const groundY = height * ANCHOR.GROUND_Y;
      this.spawnSavi(width * ANCHOR.CENTER - 60, groundY);
    } else if (this.saviSprite) {
      slideCharacter(this, this.saviSprite, width * ANCHOR.CENTER - 60, 600);
    }

    // Dialogue: hook name + first sentence of hookQuote
    const quote = this.firstSentences(this.phase.hookQuote, 1);
    this.currentDialogue = showDialogue(this, `${this.phase.hookName}: ${quote}`);
  }

  // ── Beat 4: Atlys Play (buildings dim, green overlay) ────────

  private beatAtlysPlay(width: number, height: number): void {
    // Dim all competitor buildings
    this.buildings.forEach((b) => b.dim());

    // Green overlay
    this.track(
      this.add.rectangle(width / 2, height / 2, width, height, COLORS.ATLYS_GREEN, 0.06),
    );

    // Slide character to right, Savi follows
    if (this.characterSprite) {
      slideCharacter(this, this.characterSprite, width * ANCHOR.RIGHT);
    }
    if (this.saviSprite) {
      slideCharacter(this, this.saviSprite, width * ANCHOR.RIGHT - 60);
    }

    // Dialogue: first sentence of atlysPlay
    const play = this.firstSentences(this.phase.atlysPlay, 1);
    this.currentDialogue = showDialogue(this, play);
  }

  // ── Beat 5: Advance ─────────────────────────────────────────

  private beatAdvance(width: number, height: number): void {
    // Additional hook names as small green text
    const hooks = this.phase.additionalHooks ?? [];
    if (hooks.length > 0) {
      hooks.forEach((hook, i) => {
        const colonIdx = hook.indexOf(':');
        const name = colonIdx > -1 ? hook.substring(0, colonIdx) : hook.substring(0, 30);
        this.track(
          this.add
            .text(width - 40, 80 + i * 28, `+ ${name}`, {
              fontFamily: FONT,
              fontSize: '7px',
              color: TEXT.GREEN,
            })
            .setOrigin(1, 0),
        );
      });
    }

    // Advance prompt
    const prompt = this.track(
      this.add
        .text(width / 2, height - 60, '-> Next Phase', {
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

  private spawnSavi(targetX: number, groundY: number): void {
    this.saviSprite = this.add
      .image(-50, groundY, 'char_savi')
      .setScale(0.12)
      .setOrigin(0.5, 1);
    enterFromLeft(this, this.saviSprite, targetX);
  }

  private transitionToNext(): void {
    this.input.removeAllListeners();
    this.input.keyboard?.removeAllListeners();

    // Exit character + Savi right
    if (this.characterSprite) {
      exitRight(this, this.characterSprite);
    }
    if (this.saviSprite) {
      exitRight(this, this.saviSprite);
    }

    // Increment journey phase index for the map screen
    const currentIdx = (this.registry.get('journeyPhaseIndex') as number) ?? 0;
    const nextIdx = currentIdx + 1;
    this.registry.set('journeyPhaseIndex', nextIdx);

    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      if (nextIdx >= 5) {
        this.scene.start(this.nextScene); // HypothesesScene
      } else {
        this.scene.start('JourneyMapScene');
      }
    });
  }
}
