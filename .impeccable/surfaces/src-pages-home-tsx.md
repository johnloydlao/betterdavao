---
version: 1
slug: 'src-pages-home-tsx'
primary_target: 'src/pages/Home.tsx'
related_targets: ['src/pages/Services.tsx', 'src/pages/Document.tsx']
---

# Surface brief: BetterDavao site (home hub, listings, service guides)

Scope: whole site redesign. Mode: Operate (service guides read in Read register).
Audience: Davao residents on cheap phones and slow data; seniors, PWDs and lower-literacy readers; business owners.
Job: reach the right service in one tap from the hub, understand it, and see its source.
Constraints: keep the BetterGov/BetterLGU standard (three-band header with the always-visible hotline bar, navy/gold/white, Inter, kapwa, task-first layout, WCAG 2.2 AA, "unofficial" labelling). User removals, binding: no A–Z page or index; no language switcher until a second translation exists; no "Sources" lines and no "Needs verification" stamps on the home page (unverified home figures are hidden instead; sources live in src/data/glance.yaml and docs/data-sources.md); no "Latest updates" on the home page for now (component and data kept, unmounted). No city advisories or barangay notices. Guide pages keep their sources, summary and verification stamps.
Approved mockup: .impeccable/mocks/melting-pot-mockup.html

## Direction contract

THESIS: "Davao, the Melting Pot" on the BetterGov standard. It is one guide for everyone who calls Davao home, with many threads woven into one cloth. It refuses the generic BetterGov clone, and it refuses festival or tourism styling.

OWN-WORLD: The BetterGov navy hero and info strip, a white masthead, gold buttons with navy text (primary-700) for the primary action (the user liked the gold but rejected near-black text on it), navy filled buttons for secondary actions such as Report a mistake, gold also as small accents (active nav underline, the last guide step), white cards with 1px hairlines and 8px radius, and Inter. The Melting Pot enters through threads: seven colours sampled from the artwork “Davao's Golden Time of 2021” by Rembert Vergara Jr. (red, amber, green, orchid, teal, indigo, black). Woven together, they form the band that closes the hero and opens the footer. One thread colour marks each service topic on task rows.

STORY: A resident sees a greeting in their language and "What do you need to do today?". They search, or pick a verb in "I want to…" and tap a task. They see the city's people and its official figures and browse topics. On a guide, a summary answers where, how long, how much and how long it lasts, with one gold action button (navy text) to the official portal and numbered steps below. If something is wrong, they report it.

FIRST VIEWPORT: The red hotline bar; on phones, a full-width "Call 911" and three city numbers. A white masthead with logo, nav and the text-size switch, then the navy info strip. A navy hero: the H1 "What do you need to do today?", a lead naming the peoples of Davao, and greeting chips (Bisaya, Tagalog, Ilocano, Muslim greeting) with the independent-guide line. A white search panel holds the gold Search button with navy text and "Try:" queries; it sits on the right on desktop and below on phones. The woven band closes the hero.

FORM: pinned. Signature move: the thread system (the woven band plus topic threads on task rows). seed: none (pinned): "Davao — the Melting Pot of the Philippines ... it should reflect this. you can disregard apo trail if doable. basically that text + bettergov standard"

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
