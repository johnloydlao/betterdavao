---
name: BetterDavao
description: A plain-spoken civic bulletin for Davao City services — navy, gold, and white, with emergency numbers always in reach.
colors:
  deep-mandaya-blue: '#1e3a8a'
  mandaya-blue-bright: '#1e40af'
  mandaya-blue-ink: '#1e306e'
  mandaya-blue-night: '#172154'
  mandaya-blue-mist: '#dbeafe'
  mandaya-blue-wash: '#eff6ff'
  night-ink: '#0f172a'
  durian-gold: '#d4af37'
  durian-gold-deep: '#b8962e'
  hotline-red: 'oklch(57.7% 0.245 27.325)'
  bulletin-ink: '#212529'
  charcoal: '#343a40'
  slate-text: '#495057'
  muted-gray: '#6c757d'
  rule-gray: '#dee2e6'
  hairline-gray: '#e9ecef'
  paper-gray: '#f1f3f5'
  surface-gray: '#f8f9fa'
  white: '#ffffff'
typography:
  display:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '3rem'
    fontWeight: 700
    lineHeight: 1.25
  headline:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '1.875rem'
    fontWeight: 700
    lineHeight: 1.375
  title:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
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
    letterSpacing: '0.025em'
  mono:
    fontFamily: 'Roboto Mono, ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: '4px'
  md: '6px'
  lg: '8px'
  xl: '12px'
  2xl: '16px'
  full: '9999px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  section: '48px'
components:
  button-primary:
    backgroundColor: '{colors.durian-gold}'
    textColor: '{colors.night-ink}'
    typography: '{typography.body}'
    rounded: '{rounded.lg}'
    padding: '12px 24px'
  button-primary-hover:
    backgroundColor: '{colors.durian-gold-deep}'
    textColor: '{colors.night-ink}'
  button-search:
    backgroundColor: '{colors.durian-gold}'
    textColor: '{colors.night-ink}'
    typography: '{typography.body-small}'
    rounded: '{rounded.lg}'
    padding: '8px 16px'
  nav-link:
    textColor: '{colors.slate-text}'
    typography: '{typography.body}'
    padding: '8px 16px'
  nav-link-hover:
    textColor: '{colors.deep-mandaya-blue}'
  card:
    backgroundColor: '{colors.white}'
    rounded: '{rounded.lg}'
    padding: '24px'
  icon-tile:
    backgroundColor: '{colors.mandaya-blue-mist}'
    textColor: '{colors.deep-mandaya-blue}'
    rounded: '{rounded.md}'
    padding: '12px'
  chip-tag:
    backgroundColor: '{colors.paper-gray}'
    textColor: '{colors.charcoal}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '4px 8px'
  input-search:
    backgroundColor: '{colors.white}'
    textColor: '{colors.charcoal}'
    typography: '{typography.body-small}'
    rounded: '{rounded.lg}'
    padding: '10px 16px 10px 36px'
  hotline-bar:
    backgroundColor: '{colors.hotline-red}'
    textColor: '{colors.white}'
    typography: '{typography.label}'
    padding: '10px 16px'
  hotline-pill:
    backgroundColor: '{colors.white}'
    textColor: '{colors.hotline-red}'
    rounded: '{rounded.full}'
    padding: '2px 12px'
---

# Design System: BetterDavao

## Overview

**Creative North Star: "The Plain-Spoken Bulletin"**

BetterDavao reads like a well-kept notice board for the city: information first, sober colors, and a clear order of importance. A resident should be able to glance at any page and know what it covers, where to tap next, and what number to call if something is wrong. The page doesn't decorate itself. It posts the facts neatly and gets out of the way.

The system is built on three bands that are always present: a **hotline bar** in alarm red, a white **masthead** with the eagle wordmark and a gold Search button, and a thin **Mandaya Blue info strip** (exchange rate, weather, Philippine time). Below that, content sits on white in a standard centered container. Section headings are bold and large, descriptions are in muted gray, and cards are bordered rectangles. Deep Mandaya Blue fills the home hero. Durian Gold appears only on the one or two things the visitor should press. The charcoal footer closes every page.

Density is moderate and mobile-first. Grids drop to a single column on phones, tap targets stay generous, and the hotline bar restacks into a full-width 911 button with a two-column list beneath it. The user has rejected two looks outright: **campaign or political styling** (tarpaulin-poster energy) and **generic SaaS landing-page patterns** (gradient blobs, glassmorphism, startup heroes).

**Key Characteristics:**

- Information first: bold headings, plain descriptions, and bordered cards. Little else.
- Three-band header: hotline red, white masthead, Mandaya Blue info strip.
- Navy carries the structure and gold marks the action. Both stay disciplined.
- Flat surfaces. Shadows are reserved for things that float.
- Sturdy, plain components built to be used one-handed on a phone.
- One typeface (Inter) does all the work.

## Colors

A civic palette: a deep navy for structure, a single warm gold for action, alarm red reserved for emergencies, and cool neutral grays for everything else.

### Primary

- **Deep Mandaya Blue** (`deep-mandaya-blue`): the institutional voice of the site. It fills the home hero, colors links and inline icons, tints the category icon tiles, and is the hover color for navigation. This is the color most visitors will associate with BetterDavao.
- **Mandaya Blue, bright** (`mandaya-blue-bright`): the 4px top rule on category cards, plus focus rings and active borders.
- **Mandaya Blue, ink** (`mandaya-blue-ink`): the wordmark beside the eagle, and link hover.
- **Mandaya Blue, night** (`mandaya-blue-night`): the info strip under the masthead.
- **Mandaya Blue, mist / wash** (`mandaya-blue-mist`, `mandaya-blue-wash`): icon-tile backgrounds and hover fills for menu rows and search results.
- **Night Ink** (`night-ink`): text on gold buttons.

### Secondary

- **Durian Gold** (`durian-gold`): the action color. It appears on "Browse Services", the masthead Search button, and the 2px hover underline in the desktop nav. Text on it is Night Ink, never white.
- **Durian Gold, deep** (`durian-gold-deep`): hover state for gold buttons.

### Tertiary

- **Hotline Red** (`hotline-red`): the emergency band only. It's the hotline bar background, with white 911 pills set in red text. It's Tailwind's default `red-600`, not the project's `error-*` ramp.

### Neutral

- **Bulletin Ink** (`bulletin-ink`): headings and the footer background.
- **Charcoal** (`charcoal`): card body copy, chip text, and input text.
- **Slate Text** (`slate-text`): navigation links and long-form body text.
- **Muted Gray** (`muted-gray`): secondary descriptions under headings and card titles. At 4.7:1 on white, it is the lightest gray allowed for readable text.
- **Rule Gray / Hairline Gray** (`rule-gray`, `hairline-gray`): card borders, input strokes, and dividers.
- **Paper Gray** (`paper-gray`): tag chip fills and gray hover backgrounds.
- **Surface Gray** (`surface-gray`): quiet alternate backgrounds and mobile submenu fills.
- **White** (`white`): the default page and card surface.

The project also defines `success-*`, `warning-*`, `error-*`, and a brown `secondary-*` ramp in `src/index.css`. They are almost unused today, so treat them as reserved for status messages rather than general palette colors.

### Named Rules

**The Gold Means Go Rule.** Durian Gold marks the action the visitor should take, at most one or two per screen. It is never a background for reading text, never decoration, and never a heading color.

**The Red Is for Emergencies Rule.** Hotline Red belongs to the hotline bar and emergency calls only. Validation errors and warnings use the `error-*` ramp, so red always means "call for help".

## Typography

**Display Font:** Inter (with ui-sans-serif, system-ui, -apple-system fallbacks)
**Body Font:** Inter
**Label/Mono Font:** Roboto Mono for code only

**Character:** A single, neutral, highly legible sans. Hierarchy comes from size and weight, not from mixing typefaces. That suits a bulletin, and it suits readers on cheap screens.

### Hierarchy

- **Display**: the page or hero title. Bold, scaling from 1.875rem on mobile to 2.25rem at `md` and 3rem at `lg`, with tight 1.25 leading and balanced wrapping.
- **Headline**: section headings on the home page ("Services & Information"). Bold, from 1.25rem to 1.5rem to 1.875rem, with 1.375 leading. They are `h2` in the outline; `Heading` takes a separate `size` so the semantic level and the visual step can differ.
- **Title**: card and list-item titles. 1.125rem, semibold (600) for category cards and medium (500) for list cards.
- **Body**: descriptions and markdown content. 1rem at 400 with 1.5 leading. Intro paragraphs are capped around 32rem wide (`max-w-lg`). Long-form markdown caps prose at 72ch while tables keep the full width. Paragraphs use `text-wrap: pretty` and h1–h3 use `balance`.
- **Body small**: card descriptions, footer links, search input, and dropdown rows. 0.875rem.
- **Label**: small caps-style labels ("HOTLINES", "POPULAR SERVICES"). 0.75rem, semibold, uppercase, with 0.025em tracking.

### Named Rules

**The One Typeface Rule.** Inter carries everything. Don't add a display or serif face for character. Emphasis comes from weight (500/600/700) and size.

## Layout

- **Container:** Tailwind's centered `container` with 16px side padding. It steps through the default breakpoints: 640, 768, 1024, 1280, and 1536px.
- **Section rhythm:** each section gets 48px of vertical padding on white. The home hero uses 48px on mobile and 96px from `md` up.
- **Grids:** category cards go from one column, to two at `sm`, three at `md`, and four at `lg`, with 24px gaps. Service lists use a single-column stack of full-width cards with 16px gaps, so long titles never wrap into narrow columns.
- **Hero:** two columns at `lg` (intro text on the left, the search panel on the right) and stacked below that. The blue is a plain surface with no texture.
- **Header:** the hotline bar is centered and scrolls horizontally on desktop. On mobile it restacks into a full-width 911 button and a two-column list. The masthead is 80px tall and sticky. The info strip is right-aligned on desktop.
- **Navigation:** desktop nav appears at `lg` (1024px). Below that, a hamburger opens an accordion menu.
- **Breadcrumbs:** sit above every listing and document title, with 32px below them.

## Elevation & Depth

The system is **flat by default, with lift for overlays**. Cards sit on the page with a hairline border and an extra-small shadow that barely registers. The sticky masthead has a small shadow so content scrolling underneath stays readable. Real, visible shadows are only for things that float above the page: nav dropdowns, the hero search panel, and search-result menus.

### Shadow Vocabulary

- **Resting hairline** (`shadow-xs`): cards at rest. Barely visible, so the border does the work.
- **Masthead** (`shadow-sm`): the sticky nav bar.
- **Card hover lift** (`shadow-md` plus a 4px upward translate): clickable cards on hover.
- **Menu float** (`shadow-lg` / `shadow-xl`): dropdown menus and search-result panels.
- **Hero panel** (`shadow-2xl`): the search card in the home hero. Nothing else uses it.

### Named Rules

**The Float Earns Shadow Rule.** A surface gets a real shadow only if it sits above other content: a menu, a popover, or the hero search panel. Static content uses a border.

## Shapes

Corners are gently rounded and consistent, never pill-shaped except for the 911 call-outs.

- **Cards, buttons, inputs:** 8px (`rounded.lg`).
- **Icon tiles and small controls:** 6px (`rounded.md`).
- **Tag chips:** 4px (`rounded.sm`), squarer than buttons so they read as labels rather than actions.
- **Floating panels:** 12px for dropdowns and popular-service tiles, 16px for the hero search panel.
- **Pills:** fully rounded, reserved for the hotline 911 call-outs.
- **Category cards** carry a 4px Mandaya Blue top rule. That's the one decorative edge in the system, used to mark service categories.

## Components

Every component should feel **sturdy and plain**: clear edges, generous tap targets, nothing decorative, and easy to use one-handed on a bus.

### Buttons

- **Shape:** gently rounded (8px).
- **Primary (Durian Gold):** gold fill with Night Ink text, semibold, 12px × 24px padding. Hover darkens to Durian Gold, deep. Used for "Browse Services".
- **Search (masthead):** the same gold treatment, smaller (8px × 16px), with a leading search icon and a small resting shadow. On hover the shadow grows, the button lifts 1px, and the icon tilts slightly.
- **Hover / Focus:** color transitions run 300ms. Focus uses a 2px Mandaya Blue ring.
- **No secondary button exists yet.** Text links in Deep Mandaya Blue do that job.

### Chips

- **Style:** Paper Gray fill, Charcoal text, 0.75rem medium, 4px radius, 4px × 8px padding.
- **Use:** category tags on service list cards. They are labels, not filters. There's no selected state.

### Cards / Containers

- **Corner Style:** 8px.
- **Background:** white.
- **Border:** 1px hairline gray. Category cards add a 4px Mandaya Blue top rule.
- **Shadow Strategy:** resting hairline. Clickable cards lift on hover (see Elevation & Depth).
- **Internal Padding:** 24px.
- **Category card:** a Mandaya Blue icon tile (mist background, 24px icon) next to the title, with the description below. The whole card is the link.
- **List card:** title, a one-line muted description, and a tag chip. These are full-width in single-column lists.
- **Markdown card:** service and office documents render inside a card as long-form content.

### Inputs / Fields

- **Style:** white background, 1px hairline border, 8px radius, a 16px search icon inset at the left, and 0.875rem Charcoal text with Muted Gray placeholders.
- **Focus:** the border goes transparent and a 2px Mandaya Blue ring appears.
- **Results menu:** a white panel with a 1px border, a large shadow, and an 8px radius. Rows highlight in Mandaya Blue wash, and matched text gets a pale yellow highlight.

### Navigation

- **Masthead:** white, 80px tall, sticky, with a small shadow. The eagle logo and the "BetterDavao.org" wordmark in Mandaya Blue ink sit on the left. On hover the wordmark lifts 1px.
- **Desktop links:** Slate Text, 1rem medium. On hover they turn Deep Mandaya Blue and a 2px Durian Gold underline grows from the left over 400ms. Dropdowns open on hover or keyboard focus (`focus-within`) in a 12px-rounded white panel. Rows are 44px tall and take a Mandaya Blue wash on hover or focus.
- **Mobile:** below 1024px, a hamburger toggles a full-width accordion. Every row is at least 44px tall. The toggle announces its state with `aria-expanded`. Items without children are plain links, and submenus indent over Surface Gray with an "All …" link first. The language switcher sits at the bottom.

### Hotline Bar (signature)

The red emergency band above the masthead on every page. It's the system's clearest commitment: help is always one tap away. White labels and numbers use the label style, always solid white with no opacity or pink tints. Featured numbers (911) become white pills with red-700 text. Every number is a `tel:` link, and "View All Hotlines" leads to the full list. It never collapses or hides, at any breakpoint.

### Info Strip

A thin Mandaya Blue night band under the masthead showing the exchange rate (rotating through currencies), the Davao temperature, and Philippine time. The text is small and bold in white. A 32px pause button stops the rotation (WCAG 2.2.2), and the rotation starts paused for visitors who prefer reduced motion.

## Do's and Don'ts

### Do:

- **Do** keep the three-band header (hotline red, white masthead, Mandaya Blue info strip) on every page.
- **Do** use Durian Gold with Night Ink text for the primary action, and only one or two gold elements per screen.
- **Do** put static content on white cards with a 1px hairline border and an 8px radius. Shadows are for things that float.
- **Do** keep readable text at Muted Gray (`#6c757d`, 4.7:1) or darker. Never make text "secondary" with opacity or light tints.
- **Do** keep tap targets at least 44px tall (`min-h-11`), and make whole cards the link.
- **Do** gate movement on `motion-safe:`. Hover lifts and entrance fades must not run when the visitor prefers reduced motion.
- **Do** register any icon named in YAML in `src/lib/icons.ts`. Never `import * as` from `lucide-react`.
- **Do** extend the existing tokens in `src/index.css` (`@theme`). That file is the source of truth.

### Don't:

- **Don't** use campaign or political styling: no tarpaulin-poster type, no candidate-style portraits as hero art, no patriotic flourishes.
- **Don't** use generic SaaS landing-page patterns: no gradient blobs, glassmorphism, or floating 3D illustrations.
- **Don't** use Hotline Red for anything other than emergency contacts.
- **Don't** use `gray-400`/`gray-500` or `opacity-*` for text on white, or pink tints on Hotline Red. They fail WCAG AA.
- **Don't** add a second typeface, and don't set headings in gold.
- **Don't** recreate `tailwind.config.js`. Tailwind v4 reads tokens and keyframes from `@theme` in `src/index.css`.
- **Don't** put an eyebrow label (small tracked uppercase text) directly above a heading. The heading carries its own weight.
- **Don't** put a colored bar down one side of a rounded box, or nest cards inside cards. The officials page uses flat bordered cards and district dividers.
