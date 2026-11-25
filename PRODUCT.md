# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Davao City residents on mobile** (primary). Everyday residents, often on
  phones with weak or metered data, who come to finish one task: find a
  permit's requirements, apply for assistance, check a garbage schedule, look up
  a hotline or an office.
- **Seniors, PWDs, and readers with lower literacy.** These are core users, not
  edge cases. They need plain language, readable text, and pages that work with
  a screen reader and keyboard.
- **Business owners and professionals** (owners, brokers, contractors) dealing
  with business permits, taxes, zoning, and building requirements.
- **Contributors and other LGUs.** Volunteers who edit content in YAML and
  Markdown, and other local governments or civic-tech groups who may reuse the
  pattern.

## Product Purpose

BetterDavao is an unofficial, community-built guide to Davao City government
services and offices. Official LGU websites are usually organized around the
government's own structure, hide information in PDFs, and are hard to use on a
phone or a slow connection. BetterDavao reorganizes that information around what
residents need to do, in plain language, and links every fact back to its
official source.

Success means a resident can find out what a service is, who qualifies, what to
bring, how much it costs, where to go, and how long it takes, without calling or
queueing just to ask, and can trust what they read.

## Positioning

BetterDavao is people-first and task-first rather than organized by office, and
it is source-accountable: every fact shown to residents traces to an official or
reliable source recorded in `docs/data-sources.md`. Because it is independent of
the City, it can be clearer, faster, and more candid about gaps ("needs
verification") than an official portal.

## Operating Context

- Residents mostly arrive on mobile, often through search or a shared link, with
  a single question in mind.
- Content is written in YAML and Markdown under `content/` and `src/data/`.
  Contributors work through GitHub pull requests.
- Each content PR is reviewed for sourcing: fees, requirements, hours,
  addresses, contacts, deadlines, and eligibility must be traceable. Reviews are
  saved in `code-reviews/`, and sources are logged in `docs/data-sources.md`
  with a "last checked" date.
- The project is a fork of `iyanski/betterlocalgov` (the BetterGov.ph-style LGU
  starter kit). Hosting: Vercel config and Terraform are present.

## Capabilities and Constraints

- **Service categories:** health, education, business and livelihood, social
  welfare, agriculture and fisheries, infrastructure and public works, garbage
  and waste, environment, disaster preparedness, housing and land use.
- **Government sections:** officials (Mayor, Vice Mayor, congressional
  representatives, City Council by district) and departments. Also hotlines and
  a city history timeline on the home page. News, guides and regulations,
  reports, consultations, and transparency documents exist as categories but
  are not yet filled in.
- **Service pages follow a standard shape:** what it is, who it's for, where,
  when, requirements, cost, and processing time (see `CONTENT-GUIDE.md`).
- **Unofficial status must stay clear.** The site must never present itself as
  the City Government or imply that the City endorses it. Content headings
  currently read "— City Government of Davao", which describes the services but
  could be mistaken for authorship. Future work should keep this distinction
  clear.
- **Stack:** React 19, TypeScript, Vite, Tailwind, i18next, and a static
  YAML/Markdown content system.
- **Free to diverge from upstream:** the betterlocalgov and `@bettergov/kapwa`
  foundations are a starting point, not a constraint on structure or design.
- **Languages:** English only today. Cebuano/Davaoeño Bisaya (and possibly
  Filipino) are planned, so layouts and copy must allow longer strings and
  switching languages.

## Brand Commitments

- Name: **BetterDavao** (site URL in env: BetterDavao.org).
- Voice: plain, citizen-first, practical. Write for residents, not officials.
  Avoid jargon and unexplained acronyms.
- Honesty over completeness: say what is unverified instead of filling gaps.

## Evidence on Hand

- Sourced content across the service categories above, with sources in
  `docs/data-sources.md`.
- Official photos of elected officials in `public/images/officials/`.
- City artwork in `public/images/city-of-davao-artwork.jpeg`.
- City history timeline sourced from the City's "Davao: A Brief History" PDF.
- Logo variants in `public/` (`logo*.svg`).
- **Do not fabricate:** there are no testimonials, usage statistics,
  partnerships, City endorsements, or official seals to draw on. Do not invent
  fees, hours, contacts, or requirements.

## Product Principles

1. **Tasks before org charts.** Organize around what a resident needs to do,
   not which office does it.
2. **Every fact has a source.** Content without a traceable source does not
   ship. Mark gaps as unverified instead of guessing.
3. **Built for the hardest conditions first.** That means a cheap phone, a weak
   connection, an older reader, or a screen reader. If it works there, it works
   everywhere.
4. **Clearly independent.** Be useful and trustworthy without borrowing the
   City's authority.
5. **Easy to contribute to.** Content stays in plain files that a non-developer
   can edit and a reviewer can check.

## Accessibility & Inclusion

- Target WCAG 2.2 AA. Seniors, PWDs, and readers with lower literacy are
  primary users.
- Plain language throughout. Keep pages light for low-bandwidth mobile.
- Prepare for multilingual content (Cebuano/Bisaya planned).
