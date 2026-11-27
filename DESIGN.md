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

<!-- impeccable:design-map -->

Name: BetterDavao
Colors: primary: davao-navy #1e3a8a; secondary: golden-time #d4af37; tertiary: hotline-red oklch(57.7% 0.245 27.325); neutral: ink #212529; thread: thread-red #9b2d20; primary: navy-ink #1e306e (+25 more in the sidecar)
Fonts: Inter (display, headline, section, figure, title, body, body-small, label); Roboto Mono (mono)
Spacing: gutter-phone 20px, gutter-tablet 32px, gutter-desktop 48px, container 1280px, tap 44px, card-phone 16px, card 20px, section-phone 40px, section 48px
Radius: sm 4px, md 6px, lg 8px, xl 12px, 2xl 16px, full 9999px
North Star: "Davao, the Melting Pot"
Rules:

- The Gold Means Go Rule. Golden Time fills the one main action on a surface (hero Search, the guide's portal button), with Navy Ink text at bold weight.
- The Red Is for Emergencies Rule. Hotline Red belongs to the hotline bar, the 911 pill and hotline links.
- The Thread Carries Meaning Rule. A thread colour appears only in the woven band, on a topic marker, or on a people chip.
- The One Typeface Rule. Inter carries everything.
- The Rem Rule. Type and spacing are set in rem so the A / A+ / A++ switch (100%, 112.5%, 125% on `html`) scales the whole page.
- (+1 more)
  Elevation:
- Masthead: shadow-sm
- Tile hover: shadow-md
- Results float: shadow-lg
- Menu float: shadow-xl
- Search panel: shadow-2xl
  Don't:
- Don't set gold buttons with white or near-black text; Navy Ink is the only text colour on gold.
- Don't use Hotline Red outside the hotline bar and hotline actions.
- Don't use a thread colour without a topic or a people behind it, or as a text background.
- Don't add festival or tourism styling (bunting, postcard heroes, decorative ethnic patterns), or strip Davao out into a generic BetterGov clone.
- Don't put an eyebrow label (small tracked uppercase text) above a heading.
- Don't put a coloured side-stripe on a card or nest cards inside cards.
- Don't show sources, "Needs verification" stamps, unverified figures, an A–Z index, or a language switcher on the home page.
- Don't add a second typeface or set text in px.
- Don't recreate `tailwind.config.js`; tokens live in `@theme` in `src/index.css`.
  Map: src/index.css
  Map: src/lib/threads.ts
  Map: index.html
  Full: .impeccable/design-full.md (read a section when you need its detail)
