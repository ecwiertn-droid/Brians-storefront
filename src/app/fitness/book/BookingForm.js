"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES } from "@/lib/services";

export default function BookingForm() {
  const params = useSearchParams();
  const slotId = params.get("slot");
  const serviceParam = params.get("service");
  const canceled = params.get("canceled");

  const serviceType = slotId ? "assessment" : serviceParam || "assessment";
  const service = SERVICES[serviceType] || SERVICES.assessment;

  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_type: serviceType,
          slot_id: slotId || null,
          client_name: form.name,
          client_email: form.email,
          client_phone: form.phone,
          notes: form.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      if (data.url) {
        window.location.href = data.url; // Stripe Checkout
      } else if (data.redirect) {
        window.location.href = data.redirect; // Free booking, straight to confirmation
      }
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="section wrap">
      <p className="eyebrow">Fitness</p>
      <h1>Book: {service.label}</h1>
      <p className="muted">
        {service.amountCents === 0
          ? "This service is free."
          : `$${(service.amountCents / 100).toFixed(2)} — you'll pay securely via Stripe on the next step.`}
      </p>

      {canceled && (
        <div className="card" style={{ borderColor: "#e0a95f", marginBottom: 18 }}>
          Checkout was canceled. You can try again below.
        </div>
      )}

      <div className="card" style={{ maxWidth: 480, marginTop: 20 }}>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              id="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
          {error && <p style={{ color: "#8a2f2f" }}>{error}</p>}
          <button className="btn btn-block" type="submit" disabled={submitting}>
            {submitting
              ? "Please wait..."
              : service.amountCents === 0
              ? "Confirm booking"
              : "Continue to payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
