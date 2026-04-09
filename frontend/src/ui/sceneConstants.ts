export const COLORS = {
  BG: 0x0a0a0a,
  ATLYS_GREEN: 0x22c55e,
  DANGER_RED: 0xff4444,
  CARD_BG: 0x1a1a2e,
  CARD_BORDER: 0x333355,
  COMPETITOR_GREY: 0x555555,
  COMPETITOR_DARK: 0x111111,
  GREEN_CARD_BG: 0x1a2e1a,
  RED_CARD_BG: 0x2e1a1a,
  PLAY_CARD_BG: 0x0d1a0d,
  THOUGHT_RED: 0x661a1a,
  DIALOGUE_BG: 0x111122,
  DIALOGUE_BORDER: 0x334466,
};

// ── Anchor positions (fraction of canvas) ─────────────────
// Characters sit on a ground line and move between three positions.

export const ANCHOR = {
  LEFT: 0.15,
  CENTER: 0.50,
  RIGHT: 0.85,
  GROUND_Y: 0.75,
} as const;

export const TEXT = {
  WHITE: '#ffffff',
  SUB: '#aaaaaa',
  MUTED: '#666666',
  GREEN: '#22c55e',
  RED: '#ff4444',
};

export const FONT = "'Press Start 2P', monospace";

// ── Scene order (for back navigation) ─────────────────────

export const SCENE_ORDER = [
  'TitleScene',
  'MarketScene',
  'DreamingScene',
  'PreDepartureScene',
  'InTransitScene',
  'OnGroundScene',
  'PostTripScene',
  'HypothesesScene',
  'CompetitiveScene',
  'GTMScene',
  'PunchlineScene',
];

// ── Navigation buttons ────────────────────────────────────
// "↩ Start" + "← Back" in top-left of every non-title scene.

/**
 * Navigation: "< BACK" + "START" in top-left.
 *
 * A "screen" in this presentation = one beat (one click-through step).
 * BACK goes to the previous beat. If at beat 0, goes to previous scene.
 * START always returns to TitleScene.
 *
 * @param onBack — optional callback for beat-level back navigation.
 *   Return true if handled (went back one beat), false if at first beat
 *   (so the function falls through to previous-scene navigation).
 */
export function addRestartButton(scene: Phaser.Scene, onBack?: () => boolean): void {
  const sceneKey = scene.scene.key;
  const idx = SCENE_ORDER.indexOf(sceneKey);
  const prevScene = idx > 0 ? SCENE_ORDER[idx - 1] : null;

  function navigateToScene(target: string): void {
    scene.input.removeAllListeners();
    scene.input.keyboard?.removeAllListeners();
    scene.cameras.main.fadeOut(300, 0, 0, 0);
    scene.cameras.main.once('camerafadeoutcomplete', () => {
      scene.scene.start(target);
    });
  }

  // Navigation bar background
  const showBack = prevScene || onBack;
  const navBg = scene.add.graphics().setDepth(999);
  navBg.fillStyle(0x222244, 0.95);
  navBg.fillRect(0, 0, showBack ? 220 : 110, 36);

  // "< BACK" button
  if (showBack) {
    const back = scene.add
      .text(12, 8, '< BACK', {
        fontFamily: FONT,
        fontSize: '10px',
        color: '#ffffff',
      })
      .setInteractive({ useHandCursor: true })
      .setDepth(1000);

    back.on('pointerover', () => back.setColor('#22c55e'));
    back.on('pointerout', () => back.setColor('#ffffff'));
    back.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      // Try beat-level back first
      if (onBack && onBack()) return;
      // Otherwise go to previous scene
      if (prevScene) navigateToScene(prevScene);
    });
  }

  // "START" button (go to title)
  const startX = showBack ? 120 : 12;
  const start = scene.add
    .text(startX, 8, 'START', {
      fontFamily: FONT,
      fontSize: '10px',
      color: '#ffffff',
    })
    .setInteractive({ useHandCursor: true })
    .setDepth(1000);

  start.on('pointerover', () => start.setColor('#22c55e'));
  start.on('pointerout', () => start.setColor('#ffffff'));
  start.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    pointer.event.stopPropagation();
    navigateToScene('TitleScene');
  });
}

// ── Typewriter text ────────────────────────────────────────
// Types text character-by-character like RPG dialogue.
// Click during typing → completes instantly.
// Returns the text object. Calls onComplete when done.

export function typeText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  fullText: string,
  style: Phaser.Types.GameObjects.Text.TextStyle,
  onComplete?: () => void,
): Phaser.GameObjects.Text {
  const textObj = scene.add.text(x, y, '', style);
  let charIndex = 0;
  let typing = true;

  const timer = scene.time.addEvent({
    delay: 25,
    repeat: fullText.length - 1,
    callback: () => {
      if (!typing) return;
      charIndex++;
      textObj.setText(fullText.substring(0, charIndex));
      if (charIndex >= fullText.length) {
        typing = false;
        onComplete?.();
      }
    },
  });

  // Store a skip function on the text object for external access
  (textObj as TypewriterText).skipTyping = () => {
    if (!typing) return false;
    typing = false;
    timer.remove();
    textObj.setText(fullText);
    onComplete?.();
    return true;
  };

  return textObj;
}

export interface TypewriterText extends Phaser.GameObjects.Text {
  skipTyping: () => boolean; // returns true if was still typing, false if already done
}

// ── Pixel grid background ──────────────────────────────────
// Simple dark bg with subtle grid lines — used by all scenes

export function drawPixelGrid(scene: Phaser.Scene, width: number, height: number): void {
  const gfx = scene.add.graphics();
  gfx.fillStyle(0x0e0e1a, 1);
  gfx.fillRect(0, 0, width, height);
  gfx.lineStyle(1, 0x1a1a2e, 0.3);
  for (let x = 0; x < width; x += 64) {
    gfx.lineBetween(x, 0, x, height);
  }
  for (let y = 0; y < height; y += 64) {
    gfx.lineBetween(0, y, width, y);
  }
}

// ── Character movement ────────────────────────────────────
// Slides a sprite to a target x with a subtle vertical bob.
// Static PNG sprites — no sprite sheets needed.

export function slideCharacter(
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Image,
  targetX: number,
  duration = 800,
  onComplete?: () => void,
): void {
  const startY = sprite.y;

  // Slide x position
  scene.tweens.add({
    targets: sprite,
    x: targetX,
    duration,
    ease: 'Power2',
    onComplete: () => onComplete?.(),
  });

  // Subtle vertical bob during movement (sine wave, ~3px amplitude)
  scene.tweens.add({
    targets: sprite,
    y: startY - 3,
    duration: 150,
    yoyo: true,
    repeat: Math.floor(duration / 300),
    ease: 'Sine.easeInOut',
    onComplete: () => {
      sprite.y = startY;
    },
  });
}

export function enterFromLeft(
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Image,
  targetX: number,
  onComplete?: () => void,
): void {
  sprite.x = -50;
  slideCharacter(scene, sprite, targetX, 800, onComplete);
}

export function exitRight(
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Image,
  onComplete?: () => void,
): void {
  const { width } = scene.scale;
  slideCharacter(scene, sprite, width + 50, 600, onComplete);
}

// ── Competitor building ───────────────────────────────────
// Grey rectangle "building" with a name sign. Returns container
// so callers can tween alpha/position.

export interface BuildingResult {
  container: Phaser.GameObjects.Container;
  dim: () => void;
}

export function drawCompetitorBuilding(
  scene: Phaser.Scene,
  x: number,
  y: number,
  name: string,
  buildingHeight = 80,
): BuildingResult {
  const buildingWidth = 90;
  const gfx = scene.add.graphics();

  // Building body
  gfx.fillStyle(COLORS.COMPETITOR_GREY, 1);
  gfx.fillRect(-buildingWidth / 2, -buildingHeight, buildingWidth, buildingHeight);

  // Roof line
  gfx.lineStyle(2, 0x777777, 1);
  gfx.lineBetween(-buildingWidth / 2, -buildingHeight, buildingWidth / 2, -buildingHeight);

  // Window dots
  gfx.fillStyle(0x888888, 0.6);
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      gfx.fillRect(
        -buildingWidth / 2 + 12 + col * 26,
        -buildingHeight + 12 + row * 28,
        16,
        16,
      );
    }
  }

  // Name sign
  const label = scene.add
    .text(0, 8, name, {
      fontFamily: FONT,
      fontSize: '6px',
      color: TEXT.SUB,
      align: 'center',
    })
    .setOrigin(0.5, 0);

  const container = scene.add.container(x, y, [gfx, label]);
  container.setAlpha(0);

  // Rise-up animation
  container.y = y + 30;
  scene.tweens.add({
    targets: container,
    y,
    alpha: 1,
    duration: 400,
    ease: 'Back.easeOut',
  });

  return {
    container,
    dim: () => {
      scene.tweens.add({
        targets: container,
        alpha: 0.15,
        duration: 500,
      });
    },
  };
}

// ── Power-up ──────────────────────────────────────────────
// Green glowing diamond with hook name. Pulses until collected.

export interface PowerUpResult {
  container: Phaser.GameObjects.Container;
  collect: (onDone?: () => void) => void;
}

export function drawPowerUp(
  scene: Phaser.Scene,
  x: number,
  y: number,
  hookName: string,
): PowerUpResult {
  const gfx = scene.add.graphics();

  // Diamond shape
  gfx.fillStyle(COLORS.ATLYS_GREEN, 0.9);
  gfx.beginPath();
  gfx.moveTo(0, -18);
  gfx.lineTo(14, 0);
  gfx.lineTo(0, 18);
  gfx.lineTo(-14, 0);
  gfx.closePath();
  gfx.fill();

  // Inner glow
  gfx.fillStyle(0x44ff88, 0.4);
  gfx.beginPath();
  gfx.moveTo(0, -10);
  gfx.lineTo(8, 0);
  gfx.lineTo(0, 10);
  gfx.lineTo(-8, 0);
  gfx.closePath();
  gfx.fill();

  const label = scene.add
    .text(0, 28, hookName, {
      fontFamily: FONT,
      fontSize: '7px',
      color: TEXT.GREEN,
      align: 'center',
      wordWrap: { width: 200 },
    })
    .setOrigin(0.5, 0);

  const container = scene.add.container(x, y, [gfx, label]);

  // Pulsing glow
  scene.tweens.add({
    targets: container,
    scaleX: 1.1,
    scaleY: 1.1,
    alpha: { from: 0.7, to: 1 },
    duration: 600,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  return {
    container,
    collect: (onDone?: () => void) => {
      scene.tweens.killTweensOf(container);
      scene.tweens.add({
        targets: container,
        scaleX: 0,
        scaleY: 0,
        alpha: 0,
        duration: 300,
        ease: 'Power2',
        onComplete: () => {
          container.destroy();
          onDone?.();
        },
      });
    },
  };
}

// ── Thought bubble ────────────────────────────────────────
// Red-tinted bubble above character with anxiety text.

export function drawThoughtBubble(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
): Phaser.GameObjects.Container {
  const bubbleWidth = 340;
  const padding = 14;

  const content = scene.add
    .text(0, 0, text, {
      fontFamily: FONT,
      fontSize: '7px',
      color: '#ff8888',
      align: 'center',
      wordWrap: { width: bubbleWidth - padding * 2 },
    })
    .setOrigin(0.5);

  const textHeight = content.height;
  const bubbleHeight = textHeight + padding * 2;

  const gfx = scene.add.graphics();
  // Bubble body
  gfx.fillStyle(COLORS.THOUGHT_RED, 0.85);
  gfx.fillRoundedRect(
    -bubbleWidth / 2,
    -bubbleHeight / 2,
    bubbleWidth,
    bubbleHeight,
    8,
  );
  gfx.lineStyle(1, 0xff4444, 0.4);
  gfx.strokeRoundedRect(
    -bubbleWidth / 2,
    -bubbleHeight / 2,
    bubbleWidth,
    bubbleHeight,
    8,
  );

  // Tail pointing down
  gfx.fillStyle(COLORS.THOUGHT_RED, 0.85);
  gfx.beginPath();
  gfx.moveTo(-8, bubbleHeight / 2);
  gfx.lineTo(8, bubbleHeight / 2);
  gfx.lineTo(0, bubbleHeight / 2 + 12);
  gfx.closePath();
  gfx.fill();

  const container = scene.add.container(x, y, [gfx, content]);

  // Grow-in animation
  container.setScale(0);
  container.setAlpha(0);
  scene.tweens.add({
    targets: container,
    scaleX: 1,
    scaleY: 1,
    alpha: 1,
    duration: 400,
    ease: 'Back.easeOut',
  });

  return container;
}

// ── RPG dialogue box ──────────────────────────────────────
// Semi-transparent box at screen bottom. Text types in.
// Click to skip typing, click again to dismiss.

export interface DialogueBox {
  container: Phaser.GameObjects.Container;
  textObj: Phaser.GameObjects.Text;
  destroy: () => void;
  skipTyping: () => boolean;
}

export function showDialogue(
  scene: Phaser.Scene,
  text: string,
  onComplete?: () => void,
): DialogueBox {
  const { width, height } = scene.scale;
  const boxWidth = width - 80;
  const boxHeight = 100;
  const boxX = 40;
  const boxY = height - boxHeight - 20;

  const gfx = scene.add.graphics();
  // Box background
  gfx.fillStyle(COLORS.DIALOGUE_BG, 0.92);
  gfx.fillRoundedRect(0, 0, boxWidth, boxHeight, 6);
  gfx.lineStyle(2, COLORS.DIALOGUE_BORDER, 0.8);
  gfx.strokeRoundedRect(0, 0, boxWidth, boxHeight, 6);

  // Typewriter text inside the box
  const textObj = scene.add.text(20, 16, '', {
    fontFamily: FONT,
    fontSize: '8px',
    color: TEXT.WHITE,
    wordWrap: { width: boxWidth - 40 },
    lineSpacing: 6,
  });

  // Advance indicator (bottom-right)
  const arrow = scene.add
    .text(boxWidth - 20, boxHeight - 18, '▼', {
      fontFamily: FONT,
      fontSize: '8px',
      color: TEXT.MUTED,
    })
    .setOrigin(0.5)
    .setAlpha(0);

  const container = scene.add.container(boxX, boxY, [gfx, textObj, arrow]);

  // Slide up from bottom
  container.y = height;
  scene.tweens.add({
    targets: container,
    y: boxY,
    duration: 300,
    ease: 'Power2',
  });

  // Typewriter effect
  let charIndex = 0;
  let typing = true;

  const timer = scene.time.addEvent({
    delay: 20,
    repeat: text.length - 1,
    callback: () => {
      if (!typing) return;
      charIndex++;
      textObj.setText(text.substring(0, charIndex));
      if (charIndex >= text.length) {
        typing = false;
        arrow.setAlpha(1);
        scene.tweens.add({
          targets: arrow,
          alpha: { from: 0.4, to: 1 },
          duration: 600,
          yoyo: true,
          repeat: -1,
        });
        onComplete?.();
      }
    },
  });

  const skipTyping = (): boolean => {
    if (!typing) return false;
    typing = false;
    timer.remove();
    textObj.setText(text);
    arrow.setAlpha(1);
    onComplete?.();
    return true;
  };

  const destroy = (): void => {
    scene.tweens.add({
      targets: container,
      y: height,
      duration: 200,
      ease: 'Power2',
      onComplete: () => container.destroy(),
    });
  };

  return { container, textObj, destroy, skipTyping };
}
