import { TravelPhase } from "../../shared/types";

export interface JourneyPhaseData {
  id: TravelPhase;
  title: string;
  emoji: string;
  standardFocus: string;
  offbeatHook: string;
  hookName: string;
  hookQuote: string;
  atlysPlay: string;
  competitorNames: string[];
  additionalHooks?: string[];
}

export const JOURNEY_PHASES: JourneyPhaseData[] = [
  {
    id: TravelPhase.DREAMING,
    title: "Dreaming",
    emoji: "🌙",
    standardFocus:
      "Find your perfect destination — price comparison, destination guides, travel inspiration via Instagram and YouTube influencers",
    offbeatHook:
      "What if you picked a trip based on your current emotional state instead of a sale alert?",
    hookName: "The Vibe Check",
    hookQuote:
      "Tell us your mood, leave days, and budget. We'll find somewhere you can actually go.",
    atlysPlay:
      "Atlys is the only player who can integrate visa feasibility into the dreaming phase. Nobody else can say 'you can actually GO here' before you've fallen in love with a destination you can't get a visa for. Mood + budget + visa reality check = the only honest trip recommender.",
    competitorNames: [
      "Instagram/YouTube",
      "MakeMyTrip",
      "Google Flights",
      "TripAdvisor",
      "Skyscanner",
    ],
    additionalHooks: [
      "The Anti-Tourist: We'll tell you exactly which restaurants in Rome are tourist traps — and where the locals actually go to hide from you.",
    ],
  },
  {
    id: TravelPhase.PRE_DEPARTURE,
    title: "Pre-Departure",
    emoji: "✈️",
    standardFocus:
      "Book flights, hotels, pack — reminders not to forget your toothbrush. Documents scattered across 3 apps and a WhatsApp group.",
    offbeatHook:
      "What if your packing list was generated from the actual micro-climate of your destination and the availability of laundry on your route?",
    hookName: "The Luggage Diet",
    hookQuote:
      "Your visa is approved. You're 87% ready. Here's the 13% you're missing.",
    atlysPlay:
      "Atlys owns the visa approval moment — the highest-trust event in the entire journey. That's the natural trigger to become the pre-trip command centre: packing list based on micro-climate, booking checklist, document vault, and a single dashboard that tells you exactly how ready you are.",
    competitorNames: [
      "MakeMyTrip",
      "Agoda",
      "Booking.com",
      "Atlys",
      "Policybazaar",
    ],
    additionalHooks: [
      "Micro-Culture & Etiquette: Don't tip in Tokyo. Don't order a cappuccino after 11 AM in Italy. Don't accept the first price in Istanbul.",
    ],
  },
  {
    id: TravelPhase.IN_TRANSIT,
    title: "In-Transit",
    emoji: "🛫",
    standardFocus:
      "Your gate has changed — airline apps, boarding passes, generic terminal maps that don't tell you where the good coffee is.",
    offbeatHook:
      "What if your phone knew the quietest bathroom, the fastest Wi-Fi password, and which bench is actually sleep-worthy at 2AM?",
    hookName: "Airport Survival Mode",
    hookQuote:
      "You're landing at Istanbul IST with a 6-hour layover. Here's the quietest corner, the free WiFi code, and a vegetarian restaurant open at 2AM.",
    atlysPlay:
      "Atlys already knows your itinerary from your visa application — destination, dates, transit airports. Use that data to surface hyper-local airport intelligence that turns a nightmare layover into a productive pause. No other app knows where you're transiting before you even land.",
    competitorNames: [
      "Airline apps",
      "Google Maps",
      "LoungeBuddy",
      "Currency apps",
    ],
  },
  {
    id: TravelPhase.ON_GROUND,
    title: "On-Ground",
    emoji: "🗺️",
    standardFocus:
      "Navigate to the Eiffel Tower — activities catalogs, tour bookings, restaurant recommendations, Google Maps.",
    offbeatHook:
      "What if instead of an itinerary, your app gave you an anti-itinerary — curated randomness with a panic button?",
    hookName: "Get Lost, Safely",
    hookQuote:
      "Give us 3 hours and your caffeine tolerance. We'll take you somewhere the influencers haven't found yet.",
    atlysPlay:
      "Atlys doesn't compete in activities (Klook's supermarket) or curated experiences (Headout's boutique). Atlys enters as the Full Journey Companion — the only player who knows who you are, where you are, and what you need RIGHT NOW. Safety net + serendipity engine + crisis aversion, all in one.",
    competitorNames: [
      "Headout",
      "Klook",
      "GetYourGuide",
      "Viator",
      "Google Maps",
      "Uber/Ola",
    ],
    additionalHooks: [
      "Serendipity Engine: Put away the spreadsheet. We'll surprise you with the city — but you're always one tap from safety.",
      "Crisis Aversion: Jet-lagged at 3AM with a stomach bug? English-speaking pharmacy, clean restroom, 24/7 diner — NOW.",
    ],
  },
  {
    id: TravelPhase.POST_TRIP,
    title: "Post-Trip",
    emoji: "🏠",
    standardFocus:
      "Share your photos — Instagram highlights, Google reviews, Splitwise expense splits done manually from a pile of foreign receipts.",
    offbeatHook:
      "What if your app helped you land back home as gently as it helped you take off?",
    hookName: "Reverse Culture Shock",
    hookQuote:
      "Your trip is over. Here's what everyone owes, a 2-minute reflection, and 3 places that match what you loved — for next time.",
    atlysPlay:
      "Turn post-trip closure into the start of the next visa. Auto-curated photo timeline + automatic expense reconciliation (tracked in-trip) + next-destination inspiration based on what you actually loved — feeding directly back into the Atlys visa flywheel. The re-engagement loop nobody else can close.",
    competitorNames: ["Instagram", "Google Photos", "Splitwise", "TripAdvisor"],
    additionalHooks: [
      "The Flywheel: post-trip reflection → next trip inspiration → visa feasibility check → book again through Atlys.",
    ],
  },
];
