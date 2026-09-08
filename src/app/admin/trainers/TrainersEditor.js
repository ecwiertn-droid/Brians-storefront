"use client";

import { useEffect, useState } from "react";

const BLANK = { name: "", title: "", bio: "", certifications: "", photo_url: "", sort_order: 0 };

export default function TrainersEditor() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(BLANK);
  const [editingId, setEditingId] = useState(null);

  function load() {
    setLoading(true);
    fetch("/api/admin/trainers")
      .then((r) => r.json())
      .then((data) => setTrainers(data.trainers || []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function save(e) {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const payload = editingId ? { ...form, id: editingId } : form;
    await fetch("/api/admin/trainers", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setForm(BLANK);
    setEditingId(null);
    load();
  }

  function edit(t) {
    setEditingId(t.id);
    setForm({
      name: t.name,
      title: t.title || "",
      bio: t.bio || "",
      certifications: t.certifications || "",
      photo_url: t.photo_url || "",
      sort_order: t.sort_order || 0,
    });
  }

  async function remove(id) {
    if (!confirm("Delete this trainer?")) return;
    await fetch(`/api/admin/trainers?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="section wrap">
      <p className="eyebrow">Admin</p>
      <h1>Trainers</h1>

      <div className="grid grid-2" style={{ marginTop: 20, alignItems: "start" }}>
        <div className="card">
          <h2>{editingId ? "Edit trainer" : "Add trainer"}</h2>
          <form onSubmit={save}>
            <div className="field">
              <label>Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field">
              <label>Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="field">
              <label>Bio</label>
              <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </div>
            <div className="field">
              <label>Certifications</label>
              <input
                value={form.certifications}
                onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                placeholder="e.g. NASM-CPT, Precision Nutrition Level 1"
              />
            </div>
            <div className="field">
              <label>Photo URL (optional)</label>
              <input value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} />
            </div>
            <button className="btn" type="submit">
              {editingId ? "Save changes" : "Add trainer"}
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
          <h2>Current trainers</h2>
          {loading ? (
            <p className="muted">Loading...</p>
          ) : trainers.length === 0 ? (
            <p className="muted">No trainers yet.</p>
          ) : (
            <table>
              <tbody>
                {trainers.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <strong>{t.name}</strong>
                      <div className="muted" style={{ fontSize: "0.85rem" }}>{t.title}</div>
                    </td>
                    <td>
                      <button className="btn btn-secondary" onClick={() => edit(t)}>Edit</button>{" "}
                      <button className="btn btn-secondary" onClick={() => remove(t.id)}>Delete</button>
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
