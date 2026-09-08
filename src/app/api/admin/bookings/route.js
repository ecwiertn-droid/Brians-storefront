import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireAdmin, requireSupabase } from "@/lib/requireAdmin";

export async function GET() {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return NextResponse.json({ bookings: [] });
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookings: data || [] });
}
