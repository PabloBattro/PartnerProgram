# PartnerProgram - Project Context Summary

Last updated: 2026-02-13 (post-deploy)

## Project Goal

Build a standalone, Payoneer-branded, two-sided landing experience to validate ecosystem demand in LATAM:
- Sellers (mainly Chinese cross-border sellers expanding to LATAM)
- Partners (service providers: legal, tax, logistics, marketing, etc.)

Primary objective in V1 is strategic validation and structured lead capture, not full product automation.

## V1 Scope Decisions

- One page with persona toggle (Seller / Partner), not separate sites
- English + Chinese in V1 (Spanish + Portuguese deferred)
- Mobile responsive
- Manual matchmaking process
- No notifications in V1
- Editorial content deferred to V2

## Tech Stack

- Frontend: Next.js + React + Tailwind CSS
- Backend/data capture: Supabase (Postgres + RLS policies)
- Deployment target: Vercel
- i18n: JSON translations + React context

## What Was Implemented

- Next.js app scaffolded in `app/`
- Reusable UI components and full landing sections created
- Persona flow implemented:
  - `app/src/components/SellerSection.tsx`
  - `app/src/components/PartnerSection.tsx`
- API submission routes implemented:
  - `app/src/app/api/submit-seller/route.ts`
  - `app/src/app/api/submit-partner/route.ts`
- Supabase client setup:
  - `app/src/lib/supabase.ts`
- i18n wiring and EN/ZH translation files:
  - `app/src/lib/i18n.tsx`
  - `app/src/translations/en.json`
  - `app/src/translations/zh.json`
- Planning and DB docs:
  - `docs/plan-partner-landing.md`
  - `docs/supabase-setup.sql`
- Knowledge context docs for future chats:
  - `knowledge/project-context-summary-2026-02-13.md`
  - `knowledge/quick-start-next-chat.md`

## Supabase State

- Tables expected:
  - `seller_submissions`
  - `partner_applications`
- RLS enabled with anon INSERT policies for public form submissions
- Required env vars configured in local app (`.env.local`) and documented in `app/.env.example`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Optional local-only TLS workaround flag:
  - `ALLOW_INSECURE_LOCAL_TLS` (`1` only for local dev behind proxy; never production)

## Key Issue Solved

Local submission failures due to corporate SSL interception (`SELF_SIGNED_CERT_IN_CHAIN`) were handled with a local-development workaround in `app/src/lib/supabase.ts` that is now restricted to:
- server-side only
- development mode only
- explicit opt-in with `ALLOW_INSECURE_LOCAL_TLS=1`

## Security Hardening Completed

- Server-side payload validation added for both public APIs:
  - `app/src/lib/validation.ts`
  - Wired into:
    - `app/src/app/api/submit-seller/route.ts`
    - `app/src/app/api/submit-partner/route.ts`
- Basic anti-abuse controls added:
  - In-memory IP rate limiting utility: `app/src/lib/security.ts`
  - Applied on both submit APIs (`429` + `Retry-After`)
  - Honeypot field (`website`) added to both forms:
    - `app/src/components/SellerSection.tsx`
    - `app/src/components/PartnerSection.tsx`
- Logging improved in APIs:
  - Sanitized error context instead of dumping full error objects
- DB insert cleanup:
  - Removed redundant `submitted_at` payload fields (DB defaults now authoritative)

## Brand/UI Status

Current status:
- Brand assets were added and extracted under `brand-assets/`
- Available official assets include:
  - Master lockup logos
  - Stacked lockup logos
  - Halo symbol
  - Formats: SVG/PNG/PDF/EPS/AI
- Extra brand files present in root:
  - `Payo-Brand-Guidelines---Update-v1.0.pdf`
  - `color-palette.pdf`
  - `Payoneer-Brand-Assets.aspx`
- UI refactor completed (core pass):
  - Official logos integrated in:
    - `app/src/components/Header.tsx`
    - `app/src/components/Footer.tsx`
    - assets copied to `app/public/brand/`
  - New visual tokens applied in `app/src/components/ui.tsx`
  - White-first hero and visual cleanup:
    - `app/src/components/Hero.tsx`
    - `app/src/components/SellerSection.tsx`
    - `app/src/components/PartnerSection.tsx`
  - Typography and globals updated:
    - `app/src/app/layout.tsx` (DM Sans)
    - `app/src/app/globals.css`
- Final polish pass completed (senior design feedback applied):
  - Header segmented control improved for information hierarchy + mobile behavior
  - Hero stats redesigned into compact insight tiles
  - Added directional CTA under hero stats
  - Seller "Expansion Journey" redesigned as timeline + accordion
  - Pain points reframed as "Challenges" with advisory amber callouts (not red error alerts)
  - Country cards improved with code pills (`MX`, `BR`, `AR`, `CO`) and stronger contrast rhythm
  - Surface/elevation system normalized (border + micro-shadow + consistent radius)
  - Mobile spacing/typography rhythm improved across hero/seller/partner sections

## Maintainability Improvements Completed

- Shared `Persona` type extracted:
  - `app/src/types/persona.ts`
  - adopted by `page.tsx`, `Header.tsx`, `Hero.tsx`
- Runtime `html lang` now tracks active i18n language in:
  - `app/src/lib/i18n.tsx`
- Removed unused i18n type causing lint warning in:
  - `app/src/lib/i18n.tsx`

## Cursor Workflow Setup Already Done

- Main rule file configured: `.cursorrules`
- Custom workflow rules moved to `.cursor/rules/*.mdc`
- Old `.cursor/commands/*.md` files were removed (expected)

## Git and Deployment Status

- Git initialized at project root: `PartnerProgram/.git`
- Initial commit created on `main`:
  - `2e80bd6 Initial PartnerProgram: UI refactor, security hardening, and knowledge docs`
- GitHub remote configured and push completed:
  - `https://github.com/PabloBattro/PartnerProgram.git`
- Vercel deployment completed from `app/` root directory
- Production URL live:
  - `https://partner-program-drab.vercel.app/`
- Vercel env vars configured and verified:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Local-only `ALLOW_INSECURE_LOCAL_TLS` remains a development workaround and should not be configured in Vercel
- Live form submission confirmed working after env var setup + redeploy

## Recommended Next Steps

1. Connect custom domain in Vercel
2. Add basic analytics/event tracking for submission funnel visibility
3. Optional: move in-memory rate limiter to persistent store (Upstash/Redis) before higher traffic
4. Add lightweight regression checklist for every deploy (seller submit, partner submit, DB verify)
5. Start V2 scope planning (Spanish/Portuguese + editorial content)


