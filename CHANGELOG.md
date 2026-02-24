# Changelog

All notable changes to this project are documented in this file.

## Unreleased

### Added
- **Testimonials carousel** — "Success Stories" section with 3 horizontally scrollable cards (2 seller, 1 partner). CSS scroll-snap, no external library. Placed in seller flow after expansion journey CTA, before "Markets We Cover".
  - Each card: quote with bold key metric, person info (name, role, company), seller/partner badge.
  - Arrow + dot navigation on mobile/tablet; hidden on desktop where all 3 cards fit.
  - Initials-based avatar placeholders (ready for real photos).
  - Full EN/ZH translations (`testimonials.*` keys).
  - New component: `app/src/components/Testimonials.tsx`.
- Hero marketplace logo strip with Amazon, Mercado Libre, Walmart, and Linio logos.
- New `MarketplaceLogos` component rendered directly below hero CTAs.
- Test tooling: Jest + React Testing Library + Playwright.
- Test scripts in `app/package.json`: `test:unit`, `test:e2e`, and `test`.
- Initial test coverage:
  - Unit test for marketplace logo strip rendering.
  - E2E smoke test for homepage load, persona toggle, and logo visibility.
- Implementation plan: `docs/plans/ISS-003-testimonials-carousel.md`.

### Changed
- Seller section spacing tightened across value prop, journey, and markets sections.
- Marketplace heading moved to shared hero translations (`hero.marketplaces`) in English and Chinese.
- Playwright config runs against a production-style local server (`build` + `start`) to avoid dev lock conflicts.
- App docs updated with testing commands and paths.

### Fixed
- Removed unused placeholder logo assets and normalized logo filenames.
- Added git ignores for generated test artifacts (`playwright-report`, `test-results`) and Vercel local config.
- Committed `MarketplaceLogos.tsx` and logo assets that were missing from git (caused Vercel build failure).
