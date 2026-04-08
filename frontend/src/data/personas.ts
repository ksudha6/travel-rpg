import { Persona, PersonaId, TravelPhase } from '../../../shared/types';

export const PERSONAS: Record<PersonaId, Persona> = {
  [PersonaId.ARJUN]: {
    id: PersonaId.ARJUN,
    name: 'Arjun',
    subtitle: 'NRI Professional — Dubai, 6-8 trips/yr',
    oneLiner: "I travel 6 times a year and I'm still copying booking confirmations into a spreadsheet.",
    description: 'Efficient repeat traveler. Values time over money. Hates friction between apps.',
    sprite: 'assets/characters/arjun.png',
    painPoints: {
      [TravelPhase.DREAMING]: "Can I get the visa in time? Last time the Schengen slot took 3 weeks to appear.",
      [TravelPhase.PRE_DEPARTURE]: "I have 4 bookings across 3 apps and none of them talk to each other.",
      [TravelPhase.IN_TRANSIT]: "My Dubai-London connection is 2hrs. Is that enough with immigration?",
      [TravelPhase.ON_GROUND]: "I have 4 hours free in London. Don't waste my time with tourist stuff.",
      [TravelPhase.POST_TRIP]: "I need to reconcile 3 currencies and 12 receipts for reimbursement.",
    },
    hookResonance: ['Etiquette Pulse', 'SOS Finder'],
  },

  [PersonaId.PRIYA]: {
    id: PersonaId.PRIYA,
    name: 'Priya',
    subtitle: 'First-Time Traveler — Pune',
    oneLiner: "I want to see the world but I'm terrified I'll get rejected at the visa, the airport, or the restaurant.",
    description: 'Over-researches everything. Anxious but determined. Needs reassurance at every step.',
    sprite: 'assets/characters/priya.png',
    painPoints: {
      [TravelPhase.DREAMING]: "What if I pick a country and my visa gets rejected? I'll waste money on flights I can't use.",
      [TravelPhase.PRE_DEPARTURE]: "Did I fill the form correctly? Is my bank statement enough? What if they ask something at immigration?",
      [TravelPhase.IN_TRANSIT]: "Where do I go after landing? What's immigration like? What if they question me?",
      [TravelPhase.ON_GROUND]: "Is this area safe? Can I eat this food? What if I get sick? I don't speak the language.",
      [TravelPhase.POST_TRIP]: "I want to go again but the visa process was so stressful I don't know if I can handle it.",
    },
    hookResonance: ['Crisis Aversion', 'Get Lost Safely'],
  },

  [PersonaId.RAHUL]: {
    id: PersonaId.RAHUL,
    name: 'Rahul',
    subtitle: 'Digital Nomad — Lisbon-Bali circuit',
    oneLiner: "I'm juggling 3 visas across 3 countries and no app understands that my trip doesn't have a return date.",
    description: 'Pro traveler. Lives like a local. Hates tourist infrastructure. Always planning the next hop.',
    sprite: 'assets/characters/rahul.png',
    painPoints: {
      [TravelPhase.DREAMING]: "I need a visa for Portugal, then hop to Morocco, then back to Bali. The visa timelines don't overlap cleanly.",
      [TravelPhase.PRE_DEPARTURE]: "I'm applying for 3 visas simultaneously with different requirements and timelines.",
      [TravelPhase.IN_TRANSIT]: "Low anxiety — done this 20+ times. Self-sufficient.",
      [TravelPhase.ON_GROUND]: "I don't want Headout's 'Top 10 things to do.' I want the cafe where the Portuguese writers hang out.",
      [TravelPhase.POST_TRIP]: "My 90/180 Schengen days are running out. When can I re-enter?",
    },
    hookResonance: ['Anti-Tourist', 'Serendipity Engine'],
  },

  [PersonaId.MEERA]: {
    id: PersonaId.MEERA,
    name: 'Meera & Family',
    subtitle: 'Family of 4 — Toddler, Teenager, In-Laws',
    oneLiner: "I'm planning a holiday for a toddler, a teenager, and my in-laws — and managing 4 passports while doing it.",
    description: 'Coordinator-in-chief. Safety-first. Needs activities for all ages. Drowning in logistics.',
    sprite: 'assets/characters/meera-family.png',
    painPoints: {
      [TravelPhase.DREAMING]: "We need a place that works for a 5-year-old, a 70-year-old, and everyone in between — and the visa can't be complicated with kids' docs.",
      [TravelPhase.PRE_DEPARTURE]: "Managing 4 visa applications simultaneously is a full-time job. One missing document and we ALL can't go.",
      [TravelPhase.IN_TRANSIT]: "The baby is screaming, the gate changed, and I can't find the family bathroom.",
      [TravelPhase.ON_GROUND]: "We can't all do the same activity. I want to explore, kids want a pool, in-laws want temples.",
      [TravelPhase.POST_TRIP]: "Who paid for what? The hotel was split 3 ways but dinner was just us. This is a mess.",
    },
    hookResonance: ['Vibe Check', 'Local Lens'],
  },
};
