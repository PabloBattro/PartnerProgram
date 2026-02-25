# ISS-004: Event Photo Gallery

**Overall Progress:** `100%`

## TLDR
Add a photo carousel showcasing the "Payoneer x Mercado Libre LATAM Summit 2025, Shanghai" event. It appears in two places: (A) a shared social-proof strip right after MarketplaceLogos visible to everyone, and (C) a conversion nudge inside each persona section right before the form. All 4 photos show in both flows. Messaging adapts per persona — sellers hear "we bring LATAM experts to China", partners hear "we take you to China to meet sellers".

## Critical Decisions
- **Placement: shared strip + per-persona pre-form nudge** — maximum WOW on first scroll, then contextual reinforcement before conversion
- **Carousel component** — reusable `EventGallery` component with horizontal snap-scroll (matching existing Testimonials pattern), fallback to hero-banner if carousel doesn't land visually
- **All 4 photos in both flows** — no per-persona photo curation; the full set tells the story for both audiences
- **Persona-aware copy** — same component, different i18n keys depending on active persona context
- **`next/image` optimization** — photos served from `app/public/events/`, automatic WebP/sizing via Next.js Image component
- **Event named explicitly** — "Payoneer x Mercado Libre LATAM Summit 2025, Shanghai" for credibility

## Tasks:

- [x] 🟩 **Step 1: Move & prepare photos**
  - [x] 🟩 Create `app/public/events/` directory
  - [x] 🟩 Copy the 4 JPGs from `Event Photos/` into `app/public/events/` with clean filenames (e.g., `summit-panel.jpg`, `summit-enviopack.jpg`, `summit-tally.jpg`, `summit-snowball.jpg`)

- [x] 🟩 **Step 2: Add i18n translations**
  - [x] 🟩 Add `eventGallery` keys to `en.json` — title, subtitle, persona-specific captions (seller vs partner framing), event label
  - [x] 🟩 Add matching `eventGallery` keys to `zh.json`

- [x] 🟩 **Step 3: Build `EventGallery` component**
  - [x] 🟩 Create `app/src/components/EventGallery.tsx`
  - [x] 🟩 Horizontal snap-scroll carousel (follow Testimonials pattern: scroll container, dots, arrows)
  - [x] 🟩 Accept `persona` prop to switch headline/subtitle copy
  - [x] 🟩 Use `next/image` with proper alt text for each photo
  - [x] 🟩 Overlay event badge: "Payoneer x Mercado Libre LATAM Summit 2025, Shanghai"

- [x] 🟩 **Step 4: Integrate shared strip in page layout**
  - [x] 🟩 In `page.tsx`, render `<EventGallery persona={persona} />` right after `<MarketplaceLogos />`

- [x] 🟩 **Step 5: Integrate per-persona pre-form nudge**
  - [x] 🟩 In `SellerSection.tsx`, add a compact `EventGallery` variant before the seller form section, with seller-specific messaging ("We bring LATAM experts to China to help you grow")
  - [x] 🟩 In `PartnerSection.tsx`, add the same before the partner form section, with partner-specific messaging ("We take partners to China to meet sellers directly")

- [x] 🟩 **Step 6: Visual polish & responsive QA**
  - [x] 🟩 Verify carousel works on mobile (touch swipe), tablet (arrows), desktop (all cards visible or 2-up)
  - [x] 🟩 Ensure photos render crisp and fast (check `next/image` sizes prop)
  - [x] 🟩 Test both EN and ZH translations
