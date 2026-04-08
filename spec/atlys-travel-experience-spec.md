# Atlys Travel Experience — Spec Doc v2
## Complete Brief for Claude Code Build

**Purpose:** Interactive scrollytelling presentation for Atlys Head of Growth interview. A LEGO-style Indian traveler walks through their entire journey — the viewer watches the story unfold, seeing pain points, competitors, market values, and Atlys's play at every stage. Ends with 3 strategic hypotheses and a GTM recommendation.

**Format:** Scrollytelling documentary — the viewer picks a persona, then WATCHES the journey. No gameplay. No chatbot. A visual narrative they absorb.

**Core narrative from the offbeat hooks script:**
> "It is incredibly tough to stand out in the travel app space when everyone else is shouting 'Book cheap flights!' To grab a traveler's attention, you have to bypass the glossy marketing and tap into the visceral, unglamorous, or highly specific micro-moments of traveling abroad."

**Reference:** LennyRPG by Ben Shih (Phaser 3 + Claude Code + ChatGPT for art, built in 8 hours)

---

## ACT 1: THE MARKET NOBODY SEES WHOLE

**Total Indian Travel Market:** $220B (2024) → $470B+ (2030)
- 2.5B domestic trips/year + 27M outbound trips (→ 50M by 2030)
- 73-75% booked online
- 9/10 international trips led by millennials/Gen Z

**Segment Breakdown:**

| Segment | Market Size (2025) | 2030 Projection | Top Players | Atlys Today |
|---------|-------------------|-----------------|-------------|-------------|
| Flights | $25-51B | $38-124B | MakeMyTrip (60%), EaseMyTrip, Ixigo | ❌ Not here |
| Hotels | $8.95B | $14.58B | MakeMyTrip (60%), OYO, Booking.com, Agoda | ❌ Not here |
| Activities/Experiences | $300B+ (global) | Growing fast | Klook ($417M rev), GetYourGuide (€1B rev), Headout, Viator ($840M rev) | ❌ Not here |
| Ground Transport | $1.9B | Growing 21% | RedBus (75%), Ixigo, Ola/Uber | ❌ Not here |
| Travel Insurance | $1.17-1.33B | $3.76B | Policybazaar, direct insurers | ❌ Not here |
| Visas | $34.26M (India e-visa) | $8.7B (global, 2031) | **Atlys**, iVisa, VFS Global | ✅ Atlys owns this |
| Food/Dining | 50%+ of trip spend motivation | — | Zomato, TripAdvisor, Google Maps | ❌ Not here |

**Visual punchline:** Atlys owns 1-2% of the pie. The other 98% is the journey.

---

## ACT 2: CHARACTER SELECT — PICK YOUR TRAVELER

4 LEGO-style characters. Viewer picks one. The journey adapts to their personality — same phases, different anxieties.

**Character art:** Generated in ChatGPT (DALL-E), pixel art LEGO minifigure style, transparent backgrounds, 64x64 or 128x128 sprites. Saved as PNG assets in `/assets/characters/`.

### 1. ARJUN — NRI Professional (Dubai, 6-8 trips/yr)
- **One-liner:** "I travel 6 times a year and I'm still copying booking confirmations into a spreadsheet."
- **Look:** Smart casual blazer, AirPods, compact carry-on suitcase
- **Personality:** Efficient, repeat traveler, values time over money, hates friction

### 2. PRIYA — First-Time Traveler (Pune)
- **One-liner:** "I want to see the world but I'm terrified I'll get rejected at the visa, the airport, or the restaurant."
- **Look:** Kurti with jeans, overstuffed backpack, clutching passport
- **Personality:** Over-researches, anxious, needs reassurance, proud when she does it

### 3. RAHUL — Digital Nomad (Lisbon-Bali circuit)
- **One-liner:** "I'm juggling 3 visas across 3 countries and no app understands that my trip doesn't have a return date."
- **Look:** Linen shirt, flip-flops, laptop bag with stickers, sunglasses on forehead
- **Personality:** Pro traveler, lives like a local, hates tourist infrastructure, always planning

### 4. MEERA & FAMILY — Family of 4 (Toddler, Teenager, In-Laws)
- **One-liner:** "I'm planning a holiday for a toddler, a teenager, and my in-laws — and managing 4 passports while doing it."
- **Look:** Salwar kameez, toddler on hip, teenager with headphones, elderly in-law with walking stick, 4 passports fanned in hand
- **Personality:** Coordinator-in-chief, safety-first, needs activities for all ages, drowning in logistics

---

## ACT 3: THE JOURNEY — 5 PHASES

Each phase is one scene. The LEGO character walks a path. Pain points appear as obstacles. Competitors appear as buildings/NPCs along the road. Gaps glow as empty spaces. Atlys opportunities emerge as power-ups.

The offbeat hooks script provides the framing for each phase.

---

### PHASE 1: DREAMING 🌙
**Standard:** "Find your perfect destination"
**Offbeat:** THE VIBE CHECK — Match trips to emotional state, not price

#### What Happens
Traveler scrolls Instagram, watches vlogs, asks WhatsApp groups, Googles destinations.

#### Competitors at This Phase
| Player | What They Do | Market Value | Gap |
|--------|-------------|-------------|-----|
| Instagram/YouTube | Inspiration via influencers | Free (ad-supported) | Can't book, can't verify, hype ≠ reality |
| MakeMyTrip | Destination guides, deals | Part of $25-51B | Generic, not personalized to mood |
| Google Flights | Price exploration | Free | No inspiration, just logistics |
| TripAdvisor | Reviews, rankings | Ad-supported | Overwhelming, not mood-matched |
| Skyscanner | "Explore Everywhere" | Free metasearch | Price-first, not vibe-first |

#### Pain Points by Persona
| Persona | Anxiety at This Phase |
|---------|----------------------|
| **Arjun** | "Can I get the visa in time? Last time the Schengen slot took 3 weeks to appear" |
| **Priya** | "What if I pick a country and my visa gets rejected? I'll waste money on flights I can't use" |
| **Rahul** | "I need a visa for Portugal, then hop to Morocco, then back to Bali. The visa timelines don't overlap cleanly" |
| **Meera** | "We need a place that works for a 5-year-old, a 70-year-old, and everyone in between — and the visa can't be complicated with kids' docs" |

#### Atlys Play
**"The Vibe Check":** Tell us your mood, budget, leave days. We match destinations where the visa is achievable, the flight is affordable, and the vibe is right.

Atlys is the ONLY player who can integrate visa feasibility into the dreaming phase. Nobody else can say "you can actually GO here."

**Also: "The Anti-Tourist" hook:**
> "We'll tell you exactly which restaurants in Rome are tourist traps — and where the locals actually go to hide from you."

---

### PHASE 2: PRE-DEPARTURE ✈️
**Standard:** "Don't forget your toothbrush"
**Offbeat:** THE LUGGAGE DIET — Packing based on micro-climates and laundry availability

#### What Happens
Books flights (MakeMyTrip), hotels (Agoda/Booking), visa (Atlys), insurance (maybe), packs, panics about documents.

#### Competitors at This Phase
| Player | What They Do | Market Value | Gap |
|--------|-------------|-------------|-----|
| MakeMyTrip | Flights + Hotels | $25-51B flights, $8.95B hotels | No visa integration, no pre-trip dashboard |
| Agoda | Hotels (Asia-strong) | Part of $8.95B | Hotels only, no activities, no visa |
| Booking.com | Hotels + some activities | Global giant | Generic, not India-optimized |
| Atlys | Visa processing | $34.26M e-visa | Stops after visa approval |
| Policybazaar | Travel insurance | $1.17B | Insurance only, not integrated |

#### Pain Points by Persona
| Persona | Anxiety at This Phase |
|---------|----------------------|
| **Arjun** | "I have 4 bookings across 3 apps and none of them talk to each other" |
| **Priya** | "Did I fill the form correctly? Is my bank statement enough? What if they ask something at immigration?" |
| **Rahul** | "I'm applying for 3 visas simultaneously with different requirements and timelines" |
| **Meera** | "Managing 4 visa applications simultaneously is a full-time job. One missing document and we ALL can't go" |

#### Atlys Play
**"The Luggage Diet" + Pre-Trip Command Center:** Your visa is approved. Here's your packing list based on micro-climate. Here are your bookings. Here's what you still need. You're 87% ready.

Atlys owns the visa approval moment — the natural trigger to become the pre-trip dashboard.

**Also: "Micro-Culture & Etiquette":**
> "Don't tip in Tokyo. Don't order a cappuccino after 11 AM in Italy."

---

### PHASE 3: IN-TRANSIT 🛫
**Standard:** "Your gate has changed"
**Offbeat:** AIRPORT SURVIVAL MODE — Quietest bathrooms, fastest Wi-Fi, sleep-worthy benches

#### What Happens
Navigates airport, deals with layovers, currency exchange, SIM cards, anxiety.

#### Competitors at This Phase
| Player | What They Do | Gap |
|--------|-------------|-----|
| Airline apps | Gate info, boarding pass | Only their airline, nothing about the airport |
| Google Maps | Terminal navigation | Not optimized for airports, no insider tips |
| LoungeBuddy | Lounge access | Premium only, not for budget travelers |
| Currency apps | Exchange rates | No location of best exchange counters |

#### Pain Points by Persona
| Persona | Anxiety at This Phase |
|---------|----------------------|
| **Arjun** | "My Dubai-London connection is 2hrs. Is that enough with immigration?" |
| **Priya** | "Where do I go after landing? What's immigration like? What if they question me?" |
| **Rahul** | Low anxiety — he's done this 20+ times. Self-sufficient. |
| **Meera** | "The baby is screaming, the gate changed, and I can't find the family bathroom" |

#### Atlys Play
**"Airport Survival Mode":** You're landing at Istanbul IST with a 6-hour layover. Here's the quietest corner in Terminal 1, the free WiFi code, and a restaurant that serves vegetarian food at 2AM.

---

### PHASE 4: ON-GROUND 🗺️
**Standard:** "Navigate to the Eiffel Tower"
**Offbeat:** GET LOST, SAFELY — Anti-itineraries with a panic button

#### What Happens
Explores, books activities, eats, navigates, panics about safety, manages expenses.

#### Competitors at This Phase (THE BIG BATTLEGROUND)
| Player | Revenue/Valuation | What They Do | Model | Gap |
|--------|------------------|-------------|-------|-----|
| Headout (+Fluffy AI) | $50-100M rev, $75.8M funded | Last-minute activities, AI chatbot | Boutique: curated, trust-building, delightful UX | Activities only. Fluffy is FAQ-level — no booking, no safety, no expenses, no group coordination |
| Klook | $417M rev, $1.4B valuation | Asia activities, tours, tickets | Supermarket: massive catalog, scale, price | Breadth not depth. No personalization, no companion, no visa |
| GetYourGuide | €1B+ rev, $2B+ valuation | Premium experiences globally | Premium: high-quality, curated | Expensive. No India focus. No personalization |
| Viator (TripAdvisor) | $840M rev | Widest catalog globally | Catalog: everything everywhere | Overwhelming. No curation. No AI companion |
| Google Maps | Free | Navigation, reviews | Utility | No booking, no companion, no safety layer |
| Uber/Ola | — | Point-to-point transport | On-demand | Transport only |

#### Pain Points by Persona
| Persona | Anxiety at This Phase |
|---------|----------------------|
| **Arjun** | "I have 4 hours free in London. Don't waste my time with tourist stuff" |
| **Priya** | "Is this area safe? Can I eat this food? What if I get sick? I don't speak the language" |
| **Rahul** | "I don't want Headout's 'Top 10 things to do.' I want the cafe where the Portuguese writers hang out" |
| **Meera** | "We can't all do the same activity. I want to explore, kids want a pool, in-laws want temples" |

#### Atlys Play — THREE hooks converge:

**"Get Lost, Safely":** Give us 3 hours, your walking speed, caffeine tolerance. Random curated walk — with a 'take me home' panic button.

**"Serendipity Engine":** Put away the spreadsheet. We'll surprise you with the city — but you're always one tap from safety.

**"Crisis Aversion" (The Panic Button):** Jet-lagged at 3AM with a stomach bug? English-speaking pharmacy, clean restroom, 24/7 diner — NOW.

---

### PHASE 5: POST-TRIP 🏠
**Standard:** "Share your photos"
**Offbeat:** REVERSE CULTURE SHOCK — Easing the transition back to normal life

#### What Happens
Dumps photos, settles expenses, writes reviews (maybe), feels post-trip blues, thinks about next trip.

#### Competitors at This Phase
| Player | What They Do | Gap |
|--------|-------------|-----|
| Instagram | Photo sharing | Curated highlight reel, not memory preservation |
| Google Photos | Backup, auto-albums | No travel context, no journaling |
| Splitwise | Expense splitting | Manual entry, no OCR, no travel categories |
| TripAdvisor/Google Reviews | Review writing | Feels like a chore, no incentive |

#### Pain Points by Persona
| Persona | Anxiety at This Phase |
|---------|----------------------|
| **Arjun** | "I need to reconcile 3 currencies and 12 receipts for reimbursement" |
| **Priya** | "I want to go again but the visa process was so stressful I don't know if I can handle it" |
| **Rahul** | "My 90/180 Schengen days are running out. When can I re-enter?" |
| **Meera** | "Who paid for what? The hotel was split 3 ways but dinner was just us. This is a mess" |

#### Atlys Play
**"Reverse Culture Shock" + Trip Closure:** Your trip to Bali is over. Here's your auto-curated photo timeline. Here's what everyone owes (we tracked it). Here's a 2-minute reflection journal. And here are 3 destinations that match what you loved — for next time.

The re-engagement flywheel: post-trip reflection → next trip inspiration → visa check → book again through Atlys.

---

## ACT 4: THREE HYPOTHESES (Presented Honestly)

### H1: Visa is a Trust Wedge (Not a Ceiling)
- **Thesis:** Visa approval is a trust moment no one else has. If you trust Atlys with your passport + money, you'll trust them with flights and hotels. Headout/Klook capture you on-ground when you're already distracted across 5 apps — they never had a trust-building moment.
- **Scores:** Defensibility 7 | Revenue 6 | Feasibility 8 | Moat 6
- **Weakness:** Trust alone isn't a moat. Klook could build visa for Asia. Habit is real but not defensible against $1B+ competitors.

### H2: Visa Data is the Richest Travel Intent Signal (STRONGEST)
- **Thesis:** Every visa application gives Atlys: destination, dates, party size, budget, risk profile. That's the highest-fidelity travel intent data in the market. Klook guesses based on browsing. Atlys KNOWS because you told them on the visa form.
- **Scores:** Defensibility 8 | Revenue 7 | Feasibility 6 | Moat 8
- **Strength:** Genuinely unique and predictive. Defensible for 5-7 years until competitors build their own intent layers.

### H3: Journey Fragmentation is Unmonetized (BIGGEST UPSIDE)
- **Thesis:** The $470B market is fought over at the booking layer. But moments BETWEEN bookings — jet lag at 3AM, tourist trap anxiety, group expense chaos, post-trip blues — nobody monetizes. They're too small for MakeMyTrip, too niche for Headout. But collectively, that's where loyalty is built.
- **Scores:** Defensibility 7 | Revenue 9 | Feasibility 5 | Moat 7
- **Risk:** Requires Atlys to execute across 5 product challenges. Klook/Headout have 18 months to preempt.

### Visual
Show a 2x2 scoring matrix: Defensibility × Revenue Potential. H2 in the top-right (strong on both). H3 high on revenue but lower on defensibility. H1 moderate on both.

---

## ACT 5: WHY NOT HEADOUT? WHY NOT KLOOK?

### Positioning Matrix
```
                  Journey Breadth →
                  Single Phase              Full Journey
                  
Transactional     Headout (Boutique)        MakeMyTrip (Booking giant)
                  Klook (Supermarket)
                  GetYourGuide (Premium)
                  Viator (Catalog)
                  
Companion         Fluffy (FAQ chatbot)      ATLYS? ← nobody is here
                  only Phase 4
```

Nobody owns the "Full Journey + Companion" quadrant.

### Why Headout/Klook Can't Just Add Visas
1. **Regulatory:** Visa processing = government partnerships, embassy integrations, legal liability. Takes 18-24 months to build.
2. **Psychology mismatch:** Headout users book last-minute, impulse. Visa users plan 6-8 weeks ahead. Different app behavior. Adding visas breaks their funnel.
3. **Revenue model conflict:** Visa = high-friction, low-frequency. Activities = high-frequency, low-friction. Mixing dilutes their velocity.
4. **Liability:** Rejected visa because of an app error = lawsuit. Klook's insurance doesn't cover it.

### Why Atlys Can't Just Add Activities
1. **No supply side:** Klook has 10K+ seller relationships. Atlys has zero in activities.
2. **Margin dilution:** Activities are 15-25% commission vs 25-35% for visas.
3. **Brand conflict:** "Trust and safety" (visa) vs "impulse and serendipity" (activities).
4. **Solution:** Don't build supply. Integrate Klook/Headout APIs and become the curation/companion layer on top.

### The 18-Month Window
Klook is focused on IPO ($3-5B target). Headout is scaling activities supply. Neither is thinking about full-journey companion. That's Atlys's window.

---

## ACT 6: ATLYS'S GTM PLAY

### Don't Compete. Orchestrate.

Atlys doesn't win by booking better than MakeMyTrip or curating better than Headout. Atlys wins by being the layer that connects the entire journey.

### Primary Growth Loop: COLLABORATION
- **Mechanism:** Indians travel in groups. Group travel coordination (shared visa timelines, flight matching, hotel splitting, activity voting) = natural invite mechanic.
- **Why it works:** "Invite friends to your trip" → all users see each other's preferences → one person books, group commits.
- **Fit score:** 4/5

### Primary GTM Motion: PARTNERSHIPS
- **Mechanism:** Embed Atlys visa processing in airline booking flows (Air India, IndiGo). "Pay us to give your customers visa-ready checkout."
- **Why it works:** Zero CAC. Airline gets visa-ready customers. Atlys gets traveler data + repeat bookings.
- **Fit score:** 5/5

### Secondary GTM: ABM (Corporate Travel)
- **Mechanism:** Indian corporates need visa + flight + hotel for 100+ employees at once. Atlys = the tool HR uses.
- **Why it works:** High margin. Low churn. Enterprise contracts.
- **Fit score:** 4/5

### Phased Approach
- **Months 1-3:** Pilot collaboration loop + 1 airline partnership (Air India or IndiGo)
- **Months 4-6:** Launch corporate travel manager. Target 10 Fortune 500 India companies.
- **Months 7-12:** Scale airline partnerships to 3-4 carriers. License APIs to OTAs.

---

## ACT 7: THE PUNCHLINE

Visual: All 5 journey phases as a road. Competitors scattered across 2-3 phases each. Atlys stretches across ALL 5 as the connective thread.

> **"Atlys doesn't win by booking better. Atlys wins by knowing Indian travelers' intent before they do — and building trust through moments no one else cares about."**

Market value of what Atlys captures today: ~$34M
Market value of what Atlys COULD capture: $470B+

> **"Today, Atlys owns the visa. Tomorrow, Atlys owns the Indian traveler."**

---

## TECH SPEC FOR CLAUDE CODE BUILD

### Stack
- **Engine:** Phaser 3 (2D HTML5 game framework)
- **Bundler:** Vite (lightweight)
- **Art:** Pixel art LEGO characters generated in ChatGPT, saved as PNG sprites
- **Data:** Hardcoded JSON (market data, competitor info, persona pain points)
- **No backend** — static site, deployable anywhere

### Asset Requirements
- `/assets/characters/arjun.png` — 64x64 or 128x128, transparent BG
- `/assets/characters/priya.png` — same
- `/assets/characters/rahul.png` — same
- `/assets/characters/meera-family.png` — 192x128 (wider for group)
- `/assets/world/` — phase backgrounds (can be generated programmatically in Phaser)
- `/assets/icons/` — competitor logos, pain point icons, power-up icons

### Iteration Plan (following pm-os scaffold pattern)
Each iteration = one working commit to main. Each produces a viewable/playable state.

**Iteration 001:** Project scaffold + Phaser 3 + Vite boilerplate + title screen
**Iteration 002:** Character select screen (4 personas, one-liners, click to preview traits)
**Iteration 003:** Market overview screen (TAM visualization, segment breakdown)
**Iteration 004:** Phase 1 — Dreaming (Vibe Check, competitors, persona pain points)
**Iteration 005:** Phase 2 — Pre-Departure (Luggage Diet, booking competitors, persona pain points)
**Iteration 006:** Phase 3 — In-Transit (Airport Survival, persona pain points)
**Iteration 007:** Phase 4 — On-Ground (Get Lost Safely + Serendipity + Crisis, Headout/Klook battleground)
**Iteration 008:** Phase 5 — Post-Trip (Reverse Culture Shock, re-engagement flywheel)
**Iteration 009:** Hypotheses screen + competitive positioning matrix + GTM play
**Iteration 010:** Punchline screen + polish + transitions + final review

### CLAUDE.md for the project
```markdown
# Atlys Travel Experience — Gamified Presentation

## Persona & Constraints
Be concise. No sycophancy. Challenge ideas with rationale.
Small, focused iterations. Single axis of work per commit.
All commits to main must contain working code.
Content authoring is human work — agent handles structure and plumbing.

## Tech Stack
- Phaser 3 for game engine
- Vite for bundling
- No heavy frameworks. No React. No backend.
- Pixel art style — blocky LEGO characters, bright colors, clean

## Iteration Rules
- Each iteration produces a viewable/playable state
- Create work-log/YYYY-MM-DD/iteration-NNN.md before each iteration
- JTBD required before proceeding
- Close iterations: mark incomplete tasks as "carried forward," write one-paragraph decision summary

## Format
Scrollytelling documentary. Viewer picks a persona, then watches.
7 acts: Market → Character Select → Journey (5 phases) → Hypotheses → GTM → Punchline.
No gameplay. No chatbot. Visual narrative.

## Art Assets
Character PNGs in /assets/characters/ (generated in ChatGPT, LEGO pixel art style)
World/backgrounds generated programmatically in Phaser
Competitor data hardcoded in JSON

## Key Data Points to Display
- TAM: $220B (2024) → $470B+ (2030)
- Visa segment: $34.26M (Atlys today)
- Flights: $25-51B | Hotels: $8.95B | Activities: $300B+ global
- Competitor revenues: Klook $417M, GetYourGuide €1B+, Viator $840M, Headout $50-100M
- 4 personas with unique pain points per journey phase
- 3 hypotheses ranked by defensibility, revenue, feasibility, moat
- GTM: Collaboration loop + Partnerships + ABM
```

---

## SOURCES

- [Mordor Intelligence — India Online Travel Market](https://www.mordorintelligence.com/industry-reports/online-travel-market-in-india)
- [IBEF — Tourism & Hospitality](https://www.ibef.org/industry/tourism-hospitality-india)
- [Phocuswright — India Travel Market 2025](https://www.phocuswright.com/Travel-Research/Market-Overview-Sizing/India-Travel-Market-Essentials-2025)
- [Statista — India Travel Market](https://www.statista.com/outlook/mmo/travel-tourism/india)
- [Klook Revenue — Latka](https://getlatka.com/companies/klook)
- [GetYourGuide Profitability — Skift](https://skift.com/2025/10/21/getyourguide-profitable-travel-experiences/)
- [Viator Revenue — TripAdvisor IR](https://ir.tripadvisor.com/static-files/0d9c3dd8-ff4c-4a06-85b0-e641d90cfefe)
- [Headout Fluffy — Headout Studio](https://www.headout.studio/fluffy-your-ai-travel-companion/)
- [LennyRPG — How I Built It](https://www.lennysnewsletter.com/p/how-i-built-lennyrpg)
- [Phaser + Claude Code Tutorial](https://phaser.io/news/2026/02/phaser-claude-code-tutorial)
- [India Outbound Tourism — Future Market Insights](https://www.futuremarketinsights.com/reports/india-outbound-tourism-market)
- [Grand View Research — India Travel Insurance](https://www.grandviewresearch.com/horizon/outlook/travel-insurance-market/india)
- [Google Gemini Gems — Personalization](https://university.forwardfuture.ai/lessons/personalizing-google-gemini)
- [Atlys Travel Access Report 2026](https://www.atlys.com/blog/atr-2026)
