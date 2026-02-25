# ISS-002 · LATAM Marketplace Logo Strip

**Overall Progress:** `100%`

## TLDR

Add a static, Stripe-style horizontal logo bar showing the LATAM marketplaces we work with (Mercado Libre, Walmart, Amazon, Linio). Positioned inside the Seller section to reinforce credibility and marketplace coverage.

## Critical Decisions

- **Static over carousel** — Keep it simple for v1; no animation, just a clean horizontal row. Can evolve into a scrolling carousel later if more logos are added.
- **SVG logos in `app/public/logos/`** — Store marketplace SVGs alongside existing brand assets. Use Next.js `Image` for optimization.
- **Grayscale treatment via Tailwind** — Apply `grayscale` + `opacity` filters in CSS so logos feel cohesive and don't clash with brand colors. Subtle hover to full color optional.
- **Seller section only** — Logo strip lives inside `SellerSection.tsx` (marketplaces are seller-facing context, not partner-facing).
- **i18n for label text** — The strip heading (e.g., "Sell on leading LATAM marketplaces") goes through `en.json` / `zh.json`.

## Tasks

- [x] 🟩 **Step 1: Source and add logo SVGs**
  - [x] 🟩 Download SVG logos: Amazon, Mercado Libre, Walmart, Linio
  - [x] 🟩 Place them in `app/public/logos/` (e.g., `amazon.svg`, `mercadolibre.svg`, `walmart.svg`, `linio.svg`)
  - [x] 🟩 Normalize sizes — ensure consistent height (~32–40px rendered) and no excess whitespace

- [x] 🟩 **Step 2: Create `MarketplaceLogos` component**
  - [x] 🟩 New file `app/src/components/MarketplaceLogos.tsx`
  - [x] 🟩 Horizontal flex row, centered, with even spacing between logos
  - [x] 🟩 Grayscale + reduced opacity via Tailwind (`grayscale opacity-60`)
  - [x] 🟩 Optional: hover → full color transition (`hover:grayscale-0 hover:opacity-100 transition`)
  - [x] 🟩 Responsive: wrap or scale down on mobile

- [x] 🟩 **Step 3: Add i18n keys**
  - [x] 🟩 Add `seller.marketplaces.heading` to `app/src/translations/en.json`
  - [x] 🟩 Add `seller.marketplaces.heading` to `app/src/translations/zh.json`

- [x] 🟩 **Step 4: Integrate into SellerSection**
  - [x] 🟩 Import `MarketplaceLogos` in `app/src/components/SellerSection.tsx`
  - [x] 🟩 Place it after the value prop / "Why LATAM" section and before the journey section
  - [x] 🟩 Wrap with a subtle section container (light bg, padding)

- [x] 🟩 **Step 5: Visual QA**
  - [x] 🟩 Page compiles and returns 200 — no build errors
  - [ ] 🟥 Manual check: verify alignment, spacing, and grayscale on desktop
  - [ ] 🟥 Manual check: verify responsive behavior on mobile
  - [ ] 🟥 Manual check: both EN and ZH language modes
