# Feature Implementation Plan: Partner Ecosystem Landing Page

**Overall Progress:** `100%`

## TLDR
Build a single-page landing experience with a Seller/Partner persona toggle, each showing tailored content and a structured intake form. Submissions go to Supabase. Deployed on Vercel with Payoneer branding. V1 supports English + Chinese.

## Critical Decisions
- **Framework**: Next.js — simplest deploy path to Vercel, built-in API routes for form handling
- **Styling**: Tailwind CSS — fast to build, easy to match Payoneer brand
- **Database**: Supabase (free tier) — table view like a spreadsheet, export to Excel, real DB for future automation
- **i18n approach**: Simple JSON translation files (no heavy library) — only EN + ZH for V1
- **UX structure**: Single page with persona toggle at the top — not two separate URLs
- **Notifications**: Deferred to V2 — not in scope for V1
- **Editorial content**: Deferred to V2
- **Matchmaking**: Manual via spreadsheet review — architecture allows future automation

## Tasks:

- [x] 🟩 **Step 1: Project Setup**
  - [x] 🟩 Initialize Next.js project with TypeScript
  - [x] 🟩 Install and configure Tailwind CSS
  - [x] 🟩 Set up folder structure (`/components`, `/lib`, `/translations`, `/public`)
  - [x] 🟩 Create `.env.example` for Supabase API keys
  - [x] 🟩 Initialize project structure

- [x] 🟩 **Step 2: Payoneer Brand System**
  - [x] 🟩 Pull brand colors, fonts, and logo from Payoneer public site
  - [x] 🟩 Define Tailwind theme (colors, typography, spacing) to match Payoneer
  - [x] 🟩 Create reusable UI components: Button, Input, Select, MultiSelect, TextArea, Card, Badge
  - [x] 🟩 Build page shell: header (with logo + language switcher) and footer

- [x] 🟩 **Step 3: Hero Section & Persona Toggle**
  - [x] 🟩 Build hero section with headline, subtitle, and stats
  - [x] 🟩 Create persona toggle component in header (Seller / Partner)
  - [x] 🟩 Wire toggle to conditionally render Seller or Partner content below
  - [x] 🟩 Smooth scroll to content on CTA click

- [x] 🟩 **Step 4: Seller Experience**
  - [x] 🟩 Seller value proposition section (why expand to LATAM with Payoneer)
  - [x] 🟩 Expansion journey (6 stages with pain points from slides)
  - [x] 🟩 Countries section (Mexico, Brazil, Argentina, Colombia with flags)
  - [x] 🟩 Seller intake form with all required fields
  - [x] 🟩 Form validation and success state

- [x] 🟩 **Step 5: Partner Experience**
  - [x] 🟩 Partner value proposition section (access inbound international sellers)
  - [x] 🟩 How it works section (Apply → Get Matched → Grow Together)
  - [x] 🟩 Partner categories (6 categories)
  - [x] 🟩 Partner application form with all required fields
  - [x] 🟩 Form validation and success state

- [x] 🟩 **Step 6: Supabase Integration**
  - [x] 🟩 SQL schema created for `seller_submissions` and `partner_applications`
  - [x] 🟩 Configure Supabase client with lazy initialization
  - [x] 🟩 Build Next.js API route `/api/submit-seller`
  - [x] 🟩 Build Next.js API route `/api/submit-partner`
  - [x] 🟩 Timestamps and UUID auto-generated
  - [x] 🟩 Error handling and user feedback

- [x] 🟩 **Step 7: Internationalization (EN + ZH)**
  - [x] 🟩 Create translation JSON files: `en.json` and `zh.json`
  - [x] 🟩 Build language context/provider and switcher component
  - [x] 🟩 All content translated (hero, value props, forms, labels, messages)

- [x] 🟩 **Step 8: Mobile Responsiveness**
  - [x] 🟩 Responsive hero and persona toggle
  - [x] 🟩 Responsive form layout (single column on mobile)
  - [x] 🟩 Responsive grid sections and cards
  - [x] 🟩 Tailwind responsive breakpoints throughout

- [x] 🟩 **Step 9: Deploy to Vercel**
  - [x] 🟩 Build passes successfully
  - [x] 🟩 Dev server running on localhost:3000
  - [ ] 🟥 Push to GitHub repository (manual step)
  - [ ] 🟥 Connect repo to Vercel (manual step)
  - [ ] 🟥 Configure Supabase env vars in Vercel
  - [ ] 🟥 Connect custom domain (once purchased)
