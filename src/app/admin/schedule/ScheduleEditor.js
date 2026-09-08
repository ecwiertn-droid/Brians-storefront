"use client";

import { useEffect, useState } from "react";
import { DAY_NAMES, getNextWeekStart, formatWeekLabel } from "@/lib/dates";

const BLANK = { day_of_week: 0, start_time: "09:00", end_time: "09:30", trainer_id: "" };

export default function ScheduleEditor() {
  const weekStart = getNextWeekStart();
  const [slots, setSlots] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(BLANK);

  function load() {
    setLoading(true);
    Promise.all([
      fetch(`/api/admin/schedule?week=${weekStart}`).then((r) => r.json()),
      fetch("/api/admin/trainers").then((r) => r.json()),
    ])
      .then(([slotData, trainerData]) => {
        setSlots(slotData.slots || []);
        setTrainers(trainerData.trainers || []);
      })
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function addSlot(e) {
    e.preventDefault();
    await fetch("/api/admin/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        week_start_date: weekStart,
        day_of_week: Number(form.day_of_week),
        start_time: form.start_time,
        end_time: form.end_time,
        trainer_id: form.trainer_id || null,
        service_type: "assessment",
      }),
    });
    setForm(BLANK);
    load();
  }

  async function toggleBooked(slot) {
    await fetch("/api/admin/schedule", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...slot, is_booked: !slot.is_booked }),
    });
    load();
  }

  async function remove(id) {
    if (!confirm("Delete this slot?")) return;
    await fetch(`/api/admin/schedule?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="section wrap">
      <p className="eyebrow">Admin</p>
      <h1>Assessment Schedule</h1>
      <p className="muted">Week of {formatWeekLabel(weekStart)}</p>

      <div className="grid grid-2" style={{ marginTop: 20, alignItems: "start" }}>
        <div className="card">
          <h2>Add a slot</h2>
          <form onSubmit={addSlot}>
            <div className="field">
              <label>Day</label>
              <select
                value={form.day_of_week}
                onChange={(e) => setForm({ ...form, day_of_week: e.target.value })}
              >
                {DAY_NAMES.map((d, i) => (
                  <option key={d} value={i}>{d}</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Start</label>
                <input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} />
              </div>
              <div className="field">
                <label>End</label>
                <input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label>Trainer (optional)</label>
              <select
                value={form.trainer_id}
                onChange={(e) => setForm({ ...form, trainer_id: e.target.value })}
              >
                <option value="">Unassigned</option>
                {trainers.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <button className="btn" type="submit">Add slot</button>
          </form>
        </div>

        <div className="card">
          <h2>This week&apos;s slots</h2>
          {loading ? (
            <p className="muted">Loading...</p>
          ) : slots.length === 0 ? (
            <p className="muted">No slots yet.</p>
          ) : (
            <table>
              <tbody>
                {slots.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <strong>{DAY_NAMES[s.day_of_week]}</strong>
                      <div className="muted" style={{ fontSize: "0.85rem" }}>
                        {s.start_time?.slice(0, 5)} - {s.end_time?.slice(0, 5)}
                        {s.trainers?.name && ` with ${s.trainers.name}`}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${s.is_booked ? "badge-booked" : "badge-available"}`}>
                        {s.is_booked ? "Booked" : "Open"}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-secondary" onClick={() => toggleBooked(s)}>
                        {s.is_booked ? "Mark open" : "Mark booked"}
                      </button>{" "}
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
