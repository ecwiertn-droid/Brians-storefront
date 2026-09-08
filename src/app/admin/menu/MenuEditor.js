"use client";

import { useEffect, useState } from "react";

const BLANK = {
  name: "",
  description: "",
  price_cents: 0,
  category: "Smoothies",
  is_available: true,
  sort_order: 0,
};

export default function MenuEditor() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(BLANK);
  const [editingId, setEditingId] = useState(null);

  function load() {
    setLoading(true);
    fetch("/api/admin/menu")
      .then((r) => r.json())
      .then((data) => setItems(data.items || []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function save(e) {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const payload = editingId ? { ...form, id: editingId } : form;
    await fetch("/api/admin/menu", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setForm(BLANK);
    setEditingId(null);
    load();
  }

  function edit(item) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description || "",
      price_cents: item.price_cents,
      category: item.category || "Smoothies",
      is_available: item.is_available,
      sort_order: item.sort_order,
    });
  }

  async function remove(id) {
    if (!confirm("Delete this menu item?")) return;
    await fetch(`/api/admin/menu?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="section wrap">
      <p className="eyebrow">Admin</p>
      <h1>Smoothie Menu</h1>

      <div className="grid grid-2" style={{ marginTop: 20, alignItems: "start" }}>
        <div className="card">
          <h2>{editingId ? "Edit item" : "Add item"}</h2>
          <form onSubmit={save}>
            <div className="field">
              <label>Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                <label>Category</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
            </div>
            <div className="field">
              <label>
                <input
                  type="checkbox"
                  style={{ width: "auto", display: "inline-block", marginRight: 6 }}
                  checked={form.is_available}
                  onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
                />
                Available
              </label>
            </div>
            <button className="btn" type="submit">
              {editingId ? "Save changes" : "Add to menu"}
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
          <h2>Current menu</h2>
          {loading ? (
            <p className="muted">Loading...</p>
          ) : items.length === 0 ? (
            <p className="muted">No items yet.</p>
          ) : (
            <table>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                      <div className="muted" style={{ fontSize: "0.85rem" }}>
                        {item.category} - ${(item.price_cents / 100).toFixed(2)}
                        {!item.is_available && " (hidden)"}
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-secondary" onClick={() => edit(item)}>
                        Edit
                      </button>{" "}
                      <button className="btn btn-secondary" onClick={() => remove(item.id)}>
                        Delete
                      </button>
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
