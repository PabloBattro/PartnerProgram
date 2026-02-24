# Feature Implementation Plan: Expansion Journey Revamp

**Overall Progress:** `100%`

**Backlog ref:** ISS-001

## TLDR
Revamp the "Your Expansion Journey" seller section — both content and visual — to turn a passive educational timeline into an active sales argument that drives form conversions. Add partner-solution hooks per stage, improve scanability without clicking, add a closing CTA, and polish the visual timeline.

## Critical Decisions
- **Keep accordion pattern** — 6 stages is too much to show fully expanded; accordion is right, but collapsed state needs more content
- **Add "partner solution" per stage** — each stage gets a short line showing how the ecosystem solves that challenge (new i18n keys)
- **CTA after journey** — lightweight anchor link to `#seller-form`, not a full hero block
- **Replace text chevron with SVG** — consistent with existing icon usage across the app
- **No structural refactor** — stay in `SellerSection.tsx`, no new components needed; keep the `stages` array pattern
- **Both languages** — every copy change touches `en.json` and `zh.json`

## Tasks:

- [x] 🟩 **Step 1: Content — rewrite stage copy and add partner-solution lines**
  - [x] 🟩 Rewrite `stage1Desc`–`stage6Desc` for sharper, more persuasive phrasing
  - [x] 🟩 Rewrite `stage1Pain`–`stage6Pain` to be more specific and visceral
  - [x] 🟩 Add new i18n keys `stage1Solution`–`stage6Solution` (one-liner per stage showing how partners help)
  - [x] 🟩 Apply all above in `en.json`
  - [x] 🟩 Apply all above in `zh.json`

- [x] 🟩 **Step 2: Visual — collapsed state shows more content**
  - [x] 🟩 Show stage description (truncated to 2 lines via `line-clamp-2`) below the title in collapsed state
  - [x] 🟩 Reserve expanded state for challenge callout + new partner-solution element

- [x] 🟩 **Step 3: Visual — partner solution element in expanded state**
  - [x] 🟩 Add emerald-colored callout below the amber challenge showing the partner solution line
  - [x] 🟩 Use checkmark-circle SVG icon to differentiate from the challenge callout

- [x] 🟩 **Step 4: Visual — timeline polish**
  - [x] 🟩 Increase vertical line from `w-px` to `w-0.5` with brand purple gradient
  - [x] 🟩 Replace text `⌄` chevron with SVG chevron + rotate-180 animation
  - [x] 🟩 Normalize section padding to `py-12 md:py-16` to match sibling sections
  - [x] 🟩 Add `ring-4 ring-white` to numbered circles for cleaner timeline connection

- [x] 🟩 **Step 5: CTA block after journey**
  - [x] 🟩 Add centered CTA below the last stage: headline + Button linking to `#seller-form`
  - [x] 🟩 Add i18n keys for CTA headline and button text (`en.json` + `zh.json`)

- [x] 🟩 **Step 6: Verify**
  - [x] 🟩 Lint passed — zero errors on all touched files
  - [x] 🟩 Accordion open/close logic preserved (`openStage` state unchanged)
  - [x] 🟩 Both EN and ZH translation keys aligned (6 new keys each: solution + journeySubtitle + solutionLabel + journeyCtaTitle + journeyCtaButton)
