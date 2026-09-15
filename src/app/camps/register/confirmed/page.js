import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

async function getRegistration(id) {
  if (!id || id === "demo") return null;
  const supabase = supabaseServer();
  if (!supabase) return null;
  const { data } = await supabase
    .from("camp_registrations")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

export default async function CampConfirmedPage({ searchParams }) {
  const registration = await getRegistration(searchParams?.registration);

  return (
    <div className="section wrap">
      <div className="card" style={{ maxWidth: 480 }}>
        <p className="eyebrow">Registered</p>
        <h1>You&apos;re in{registration?.child_name ? `, ${registration.child_name}` : ""}!</h1>
        {registration ? (
          <>
            <p>
              {registration.payment_status === "paid" && "Payment received -- registration confirmed."}
              {registration.payment_status === "pending" && "We're confirming your payment now."}
              {registration.payment_status === "canceled" && "This registration was canceled."}
            </p>
            <p className="muted">
              A confirmation was recorded for {registration.parent_email}. Brian&apos;s
              team will follow up with any details you need before camp starts.
            </p>
          </>
        ) : (
          <p className="muted">Your registration request was received.</p>
        )}
        <a className="btn btn-secondary" href="/camps">
          Back to Youth Camps
        </a>
      </div>
    </div>
  );
}
