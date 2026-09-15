import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireAdmin, requireSupabase } from "@/lib/requireAdmin";

export async function GET() {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return NextResponse.json({ sessions: [] });

  const { data, error } = await supabase
    .from("camp_sessions")
    .select("*")
    .order("start_date");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ sessions: data || [] });
}

export async function POST(req) {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;

  const body = await req.json();
  const { error } = await supabase.from("camp_sessions").insert({
    sport: body.sport,
    title: body.title,
    description: body.description || null,
    start_date: body.start_date,
    end_date: body.end_date,
    price_cents: Math.round(Number(body.price_cents) || 0),
    capacity: Number(body.capacity) || 20,
    is_active: body.is_active !== false,
    sort_order: Number(body.sort_order) || 0,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PUT(req) {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;

  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase
    .from("camp_sessions")
    .update({
      sport: body.sport,
      title: body.title,
      description: body.description || null,
      start_date: body.start_date,
      end_date: body.end_date,
      price_cents: Math.round(Number(body.price_cents) || 0),
      capacity: Number(body.capacity) || 20,
      is_active: body.is_active !== false,
      sort_order: Number(body.sort_order) || 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabase.from("camp_sessions").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
