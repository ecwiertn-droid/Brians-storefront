import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client. Uses the service role key, which bypasses
// Row Level Security -- this file must never be imported into a component
// that runs in the browser. Every page in this app that touches Supabase
// is a Server Component or an API route, so that's safe here.
//
// If Supabase isn't configured yet (no env vars set), this returns null
// instead of throwing, so the site can still run in "demo mode" -- pages
// fall back to sample data (see src/lib/sampleData.js) instead of crashing.
// That's what makes it possible to deploy a client-facing preview link
// before Supabase/Stripe accounts exist.
let cachedClient = null;

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function supabaseServer() {
  if (cachedClient) return cachedClient;
  if (!isSupabaseConfigured()) return null;

  cachedClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );

  return cachedClient;
}
