# ISS-003 · Testimonials / Success Stories Carousel

**Overall Progress:** `80%`

## TLDR

Add a social-proof section with a horizontally scrollable carousel of 3 testimonial cards. Two types of testimonials: (1) sellers who were matched with partners and started selling in LATAM, and (2) partners who joined the ecosystem and connected with international sellers. Each card shows a quote, person photo/avatar, name, role, company, and a seller/partner badge. Shared across both personas, placed before the footer.

## Critical Decisions

- **CSS scroll-snap carousel over a library** — No Swiper/Embla dependency needed for 3 cards. Native scroll-snap gives smooth horizontal scrolling with snap points, plus arrow buttons and dot indicators for navigation.
- **Shared section (not persona-gated)** — Testimonials appear for both seller and partner personas since both types of success stories build trust for either audience.
- **Placement: after persona content, before footer** — Acts as a final trust signal before the user scrolls to the end of the page.
- **Initials-based avatar placeholders** — Colored circles with initials for v1. Easy to swap for real photos later by replacing with `<Image>` tags.
- **3 mock testimonials** — 2 seller stories (Chinese sellers expanding to Mexico/Brazil) + 1 partner story (LATAM service provider growing through the ecosystem). Content is realistic and representative.
- **Full i18n support** — All quote text, names, roles, companies, and badge labels translated in both `en.json` and `zh.json`.

## Tasks

- [x] 🟩 **Step 1: Add translation keys**
  - [x] 🟩 Add `testimonials.*` keys to `app/src/translations/en.json` (title, subtitle, 3 quotes with name/role/company/type, badge labels)
  - [x] 🟩 Add matching `testimonials.*` keys to `app/src/translations/zh.json`

- [x] 🟩 **Step 2: Create `Testimonials` component**
  - [x] 🟩 New file `app/src/components/Testimonials.tsx`
  - [x] 🟩 Section header (title + subtitle) centered above the carousel
  - [x] 🟩 Horizontal scroll track with `snap-x snap-mandatory` and hidden scrollbar
  - [x] 🟩 Card layout: quote icon, blockquote text, person row (avatar + name/role + badge)
  - [x] 🟩 Initials-based avatar circles with brand colors (purple, cyan, emerald)
  - [x] 🟩 Seller/Partner badge with color coding (violet for seller, cyan for partner)
  - [x] 🟩 Left/right arrow buttons (visible on `md+`, disabled at boundaries)
  - [x] 🟩 Dot indicators with active pill animation
  - [x] 🟩 `IntersectionObserver` to sync active dot with scroll position
  - [x] 🟩 Responsive card widths: ~85vw mobile → 2-up tablet → 3-up desktop

- [x] 🟩 **Step 3: Integrate into page layout**
  - [x] 🟩 Import `Testimonials` in `app/src/app/page.tsx`
  - [x] 🟩 Place between persona content `<div>` and `<Footer />`

- [ ] 🟥 **Step 4: Visual QA**
  - [ ] 🟥 Verify carousel scrolls and snaps correctly on desktop
  - [ ] 🟥 Verify touch/swipe scrolling on mobile
  - [ ] 🟥 Verify arrow buttons and dot navigation work
  - [ ] 🟥 Verify both EN and ZH language modes render correctly
  - [ ] 🟥 Verify responsive behavior (mobile → tablet → desktop)

- [ ] 🟥 **Step 5: Replace mock content with real data**
  - [ ] 🟥 Swap placeholder initials for real headshot photos
  - [ ] 🟥 Update names, roles, companies, and quotes with actual customer/partner testimonials
