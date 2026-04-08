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
| **Scene** | A Phaser scene = one screen/act of the presentation | Phaser.Scene subclass |
| **Act** | A narrative section of the presentation (7 total) | Maps to 1+ scenes |
