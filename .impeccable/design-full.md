---
name: BetterDavao
description: One guide for everyone who calls Davao home — BetterGov navy, gold and white, with the city's threads woven through it.
colors:
  davao-navy: '#1e3a8a'
  navy-ink: '#1e306e'
  navy-strip: '#172154'
  navy-night: '#0f172a'
  navy-bright: '#1e40af'
  navy-mist: '#dbeafe'
  navy-wash: '#eff6ff'
  golden-time: '#d4af37'
  golden-time-light: '#debb3d'
  gold-highlight: '#f2e099'
  stamp-wash: '#fdf9ec'
  stamp-rule: '#6b551a'
  stamp-ink: '#453610'
  hotline-red: 'oklch(57.7% 0.245 27.325)'
  hotline-red-deep: 'oklch(50.5% 0.213 27.518)'
  thread-red: '#9b2d20'
  thread-amber: '#e0a030'
  thread-green: '#5b7f2a'
  thread-orchid: '#c2577f'
  thread-teal: '#2a7f86'
  thread-indigo: '#2b3a8a'
  thread-black: '#1b1b1b'
  ink: '#212529'
  charcoal: '#343a40'
  slate: '#495057'
  muted-gray: '#6c757d'
  field-rule: '#dee2e6'
  hairline: '#e9ecef'
  row-rule: '#f1f3f5'
  surface-gray: '#f8f9fa'
  white: '#ffffff'
typography:
  display:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '3rem'
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: '-0.025em'
  headline:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '2.25rem'
    fontWeight: 700
    lineHeight: 1.25
  section:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '1.875rem'
    fontWeight: 700
    lineHeight: 1.375
  figure:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '1.875rem'
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: '-0.025em'
    fontFeature: '"tnum"'
  title:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '1rem'
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 600
    lineHeight: 1.33
  mono:
    fontFamily: 'Roboto Mono, ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.625
rounded:
  sm: '4px'
  md: '6px'
  lg: '8px'
  xl: '12px'
  2xl: '16px'
  full: '9999px'
spacing:
  gutter-phone: '20px'
  gutter-tablet: '32px'
  gutter-desktop: '48px'
  container: '1280px'
  tap: '44px'
  card-phone: '16px'
  card: '20px'
  section-phone: '40px'
  section: '48px'
components:
  button-primary:
    backgroundColor: '{colors.golden-time}'
    textColor: '{colors.navy-ink}'
    typography: '{typography.title}'
    rounded: '{rounded.lg}'
    padding: '0 24px'
    height: '48px'
  button-primary-hover:
    backgroundColor: '{colors.golden-time-light}'
    textColor: '{colors.navy-ink}'
  button-secondary:
    backgroundColor: '{colors.davao-navy}'
    textColor: '{colors.white}'
    typography: '{typography.title}'
    rounded: '{rounded.lg}'
    padding: '0 20px'
    height: '48px'
  button-secondary-hover:
    backgroundColor: '{colors.navy-ink}'
    textColor: '{colors.white}'
  button-outline:
    backgroundColor: '{colors.white}'
    textColor: '{colors.davao-navy}'
    typography: '{typography.title}'
    rounded: '{rounded.lg}'
    padding: '0 20px'
    height: '48px'
  button-outline-hover:
    backgroundColor: '{colors.navy-wash}'
  input-search:
    backgroundColor: '{colors.white}'
    textColor: '{colors.ink}'
    typography: '{typography.body}'
    rounded: '{rounded.lg}'
    padding: '0 16px 0 40px'
    height: '48px'
  card:
    backgroundColor: '{colors.white}'
    rounded: '{rounded.lg}'
    padding: '{spacing.card}'
  icon-tile:
    backgroundColor: '{colors.navy-mist}'
    textColor: '{colors.davao-navy}'
    rounded: '{rounded.md}'
    size: '40px'
  thread-marker:
    rounded: '{rounded.full}'
    width: '6px'
    height: '28px'
  weave-band:
    height: '12px'
  weave-band-thin:
    height: '6px'
  task-tab:
    backgroundColor: '{colors.white}'
    textColor: '{colors.ink}'
    typography: '{typography.title}'
    rounded: '{rounded.lg}'
    padding: '0 16px'
    height: '52px'
  task-tab-selected:
    backgroundColor: '{colors.davao-navy}'
    textColor: '{colors.white}'
  task-row-hover:
    backgroundColor: '{colors.navy-wash}'
  text-size-option:
    backgroundColor: '{colors.white}'
    textColor: '{colors.charcoal}'
    width: '44px'
    height: '40px'
  text-size-option-selected:
    backgroundColor: '{colors.navy-strip}'
    textColor: '{colors.white}'
  hotline-bar:
    backgroundColor: '{colors.hotline-red}'
    textColor: '{colors.white}'
    typography: '{typography.label}'
  hotline-pill:
    backgroundColor: '{colors.white}'
    textColor: '{colors.hotline-red-deep}'
    rounded: '{rounded.full}'
    padding: '4px 12px'
  info-strip:
    backgroundColor: '{colors.navy-strip}'
    textColor: '{colors.white}'
    typography: '{typography.label}'
    height: '40px'
  guide-step-marker:
    backgroundColor: '{colors.davao-navy}'
    textColor: '{colors.white}'
    rounded: '{rounded.full}'
    size: '30px'
  guide-step-marker-last:
    backgroundColor: '{colors.golden-time}'
    textColor: '{colors.navy-night}'
  stamp-unverified:
    backgroundColor: '{colors.stamp-wash}'
    textColor: '{colors.stamp-ink}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '1px 6px'
---

# Design System: BetterDavao

## Overview

**Creative North Star: "Davao, the Melting Pot"**

BetterDavao is one guide for everyone who calls Davao home, built on the BetterGov standard. The frame is institutional and steady: a red hotline bar that never hides, a white masthead, a navy info strip, a navy hero, white content bands and a charcoal footer. Inside that frame the city's many peoples appear as threads. Seven colours sampled from the artwork "Davao's Golden Time of 2021" by Rembert Vergara Jr. are woven into one cloth: a band that closes the hero and opens the footer. Each service topic keeps one of those threads, so a resident can follow a colour from the home page to the guide.

The site is task-first and dense in a calm way. The first viewport answers "What do you need to do today?" with a search panel and an "I want to…" hub, and every task is one tap from its guide. Guides read like a clear notice: a summary block (where, how long, how much, how long it lasts), one gold action to the official portal, numbered steps, sources and verification stamps. The home page shows only checked figures. Unverified home figures are hidden, not stamped.

It refuses two looks: the generic BetterGov clone (navy and gold with nothing of Davao in it) and festival or tourism styling (fiesta bunting, postcard heroes, decorative ethnic patterns). The threads are the only ornament, and they always carry meaning: the city's peoples, or a topic.

**Key Characteristics:**

- Three-band header on every page: hotline red, white masthead with the A/A+/A++ switch, navy info strip.
- Navy carries the structure; gold marks the main action and the end of a process; red means emergency.
- Seven artwork threads, woven into the Melting Pot band and assigned one per service topic.
- Flat white cards with 1px hairlines and 8px corners; shadows only for hover and floating panels.
- Inter only, sized in rem so the reader's text-size choice scales everything.
- Built for cheap phones: 44px tap targets, one column on phones, nothing that depends on images loading.

## Colors

A civic navy-and-gold palette on white, with alarm red held for emergencies and seven earthy threads from the artwork for identity and wayfinding.

### Primary

- **Davao Navy** (`davao-navy`, primary-600): the hero surface, secondary filled buttons ("Report a mistake"), the selected "I want to…" tab, guide step markers, and link colour on white. It is also the browser `theme-color`.
- **Navy Ink** (`navy-ink`, primary-700): text on gold buttons and the number on the gold last guide step, the masthead wordmark, the at-a-glance figures, and link hover.
- **Navy Strip** (`navy-strip`, primary-800): the info strip and the selected text-size option.
- **Navy Night** (`navy-night`, primary-900): the Melting Pot band behind the artwork.
- **Navy Bright** (`navy-bright`, primary-500): the keyboard focus ring on light surfaces, row chevrons, and guide bullet dots.
- **Navy Mist** (`navy-mist`, primary-100): topic icon tiles and the connector line between guide steps.
- **Navy Wash** (`navy-wash`, primary-50): hover fills on rows, tabs and tiles; the "Spotted something wrong?" band; the independent-guide note under every guide.

### Secondary

- **Golden Time** (`golden-time`, accent-500): the fill of the primary action (hero Search, the guide summary's portal button such as "Open the Online BPLS"), the active-nav underline, and the last numbered guide step. Text on it is Navy Ink, bold (5.86:1).
- **Golden Time, light** (`golden-time-light`, accent-400): hover fill for gold buttons (6.62:1 with Navy Ink), and the link colour on the Navy Night Melting Pot band.
- **Gold Highlight** (`gold-highlight`, accent-200): matched text in search results and the text selection colour.
- **Stamp Wash / Stamp Rule / Stamp Ink** (`stamp-wash`, `stamp-rule`, `stamp-ink`): the dashed "Needs verification" stamp on guides only.

### Tertiary

- **Hotline Red** (`hotline-red`, Tailwind red-600): the hotline bar background.
- **Hotline Red, deep** (`hotline-red-deep`, red-700): text on the white 911 pill and the "Call a hotline" link in the task hub.

### Threads

Sampled from the artwork, defined as `--color-thread-*` in `src/index.css`.

- **Thread Red** (`thread-red`): health services, disaster preparedness; the Lumad chip.
- **Thread Amber** (`thread-amber`): education; the Visayan chip. Appears twice in the weave.
- **Thread Green** (`thread-green`): agriculture and fisheries, environment, garbage and waste.
- **Thread Orchid** (`thread-orchid`): housing and land use.
- **Thread Teal** (`thread-teal`): social welfare.
- **Thread Indigo** (`thread-indigo`): business, and the fallback for any new topic.
- **Thread Black** (`thread-black`): infrastructure and public works.

The mapping lives in `src/lib/threads.ts`; add a topic there, never inline.

### Neutral

- **Ink** (`ink`, gray-900): headings, primary text, and the footer surface.
- **Charcoal** (`charcoal`, gray-800): long-form guide text and control labels.
- **Slate** (`slate`, gray-700): descriptions under headings and on cards.
- **Muted Gray** (`muted-gray`, gray-600): the lightest gray allowed for text (4.7:1 on white): task categories, placeholders, counts.
- **Field Rule** (`field-rule`, gray-300): input and control borders.
- **Hairline** (`hairline`, gray-200): card and panel borders.
- **Row Rule** (`row-rule`, gray-100): dividers between rows inside a card.
- **Surface Gray** (`surface-gray`, gray-50): the guide summary's action footer and table heads.
- **White** (`white`): the page and every card.

The `success-*`, `warning-*`, `error-*` and brown `secondary-*` ramps in `@theme` are reserved for status messages; they are not part of the visual identity.

### Named Rules

**The Gold Means Go Rule.** Golden Time fills the one main action on a surface (hero Search, the guide's portal button), with Navy Ink text at bold weight. Never white text on gold, never near-black text on gold, never more than one gold button in view. Everything else that acts is navy.

**The Red Is for Emergencies Rule.** Hotline Red belongs to the hotline bar, the 911 pill and hotline links. Validation and errors use the `error-*` ramp.

**The Thread Carries Meaning Rule.** A thread colour appears only in the woven band, on a topic marker, or on a people chip. It is never a background for text, a button fill, or decoration without a topic behind it.

## Typography

**Display Font:** Inter (via kapwa's `--font-kapwa-sans`, loaded from Google Fonts at 400–800)
**Body Font:** Inter
**Label/Mono Font:** Roboto Mono for code only

**Character:** One sturdy, neutral sans does everything. Hierarchy comes from weight (600/700/800) and size, which suits a civic guide read on small, cheap screens.

### Hierarchy

- **Display** (800, 1.875rem → 2.25rem at md → 3rem at lg, 1.1, -0.025em): the hero question only, capped at 15ch.
- **Headline** (700, 1.875rem → 2.25rem, 1.25): page titles on listings and guides (the guide h1 uses 800).
- **Section** (700, 1.25rem → 1.5rem → 1.875rem, 1.375): home section headings such as "I want to…" and "Browse by topic". `Heading` takes a separate `size` so the outline level and the look can differ.
- **Figure** (800, 1.5rem → 1.875rem, tabular numerals): at-a-glance values in Navy Ink.
- **Title** (600, 1rem, 1.375): topic tile names, task rows, tab labels, buttons (700 on buttons).
- **Body** (400, 1rem, 1.625): guide text and leads; prose capped at 72ch, hero lead at 46ch. Paragraphs wrap `pretty`, h1–h3 wrap `balance`.
- **Body small** (400, 0.875rem): card descriptions, footer links, "Try:" queries.
- **Label** (600–700, 0.75rem): the hotline bar and info strip only.

### Named Rules

**The One Typeface Rule.** Inter carries everything. No serif or display face for character, even though `--font-serif` is still defined.

**The Rem Rule.** Type and spacing are set in rem so the A / A+ / A++ switch (100%, 112.5%, 125% on `html`) scales the whole page. Never set text in px.

## Layout

- **Container:** the `site-container` utility on every band: max-width 80rem (1280px), side padding 1.25rem, 2rem from 640px, 3rem from 1024px. Full-bleed pieces inside it escape with `-mx-5 sm:-mx-8`.
- **Section rhythm:** bands are 40px tall-padded on phones and 48px from md (`Section`). Listings and guides use 24px → 40px.
- **Hero:** two columns at lg (1.05fr / 0.95fr): question, lead and greeting chips on the left, the white search panel on the right. Stacked on phones, search below.
- **Task hub:** at lg a 17.5rem verb column of tabs beside the task panel; on phones the verbs become a horizontal scroll of pills above the panel.
- **Grids:** topic tiles 1 → 2 (sm) → 4 (lg) columns with 12–16px gaps. Figures 2 → 4 columns in one bordered strip. Footer 1 → 2 → 4 columns.
- **Header:** hotline bar restacks on phones into a full-width "Call 911" button, three city numbers and "View all hotlines". The masthead is sticky, 64px → 76px tall. Desktop nav appears at lg; below it a "Menu" button opens an accordion with the text-size switch at the bottom.
- **Breakpoints:** 640, 768 and 1024px carry the layout changes.

## Elevation & Depth

Flat by default. Surfaces separate by hairline borders and tonal bands (white, Navy Wash, navy, charcoal), not by shadow. Shadows appear only on hover or on things that float above the page.

### Shadow Vocabulary

- **Masthead** (`shadow-sm`): the sticky navigation over scrolling content.
- **Tile hover** (`shadow-md`, with the border shifting to primary-200): clickable topic and office tiles. No lift; reduced motion strips any translate.
- **Results float** (`shadow-lg`): search results.
- **Menu float** (`shadow-xl`): desktop nav dropdowns.
- **Search panel** (`shadow-2xl`): the hero search panel on navy. Nothing else.

The woven band has its own inner shading, which is texture, not elevation: a black 0.12 weft line on every other pixel row (`rgb(0 0 0 / 0.12)`), on the 12px band only. This value belongs to the weave and is sanctioned only there.

### Named Rules

**The Float Earns Shadow Rule.** A surface gets a resting shadow only if it sits above other content: the masthead, a menu, the results list, or the hero search panel. Static cards use a 1px border.

## Shapes

Gently rounded and consistent.

- **Cards, panels, buttons, inputs, desktop tabs:** 8px.
- **Icon tiles, "Try:" chips, greeting chips:** 6px.
- **Stamps and tags:** 4px, squarer so they read as labels.
- **Floating menus and the artwork:** 12px. **Hero search panel:** 16px.
- **Fully round:** the 911 pill, phone verb pills, people chips, step markers, and thread markers.
- **Thread marker:** a 6 × 28px rounded bar inside a row, before the text; on topic tiles a 4px rounded bar along the bottom edge of the icon tile. Both are inset marks, not edges of the card.
- **The weave:** a 12px band (6px in the footer) of stepped abaca-ikat lozenges, 20px apart, with square pixel edges.

## Components

Every component is sturdy and plain, sized for one thumb.

### Buttons

- **Shape:** 8px corners, 48px tall.
- **Primary (gold):** Golden Time fill, Navy Ink text, bold, 24px side padding. Hover to Golden Time, light. Used for the hero Search and the guide summary's portal action (with an external-link arrow).
- **Secondary (navy):** Davao Navy fill, white bold text, hover Navy Ink. Used for "Report a mistake" and other filled actions.
- **Outline:** white with a primary-200 border and Davao Navy text, hover Navy Wash ("Help write a guide").
- **Focus:** one 2px Navy Bright outline at 2px offset everywhere; white on the hotline bar and on navy or charcoal surfaces (`data-dark-surface`).

### Chips

- **"Try:" queries:** 36px tall, 6px corners, hairline border, Davao Navy semibold text, Navy Wash hover. They fill the search.
- **Greeting chips:** on navy, a translucent primary-300 border, the greeting with its `lang` set, then the language name in primary-200.
- **People chips:** on Navy Night, round, a 14px thread dot then the people's name.
- **Type tags in results:** "service" in primary-100 / Navy Ink, "office" in accent-100 / accent-800.

### Cards / Containers

- **Corner Style:** 8px.
- **Background:** white.
- **Border:** 1px Hairline; rows inside divided by Row Rule.
- **Shadow Strategy:** none at rest; tiles take `shadow-md` and a primary-200 border on hover.
- **Internal Padding:** 16px on phones, 20px from sm.
- **Topic tile:** icon tile with its thread bar, title, plain description, and a guide count in Davao Navy (or "Guides being written" in Muted Gray). The whole tile is the link.
- **Listing:** one bordered panel of rows; each row has a thread marker, title, description and chevron, and Navy Wash on hover.

### Inputs / Fields

- **Style:** white, 1px Field Rule border, 8px corners, 48px tall, an 18px search icon inset left, 1rem text, Muted Gray placeholder.
- **Focus:** border goes transparent and a 2px Navy Bright ring appears.
- **Results:** a combobox listbox: white panel, hairline border, 8px corners, `shadow-lg`; rows carry the topic thread, the matched text in Gold Highlight, and Navy Wash when active.

### Navigation

- **Masthead:** white, sticky, logo and the site name in Navy Ink at left, links, then the text-size switch at right.
- **Desktop links:** Slate 1rem medium, hover Davao Navy. The active link is Davao Navy with a 2px Golden Time underline. Dropdowns open on hover or focus-within in a 12px panel; rows are 44px with Navy Wash on hover.
- **Mobile:** a bordered "Menu" button (44px) toggles an accordion with `aria-expanded`; submenus indent over Surface Gray with "All …" first.
- **Text-size switch:** a bordered group of three 44 × 40px buttons (A, A+, A++) with `aria-pressed`; the selected one is Navy Strip with white text. Saved in `localStorage` under `bd_text_size` and applied in `index.html` before first paint.

### Davao Weave (signature)

An abaca ikat band after the Bagobo _inabal_ and Mandaya _dagmay_ cloths of the Davao region. Stepped lozenges in abaca cream (#e6d8b8) and Thread Red, with a cream core, sit on a Thread Black ground between 1px red edges. They repeat every 20px and are crossed by the weft shading described in Elevation. It closes the hero and, at 6px, opens the footer, where the pattern scales down and drops the weft line. It is `aria-hidden` and never carries text.

### "I want to…" Hub (signature)

ARIA tabs: verbs as tabs (arrow keys, Home and End), the selected verb in Davao Navy with white text, and its count in primary-200. The panel lists that verb's tasks as 64px rows, each with its topic's thread marker. A "Call a hotline" link in Hotline Red, deep sits under the verbs on desktop.

### Guide Summary and Steps

The summary is a bordered card of fact rows (label column 10rem from sm) with a Surface Gray footer holding the source link and the gold portal button. Ordered lists in guides become steps: 30px round Davao Navy numerals joined by a 2px Navy Mist line, the last numeral in Golden Time so the end of the process is visible. Unverified facts carry the dashed "Needs verification" stamp; guides keep it, the home page never shows it.

### Hotline Bar and Info Strip

The hotline bar is Hotline Red with white text; the featured 911 is a white pill in Hotline Red, deep; every number is a `tel:` link. It never hides at any breakpoint. The info strip below the masthead is Navy Strip with small white text (exchange rate, Davao temperature, Philippine time) and a 32px pause control for the rotating rate, which starts paused under reduced motion.

## Do's and Don'ts

### Do:

- **Do** keep the three-band header (hotline red, white masthead with the text-size switch, navy info strip) on every page.
- **Do** wrap every band in `site-container` (80rem max, 1.25rem / 2rem / 3rem side padding).
- **Do** give the main action a Golden Time fill with bold Navy Ink text (#1e306e), hovering to #debb3d; make every other filled action Davao Navy with white text, hovering to Navy Ink.
- **Do** mark every service topic with its thread from `src/lib/threads.ts` on task rows, topic tiles, listings and search results.
- **Do** keep the weave's palette to abaca cream, Thread Red and Thread Black, and its weft line at `rgb(0 0 0 / 0.12)`. They are part of the woven band.
- **Do** put content on white cards with a 1px Hairline border and 8px corners, with shadow only on hover or for floating panels.
- **Do** keep text at Muted Gray (#6c757d) or darker on white, and tap targets at least 44px.
- **Do** keep sources, the summary block and verification stamps on guides.
- **Do** size type in rem so the A / A+ / A++ switch scales it, and drop movement under `prefers-reduced-motion`.
- **Do** meet WCAG 2.2 AA, with the WAI-ARIA tabs pattern on the "I want to…" hub.

### Don't:

- **Don't** set gold buttons with white or near-black text; Navy Ink is the only text colour on gold.
- **Don't** use Hotline Red outside the hotline bar and hotline actions.
- **Don't** use a thread colour without a topic or a people behind it, or as a text background.
- **Don't** add festival or tourism styling (bunting, postcard heroes, decorative ethnic patterns), or strip Davao out into a generic BetterGov clone.
- **Don't** put an eyebrow label (small tracked uppercase text) above a heading.
- **Don't** put a coloured side-stripe on a card or nest cards inside cards.
- **Don't** show sources, "Needs verification" stamps, unverified figures, an A–Z index, or a language switcher on the home page.
- **Don't** add a second typeface or set text in px.
- **Don't** recreate `tailwind.config.js`; tokens live in `@theme` in `src/index.css`.
