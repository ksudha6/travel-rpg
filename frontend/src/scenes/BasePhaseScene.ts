import Phaser from 'phaser';
import { JourneyPhase, PersonaId } from '../../../shared/types';
import { PERSONAS } from '@/data/personas';
import { COLORS, TEXT, FONT } from '@/ui/sceneConstants';

export abstract class BasePhaseScene extends Phaser.Scene {
  protected abstract readonly nextScene: string;
  protected competitorColor: number = COLORS.COMPETITOR_GREY;

  private currentStep = 0;
  private stepObjects: Phaser.GameObjects.GameObject[] = [];
  private phase!: JourneyPhase;
  private personaId!: PersonaId;
  private transitioning = false;

  abstract getPhaseData(): JourneyPhase;

  create(): void {
    try {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      this.phase = this.getPhaseData();
      this.personaId = this.registry.get('selectedPersona') as PersonaId;
      this.currentStep = 0;
      this.stepObjects = [];
      this.transitioning = false;
      this.showCurrentStep();

      this.input.on('pointerdown', () => this.advanceStep());
      this.input.keyboard?.on('keydown-SPACE', () => this.advanceStep());
    } catch (error) {
      console.error(`${this.scene.key} failed to create:`, error);
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

  private advanceStep(): void {
    if (this.transitioning) return;
    this.currentStep++;
    if (this.currentStep > 3) {
      this.transitioning = true;
      this.transitionToNext();
      return;
    }
    this.clearStep();
    this.showCurrentStep();
  }

  private clearStep(): void {
    this.stepObjects.forEach((obj) => obj.destroy());
    this.stepObjects = [];
  }

  private track<T extends Phaser.GameObjects.GameObject>(obj: T): T {
    this.stepObjects.push(obj);
    return obj;
  }

  private showCurrentStep(): void {
    const { width, height } = this.scale;
    switch (this.currentStep) {
      case 0:
        this.renderTagline(width, height);
        break;
      case 1:
        this.renderCompetitorsAndAnxiety(width, height);
        break;
      case 2:
        this.renderHookAndPlay(width, height);
        break;
      case 3:
        this.renderAdditionalHooks(width, height);
        break;
    }
  }

  // ── Step 0: Full-screen tagline ──────────────────────────────

  private renderTagline(width: number, height: number): void {
    this.track(
      this.add
        .text(width / 2, height / 2 - 80, `${this.phase.emoji} ${this.phase.title}`, {
          fontFamily: FONT,
          fontSize: '20px',
          color: TEXT.SUB,
        })
        .setOrigin(0.5),
    );

    const tagline = this.track(
      this.add
        .text(width / 2, height / 2, this.phase.sceneTagline, {
          fontFamily: FONT,
          fontSize: '26px',
          color: TEXT.WHITE,
          align: 'center',
          wordWrap: { width: 1000 },
        })
        .setOrigin(0.5)
        .setAlpha(0),
    );

    this.tweens.add({ targets: tagline, alpha: 1, duration: 800 });

    const prompt = this.track(
      this.add
        .text(width / 2, height - 60, 'Click to continue', {
          fontFamily: FONT,
          fontSize: '14px',
          color: TEXT.MUTED,
        })
        .setOrigin(0.5),
    );

    this.tweens.add({
      targets: prompt,
      alpha: { from: 0.3, to: 1 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  // ── Step 1: Competitors + Persona anxiety ────────────────────

  private renderCompetitorsAndAnxiety(width: number, height: number): void {
    // Phase title
    this.track(
      this.add
        .text(width / 2, 20, `${this.phase.emoji} ${this.phase.title}`, {
          fontFamily: FONT,
          fontSize: '18px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    this.track(
      this.add
        .text(width / 2, 48, 'What happens today:', {
          fontFamily: FONT,
          fontSize: '14px',
          color: TEXT.SUB,
        })
        .setOrigin(0.5, 0),
    );

    // Competitor rectangles
    const competitors = this.phase.competitorNames;
    const maxPerRow = 4;
    const rectW = 155;
    const rectH = 46;
    const gap = 16;
    const rows = Math.ceil(competitors.length / maxPerRow);

    for (let i = 0; i < competitors.length; i++) {
      const row = Math.floor(i / maxPerRow);
      const colCount = Math.min(maxPerRow, competitors.length - row * maxPerRow);
      const col = i % maxPerRow;
      const totalRowW = colCount * rectW + (colCount - 1) * gap;
      const startX = (width - totalRowW) / 2;
      const x = startX + col * (rectW + gap) + rectW / 2;
      const y = 95 + row * 62;

      this.track(
        this.add
          .rectangle(x, y, rectW, rectH, this.competitorColor, 0.8)
          .setStrokeStyle(1, 0x555555),
      );

      this.track(
        this.add
          .text(x, y, competitors[i], {
            fontFamily: FONT,
            fontSize: '11px',
            color: '#888888',
            align: 'center',
            wordWrap: { width: rectW - 10 },
          })
          .setOrigin(0.5),
      );
    }

    // Standard focus
    const focusY = 95 + rows * 62 + 8;
    this.track(
      this.add
        .text(width / 2, focusY, this.phase.standardFocus, {
          fontFamily: FONT,
          fontSize: '11px',
          color: TEXT.SUB,
          align: 'center',
          wordWrap: { width: 900 },
        })
        .setOrigin(0.5, 0),
    );

    // Character sprite
    const spriteKey = `char_${this.personaId}`;
    this.track(this.add.image(90, height - 100, spriteKey).setScale(0.12));

    // Persona anxiety card
    const persona = PERSONAS[this.personaId];
    const anxiety = this.phase.personaAnxieties[this.personaId];
    const cardW = 820;
    const cardH = 120;
    const cardX = width / 2 + 30;
    const cardY = height - 90;

    this.track(
      this.add
        .rectangle(cardX, cardY, cardW, cardH, COLORS.RED_CARD_BG, 0.95)
        .setStrokeStyle(2, COLORS.DANGER_RED),
    );

    this.track(
      this.add.text(cardX - cardW / 2 + 16, cardY - cardH / 2 + 10, `💭 ${persona.name}'s fear:`, {
        fontFamily: FONT,
        fontSize: '12px',
        color: TEXT.RED,
      }),
    );

    this.track(
      this.add
        .text(cardX, cardY + 8, anxiety, {
          fontFamily: FONT,
          fontSize: '12px',
          color: TEXT.WHITE,
          align: 'center',
          wordWrap: { width: cardW - 40 },
        })
        .setOrigin(0.5, 0),
    );
  }

  // ── Step 2: Hook power-up + Atlys play ───────────────────────

  private renderHookAndPlay(width: number, height: number): void {
    // Phase title
    this.track(
      this.add
        .text(width / 2, 20, `${this.phase.emoji} ${this.phase.title}`, {
          fontFamily: FONT,
          fontSize: '18px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    // Green hook card
    const hookW = 700;
    const hookH = 110;
    const hookY = 110;

    const hookCard = this.track(
      this.add
        .rectangle(width / 2, hookY, hookW, hookH, COLORS.GREEN_CARD_BG, 0.95)
        .setStrokeStyle(2, COLORS.ATLYS_GREEN),
    );

    this.tweens.add({
      targets: hookCard,
      alpha: { from: 0.8, to: 1 },
      duration: 600,
      yoyo: true,
      repeat: -1,
    });

    this.track(
      this.add
        .text(width / 2, hookY - 28, `⚡ ${this.phase.hookName}`, {
          fontFamily: FONT,
          fontSize: '18px',
          color: TEXT.GREEN,
          fontStyle: 'bold',
        })
        .setOrigin(0.5),
    );

    this.track(
      this.add
        .text(width / 2, hookY + 4, this.phase.hookQuote, {
          fontFamily: FONT,
          fontSize: '12px',
          color: '#cccccc',
          align: 'center',
          wordWrap: { width: hookW - 40 },
        })
        .setOrigin(0.5, 0),
    );

    // Atlys play card
    const playW = 1000;
    const playH = 340;
    const playY = 400;

    this.track(
      this.add
        .rectangle(width / 2, playY, playW, playH, COLORS.PLAY_CARD_BG, 0.9)
        .setStrokeStyle(1, COLORS.ATLYS_GREEN),
    );

    this.track(
      this.add
        .text(width / 2 - playW / 2 + 20, playY - playH / 2 + 12, 'Atlys Play', {
          fontFamily: FONT,
          fontSize: '16px',
          color: TEXT.GREEN,
        }),
    );

    this.track(
      this.add
        .text(width / 2 - playW / 2 + 20, playY - playH / 2 + 40, this.phase.atlysPlay, {
          fontFamily: FONT,
          fontSize: '12px',
          color: '#dddddd',
          wordWrap: { width: playW - 40 },
          lineSpacing: 4,
        }),
    );

    // Prompt
    const prompt = this.track(
      this.add
        .text(width / 2, height - 40, 'Click to continue', {
          fontFamily: FONT,
          fontSize: '14px',
          color: TEXT.MUTED,
        })
        .setOrigin(0.5),
    );

    this.tweens.add({
      targets: prompt,
      alpha: { from: 0.3, to: 1 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  // ── Step 3: Additional hooks + advance ───────────────────────

  private renderAdditionalHooks(width: number, height: number): void {
    // Phase title
    this.track(
      this.add
        .text(width / 2, 20, `${this.phase.emoji} ${this.phase.title}`, {
          fontFamily: FONT,
          fontSize: '18px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    this.track(
      this.add
        .text(width / 2, 55, 'Additional Hooks', {
          fontFamily: FONT,
          fontSize: '20px',
          color: TEXT.WHITE,
        })
        .setOrigin(0.5, 0),
    );

    const hooks = this.phase.additionalHooks ?? [];
    if (hooks.length > 0) {
      const cardW = Math.min(290, (width - 60 - (hooks.length - 1) * 14) / hooks.length);
      const cardH = 180;
      const gap = 14;
      const totalW = hooks.length * cardW + (hooks.length - 1) * gap;
      const startX = (width - totalW) / 2;

      hooks.forEach((hook, i) => {
        const x = startX + i * (cardW + gap) + cardW / 2;
        const y = 200;

        this.track(
          this.add
            .rectangle(x, y, cardW, cardH, COLORS.CARD_BG, 0.8)
            .setStrokeStyle(1, COLORS.ATLYS_GREEN),
        );

        // Extract hook name (text before first colon)
        const colonIdx = hook.indexOf(':');
        const hookName = colonIdx > -1 ? hook.substring(0, colonIdx) : hook.substring(0, 30);
        const hookDesc =
          colonIdx > -1 ? hook.substring(colonIdx + 1).trim() : hook.substring(30);

        this.track(
          this.add
            .text(x, y - cardH / 2 + 12, hookName, {
              fontFamily: FONT,
              fontSize: '12px',
              color: TEXT.GREEN,
              fontStyle: 'bold',
              align: 'center',
              wordWrap: { width: cardW - 20 },
            })
            .setOrigin(0.5, 0),
        );

        this.track(
          this.add
            .text(x, y - cardH / 2 + 36, hookDesc, {
              fontFamily: FONT,
              fontSize: '10px',
              color: TEXT.SUB,
              wordWrap: { width: cardW - 20 },
            })
            .setOrigin(0.5, 0),
        );
      });
    }

    // Advance prompt
    const nextLabel = this.nextScene.replace('Scene', '').replace(/([A-Z])/g, ' $1').trim();
    const prompt = this.track(
      this.add
        .text(width / 2, height - 50, `→ Next: ${nextLabel}`, {
          fontFamily: FONT,
          fontSize: '16px',
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

  // ── Transition ───────────────────────────────────────────────

  private transitionToNext(): void {
    this.input.removeAllListeners();
    this.input.keyboard?.removeAllListeners();
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(this.nextScene);
    });
  }
}
