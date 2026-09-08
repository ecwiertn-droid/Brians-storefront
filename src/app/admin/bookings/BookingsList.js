"use client";

import { useEffect, useState } from "react";

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((data) => setBookings(data.bookings || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section wrap">
      <p className="eyebrow">Admin</p>
      <h1>Bookings</h1>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="muted">No bookings yet.</p>
      ) : (
        <div className="card" style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>When</th>
                <th>Service</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{new Date(b.created_at).toLocaleString()}</td>
                  <td>{b.service_type.replace("_", " ")}</td>
                  <td>
                    {b.client_name}
                    <div className="muted" style={{ fontSize: "0.85rem" }}>{b.client_email}</div>
                  </td>
                  <td>${(b.amount_cents / 100).toFixed(2)}</td>
                  <td>
                    <span
                      className={`badge ${b.payment_status === "paid" ? "badge-open" : "badge-closed"}`}
                    >
                      {b.payment_status.replace("_", " ")}
                    </span>
                  </td>
                  <td>{b.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
