import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseServer } from "@/lib/supabaseServer";
import { getService } from "@/lib/services";

export async function POST(req) {
  const body = await req.json();
  const { service_type, slot_id, client_name, client_email, client_phone, notes } = body;

  const service = getService(service_type);
  if (!service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }
  if (!client_name || !client_email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const supabase = supabaseServer();

  // Demo mode (no Supabase configured yet): don't try to persist anything,
  // just walk through the flow so a preview link is still clickable end to
  // end. Real bookings/payments need Supabase (and Stripe, for paid ones)
  // configured -- see SETUP_GUIDE.md.
  if (!supabase) {
    if (service.amountCents === 0) {
      return NextResponse.json({ redirect: `/fitness/book/confirmed?booking=demo` });
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ redirect: `/fitness/book/confirmed?booking=demo` });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: client_email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `${service.label} (demo)` },
            unit_amount: service.amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/fitness/book/confirmed?booking=demo&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/fitness/book?service=${service_type}&canceled=1`,
    });
    return NextResponse.json({ url: session.url });
  }

  // Free service (the assessment): just record the booking, mark the slot
  // booked, no Stripe involved.
  if (service.amountCents === 0) {
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        slot_id: slot_id || null,
        service_type,
        client_name,
        client_email,
        client_phone: client_phone || null,
        notes: notes || null,
        amount_cents: 0,
        payment_status: "not_required",
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Could not save booking" }, { status: 500 });
    }

    if (slot_id) {
      await supabase.from("schedule_slots").update({ is_booked: true }).eq("id", slot_id);
    }

    return NextResponse.json({ redirect: `/fitness/book/confirmed?booking=${booking.id}` });
  }

  // Paid service: create the booking as pending, then a Stripe Checkout session.
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      slot_id: slot_id || null,
      service_type,
      client_name,
      client_email,
      client_phone: client_phone || null,
      notes: notes || null,
      amount_cents: service.amountCents,
      payment_status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not save booking" }, { status: 500 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Payments aren't configured yet. Add STRIPE_SECRET_KEY in .env.local." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: client_email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: service.label },
          unit_amount: service.amountCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/fitness/book/confirmed?booking=${booking.id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/fitness/book?service=${service_type}&canceled=1`,
    metadata: { booking_id: booking.id },
  });

  await supabase
    .from("bookings")
    .update({ stripe_session_id: session.id })
    .eq("id", booking.id);

  if (slot_id) {
    await supabase.from("schedule_slots").update({ is_booked: true }).eq("id", slot_id);
  }

  return NextResponse.json({ url: session.url });
}
