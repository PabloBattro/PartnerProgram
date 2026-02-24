# Backlog

> Issues captured during development. Newest first.

---

<!-- New issues are appended below this line -->

### ISS-003 · Testimonials / Success Stories carousel

| Field    | Value                          |
|----------|--------------------------------|
| Type     | feature                        |
| Priority | normal                         |
| Effort   | medium                         |
| Status   | done (code); pending real content |
| Created  | 2026-02-24                     |
| Closed   | 2026-02-24                     |

**TL;DR:** Social proof carousel with 3 success story cards — 2 sellers (Chinese brands expanding to LATAM) + 1 partner (LATAM service provider growing via ecosystem). Horizontally scrollable on mobile, static 3-up on desktop.

**Implementation:**
- `app/src/components/Testimonials.tsx` — CSS scroll-snap carousel, IntersectionObserver for dot sync
- Translation keys: `testimonials.*` in `en.json` / `zh.json`
- Placed in `SellerSection.tsx` between journey CTA and "Markets We Cover"
- Plan: `docs/plans/ISS-003-testimonials-carousel.md`

**Remaining:**
- Replace mock avatars with real headshots
- Replace mock quotes/names with actual customer/partner testimonials

---

### ISS-001 · Revamp "Your Expansion Journey" section — content and visual

| Field    | Value                          |
|----------|--------------------------------|
| Type     | improvement                    |
| Priority | high                           |
| Effort   | medium                         |
| Status   | done                           |
| Created  | 2026-02-23                     |
| Closed   | 2026-02-24                     |

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
| Status   | done                           |
| Created  | 2026-02-23                     |
| Closed   | 2026-02-24                     |

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
