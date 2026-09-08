import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req) {
  const body = await req.json();
  const { client_name, client_email, answers } = body;

  if (!answers || typeof answers !== "object") {
    return NextResponse.json({ error: "Missing answers" }, { status: 400 });
  }

  const supabase = supabaseServer();
  if (!supabase) {
    // Demo mode: nothing to save to, but don't fail the request -- the
    // questionnaire itself still works end to end.
    return NextResponse.json({ ok: true, demo: true });
  }

  const { error } = await supabase.from("nutrition_responses").insert({
    client_name: client_name || null,
    client_email: client_email || null,
    answers,
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
