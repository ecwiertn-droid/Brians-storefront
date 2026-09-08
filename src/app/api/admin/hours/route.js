import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireAdmin, requireSupabase } from "@/lib/requireAdmin";

export async function GET(req) {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const weekStart = new URL(req.url).searchParams.get("week");
  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;
  const { data, error } = await supabase
    .from("weekly_hours")
    .select("*")
    .eq("week_start_date", weekStart)
    .order("day_of_week");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ hours: data || [] });
}

// Body: { week_start_date, days: [{ day_of_week, open_time, close_time, is_closed }, ...] }
// Replaces all rows for that week in one go -- simplest thing that works
// for a single admin editing a week at a time.
export async function POST(req) {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const { week_start_date, days } = await req.json();
  if (!week_start_date || !Array.isArray(days)) {
    return NextResponse.json({ error: "Missing week_start_date or days" }, { status: 400 });
  }

  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;
  await supabase.from("weekly_hours").delete().eq("week_start_date", week_start_date);

  const rows = days.map((d) => ({
    week_start_date,
    day_of_week: d.day_of_week,
    open_time: d.is_closed ? null : d.open_time,
    close_time: d.is_closed ? null : d.close_time,
    is_closed: !!d.is_closed,
  }));

  const { error } = await supabase.from("weekly_hours").insert(rows);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
