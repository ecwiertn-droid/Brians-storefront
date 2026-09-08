import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

async function getBooking(id) {
  if (!id || id === "demo") return null;
  const supabase = supabaseServer();
  if (!supabase) return null;
  const { data } = await supabase.from("bookings").select("*").eq("id", id).single();
  return data;
}

export default async function ConfirmedPage({ searchParams }) {
  const booking = await getBooking(searchParams?.booking);

  return (
    <div className="section wrap">
      <div className="card" style={{ maxWidth: 480 }}>
        <p className="eyebrow">Booked</p>
        <h1>Thanks{booking?.client_name ? `, ${booking.client_name}` : ""}!</h1>
        {booking ? (
          <>
            <p>
              Your <strong>{booking.service_type.replace("_", " ")}</strong>{" "}
              request is in.{" "}
              {booking.payment_status === "paid" && "Payment received."}
              {booking.payment_status === "pending" &&
                "We're confirming your payment now."}
              {booking.payment_status === "not_required" &&
                "No payment was needed for this one."}
            </p>
            <p className="muted">
              A confirmation was recorded for {booking.client_email}. Brian's
              team will follow up to finalize details.
            </p>
          </>
        ) : (
          <p className="muted">Your request was received.</p>
        )}
        <a className="btn btn-secondary" href="/fitness">
          Back to Fitness
        </a>
      </div>
    </div>
  );
}
