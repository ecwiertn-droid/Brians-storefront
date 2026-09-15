# Setup Guide: Brian's Smoothie Bar & Fitness

This walks through getting the app live: an account creation and code
step, in order. I can't create accounts or enter payment details on your
behalf, so these are steps you'll do yourself — I've written each one out.

## Fastest path to a link you can send your client

The app now has a built-in **demo mode**: if Supabase/Stripe aren't
connected yet, it shows realistic sample hours, menu, trainers, and an
assessment schedule instead of blank pages, and the nutrition
questionnaire and booking flow are fully clickable (a small orange banner
at the top says "Preview mode" so nobody mistakes the sample data for
real). That means you can get a shareable link with just two free
accounts and no database setup:

1. **GitHub** (free) — create the repo and push this code. See step 1 below.
2. **Vercel** (free) — import that repo, skip adding any environment
   variables, click Deploy. See step 4 below (skip the "add environment
   variables" part and the Pro upgrade — Hobby is fine for a private demo
   link, just not for real customer traffic).
3. Vercel gives you a `*.vercel.app` URL — send that straight to your
   client.

When you're ready to go live for real (real hours/menu, real bookings,
real payments), come back and do steps 2–3 (Supabase, Stripe) and add
those environment variables in Vercel — the demo banner disappears
automatically once they're connected.

## What you're setting up, and why

| Piece | What it does | Cost (Aug 2026 pricing) |
|---|---|---|
| GitHub | Stores the code, lets Vercel auto-deploy on every change | Free |
| Vercel | Hosts the live website | $20/mo (Pro — needed since this is a commercial site; free "Hobby" tier is non-commercial only) |
| Supabase | The database (hours, menu, trainers, bookings, etc.) | $25/mo (Pro — avoids the free tier's 7-day auto-pause, which would take your live site offline) |
| Stripe | Processes card payments for paid services | No monthly fee — 2.9% + $0.30 per transaction |
| Domain registrar | Where you buy your web address (e.g. briansbar.com) | ~$10–13/year |

Total: roughly **$45/month + ~$12/year for the domain** — fits inside the
$15–50/month range you mentioned.

You can start on free tiers (Vercel Hobby + Supabase Free) to test everything
privately, then upgrade to Pro on both right before you go live to real
customers, if you'd rather not pay both from day one.

---

## 1. GitHub — store the code

1. Go to github.com and create a free account if you don't have one.
2. Click **New repository**. Name it something like `brians-smoothie-fitness`.
   Leave it **private** for now.
3. On your computer, open a terminal in the `brians-app` folder I gave you
   and run:
   ```
   git init
   git add .
   git commit -m "Initial version"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/brians-smoothie-fitness.git
   git push -u origin main
   ```
   (GitHub shows you these exact commands, with your username filled in,
   right after you create the repo.)

## 2. Supabase — the database

1. Go to supabase.com, sign up, click **New project**.
2. Pick a name and a database password (save that password somewhere safe).
3. Once the project is ready, go to the **SQL Editor**, click **New query**,
   paste in the entire contents of `supabase/schema.sql` from this project,
   and run it. This creates all the tables the app needs.
   - If you already ran `schema.sql` before the Youth Camps feature was
     added, it won't have the two new camp tables. Run
     `supabase/migration_youth_camps.sql` once (same SQL Editor, new query)
     to add them without touching your existing data.
4. Go to **Project Settings → API**. You'll need three values from this page:
   - **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** (click "reveal") → this is `SUPABASE_SERVICE_ROLE_KEY`
     — keep this one secret, never put it in code that reaches the browser.
5. When you're ready for production, upgrade the project to the **Pro plan**
   ($25/mo) in Billing — the free tier pauses your project after 7 days with
   no activity, which would take your live site offline.

## 3. Stripe — payments

1. Go to stripe.com and create an account (you'll need basic business info
   to eventually accept real payments; you can build and test everything
   before finishing that part).
2. In the Dashboard, make sure you're in **Test mode** (toggle, top right)
   while you're setting things up.
3. Go to **Developers → API keys**. Copy:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`
4. Go to **Developers → Webhooks → Add endpoint**. Set the URL to
   `https://your-domain.com/api/stripe-webhook` (use your Vercel URL until
   you have a domain). Select the event **checkout.session.completed**.
   Copy the **signing secret** → `STRIPE_WEBHOOK_SECRET`.
5. Test with Stripe's test card `4242 4242 4242 4242`, any future expiry,
   any CVC. Once you're confident it works, flip to **Live mode** in Stripe,
   grab the live versions of the same three keys, and swap them into
   Vercel's environment variables.

## 4. Vercel — hosting

1. Go to vercel.com, sign up (easiest: "Continue with GitHub").
2. Click **Add New → Project**, select the `brians-smoothie-fitness` repo.
3. Before deploying, open **Environment Variables** and add every value
   from `.env.local.example` (with your real Supabase/Stripe values, and
   set `NEXT_PUBLIC_SITE_URL` to whatever your final URL will be).
4. Click **Deploy**. Vercel installs everything and builds the site — watch
   the build log for errors the first time, since this code hasn't been
   through a real build yet.
5. Once it's live at your `*.vercel.app` address and things work, go to
   **Settings → Billing** and upgrade to **Pro** ($20/mo) before pointing
   real customers at it — the free Hobby plan isn't licensed for commercial
   use.

## 5. Domain — your web address

Current (2026) comparison:

- **Namecheap** — best if this is your first domain: wider name selection,
  live chat support, easy path from purchase to a working site. Modest
  markup, and renewal prices increase after the first year.
- **Cloudflare Registrar** — cheapest, pure at-cost pricing (~$10.46/yr for
  .com), no markup ever. Fewer domain extensions supported, and you manage
  DNS through Cloudflare rather than a typical registrar dashboard.

For a first business domain, Namecheap is the more forgiving choice.
Steps once you've bought it:

1. In Vercel, go to your project → **Settings → Domains**, add your domain.
2. Vercel gives you DNS records to add. Log into your registrar, find DNS
   settings, and add those records.
3. DNS changes can take anywhere from a few minutes to a few hours to take
   effect.

## 6. Admin password

Pick a real password and set it as `ADMIN_PASSWORD` in Vercel's environment
variables (not the placeholder in the example file). This is what gates
the `/admin` section — don't skip changing it from the default.

## What to do if something breaks

- **Build fails on Vercel**: read the error in the build log — it'll point
  to a specific file/line. Since I couldn't run a real build in my own
  environment, this is the most likely place for something to need a fix.
- **Pages show empty hours/menu/trainers**: that's expected until you add
  data — either directly in Supabase's Table Editor, or through `/admin`
  once it's deployed.
- **Stripe checkout fails**: double check the three Stripe env vars are the
  matching set (all test, or all live — not mixed).
