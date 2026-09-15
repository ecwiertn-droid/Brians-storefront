"use client";

import { useEffect, useState } from "react";

export default function CampRegistrationsList() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/camp-registrations")
      .then((r) => r.json())
      .then((data) => setRegistrations(data.registrations || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section wrap">
      <p className="eyebrow">Admin</p>
      <h1>Youth Camp Registrations</h1>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : registrations.length === 0 ? (
        <p className="muted">No registrations yet.</p>
      ) : (
        <div className="card" style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>When</th>
                <th>Session</th>
                <th>Child</th>
                <th>Parent</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.created_at).toLocaleString()}</td>
                  <td>{r.camp_sessions?.title || r.sport}</td>
                  <td>
                    {r.child_name}
                    {r.child_age && <div className="muted" style={{ fontSize: "0.85rem" }}>Age {r.child_age}</div>}
                  </td>
                  <td>
                    {r.parent_name}
                    <div className="muted" style={{ fontSize: "0.85rem" }}>{r.parent_email}</div>
                  </td>
                  <td>${(r.amount_cents / 100).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${r.payment_status === "paid" ? "badge-open" : "badge-closed"}`}>
                      {r.payment_status}
                    </span>
                  </td>
                  <td>{r.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
