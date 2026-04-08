import { TravelPhase, PersonaId, JourneyPhase } from '../../../shared/types';

// ─── RESEARCH NOTES ───────────────────────────────────────────────────────────
// Competitor lists per phase are India-market accurate as of April 2026.
// Klook ($270K India revenue), GetYourGuide (zero India ops), Viator (zero
// India ops), and Google Travel (discontinued 2019) have been removed.
// ChatGPT added as the real disruption in Dreaming/Research phase.
// VFS Global and iVisa added — they are Atlys's actual visa competitors.
// ──────────────────────────────────────────────────────────────────────────────

export const JOURNEY_PHASES: JourneyPhase[] = [
  {
    id: TravelPhase.DREAMING,
    title: 'Dreaming',
    emoji: '🌙',
    sceneTagline:
      'Everyone shows you the destination. Nobody tells you if you can actually get there.',
    standardFocus:
      'Destination inspiration via Instagram Reels and YouTube travel vlogs. Price alerts from MakeMyTrip. Best-time-to-visit listicles. ChatGPT itineraries. The traveler falls in love with a place — then discovers the visa requires 14 documents and a 6-week wait that nobody mentioned.',
    offbeatHook:
      "What if your dream destination came pre-filtered by visa reality — matched to your mood, your leave balance, and your Indian passport's actual approval odds — before you book a non-refundable flight?",
    hookName: 'The Visa Reality Check',
    hookQuote:
      "Don't fall in love with Santorini if your Schengen odds are 40%. Tell us your mood and your leave days — we'll find somewhere you'll actually reach.",
    atlysPlay:
      "Atlys is the only player who can say 'you can actually GO here' at the dreaming stage. Every destination shown is tagged: Visa-Easy (green — e-visa in 3 days), Visa-Moderate (yellow — 2–3 weeks), Visa-Complex (red — embassy appointment required). Mood + budget + passport reality = the only honest trip recommender in the market. Two bundles triggered by visa type: Tourist Visa activates the Cultural Insider Bundle (anti-tourist experiences, local number, serendipity engine). Business Visa activates the Community Builder Bundle (co-working spaces, networking events, airport fast-track).",
    personaAnxieties: {
      [PersonaId.ARJUN]:
        'I want a 5-day Europe trip but my last Schengen took 3 weeks just to get a slot. By the time I know I have the visa, the cheap flights are gone and the hotel has doubled in price.',
      [PersonaId.PRIYA]:
        "What if I pick a country, pay for flights, and my visa gets rejected? I'll lose ₹40,000 and my first international trip is over before it starts.",
      [PersonaId.RAHUL]:
        "I need Portugal, then Morocco, then Bali — but the Schengen 90/180 rule closes my Morocco window before my Bali visa activates. No app understands multi-destination nomad math.",
      [PersonaId.MEERA]:
        "We need somewhere with a straightforward visa, a beach for the kids, a temple for my in-laws, and ideally not a 14-hour flight with a toddler who has a passport photo where he's crying.",
    },
    competitorNames: [
      'Instagram & YouTube',
      'MakeMyTrip',
      'EaseMyTrip',
      'ChatGPT',
    ],
    gtmPlay:
      "Open the Visa Feasibility API to travel creators on YouTube and Instagram. Every 'Indian passport travel' video gets an Atlys embed: 'Check your visa for [destination].' Creator earns affiliate revenue. Atlys gets the highest-intent traffic in travel — someone who just watched 15 minutes about Japan and is actively deciding.",
    additionalHooks: [
      "The Anti-Tourist: We know which restaurants in Rome charge tourists 3x the local price — and where the locals actually eat. The best places have no Instagram page.",
      "The Window Hunter: Schengen appointment slots disappear in minutes. Atlys monitors embassy availability and notifies you the instant a slot opens. 'A Mumbai slot just opened for March 18 — claim it in 4 minutes.'",
      "Vibe-First Discovery: Feeling burnt out? Slow trip to a mountain town in Georgia (the country). Feeling adventurous? A budget week in Tbilisi with an easy e-visa in 3 days.",
    ],
  },

  {
    id: TravelPhase.PRE_DEPARTURE,
    title: 'Pre-Departure',
    emoji: '📋',
    sceneTagline:
      'Your visa is approved. This is the highest-trust moment in travel. What happens next?',
    standardFocus:
      'Book flights on MakeMyTrip. Book hotels on Agoda. Submit biometrics at VFS Global. Apply for insurance on Policybazaar maybe. Pack by guessing. 4 apps, 3 confirmation emails, a WhatsApp group with 8 people arguing about dates, 0 central view of whether you are actually ready.',
    offbeatHook:
      "The moment your visa is approved is the moment you trust an app more than at any other point in travel — you just handed it your passport and bank statements. What if that moment automatically set up your entire trip instead of just sending a PDF?",
    hookName: 'The Trust Trigger',
    hookQuote:
      "Visa approved. Your trip is now live. Packing list generated. eSIM matched. Arrival Guard queued. You're 87% ready — here's the 13% left.",
    atlysPlay:
      "Atlys owns the visa approval notification — the single most emotionally charged moment in pre-departure. No other player has this trigger. On approval: (1) Auto-generate packing list from destination micro-climate, trip duration, and persona type — not a generic template. (2) Recommend and activate eSIM with a local virtual number bundled in — solving the OTP Hurdle before the traveler even knows it exists. (3) Document vault — visa, flight, hotel confirmations organized in one shareable link. (4) Begin Arrival Protocol setup: pre-book Green Stripe transfer, queue arrival guard activation. (5) Bundle activation: Tourist Visa triggers Cultural Insider. Business Visa triggers Community Builder.",
    personaAnxieties: {
      [PersonaId.ARJUN]:
        'I have bookings across MakeMyTrip, Agoda, and my corporate travel portal and none of them talk to each other. I built a spreadsheet to track my own trip. The spreadsheet has a contingency tab.',
      [PersonaId.PRIYA]:
        "Did I fill the visa form correctly? Is my bank statement sufficient? What if immigration questions me about something I have not prepared for? I've read every visa rejection Reddit thread and I'm more scared than before.",
      [PersonaId.RAHUL]:
        "I'm applying for Portuguese residency, a Moroccan tourist visa, and a Bali e-VOA simultaneously — different photo sizes, bank statement formats, and timelines. There is no app that understands this is one trip.",
      [PersonaId.MEERA]:
        '4 visa applications, different requirements for the child vs adults vs seniors. One missing document and none of us board. I have made 3 checklists and checked them twice and I am still not certain.',
    },
    competitorNames: [
      'MakeMyTrip',
      'EaseMyTrip',
      'Agoda',
      'iVisa',
      'VFS Global',
      'Airalo',
      'Niyo Global',
    ],
    gtmPlay:
      "Airline integration at zero CAC. Pitch IndiGo and Air India: 'You lose bookings every time a passenger delays purchase due to visa uncertainty. We remove that uncertainty.' Revenue share on visa processing, not ticket sales. IndiGo sells 100M seats per year — even 0.5% conversion is 500K Atlys users at zero marketing spend.",
    additionalHooks: [
      "Micro-Culture Briefing: Don't tip in Tokyo. Don't order a cappuccino after 11AM in Italy. Don't use your left hand in Morocco. Delivered as a 90-second card, not a 40-page PDF.",
      "The Luggage Diet: Your destination has a laundromat every 3 blocks. You need 3 outfits, not 7. Generated from actual micro-climate data and your stated trip type.",
      "Visa EMI: The Schengen costs ₹12,000 in government fees. Apply now, pay in 3 installments. Atlys underwrites the risk. The visa fee becomes the loss-leader that acquires the traveler for everything downstream.",
    ],
  },

  {
    id: TravelPhase.IN_TRANSIT,
    title: 'The Tarmac Transition',
    emoji: '🛬',
    sceneTagline:
      'The 60 minutes between landing and your hotel. Every competitor goes dark here. This is the Zero Hour.',
    standardFocus:
      'Airline app shows the gate change. Nothing after customs. You land in a foreign country with no local SIM, no local currency, no idea which taxi is safe, and 12 people offering to help you. Your phone shows No Service. You have not slept since Mumbai. This is where MakeMyTrip, Agoda, and every OTA goes completely silent.',
    offbeatHook:
      'What if the most dangerous 60 minutes of any trip — the tarmac transition — were the most effortless? What if you landed and the entire arrival was already handled before you walked out of Arrivals?',
    hookName: 'The Arrival Protocol',
    hookQuote:
      "You've landed. Your Green Stripe driver is at Gate 3, Column B. Your eSIM is live. You have a local number. You are not prey.",
    atlysPlay:
      "The Arrival Protocol is Atlys's most defensible moat. Three layers: (1) CONNECTIVITY — eSIM activated in-flight so it's live the moment you land. Bundled local virtual number eliminates the OTP Hurdle permanently: Grab, Gojek, and local food delivery apps now work. No competitor can offer this because none of them have visa data confirming when you travel. (2) PHYSICAL TRUST ANCHOR — Green Stripe driver: a visually distinct identifier waiting in Arrivals. In a sea of unlicensed touts, the Green Stripe is a beacon. Pre-priced, pre-booked, automatically rescheduled if your flight delays. (3) AGENTIC PROACTIVITY — flight delayed by 2 hours: Atlys detects via flight API and sends a WhatsApp message: 'I saw the delay. Your Green Stripe driver is now arriving at 8PM. No action needed.' The traveler does nothing. This is what anticipatory engine means in practice.",
    personaAnxieties: {
      [PersonaId.ARJUN]:
        "My Dubai-to-London connection is 2 hours. Is that enough with immigration? Does my checked bag transfer automatically or do I recheck? I've asked 3 people and got 3 different answers.",
      [PersonaId.PRIYA]:
        "I've never cleared immigration alone. What if they ask me something I don't know? What if my visa has an error? Which taxi is safe? The airport looks nothing like the Google Images photo I memorized.",
      [PersonaId.RAHUL]:
        "Low anxiety — he's done this 40 times. But he still needs: fastest route to the coworking space, local SIM with hotspot capability, and the street food spot 10 minutes from the hostel that isn't on TripAdvisor.",
      [PersonaId.MEERA]:
        "The baby is screaming. The gate changed. I can't find the family bathroom. I have 4 passports, a stroller, a mother-in-law who needs a wheelchair, and I haven't slept since the 2AM cab to the airport.",
    },
    competitorNames: [
      'IndiGo App',
      'Air India App',
      'Google Maps',
      'Uber',
    ],
    gtmPlay:
      'Physical presence at BOM/DEL/BLR international terminals — a QR code display between security and boarding gates: First international trip? Activate your Arrival Protocol. Converts at peak anxiety. Zero digital CAC. Cost of 3 airport displays: trivial vs the LTV of an acquired Atlys companion user.',
    additionalHooks: [
      "Airport Survival Mode: Quietest bathroom in Terminal 2. Free WiFi password posted at Gate 14. The currency exchange counter that doesn't charge 8%. The one bench at T5 Heathrow that's actually horizontal.",
      "Unlock Your Arrival Guard: not 'Book Airport Transfer.' Not 'Buy eSIM.' 'Unlock Your Arrival Guard' — because you're not buying a service, you're activating a safety layer built for this exact moment.",
      "Connection Anxiety Meter: Real-time confidence percentage that you will make your connection. Updates as you move through immigration. 'You have a 94% chance of making your connection. Walk, do not run.'",
    ],
  },

  {
    id: TravelPhase.ON_GROUND,
    title: 'On-Ground',
    emoji: '🗺️',
    sceneTagline:
      'You have a local number now. Every app in this city thinks you are a local.',
    standardFocus:
      'Browse Headout for activities. Check Google Maps for restaurants. Get overwhelmed by 847 unmissable options. Pay the tourist price for everything. Book the cab without knowing if it is safe. Eat at the closest place, not the best one. Manage group expenses on Splitwise manually in 3 currencies.',
    offbeatHook:
      'What if you had a local number — and suddenly Grab worked, the local food delivery app worked, the restaurant that rejects foreign credit cards accepted yours, and the taxi driver quoted you the same price as locals?',
    hookName: 'Hacked Icon Access',
    hookQuote:
      "Give us 3 hours and your caffeine tolerance. We'll take you somewhere the influencers haven't found yet — and you'll get there at local prices.",
    atlysPlay:
      "Atlys doesn't build a Headout boutique or a Klook supermarket. Atlys is the layer underneath both. The local virtual number from the eSIM bundle means: (1) OTP-gated local apps now work — Grab, Gojek, local food delivery — all suddenly accessible. This is invisible competitive advantage no travel app can offer without visa-level trust data. (2) Hacked Icon Access — curated experiences requiring insider knowledge: the rooftop without a sign, the market open only on Tuesday mornings, the museum with a queue-skip trick. Not a catalog — a secret handshake. (3) The Companion Layer — Serendipity Engine: 3-hour curated walk based on walking pace, caffeine preference, and mood. (4) Crisis Aversion — 3AM, stomach bug, unfamiliar city: nearest English-speaking pharmacy, clean bathroom, 24/7 diner — in 2 taps.",
    personaAnxieties: {
      [PersonaId.ARJUN]:
        "4 free hours in London between meetings. I don't want the London Eye. I want something I can't Google in 30 seconds. And I need to be back at Canary Wharf by 6PM sharp.",
      [PersonaId.PRIYA]:
        "Is this neighborhood safe at night? Can I eat street food without getting sick? What if I get lost and nobody speaks Hindi or English? I don't want to be the tourist who got scammed on her first solo trip.",
      [PersonaId.RAHUL]:
        "I don't want Headout's Top 10 things in Lisbon. I want the cafe where Portuguese writers actually go. I want the bar with no Instagram page. I want to live here for a week, not visit.",
      [PersonaId.MEERA]:
        "We need to split: husband takes the teenager surfing, I take the 5-year-old to the kids' pool, in-laws want the temple tour. 3 simultaneous itineraries, 1 shared budget, and someone has to reconcile who paid for what at the end.",
    },
    competitorNames: [
      'Headout',
      'Google Maps',
      'Instagram',
      'Splitwise',
      'Niyo Global',
    ],
    gtmPlay:
      "The local virtual number is the distribution channel. When a traveler uses their Atlys-issued number to sign up for Grab, Grab knows this user came via Atlys. Negotiate a data-sharing and revenue-share agreement: Atlys sends Grab high-value Indian tourists who spend 3x locals, Grab sends Atlys activity attribution data. Both win. The traveler never sees the deal — they just experience 'everything works.'",
    additionalHooks: [
      "Serendipity Engine: Put away the itinerary. Random curated walk — 3 hours, your caffeine tolerance as input, a 'take me home' button always visible. Surprise is the feature.",
      "Crisis Aversion (The Panic Button): Jet-lagged at 3AM with a stomach bug in an unknown neighborhood. Nearest English-speaking pharmacy, cleanest public bathroom, 24/7 diner with something plain — in 2 taps. The Guardian.",
      "The Local Price Benchmark: This restaurant in Bali is charging you ₹800 for nasi goreng. The local price is ₹120. The equivalent place is 200 meters away. We know because we track it.",
      "Tap-and-Go Entry: NFC tap at Burj Khalifa, skip the 45-minute queue. Atlys users get pre-purchased priority access — not a separate booking, built into the Cultural Insider bundle.",
    ],
  },

  {
    id: TravelPhase.POST_TRIP,
    title: 'Post-Trip',
    emoji: '🏠',
    sceneTagline:
      'Your trip is over. Your visa history is just beginning.',
    standardFocus:
      '600 photos dumped into Google Photos. 2 hours on Splitwise manually entering receipts from 3 countries in 3 currencies. A TripAdvisor review nobody asked you to write. 4 days of post-trip blues. Thinking about the next trip but not seriously — because the visa process was exhausting.',
    offbeatHook:
      'What if your trip ended with a 2-minute closure — expenses auto-reconciled, photos curated into a timeline, and 3 next destinations suggested based on what you actually loved — each pre-checked for your visa approval odds?',
    hookName: 'Reverse Culture Shock',
    hookQuote:
      "You're home. Everyone's been paid back. Here's your trip timeline. Here are 3 places that match what you loved — and your Atlys history means the visa takes 4 days next time, not 4 weeks.",
    atlysPlay:
      "Post-trip is where Atlys closes the flywheel and builds the moat. Three moves: (1) AUTO EXPENSE RECONCILIATION — Atlys tracked spending context during the trip via the local number. It pre-populates expense categories and auto-converts at the exchange rates actually paid, not today's rates. Meera never has to argue about who paid for what. (2) TRUST EQUITY — every completed Atlys trip adds to a verified travel history. Third trip: visa pre-approved in 48 hours instead of 2 weeks. Fifth trip: Green Stripe Traveler status — priority processing, dedicated support line, pre-filled applications. The loyalty program that is actually useful because it is built on verified data, not points. (3) FLYWHEEL RE-ENGAGEMENT — 'What did you love most about this trip?' feeds directly into dreaming-phase recommendations. 3 next destinations matched to stated preferences, each pre-tagged with visa feasibility. The loop closes: Post-Trip → Dreaming → Visa → Trust Trigger → Arrival Protocol → On-Ground → Post-Trip.",
    personaAnxieties: {
      [PersonaId.ARJUN]:
        "I need to reconcile 3 currencies and 14 receipts for corporate reimbursement by Friday. Hotel on corporate card, food on personal, taxis split 4 ways in cash. This will take 2 hours I don't have.",
      [PersonaId.PRIYA]:
        "I want to go again immediately. But the visa process was so stressful I don't know if I can handle a second rejection risk. What if I'm not lucky next time?",
      [PersonaId.RAHUL]:
        "I used 67 of my 90 Schengen days. I can re-enter in 23 days. But my Morocco stamp might complicate the next Schengen application. Is there an app that tracks this? There isn't.",
      [PersonaId.MEERA]:
        "The hotel was split 3 ways, dinner was just us, activities were separate budgets, and my father-in-law paid cash for 3 things nobody tracked. We have been arguing about ₹3,200 for a week.",
    },
    competitorNames: [
      'Splitwise',
      'Google Photos',
      'Instagram',
      'MakeMyTrip',
    ],
    gtmPlay:
      'Group expense settlement as viral acquisition. When Meera settles a 4-person trip through Atlys, each of the other 3 receives an Atlys notification showing what they owe. If they do not have the app, they download it to see and pay. Every group trip settlement is a 3–7 person acquisition event at zero CAC.',
    additionalHooks: [
      "The Atlys Travel Passport: a verified, shareable document — countries visited, visa history, Atlys Score, average processing time. Indians share travel milestones on LinkedIn. 'I completed my 10th international trip. My Atlys Score is Platinum.'",
      "Schengen Day Tracker: Exactly how many days remain in the 90/180 window — automated and always accurate. No spreadsheet. Atlys knows every trip because it processed every visa.",
      "Next Trip Pre-Approval: Based on your travel history, you are pre-approved for a UAE visa. Want us to start the process? Re-engagement friction reduced to zero.",
    ],
  },
];
