"use client";

import { useEffect, useState } from "react";
import { DAY_NAMES, getNextWeekStart, formatWeekLabel } from "@/lib/dates";

const DEFAULT_DAYS = DAY_NAMES.map((_, i) => ({
  day_of_week: i,
  open_time: "09:00",
  close_time: "18:00",
  is_closed: i === 6, // default Sunday closed, admin can change
}));

export default function HoursEditor() {
  const weekStart = getNextWeekStart();
  const [days, setDays] = useState(DEFAULT_DAYS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/admin/hours?week=${weekStart}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.hours && data.hours.length > 0) {
          const merged = DAY_NAMES.map((_, i) => {
            const existing = data.hours.find((h) => h.day_of_week === i);
            return existing
              ? {
                  day_of_week: i,
                  open_time: existing.open_time?.slice(0, 5) || "09:00",
                  close_time: existing.close_time?.slice(0, 5) || "18:00",
                  is_closed: existing.is_closed,
                }
              : DEFAULT_DAYS[i];
          });
          setDays(merged);
        }
      })
      .finally(() => setLoading(false));
  }, [weekStart]);

  function updateDay(idx, patch) {
    setDays((prev) => prev.map((d, i) => (i === idx ? { ...d, ...patch } : d)));
  }

  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/hours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ week_start_date: weekStart, days }),
    });
    setSaving(false);
    setMessage(res.ok ? "Saved." : "Something went wrong saving.");
  }

  if (loading) return <div className="section wrap">Loading...</div>;

  return (
    <div className="section wrap">
      <p className="eyebrow">Admin</p>
      <h1>Smoothie Bar Hours</h1>
      <p className="muted">Week of {formatWeekLabel(weekStart)}</p>

      <div className="card" style={{ marginTop: 20, maxWidth: 640 }}>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Closed?</th>
              <th>Open</th>
              <th>Close</th>
            </tr>
          </thead>
          <tbody>
            {days.map((d, idx) => (
              <tr key={d.day_of_week}>
                <td>{DAY_NAMES[idx]}</td>
                <td>
                  <input
                    type="checkbox"
                    style={{ width: "auto" }}
                    checked={d.is_closed}
                    onChange={(e) => updateDay(idx, { is_closed: e.target.checked })}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={d.open_time}
                    disabled={d.is_closed}
                    onChange={(e) => updateDay(idx, { open_time: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={d.close_time}
                    disabled={d.is_closed}
                    onChange={(e) => updateDay(idx, { close_time: e.target.value })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" style={{ marginTop: 16 }} onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save hours"}
        </button>
        {message && <p className="muted" style={{ marginTop: 8 }}>{message}</p>}
      </div>
    </div>
  );
}
