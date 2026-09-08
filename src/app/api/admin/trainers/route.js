import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { requireAdmin, requireSupabase } from "@/lib/requireAdmin";

export async function GET() {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;
  const { data, error } = await supabase.from("trainers").select("*").order("sort_order");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ trainers: data || [] });
}

export async function POST(req) {
  const unauth = requireAdmin();
  if (unauth) return unauth;

  const body = await req.json();
  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;
  const { error } = await supabase.from("trainers").insert({
    name: body.name,
    title: body.title || null,
    bio: body.bio || null,
    certifications: body.certifications || null,
    photo_url: body.photo_url || null,
    sort_order: Number(body.sort_order) || 0,
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
    .from("trainers")
    .update({
      name: body.name,
      title: body.title || null,
      bio: body.bio || null,
      certifications: body.certifications || null,
      photo_url: body.photo_url || null,
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

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = supabaseServer();
  const noDb = requireSupabase(supabase);
  if (noDb) return noDb;
  const { error } = await supabase.from("trainers").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
