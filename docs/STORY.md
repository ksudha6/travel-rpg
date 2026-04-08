# ATLYS TRAVEL EXPERIENCE — CANONICAL STORY SCRIPT
## The authoritative source of truth for the RPG build

> **Claude Code must read this file before building any scene.**
> Cross-check every fact, every number, and every competitor name against
> the data files listed. Do NOT invent data. If a number is not in the
> data files, it does not exist in the scene.

---

## FORMAT: SCROLLYTELLING DOCUMENTARY

The viewer WATCHES the story unfold. They pick a persona. The LEGO character
walks a path. Pain points appear as obstacles. Competitors appear as buildings
or NPCs. Atlys opportunities emerge as power-ups. No gameplay. No chatbot.
A visual narrative that builds the case for Atlys as the Full Journey Companion.

**Reference:** LennyRPG by Ben Shih — Phaser 3 + Claude Code + ChatGPT art, built in 8 hours.
**Tech:** Phaser 3 + Vite + TypeScript. Canvas: 1280×720. Pixel art. No React.

---

## DATA FILE MAP — VERIFY BEFORE EACH SCENE

| Scene needs | Read this file |
|---|---|
| TAM, market segments | `frontend/src/data/market.ts` |
| 4 personas + pain points | `frontend/src/data/personas.ts` |
| Competitors + India context | `frontend/src/data/competitors.ts` |
| 5 journey phases + hooks + GTM | `frontend/src/data/journeyPhases.ts` |
| 3 hypotheses + scoring | `frontend/src/data/strategy.ts` |
| All TypeScript interfaces | `shared/types.ts` |

**RULE: Every number in a scene must exist in a data file. No hardcoding.**

---

## CHARACTER ASSETS — VERIFY FILES EXIST

```
frontend/assets/characters/arjun.png      ← NRI professional, Dubai, AirPods
frontend/assets/characters/priya.png      ← First-timer, Pune, clutching passport
frontend/assets/characters/rahul.png      ← Digital nomad, Lisbon-Bali, flip-flops
frontend/assets/characters/meera-family.png ← Family of 4, toddler on hip
```

If any PNG is missing, stop and ask the user before proceeding.

---

## THE 7-ACT STORY

---

### ACT 1 — THE MARKET NOBODY SEES WHOLE
**Scene file:** `TitleScene.ts` → `MarketScene.ts`
**Data source:** `market.ts` → `TOTAL_INDIAN_TRAVEL_TAM`, `MARKET_SEGMENTS[]`

**What the viewer sees:**
- Camera pulls back from a single LEGO traveler to reveal an enormous map of India
- Text fades in: *"₹18,00,000 crore. That's the Indian travel market by 2030."*
- The map fractures into 7 glowing segments — one per market category
- Each segment lights up with its value: Flights ($25–51B), Hotels ($8.95B),
  Activities ($300B+ global), Ground Transport ($1.9B), Insurance ($1.17B),
  Visas ($34.26M India e-visa), Food (50%+ of trip spend motivation)
- One segment — VISAS — is tiny. It blinks.
- Text: *"Atlys owns 1–2% of this pie. The other 98% is the journey."*
- A single question appears: *"Who owns the rest?"*

**Scene transition:** The map zooms into the VISA segment. A path appears.
Four LEGO characters stand at the start of the path. The viewer must pick one.

**Verify before building:**
- [ ] `TOTAL_INDIAN_TRAVEL_TAM` in market.ts matches "$220B (2024) → $470B+ (2030)"
- [ ] 7 segments in `MARKET_SEGMENTS[]` with correct values
- [ ] `atlysPresent: true` only for the Visas segment

---

### ACT 2 — CHARACTER SELECT
**Scene file:** `CharacterSelectScene.ts`
**Data source:** `personas.ts` → `PERSONAS[]`

**What the viewer sees:**
- 4 LEGO characters on pedestals, each with a floating name tag
- Hovering over each reveals their one-liner quote (from `persona.oneLiner`)
- Visual: character sprites from `assets/characters/`
- Selecting one starts the journey from their perspective

**The 4 characters:**

| Persona | One-liner | Sprite |
|---|---|---|
| ARJUN | "I travel 6 times a year and I'm still copying booking confirmations into a spreadsheet." | arjun.png |
| PRIYA | "I want to see the world but I'm terrified I'll get rejected at the visa, the airport, or the restaurant." | priya.png |
| RAHUL | "I'm juggling 3 visas across 3 countries and no app understands that my trip doesn't have a return date." | rahul.png |
| MEERA | "I'm planning a holiday for a toddler, a teenager, and my in-laws — and managing 4 passports while doing it." | meera-family.png |

**IMPORTANT:** Every subsequent scene adapts the `personaAnxieties` text from
`journeyPhases.ts` to show this character's specific fear at each phase.
Same 5 phases, different anxieties. The path is identical. The obstacles are personal.

**Verify before building:**
- [ ] All 4 `PersonaId` values exist in `shared/types.ts` enum
- [ ] All 4 sprites exist in `assets/characters/`
- [ ] `persona.oneLiner` text matches the character table above

---

### ACT 3 — THE JOURNEY: 5 PHASES
**Scene files:** One scene per phase — `DreamingScene.ts`, `PreDepartureScene.ts`,
`InTransitScene.ts`, `OnGroundScene.ts`, `PostTripScene.ts`
**Data source:** `journeyPhases.ts` → `JOURNEY_PHASES[]`, `personas.ts`

**Each phase scene has the same structure:**

```
1. SCENE TAGLINE — full screen, dramatic, 3 seconds
   Source: journeyPhase.sceneTagline

2. STANDARD WORLD — what travel apps do today
   Source: journeyPhase.standardFocus
   Visual: competitors appear as grey, featureless buildings

3. PERSONA ANXIETY — the character's specific fear
   Source: journeyPhase.personaAnxieties[selectedPersonaId]
   Visual: red thought bubble above the LEGO character's head

4. THE OFFBEAT HOOK — Atlys's unique angle
   Source: journeyPhase.hookName + journeyPhase.hookQuote
   Visual: the hook name appears as a glowing power-up the character picks up

5. ATLYS PLAY — what Atlys actually does here
   Source: journeyPhase.atlysPlay
   Visual: the grey competitor buildings fade; Atlys features appear as green overlays

6. ADDITIONAL HOOKS (if any)
   Source: journeyPhase.additionalHooks[]
   Visual: secondary power-ups appear at the edge of the scene
```

---

#### PHASE 1: DREAMING 🌙
**Scene:** The character stands at a crossroads surrounded by Instagram billboards
and MakeMyTrip signboards. Dream-bubble destinations float overhead.

**Key visual moments:**
- COMPETITOR BUILDINGS: Instagram/YouTube billboard (dominant, bright, loud),
  MakeMyTrip signboard, EaseMyTrip signboard, ChatGPT terminal
- CHARACTER ANXIETY: Red thought bubble with `personaAnxieties[DREAMING]` text
- HOOK POWER-UP: "The Visa Reality Check" — glowing green destination tags
  appear over each dream bubble: green (easy visa), yellow (moderate), red (complex)
- ATLYS PLAY TEXT: *"Atlys is the only player who can say 'you can actually GO here'
  before you've fallen in love with somewhere you can't enter."*
- ADDITIONAL HOOK: "The Window Hunter" — a notification badge blinks:
  *"Schengen slot just opened in Mumbai. Claim it in 4 minutes."*

**Competitor buildings in this scene (India-accurate):**
Read from: `journeyPhases[DREAMING].competitorNames`
= ["Instagram & YouTube", "MakeMyTrip", "EaseMyTrip", "ChatGPT"]

**Verify before building:**
- [ ] No GetYourGuide, no Viator, no Google Travel in dreaming phase competitors
- [ ] `sceneTagline` reads: "Everyone shows you the destination. Nobody tells you if you can actually get there."
- [ ] `hookName` reads: "The Visa Reality Check"

---

#### PHASE 2: PRE-DEPARTURE 📋
**Scene:** The character is surrounded by 4 separate app windows floating in the air
(MakeMyTrip, Agoda, iVisa, a VFS queue). A clock ticks. Documents pile up.

**Key visual moments:**
- COMPETITOR BUILDINGS: MakeMyTrip (giant, dominant), EaseMyTrip, Agoda hotel tower,
  iVisa terminal, VFS Global queue (long line of LEGO figures), Airalo kiosk, Niyo card
- CHARACTER ANXIETY: The persona's specific pre-departure panic
- HOOK POWER-UP: "The Trust Trigger" — the VISA APPROVED notification arrives as a
  golden badge. Everything that was scattered snaps into order.
- ATLYS PLAY TEXT: *"The visa approval moment. No other platform has this trigger."*
  Show: packing list generates, eSIM activates, document vault fills, Arrival Guard queues.
- ADDITIONAL HOOK: "Visa EMI" — the ₹12,000 Schengen fee splits into 3 installments.

**Competitor buildings in this scene (India-accurate):**
Read from: `journeyPhases[PRE_DEPARTURE].competitorNames`
= ["MakeMyTrip", "EaseMyTrip", "Agoda", "iVisa", "VFS Global", "Airalo", "Niyo Global"]

**Verify before building:**
- [ ] `sceneTagline` reads: "Your visa is approved. This is the highest-trust moment in travel. What happens next?"
- [ ] `hookName` reads: "The Trust Trigger"
- [ ] VFS Global appears as a long queue (painful, not a building)
- [ ] Airalo appears as a data-only kiosk (NO local number shown)

---

#### PHASE 3: THE TARMAC TRANSITION 🛬
**Scene:** The character lands. The plane door opens. The airport is chaos —
nameless people reaching out, signs in foreign languages, no phone signal.
The Atlys Green Stripe cuts through it all.

**Key visual moments:**
- COMPETITOR BUILDINGS: IndiGo and Air India apps go dark (screens black out
  the moment the character steps off the plane). Google Maps shows "No Service."
  Uber app loads but has no local number for OTP. Grey, silent, useless.
- CHARACTER ANXIETY: The persona's 60-minute arrival panic
- HOOK POWER-UP: "The Arrival Protocol" — a green stripe appears on a LEGO driver
  holding a sign. The eSIM activates (connectivity bar fills). A local number appears.
- ATLYS PLAY TEXT (three beats, sequential):
  1. *"eSIM live. Local number active. Every local app in this city just unlocked."*
  2. *"Green Stripe driver confirmed. Pre-booked, pre-priced, pre-cleared."*
  3. *"Flight delayed? I already rescheduled your driver. No action needed."*
- ADDITIONAL HOOK: "Airport Survival Mode" — small icons appear:
  bathroom, WiFi, currency exchange counter marked "FAIR RATE"

**This is the ZERO HOUR scene. It must feel like the most visually dramatic
scene in the entire story. Chaos → calm. Grey → green.**

**Competitor buildings in this scene (India-accurate):**
Read from: `journeyPhases[IN_TRANSIT].competitorNames`
= ["IndiGo App", "Air India App", "Google Maps", "Uber"]

**Verify before building:**
- [ ] `sceneTagline` reads: "The 60 minutes between landing and your hotel. Every competitor goes dark here. This is the Zero Hour."
- [ ] `hookName` reads: "The Arrival Protocol"
- [ ] ALL competitor screens must go BLACK/DARK when the character lands
- [ ] Green Stripe driver is visually distinct — green stripe badge/jacket

---

#### PHASE 4: ON-GROUND 🗺️
**Scene:** The character walks through a city. Headout tours are available.
Google Maps is open. Tourist prices are everywhere. Then — the local number activates.
Grab appears. The local food app appears. A hidden door opens.

**Key visual moments:**
- COMPETITOR BUILDINGS: Headout (boutique storefront, curated, well-designed),
  Google Maps (utility tower, massive but impersonal), Instagram billboard
  (lifestyle, everyone looks happy), Splitwise kiosk (manual receipts piling up),
  Niyo card reader
- CHARACTER ANXIETY: The persona's on-ground panic/frustration
- HOOK POWER-UP: "Hacked Icon Access" — a keycard appears. The LEGO character
  taps it. A hidden door in a wall opens. Local apps appear. Tourist price tags
  flip to show local prices.
- ATLYS PLAY TEXT:
  *"You have a local number. Every OTP-gated app in this city just unlocked.
  Grab works. Local food delivery works. The taxi quoted you the local price."*
- SECONDARY HOOKS (shown as smaller power-ups):
  - Serendipity Engine: random walk path appears (no itinerary needed)
  - Crisis Aversion: red panic button in corner — always visible
  - Local Price Benchmark: price tags flip to show local vs tourist

**Competitor buildings in this scene (India-accurate):**
Read from: `journeyPhases[ON_GROUND].competitorNames`
= ["Headout", "Google Maps", "Instagram", "Splitwise", "Niyo Global"]

**Verify before building:**
- [ ] Klook is NOT in this scene (India revenue $270K — not a real competitor)
- [ ] GetYourGuide is NOT in this scene (zero India operations)
- [ ] Viator is NOT in this scene (zero India market data)
- [ ] `sceneTagline` reads: "You have a local number now. Every app in this city thinks you are a local."
- [ ] `hookName` reads: "Hacked Icon Access"

---

#### PHASE 5: POST-TRIP 🏠
**Scene:** The character is home. 600 photos sit unsorted. Splitwise has
unpaid debts. Post-trip blues. Then — the Atlys flywheel closes.

**Key visual moments:**
- COMPETITOR BUILDINGS: Splitwise (manual receipt pile, highlighted in red),
  Google Photos (auto-albums that mean nothing), Instagram (highlight reel,
  performative), MakeMyTrip (already showing the next deal, impersonal)
- CHARACTER ANXIETY: The persona's post-trip frustration/sadness
- HOOK POWER-UP: "Reverse Culture Shock" — a 2-minute closure ritual:
  expenses auto-settle (Splitwise pile vanishes), photo timeline generates,
  Atlys Score appears (verified travel history badge)
- FLYWHEEL VISUAL: A circular path glows:
  Post-Trip → Dreaming (3 new destinations) → Visa (pre-approved in 4 days)
  → Trust Trigger → Arrival Protocol → On-Ground → Post-Trip
- ATLYS PLAY TEXT:
  *"Every completed trip makes the next one faster. Your Atlys Score is Platinum.
  Your next visa takes 48 hours, not 4 weeks."*
- ADDITIONAL HOOK: "Group Settlement as Viral Acquisition" — the other 3 travel
  companions receive Atlys notifications. They download the app to see what they owe.

**Competitor buildings in this scene (India-accurate):**
Read from: `journeyPhases[POST_TRIP].competitorNames`
= ["Splitwise", "Google Photos", "Instagram", "MakeMyTrip"]

**Verify before building:**
- [ ] `sceneTagline` reads: "Your trip is over. Your visa history is just beginning."
- [ ] `hookName` reads: "Reverse Culture Shock"
- [ ] The flywheel animation closes the loop visually back to the DREAMING scene

---

### ACT 4 — THREE HYPOTHESES (PRESENTED HONESTLY)
**Scene file:** `HypothesesScene.ts`
**Data source:** `strategy.ts` → `HYPOTHESES[]`

**What the viewer sees:**
- 3 cards appear on screen simultaneously, labelled H1, H2, H3
- Each card has a title, a thesis (one sentence), and a scoring bar:
  Defensibility / Revenue / Feasibility / Moat (all out of 10)
- H2 ("Visa Data as Intent Signal") glows brightest — strongest scores
- A 2×2 matrix appears: X-axis = Defensibility, Y-axis = Revenue Potential
  H2 lands top-right. H3 is high-revenue but lower defensibility. H1 is moderate.
- Text: *"We are not presenting the best case. We are presenting the honest one."*

**The 3 hypotheses (from strategy.ts):**

| ID | Title | Thesis in one line | Strength | Weakness |
|---|---|---|---|---|
| H1 | Visa is a Trust Wedge | Visa approval builds trust no other platform earns | Trust is real but replicable | Not a moat against $1B+ competitors |
| H2 | Visa Data is the Richest Travel Intent Signal | We know destination, dates, party, budget before any OTA does | Unique, predictive, 5–7yr defensibility | Requires data infrastructure investment |
| H3 | Journey Fragmentation is Unmonetized | The moments BETWEEN bookings are where loyalty is built | Biggest revenue upside ($470B) | Requires 5 product challenges executed in parallel |

**Verify before building:**
- [ ] All 3 hypotheses exist in `strategy.ts` with `id`, `title`, `thesis`, `scores`
- [ ] H2 scores highest on `moat` (8) and `defensibility` (8)
- [ ] H3 scores highest on `revenue` (9) but lowest on `feasibility` (5)

---

### ACT 5 — THE COMPETITIVE TRUTH
**Scene file:** `CompetitiveScene.ts`
**Data source:** `competitors.ts` → `COMPETITORS[]`, `strategy.ts` → `COMPETITIVE_POSITIONING`

**What the viewer sees:**
- A 2×2 matrix fills the screen:
  X-axis: Journey Breadth (Single Phase → Full Journey)
  Y-axis: Relationship Model (Transactional → Companion)

**Quadrant placement (read from strategy.ts):**

```
                  Single Phase        Full Journey
Transactional:    MakeMyTrip          [EMPTY — nobody here]
                  iVisa
                  Headout (Boutique)

Companion:        ChatGPT (partial)   ★ ATLYS? ← nobody is here
                  Fluffy/Headout AI
                  (FAQ only, Phase 4)
```

- The top-right quadrant (Full Journey + Companion) is empty and glowing
- Text: *"Nobody owns the Full Journey + Companion quadrant."*
- Then: WHY HEADOUT CAN'T ADD VISAS (4 reasons, animated)
  1. Regulatory: 18–24 months of embassy partnerships
  2. Psychology mismatch: impulse bookings vs 6-week planning
  3. Revenue model conflict: high-frequency vs high-friction
  4. Liability: a rejected visa = lawsuit they can't cover
- Then: WHY ATLYS CAN'T JUST ADD ACTIVITIES (honest)
  1. No supply side (zero seller relationships vs Klook's 10K+)
  2. Margin dilution
  3. Brand conflict: trust/safety vs impulse/serendipity
  4. Solution: DON'T build supply. Integrate Klook/Headout APIs. Become the curation layer.
- THE 18-MONTH WINDOW: *"Klook is focused on IPO. Headout is scaling supply.
  Neither is thinking about full-journey companion. That is Atlys's window."*

**Verify before building:**
- [ ] `strategy.ts` has `headoutBarrier[]` and `atlysBarrier[]` arrays
- [ ] `strategy.ts` has `18MonthWindow` text
- [ ] No competitor is placed in the Full Journey + Companion quadrant

---

### ACT 6 — THE GTM PLAY
**Scene file:** `GTMScene.ts`
**Data source:** `strategy.ts` → `GTM_MOTIONS[]`, `journeyPhases.ts` → `gtmPlay` per phase

**What the viewer sees:**
- 3 GTM motions appear as different paths leading to the same destination:
  1. PARTNERSHIPS (Fit: 5/5) — airline integration, zero CAC
  2. COLLABORATION LOOP (Fit: 4/5) — group travel as invite mechanic
  3. ABM / ENTERPRISE (Fit: 4/5) — corporate HR travel manager
- Primary GTM visual: IndiGo/Air India checkout flow — "Visa by Atlys" appears
  at flight booking step. Text: *"Zero CAC. 100M IndiGo seats per year.
  0.5% conversion = 500K Atlys users at ₹0 marketing spend."*
- Per-phase GTM hooks (smaller cards, one per phase):
  Read from `journeyPhases[phase].gtmPlay` for each TravelPhase value
- The Atlys Inside concept: *"Like Intel Inside — 'Visa by Atlys' appearing
  in every OTA checkout. Atlys becomes the infrastructure, not the destination."*

**Verify before building:**
- [ ] `strategy.ts` has `GTM_MOTIONS[]` with `name`, `mechanism`, `fitScore`
- [ ] Partnership GTM has fitScore of 5 (highest)
- [ ] Each journeyPhase has a non-empty `gtmPlay` string

---

### ACT 7 — THE PUNCHLINE
**Scene file:** `PunchlineScene.ts`
**Data source:** All files — this is the synthesis

**What the viewer sees:**
- The selected LEGO character walks the full path — all 5 phases — in fast-forward
- Each phase: the grey competitor buildings fade. The Atlys green layer appears.
- At the end of the path: the character is home. The Atlys flywheel spins.
- The 2×2 matrix from Act 5 reappears. The top-right quadrant fills: ATLYS.
- Final text sequence (one line at a time, fading in):

  *"The best travel tech is the tech you never have to search for."*

  *"Atlys owns the only moment every Indian traveler trusts an app completely."*

  *"We are not building a better MakeMyTrip."*

  *"We are building the layer underneath every travel app that exists."*

  *"Visa. Connectivity. Safety. Companion."*

  *"The Arrival Protocol."*

- Final screen: Atlys logo. The character waves. The screen fades.

---

## SCENE BUILD ORDER (ITERATIONS)

| Iteration | Scene | Dependencies |
|---|---|---|
| 001 | TitleScene — canvas renders, title text, character grid | None |
| 002 | MarketScene — TAM segments, $220B visual | market.ts verified |
| 003 | CharacterSelectScene — 4 personas, sprite select | personas.ts + assets verified |
| 004 | DreamingScene — Phase 1 complete | journeyPhases.ts[DREAMING] verified |
| 005 | PreDepartureScene — Phase 2 complete | journeyPhases.ts[PRE_DEPARTURE] verified |
| 006 | InTransitScene — Phase 3 complete (THE ZERO HOUR) | journeyPhases.ts[IN_TRANSIT] verified |
| 007 | OnGroundScene — Phase 4 complete | journeyPhases.ts[ON_GROUND] verified |
| 008 | PostTripScene — Phase 5 + flywheel | journeyPhases.ts[POST_TRIP] verified |
| 009 | HypothesesScene + CompetitiveScene | strategy.ts verified |
| 010 | GTMScene + PunchlineScene + full run-through | All files verified |

---

## VERIFICATION CHECKLIST — RUN BEFORE BUILDING EACH ITERATION

```bash
# TypeScript: no errors
npx tsc --noEmit

# Data integrity: no missing fields
npx vitest run tests/data-integrity.test.ts

# Phase count: exactly 5
# Persona count: exactly 4
# Competitor count: verify India presence field populated on all
# Hypotheses count: exactly 3
# GTM motions count: exactly 3
```

---

## CRITICAL DO-NOTS FOR CLAUDE CODE

- DO NOT add GetYourGuide to any scene — zero India operations
- DO NOT add Viator to any scene — zero India market data
- DO NOT add Google Travel to any scene — discontinued 2019
- DO NOT show Klook as a primary India competitor — $270K India revenue
- DO NOT hardcode any market number — all numbers must come from market.ts
- DO NOT invent competitor names not in competitors.ts
- DO NOT skip the personaAnxieties — they are what makes each scene personal
- DO NOT make the story interactive (no gameplay, no choices after persona select)
- DO NOT use React — Phaser 3 scenes only
