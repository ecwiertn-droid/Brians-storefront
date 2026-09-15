"use client";

import { useEffect, useState } from "react";
import { SPORTS } from "@/lib/camps";

const BLANK = {
  sport: "flag_football",
  title: "",
  description: "",
  start_date: "",
  end_date: "",
  price_cents: 0,
  capacity: 20,
  is_active: true,
};

export default function CampsEditor() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(BLANK);
  const [editingId, setEditingId] = useState(null);

  function load() {
    setLoading(true);
    fetch("/api/admin/camps")
      .then((r) => r.json())
      .then((data) => setSessions(data.sessions || []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function save(e) {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const payload = editingId ? { ...form, id: editingId } : form;
    await fetch("/api/admin/camps", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setForm(BLANK);
    setEditingId(null);
    load();
  }

  function edit(s) {
    setEditingId(s.id);
    setForm({
      sport: s.sport,
      title: s.title,
      description: s.description || "",
      start_date: s.start_date,
      end_date: s.end_date,
      price_cents: s.price_cents,
      capacity: s.capacity,
      is_active: s.is_active,
    });
  }

  async function remove(id) {
    if (!confirm("Delete this camp session?")) return;
    await fetch(`/api/admin/camps?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="section wrap">
      <p className="eyebrow">Admin</p>
      <h1>Youth Camp Sessions</h1>

      <div className="grid grid-2" style={{ marginTop: 20, alignItems: "start" }}>
        <div className="card">
          <h2>{editingId ? "Edit session" : "Add session"}</h2>
          <form onSubmit={save}>
            <div className="field">
              <label>Sport</label>
              <select
                value={form.sport}
                onChange={(e) => setForm({ ...form, sport: e.target.value })}
              >
                {Object.entries(SPORTS).map(([key, s]) => (
                  <option key={key} value={key}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Soccer Camp"
              />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="field">
                <label>Start date</label>
                <input
                  type="date"
                  required
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                />
              </div>
              <div className="field">
                <label>End date</label>
                <input
                  type="date"
                  required
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Price (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={(form.price_cents / 100).toFixed(2)}
                  onChange={(e) =>
                    setForm({ ...form, price_cents: Math.round(Number(e.target.value) * 100) })
                  }
                />
              </div>
              <div className="field">
                <label>Capacity</label>
                <input
                  type="number"
                  min="1"
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                />
              </div>
            </div>
            <div className="field">
              <label>
                <input
                  type="checkbox"
                  style={{ width: "auto", display: "inline-block", marginRight: 6 }}
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                />
                Active (visible on the public site)
              </label>
            </div>
            <button className="btn" type="submit">
              {editingId ? "Save changes" : "Add session"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginLeft: 8 }}
                onClick={() => {
                  setEditingId(null);
                  setForm(BLANK);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="card">
          <h2>Current sessions</h2>
          {loading ? (
            <p className="muted">Loading...</p>
          ) : sessions.length === 0 ? (
            <p className="muted">No sessions yet.</p>
          ) : (
            <table>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <strong>{s.title}</strong>
                      <div className="muted" style={{ fontSize: "0.85rem" }}>
                        {SPORTS[s.sport]?.label || s.sport} &middot; {s.start_date} to {s.end_date}
                        {!s.is_active && " (hidden)"}
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-secondary" onClick={() => edit(s)}>Edit</button>{" "}
                      <button className="btn btn-secondary" onClick={() => remove(s.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
