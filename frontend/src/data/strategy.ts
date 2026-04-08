import { Hypothesis, GTMMotion } from '../../../shared/types';

export const HYPOTHESES: Hypothesis[] = [
  {
    id: 'h1',
    title: 'Visa is a Trust Wedge (Not a Ceiling)',
    thesis: 'Visa approval is a trust moment no one else has. If you trust Atlys with your passport + money, you\'ll trust them with flights and hotels. Headout/Klook capture you on-ground when you\'re already distracted across 5 apps — they never had a trust-building moment.',
    scores: { defensibility: 7, revenue: 6, feasibility: 8, moat: 6 },
    strength: 'Easiest to execute. Trust is real and measurable (NPS post-visa).',
    weakness: 'Trust alone isn\'t a moat. Klook could build visa for Asia. Not defensible against $1B+ competitors long-term.',
  },
  {
    id: 'h2',
    title: 'Visa Data is the Richest Travel Intent Signal',
    thesis: 'Every visa application gives Atlys: destination, dates, party size, budget, risk profile. That\'s the highest-fidelity travel intent data in the market. Klook guesses based on browsing. Atlys KNOWS because you told them on the visa form.',
    scores: { defensibility: 8, revenue: 7, feasibility: 6, moat: 8 },
    strength: 'Genuinely unique and predictive. Defensible for 5-7 years. No competitor has this data density.',
    weakness: 'Requires investment in data science + personalization engine. Data alone doesn\'t win — you need to act on it.',
  },
  {
    id: 'h3',
    title: 'Journey Fragmentation is Unmonetized',
    thesis: 'The $470B market is fought over at the booking layer. But moments BETWEEN bookings — jet lag at 3AM, tourist trap anxiety, group expense chaos, post-trip blues — nobody monetizes. They\'re too small for MakeMyTrip, too niche for Headout. But collectively, that\'s where loyalty is built.',
    scores: { defensibility: 7, revenue: 9, feasibility: 5, moat: 7 },
    strength: 'Biggest revenue upside. These micro-moments create emotional loyalty that booking platforms can\'t match.',
    weakness: 'Requires Atlys to execute across 5 product challenges. Klook/Headout have 18 months to preempt.',
  },
];

export const GTM_MOTIONS: GTMMotion[] = [
  {
    name: 'Collaboration Loop (Primary Growth)',
    mechanism: 'Indians travel in groups. Group coordination (shared visa timelines, flight matching, hotel splitting, activity voting) = natural invite mechanic.',
    whyItWorks: '"Invite friends to your trip" → all users see preferences → one person books, group commits. Stickiness through coordination.',
    fitScore: 4,
    timeline: 'Months 1-3: Pilot with group travel feature',
  },
  {
    name: 'Partnerships (Primary GTM)',
    mechanism: 'Embed Atlys visa processing in airline booking flows (Air India, IndiGo). Zero CAC.',
    whyItWorks: 'Airlines get visa-ready customers. Atlys gets traveler data + repeat bookings. No acquisition cost.',
    fitScore: 5,
    timeline: 'Months 1-3: Secure 1 airline partnership',
  },
  {
    name: 'ABM — Corporate Travel (Secondary)',
    mechanism: 'Indian corporates need visa + flight + hotel for 100+ employees. Atlys = the tool HR uses.',
    whyItWorks: 'High margin. Low churn. Enterprise contracts. Recurring revenue.',
    fitScore: 4,
    timeline: 'Months 4-6: Target 10 Fortune 500 India companies',
  },
];

export const COMPETITIVE_POSITIONING = {
  headoutBarrier: [
    'Regulatory: Visa processing = government partnerships, embassy integrations, legal liability. 18-24 months to build.',
    'Psychology mismatch: Headout users book last-minute impulse. Visa users plan 6-8 weeks ahead. Different funnel.',
    'Revenue conflict: Visa = high-friction, low-frequency. Activities = high-frequency, low-friction. Mixing dilutes velocity.',
    'Liability: Rejected visa from app error = lawsuit. Klook\'s insurance doesn\'t cover it.',
  ],
  atlysBarrier: [
    'No supply side: Klook has 10K+ seller relationships. Atlys has zero in activities.',
    'Margin dilution: Activities 15-25% commission vs 25-35% for visas.',
    'Brand conflict: "Trust and safety" (visa) vs "impulse and serendipity" (activities).',
    'Solution: Don\'t build supply. Integrate Klook/Headout APIs. Be the curation layer.',
  ],
  window: 'Klook focused on IPO ($3-5B). Headout scaling supply. Neither thinking full-journey companion. Atlys has 18 months.',
};
