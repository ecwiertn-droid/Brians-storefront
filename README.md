# Brian's Smoothie Bar & Fitness

A Next.js web app with two sections:

- **Smoothie Bar** — weekly hours + menu, editable from `/admin`.
- **Fitness** — trainer portfolios, weekly assessment schedule, a conversational
  nutrition-pathway questionnaire, and bookable services (assessment, nutrition
  consult, guided grocery visit, workout plan, meal prep) with Stripe checkout
  for the paid ones.

Everything under `/admin` is gated by a single shared password (see below).

## Home page photos

The home page has three photo slots with subtle motion (a floating-icon
animated hero, scroll-reveal cards). Until real photos are added they show
a clean animated placeholder instead of a broken image. To add real
photos, see `public/images/README.md` for exact filenames.

## Project structure

```
src/app/                 pages (Next.js App Router)
  page.js                home
  smoothie/               hours + menu
  fitness/                overview, trainers, schedule, nutrition, services, booking
  admin/                  password-gated admin pages
  api/                    server routes (checkout, webhook, nutrition, admin CRUD)
src/lib/                 shared helpers (Supabase client, dates, admin auth, services/pricing)
supabase/schema.sql      run this once in Supabase to create all tables
```

## Local setup

1. `npm install`
2. Copy `.env.local.example` to `.env.local` and fill in real values (see
   the setup guide for where each one comes from).
3. `npm run dev` and open `http://localhost:3000`.

This code was written by hand in a sandboxed environment without access to
the npm registry, so `npm install` / `npm run build` have **not** been run
against it yet. Run both locally (or let Vercel run the build on first
deploy) and fix anything that surfaces before pointing real customers at it.

## Admin access

Go to `/admin`, log in with the `ADMIN_PASSWORD` you set in `.env.local`.
From there you can edit next week's smoothie hours, the smoothie menu,
trainer bios, and the assessment schedule, and view bookings and nutrition
questionnaire responses.

This is a single shared password, not individual accounts — fine for one
owner. If more than one person needs admin access with their own login,
swap this for Supabase Auth (there's a note in the setup guide).

## Data model

See `supabase/schema.sql`. Tables: `weekly_hours`, `menu_items`, `trainers`,
`schedule_slots`, `bookings`, `nutrition_responses`.

## Payments

Paid services (nutrition consult, grocery visit, workout plan, meal prep)
use Stripe Checkout — a Stripe-hosted payment page, so no card data ever
touches this app's code. The fitness assessment is free and skips Stripe
entirely. Prices live in one place: `src/lib/services.js`.
