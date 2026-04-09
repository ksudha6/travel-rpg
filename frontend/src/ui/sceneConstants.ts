export const COLORS = {
  BG: 0x0a0a0a,
  ATLYS_GREEN: 0x22c55e,
  DANGER_RED: 0xff4444,
  CARD_BG: 0x1a1a2e,
  CARD_BORDER: 0x333355,
  COMPETITOR_GREY: 0x333333,
  COMPETITOR_DARK: 0x111111,
  GREEN_CARD_BG: 0x1a2e1a,
  RED_CARD_BG: 0x2e1a1a,
  PLAY_CARD_BG: 0x0d1a0d,
};

export const TEXT = {
  WHITE: '#ffffff',
  SUB: '#aaaaaa',
  MUTED: '#666666',
  GREEN: '#22c55e',
  RED: '#ff4444',
};

export const FONT = "'Press Start 2P', monospace";

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
