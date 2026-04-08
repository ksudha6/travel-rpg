// ─── Domain Types ───────────────────────────────────────────

export enum TravelPhase {
  DREAMING = 'dreaming',
  PRE_DEPARTURE = 'pre_departure',
  IN_TRANSIT = 'in_transit',
  ON_GROUND = 'on_ground',
  POST_TRIP = 'post_trip',
}

export enum PersonaId {
  ARJUN = 'arjun',
  PRIYA = 'priya',
  RAHUL = 'rahul',
  MEERA = 'meera',
}

// ─── Persona ────────────────────────────────────────────────

export interface Persona {
  id: PersonaId;
  name: string;
  subtitle: string;
  oneLiner: string;
  description: string;
  sprite: string; // path to character PNG
  painPoints: Record<TravelPhase, string>;
  hookResonance: string[]; // which offbeat hooks resonate most
}

// ─── Competitor ─────────────────────────────────────────────

export interface Competitor {
  name: string;
  revenue: string; // e.g., "$417M" or "€1B+"
  valuation: string;
  whatTheyDo: string;
  model: string; // e.g., "Boutique", "Supermarket", "Catalog"
  gap: string;
  phases: TravelPhase[]; // which phases they're active in
  logo?: string; // path to icon
}

// ─── Market Segment ─────────────────────────────────────────

export interface MarketSegment {
  name: string;
  marketSize2025: string;
  projection2030: string;
  topPlayers: string[];
  atlysPresent: boolean;
}

// ─── Journey Phase ──────────────────────────────────────────

export interface JourneyPhase {
  id: TravelPhase;
  title: string;
  emoji: string;
  standardFocus: string; // what normal apps do
  offbeatHook: string; // the unique angle
  hookName: string; // e.g., "The Vibe Check"
  hookQuote: string; // the one-liner pitch
  competitors: Competitor[];
  atlysPlay: string;
  additionalHooks?: Array<{
    name: string;
    quote: string;
  }>;
}

// ─── Strategy ───────────────────────────────────────────────

export interface Hypothesis {
  id: string;
  title: string;
  thesis: string;
  scores: {
    defensibility: number; // 1-10
    revenue: number;
    feasibility: number;
    moat: number;
  };
  strength: string;
  weakness: string;
}

export interface GTMMotion {
  name: string;
  mechanism: string;
  whyItWorks: string;
  fitScore: number; // 1-5
  timeline: string;
}
