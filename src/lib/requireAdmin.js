import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";

// Call at the top of every /api/admin/* route handler. Every admin API
// route uses the Supabase service role key (bypasses RLS), so this cookie
// check is the only thing standing between the public internet and write
// access -- don't remove it.
export function requireAdmin() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  return null;
}

// Call after supabaseServer() in every admin API route. In demo mode
// (no Supabase env vars set) supabaseServer() returns null -- this turns
// that into a clean 503 instead of every route crashing on `null.from(...)`.
export function requireSupabase(client) {
  if (!client) {
    return NextResponse.json(
      { error: "Supabase isn't connected yet, so admin edits can't be saved. See SETUP_GUIDE.md." },
      { status: 503 }
    );
  }
  return null;
}
