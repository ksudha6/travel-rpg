# Domain Vocabulary

Use these terms consistently in code, commits, and iteration notes.

| Term | Definition | Code Constant |
|------|-----------|---------------|
| **Persona** | One of 4 Indian traveler archetypes (Arjun, Priya, Rahul, Meera) | `PersonaId` enum |
| **Travel Phase** | One of 5 stages in the journey: Dreaming, Pre-Departure, In-Transit, On-Ground, Post-Trip | `TravelPhase` enum |
| **Pain Point** | A persona-specific anxiety or friction at a given travel phase | `Persona.painPoints[TravelPhase]` |
| **Offbeat Hook** | An unconventional product angle that addresses unserved micro-moments (from the script) | `JourneyPhase.hookName` |
| **Competitor** | A company/platform that serves travelers at one or more phases | `Competitor` interface |
| **Market Segment** | A category of travel spend (flights, hotels, activities, etc.) with market value | `MarketSegment` interface |
| **Hypothesis** | A strategic bet about Atlys's competitive advantage (H1, H2, H3) | `Hypothesis` interface |
| **GTM Motion** | A go-to-market approach (Partnerships, Collaboration, ABM) | `GTMMotion` interface |
| **Atlys Play** | What Atlys could do at a given phase — the value proposition | `JourneyPhase.atlysPlay` |
| **Boutique** | Headout's model: curated, trust-building, delightful UX, narrow scope | Competitor.model |
| **Supermarket** | Klook's model: massive catalog, scale, price competitiveness, broad scope | Competitor.model |
| **Companion** | Atlys's target positioning: full-journey, relationship-based, trust + data | Positioning quadrant |
| **Savi** | The Atlys companion character — a green guide sprite personifying the product. Appears when Atlys enters the user's flow, walks alongside persona from that point on. Name from "savari" (Hindi: journey) | Future sprite asset |
| **Beat** | One narrative moment in a scene — a single thought, reveal, or visual change. Click/space advances between beats. | `BasePhaseScene` step system |
| **Typewriter** | RPG-style text reveal: characters type in one at a time. Click during typing skips to full text. | `typeText()` utility |
| **Pixel Grid** | Simple dark background with subtle 64px grid lines — consistent across all scenes | `drawPixelGrid()` utility |
| **Scene** | A Phaser scene = one screen/act of the presentation | Phaser.Scene subclass |
| **Act** | A narrative section of the presentation (7 total) | Maps to 1+ scenes |
| **Leverage Hierarchy** | Phases ranked by Atlys's current ability to act: Pre-Departure + Zero Hour = real today; Dreaming + Post-Trip = needs partnerships; On-Ground = integrate don't build | Narration ordering principle |
