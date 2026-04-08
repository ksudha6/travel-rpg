import { Competitor, TravelPhase } from '../../../shared/types';

// ─── RESEARCH NOTES ───────────────────────────────────────────────────────────
// All revenue/valuation figures verified April 2026.
// India context is the most important field — global significance ≠ India relevance.
// GetYourGuide, Viator, Google Travel removed — zero India market presence.
// Klook kept but flagged: India revenue only $270K FY2024 — not a real India player.
// Sources: Tracxn, Crunchbase, Inc42, Skift, company filings.
// ──────────────────────────────────────────────────────────────────────────────

export const COMPETITORS: Competitor[] = [

  // ── VISA LAYER ─────────────────────────────────────────────────────────────

  {
    name: 'iVisa',
    revenue: '$71.8M (2024)',
    valuation: 'Private, undisclosed',
    whatTheyDo:
      'Global visa processing platform covering 150+ destinations. Legacy UX. Form-filling + document service. No companion product, no post-visa journey.',
    model: 'Service fee per visa application (₹500–₹2,500 markup over government fee)',
    gap:
      'No India-native experience. No mobile-first design. No post-visa product. Stops at visa approved exactly like Atlys currently does. No companion, no connectivity, no arrival layer.',
    indiaContext:
      'Operates in India but not India-native. Atlys has faster processing and stronger NRI trust. iVisa is the legacy global player Atlys is already beating on speed and UX.',
    strategy: 'compete',
    phases: [TravelPhase.PRE_DEPARTURE],
  },

  {
    name: 'VFS Global',
    revenue: '$800M+ (2023, estimated)',
    valuation: 'Owned by Blackstone — $3.9B acquisition (2021)',
    whatTheyDo:
      'Government-mandated outsourced visa application centres. Mandatory for Schengen, UK, Canada, Australia biometric submission. Physical centres across 30+ Indian cities.',
    model:
      'Service fee per application; ₹1,000–₹3,000 processing fee per applicant. Also sells travel insurance, forex, photos at centres.',
    gap:
      'Pure logistics provider — no digital experience, no companion product, no usable mobile app. Long queues, dated UX, zero traveler empathy. Indians dread VFS appointments.',
    indiaContext:
      'Very high India relevance — mandatory touchpoint for Schengen, UK, Canada visas. Cannot be bypassed. Atlys partnership play: Atlys prepares the perfect application, traveler just submits at VFS in 10 minutes instead of 2 hours of panic.',
    strategy: 'collaborate',
    phases: [TravelPhase.PRE_DEPARTURE],
  },

  // ── OTA / BOOKING LAYER ────────────────────────────────────────────────────

  {
    name: 'MakeMyTrip',
    revenue: '$782M FY2024',
    valuation: '$8B+ (NASDAQ: MMYT)',
    whatTheyDo:
      "India's dominant OTA. Flights, hotels, buses (redBus), holidays, homestays, trains. 50–60% India OTA market share. Owns Goibibo and redBus. 60M+ customers.",
    model:
      'Commission on bookings (8–12% hotels, 2–4% flights), subscription (myBiz for corporates), ancillaries (insurance, visa-adjacent).',
    gap:
      'No visa processing. No pre-trip companion. No arrival services. Treats Indian travel as a transaction, not a journey. No on-ground companion capability.',
    indiaContext:
      'THE primary India competitor. Every Atlys feature must answer: why here instead of MMT? The answer is visa data + companion intelligence. Atlys cannot win on inventory — it wins on context.',
    strategy: 'compete',
    phases: [TravelPhase.DREAMING, TravelPhase.PRE_DEPARTURE],
  },

  {
    name: 'EaseMyTrip',
    revenue: '₹643 Cr (~$77M) FY2024',
    valuation: '~$400M (NSE listed)',
    whatTheyDo:
      "India's #2 OTA with zero-convenience-fee positioning. Strong in Tier 2/3 India. Flights, hotels, holiday packages. Growing international packages business.",
    model: 'Zero-fee flights (revenue from hotels, packages, insurance), ancillaries.',
    gap:
      'Thinner product depth than MMT. No international companion capability. No visa. Weaker brand for NRI travelers.',
    indiaContext:
      'Relevant in Tier 2/3 cities — exactly where Atlys wants to expand next. Priya (first-time traveler from Pune) uses EaseMyTrip. Strong distribution partner opportunity for visa upsell at checkout.',
    strategy: 'collaborate',
    phases: [TravelPhase.DREAMING, TravelPhase.PRE_DEPARTURE],
  },

  {
    name: 'Agoda',
    revenue: 'Part of Booking Holdings $21.4B (2024)',
    valuation: 'Subsidiary of Booking Holdings',
    whatTheyDo:
      'Asia-focused hotel and accommodation platform. Strong in Southeast Asia and UAE. Used heavily by Indian travelers going to Thailand, Bali, Singapore, Dubai.',
    model: 'Commission (15–25% hotels). Free cancellation as differentiator.',
    gap:
      'Hotels only. No flights, no visa, no activities, no on-ground companion. No group booking coordination. No pre-trip intelligence.',
    indiaContext:
      'High India relevance for Southeast Asia and Gulf destinations — exactly where most Indian outbound travel goes. Atlys processes visas for most Agoda-popular destinations. Integration: Visa-ready hotel booking at Agoda checkout.',
    strategy: 'collaborate',
    phases: [TravelPhase.PRE_DEPARTURE],
  },

  // ── ESIM / CONNECTIVITY ────────────────────────────────────────────────────

  {
    name: 'Airalo',
    revenue: 'Undisclosed — $1B+ valuation (unicorn 2025), $220M raised',
    valuation: '$1B+ (Unicorn, 2025)',
    whatTheyDo:
      "World's largest eSIM marketplace. 200+ countries, 20M+ users globally. Sells data-only eSIMs. No local virtual number. No arrival companion. No visa or trip context integration.",
    model: 'Retail eSIM plans ($4–$99). B2B white-label API for travel companies.',
    gap:
      'Data-only — the OTP Hurdle is completely unsolved. No local virtual number means Grab, Gojek, and local food apps still do not work. No trip intelligence. Zero companion value.',
    indiaContext:
      'Growing among tech-savvy Indian travelers but no India-specific traction data. Only 20M global users vs India\'s 27M annual outbound trips. OTP Hurdle gap is entirely open — Airalo cannot solve it because they have no visa data.',
    strategy: 'cannibalize',
    phases: [TravelPhase.PRE_DEPARTURE, TravelPhase.IN_TRANSIT],
  },

  // ── EXPERIENCES / ON-GROUND ────────────────────────────────────────────────

  {
    name: 'Headout',
    revenue: '$130M (2024)',
    valuation: '$75.8M raised — private, valuation undisclosed',
    whatTheyDo:
      'Last-minute experiences, tours, and activities in 100+ cities. India-founded (Bangalore). Premium UX, trust-first positioning. Acquired Dabble (AI) in 2024. Fluffy AI chatbot: FAQ-level NLP, cannot book or provide safety guidance.',
    model: 'Commission (20–30% on experience bookings). No subscription. No B2B.',
    gap:
      'Experiences only — active in Phase 4. No visa, no pre-departure, no arrival, no on-ground companion beyond curated experiences. Fluffy cannot book, track expenses, or provide safety guidance. Zero connectivity play.',
    indiaContext:
      'India-registered, India-founded. Most India-aware of the experience platforms. Indians use Headout for Dubai, London, New York experiences. Atlys positioning: not a competitor — the Companion Layer above it. Headout has the boutique. Atlys has the companion.',
    strategy: 'collaborate',
    phases: [TravelPhase.ON_GROUND],
  },

  {
    name: 'Klook',
    revenue: '$417M global (2024)',
    valuation: '$1.4B (Series E)',
    whatTheyDo:
      'Asia-focused activities, tours, transport passes, and attraction tickets. 1M+ experiences across 2,500+ destinations. Supermarket model — breadth over depth.',
    model: 'Commission (20–30%). Also sells rail passes, attraction bundles.',
    gap:
      'India revenue: only $270K FY2024 — virtually zero India presence. Southeast Asia and East Asia are primary markets. No visa. No companion. No local intelligence.',
    indiaContext:
      'NOT a real India competitor — $270K India revenue is noise. Indian travelers going to Southeast Asia might encounter Klook, but Klook has made zero India-market investment. Do not overweight in positioning.',
    strategy: 'ignore',
    phases: [TravelPhase.ON_GROUND],
  },

  // ── TRAVEL FINTECH ─────────────────────────────────────────────────────────

  {
    name: 'Niyo Global',
    revenue: 'Undisclosed — ₹300Cr+ raised, Series C',
    valuation: '$210M (2022)',
    whatTheyDo:
      "India's leading zero-forex international travel card. 1.5M customers. Works on Visa network. Instant account opening. No forex markup. Travel insurance and airport lounge access.",
    model:
      'Interchange revenue on card spends, premium subscription (Niyo Global+), travel insurance distribution.',
    gap:
      'Card only — no booking, no visa, no companion. 1.5M users is small vs India\'s 27M outbound travelers. No trip intelligence — knows spend data but not trip context.',
    indiaContext:
      'High India relevance for the expense layer. Arjun uses Niyo or Wise for forex. Atlys partnership: visa approved → link Niyo card → auto-track trip expenses. Collaboration makes both products stronger.',
    strategy: 'collaborate',
    phases: [TravelPhase.PRE_DEPARTURE, TravelPhase.ON_GROUND, TravelPhase.POST_TRIP],
  },

  // ── NAVIGATION / DISCOVERY ─────────────────────────────────────────────────

  {
    name: 'Google Maps',
    revenue: 'Part of Alphabet $350B revenue (2024)',
    valuation: 'N/A — Alphabet subsidiary',
    whatTheyDo:
      "Navigation, local business discovery, reviews, transit directions. 'Things to Do' feature competes with TripAdvisor. Offline maps. Real-time traffic.",
    model: 'Free (ad-supported). Revenue via local business ads.',
    gap:
      'No booking. No safety layer. No visa context. No group coordination. No personalization — does not know you are a tourist. Fails in Digital Blackout zones (no SIM = no Maps).',
    indiaContext:
      'Default navigation for all Indian travelers internationally. Cannot be beaten on navigation. Atlys layers on top: Maps gets you there. Atlys keeps you safe when you arrive.',
    strategy: 'collaborate',
    phases: [TravelPhase.IN_TRANSIT, TravelPhase.ON_GROUND],
  },

  {
    name: 'ChatGPT / AI Assistants',
    revenue: 'OpenAI $3.7B ARR (2024), growing 170% YoY',
    valuation: '$157B (OpenAI, Dec 2024)',
    whatTheyDo:
      'Conversational AI used for trip planning, itinerary building, packing lists, and destination research. 19% of travelers used AI for trip planning in 2024, up from 14% in 2023.',
    model: 'Freemium subscription ($20/month Plus). API licensing.',
    gap:
      'Cannot book. Cannot process visas. No real-time safety data. No local number. No arrival services. No accountability — if the AI itinerary is wrong, there is no one to call.',
    indiaContext:
      'Fast-growing adoption among Indian tech professionals. The real disruption in the Dreaming and Research phases. Atlys response: become the action layer under AI answers. When ChatGPT suggests Lisbon, Atlys is the check visa and activate arrival guard button underneath.',
    strategy: 'collaborate',
    phases: [TravelPhase.DREAMING, TravelPhase.PRE_DEPARTURE],
  },

  // ── SOCIAL / INSPIRATION ───────────────────────────────────────────────────

  {
    name: 'Instagram & YouTube',
    revenue: 'Meta $165B (2024). YouTube $36.1B (2024)',
    valuation: 'N/A — subsidiaries',
    whatTheyDo:
      'Primary travel inspiration for Indian travelers. Instagram Reels and YouTube travel vlogs drive destination discovery. Cannot book, cannot verify visa requirements. Hype does not equal reality.',
    model: 'Ad-supported. Creator monetization via affiliate and brand deals.',
    gap:
      'Zero visa integration. Cannot say you can actually go here. The hype-to-reality gap is massive — influencers show Santorini, not the Schengen rejection rate for Indian passports.',
    indiaContext:
      'THE primary inspiration source for Indian travelers. Every Atlys user started their journey watching a travel reel. GTM: embed visa feasibility widgets with travel creators — Check your visa for [destination] in every video description.',
    strategy: 'collaborate',
    phases: [TravelPhase.DREAMING],
  },

  // ── POST-TRIP / EXPENSE ────────────────────────────────────────────────────

  {
    name: 'Splitwise',
    revenue: '$6.6M–$25M (estimated, private). Acquired by Ramp (2025)',
    valuation: 'Acquired by Ramp for undisclosed amount',
    whatTheyDo:
      'Group expense splitting app. Manual entry only. Multi-currency support. 50M+ users globally. IOU tracking.',
    model: 'Freemium (Splitwise Pro $3/month). Now integrated into Ramp corporate expense.',
    gap:
      'Manual entry only — no OCR, no bank integration, no automatic expense capture. No travel context — treats a foreign restaurant the same as rent. No multi-currency auto-conversion at actual exchange rates.',
    indiaContext:
      'Well-known among Indian group travelers. Meera\'s anxiety is entirely what Splitwise fails at: real-time tracking, OCR for foreign receipts, automatic currency conversion. Atlys can solve all three because it has trip context Splitwise never will.',
    strategy: 'cannibalize',
    phases: [TravelPhase.ON_GROUND, TravelPhase.POST_TRIP],
  },
];
