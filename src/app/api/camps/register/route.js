import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseServer } from "@/lib/supabaseServer";
import { SAMPLE_CAMP_SESSIONS } from "@/lib/sampleData";

async function getSession(supabase, sessionId) {
  if (!supabase) {
    return SAMPLE_CAMP_SESSIONS.find((s) => s.id === sessionId) || null;
  }
  const { data } = await supabase
    .from("camp_sessions")
    .select("*")
    .eq("id", sessionId)
    .single();
  return data || null;
}

export async function POST(req) {
  const body = await req.json();
  const {
    session_id,
    child_name,
    child_age,
    parent_name,
    parent_email,
    parent_phone,
    notes,
  } = body;

  if (!session_id || !child_name || !parent_name || !parent_email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = supabaseServer();
  const campSession = await getSession(supabase, session_id);

  if (!campSession) {
    return NextResponse.json({ error: "Camp session not found" }, { status: 404 });
  }

  const amountCents = campSession.price_cents || 0;

  // Demo mode (no Supabase configured): don't try to persist anything,
  // just complete the flow so a preview link stays clickable end to end.
  if (!supabase) {
    if (amountCents === 0 || !process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ redirect: "/camps/register/confirmed?registration=demo" });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: parent_email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `${campSession.title} (demo)` },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/camps/register/confirmed?registration=demo&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/camps/register?session=${session_id}&canceled=1`,
    });
    return NextResponse.json({ url: stripeSession.url });
  }

  const { data: registration, error } = await supabase
    .from("camp_registrations")
    .insert({
      session_id,
      sport: campSession.sport,
      child_name,
      child_age: child_age ? Number(child_age) : null,
      parent_name,
      parent_email,
      parent_phone: parent_phone || null,
      notes: notes || null,
      amount_cents: amountCents,
      payment_status: amountCents === 0 ? "paid" : "pending",
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not save registration" }, { status: 500 });
  }

  if (amountCents === 0) {
    return NextResponse.json({
      redirect: `/camps/register/confirmed?registration=${registration.id}`,
    });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Payments aren't configured yet. Add STRIPE_SECRET_KEY in .env.local." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: parent_email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: campSession.title },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/camps/register/confirmed?registration=${registration.id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/camps/register?session=${session_id}&canceled=1`,
    metadata: { camp_registration_id: registration.id },
  });

  await supabase
    .from("camp_registrations")
    .update({ stripe_session_id: stripeSession.id })
    .eq("id", registration.id);

  return NextResponse.json({ url: stripeSession.url });
}
