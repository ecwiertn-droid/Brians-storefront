"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/dates";
import { SPORTS } from "@/lib/camps";

export default function RegisterForm({ session }) {
  const sport = SPORTS[session.sport];
  const [form, setForm] = useState({
    child_name: "",
    child_age: "",
    parent_name: "",
    parent_email: "",
    parent_phone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/camps/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: session.id, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      if (data.url) {
        window.location.href = data.url;
      } else if (data.redirect) {
        window.location.href = data.redirect;
      }
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="section wrap">
      <p className="eyebrow">Youth Camps</p>
      <h1>Register: {session.title}</h1>
      <p className="muted">
        {sport?.label} &middot; {formatMoney(session.price_cents)}
        {session.price_cents > 0 && " -- you'll pay securely via Stripe on the next step."}
      </p>

      <div className="card" style={{ maxWidth: 480, marginTop: 20 }}>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="child_name">Child&apos;s name</label>
            <input
              id="child_name"
              required
              value={form.child_name}
              onChange={(e) => setForm({ ...form, child_name: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="child_age">Child&apos;s age</label>
            <input
              id="child_age"
              type="number"
              min="3"
              max="18"
              value={form.child_age}
              onChange={(e) => setForm({ ...form, child_age: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="parent_name">Parent/guardian name</label>
            <input
              id="parent_name"
              required
              value={form.parent_name}
              onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="parent_email">Parent/guardian email</label>
            <input
              id="parent_email"
              type="email"
              required
              value={form.parent_email}
              onChange={(e) => setForm({ ...form, parent_email: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="parent_phone">Parent/guardian phone (optional)</label>
            <input
              id="parent_phone"
              value={form.parent_phone}
              onChange={(e) => setForm({ ...form, parent_phone: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="notes">Notes -- allergies, medical info, etc. (optional)</label>
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
              : session.price_cents === 0
              ? "Confirm registration"
              : "Continue to payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
