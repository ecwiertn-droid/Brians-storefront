import { supabaseServer } from "@/lib/supabaseServer";
import { SAMPLE_HOURS, SAMPLE_MENU } from "@/lib/sampleData";
import {
  DAY_NAMES,
  getNextWeekStart,
  formatTime,
  formatMoney,
  formatWeekLabel,
} from "@/lib/dates";

export const dynamic = "force-dynamic";

async function getHours() {
  const weekStart = getNextWeekStart();
  const supabase = supabaseServer();
  if (!supabase) return { weekStart, hours: SAMPLE_HOURS };

  const { data, error } = await supabase
    .from("weekly_hours")
    .select("*")
    .eq("week_start_date", weekStart)
    .order("day_of_week", { ascending: true });

  if (error) {
    console.error("Failed to load hours:", error.message);
    return { weekStart, hours: [] };
  }
  return { weekStart, hours: data || [] };
}

async function getMenu() {
  const supabase = supabaseServer();
  if (!supabase) return SAMPLE_MENU;

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_available", true)
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to load menu:", error.message);
    return [];
  }
  return data || [];
}

export default async function SmoothiePage() {
  const [{ weekStart, hours }, menu] = await Promise.all([
    getHours(),
    getMenu(),
  ]);

  const menuByCategory = menu.reduce((acc, item) => {
    const cat = item.category || "Smoothies";
    acc[cat] = acc[cat] || [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="section wrap">
      <p className="eyebrow">Smoothie Bar</p>
      <h1>Hours &amp; Menu</h1>
      <p className="muted">Week of {formatWeekLabel(weekStart)}</p>

      <div className="grid grid-2" style={{ marginTop: 24 }}>
        <div className="card">
          <h2>This week&apos;s hours</h2>
          {hours.length === 0 ? (
            <p className="muted">
              Hours for this week haven&apos;t been posted yet. Check back
              soon or call the bar directly.
            </p>
          ) : (
            <table>
              <tbody>
                {hours.map((h) => (
                  <tr key={h.id}>
                    <td>{DAY_NAMES[h.day_of_week]}</td>
                    <td>
                      {h.is_closed ? (
                        <span className="badge badge-closed">Closed</span>
                      ) : (
                        <span className="badge badge-open">
                          {formatTime(h.open_time)} - {formatTime(h.close_time)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card">
          <h2>Menu</h2>
          {menu.length === 0 ? (
            <p className="muted">
              The menu is being updated. Check back soon.
            </p>
          ) : (
            Object.entries(menuByCategory).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 18 }}>
                <h3 style={{ marginBottom: 8 }}>{cat}</h3>
                <table>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.name}</strong>
                          {item.description && (
                            <div className="muted" style={{ fontSize: "0.9rem" }}>
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td>{formatMoney(item.price_cents)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
