# Backlog

> Issues captured during development. Newest first.

---

<!-- New issues are appended below this line -->

### ISS-001 · Revamp "Your Expansion Journey" section — content and visual

| Field    | Value                          |
|----------|--------------------------------|
| Type     | improvement                    |
| Priority | high                           |
| Effort   | medium                         |
| Status   | open                           |
| Created  | 2026-02-23                     |

**TL;DR:** The Expansion Journey accordion section needs a content + visual overhaul to feel more polished, actionable, and differentiated from generic timelines.

**Current → Expected:**
- Current: Plain vertical timeline with numbered purple circles, basic accordion, generic challenge callouts. Feels like a wireframe — low information density, no visual payoff when stages expand, copy is descriptive but not persuasive.
- Expected: A visually engaging, scannable journey section that sells the complexity of LATAM expansion (reinforcing why the user needs Payoneer's partner ecosystem), with richer content, better visual hierarchy, and a clear CTA at the end.

**Files:**
- `app/src/components/SellerSection.tsx` (lines 122–161)
- `app/src/translations/en.json` (stage1–stage6 keys)
- `app/src/translations/zh.json` (stage1–stage6 keys)

**Notes:** Needs both design review (visual/UX) and content review (copy). See exploration and design review notes captured alongside this issue.

---

### ISS-002 · Add LATAM marketplace logo strip (Stripe-style)

| Field    | Value                          |
|----------|--------------------------------|
| Type     | feature                        |
| Priority | normal                         |
| Effort   | small                          |
| Status   | open                           |
| Created  | 2026-02-23                     |

**TL;DR:** Add a static logo bar (à la Stripe's homepage) showcasing LATAM marketplaces we work with: Mercado Libre, Walmart, Amazon, Linio.

**Current → Expected:**
- Current: No marketplace logo strip exists on the landing page.
- Expected: A horizontal row of grayscale (or muted-color) marketplace logos below the hero or in a relevant section, reinforcing credibility and LATAM marketplace coverage. Static layout, no carousel animation needed for v1.

**Files:**
- `app/src/components/` (new component, e.g. `MarketplaceLogos.tsx`)
- `app/src/assets/` (SVG logo files to be added)

**Notes:**
- Logo sources: [Simple Icons](https://simpleicons.org) for Amazon, Mercado Libre, Walmart. Linio logo may need manual sourcing (Falabella-owned, check brandsoftheworld.com).
- Design reference: Stripe homepage logo bar — grayscale logos, horizontally centered, subtle.
- Could evolve into a scrolling carousel later if more marketplaces are added.

---
