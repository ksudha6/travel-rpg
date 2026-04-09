import Phaser from 'phaser';
import { TAM, MARKET_SEGMENTS } from '@/data/market';
import { PERSONAS } from '@/data/personas';
import { PersonaId } from '../../../shared/types';

// Garden plot colors per segment
const SEGMENT_COLORS: Record<string, number> = {
  Flights: 0x3b82f6,
  Hotels: 0x8b5cf6,
  'Activities/Experiences': 0xf59e0b,
  'Ground Transport': 0xef4444,
  'Travel Insurance': 0x6366f1,
  Visas: 0x22c55e,
  'Food/Dining': 0xf97316,
};

const ATLYS_GREEN = 0x22c55e;

export class MarketScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MarketScene' });
  }

  create(): void {
    try {
      this.cameras.main.fadeIn(500, 0, 0, 0);
      const { width, height } = this.scale;

      this.renderHeadline(width);
      this.renderGarden(width, height);
      this.renderTagline(width, height);
      this.renderCharacterCards(width, height);
    } catch (error) {
      console.error('MarketScene failed to create:', error);
      const { width, height } = this.scale;
      this.add
        .text(width / 2, height / 2, 'Something went wrong.', {
          fontFamily: 'monospace',
          fontSize: '24px',
          color: '#ff4444',
        })
        .setOrigin(0.5);
    }
  }

  private renderHeadline(width: number): void {
    this.add
      .text(width / 2, 30, `${TAM.currentINR}`, {
        fontFamily: 'monospace',
        fontSize: '36px',
        color: '#ffffff',
        align: 'center',
      })
      .setOrigin(0.5, 0);

    this.add
      .text(width / 2, 72, "That's the Indian travel market by 2030.", {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#aaaaaa',
        align: 'center',
      })
      .setOrigin(0.5, 0);
  }

  private renderGarden(width: number, height: number): void {
    const startY = 110;
    const gardenHeight = height * 0.42;
    const cols = 4;
    const rows = 2;
    const padX = 24;
    const padY = 16;
    const plotW = (width - padX * (cols + 1)) / cols;
    const plotH = (gardenHeight - padY * (rows + 1)) / rows;

    MARKET_SEGMENTS.forEach((seg, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = padX + col * (plotW + padX);
      const y = startY + padY + row * (plotH + padY);
      const color = SEGMENT_COLORS[seg.name] ?? 0x444444;
      const isAtlys = seg.atlysPresent;

      // Garden plot rectangle
      const rect = this.add.rectangle(
        x + plotW / 2,
        y + plotH / 2,
        plotW,
        plotH,
        color,
        isAtlys ? 0.9 : 0.25,
      );
      rect.setStrokeStyle(isAtlys ? 3 : 1, isAtlys ? ATLYS_GREEN : 0x555555);

      // Pulse the Visas segment
      if (isAtlys) {
        this.tweens.add({
          targets: rect,
          alpha: { from: 0.7, to: 1 },
          duration: 800,
          yoyo: true,
          repeat: -1,
        });
      }

      // Segment name
      this.add
        .text(x + plotW / 2, y + 12, seg.name, {
          fontFamily: 'monospace',
          fontSize: '14px',
          color: '#ffffff',
          fontStyle: 'bold',
          align: 'center',
        })
        .setOrigin(0.5, 0);

      // Market size
      this.add
        .text(x + plotW / 2, y + 32, seg.marketSize2025, {
          fontFamily: 'monospace',
          fontSize: '12px',
          color: isAtlys ? '#bbffbb' : '#cccccc',
          align: 'center',
        })
        .setOrigin(0.5, 0);

      // Top players (truncated)
      const players = seg.topPlayers.slice(0, 2).join(', ');
      this.add
        .text(x + plotW / 2, y + 52, players, {
          fontFamily: 'monospace',
          fontSize: '10px',
          color: '#888888',
          align: 'center',
          wordWrap: { width: plotW - 16 },
        })
        .setOrigin(0.5, 0);

      // Atlys badge
      if (isAtlys) {
        this.add
          .text(x + plotW / 2, y + plotH - 16, '★ ATLYS', {
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#22c55e',
            fontStyle: 'bold',
          })
          .setOrigin(0.5, 0.5);
      }
    });
  }

  private renderTagline(width: number, height: number): void {
    const y = height * 0.58;

    this.add
      .text(width / 2, y, 'Atlys owns 1–2% of this pie. The other 98% is the journey.', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#aaaaaa',
        align: 'center',
      })
      .setOrigin(0.5, 0);

    this.add
      .text(width / 2, y + 28, 'Choose your traveler:', {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: '#ffffff',
        align: 'center',
      })
      .setOrigin(0.5, 0);
  }

  private renderCharacterCards(width: number, height: number): void {
    const personas = Object.values(PERSONAS);
    const cardW = 280;
    const cardH = 100;
    const gap = 16;
    const totalW = personas.length * cardW + (personas.length - 1) * gap;
    const startX = (width - totalW) / 2;
    const y = height * 0.68;

    personas.forEach((persona, i) => {
      const x = startX + i * (cardW + gap);

      // Card background
      const card = this.add.rectangle(
        x + cardW / 2,
        y + cardH / 2,
        cardW,
        cardH,
        0x1a1a2e,
        0.9,
      );
      card.setStrokeStyle(2, 0x333355);
      card.setInteractive({ useHandCursor: true });

      // Name
      this.add
        .text(x + cardW / 2, y + 14, persona.name, {
          fontFamily: 'monospace',
          fontSize: '16px',
          color: '#ffffff',
          fontStyle: 'bold',
          align: 'center',
        })
        .setOrigin(0.5, 0);

      // Subtitle
      this.add
        .text(x + cardW / 2, y + 36, persona.subtitle, {
          fontFamily: 'monospace',
          fontSize: '10px',
          color: '#888888',
          align: 'center',
          wordWrap: { width: cardW - 16 },
        })
        .setOrigin(0.5, 0);

      // One-liner (hidden by default, shown on hover)
      const oneLiner = this.add
        .text(x + cardW / 2, y + 56, `"${persona.oneLiner}"`, {
          fontFamily: 'monospace',
          fontSize: '9px',
          color: '#cccccc',
          align: 'center',
          wordWrap: { width: cardW - 16 },
        })
        .setOrigin(0.5, 0)
        .setAlpha(0);

      // Hover effects
      card.on('pointerover', () => {
        card.setStrokeStyle(2, ATLYS_GREEN);
        oneLiner.setAlpha(1);
      });
      card.on('pointerout', () => {
        card.setStrokeStyle(2, 0x333355);
        oneLiner.setAlpha(0);
      });

      // Click to select
      card.on('pointerdown', () => {
        this.selectCharacter(persona.id);
      });
    });
  }

  private selectCharacter(id: PersonaId): void {
    this.registry.set('selectedPersona', id);

    const { width, height } = this.scale;
    const name = PERSONAS[id].name;

    this.add
      .text(width / 2, height - 30, `${name}'s journey begins...`, {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#22c55e',
        align: 'center',
      })
      .setOrigin(0.5, 0.5);

    this.time.delayedCall(1500, () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        // Future: this.scene.start('DreamingScene');
        // For now, restart MarketScene as placeholder
        this.scene.start('MarketScene');
      });
    });
  }
}
