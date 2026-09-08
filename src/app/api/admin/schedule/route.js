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
  let query = supabase
    .from("schedule_slots")
    .select("*, trainers(name)")
    .order("day_of_week")
    .order("start_time");

  if (weekStart) query = query.eq("week_start_date", weekStart);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ slots: data || [] });
}

export async function POST(req) {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const body = await req.json();
  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;
  const { error } = await supabase.from("schedule_slots").insert({
    week_start_date: body.week_start_date,
    day_of_week: Number(body.day_of_week),
    start_time: body.start_time,
    end_time: body.end_time,
    trainer_id: body.trainer_id || null,
    service_type: body.service_type || "assessment",
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PUT(req) {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;
  const { error } = await supabase
    .from("schedule_slots")
    .update({
      start_time: body.start_time,
      end_time: body.end_time,
      trainer_id: body.trainer_id || null,
      service_type: body.service_type || "assessment",
      is_booked: !!body.is_booked,
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;
  const { error } = await supabase.from("schedule_slots").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
