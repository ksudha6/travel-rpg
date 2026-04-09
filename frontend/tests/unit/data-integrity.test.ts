import { describe, it, expect } from 'vitest';
import { TravelPhase, PersonaId } from '../../../shared/types';
import { JOURNEY_PHASES } from '@/data/journeyPhases';
import { PERSONAS } from '@/data/personas';
import { COMPETITORS } from '@/data/competitors';
import { HYPOTHESES, GTM_MOTIONS, COMPETITIVE_POSITIONING } from '@/data/strategy';
import { MARKET_SEGMENTS, TAM } from '@/data/market';

const ALL_PERSONA_IDS = Object.values(PersonaId);

describe('Journey Phases', () => {
  it('has exactly 5 phases', () => {
    expect(JOURNEY_PHASES).toHaveLength(5);
  });

  it('covers all TravelPhase enum values', () => {
    const phaseIds = JOURNEY_PHASES.map((p) => p.id);
    expect(phaseIds).toEqual(expect.arrayContaining(Object.values(TravelPhase)));
  });

  it('every phase has non-empty sceneTagline, hookName, atlysPlay, gtmPlay', () => {
    for (const phase of JOURNEY_PHASES) {
      expect(phase.sceneTagline, `${phase.id} sceneTagline`).toBeTruthy();
      expect(phase.hookName, `${phase.id} hookName`).toBeTruthy();
      expect(phase.atlysPlay, `${phase.id} atlysPlay`).toBeTruthy();
      expect(phase.gtmPlay, `${phase.id} gtmPlay`).toBeTruthy();
    }
  });

  it('every phase has personaAnxieties for all 4 personas', () => {
    for (const phase of JOURNEY_PHASES) {
      for (const personaId of ALL_PERSONA_IDS) {
        expect(
          phase.personaAnxieties[personaId],
          `${phase.id} missing anxiety for ${personaId}`,
        ).toBeTruthy();
      }
    }
  });

  it('no phase includes GetYourGuide, Viator, or Google Travel in competitorNames', () => {
    const banned = ['GetYourGuide', 'Viator', 'Google Travel'];
    for (const phase of JOURNEY_PHASES) {
      for (const name of phase.competitorNames) {
        expect(banned).not.toContain(name);
      }
    }
  });
});

describe('Personas', () => {
  it('has exactly 4 personas', () => {
    expect(Object.keys(PERSONAS)).toHaveLength(4);
  });

  it('all PersonaId enum values have a persona entry', () => {
    for (const id of ALL_PERSONA_IDS) {
      expect(PERSONAS[id], `missing persona for ${id}`).toBeDefined();
    }
  });

  it('every persona has a sprite path matching assets/characters/*.png', () => {
    for (const id of ALL_PERSONA_IDS) {
      expect(PERSONAS[id].sprite).toMatch(/^assets\/characters\/[\w-]+\.png$/);
    }
  });
});

describe('Competitors', () => {
  it('every competitor has a non-empty indiaContext', () => {
    for (const comp of COMPETITORS) {
      expect(comp.indiaContext, `${comp.name} missing indiaContext`).toBeTruthy();
    }
  });

  it('every competitor has a non-empty strategy', () => {
    for (const comp of COMPETITORS) {
      expect(comp.strategy, `${comp.name} missing strategy`).toBeTruthy();
    }
  });
});

describe('Market', () => {
  it('has exactly 7 market segments', () => {
    expect(MARKET_SEGMENTS).toHaveLength(7);
  });

  it('only Visas segment has atlysPresent: true', () => {
    const atlysSegments = MARKET_SEGMENTS.filter((s) => s.atlysPresent);
    expect(atlysSegments).toHaveLength(1);
    expect(atlysSegments[0].name).toBe('Visas');
  });

  it('TAM includes INR figure', () => {
    expect(TAM.currentINR).toBeTruthy();
  });
});

describe('Strategy', () => {
  it('has exactly 3 hypotheses', () => {
    expect(HYPOTHESES).toHaveLength(3);
  });

  it('H2 scores highest on moat and defensibility', () => {
    const h2 = HYPOTHESES.find((h) => h.id === 'h2');
    expect(h2).toBeDefined();
    for (const h of HYPOTHESES) {
      if (h.id !== 'h2') {
        expect(h2!.scores.moat).toBeGreaterThanOrEqual(h.scores.moat);
        expect(h2!.scores.defensibility).toBeGreaterThanOrEqual(h.scores.defensibility);
      }
    }
  });

  it('H3 scores highest on revenue but lowest on feasibility', () => {
    const h3 = HYPOTHESES.find((h) => h.id === 'h3');
    expect(h3).toBeDefined();
    for (const h of HYPOTHESES) {
      if (h.id !== 'h3') {
        expect(h3!.scores.revenue).toBeGreaterThanOrEqual(h.scores.revenue);
        expect(h3!.scores.feasibility).toBeLessThanOrEqual(h.scores.feasibility);
      }
    }
  });

  it('has exactly 3 GTM motions', () => {
    expect(GTM_MOTIONS).toHaveLength(3);
  });

  it('Partnership GTM has highest fitScore (5)', () => {
    const partnership = GTM_MOTIONS.find((g) => g.name.includes('Partnership'));
    expect(partnership).toBeDefined();
    expect(partnership!.fitScore).toBe(5);
  });

  it('every hypothesis has all 4 scores between 1-10', () => {
    for (const h of HYPOTHESES) {
      for (const key of ['defensibility', 'revenue', 'feasibility', 'moat'] as const) {
        const val = h.scores[key];
        expect(val, `${h.id} ${key}`).toBeGreaterThanOrEqual(1);
        expect(val, `${h.id} ${key}`).toBeLessThanOrEqual(10);
      }
    }
  });

  it('every GTM motion has fitScore between 1-5', () => {
    for (const m of GTM_MOTIONS) {
      expect(m.fitScore, m.name).toBeGreaterThanOrEqual(1);
      expect(m.fitScore, m.name).toBeLessThanOrEqual(5);
    }
  });

  it('COMPETITIVE_POSITIONING has 4 headoutBarrier and 4 atlysBarrier entries', () => {
    expect(COMPETITIVE_POSITIONING.headoutBarrier).toHaveLength(4);
    expect(COMPETITIVE_POSITIONING.atlysBarrier).toHaveLength(4);
  });

  it('COMPETITIVE_POSITIONING.window is non-empty', () => {
    expect(COMPETITIVE_POSITIONING.window).toBeTruthy();
  });
});
