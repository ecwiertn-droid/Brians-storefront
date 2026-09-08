"use client";

import { useEffect, useState } from "react";

export default function NutritionResponses() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/nutrition")
      .then((r) => r.json())
      .then((data) => setResponses(data.responses || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section wrap">
      <p className="eyebrow">Admin</p>
      <h1>Nutrition Pathway Responses</h1>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : responses.length === 0 ? (
        <p className="muted">No responses yet.</p>
      ) : (
        <div className="grid" style={{ marginTop: 16 }}>
          {responses.map((r) => (
            <div className="card" key={r.id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{r.client_name || "Anonymous"}</strong>
                <span className="muted" style={{ fontSize: "0.85rem" }}>
                  {new Date(r.created_at).toLocaleString()}
                </span>
              </div>
              <p className="muted" style={{ fontSize: "0.9rem" }}>{r.client_email}</p>
              <table>
                <tbody>
                  {Object.entries(r.answers || {}).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: 600, width: "40%" }}>{key.replace(/_/g, " ")}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
